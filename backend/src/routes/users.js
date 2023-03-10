var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", async (req, res, next) => {
  res.send(await User.findById(req.params.id));
});

module.exports = router;
