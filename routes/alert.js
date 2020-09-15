const Axios = require('axios');
var express = require('express');

var router = express.Router();


router.get('/alert', async function(req, res, next) {
    res.render('alert');
    const result = await Axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);

    const lastClose = result.data['Time Series (5min)'][result.data["Meta Data"]["3. Last Refreshed"]]["4. close"];
    console.log(result.data['Time Series (5min)'][result.data["Meta Data"]["3. Last Refreshed"]]["4. close"]);
    await Axios.post('https://hooks.slack.com/services/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',{
        
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `Alert! Alert! *IBM* is now $${lastClose}. <https://www.google.com/search?q=NYSE:+IBM|View on Google Finance>`,
                },
              },
            ],
          
    
    });
});
  
  module.exports = router;