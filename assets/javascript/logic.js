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

  var movieId = '';

  //var queryGiphy = "http://api.giphy.com/v1/gifs/trending?api_key=550aa0ca0e7e4111a77bbb3c150b8351";

  function checkReviews(movieId) {
    $(".table > tbody").empty();
    //if(reviewOb = true) {
    //if(reviewOb > 0) {

       console.log('looking for movieid = ' + movieId);
       // database.ref().orderByChild('TIMESTAMP').equalTo(movieId).limitToLast(10).on("child_added", function(snapshot) {
       database.ref().orderByChild('movieId').equalTo(movieId).limitToLast(10).on("child_added", function(snapshot) {
      // database.ref().orderByChild('movieId').equalTo(movieId).on('child_added', function(snapshot) {
      // database.ref().orderByChild('movieId').equalTo(true).on('child_added', function(Data){
      // database.ref().orderByChild('TIMESTAMP').limitToLast(10).on("child_added", function(snapshot) {
      // database.ref().orderByChild('TIMESTAMP').equalTo(movieId).on("value", function(snapshot) {
        console.log("The object from firebase" + snapshot.val().movieReview);
        var userReview = snapshot.val().movieReview;
        $(".table > tbody").prepend('<tr><td>'+ userReview +'</td><tr>');
      });
    };

  //};




$('#submit').on('keypress click ', function(event){
  event.preventDefault();
  var movie = $('#userInput').val();
  //this takes the id out of Firebase along with line 120
  //var movieId = $('.hideId').val();
  var queryOmdb =  "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=104c64bb";

  var giphyMovie = "http://api.giphy.com/v1/gifs/search?q=" + movie + "+movie&api_key=550aa0ca0e7e4111a77bbb3c150b8351&limit=10";
  console.log('giphymovie ' + giphyMovie);

  $.ajax ({
    url: giphyMovie,
      method: "GET"
  })
  .done(function(response) {
    for(var i=0; i<10; i++) {
      var results = response.data[i].images.fixed_width.url;
      var resultsstill = response.data[i].images.fixed_width_still.url;
      var gifBox = $("<div class='gifWrap'>");
      var gifImage = $("<img class='gifImg'>");
      gifImage.attr("src", resultsstill);
      gifImage.attr("data-still", resultsstill);
      gifImage.attr("data-animate", results);
      gifImage.attr("data-state", "still");
      $("#giphyBox").append(gifBox);
      gifBox.append(gifImage);
      //$(".main-container").append(results);
      //$('#html').prepend(movieDiv);
    }
  });


  $.ajax({
	   url: queryOmdb,
	    method: "GET"
    }).done(function(response){


      movieId = response.imdbID;
      var rating = response.Rated;
      var released = response.Released;
      var plot = response.Plot;
      var imgURL = response.Poster;

      console.log('movieid from imdb ' + movieId);
      checkReviews(movieId);
      $("#giphyBox").empty();
      $("#movie-data").empty();
      $("#poster").empty();


      var movieDiv = $("<div class='movie'>");

      $('#movie-data').append(movieDiv);
      var pRating = $('<p>').text('Rating:' + rating);
      var pReleased = $('<p>').text('Released:' + released);
      var pPlot = $('<p>').text('Plot:' + plot);
      //var hideDivId = $('<div class="hideId">').text(movieId); this one
      //var pImg = $('<img>').attr('src', imgURL);

      //movieDiv.append(pTitle);
      movieDiv.append(pRating);
      movieDiv.append(pReleased);
      movieDiv.append(pPlot);
     


      // $("#movie-data").append("Rating:" + rating);
      // $("#movie-data").append("Released: " + released);
      // $("#movie-data").append("Plot: " + plot);
       $("#poster").append("<img id='theImg' src='" + imgURL + "' />");

     });

});

$('#submitreviewbutton').on('click ', function(event){
  event.preventDefault();
  var review = $('#user-review').val().trim();
  //takes the id out of firebase
  //var movieId = $('.hideId').val().trim();
  console.log(movieId);
  var reviewOb = {
    movieReview: review,
    movieId: movieId
  }
  database.ref().push(reviewOb);
  console.log('review on click ' + review);
  $('#user-review').val('');
  //checkReviews();
});

$(document).on("click", ".gifImg", switcher);

function switcher() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
