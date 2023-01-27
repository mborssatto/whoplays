const express = require('express')
const app = require('../app')
const Event = require('../models/event')
const request = require('request')
const router = express.Router()

// get Spotify access token 
router.get('/token', async (req, res, next) => {
  res.send(await req.app.get('spotifyAccessToken'))
})


// filter by city or return all events. WORKS with url (eg) http://localhost:3000/events?city=Berlin
router.get('/', async (req, res) => {
  let result

  if (req.query.city) {
    result = await Event.find({ city: req.query.city })
  } else result = await Event.find()

  return res.send(result)
})

// get events by ID
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    console.log("Searching for Artists: 👩‍🎤 " + event.artists);

    // use the access token to access the Spotify Web API
    async function fetchArtistID(artistName) {
      let token = req.app.get('spotifyAccessToken');
      let options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1&offset=0`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      };
      return new Promise((resolve, reject) =>
        request.get(options, function (error, response, body) {
          if (error) {
            return res.send({ error, event }) // sends event anyways even if there are errors with the request to Spotify
            console.log("Error while retrieving Artist ID from Spotify")
          }
          resolve(JSON.parse(body));
        }));
    }
    
    // create an array of promises for each artist
    let promises = event.artists.map(artist => fetchArtistID(artist));

    // use Promise.all() to run the queries in parallel
    let artistInfo = await Promise.all(promises);
    // console.log("Artist Info:ℹ️ " + {artistInfo})
    let artistIDs = []
      artistInfo.forEach(({ artists: { items: [{ id }] } }) => artistIDs.push(id));
    // console.log("Artist IDs:", artistIDs);    
    // console.log("🎃🎃🎃🎃")
    return res.send({ event, artistIDs });
  } catch (err) {
    return next(err);
  }
});

// Add events endpoint
router.post('/add', async (req, res) => {
  try {
    const createdEvents = await Event.create(req.body);
    res.json(createdEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router