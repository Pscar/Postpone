const express = require("express")
const bodyParser = require("body-parser")
const multer = require("multer")
const routes = require("./route/index")
const app = express()

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

app.use(multerMid.single("file"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Headers", "Origin, X-Requestd-With, Content-Type, Accept"),
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE"),
    next()
})

app.get("/", (req, res) => {
  res.send("Ala Mood")
})

app.use("/api", routes)

module.exports = app
