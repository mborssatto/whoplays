const mongoose = require("mongoose");

let connectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.set("debug", true);
mongoose.set("strictQuery", false);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection established"))
  .catch(console.log);
