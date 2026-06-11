const User=require("../models/User.js");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile.js");
const signupController=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
       
        if(!name || !email ||!password){
            return res.status(400).json({message:"Enter all required credentials"});
        }
       
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Account already exists"});
        }
        
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword});
       
        await Profile.create({
            userId: newUser._id,
            role: "",
            experienceYears: 0,
            company: "",
            resumeLink: ""
        });
        const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_KEY, {expiresIn:"1d"});
        
        return res.status(201).json({message:"Account created successfully!",user:{id :newUser._id,name: newUser.name,email: newUser.email}, token});
    }
    catch(err){
        console.log("catch",err.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
module.exports=signupController;

