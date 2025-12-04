const express = require("express")
const cors = require("cors")
const productRouter = require("./router/product.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({extended: true}))
// app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))

// router
app.use(productRouter)

app.listen(PORT, () => {
  console.log("Server is running at: http://localhost:"+PORT);
})