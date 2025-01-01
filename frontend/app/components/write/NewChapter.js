import { writeChapter } from "@/app/services/story";
import React, { useState } from "react";

const NewChapter = ({ id, number, name, content,token,chId }) => {
  const [chapterName, setChapterName] = useState(name);
  const [chapterContent, setChapterContent] = useState(content);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data =await writeChapter(token,chapterContent ,id,chapterName,number);
    console.log(data);
    console.log("Updated Chapter:", {storyId :  id, name : chapterName,content :  chapterContent , number : number });
  };

  return (
    <div className="p-4 border rounded bg-gray-900">
      <h2 className="text-xl font-bold text-orange-700 font-amaranth">
        Chapter {number}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Input for Name */}
        <div className="mb-4">
          <label htmlFor={`name-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id={`name-${id}`}
            name="name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Input for Content */}
        <div className="mb-4">
          <label htmlFor={`content-${id}`} className="block text-sm font-medium text-gray-300 mb-1">
            Story
          </label>
          <textarea
            id={`content-${id}`}
            name="content"
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            rows="4"
            className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default NewChapter;
