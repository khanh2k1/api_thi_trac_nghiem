
const jwtValidators = {
    isValidToken: (token) {
        const tokenPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;

        return tokenPattern.test(token);
    }
}