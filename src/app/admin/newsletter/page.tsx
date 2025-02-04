"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTimes, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function CreateNewsletter() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get Current Date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Add Keyword
  const handleAddKeyword = () => {
    if (newKeyword.trim() !== "" && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  // Remove Keyword
  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You are not logged in!");
      router.push("/auth/login");
      return;
    }

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        const imageResponse = await fetch("/api/upload-news-image", {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Image upload failed");

        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl;
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }

    const requestData = {
      title,
      subtitle,
      body: content,
      thumbnailImg: imageUrl,
      keywords,
      postDateTime: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/sajin/addNewsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Newsletter posted successfully!");
        setTitle("");
        setSubtitle("");
        setContent("");
        setKeywords([]);
        setImage(null);
        setImagePreview(null);
        router.push("/admin/newsletter");
      } else {
        const errorData = await response.json();
        console.error("Newsletter API error:", errorData);
        alert("Failed to post newsletter: " + errorData.message);
      }
    } catch (error) {
      console.error("Error posting newsletter:", error);
      alert("Failed to post newsletter!");
    }

    setLoading(false);
  };

  return (
    <div className="flex p-8 space-x-8 ">
      {/* Left Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create Newsletter
        </h2>

        {/* Title & Subtitle - Placeholder Effect */}
        <div className="text-center mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full text-2xl font-semibold text-center bg-transparent outline-none placeholder-gray-400"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Sub-title"
            className="w-full text-sm text-gray-500 text-center bg-transparent outline-none placeholder-gray-400"
          />
        </div>

        {/* Content Box with Dropdown */}
        <div className="relative">
          <textarea
            rows={20}
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
          />
          <FaChevronDown className="absolute top-3 right-3 text-gray-500" />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "POST"}
        </button>
      </div>

      {/* Right Section (Image & Keywords) */}
      <div className="w-96 bg-white shadow-lg rounded-lg p-4">
        {/* Image Upload Box */}
        <div className="relative w-full h-48 bg-gray-100 border-dashed border-2 border-gray-300 rounded-t-lg flex items-center justify-center">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Thumbnail Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />
              <FaPlus className="text-gray-500 text-2xl" />
              <span className="text-sm text-gray-500 mt-2">Select an Image</span>
            </label>
          )}
        </div>

        {/* Date Display */}
        <p className="text-sm text-gray-600 mt-2 text-center">{currentDate}</p>

        {/* Keywords Section */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Add related keyword</p>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Keyword"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              onClick={handleAddKeyword}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <FaPlus />
            </button>
          </div>

          {/* Keyword List */}
          <div className="flex flex-wrap mt-2 gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-600 px-3 py-1 text-xs rounded-full flex items-center"
              >
                {keyword}
                <FaTimes
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveKeyword(index)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
