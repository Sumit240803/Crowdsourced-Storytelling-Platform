"use client";
import { createStory } from "@/app/services/user";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Create = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    tags: [],
    collaborators: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "tags" || name === "collaborators") {
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

    const dataToSend = {
      ...formData,
      tags: formData.tags.filter((tag) => tag),
    };

    try {
      const data = await createStory(
        dataToSend.title,
        dataToSend.synopsis,
        dataToSend.tags,
        token
      );
      if (data) {
        router.replace(`/pages/write/${data.id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md font-amaranth sm:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Create a New Story
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-6">
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
        <div className="mb-6">
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
        <div className="mb-6">
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
          className="w-full py-3 bg-orange-500 text-white text-lg rounded-md hover:bg-orange-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
