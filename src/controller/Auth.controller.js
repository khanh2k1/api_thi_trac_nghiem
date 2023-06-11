const randToken = require("rand-token");
const AuthUtils = require("../utils/Auth.utils");
const jwtVariable = require("../variables/jwt");
const UserModel = require("../model/User.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ImageDefault = require("../variables/Image.variables");
const FileUtils = require("../utils/File.utils");
const AuthController = {

  register: async (req, res) => {
    const username = await req.body.username.toLowerCase();
    const isExistedUsername = await UserModel.findOne(username);

    if (isExistedUsername) {
      return res.status(401).json({
        success: false,
        message: "Username has existed"
      });
    }

    const isExistedEmail = await UserModel.findOne(email);

    if (isExistedEmail) {
      return res.status(401).json({
        success: false,
        message: "Email has existed"
      });
    }

    let image;
    // image
    if (req.file) {
      image = FileUtils.base64Image(req.file.buffer);
    }

    else image = ImageDefault.avatar;

    console.log("==>", typeof imageBase64);
    // hash password
    const hashedPassword = AuthUtils.hashToPassword(req.body.password);

    const newUser = new UserModel({
      image: image,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: username,
      password: hashedPassword,
    });

    await newUser
      .save()
      .then((data) => {
        console.log("register successfully !");
        const { password, image, ...result } = data["_doc"];
        console.log(result);
        return res.json({
          success: true,
          result,
        });
      })
      .catch((error) => {
        console.log("error register user", error);
        res.status(422).json({
          success: false,
          message: error,
        });
      });
  },

  login: async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const isMatch = await AuthUtils.comparePassword(password, user.password);
    console.log("isMatch=", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const accessTokenLife =
      process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

    const dataForAccessToken = {
      username: user.username,
    };
    const accessToken = await AuthUtils.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Login failed, please try again !",
      });
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await UserModel.updateOne(
        { username: user.username },
        { $set: { refreshToken: refreshToken } }
      );
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = user.refreshToken;
    }

    return res.json({
      success: true,
      message: "Login successfully !",
      refreshToken,
      accessToken,
    });
  },

  refreshToken: async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
      return res.status(400).send("Không tìm thấy access token.");
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
      return res.status(400).send("Không tìm thấy refresh token.");
    }

    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const accessTokenLife =
      process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

    // Decode access token đó
    const decoded = await AuthUtils.decodeToken(
      accessTokenFromHeader,
      accessTokenSecret
    );
    if (!decoded) {
      return res.status(400).send("Access token không hợp lệ.");
    }

    const username = decoded.payload.username; // Lấy username từ payload

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).send("User không tồn tại.");
    }

    if (refreshTokenFromBody !== user.refreshToken) {
      return res.status(400).send("Refresh token không hợp lệ.");
    }

    // Tạo access token mới
    const dataForAccessToken = {
      username,
    };

    const accessToken = await AuthUtils.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return res
        .status(400)
        .send("Tạo access token không thành công, vui lòng thử lại.");
    }
    return res.json({
      accessToken,
    });
  },

  // sendOtp: async (req, res) => {
  //   const email = req.body.email
  //   const isExistedUser = await UserModel.findOne({email})
  //   if(!isExistedUser) {
  //     console.log('Not found user')
  //     return res.status(401).json({
  //       success:false,
  //       message: "Unauthorized"
  //     })
  //   }

  //   // generate OTP
  //   const otp = Math.floor(100000 + Math.random() * 900000)

  //   const accessTokenSecret =
  //   process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  //   // create token
  //   const tokenOTP = jwt.sign(otp, accessTokenSecret, {expiresIn: '5m'})

  //   console.log(tokenOTP)

  //   // save into db
  //   const saveTokenOTP = await UserModel.findOneAndUpdate(email, {tokenOTP: tokenOTP}, {insert:true})

  //   await saveTokenOTP.save().then(()=>{
  //     console.log('save opt successfully')
  //   }).catch(err=>{
  //     console.log('error save otp', err)
  //   })

  //   // send email to user
  //   const transporter = nodemailer.createTransport({
  //     // config SMTP hoac su dung ben thu 3
  //   })
  //   //
  // }
};

module.exports = AuthController;
