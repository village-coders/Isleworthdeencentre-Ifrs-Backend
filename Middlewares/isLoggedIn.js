const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user")

const isLoggedIn =  async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        status: "error",
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    // verify if the token is valid and has not expired
    const decoded = jwt.verify(token, process.env.jwt_secret)
    // find the user that the token was generated for
    const user = await UserModel.findById(decoded.id)

    if(!user){
        return res.status(404).json({
            status: "error",
            message: "This token belongs to no one"
        })
    }

    req.user = user
    // console.log(user);
    // console.log(decoded);
    // console.log(req.user);
    // console.log(user.id); 
    
    next()
}

module.exports = isLoggedIn