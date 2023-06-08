const UserModel = require("../model/User.model");
const AuthUtils = require('../utils/Auth.utils')
// profile
// update profile
// change password
const UserController = {
  getProfile: async (req, res) => {
    try {
      const user = await req.user;
      return res.json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(`error get profile : ${error}`);
      res.status(422).json({
        success: false,
        message: "Cant get profile",
      });
    }
  },

  changePassword: async (req, res) => {
    const user = await req.user;
    const old_password = await req.body.old_password;

    const isValid = AuthUtils.comparePassword(user, old_password, newPassword)

    if(!isValid) {
      return res.status(401).json({
        success:false,
        message: "Unauthorized"
      })
    }
    // update user
    const isSave = await UserModel.updateOne(
      { username: user.username },
      { $set: { password: hashedPassword } }
    );

    if (!isSave) {
      return res.status(422).json({
        success: false,
        message: "Cant change password",
      });
    }
    res.json({
      success: true,
      message: `${user.username} is Change password successfully`,
    })
  },

  update: async(req, res) => {
    const user = await req.user;


  }
};

module.exports = UserController;
