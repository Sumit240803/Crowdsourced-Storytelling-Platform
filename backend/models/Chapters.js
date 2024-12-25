const mongoose = require("mongoose");


const chapterSchema = new mongoose.Schema({
    name : {
        type : String
    },
    storyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Story"
    },
    content : {
        type : String
    }
})

const Chapters = mongoose.model("Chapters" , chapterSchema);
module.exports = Chapters;