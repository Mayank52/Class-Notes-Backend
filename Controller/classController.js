const userModel = require("../Model/userModel");
const classNotesModel = require("../Model/classNotesModel");

let createClass = async (req, res) => {
  try {
    const userid = req.params.userid;
    const { classname } = req.body;

    const classObj = {
      classname: classname,
      classnotes: [],
    };

    //create class
    const newClassObj = await classNotesModel.create(classObj);

    console.log(newClassObj);

    //add class id to user object
    const userObj = await userModel.findById(userid);
    userObj.classes.push(newClassObj._id);
    await userObj.save();

    res.status(200).json({
      message: "Created class successfully",
      data: newClassObj,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create class",
      error,
    });
  }
};

//By user id
let getAllClasses = async (req, res) => {
  try {
    const userid = req.params.userid;

    const userObj = await userModel.findById(userid);
    let classes = [];
    userObj.classes.forEach(async (classId) => {
      let classObj = await classNotesModel.findById(classId);
      classes.push(classObj);
    });

    res.status(200).json({
      message: "Got all classes successfully",
      data: classes,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get all notes",
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

let deleteClassById = async (req, res) => {
  try {
    const classId = req.params.classid;
    const userId = req.params.userid;

    const deletedClass = await classNotesModel.findByIdAndDelete(classId);

    console.log(deletedClass);

    //remove from user's classes array
    const userObj = await userModel.findById(userid);
    let userClasses = userObj.classes.filter(
      (userclassId) => userclassId != classId
    );
    userObj.classes = userClasses;
    await userObj.save();

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
module.exports.getAllClasses = getAllClasses;
module.exports.getAllClassNotes = getAllClassNotes;
module.exports.deleteClassById = deleteClassById;
module.exports.renameClassById = renameClassById;
