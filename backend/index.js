const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");


app.use(express.json());
app.use(cors());

//Database connectio with mongodb

mongoose.connect("mongodb+srv://fattahali37:!babayaga37@cluster0.psbe9ke.mongodb.net/")

//API creation:
app.get("/",(req,res)=>{
    res.send("Express App running");
})

//Image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`hhtp:localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})