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

  function checkReviews() {
    $(".table > tbody").empty();
    if(movieReviews = true) { //if(movieReviews > 0)
      database.ref().orderByChild('TIMESTAMP').limitToLast(10).on("child_added", function(snapshot) {
        console.log(snapshot.val());
        var userReview = snapshot.val().movieReview;
        var movieId = snapshot.val().id;
        $(".table > tbody").prepend('<tr><td>'+ userReview +'</td><tr>');
      })
    }
  }



$('#submit').on('keypress click ', function(event){
  event.preventDefault();
  var movie = $('#userInput').val();
  var queryOmdb =  "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=104c64bb";
  var giphyMovie = "http://api.giphy.com/v1/gifs/search?q=" + movie + "+movie&api_key=550aa0ca0e7e4111a77bbb3c150b8351&limit=10";
  console.log(giphyMovie);

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

      var rating = response.Rated;
      var released = response.Released;
      var plot = response.Plot;
      var imgURL = response.Poster;
      var movieId = response.imdbID;
      console.log(movieId);

      $("#giphyBox").empty();
      $("#movie-data").empty();
      $("#poster").empty();


      var movieDiv = $("<div class='movie'>");

      $('#movie-data').append(movieDiv);

      var pRating = $('<p>').text('Rating:' + rating);
      var pReleased = $('<p>').text('Released:' + released);
      var pPlot = $('<p>').text('Plot:' + plot);
      var hideMovieId = $('<p id="movieId">').text(movieId);
      //var pImg = $('<img>').attr('src', imgURL);

      movieDiv.append(pRating);
      movieDiv.append(pReleased);
      movieDiv.append(pPlot);
      movieDiv.append(hideMovieId);
      // $("#movie-data").append("Rating:" + rating);
      // $("#movie-data").append("Released: " + released);
      // $("#movie-data").append("Plot: " + plot);
       $("#poster").append("<img id='theImg' src='" + imgURL + "' />");

     });


   checkReviews();
});


$('#submitreviewbutton').on('click ', function(event){
  event.preventDefault();
  console.log("#movieId");
  var review = $('#user-review').val().trim();
  var id = $('#movieId').val().trim();
  var reviewOb = {
    movieReview: review,
    movieId: id
  }

  database.ref().push(reviewOb);
  console.log(review);
  $('#user-review').val('');
  checkReviews(); //Do we want this here?
});

  $(document).on("click", ".gifImg", switcher);
  function switcher() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }
