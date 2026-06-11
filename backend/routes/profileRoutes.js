const express = require("express");
const upload = require("../middlewares/upload");
const createProfile= require("../controllers/profilePostController");
const updateProfile=require("../controllers/profilePutController");
const getProfile=require("../controllers/profileGetController");
const authMiddleware=require("../middlewares/middleware");

const router = express.Router();

router.post("/create", authMiddleware,upload.single("resume"), createProfile);
router.put("/update",authMiddleware,upload.single("resume"),updateProfile);
router.get("/me",authMiddleware,getProfile);

module.exports = router;