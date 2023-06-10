const UserModel = require("../model/User.model");
const AuthUtils = require('../utils/Auth.utils')
const bcrypt = require('bcrypt')
const ImageDefault = require('../variables/Image.variables')
const FileUtils = require('../utils/File.utils')
// profile
// update profile
// change password
const UserController = {

  getProfile: async (req, res) => {
    try {
      const user = await req.user
      
      let { _id, firstname, lastname, image, email, username } = await user;


      return res.json({
        success: true,
        user: { _id, firstname, lastname, email, username, image }
      });
    }catch (error) {
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
    const new_password = await req.body.new_password

    
    const isValid = bcrypt.compareSync(old_password, user.password)

    console.log(isValid)

    if(!isValid) {
      return res.status(401).json({ 
        success:false,
        message: "Unauthorized"
      })
    }
    // update user
    const hashedPassword = AuthUtils.hashToPassword(new_password)

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
    const user = await req.user

    let image
    if(req.file) {
      image = FileUtils.base64Image(req.file.buffer)
    }else image = ImageDefault.avatar
    

    const {firstname, lastname } = await req.body
    console.log(image, firstname, lastname)
    image = FileUtils.base64Image(image)
    const _id = user._id
    const isExistedUser = await UserModel.findById(_id)
    if(!isExistedUser) {
      console.log('Khong tim thay user de update')
      return res.status(400).json({
        success:false,
        message:"Unauthorized"
      })
    }
    await UserModel.findOneAndUpdate(user._id, {image, firstname, lastname}).then(()=>{
      res.json({
        success:true,
        message:{image, firstname, lastname} 
      })
    })

   
  }
};

module.exports = UserController;
