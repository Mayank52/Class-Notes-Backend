const classNotesModel = require("../Model/classNotesModel");

//Done
let createClass = async (req, res) => {
  try {
    const { classname } = req.body;

    const classObj = {
      classname: classname,
      classnotes: [],
    };

    const newClass = await classNotesModel.create(classObj);

    console.log(newClass);

    res.status(200).json({
      message: "Created class successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create class",
      error,
    });
  }
};

//Done
let getAllClassNotes = async (req, res) => {
  try {
    const classId = req.params.classid;

    const classObj = await classNotesModel.findById(classId);
    const notes = classObj.classnotes;

    console.log(classObj, notes);

    res.status(200).json({
      message: "Got class notes successfully",
      data: notes,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get all notes",
      error,
    });
  }
};

//Done
let deleteClassById = async (req, res) => {
  try {
    const classId = req.params.classid;

    const deletedClass = await classNotesModel.findByIdAndDelete(classId);

    console.log(deletedClass);

    res.status(200).json({
      message: "Deleted Class successfully",
      data: deletedClass,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to create class",
      error,
    });
  }
};

//Done
let renameClassById = async (req, res) => {
  try {
    const classId = req.params.classid;
    const { classname } = req.body;

    const classObj = await classNotesModel.findById(classId);

    console.log(classObj);

    classObj.classname = classname;

    let updatedClass = await classObj.save();

    console.log(updatedClass);

    res.status(200).json({
      message: "Updated Class successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to create class",
      error,
    });
  }
};

module.exports.createClass = createClass;
module.exports.getAllClassNotes = getAllClassNotes;
module.exports.deleteClassById = deleteClassById;
module.exports.renameClassById = renameClassById;
