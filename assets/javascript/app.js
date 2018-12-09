var topics = ["Battlefield V", "Dark Souls", "Battlefield 1", "COD WW2", "Kratos", "Mirror's Edge", "Gears of War", "Battlefront", "Dead Space", "Halo 5", "GTA"];
var button;
var newGif = ""; 

var topicButtons = function (){
	 $("#buttonArea").empty();
	for(i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-info").attr("data",topics[i]);
		$("#buttonArea").append(button);
	};
}

$("#buttonArea").on("click", ".btn", function(){
  		var thing = $(this).attr("data");
  		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thing + "&api_key=4nYmPBW7K47A4CjP39V48gfXLSbgJKSh&limit=10";

  		$.ajax({
  			url: queryURL,
  			method: "GET" 

  		}).done(function(response){
  			console.log(response);
  			
          	var results = response.data;

          	for (var i = 0; i < results.length; i++) {
	          	var topicDiv = $("<div>");
                var p = $("<p>");
                 
                 p.text(results[i].rating);
                 
	 			var p = $("<p>").text("Rating: " + results[i].rating);
	 			var gameImage = $("<img>");

	 			gameImage.attr("src", results[i].images.fixed_height_still.url);
	 			gameImage.attr("data-still", results[i].images.fixed_height_still.url);
	 			gameImage.attr("data-animate", results[i].images.fixed_height.url)
	 			gameImage.attr("data-state", "still")
	 			gameImage.addClass("gif");
	 			topicDiv.append(gameImage);
                topicDiv.append(p); 
                 			
	 			$("#gifDiv").prepend(topicDiv);
 			}
  		})
  })

$("#gifDiv").on("click", ".gif", function(event){
    
    event.preventDefault();
	
    var state = $(this).attr("data-state");
    
	if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
  }     
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }

})

$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	newGif = $("#topic-input").val();
	topics.push(newGif);
	console.log(topics);
	topicButtons();
});

topicButtons(); 