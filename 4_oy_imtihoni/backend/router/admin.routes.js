const {Router} = require("express")
const { SuperAdmin } = require("../controller/admin.controller")
const { superadmintekshiruvchi } = require("../middleware/super-verify")

const SuperAdminRouter = Router()

SuperAdminRouter.put("/super_admin/:id", superadmintekshiruvchi, SuperAdmin)

module.exports = SuperAdminRouter