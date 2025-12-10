const express = require("express")
const cors = require("cors")
const { todoRouter } = require("./router/todo.routes")
const UserRouter = require("./router/user.routes")
const Users_get_Router = require("./router/users.routes")
const SuperAdminRouter = require("./router/admin.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

// router 
app.use(todoRouter)
app.use(UserRouter)
app.use(Users_get_Router)
app.use(SuperAdminRouter)

app.listen(PORT, () => {
    console.log("Server is running at :", PORT);
})