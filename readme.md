Small node tool to fetch a list of retweets / replies to a specific tweet. Also fetches and lists tezos addresses from the replies.

You'll need to add your bearer token and the tweet id at the top of the main.js file.

install with

```npm install```

Get replies with

```npm run replies```

and retweets with

```npm run retweets```

As of writing this, retweets are limited to 100 and replies can only be fetched 7 days into the past.
