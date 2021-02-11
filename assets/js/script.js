//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?


//hopefully when that closes it redirects us back...
// var lyricsBox = document.getElementById("lyricsBox")
// var songBox = document.getElementById("songsBox")
// var albumBox = document.getElementById("albumsBox")
// var artistBox = document.getElementById("artistsBox")
var lyricsImgEl = document.getElementById("lyrics-img");
var lyricsBioEl = document.getElementById("lyrics-bio");

var albumImgEl = document.getElementById("albums-img");
var albumBioEl = document.getElementById("albums-bio");

var songImgEl = document.getElementById("songs-img");
var songBioEl = document.getElementById("songs-bio");

var artistsImgEl = document.getElementById("artists-img");
var artistsBioEl = document.getElementById("artists-bio");


var lyricsTitle = document.createElement("h2");
var lyricsArtist = document.createElement("h2");
var lyricsAlbum = document.createElement("h2");
var lyricsImg = document.createElement("img");

var songTitle = document.createElement("h2");
var songArtist = document.createElement("h2");
var songAlbum = document.createElement("h2");
var songImg = document.createElement("img");
var songBio = document.createElement("p");

var albumTitle = document.createElement("h2");
var albumArtist = document.createElement("h2");
var albumImg = document.createElement("img");

var artistTitle = document.createElement("h2");
var artistImg = document.createElement("img");

var title = document.createElement("h2");
var img = document.createElement("img");

var songRadio = document.getElementById("song-label");
var albumRadio = document.getElementById("album-label");
var artistRadio = document.getElementById("artist-label");

var spotifyEl = document.getElementById("spotify");

var bioData;
var bioLink;
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
//_token = "BQDE39txuxmBcttjiOyeX4-2Gcz_jJHniNIZYvms3i7w_cFi1emxUubve6GXcxE0TzjBLta6LaWJOdaoqJE";
if (_token) {
    songRadio.style.display = "inline";
    albumRadio.style.display = "inline";
    artistRadio.style.display = "inline";
    spotifyEl.remove();
}
//SET YOUR TEMP TOKEN HERE FOR LOCAL TESTING!!!
//CHECK SLACK TO GET SUCH A TOKEN


const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '484101cfe3334822a8460d3399e625f0';
const redirectUri = 'https://bahuisken.github.io/project-1/';

document.getElementById("authBtn").addEventListener("click", function (event) {
    event.preventDefault();
    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    } else {
        alert("Already have auth token");
    }
})

//console.log(_token)

