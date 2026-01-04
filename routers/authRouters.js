const express = require("express")

const authRouter = express.Router()

const {login, signup, updateUserPassword, getUserById} = require("../controllers/authController")
const isLoggedIn = require("../middlewares/isLoggedIn")



authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.get("/user/:id", getUserById)
authRouter.put("/update-password/:id", isLoggedIn, updateUserPassword)


module.exports = authRouter