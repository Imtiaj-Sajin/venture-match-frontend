"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const fallbackImage = "/default-news.jpg"; 

export default function NewsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch current news article
        const response = await fetch(`http://localhost:3000/sajin/newsletter/${id}`);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data);

        
        const allNewsResponse = await fetch("http://localhost:3000/sajin/allNewsletter");
        if (!allNewsResponse.ok) throw new Error("Failed to fetch all news");
        const allNews = await allNewsResponse.json();

        // Filter & sort related news based on priority algorithm
        const related = allNews
          .filter((item:any) => item.id !== data.id) // Exclude current news
          .map((item) => {
            let matchScore = 0;

            // 1st Priority: Keyword Matching
            if (item.keywords.some((kw:any) => data.keywords.includes(kw))) {
              matchScore += 3; 
            }

            // **2nd Priority: Title Similarity Matching**
            if (data.title.toLowerCase().includes(item.title.toLowerCase()) ||
                item.title.toLowerCase().includes(data.title.toLowerCase())) {
              matchScore += 2; 
            }

            // *3rd Priority: Body Content Similarity
            if (data.body.toLowerCase().includes(item.body.substring(0, 50).toLowerCase())) {
              matchScore += 1; // Low priority match
            }

            return { ...item, matchScore };
          })
          .sort((a, b) => b.matchScore - a.matchScore) 
          .slice(0, 4); // 4 related news

        setRelatedNews(related);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-lg text-gray-600">Loading news...</div>;
  }

  if (!news) {
    return <div className="text-center py-20 text-lg text-red-600">News not found.</div>;
  }

  return (
    <div className="pt-20 font-poppins bg-gray-100 min-h-screen">

      <Navbar />

      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* News Content */}
        <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={news.thumbnailImg || fallbackImage}
              alt={news.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* News Title */}
          <h1 className="text-4xl font-bold text-gray-900 mt-6">{news.title}</h1>
          <p className="text-lg text-gray-500 mt-2">{news.subtitle}</p>

          {/* Date */}
          <p className="text-sm text-gray-500 mt-1">
            Published on{" "}
            {new Date(news.postDateTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          

          {/* Email Subscription Box */}
          <div className="mt-8 bg-purple-50 p-6 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold text-purple-700">The startup discovery engine</h3>
            <p className="text-sm text-gray-600">Find your fund returners</p>
            <div className="mt-4 flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-64 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button className="px-4 bg-purple-600 text-white font-semibold rounded-r-lg hover:bg-purple-700">
                Book a demo
              </button>
            </div>
          </div>

          {/* News Body */}
          <div className="mt-4 text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {news.body}
          </div>

          {/*  Advertisement Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Advertisement</h3>
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg shadow">
              <p className="text-gray-500">[Ads]</p>
            </div>
          </div>

          

          {/* CTA Section - Encourage Product Conversion */}
          <div className="my-6 bg-purple-100 text-purple-700 p-4 rounded-lg text-center shadow-md">
            <h3 className="text-xl font-semibold"> Looking for Investment Opportunities?</h3>
            <p className="text-sm">Find investors or explore businesses to invest in.</p>
            <button
              className="mt-3 px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              onClick={() => router.push("/investment-opportunities")}
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Sidebar for Related News & Ads */}
        <div className="w-full lg:w-1/4 space-y-6">

          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related News</h3>
            {relatedNews.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                onClick={() => router.push(`/newsletters/${item.id}`)}
              >
                <div className="w-16 h-16 relative rounded-md overflow-hidden">
                  <Image
                    src={item.thumbnailImg || fallbackImage}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(item.postDateTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Ad Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sponsored</h3>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow">
              <p className="text-gray-500">[Ad Banner]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
