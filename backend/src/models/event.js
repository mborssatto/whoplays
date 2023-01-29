const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const User = require("../models/user");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  artists: [String],
  city: {
    type: String,
    required: true,
  },
  venue: String,
  favoritedBy: [],
});

eventSchema.loadClass(Event);
eventSchema.plugin(autopopulate);

module.exports = mongoose.model("Event", eventSchema);
