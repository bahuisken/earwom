//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?

//console.log(document.getElementById("submitQueryBtn"))



//


document.getElementById("submitQueryBtn").addEventListener("click", function () {
    var searchBarValue = document.querySelector("#query").value.split(" ").join("%20");
    // need func here to like check checkboxes and such
    // so I think we go one by one, and once one is true, we do it.



    //if $("#lyrics").val, then we query genius or something.
    //And then the rest too.
    //Should just return a bool if the html is done correctly.
    //And only one should be a bool.

    console.log("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ")
    fetch("https://api.genius.com/search?q=" + searchBarValue + "&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
    )
        .then(response => response.json())
        .then(data => console.log(data))

    generateResults(data)
}

);

//push results to page in some manor. I can just do this simply/briefly.
//probably need a different one for genius vs spotify
function generateResults(data) {

}