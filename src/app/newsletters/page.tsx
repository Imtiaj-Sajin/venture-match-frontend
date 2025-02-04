"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const fallbackImage = "/profile1."; // Default image

export default function Newsletters() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await fetch("http://localhost:3000/sajin/allNewsletter");
        if (!response.ok) throw new Error("Failed to fetch newsletters");
        const data = await response.json();
        data.sort((a, b) => new Date(b.postDateTime).getTime() - new Date(a.postDateTime).getTime()); // Sort by latest
        setNewsletters(data);
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-600">Loading news...</div>;
  }

  return (
    <div className="font-poppins bg-gray-100 min-h-screen">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Latest News & Insights</h1>

        {newsletters.length === 0 ? (
          <p className="text-center text-gray-600">No news available.</p>
        ) : (
          <>
            {/* LATEST NEWS - Big Banner */}
            <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden shadow-lg cursor-pointer" 
              onClick={() => router.push(`/newsletters/${newsletters[0].id}`)}>
              <Image
                src={newsletters[0].thumbnailImg || fallbackImage}
                alt={newsletters[0].title}
                layout="fill"
                objectFit="cover"
                className="brightness-75"
              />
              <div className="absolute bottom-0 left-0 p-6 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
                <h2 className="text-3xl font-bold">{newsletters[0].title}</h2>
                <p className="text-lg">{newsletters[0].subtitle}</p>
                <p className="text-sm mt-2 opacity-80">
                  {new Date(newsletters[0].postDateTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* OTHER NEWS - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsletters.slice(1).map((news) => (
                <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/newsletters/${news.id}`)}>
                  
                  {/* Image Section */}
                  <div className="w-full h-52 relative">
                    <Image
                      src={news.thumbnailImg || fallbackImage}
                      alt={news.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{news.subtitle}</p>

                    <div className="flex flex-wrap gap-2">
                      {news.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="bg-purple-100 text-purple-600 px-2 py-1 text-xs rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                      {new Date(news.postDateTime).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
