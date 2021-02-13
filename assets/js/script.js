//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?


//hopefully when that closes it redirects us back...
// var lyricsBox = document.getElementById("lyricsBox")
// var songBox = document.getElementById("songsBox")
// var albumBox = document.getElementById("albumsBox")
// var artistBox = document.getElementById("artistsBox")
var clearBtn = document.getElementById("clear");

var lyricsBoxEl = document.getElementById("lyrics-box");
var lyricsImgEl = document.getElementById("lyrics-img");
var lyricsBioEl = document.getElementById("lyrics-bio");

var albumBoxEl = document.getElementById("albums-box");
var albumImgEl = document.getElementById("albums-img");
var albumBioEl = document.getElementById("albums-bio");

var songBoxEl = document.getElementById("songs-box");
var songImgEl = document.getElementById("songs-img");
var songBioEl = document.getElementById("songs-bio");

var artistBoxEl = document.getElementById("artists-box");
var artistImgEl = document.getElementById("artists-img");
var artistBioEl = document.getElementById("artists-bio");

var breaker = document.createElement("br");

var lyricsTitle = document.createElement("h2");
var lyricsArtist = document.createElement("h2");
var lyricsAlbum = document.createElement("h2");
var lyricsImg = document.createElement("img");
var lyricsBy = document.createElement("h2");
var lyricsLink = document.createElement("a");
var lyricsBuy = document.createElement("a");
var lyricsBtn = document.createElement("button");
lyricsBtn.classList.add("is-custom");
lyricsBtn.textContent = "Clear Box";


var songTitle = document.createElement("h2");
var songArtist = document.createElement("h2");
var songAlbum = document.createElement("h2");
var songImg = document.createElement("img");
var songBuy = document.createElement("a");
var songBtn = document.createElement("button");
songBtn.classList.add("is-custom");
songBtn.textContent = "Clear Box";

var albumTitle = document.createElement("h2");
var albumArtist = document.createElement("h2");
var albumImg = document.createElement("img");
var albumBuy = document.createElement("a");
var albumBtn = document.createElement("button");
albumBtn.classList.add("is-custom");
albumBtn.textContent = "Clear Box";


var artistTitle = document.createElement("h2");
var artistImg = document.createElement("img");
var artistBio = document.createElement("p");
var artistLink = document.createElement("a");
var artistBtn = document.createElement("button");
artistBtn.classList.add("is-custom");
artistBtn.textContent = "Clear Box";

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
//_token = "BQBKFcfTNbyu06yW20WGDCXg-VFmB3zngBN9rvVj7CFitsVpGYHp051GGhe4NfCbK_ZBpZOYckGHDrpbLeY";

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


var recentDiscogsLyrics = JSON.parse(localStorage.getItem('discogsLyrics'));
if (recentDiscogsLyrics) {
    renderDiscogsLyrics(recentDiscogsLyrics)
}
var recentDiscogsSong = JSON.parse(localStorage.getItem('discogsSong'));
if (recentDiscogsSong) {
    renderDiscogsSong(recentDiscogsSong)
}
var recentDiscogsAlbum = JSON.parse(localStorage.getItem('discogsAlbum'));
if (recentDiscogsAlbum) {
    renderDiscogsAlbum(recentDiscogsAlbum)
}
var recentDiscogsArtist = JSON.parse(localStorage.getItem('discogsArtist'));
if (recentDiscogsArtist) {
    renderDiscogsArtist(recentDiscogsArtist)
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
        console.log(_token);
        var lyricObject = JSON.parse(localStorage.getItem('lyrics'));
        console.log(lyricObject);
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
                    songTitle: best.title,
                    primaryArist: best.primary_artist.name,
                    artistHeaderImage: best.primary_artist.header_image_url,
                    url: best.url,
                    songHeaderImage: best.header_image_url,
                    lyricsLink: best.url,
                    pageViews: best.stats.pageviews
                }
                console.log(bestLyricResponse);
                var lyricResponseString = JSON.stringify(bestLyricResponse);
                localStorage.setItem('lyrics', lyricResponseString);
                renderLyrics(bestLyricResponse);
                discogsData(bestLyricResponse.songTitle + '&artist=' + bestLyricResponse.primaryArist)
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
                    discogsData(bestSongResponse.albumName + '&artist=' + bestSongResponse.artists.artistNames[0]);
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
                    discogsData(bestAlbumResponse.albumName + '&artist=' + bestAlbumResponse.artists.artistNames[0]);
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
                    discogsData(bestArtistResponse.artistName);

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
    //don't get artist from genius.
    // lyricsAlbum.textContent = lyricsObject.
    lyricsImg.src = lyricObject.songHeaderImage;
    lyricsImgEl.appendChild(lyricsImg);
    lyricsTitle.textContent = lyricObject.songTitle;
    lyricsTitle.setAttribute("class", "has-text-weight-bold")
    lyricsBy.textContent = "By: " + lyricObject.primaryArist;
    lyricsLink.setAttribute("href", lyricObject.url);
    lyricsLink.setAttribute("target", "_blank");
    lyricsLink.textContent = "View Lyrics on GENIUS";
    lyricsBioEl.appendChild(lyricsTitle);
    lyricsBioEl.appendChild(lyricsBy);
    lyricsBioEl.appendChild(lyricsLink);
    lyricsBoxEl.appendChild(lyricsBtn);
}


