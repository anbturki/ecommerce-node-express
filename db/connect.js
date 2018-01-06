const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ecommerce", (err) => {
  if (err) return console.log(err);
  console.log("Databae contected");
});

module.exports = mongoose;