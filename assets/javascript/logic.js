
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


  //var queryGiphy = "http://api.giphy.com/v1/gifs/trending?api_key=550aa0ca0e7e4111a77bbb3c150b8351";


$('#submit').on('keypress click ', function(event){

  event.preventDefault();

  var movie = $('#userInput').val();
  var queryOmdb =  "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=104c64bb";

  var giphyMovie = "http://api.giphy.com/v1/gifs/search?q=" + movie + "+movie&api_key=550aa0ca0e7e4111a77bbb3c150b8351&limit=1";
  console.log(giphyMovie);

  $.ajax ({
    url: giphyMovie,
      method: "GET"
  })
  .done(function(response) {
    var results = response.data[0].images.preview_gif.url;
    $('body').css('background-image', 'url(' + results + ')');
        //$(".main-container").append(results);
      //$('#html').prepend(movieDiv);


    });



  $.ajax({
	   url: queryOmdb,
	    method: "GET"
    }).done(function(response){

      var rating = response.Rated;
      var released = response.Released;
      var plot = response.Plot;
      var imgURL = response.Poster;

      $("#movie-data").empty();
      $("#poster").empty();
      
      $("#movie-data").append("Rating:" + rating);
      $("#movie-data").append("Released: " + released);
      $("#movie-data").append("Plot " + plot);
      $("#poster").append("<img id='theImg' src='" + imgURL + "' />");

     });
   });



$('#submitReviewButton').on('click ', function(event){
  event.preventDefault();

  var review = $('#user-review').val().trim();

  var reviewOb = {
    movieReview: review
  }

  database.ref().push(reviewOb);
  console.log(review);
  $('#user-review').val('');
});

database.ref().orderByChild('TIMESTAMP').limitToLast(10).on("child_added", function(snapshot) {
  console.log(snapshot.val());

  var userReview = snapshot.val().movieReview;

  $(".table > tbody").append('<tr><td>'+ userReview +'</td><tr>');
});
