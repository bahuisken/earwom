//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?

//console.log(document.getElementById("submitQueryBtn"))



//


document.getElementById("submit-query-btn").addEventListener("click", function (event) {
    event.preventDefault()
    // var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");
    var searchBarValue = "rap%20god"
    // need func here to like check checkboxes and such
    // so I think we go one by one, and once one is true, we do it.
    // var queryType = figureWhatTypeQuery()
    var queryType = "album"
    console.log(queryType)

    if (queryType === "lyrics") {
        //
        var bestLyricResponse;
        console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
        fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
        )
            .then(response => response.json())
            .then(data => {
                console.log(data.response.hits[0].result);
                bestLyricResponse = data.response.hits[0].result
            });


    } else {
        //token out of date, will only work for tracks/songs.
        //Working out a solution.
        fetch(constructSpotifyQuery(searchBarValue, queryType), {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Accept": "application/json",
                "Authorization": "Bearer BQCUWoTmO_mMhUiBKAzjpak3f29ThR-vl0qUlppFW8dNDHoRGEkykUXDMZglrsL2DaWbIFg7gioQYMfilQI"
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

});

function renderLyrics(bestLyricResponse, searchQuery) {
    //do something to render lyrics here, and save the search query.

}

function constructSpotifyQuery(query, type) {
    return "https://api.spotify.com/v1/search?q=" + query + "&type=" + type
}

function figureWhatTypeQuery() {
    if (document.querySelector("#lyrics").checked === true) {
        return "lyrics"
    } else if (document.querySelector("#song").checked === true) {
        return "track"
    } else if (document.querySelector("#album").checked === true) {
        return "album"
    } else if (document.querySelector("#artist").checked === true) {
        return "artist"
    } else {
        return false
    }
}

// fetch("https://api.spotify.com/v1/search?q=tania%20bowra&type=artist", {
//     method: "GET",
//     headers: {
//         "Content-type": "application/json;charset=UTF-8",
//         "Accept": "application/json",
//         "Authorization": "Bearer BQCUWoTmO_mMhUiBKAzjpak3f29ThR-vl0qUlppFW8dNDHoRGEkykUXDMZglrsL2DaWbIFg7gioQYMfilQI"
//     }
// }).then(response => response.json()).then(data => console.log(data))


//push results to page in some manor. I can just do this simply/briefly.
//probably need a different one for genius vs spotify
function generateResults(data) {

}