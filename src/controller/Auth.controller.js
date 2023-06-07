const randToken = require("rand-token");
const AuthUtils = require("../utils/Auth.utils");
const jwtVariable = require("../variables/jwt");
const UserModel = require("../model/User.model");

const AuthController = {
  register: async (req, res) => {
    const username = await req.body.username.toLowerCase();
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(422).json({
        success: false,
        message: "username is not allow",
      });
    }

    const hashedPassword = await AuthUtils.hashToPassword(req.body.password);

    const newUser = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: username,
      password: hashedPassword,
    });

    console.log(newUser);

    await newUser
      .save()
      .then((data) => {
        console.log("register successfully !");
        console.log(data);
        const { password, ...result } = data["_doc"];
        return res.json({
          success: true,
          result,
        });
      })
      .catch((error) => {
        console.log("error register user");
        res.status(422).json({
          success: false,
          message: error,
        });
      });
  },

  login: async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    const hashedPassword = await AuthUtils.hashToPassword(password);

    console.log(username, hashedPassword);

    const user = await UserModel.findOne({username, password:hashedPassword})

    console.log(`user = ${user}`)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "invalid username or password",
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
      return res
        .status(401)
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

    const user = await UserModel.findOne({username});
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
};

module.exports = AuthController;
