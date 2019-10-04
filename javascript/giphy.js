$(document).ready(function () {
    populateButtons(topics, 'space-button', '#space-topic');
    console.log("test"); 1
});

// listing my array of topics - spacey
var topics = [" Alien ", " galaxy", " black hole", " star ", "Asteroid", "Super Nova", "Spaceship", "Mars", "Mars Rover", "Moon", "Comets", "Meteors","iss", "earth",
    "Dwarf Planet", "Jupiter", "Stars", "Space Junk", "Earth", "Sun", "Telescope", "Nasa", "Mercury", "Meteorite", "Andromeda", "UFO","Milky Way", "Sombrero Galaxy","Mariachi","scrapbook","boxer dog","horse","dancing dog"];

// function that populates and appends buttons
function populateButtons(topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', topics[i]);
        a.text(topics[i]);
        $(areaToAddTo).append(a);
    }
};


$(document).on('click', '.space-button', function () {
    $('#gif-here').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=AupfjjGEgKr53rsmdYWnnn0POxy5Ht5q';
    // // ajax request
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var SpaceDiv = $('<div class=\"space-item\">');
                var rating = response.data[i].rating;
                var p = $('<p class="neon-1">').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', animated);
                image.attr('data-animated', still);
                image.attr('data-state', 'still',animated);
                image.addClass('spaceImage');
                SpaceDiv.append(p);
                SpaceDiv.append(image);
                $('#gif-here').append(SpaceDiv);
            }
        })

        ;

    $(document).on('click', '.spaceImage', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animated'));
            $(this).attr('data-state', 'animated');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    })

    $('#add-space').on('click', function () {
        var newSpace = $('input').eq(0).val();
        topics.push(newSpace);
        populateButtons(topics, 'space-button', '#space-topic');
        return false;
    })

})