// var payload = {
//     "code": "CODE_FROM_REDIRECT",
//     "client_id": "YOUR_CLIENT_ID",
//     "client_secret": "YOUR_CLIENT_SECRET",
//     "redirect_uri": "YOUR_REDIRECT_URI",
//     "response_type": "code",
//     "grant_type": "authorization_code"
//   }

//https://api.genius.com/search?q=knees%20Weak%20arms%20are&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ


//prototype lyric query
//https://api.genius.com/search?q="WORDS HERE"&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ
//looking for response.response.hits[0]?
fetch("https://api.genius.com/search?q=knees%20Weak%20arms%20are&access_token=fbzexr2DEleMzVPAdhBCCTEWXTXpMvS1pn8AmhXYmnTg0KwJxnSheU_fl3pDgUJJ"
)
    .then(response => response.json())
    .then(data => console.log(data))