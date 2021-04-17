const mongoose = require("mongoose");
const {DB_LINK} = require("../config/secrets");

mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to user db !!!");
  });

const noteSchema = new mongoose.Schema({
  noteName: {
    type: String,
    default: "New Note",
  },
  noteContent: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

const classSchema = new mongoose.Schema({
  classname: {
    type: String,
    default: "New Class",
  },
  classNotes: [noteSchema],
});

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be greater than 6 characters"],
    required: true,
  },
  classes: {
    type: [String],
  },
});

const userModel = mongoose.model("userscollection", userSchema);
module.exports = userModel;
