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
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).render('error', {
        error: { status: 404 },
        message: `No event with id ${req.params.id} found`,
      });
    }
    return res.render('detail', { event });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).render('error', {
        error: { status: 400 },
        message: `No event with id ${req.params.id} found`,
      });
    }
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