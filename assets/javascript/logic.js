// Variables

// Initialize Firebase
 // var config = {
    apiKey: "AIzaSyBrUEq3UanjWC7n4WA3k1mcAa_NSwSiiR8",
    authDomain: "movie-soon.firebaseapp.com",
    databaseURL: "https://movie-soon.firebaseio.com",
    projectId: "movie-soon",
    storageBucket: "",
    messagingSenderId: "684685466431"
  };
  firebase.initializeApp(config);
// End of Firebase

  var database 	= firebase.database();
  var authKeyGiphy = "550aa0ca0e7e4111a77bbb3c150b8351";
  var authKeyOmdb = "7d3b2da5";

  var queryGiphy = "http://api.giphy.com/v1/gifs/trending?api_key=" + authKeyGiphy;
  var queryOmdb = "http://www.omdbapi.com/?i=tt3896198&apikey=" + authKeyOmdb;
  

// Functions
function getGiphy (){
console.log("Inside Get Giphy function");

$.ajax({
	url: queryGiphy,
	method: "GET"
}).done(function(response){

});
}
function getOmdb (){
console.log("This is GEt OMDB");
$.ajax({
	url: queryOmdb,
	method: "GET"
}).done(function(response){
var posterImage = $('#poster');
console.log(posterImage);
});
}
// End of Functions


// Main Process
$('#submit').on('click', function(){
	console.log("I got clicked");
	var movieTitle = $('#submit').val();
getOmdb();
// getGiphy();
});

