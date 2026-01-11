const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.jwt_secret,
        { expiresIn: process.env.jwt_exp } // e.g., 15m
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.jwt_refresh_secret,
        { expiresIn: process.env.jwt_refresh_exp } // e.g., 7d
    );

    return { accessToken, refreshToken };
};

module.exports = generateTokens;