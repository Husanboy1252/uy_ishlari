const {Router} = require("express")
const { register, login } = require("../controller/user.controller")

const UserRouter = Router()

UserRouter.post("/register", register)
UserRouter.post("/login", login)

module.exports = UserRouter