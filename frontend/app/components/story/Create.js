"use client";
import { createStory } from "@/app/services/user";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Create = () => {
  const [token, setToken] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    tags: [],
    collaborators: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    setToken(token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags" || name === "collaborators") {
      // Update tags or collaborators as arrays, splitting by commas
      setFormData({
        ...formData,
        [name]: value ? value.split(",").map((item) => item.trim()) : [],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure tags and collaborators are empty arrays if no valid input
    const dataToSend = {
      ...formData,
      tags: formData.tags.filter((tag) => tag) // Remove empty strings
    };

    try {
      console.log("Token from function" , token)
      const data = await createStory(
        dataToSend.title,
        dataToSend.synopsis,
        dataToSend.tags,
        token
      );
      if(data){
        router.replace(`/pages/write/${data.id}`)
      }
      console.log("Response Data:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg text-sm mx-auto p-4 font-amaranth text-white rounded-xl">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Synopsis */}
        <div className="mb-4">
          <label htmlFor="synopsis" className="block text-lg font-medium mb-2">
            Synopsis
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-lg font-medium mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Horror, Romantic"
          />
        </div>

        

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
