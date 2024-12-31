"use client"
import React, { useState } from "react";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    tags: "",
    collaborators: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form Data Submitted:", formData);
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
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Web, React, JavaScript"
            required
          />
        </div>

        {/* Collaborators */}
        <div className="mb-4">
          <label htmlFor="collaborators" className="block text-lg font-medium mb-2">
            Collaborators
          </label>
          <input
            type="text"
            id="collaborators"
            name="collaborators"
            value={formData.collaborators}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. John, Jane"
            required
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
