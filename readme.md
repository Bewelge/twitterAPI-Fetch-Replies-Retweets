Small node tool to fetch a list of retweets / replies to a specific tweet. Also fetches and lists tezos addresses from the replies.

You'll need to add your bearer token and the tweet id at the top of the main.js file.

install with

`npm install`

run with

`node main.js`

uncomment/comment call of these two methods to fetch replies or retweets.
`makeRepliesRequest()`
`makeRetweetsRequest()`

As of writing this, retweets are limited to 100 and replies can only be fetched 7 days into the past.
