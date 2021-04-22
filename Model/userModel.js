const mongoose = require("mongoose");
const {DB_LINK} = require("../config/secrets");

mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to user db !!!");
  });

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
    unique: true
  },
  classes: {
    type: [String],
  },
});

const userModel = mongoose.model("userscollection", userSchema);
module.exports = userModel;
