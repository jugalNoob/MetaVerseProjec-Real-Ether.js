require("dotenv").config();
const express = require("express");
const app = express();
const cookiParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const router = require("./routes/router.js");
const cors = require("cors");
app.use(express.json())


app.use(express.json())
app.use(cookiParser());
app.use(cors());
app.use(router);

require("./db/conn")
const port=9000;



app.listen(port , ()=>{
    
    console.log(port  + "this is my port number")
})
