const express = require("express");
const {
  createClass,
  getAllClasses,
  getAllClassNotes,
  deleteClassById,
  renameClassById,
} = require("../Controller/classController");

const classRouter = express.Router();

//create class
//get all class notes
//delete class
//rename class

classRouter.route("").post(createClass).get(getAllClasses);
classRouter
  .route("/:classid")
  .get(getAllClassNotes)
  .delete(deleteClassById)
  .patch(renameClassById);

module.exports = classRouter;
