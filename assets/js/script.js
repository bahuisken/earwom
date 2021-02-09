//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?


//hopefully when that closes it redirects us back...


//stole this -B
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;
//invalid
// _token = "BQBHkZ5MLGsXjgqS2yLKtrINNCtScx3DMWMikNKzNVOSGSm7TsX7gRXI5CxKtAmRMeo-JKGA8JBCqZrjtr8"

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '484101cfe3334822a8460d3399e625f0';
const redirectUri = 'https://bahuisken.github.io/project-1/';
// const scopes = [
//   'user-top-read'
// ];

// If there is no token, redirect to Spotify authorization
// if (!_token) {
//     window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
// }
//&scope=${scopes.join('%20')}

document.getElementById("authBtn").addEventListener("click", function (event) {
    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    } else {
        alert("Already have auth token")
    }
})

console.log(_token)

document.getElementById("submit-query-btn").addEventListener("click", function (event) {

    event.preventDefault();
    modal.removeClass("is-active");
    // var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");

    var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");
    // var searchBarValue = "rap%20god"

    // need func here to like check checkboxes and such
    // so I think we go one by one, and once one is true, we do it.
    var queryType = figureWhatTypeQuery()
    // var queryType = "album"
    console.log(queryType)
    var bestSongResponse;
    var bestArtistResponse;
    var bestAlbumResponse;
    var bestLyricResponse;

    if (queryType === "lyrics") {
        // console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
        fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
        )
            .then(response => response.json())
            .then(data => {
                // console.log(data.response.hits[0].result);
                var best = data.response.hits[0].result
                bestLyricResponse = {
                    songTitle: best.full_title,
                    primaryArist: best.primary_artist.name,
                    artistHeaderImage: best.primary_artist.header_image_url,
                    url: best.url,
                    songHeaderImage: best.header_image_url,
                    lyricsState = best.lyrics_state,
                    pageViews = best.stats.pageViews
                }
            });


    } else {
        //token out of date, will only work for tracks/songs.
        //Working out a solution.
        fetch(constructSpotifyQuery(searchBarValue, queryType), {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Accept": "application/json",
                "Authorization": "Bearer " + _token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                var best = data.items[0]
                if (queryType === "track") {
                    bestSongResponse = {
                        songName: best.name,
                        albumName: best.album.name,
                        releaseDate: best.album.release_date,
                        explicit: best.explicit,
                        duration: best.duration_ms,
                        id: best.id,
                        artists: getAllArtistNamesFromSpotifyAPI(best.artists),
                        albumImages: best.album.images
                    }
                } else if (queryType === "album") {
                    bestAlbumResponse = {
                        albumName: best.name,
                        albumType: best.album_type,
                        releaseDate: best.release_date,
                        totalTracks: best.total_tracks,
                        id: best.id,
                        artists: getAllArtistNamesFromSpotifyAPI(best.artists),
                        images: best.images
                    }
                } else if (queryType === "artist") {
                    bestArtistResponse = {
                        artistName: best.name,
                        artistGenres: best.genres,
                        artistImages: best.images,
                        artistType: best.type,
                        artistFollowers: best.followers.total
                    }
                }
            }
            )
    }
});


function getAllArtistNamesFromSpotifyAPI(artistsArray) {
    artists = {
        aristNames =[],
        artistIds =[]
    }
    artistsArray.forEach(element => {
        artists.artistNames.push(element.name)
        artists.artistIds.push(element.id)
    });
    return artists
}


function renderLyrics(bestLyricResponse, searchQuery) {
    //do something to render lyrics here, and save the search query.

}

function constructSpotifyQuery(query, type) {
    return "https://api.spotify.com/v1/search?q=" + query + "&type=" + type
}

function figureWhatTypeQuery() {
    if (document.querySelector("#lyrics").checked === true) {
        return "lyrics"
    } else if (document.querySelector("#Song").checked === true) {
        return "track"
    } else if (document.querySelector("#Album").checked === true) {
        return "album"
    } else if (document.querySelector("#Artists").checked === true) {
        return "artist"
    } else {
        return false
    }
}



//push results to page in some manor. I can just do this simply/briefly.
//probably need a different one for genius vs spotify
function generateResults(data) {

}
var closeM = $(".modal-close");
var modal = $(".modal");
closeM.click(function closeModal() {

    modal.removeClass("is-active");
})


var active = $("#active");
active.click(function openModal() {
    modal.addClass("is-active");
})