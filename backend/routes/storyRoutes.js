const express = require("express");
const verifyJwt = require("../middlewares/verify");
const User = require("../models/User");
const Story = require("../models/Story");
const Chapters = require("../models/Chapters");
const router = express.Router();

router.post("/write-chapter" , verifyJwt , async(req,res)=>{
    try {
        const id = req.user.userId;
       // const user = await User.findById(id);
        const {content , storyId,name,number} = req.body;
        const story = await Story.findById(storyId);
        const existingChapter =await Chapters.findOne({storyId : storyId});
        if(story.author.equals(id) || story.collaborators.includes(id)){
            if(existingChapter){
                existingChapter.content = content;
                existingChapter.name = name;
                existingChapter.chapterNumber = number;
                await existingChapter.save();
            }else{
                const chapter = new Chapters({
                    chapterNumber : number,
                    name : name,
                    content : content,
                    storyId : storyId
                });
                story.content.push(chapter._id);
                await chapter.save();
            }
            await story.save();
            return res.status(200).json({"Message" : "Chapter Created"})
        }
    } catch (error) {
        return res.status(404).json({"Message" : error})
    }
});

router.get("/chapters/:id" , verifyJwt , async(req,res)=>{
    try {
        const {id} = req.params;
      // const userId = req.user.userId;
        const story = await Story.findById(id).populate("content");
        return res.status(200).json({"Message" : story.content})
    } catch (error) {
        
    }
});

module.exports = router;