const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/middleware");
const interviewStart=require("../controllers/interviewStart");
const interviewNext=require("../controllers/interviewNext");
const interviewEnd=require("../controllers/interviewEnd");
const getHistory = require("../controllers/historyController");
const getDashboard = require("../controllers/analytics");


router.get("/start",authMiddleware, interviewStart);
router.post("/next",authMiddleware, interviewNext);
router.post("/end",authMiddleware, interviewEnd);
router.get("/history",authMiddleware,getHistory);
router.get("/dashboard",authMiddleware,getDashboard);


module.exports=router;