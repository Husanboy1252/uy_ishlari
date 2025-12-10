const {Router} = require("express")
const { get_all_Todo, get_one_Todo, add_Todo, update_Todo, delete_Todo } = require("../controller/todo.controller")
const { tekshiruvchi } = require("../middleware/admin-verify")

const todoRouter = Router()

todoRouter.get("/get_all_todo", get_all_Todo)
todoRouter.get("/get_one_todo/:id", get_one_Todo)
todoRouter.post("/add_todo", tekshiruvchi, add_Todo)
todoRouter.put("/update_todo/:id", tekshiruvchi, update_Todo)
todoRouter.delete("/delete_todo/:id", tekshiruvchi, delete_Todo)

module.exports = {
    todoRouter
}