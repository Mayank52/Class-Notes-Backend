const mongoose = require("mongoose");
// const { DB_LINK } = require("../config/secrets");

const DB_LINK = process.env.DB_LINK;

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
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  classes: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model("userscollection", userSchema);
module.exports = userModel;
