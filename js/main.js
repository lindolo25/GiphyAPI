
var initialButtons = ["cat", "dog", "rabbit", "hamster", "skunk", "goldfish", "bird", "farret", "turtle"];


function init()
{
    // create initial buttons
    for(i = 0; i < initialButtons.length; i++)
    {
        $("#buttons-view").append(createButton(initialButtons[i]));
    }

    // create the submit click event
    $("#submit").on("click", addClick);
}

function addClick(event) 
{
    event.preventDefault();
    var newButton = $("#new-button-input").val().trim();
    $("#new-button-input").val("");

    if(newButton === "" || newButton === null) return;
    
    var exist = initialButtons.indexOf(newButton.toLowerCase());
    if(exist >= 0)
    {
        alert("This button already exist.");
        return;
    }

    initialButtons.push(newButton.toLowerCase());
    $("#buttons-view").append(createButton(newButton));
}

function searchClick(event) 
{
    console.log("button Clicked");

    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(printAPIResponse);
}

function toggleAnimation(event) 
{
    console.log("animation click");
    var img = $(this);
    var playing = img.attr("data-playing");
    if(playing === "True")
    {
        img.attr("src", img.attr("data-img-still"));
        img.attr("data-playing", "False");
    }
    else
    {
        img.attr("src", img.attr("data-img-animated"));
        img.attr("data-playing", "True");
    }
}

function printAPIResponse(response)
{
    var results = response.data;
    $("#main-view").empty();

    for (var i = 0; i < results.length; i++)
    {
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-div");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var Image = $("<img>");

        Image.attr("src", results[i].images.fixed_height_still.url);
        Image.attr("data-img-still", results[i].images.fixed_height_still.url);
        Image.attr("data-img-animated", results[i].images.fixed_height.url);
        Image.attr("data-playing", "False");
        Image.on("click", toggleAnimation);

        gifDiv.prepend(p);
        gifDiv.prepend(Image);

        $("#main-view").append(gifDiv);
    }
}

function createButton(buttonValue)
{
    var id = buttonValue.replace(/ /gi, "");
    var newButton = $("<button>");
    newButton.attr("id", id);
    newButton.attr("data-name", buttonValue);
    newButton.attr("type", "button");
    newButton.text(buttonValue);
    newButton.addClass("btn btn-dark")
    newButton.on("click", searchClick);
    
    return newButton;
}