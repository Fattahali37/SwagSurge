
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const { type } = require("os");
const bcrypt = require("bcrypt")
const validator = require ("validator");

app.use(express.json());
app.use(cors());

//Database connectio with mongodb

mongoose.connect("mongodb+srv://fattahali37:!babayaga37@cluster0.psbe9ke.mongodb.net/e-commerce")

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
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Scheme for creating product

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
        default:0,
    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        reqiored:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})


app.post('/addproduct', async (req, res) => {
    try {
        // Find the highest existing product ID
        const highestProduct = await Product.findOne().sort({ id: -1 });

        // If there are no existing products, start the ID from 1, else increment the highest ID by 1
        const newProductId = highestProduct ? highestProduct.id + 1 : 1;

        const product = new Product({
            id: newProductId,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            quantity: req.body.quantity,
        });

        console.log(product);

        await product.save();
        console.log('Saved');

        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
//creating api for deleting products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//Scheme creating for usermodel

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating Endpoint for registering the user

//Creating Endpoint for registering the user
//Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    const { name, password, email } = req.body;
    try {
        let check = await Users.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email id" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email." });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password of minimum 8 characters." });
        }

        const hash = bcrypt.hashSync(password, 10);
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: hash,
            cartData: cart,
        });

        await user.save();

        const token = jwt.sign({ user }, 'secret_ecom');
        res.json({ success: true, token });

    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ success: false, message: "Error signing up" });
    }
});


//Creating endpoint for user login
app.post('/login', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({ user }, 'secret_ecom');
                res.json({ success: true, token });
            } else {
                res.json({ success: false, errors: "Wrong password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email id" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//creating endpoint for new collection

app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollections=products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollections);
})

//creating end point for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);

})
//creating middleware to fetch user
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();

            
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"});
      }
    }
}


//creating end points for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
userData.cartData[req.body.itemId] += 1;
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send("Added")
})

//creating end point to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
   console.log("removed",req.body.itemId);
    let userData= await Users.findOne({_id:req.user.id});
if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
res.send("Removed")
})

//creating end point to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
console.log ("GetCart");
let userData=await Users.findOne({_id:req.user.id});
res.json(userData.cartData); const response = await axios.fetch('http:localhost:4000/signup',formData);
// if(response.success){
//   localStorage.setItem('auth-token',responseData.token);
//   window.location.replace("/")
// }
})

app.listen(port,(error)=>{
    if(!error){
        console.log("server running on port "+port);
    }
    else{
        console.log("Error: "+error);
    }
})
