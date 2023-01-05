class Event {
    venue = ''
    name = ''
    favoritedBy = []

    constructor(date, artists, city) {
        this.date = date
        this.artists = [artists]
        this.city = city
    }
}

const eventOne = new Event({
    name: 'Festival One',
    artists: ['Maria Bethânia', 'Caetano Veloso'],
    date: '2022-11-01',
    venue: 'HKW',
    city: 'Berlin',
  })
  const eventTwo = new Event({
    name: 'Festival Two',
    artists: ['Mulatu Astatke'],
    date: '2022-12-01',
    venue: 'HKW',
    city: 'Berlin',
  })
  const eventThree = new Event({
    name: 'Festival Three',
    artists: ['Gal Costa'],
    date: '2023-10-01',
    venue: 'Teatro Central',
    city: 'São Paulo',
  })

console.log(eventOne)
console.log(eventTwo)
console.log(eventThree)


/*  Class with mongo schema
const eventSchema = new mongoose.Schema({
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
  name: String,
  venue: String,
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

*/