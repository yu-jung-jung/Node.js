//user input
var order = process.argv[2];
var userInput = process.argv[3];

//imports key.js
var keys = require("./key.js");

//install npm
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

//node liri.js my-tweets
function myTweets () {
  var params = {screen_name: 'blitheyj'};
  var client = new Twitter(keys.twitterK);

  client.get('statuses/user_timeline', params, function(error, tweets, response){

    if (!error) {

    for (var i =0; i <tweets.length; i++){

      console.log(tweets[i].created_at);
      console.log(tweets[i].text);

        } 
      }
    });
  }

// node liri.js spotify-this-song 'song name' 

function spotifyThis(){

  var spotify = new Spotify(keys.spotifyK);

  if(userInput === undefined) {

    spotify.search({ type: 'track', query: 'The Sign', limit:1 }, function(err, data) {

      if (err) {
        return console.log('Error occurred: ' + err);
      }

        for (var i = 0; i <data.length; i++){

          // artist, song name, preview link, album
        

          console.log("Artist: " + data.tracks.items.album.artists);
          console.log("Track: " + data.tracks.item)
          console.log("Album: " + data.traks.item.album);

        }       

    });
  }
  else {
    spotify.search({ type: 'track', query: userInput, limit:1}, function(err, data) {

      if (err) {
          return console.log('Error occurred: ' + err);
      }
        // artist, song name, preview link, album !!!!
        // console.log(data.tracks.items); 

          var test = JSON.stringify(data);
          var test2 = JSON.parse(data,null,2);
          console.log(test2);

        for (var i = 0; i < data.tracks.items.length; i++){

        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Track: " + data.tracks.item[i].album.name);
        console.log("Album: " + data.traks.item[i].album);

        }

    });
  }

}

// node liri.js movie-this 'movie name'
function movieThis(){
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";

    if(userInput = undefined){
      request("http://www.omdbapi.com/?t=Mr.nobody&y=&plot=short&apikey=40e9cece", function (error, response, body) {
      
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
    } else {
      request(queryUrl, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
            //rotten tomato !!!
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
function doThis() {

  fs.readFile("random.txt", "utf8", function(err,data){
    if(err){
       return console.log(err);
       } 
        data = data.split(",");

          userInput = data[1];
              
          spotifyThis();
  });

}

if (order === "my-tweets"){

  myTweets();
}
else if (order === "spotify-this-song"){

  spotifyThis();
}
else if (order === "movie-this"){

  movieThis();
}
else if (order === "do-what-it-says"){

  doThis();
} else {

  console.log("Sorry, That is undefined order")
}