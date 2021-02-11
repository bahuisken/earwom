//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?


//hopefully when that closes it redirects us back...
var lyricsBox = document.getElementById("lyricsBox")
var songBox = document.getElementById("songsBox")
var albumBox = document.getElementById("albumsBox")
var artistBox = document.getElementById("artistsBox")


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
//SET YOUR TEMP TOKEN HERE FOR LOCAL TESTING!!!
//CHECK SLACK TO GET SUCH A TOKEN
_token = "BQAPBWMAPhHqSCRe03FJjQnwdtWdzi32CXzgmx_IhgrYWJ6MzVXqBxGhENbV-88xVcS6CjXo5t3M2GG_W4A"

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
    event.preventDefault();
    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    } else {
        alert("Already have auth token");
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
    var queryType = figureWhatTypeQuery();
    // var queryType = "album"
    console.log(queryType);
    var bestSongResponse;
    var bestArtistResponse;
    var bestAlbumResponse;
    var bestLyricResponse;

    //clear boxes so we don't show the same thing many times
    if (queryType === "lyrics") {
        lyricsBox.innerHTML = ""
    } else if (queryType === "track") {
        songBox.innerHTML = ""
    } else if (queryType === "album") {
        albumBox.innerHTML = ""
    }
    else if (queryType === "artist") {
        artistBox.innerHTML = ""
    }

    if (queryType === "lyrics") {
        // console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
        fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
        )
            .then(response => response.json())
            .then(data => {
                // console.log(data.response.hits[0].result);
                var best = data.response.hits[0].result
                console.log(best)
                bestLyricResponse = {
                    songTitle: best.full_title,
                    primaryArist: best.primary_artist.name,
                    artistHeaderImage: best.primary_artist.header_image_url,
                    url: best.url,
                    songHeaderImage: best.header_image_url,
                    lyricsState: best.lyrics_state,
                    pageViews: best.stats.pageviews
                }
                renderLyrics(bestLyricResponse)
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
                var best;
                //console.log(data.tracks.items[0])
                // var best = data.items[0];
                if (queryType === "track") {
                    songBox.innerHTML = ""
                    best = data.tracks.items[0]
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
                    renderSong(bestSongResponse)
                } else if (queryType === "album") {
                    best = data.albums.items[0]
                    bestAlbumResponse = {
                        albumName: best.name,
                        albumType: best.album_type,
                        releaseDate: best.release_date,
                        totalTracks: best.total_tracks,
                        id: best.id,
                        artists: getAllArtistNamesFromSpotifyAPI(best.artists),
                        images: best.images
                    }
                    renderAlbums(bestAlbumResponse)
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
    console.log(artistsArray)
    artists = {
        artistNames: [],
        artistIds: []
    }
    artistsArray.forEach(element => {
        artists.artistNames.push(element.name)
        artists.artistIds.push(element.id)
    });
    return artists
}

//Basic bits are done
function renderLyrics(bestLyricResponse) {
    // songTitle: best.full_title,
    // primaryArist: best.primary_artist.name,
    // artistHeaderImage: best.primary_artist.header_image_url,
    // url: best.url,
    // songHeaderImage: best.header_image_url,
    // lyricsState: best.lyrics_state,
    // pageViews: best.stats.pageViews
    var htmlElement;

    lyricsBox.innerHTML = ""

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Title: " + bestLyricResponse.songTitle
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Artist: " + bestLyricResponse.primaryArist
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("img")
    htmlElement.setAttribute("src", bestLyricResponse.artistHeaderImage)
    htmlElement.setAttribute("alt", "Image of artist")
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("a")
    htmlElement.setAttribute("href", bestLyricResponse.url)
    htmlElement.textContent = "Link to Genius Lyrics!"
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("img")
    htmlElement.setAttribute("src", bestLyricResponse.songHeaderImage)
    htmlElement.setAttribute("alt", "Image for song")
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Lyric state: " + bestLyricResponse.lyricsState
    lyricsBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Page Views: " + bestLyricResponse.pageViews
    lyricsBox.appendChild(htmlElement)

}

function renderAlbums(bestLyricResponse) {

    for (const key in bestLyricResponse) {
        if (Object.hasOwnProperty.call(bestLyricResponse, key)) {
            const element = bestLyricResponse[key];
            var div = document.createElement("div")
            div.textContent = element
            albumBox.appendChild(div)
        }
    }
}

function renderSong(bestLyricResponse) {
    // songName: best.name,
    // albumName: best.album.name,
    // releaseDate: best.album.release_date,
    // explicit: best.explicit,
    // duration: best.duration_ms,
    // id: best.id,
    // artists: getAllArtistNamesFromSpotifyAPI(best.artists),
    // albumImages: best.album.images
    document.getElementById("songsBox").innterHTML = "";

    var htmlElement;

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Song Name: " + bestLyricResponse.songName
    songBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Album Name: " + bestLyricResponse.albumName
    songBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Release Date: " + bestLyricResponse.releaseDate
    songBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Explicit?: " + bestLyricResponse.explicit
    songBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "Duration: " + bestLyricResponse.duration
    songBox.appendChild(htmlElement)

    htmlElement = document.createElement("p")
    htmlElement.textContent = "ID (sorta unneeded): " + bestLyricResponse.id
    songBox.appendChild(htmlElement)

    // console.log(bestLyricResponse.artists)
    htmlElement = document.createElement("p")
    htmlElement.textContent = "Contributing artists: " + bestLyricResponse.artists.artistNames.join(", ")
    songBox.appendChild(htmlElement)

    // console.log(bestLyricResponse.albumImages[0])
    htmlElement = document.createElement("img")
    htmlElement.setAttribute("src", bestLyricResponse.albumImages[0].url)
    songBox.appendChild(htmlElement)




    // for (const key in bestLyricResponse) {
    //     if (Object.hasOwnProperty.call(bestLyricResponse, key)) {
    //         const element = bestLyricResponse[key];
    //         var div = document.createElement("div")
    //         div.textContent = element
    //         songBox.appendChild(div)
    //     }
    // }
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