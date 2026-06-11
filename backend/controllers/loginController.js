const bcrypt=require("bcrypt");
const User=require("../models/User.js");
const jwt = require("jsonwebtoken");

const loginController=async (req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"Enter all required credentials"});
        }
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"No Account found,signup"});
        }
        const isMatch=await bcrypt.compare(password,existingUser.password);
        if(!isMatch){
            return res.status(401).json({message:"Wrong passsword"});
        }
        const token=jwt.sign({id:existingUser._id, email:existingUser.email},process.env.JWT_KEY,{expiresIn:"1d"});
        return res.status(200).json({message:"Logged in successfully", user:{id :existingUser._id,name: existingUser.name,email: existingUser.email},token});
    }
    catch(err){
        console.log("in catch");
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports=loginController;