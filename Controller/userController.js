const userModel = require("../Model/userModel");
const classNotesModel = require("../Model/classNotesModel");

// const getUserData = async (req, res)=>{
//     try{
//         const userId = req.params.id;

//         let userObj = await userModel.findById(userId);
//         let userClassIds= userObj.classes;

//         let classesArr = [];
//         userClassIds.forEach(classId=>{
//             const classObj = await classNotesModel.findById(classId);
//             classesArr.push(classObj);
//         })

//         res.status(200).json({
//             message:"Got all user data successfully",
//             data: classesArr
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             message:"Failed to get data"
//         })
//     }
// }

const createUser = async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    const user = {
      name,
      email,
      uid
    };

    let presentUser = await userModel.find({uid});
    console.log(presentUser)

    if (presentUser[0]) {
      res.status(200).json({
        message: "User already present",
      });
      return;
    }

    let newUserObj = await userModel.create(user);
    console.log(newUserObj);

    res.status(200).json({
      message: "User Created successfully",
      data: newUserObj,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
};

module.exports.createUser = createUser;
