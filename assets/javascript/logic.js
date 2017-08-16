var config = {
	apiKey: "AIzaSyBuS8nclrAYanROXUHbjObahizCD09OzRI",
	authDomain: "moviesoon-99bc7.firebaseapp.com",
	databaseURL: "https://moviesoon-99bc7.firebaseio.com",
	projectId: "moviesoon-99bc7",
	storageBucket: "",
	messagingSenderId: "624991343805"
};
firebase.initializeApp(config);
var database = firebase.database();
var movieId = '';

$("#searchform").submit(function(e) {
  e.preventDefault();
});

$("#reviewform").submit(function(e) {
  e.preventDefault();
});

function checkReviews(movieId) {
	$(".table > tbody").empty();
	console.log('looking for movieid = ' + movieId);
	database.ref().orderByChild('movieId').equalTo(movieId).limitToLast(10).on("child_added", function(snapshot) {
		console.log("The object from firebase" + snapshot.val().movieReview);
		var userReview = snapshot.val().movieReview;
		$(".table > tbody").prepend('<tr><td>' + userReview + '</td><tr>');
	});
};
$('#submit').on('keypress click ', function(event) {
	event.preventDefault();
	var movie = $('#userInput').val();
	var queryOmdb = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=104c64bb";
	var giphyMovie = "https://api.giphy.com/v1/gifs/search?q=" + movie + "+movie&api_key=550aa0ca0e7e4111a77bbb3c150b8351&limit=10";
	console.log('giphymovie ' + giphyMovie);
	$.ajax({
		url: giphyMovie,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < 10; i++) {
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
		};
	});
	$.ajax({
		url: queryOmdb,
		method: "GET"
	}).done(function(response) {
		movieId = response.imdbID;
		var rating = response.Rated;
		var released = response.Released;
		var plot = response.Plot;
		var imgURL = response.Poster;
		var actors = response.Actors;
		var title = response.Title;
		var awards = response.Awards;
		var language = response.Language;
		var released = response.Released;
		var genre = response.Genre;

		console.log('movieid from imdb ' + movieId);
		checkReviews(movieId);
		$("#giphyBox").empty();
		$("#movie-data").empty();
		$("#poster").empty();

		var movieDiv = $("<div class='movie'>");
		$('#movie-data').append(movieDiv);

		var pRating = $('<p>').text('Rating: ' + rating);
		var pReleased = $('<p>').text('Released: ' + released);
		var pPlot = $('<p>').text('Plot: ' + plot);
		var pActors = $('<p>').text('Actors:  ' + actors);
		var pTitle = $('<p>').text('Title:' + title);
		var pAwards = $('<p>').text('Awards: ' + awards);
		var pLanguage = $('<p>').text('Language: ' + language);
		var pReleased = $('<p>').text('Released: ' + released);
		var pGenre = $('<p>').text('Genre: ' + genre);

		movieDiv.append(pTitle)
		movieDiv.append(pActors);
		movieDiv.append(pRating);
		movieDiv.append(pReleased);
		movieDiv.append(pPlot);
		movieDiv.append(pAwards);
		movieDiv.append(pLanguage);
		movieDiv.append(pReleased);
		movieDiv.append(pGenre);

		$("#poster").append("<img id='theImg' src='" + imgURL + "' />");
	});
});
$('#submitreviewbutton').on('click ', function(event) {
	event.preventDefault();
	var review = $('#user-review').val().trim();
	console.log(movieId);
	var reviewOb = {
		movieReview: review,
		movieId: movieId
	}
	database.ref().push(reviewOb);
	console.log('review on click ' + review);
	$('#user-review').val('');
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
