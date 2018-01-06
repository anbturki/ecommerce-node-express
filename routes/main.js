const router = require("express").Router();

// Application routes
router.get("/", (req, res) => {
  res.render("home");
});
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;