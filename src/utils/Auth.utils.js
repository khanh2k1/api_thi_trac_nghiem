const jwt = require('jsonwebtoken');
const UserModel = require('../model/User.model');
const promisify = require('util').promisify;
const crypto = require("crypto")
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

const AuthUtils = {
    generateToken : async (payload, secretSignature, tokenLife) => {
        try {
            return await sign(
                {
                    payload,
                },
                secretSignature,
                {
                    algorithm: 'HS256',
                    expiresIn: tokenLife,
                },
            );
        } catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            return null;
        }
    },
    
    verifyToken : async (token, secretKey) => {
        try {
            return await verify(token, secretKey);
        } catch (error) {
            console.log(`Error in verify access token:  + ${error}`);
            return null;
        }
    },
    
    decodeToken : async (token, secretKey) => {
        try {
            return await verify(token, secretKey, {
                ignoreExpiration: true,
            });
        } catch (error) {
            console.log(`Error in decode access token: ${error}`);
            return null;
        }
    },
    
    refreshToken : async (req, res) => {
        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.x_authorization;
        if (!accessTokenFromHeader) {
            return res.status(400).send('Không tìm thấy access token.');
        }
    
        // Lấy refresh token từ body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res.status(400).send('Không tìm thấy refresh token.');
        }
    
        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
        const accessTokenLife =
            process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
    
        // Decode access token đó
        const decoded = await authMethod.decodeToken(
            accessTokenFromHeader,
            accessTokenSecret,
        );
        if (!decoded) {
            return res.status(400).send('Access token không hợp lệ.');
        }
    
        const username = decoded.payload.username; // Lấy username từ payload
    
        const user = await UserModel.findOne({username: username});
        if (!user) {
            return res.status(401).send('User không tồn tại.');
        }
    
        if (refreshTokenFromBody !== user.refreshToken) {
            return res.status(400).send('Refresh token không hợp lệ.');
        }
    
        // Tạo access token mới
        const dataForAccessToken = {
            username,
        };

        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        if (!accessToken) {
            return res
                .status(400)
                .send('Tạo access token không thành công, vui lòng thử lại.');
        }
        return res.json({
            accessToken,
        });
    },

    // void
    hashToPassword : async (password) => {
        const hashedPassword = await crypto.createHash("sha256").update(password).digest("hex");
        console.log(`hashed pw = ${hashedPassword}`)
        return hashedPassword;
    },

    // return boolean
    comparePassword : async (user, oldPassword, newPassword) => {
        

        const old_hashed_password = await AuthUtils.hashToPassword(oldPassword) 
        const username = user['username']
        const isValidPassword = await UserModel.findOne
        (
            {username, old_hashed_password}
        )

        console.log('isValidPassword :', isValidPassword)

        


        if(isValidPassword) return true 

        return false
    }
}

module.exports = AuthUtils