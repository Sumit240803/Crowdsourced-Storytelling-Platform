const express = require("express");
const verifyJwt = require("../middlewares/verify");
const User = require("../models/User");
const Story = require("../models/Story");
const Chapters = require("../models/Chapters");
const router = express.Router();

router.post("/write-chapter", verifyJwt, async (req, res) => {
    try {
      const id = req.user.userId;
      console.log("User id :", id);
      const { content, storyId, name, number } = req.body;
      console.log("Story ID:", storyId);
  
      // Find the story by ID
      const story = await Story.findOne({ _id: storyId });
      if (!story) {
        return res.status(404).json({ Message: "Story not found" });
      }
  
      console.log("Body:", req.body);
  
      // Check if the user is the author or a collaborator
      if (story.author.equals(id) || story.collaborators.includes(id)) {
        // Find the chapter by storyId and chapterNumber
        const existingChapter = await Chapters.findOne({
          storyId: storyId,
          chapterNumber: number,
        });
  
        if (existingChapter) {
          // Update the existing chapter
          existingChapter.content = content;
          existingChapter.name = name;
          await existingChapter.save();
        } else {
          // Create a new chapter
          const newChapter = new Chapters({
            chapterNumber: number,
            name: name,
            content: content,
            storyId: storyId,
          });
  
          // Add the new chapter to the story's content
          story.content.push(newChapter._id);
          story.status = "published";
          await newChapter.save();
        }
  
        await story.save();
        return res.status(200).json({ Message: "Chapter created or updated" });
      } else {
        return res.status(403).json({ Message: "Unauthorized" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ Message: error.message });
    }
  });
  

router.get("/chapters/:id" , verifyJwt , async(req,res)=>{
    try {
        const {id} = req.params;
      // const userId = req.user.userId;
        const story = await Story.findById(id).populate("content");
        return res.status(200).json({"Message" : story.content})
    } catch (error) {
        return res.status(404).json({"Message" : error})
    }
});

router.get("/getStory/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const story = await Story.findById(id).populate('content');
        if(!story){
            res.status(404).json({"Message" : "Not found"});
        }
        res.status(200).json({"Message" : story.content});
    } catch (error) {
        return res.status(404).json({"Message" : error})
    }
});

router.get("/stories", async (req, res) => {
    try {
        // Get the page number and limit from query parameters (default to page 1 and limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch stories with pagination
        const stories = await Story.find({},'title synopsis author tags likes')
            .skip(skip)
            .limit(limit);

        // Get the total count of stories (for pagination metadata)
        const totalStories = await Story.countDocuments();

        // Return the paginated response
        res.status(200).json({
            stories,
            totalStories,
            totalPages: Math.ceil(totalStories / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching stories" });
    }
});



module.exports = router;