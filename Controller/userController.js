const userModel = require("../Model/userModel");

const getUserData = async (req, res) => {
  try {
    const userId = req.params.userid;

    let userObj = await userModel.find({ uid: userId });
    if (userObj[0]) {
      res.status(200).json({
        message: "User signed In",
        data: userObj[0],
      });
    }
    else{
      res.status(200).json({
        message: "User does not exist",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to get data",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    const user = {
      name,
      email,
      uid,
    };

    console.log(user);

    let presentUser = await userModel.find({ uid });
    console.log("Present User: ", presentUser);

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
module.exports.getUserData = getUserData;
