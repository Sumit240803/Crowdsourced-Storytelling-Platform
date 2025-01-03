"use client";
import Nav from "@/app/components/profile/Nav";
import Chapter from "@/app/components/write/Chapter";
import { getStory } from "@/app/services/story";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Id = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const [newChapters, setNewChapters] = useState([]);
  const [token, setToken] = useState("");

  // Add a new chapter
  const handleNewChapter = () => {
    const nextChapterNumber =
      chapters.length + newChapters.length + 1; // Sequentially assign chapter numbers
    setNewChapters((prev) => [
      ...prev,
      { number: nextChapterNumber, name: "", content: "" },
    ]);
  };

  // Remove a specific chapter
  const handleRemoveChapter = (number) => {
    setNewChapters((prev) => prev.filter((chapter) => chapter.number !== number));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const content = async () => {
      const data = await getStory(token, id);
      if (data?.Message) {
        setChapters(data.Message);
      }
      console.log(data);
    };
    content();
  }, [id]);

  return (
    <div className="">
      <Nav />
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleNewChapter}
          className="px-4 py-2 bg-orange-600 m-2 text-white rounded"
        >
          Add Chapter
        </button>
        <Link
          href={`/pages/stories/${id}/invite`}
          className="px-4 py-2 bg-orange-600 m-2 text-white rounded"
        >
          Invite Collaborators
        </Link>
      </div>

      <div className="space-y-4 m-2">
        {chapters.length > 0
          ? chapters.map((chapter) => (
              <Chapter
                key={chapter._id}
                id={chapter.storyId}
                number={chapter.chapterNumber}
                name={chapter.name}
                content={chapter.content}
                token={token}
              />
            ))
          : null}

        {newChapters.map((chapter) => (
          <div key={`new-${chapter.number}`} className="relative border p-4 rounded">
            <Chapter
              id={id} // Pass the story ID
              number={chapter.number}
              name={chapter.name}
              content={chapter.content}
              token={token}
            />
            <button
              onClick={() => handleRemoveChapter(chapter.number)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Id;
