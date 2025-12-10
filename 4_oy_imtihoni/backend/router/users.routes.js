const {Router} = require("express")
const { SuperAdmin } = require("../controller/admin.controller")
const { superadmintekshiruvchi } = require("../middleware/super-verify")
const { getAllUsers, getOneUser } = require("../controller/users.controller")

const Users_get_Router = Router()

Users_get_Router.get("/get_all_users", superadmintekshiruvchi, getAllUsers)
Users_get_Router.get("/get_one_user/:id", superadmintekshiruvchi, getOneUser)

module.exports = Users_get_Router