function renderAlbums(albumObject) {
    // albumName: best.name,
    // albumType: best.album_type,
    // releaseDate: best.release_date,
    // totalTracks: best.total_tracks,
    // id: best.id,
    // artists: getAllArtistNamesFromSpotifyAPI(best.artists),
    // images: best.images

    albumImg.src = albumObject.images[0].url;
    albumImgEl.appendChild(albumImg);

    albumTitle.textContent = albumObject.albumName;
    albumTitle.setAttribute("class", "has-text-weight-bold")
    albumBioEl.appendChild(albumTitle);

    albumArtist.textContent = "By: " + albumObject.artists.artistNames[0];
    albumBioEl.appendChild(albumArtist);
    albumBoxEl.appendChild(albumBtn);

}

function renderArtist(artistObject) {
    // artistName: best.name,
    // artistGenres: best.genres,
    // artistImages: best.images,
    // artistType: best.type,
    // artistFollowers: best.followers.total
    artistImg.src = artistObject.artistImages[0].url;
    artistImgEl.appendChild(artistImg);

    artistTitle.textContent = artistObject.artistName
    artistTitle.setAttribute("class", "has-text-weight-bold")
    artistBioEl.appendChild(artistTitle)
    artistBoxEl.appendChild(artistBtn);

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



    songImg.src = songObject.albumImages[0].url;
    songImgEl.appendChild(songImg);

    songTitle.textContent = songObject.songName;
    songTitle.setAttribute("class", "has-text-weight-bold")
    songBioEl.appendChild(songTitle);

    songArtist.textContent = "By: " + songObject.artists.artistNames[0]
    songBioEl.appendChild(songArtist);

    songAlbum.textContent = "From: " + songObject.albumName;
    songBioEl.appendChild(songAlbum);
    songBoxEl.appendChild(songBtn);
}

function renderDiscogsLyrics(discogsLyricObject) {
    lyricsBuy.setAttribute("href", discogsLyricObject.url);
    lyricsBuy.setAttribute("target", "_blank");
    lyricsBuy.innerHTML = "<br>Browse on DISCOGS";
    lyricsBioEl.appendChild(lyricsBuy);

}

function renderDiscogsSong(discogsSongObject) {
    songBuy.setAttribute("href", discogsSongObject.url);
    songBuy.setAttribute("target", "_blank");
    songBuy.textContent = "Browse on DISCOGS";
    songBioEl.appendChild(songBuy);
}

function renderDiscogsAlbum(discogsAlbumObject) {
    albumBuy.setAttribute("href", discogsAlbumObject.url);
    albumBuy.setAttribute("target", "_blank");
    albumBuy.textContent = "Browse on DISCOGS";
    albumBioEl.appendChild(albumBuy);
}

