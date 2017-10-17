//user-input
var order = process.argv[2];

//import key.js
var keys = require("./key.js");

//node liri.js my-tweets
if (order === "my-tweets") {

  function myTweets () {

    var twitter = require('twitter');

    var params = {screen_name: 'blitheyj'};

    var client = (twitter)(keys.twitterK);

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    console.log(tweets);

    }

  });

  }
}
// node liri.js spotify-this-song 'song name'
// take multiple words
// If no song is provided then your program will default to "The Sign" by Ace of Base.
else if(order === "spotify-this-song") {

  function spotifyThis () {

  var Spotify = require('node-spotify-api');
   
  var spotify = new Spotify(keys.spotifyK);

  var songName = process.argv[3]

  spotify.search({ type: 'artist', query: songName}, function(err, data) {
  // if no song is provided then your program will default to "The Sign" by Ace of Base.
    if (err) {
      return console.log('Error occurred: ' + err);
    }   
      console.log(data.tracks);

    });

  }
}

// node liri.js movie-this 'movie name'
// take multiple words
// err: If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
else if(order === "movie-this"){

  function movieThis() {

  var request = require('request');

  var movieName = process.argv[3];

  var queryUrl =  "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function (error, response, body) {
    
      if (!error && response.statusCode === 200) {

        console.log("Title               :" + JSON.parse(body).Title);
        console.log("Year                :" + JSON.parse(body).Year);
        console.log("IMDB Rating         :" + JSON.parse(body).imdbRating);
        console.log("Rotten Tomato Rating:" + JSON.parse(body).Ratings);
        console.log("Country             :" + JSON.parse(body).Country);
        console.log("Language            :" + JSON.parse(body).Language);
        console.log("Plot                :" + JSON.parse(body).Plot);
        console.log("Actors              :" + JSON.parse(body).Actors);
     
  }
  
  });

  }
}
// node liri.js do-what-it-says
else if(order === "do-what-it-says"){


  function doThis() {

    var fs = require("fs");

    switch (order) {

      case "my-tweets":
        myTweets()
        break;

      case "spotify-this-song":
        spotifyThis()
        break;

      case "movie-this":
        movieThis()
        break;
    }

// read txt file and apply to the command line

    fs.readFile("random.txt", "utf8", function(err, data){
      if(err){

        return console.log(err);
      }

      data = data.split(",");

    })

  }
}

// if nothing matches
else{
  console.log("Sorry, Could you try one more time?")
}