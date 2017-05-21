//Requirements
var Twitter = require('twitter');
var env = require('dotenv').config();

//stream modules
var streamFilter = require('./streams/filters');
var streamError = require('./streams/error');
var streamIDs = require('./streams/ids');

//For serving the data to the client
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Just to make console logs pretty
var chalk = require('chalk');

//Twitter IDs for streaming
var streamParameters = {
	follow: streamIDs.getStreamIDs()
};

//Setting up the Twitter client
var client = new Twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
});

//Just to let you know that the app's starting
console.log(chalk.blue("Starting application..."));

//Listen to port
server.listen(80, function(){
	console.log(chalk.green("Application started! Listening to port: " + 3000));
});

//Serve the static files
app.use('/src', express.static('src'));

//Until I can figure out how to use AWS Cloudfront correctly,
//Just serve the audio files from src
app.use('/audio', express.static('mp3'));


//Start the stream. Find all Tweets with the word "bird"
client.stream('statuses/filter', {track: 'bird'}, function (stream) {
  	stream.on('data', function(tweet) {
		io.sockets.volatile.emit('tweet', {
	  		user: (tweet.user !== undefined) ? tweet.user.screen_name : '',
	  		text: tweet.text
  		});
	});
  	stream.on('error', streamError);
});

//Send the Twitter data to the client
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});