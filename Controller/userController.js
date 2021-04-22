const userModel = require("../Model/userModel");
const classNotesModel = require("../Model/classNotesModel");

const getUserData = async (req, res)=>{
    try{
        const userId = req.params.id;

        let userObj = await userModel.findById(userId);
        let userClassIds= userObj.classes;

        let classesArr = [];
        userClassIds.forEach(classId=>{
            const classObj = await classNotesModel.findById(classId);
            classesArr.push(classObj);
        })

        res.status(200).json({
            message:"Got all user data successfully",
            data: classesArr
        })
    }
    catch(error){
        res.status(500).json({
            message:"Failed to get data"
        })
    }
}

const createUser = async (req, res) =>{
    try{
        const {user} = req.body;
    
        let newUserObj = await userModel.create(user);

        res.status(200).json({
            message:"User Created successfully",
            data: newUserObj
        })
    }
    catch(error){
        res.status(500).json({
            message:"Failed to get data"
        })
    }

}