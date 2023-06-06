const UserModel = require('../model/User.model')
const jwtVariable = require('../variables/jwt');
const AuthUtils = require('../utils/Auth.utils');

const AuthMiddlewares = {
    isAuth : async (req, res, next) => {

        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.x_authorization;

        if (!accessTokenFromHeader) {
            return res.status(401).json({
                success:false,
                message: 'Cant find token'
            });
        }
    
        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    
        const verified = await AuthUtils.verifyToken(
            accessTokenFromHeader,
            accessTokenSecret,
        );
        
        if (!verified) {
            return res
                .status(401)
                .json({
                    success:false,
                    message: 'You arent allow !'
                });
        }
    
        const user = await UserModel.findOne({username: verified.payload.username});
        req.user = user;
    
        return next();
    },
}

module.exports = AuthMiddlewares