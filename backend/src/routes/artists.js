const express = require('express')
const app = require('../app')

let spotifyAccessToken

app.set('spotifyAccessToken')



console.log(spotifyAccessToken)

// const token = require('../app')
// console.log(token)



// curl --request GET \
//     'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
//      --header "Authorization: Bearer "