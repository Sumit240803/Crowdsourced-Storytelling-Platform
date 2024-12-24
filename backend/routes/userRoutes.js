const express = require("express");

const mongoose = require("mongoose");
const verifyJwt = require("../middlewares/verify");
const User = require("../models/User");


const router = express.Router();

router.get("/me" ,verifyJwt  , async(req,res)=>{
    try {
        const id = req.user.userId;
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(404).json({"Message" : "User Not Found"})
        }
        return res.status(200).json({"User" : user});
    } catch (error) {
        return res.status(401).json({"Message" : "Login First"})
    }
});



module.exports = router;