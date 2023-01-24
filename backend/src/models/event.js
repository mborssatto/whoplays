const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const User = require('../models/user')

const eventSchema = new mongoose.Schema({
  venue: String,
  name: String,
  date: Date,
  artists: [String],
  city: String,
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