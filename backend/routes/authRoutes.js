const express=require("express");
const router=express.Router();

const signupController=require("../controllers/signupController.js");
router.post("/signup",signupController);

const loginController=require("../controllers/loginController.js");
router.post("/login",loginController);

module.exports=router;