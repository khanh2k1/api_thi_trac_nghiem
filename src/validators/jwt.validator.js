
const jwtValidators = {
    isValidToken: (token) => {

        if(!token) {
            return false
        }
        const tokenPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;
        
        return tokenPattern.test(token);
    }
}