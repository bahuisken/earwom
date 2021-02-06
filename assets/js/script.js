//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?

//console.log(document.getElementById("submitQueryBtn"))



//


document.getElementById("submit-query-btn").addEventListener("click", function () {

    var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");
    // need func here to like check checkboxes and such
    // so I think we go one by one, and once one is true, we do it.
    var queryType = figureWhatTypeQuery()
    console.log(queryType)

    if (queryType === "lyrics") {
        console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
        fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
        )
            .then(response => response.json())
            .then(data => console.log(data))
    } else {
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
var close = $(".modal-close");
var modal = $(".modal");
close.click(function closeModals() {

    modal.removeClass("is-active");
})


