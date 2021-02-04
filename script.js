//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?

//console.log(document.getElementById("submitQueryBtn"))

document.getElementById("submitQueryBtn").addEventListener("click", function () {
    var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");
    console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
    fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
    )
        .then(response => response.json())
        .then(data => console.log(data))
    generateResults(data)
}

);


function generateResults(data) {

}