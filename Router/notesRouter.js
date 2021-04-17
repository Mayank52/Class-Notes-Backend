const express = require("express");
const {createNote, deleteNoteById, updateNoteById} = require('../Controller/notesController')

const notesRouter = express.Router();

//add note to class
//update note by note id in class -> passed as query(?noteId=noteId)
//delete note by note id in class

notesRouter.route("/:classid").post(createNote);
notesRouter.route("/:classid/:noteid").delete(deleteNoteById).patch(updateNoteById);

module.exports= notesRouter;
