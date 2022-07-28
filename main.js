/**
 * Fetches retweets/replies of a tweet.
 * Insert your bearer token, the tweet ID below and run with "node main.js"
 * Uncomment/Comment out makeRepliesRequest / makeRetweetsRequest for the query you want to run.
 */

const needle = require("needle")

const BEARER_TOKEN = null /*Your bearer token here.*/
const TWEET_ID = null /*<Your tweet ID here>*/

const retweetsEndpointURL =
	"https://api.twitter.com/2/tweets/" + TWEET_ID + "/retweeted_by"

const endpointURL = "https://api.twitter.com/2/tweets/search/recent"

async function fetchReplies(nextToken = null) {
	const params = {
		query: `conversation_id:${TWEET_ID}`,
		"tweet.fields": "lang,author_id",
		"user.fields": "created_at,profile_image_url"
	}
	if (nextToken != null) {
		params.next_token = nextToken
	}

	const res = await needle("get", endpointURL, params, {
		headers: {
			"User-Agent": "v2RecentSearchJS",
			authorization: `Bearer ${BEARER_TOKEN}`
		}
	})

	if (res.body) {
		return res.body
	} else {
		throw new Error("Unsuccessful request")
	}
}
async function fetchRetweets() {
	const params = {
		"tweet.fields": "lang,author_id",
		"user.fields": "created_at,profile_image_url"
	}

	const res = await needle("get", retweetsEndpointURL, params, {
		headers: {
			"User-Agent": "v2RetweetedByUsersJS",
			authorization: `Bearer ${BEARER_TOKEN}`
		}
	})

	if (res.body) {
		return res.body
	} else {
		throw new Error("Unsuccessful request")
	}
}
async function makeRepliesRequest() {
	let allResponses = []
	let doneRequest = false
	let nextToken = null
	console.log(`Fetching replies to ${TWEET_ID}.`)
	while (!doneRequest || nextToken != null) {
		let response = await getNext(nextToken)
		doneRequest = true
		response.data.forEach(el => {
			allResponses.push(el)
		})
		console.log(`${allResponses.length} replies fetched`)
		nextToken = response.meta.next_token
	}

	console.log(`${allResponses.length} replies fetched:`)
	console.log(`Response:`)
	console.log(allResponses)

	let tezAdresses = []

	allResponses.forEach(entry => {
		let regexResult = getTezAdressFromText(entry.text)
		if (regexResult != null) {
			tezAdresses.push(regexResult[0])
		}
	})

	console.log(`Parsed tez adresses: (${tezAdresses.length})`)
	console.log(tezAdresses)
}
async function getNext(nextToken = null) {
	let resp = await fetchReplies(nextToken)
	return resp
}

function getTezAdressFromText(text) {
	let regex0 = new RegExp("tz[1-4][1-9A-HJ-NP-Za-km-z]{33}")
	let regex1 = new RegExp("\\w*.tez\\b")
	let res = regex0.exec(text)
	if (res != null) return res
	res = regex1.exec(text)
	return res
}
async function makeRetweetsRequest() {
	try {
		const response = await fetchRetweets()
		console.dir(response, {
			depth: null
		})
	} catch (e) {
		console.log(e)
		process.exit(-1)
	}
	process.exit()
}

makeRepliesRequest()
// makeRetweetsRequest()
