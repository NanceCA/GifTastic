//javascript for assignment
var topics = [];//declaring array to capture the string inputs
var apiKey = "api_key=WqNuVYWXaAcb3l7C3wEOzvb2Z2OGpBMD"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=";

//looping through items in the array and creating buttons accordingly
var buildButtons = function () {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-primary");
        newButton.addClass("gif");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        console.log([i])

        $("#buttonView").append(newButton);
    }
}

$(document).ready(function () {
    buildButtons();
})
//event to push 

$("#find-gif").on("click", function (event) {
    event.preventDefault(); //preventing the form from trying to submit itself

    var gifData = $("#gif-input").val().trim();
    topics.push(gifData);
    $('#buttonView').empty()
    buildButtons();
    //calling in the api
    $.ajax({
        url: queryURL + gifData + '&' + apiKey + "&limit=10",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                var gifDiv = $("<div>");
                var rating = results[j].rating
                var p = $("<p>").text("Rating is " + rating);
                var personImage = $("<img>");
                personImage.attr("src", results[j].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(personImage);
                $("#gifs-appear-here").prepend(gifDiv);

            }

        }



    });



});

//pull appropriate GIFs according to the button clicked
//display 10 GIFs according to the button clicked
//display the rating for each GIF


// $(".gif").on("click", function () {

    // var state = $(this).attr("data-state");
//     // if (state === "still") {
//     //         $(this).attr("src", $(this).attr("data-animate"));
//     //         $(this).attr("data-state", "animated");
//     //         state = $(this).attr("data-state");
//     //         console.log("The image was still now it's " + state);
//     //     }
//     //     else {
//     //         $(this).attr("src", $(this).attr("data-still"));
//     //         $(this).attr("data-state", "still");
//     //         state = $(this).attr("data-state")
//     //         console.log("This was animated now it's " + state);
//     //     }

// });