const express = require('express')
const app = require('../app')
const Event = require('../models/event')

const router = express.Router()

// get Spotify access token
router.get('/token', async (req, res, next) => {
  res.send(await req.app.get('spotifyAccessToken'))
})


// filter by city or return all events.
router.get('/', async (req, res) => {
  let result

  if (req.query.city) {
    result = await Event.find({ city: req.query.city })
  } else result = await Event.find()

  return res.render('events', {result})
})

//Initialize (refactor out)
router.get('/initialize', async (req, res) => {
  const eventOne = await Event.create({
    name: 'Festival One',
    artists: ['Maria Bethânia', 'Caetano Veloso'],
    date: '2022-11-01',
    venue: 'HKW',
    city: 'Berlin',
  })
  const eventTwo = await Event.create({
    name: 'Festival Two',
    artists: ['Mulatu Astatke'],
    date: '2022-12-01',
    venue: 'HKW',
    city: 'Berlin',
  })
  const eventThree = await Event.create({
    name: 'Festival Three',
    artists: ['Gal Costa'],
    date: '2023-10-01',
    venue: 'Teatro Central',
    city: 'São Paulo',
  })

  // MOCK User input
  const dateRangeStart = '2022-11-01'
  const dateRangeEnd = '2022-12-08'
  const city = 'Berlin'

  console.log(eventOne.detail)
  console.log(eventTwo)

  res.sendStatus(200)
})

// get events by ID
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event)
    return res.render('error', {
      error: { status: 404 },
      message: `No event with id ${req.params.id} found`,
    })

  return res.render('detail', { event })
})


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