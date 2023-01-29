const express = require("express");
const Event = require("../models/event");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", {
    title: `Mariana's project for Coyotiv's Software Engineering course`,
  });
});

module.exports = router;
