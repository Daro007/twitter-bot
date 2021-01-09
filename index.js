const Sheet = require('./sheet')
const Twitter = require('twitter');


(async function(){
    // connect to Twitter API
    const client = new Twitter({
    consumer_key: 'dVDb35K9SeMVqcBfs2DNUb3pD',
    consumer_secret: 'SV7DspfuPEUZInaPQWin9QLdoDirHVYq7KQVxALOgZzZvPsFUt',
    access_token_key: '1344581132608745473-R4i6vjQqtBHmQz1swfwE7pR2mmgQo9',
    access_token_secret: 'KMnWbMfimYrrOs5SGW72YPWJbY8Jqtq0pTGf7pqoZRsfw'
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
    console.log(response);  // Raw response object.
    });

    // remove quote from Sheet
    await quotes[0].delete();
    console.log(status)

})();