var recentLyrics = JSON.parse(localStorage.getItem('lyrics'));
if (recentLyrics) {
    renderLyrics(recentLyrics)
}
var recentSong = JSON.parse(localStorage.getItem('song'));
if (recentSong) {
    renderSong(recentSong)
}
var recentAlbum = JSON.parse(localStorage.getItem('album'));
if (recentAlbum) {
    renderAlbums(recentAlbum)
}
var recentArtist = JSON.parse(localStorage.getItem('artist'));
if (recentArtist) {
    renderArtist(recentArtist)
}





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

    } else if (queryType === "track") {

    } else if (queryType === "album") {

    }
    else if (queryType === "artist") {

    }

    if (queryType === "lyrics") {
        var lyricObject = JSON.parse(localStorage.getItem('lyrics'));
        if (lyricObject) {
            img.remove();
            title.remove();
        }
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
                console.log(bestLyricResponse);
                var lyricResponseString = JSON.stringify(bestLyricResponse);
                localStorage.setItem('lyrics', lyricResponseString);
                renderLyrics(bestLyricResponse)
                discogsArtist(bestLyricResponse.primaryArist)
            });

    } else {
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
                if (queryType === "track") {
                    // songBox.innerHTML = ""
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
                    console.log(bestSongResponse);
                    var songResponseString = JSON.stringify(bestSongResponse);
                    localStorage.setItem('song', songResponseString);
                    renderSong(bestSongResponse);
                    discogsArtist(bestSongResponse.artists.artistNames[0]);
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
                    var albumResponseString = JSON.stringify(bestAlbumResponse);
                    localStorage.setItem('album', albumResponseString);
                    renderAlbums(bestAlbumResponse);
                    discogsArtist(bestAlbumResponse.artists.artistNames[0]);
                } else if (queryType === "artist") {
                    best = data.artists.items[0]
                    bestArtistResponse = {
                        artistName: best.name,
                        artistGenres: best.genres,
                        artistImages: best.images,
                        artistType: best.type,
                        artistFollowers: best.followers.total
                    }
                    var artistResponseString = JSON.stringify(bestArtistResponse);
                    localStorage.setItem('artist', artistResponseString);
                    renderArtist(bestArtistResponse);
                    discogsArtist(bestArtistResponse.artistName);

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
function renderLyrics(lyricObject) {
    // songTitle: best.full_title,
    // primaryArist: best.primary_artist.name,
    // artistHeaderImage: best.primary_artist.header_image_url,
    // url: best.url,
    // songHeaderImage: best.header_image_url,
    // lyricsState: best.lyrics_state,
    // pageViews: best.stats.pageViews
    lyricsTitle.textContent = lyricObject.songTitle;
    lyricsImgEl.appendChild(lyricsTitle);
    lyricsArtist.textContent = lyricObject.primaryArist
    lyricsImgEl.appendChild(lyricsArtist);
    //don't get artist from genius.
    // lyricsAlbum.textContent = lyricsObject.
    lyricsImg.src = lyricObject.songHeaderImage;
    lyricsImgEl.appendChild(lyricsImg);


}

function renderAlbums(albumObject) {
    // albumName: best.name,
    // albumType: best.album_type,
    // releaseDate: best.release_date,
    // totalTracks: best.total_tracks,
    // id: best.id,
    // artists: getAllArtistNamesFromSpotifyAPI(best.artists),
    // images: best.images

    albumTitle.textContent = albumObject.albumName;
    albumImgEl.appendChild(albumTitle);

    albumArtist.textContent = albumObject.artists.artistNames[0];
    albumImgEl.appendChild(albumArtist);

    albumImg.src = albumObject.images[0].url;
    albumImgEl.appendChild(albumImg);




}

function renderArtist(artistObject) {
    // artistName: best.name,
    // artistGenres: best.genres,
    // artistImages: best.images,
    // artistType: best.type,
    // artistFollowers: best.followers.total
    artistTitle.textContent = artistObject.artistName
    artistsImgEl.appendChild(artistTitle)

    artistImg.src = artistObject.artistImages[0].url;
    artistsImgEl.appendChild(artistImg);


}

function renderSong(songObject) {
    // songName: best.name,
    // albumName: best.album.name,
    // releaseDate: best.album.release_date,
    // explicit: best.explicit,
    // duration: best.duration_ms,
    // id: best.id,
    // artists: getAllArtistNamesFromSpotifyAPI(best.artists),
    // albumImages: best.album.images

    songTitle.textContent = songObject.songName;
    songImgEl.appendChild(songTitle);

    songAlbum.textContent = songObject.albumName;
    songImgEl.appendChild(songAlbum);

    songArtist.textContent = songObject.artists.artistNames[0]
    songImgEl.appendChild(songArtist);

    songImg.src = songObject.albumImages[0].url;
    songImgEl.appendChild(songImg);

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

function discogsArtist(artist) {

    fetch("https://api.discogs.com/database/search?q=" + artist + "&token=FFvTYocHFIohHeiKPxwTEgMcpiVjPZUwnsPfvEtE"
    )
        .then(response => response.json())
        .then(data => {
            var artistResult = data.results;
            for (let index = 0; index < artistResult.length; index++) {
                const element = artistResult[index];
                if (element.type === "artist") {
                    var realResult = element;
                    break;
                }
            }
            console.log(realResult);
            return fetch(`https://api.discogs.com/artists/${realResult.id}`);
        })
        .then(response => response.json())
        .then(data => {
            bioData = data.profile;
            bioLink = data.uri;
            console.log(bioData);
        })
    return [bioData, bioLink];

}


//push results to page in some manor. I can just do this simply/briefly.
//probably need a different one for genius vs spotify

var closeM = $(".modal-close");
var modal = $(".modal");
closeM.click(function closeModal() {

    modal.removeClass("is-active");
})


var active = $("#active");
active.click(function openModal() {
    modal.addClass("is-active");
})