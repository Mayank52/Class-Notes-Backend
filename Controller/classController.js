const userModel = require("../Model/userModel");
const classNotesModel = require("../Model/classNotesModel");

//Done
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
    const userObj = await userModel.find({ uid: userid });
    console.log(userObj);
    let user = userObj[0];
    user.classes.push(newClassObj._id);
    await user.save();

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

//Done
let getAllClasses = async (req, res) => {
  try {
    const userid = req.params.userid;

    const userObj = await userModel.find({ uid: userid });
    let classes = [];

    for (let i = 0; i < userObj[0].classes.length; i++) {
      const classId = userObj[0].classes[i];
      let classObj = await classNotesModel.findById(classId);
      classes.push(classObj);
    }

    res.status(200).json({
      message: "Got all classes successfully",
      data: classes,
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to get all classes",
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
    const userId = req.params.userid;

    const deletedClass = await classNotesModel.findByIdAndDelete(classId);

    console.log(deletedClass);

    //remove from user's classes array
    const userObj = await userModel.find({ uid: userId });
    let userClasses = userObj[0].classes.filter(
      (userclassId) => userclassId != classId
    );
    userObj[0].classes = userClasses;
    await userObj[0].save();

    res.status(200).json({
      message: "Deleted Class successfully",
    });
  } catch (error) {
    res.status(501).json({
      message: "Failed to delete class",
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
