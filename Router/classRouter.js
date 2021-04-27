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

//added userid
classRouter.route("/:userid").post(createClass).get(getAllClasses);

classRouter
  .route("/:classid")
  .get(getAllClassNotes)
  .patch(renameClassById);

classRouter.route('/:userid/:classid').delete(deleteClassById)

module.exports = classRouter;
