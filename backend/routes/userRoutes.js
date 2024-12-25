const express = require("express");

const verifyJwt = require("../middlewares/verify");
const User = require("../models/User");
const Story = require("../models/Story");


const router = express.Router();
//User Profile
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

//Creating A New Story

router.post("/story" , verifyJwt , async(req,res)=>{
    try {
        const {title , synopsis, tags , collaborators} = req.body;
        const id = req.user.userId;
        const user = await User.findById(id).select('-password');
        const story = new Story({
            title : title,
            synopsis : synopsis,
            author : user._id,
            tags : tags,
            collaborators : collaborators
        });
        
        await story.save();
        user.storiesCreated.push(story._id);
        user.storiesParticipated.push(story._id);
        await user.save();
        return res.status(200).json({"Message" : "Story Created"})
    } catch (error) {
        return res.status(404).json({"Message" : error})
    }
});

router.post("/join-story" , verifyJwt , async(req,res)=>{
    try {
        const {storyId} = req.body;
        const id = req.user;
        const user = await User.findById(id);
        const isStory = await Story.findById(storyId);
        if(!isStory){
            return res.status(404).json({"Message" : "Story Not Found"});
        }
        isStory.collaborators.push(user._id);
        user.storiesParticipated.push(isStory._id);
        await user.save();
        await isStory.save();
        return res.status(200).json({"Message" : "You are now a collaborator"})
    } catch (error) {
        return res.status(404).json({"Message" : "error occured"});
    }
});

router.get('/joined-stories', verifyJwt, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user and populate the referenced story fields
        const user = await User.findById(userId)
            .populate('storiesParticipated')
            .populate('storiesCreated');

        if (!user) {
            return res.status(404).json({ "Message": "User not found" });
        }

        // Return the joined stories
        const response = {
            storiesParticipated: user.storiesParticipated || [],
            storiesCreated: user.storiesCreated || [],
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching joined stories:', error);
        return res.status(500).json({ "Message": error.message });
    }
});



module.exports = router;