const classNotesModel = require("../Model/classNotesModel");

const createNote = async (req, res) => {
  try {
    const classId = req.params.classid;
    console.log(classId);

    let { note } = req.body;

    console.log(note);

    let classobj = await classNotesModel.findById(classId);
    classobj.classnotes.push(note);
    classobj = await classobj.save();
    console.log("class object updated in db");
    console.log("Notes:", classobj);

    res.status(200).json({
      message: "note added successfully",
      data: classobj,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Failed to create note",
      error: error,
    });
  }
};

const deleteNoteById = async (req, res) => {
  try {
    const classId = req.params.classid;
    const noteId = req.params.noteid;

    console.log(classId, noteId);

    let classObj = await classNotesModel.findById(classId);
    updatedClassnotes = classObj.classnotes.filter(
      (note) => note._id != noteId
    );
    classObj.classnotes = updatedClassnotes;
    await classObj.save();

    console.log(updatedClassnotes);

    res.status(200).json({
      message: "Deleted note successfully",
      data: classObj,
    });
  } catch {
    res.status(501).json({
      message: "Failed to delete note",
      error,
    });
  }
};

const updateNoteById = async (req, res) => {
  try {
    const classId = req.params.classid;
    const noteId = req.params.noteid;
    const { updateobj } = req.body;

    console.log(classId, noteId);

    let classObj = await classNotesModel.findById(classId);

    console.log(classObj)

    updatedClassnotes = classObj.classnotes.map((note) => {
      if ((note._id == noteId)) {
        for (key in updateobj) note[key] = updateobj[key];
      }

      return note;
    });

    console.log(updatedClassnotes)

    classObj.classnotes = updatedClassnotes;
    let updatedNotesObj = await classObj.save();

    console.log(updatedNotesObj);

    res.status(200).json({
      message: "Updated note successfully",
      data: updatedNotesObj
    });
  } catch(error) {
    console.log(error)
    res.status(501).json({
      message: "Failed to update note",
      error,
    });
  }
};

module.exports.createNote = createNote;
module.exports.deleteNoteById = deleteNoteById;
module.exports.updateNoteById = updateNoteById;
