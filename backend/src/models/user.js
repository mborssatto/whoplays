const Event = require("./event");

class User {
  id;
  favorites = [];

  constructor(name, spotifyId) {
    this.name = name;
    this.spotifyId = spotifyId;
  }

  addToFavorites(event) {
    event.favoritedBy.push(this);
    this.favorites.push(event);
  }
}

module.exports = User;