function renderDiscogsArtist(discogsArtistObject) {
    artistBio.textContent = discogsArtistObject.bio + "...";
    artistLink.setAttribute("href", discogsArtistObject.url);
    artistLink.setAttribute("target", "_blank");
    artistLink.textContent = " Read more on DISCOGS";
    artistBioEl.appendChild(artistBio);
    artistBio.appendChild(breaker);
    artistBio.appendChild(artistLink);
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

function discogsData(results) {
    var queryType = figureWhatTypeQuery();
    if (queryType === "lyrics") {
        fetch("https://api.discogs.com/database/search?track=" + results + "&token=FFvTYocHFIohHeiKPxwTEgMcpiVjPZUwnsPfvEtE")
            .then(response => response.json())
            .then(data => {
                var discogLyricResult = {
                    url: "https://www.discogs.com/master/view/" + data.results[0].master_id
                }
                var discogLyricResponseString = JSON.stringify(discogLyricResult);
                localStorage.setItem('discogsLyrics', discogLyricResponseString);
                renderDiscogsLyrics(discogLyricResult);

            });

    } else if (queryType === "track") {
        fetch("https://api.discogs.com/database/search?release_title=" + results + "&token=FFvTYocHFIohHeiKPxwTEgMcpiVjPZUwnsPfvEtE")
            .then(response => response.json())
            .then(data => {
                var discogTrackResult = {
                    url: "https://www.discogs.com/master/view/" + data.results[0].master_id
                }
                var discogTrackResponseString = JSON.stringify(discogTrackResult);
                localStorage.setItem('discogsSong', discogTrackResponseString);
                renderDiscogsSong(discogTrackResult);
            });

    } else if (queryType === "album") {
        fetch("https://api.discogs.com/database/search?release_title=" + results + "&token=FFvTYocHFIohHeiKPxwTEgMcpiVjPZUwnsPfvEtE")
            .then(response => response.json())
            .then(data => {
                var discogAlbumResult = {
                    url: "https://www.discogs.com/master/view/" + data.results[0].master_id
                }
                var discogAlbumResponseString = JSON.stringify(discogAlbumResult);
                localStorage.setItem('discogsAlbum', discogAlbumResponseString);
                renderDiscogsAlbum(discogAlbumResult);
            });
    }
    else if (queryType === "artist") {
        fetch("https://api.discogs.com/database/search?q=" + results + "&token=FFvTYocHFIohHeiKPxwTEgMcpiVjPZUwnsPfvEtE")
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
                var discogArtistResult = {
                    bio: data.profile.slice(0, 100),
                    url: data.uri
                }
                var discogArtistResponseString = JSON.stringify(discogArtistResult);
                localStorage.setItem('discogsArtist', discogArtistResponseString);
                renderDiscogsArtist(discogArtistResult);
            });
    }




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
function clearLyrics(event) {
    localStorage.removeItem("lyrics");
    localStorage.removeItem("discogsLyrics");
    lyricsBtn.remove();
    lyricsImg.remove();
    lyricsBy.remove();
    lyricsTitle.remove();
    lyricsLink.remove();
    lyricsBuy.remove();
}

lyricsBtn.addEventListener("click", function (event) {
    clearLyrics();
});

function clearSong(event) {
    localStorage.removeItem("song");
    localStorage.removeItem("discogsSong");
    songImg.remove();
    songArtist.remove();
    songBuy.remove();
    songAlbum.remove();
    songBtn.remove();
    songTitle.remove();
}

songBtn.addEventListener("click", function (event) {
    clearSong();
});

function clearAlbum(event) {
    localStorage.removeItem("album");
    localStorage.removeItem("discogsAlbum");
    albumImg.remove();
    albumTitle.remove();
    albumArtist.remove();
    albumBtn.remove();
    albumBuy.remove();
}

albumBtn.addEventListener("click", function (event) {
    clearAlbum();
})

function clearArtist(event) {
    localStorage.removeItem("artist");
    localStorage.removeItem("discogsArtist");
    artistImg.remove();
    artistTitle.remove();
    artistBtn.remove();
    artistBio.remove();
    breaker.remove();
    artistLink.remove();
}

artistBtn.addEventListener("click", function (event) {
    clearArtist();
})

clearBtn.addEventListener("click", function (event) {
    clearLyrics();
    clearSong();
    clearAlbum();
    clearArtist();
})