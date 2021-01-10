const Sheet = require('./sheet')
const Twitter = require('twitter');


(async function(){
    // connect to Twitter API
    const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    // get quotes from Google Spread Sheet
    const sheet = new Sheet();
    await sheet.load();
    const quotes = await sheet.getRows();
    const status = quotes[0].quote

    // writing a tweet 
    client.post('statuses/update', {status},  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body.
    // console.log(response);  // Raw response object.
    });

    // remove quote from Sheet
    await quotes[0].delete();
    console.log(status)

})();
