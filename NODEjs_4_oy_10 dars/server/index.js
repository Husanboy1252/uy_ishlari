const express = require("express")
const cors = require("cors")
const dataRouter = require("./router/data.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cors())


//  router
app.use(dataRouter)


app.listen(PORT,() =>{
    console.log("server is ranning at "+ PORT);
    
})