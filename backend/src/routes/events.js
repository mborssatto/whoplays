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
    if (!event) {
      return res.status(404).render('error', {
        error: { status: 404 },
        message: `No event with id ${req.params.id} found`,
      });
    }
        // use the access token to access the Spotify Web API
    let token = req.app.get('spotifyAccessToken');
    let options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${event.artists[0]}&type=artist&limit=1&offset=0`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    };
    return request.get(options, function (error, response, body) {
      if (error) {
        return res.send({event})
      }
      console.log("More detailed artist info: 👩‍🎤 " + response.body);
      let bodyParsed = JSON.parse(body);
      console.log(`Response body searching for ${event.artist}: 👩‍🎤 `);
      console.log("Artist name: " + bodyParsed.artists.items[0].name);
      console.log("Artist ID: " + bodyParsed.artists.items[0].id);
      return res.send({ event, bodyParsed });
    });

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