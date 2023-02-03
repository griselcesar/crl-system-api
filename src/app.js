const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))


app.get("/",(req,res) => {
    res.status(200).json({
        mensaje:"Bienvenidos a CLR System API"
    })
})


module.exports = app