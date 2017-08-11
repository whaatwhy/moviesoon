
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBuS8nclrAYanROXUHbjObahizCD09OzRI",
    authDomain: "moviesoon-99bc7.firebaseapp.com",
    databaseURL: "https://moviesoon-99bc7.firebaseio.com",
    projectId: "moviesoon-99bc7",
    storageBucket: "",
    messagingSenderId: "624991343805"
  };
  firebase.initializeApp(config);

  var database 	= firebase.database();

  var authKeyGiphy = "550aa0ca0e7e4111a77bbb3c150b8351";

  var queryGiphy = "http://api.giphy.com/v1/gifs/trending?api_key=" + authKeyGiphy;


  $('#submit').on('click', function(event){
    console.log("I got clicked");
    var movie = $(this).attr('data-name');
    var queryOmbd =  "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=104c64bb";

    event.preventDefault();
  $.ajax({
	   url: queryOmbd,
	    method: "GET"
    }).done(function(response){


        var rating = response.Rated;

        var pRating = $("#movie-data").append("Rating:" + rating);

        $('#movie-data').append(pRating);

        var released = response.Released;

        var pReleased = $("#movie-data").append("Released: " + released);

        $('#movie-data').append(pReleased);

        var plot = response.Plot;

        var pPlot = $("#movie-data").append("Plot " + plot);

        $('#movie-data').append(pPlot)

        var imgURL = response.Poster;

        var image = $("#poster").append("src", imgURL);

        $('#poster').append(image);

      });
});

/*$('#submit').on('click', function(event){
  console.log("I got clicked");
  event.preventDefault();

  var movie = $('#submitButton').val();

  $('.invisible-container').append(movie);
});*/

//$(document).on('click', '.movie-data', displayMovieInfo);

  //var movie = $("#userInput").val().trim();

  //$('#movie-data').append(movie);



/*function getOmdb (){
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
});*/
