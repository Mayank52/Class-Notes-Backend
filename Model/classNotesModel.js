const mongoose = require("mongoose");
const {DB_LINK} = require("../config/secrets");

mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log("Connected to notes db !!!");
  });

const noteSchema = new mongoose.Schema({
  notename: {
    type: String,
    default: "New Note",
  },
  notecontent: {
    type: Object,
  },
  createdon: {
    type: Date,
    default: Date.now(),
  },
});

const classSchema = new mongoose.Schema({
  classname: {
    type: String,
    default: "New Class",
  },
  classnotes: [noteSchema],
});

const classNotesModel = mongoose.model("classnotescollection", classSchema);
module.exports = classNotesModel;