const express = require('express');
const Twitter = require('twitter');


// export const TWITTER_CONSUMER_KEY = 'p5kHGucWtO0dwMawfP5cdbauF';
// export const TWITTER_CONSUMER_SECRET = 'oYmWXrkXAdPhXxR9ghzvXCtrWyPgyyVEsowtLh5JW7B5o';
// export const TWITTER_ACCESS_TOKEN_KEY = '106788250-gE83A2i9nPIUlarxShXjc5t6J4LwvQxJUvO4eifl';
// export const TWITTER_ACCESS_TOKEN_SECRET = 'oYmWXrkXAdPhXxR9ghzvXCtrWyPgyyVEsowtLh5JW7B5o';

// Twitter API credentials for account w/ email jurowski@gmail.com
// as of 2021-03-16
// Access token:
// 950257572321177601-rpxp0HldMfXYJTa8CE5ZgvLIQwb3Fce

// Access token secret:
// Aw5LASwG8PXNWYyB3RLPZupiwoIWJpa1FcX9vinADM1Ot

// API key:
// keREFj0ncSEtK4jb9DF74HRkg

// API key secret:
// 37li03pPdLcJPT8Jk4Xp2sbAX7vsFOOXl8dKJakwbcGfeoR3uz


const client = new Twitter({
  consumer_key: 'keREFj0ncSEtK4jb9DF74HRkg',
  consumer_secret: '37li03pPdLcJPT8Jk4Xp2sbAX7vsFOOXl8dKJakwbcGfeoR3uz',
  access_token_key: '950257572321177601-rpxp0HldMfXYJTa8CE5ZgvLIQwb3Fce',
  access_token_secret: 'Aw5LASwG8PXNWYyB3RLPZupiwoIWJpa1FcX9vinADM1Ot'
});
 
const defaults = {
  screen_name: 'elonmusk',
  tweet_mode: 'extended',
  count: 20,
};

const expressServer = express();

expressServer.route('/:handle')
  .get(function(req, res) {
    const params = {
      ...defaults,
      max_id: req.query.max_id,
      screen_name: req.params.handle,
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // RETURN JSON OF TWEETS TO CALLING WEB APP:
        res.json(tweets);
      } else {
        console.error(error)
      }
    });
  });

  expressServer.listen(3001, function(error) {
  console.log('Twitter Express local server is listening on port 3001');
});

