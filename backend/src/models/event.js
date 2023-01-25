const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const User = require('../models/user')

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  artists: [String],
  city:  {
    type: String,
    required: true
  },
  venue: String,
  favoritedBy: [],
})

class Event {
  get detail() {
    return `
Event: ${this.name}
Artists:\n${this.artists
      .map(element => {
        return `- ${element}`
      })
      .join('\n')}
${this.date}
City: ${this.city}
Favorited by: ${this.favoritedBy}
        `
  }
}

eventSchema.loadClass(Event) 
eventSchema.plugin(autopopulate) 

module.exports = mongoose.model('Event', eventSchema) 