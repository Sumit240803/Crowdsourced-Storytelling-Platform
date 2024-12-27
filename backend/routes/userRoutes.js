const express = require("express");

const verifyJwt = require("../middlewares/verify");
const User = require("../models/User");
const Story = require("../models/Story");
const Notification = require("../models/Notification");


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

//Joining the Story

/*router.post("/join-story" , verifyJwt , async(req,res)=>{
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
});*/

//Inviting Collaborators

router.post("/invite" , verifyJwt , async(req,res)=>{
    try {
        const {storyId , userIds} = req.body;
        const id = req.user.userId;
        const user = await User.findById(id);
        const story = await Story.findById(storyId).populate('author','username');
        if(!story.author.equals(id)){
            return res.status(404).json({"Message" : "error occured"});
        }
        const notifications = [];
        for(const userId of userIds){
            notifications.push({
                message: `You have been invited by ${story.author.username} to collaborate on the story "${story.title}. Checkout your invite section to manage the invitations."`,
                userId,
            });
            await User.findByIdAndUpdate(userId , {
                $addToSet : {invites : storyId}
            },{new : true})
        }
        await Notification.insertMany(notifications);
        return res.status(200).json({ "Message": "Invitations sent successfully" });
    } catch (error) {
        console.error("Error in /invite route:", error);
        return res.status(500).json({ "Message": error.message });
    }
});

// Invitations

router.get("/invites" , verifyJwt , async(req,res)=>{
    try {
        const id = req.user.userId;
        const user = await User.findById(id);
        const invites = user.invites;
        if(invites){
            return res.status(200).json({"Message" : invites});
        }else{
            return res.status(404).json({"Message" : "No invites"});
        }
    } catch (error) {
        console.error("Error in /invite route:", error);
        return res.status(500).json({ "Message": error.message });
    }
})

router.post("/accept/:id" , verifyJwt , async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const story = await Story.findById(id);
        if(story){
            story.collaborators.push(userId);
            user.invites =  user.invites.filter(invite=>invite!==id);
            const notification = [
                {
                    message : `You have accepted the invitation for the story ${story.title}`,
                    userId : userId
                },
                {
                    message : `${user.username} has accepted your invitation for the story ${story.title}`,
                    userId : story.author
                }
            ];
            await Notification.insertMany(notification);
            await user.save();
            await story.save();
            res.status(200).json({ message: "Invitation accepted successfully" });

        }
    } catch (error) {
        console.error("Error accepting invite:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

router.post("/reject/:id", verifyJwt, async (req, res) => {
    try {
        // Get the story ID from params and the user ID from the JWT
        const { id } = req.params;  // Destructure id from params
        const userId = req.user.userId;

        // Fetch the user and story
        const user = await User.findById(userId);
        const story = await Story.findById(id);

        if (!user || !story) {
            return res.status(404).json({ message: "User or story not found" });
        }

        // Remove the rejected story ID from user's invites
        user.invites = user.invites.filter(invite => invite !== id);

        // Create rejection notifications
        const notifications = [
            {
                message: `You have rejected the invitation for the story ${story.title}`,
                userId: userId,
            },
            {
                message: `${user.username} has rejected your invitation for the story ${story.title}`,
                userId: story.author,
            },
        ];

        // Insert notifications into the Notification collection
        await Notification.insertMany(notifications);

        // Save the changes to the user
        await user.save();

        // Send success response
        res.status(200).json({ message: "Invitation rejected successfully" });

    } catch (error) {
        console.error("Error rejecting invite:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Getting the joined stories

router.get('/joined-stories', verifyJwt, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user and populate the referenced story fields
        const user = await User.findById(userId)
            .populate('storiesParticipated','title content synopsis status')
            .populate('storiesCreated' , 'title content synopsis status');

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