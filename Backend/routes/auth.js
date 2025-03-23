const express=require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_secret='hii';
//route 2: create a user using :POST "api/auth/createuser"
router.post('/createuser',[
    //putting checks or validations
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').isLength({min:5})
],async(req,res)=>{
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }

    try{
        //checking if user exists or not
        let user= await User.findOne({email:req.body.email});
        if(user){
         return res.status(400).json({errors:"this email already exist"})
        }
        //creating a new user
        const salt = await bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hashSync(req.body.password, salt)
         user =await User.create({
             name: req.body.name,
             password: secpass,
             email: req.body.email
         })
         /* .then(user=>res.json(user)).catch(err=>console.log(err)); */
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_secret);
       

       res.json({authToken})
      

    } 
    //catch error
    catch(error){
        console.log(error.message);
        res.status(500).send("internal error occured");
    }


})

//route 2: authentication of user using :POST "api/auth/login"
router.post('/login',[
    //putting checks or validations
   
    body('email','enter a valid email').isEmail(),
    body('password','enter a valid password').exists()
],async(req,res)=>{  
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:"Please,login with correct credentials"});
        }
        const comparepassword= bcrypt.compare(password,user.password);
        if(!comparepassword){
            return res.status(400).json({errors:"Please,login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_secret);
       
    
       res.json({authToken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal error occured");
    }
  

})

//route 3: get logged in detail of user using :POST "api/auth/getuser"
router.post('/getuser',fetchuser,async(req,res)=>{  
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal error occured");       
    }
})
module.exports=router;