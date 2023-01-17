const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')


// class Event {
//     venue = ''
//     name = ''
//     favoritedBy = []

//     constructor(date, artists, city) {
//         this.date = date
//         this.artists = artists
//         this.city = city
//     }
// }


//   Class with mongo schema
const eventSchema = new mongoose.Schema({
  venue: String,
  name: String,
  date: Date,
  artists: [String],
  city: String,
  favoritedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
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

module.exports = Event;