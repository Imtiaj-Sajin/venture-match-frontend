"use client";

import Image from "next/image";
import { FaUsers, FaChartBar, FaGlobe } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
// import { useEffect } from "react";
import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  
  const fetchIPData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/leads/get-ip");
      const data = await response.json();
      console.log("Fetched IP Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching IP details:", error);
      return {
        query: "Unknown",
        city: "Unknown",
        country: "Unknown",
        lat: "Unknown",
        lon: "Unknown",
        timezone: "Unknown",
        currency: "Unknown",
        mobile: false,
        device: "Unknown",
      };
    }
  };

  //  Handle Book Demo
  const handleBookDemo = async () => {
    console.log("email ==> ", email);

    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    const ipData = await fetchIPData();
    console.log("ipData ==> ", ipData);

    const leadData = {
      email,
      time: new Date().toISOString(),
      ip: ipData?.query || "Unknown",
      city: ipData?.city || "Unknown",
      regionName: ipData?.regionName || "Unknown",
      country: ipData?.country || "Unknown",
      latitude: ipData?.lat?.toString() || "Unknown",
      longitude: ipData?.lon?.toString() || "Unknown",
      timezone: ipData?.timezone || "Unknown",
      currency: ipData?.currency || "Unknown",
      mobile: ipData?.mobile || false,  
      device: ipData?.device || "Unknown",
      source: "home",
    };

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/leads/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setMessage("Thank you! We'll be in touch.");
        setEmail("");
      } else {
        setMessage("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setMessage("Error submitting lead.");
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-10">
        <h1 className="text-4xl font-bold max-w-3xl">
          Connects Investors and Companies
        </h1>
        <p className="mt-4 text-base max-w-2xl">
          Global data platform for intelligence on startups, innovation, high-growth companies, ecosystems, and investment strategies.
        </p>


        <div className="flex space-x-3 mt-6">
          <input
            type="email"
            placeholder="Work email"
            className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-white text-purple-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            onClick={handleBookDemo}

            
            disabled={loading}
          >
            {loading ? "Submitting..." : "Book a demo"}
          </button>
        </div>


      </section>



      <div className="flex justify-center -mt-20">
        <Image
          src="/ss2.png"
          width={1200}
          height={600}
          alt="Dashboard Preview"
          className="shadow-lg rounded-lg"
        />
      </div>

      <section className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Our clients include</h2>
        <div className="flex justify-center gap-10 mt-6">
          <Image src="https://www.svgrepo.com/show/303143/microsoft-logo.svg"  height={50} width={100} alt="Microsoft" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/6/62/Amazon.com-Logo.svg" width={100} height={50} alt="Amazon" />
          <Image src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Accenture_logo.svg" width={100} height={50} alt="Accenture" />
        </div>
      </section>

      {/* Features Section */}
      <section className="p-10 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Optra?</h2>
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg">
            <FaUsers className="text-5xl text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Early-stage startup discovery</h3>
            <p className="text-gray-600 mt-2">Effortlessly track new promising founders and discover early-stage companies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <FaChartBar className="text-5xl text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Predictive intelligence</h3>
            <p className="text-gray-600 mt-2">Leverage AI to generate insights from millions of data points.</p>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <FaGlobe className="text-5xl text-purple-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Tech ecosystem benchmarking</h3>
            <p className="text-gray-600 mt-2">Gain insights into tech ecosystem growth across the world.</p>
          </div>
        </div>
      </section>


      {/* Opportunies  */}
     
      <section id="opportunities" className="p-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          Data & Insights on Startups and Innovation
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mt-3">
          Leading industry reports on key innovation trends, venture capital, and ecosystems.
        </p>

        <div className="mt-12 space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <Image src="/ss6.png" width={600} height={350} quality={100} priority={true} unoptimized={true} alt="Report" className="rounded-lg shadow-md w-full md:w-1/2" />
            <div className="md:w-1/2 text-left">
              <h3 className="text-3xl font-semibold text-gray-800">Find Leading Investors that Match You</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Discover the top investors based on industry, investment size, and success rate.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <Image src="/ss5.png" width={600} height={350} quality={100} priority={true} unoptimized={true} alt="Report" className="rounded-lg shadow-md w-full md:w-1/2" />
            <div className="md:w-1/2 text-left">
              <h3 className="text-3xl font-semibold text-gray-800">Market Insights & Trends</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Get the latest data on emerging industries and investment patterns to stay ahead.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <Image src="/ss4.png" width={600} height={350} quality={100} priority={true} unoptimized={true} alt="Report" className="rounded-lg shadow-md w-full md:w-1/2" />
            <div className="md:w-1/2 text-left">
              <h3 className="text-3xl font-semibold text-gray-800">AI-Driven Investment Analysis</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Leverage AI-powered analytics to identify the most promising investment opportunities.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <Image src="/ss3.png" width={600} height={350} quality={100} priority={true} unoptimized={true} alt="Report" className="rounded-lg shadow-md w-full md:w-1/2" />
            <div className="md:w-1/2 text-left">
              <h3 className="text-3xl font-semibold text-gray-800">Exclusive Data Reports</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Access premium investment reports and case studies from top-tier venture capitalists.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition">
            Read Latest Reports
          </button>
        </div>
      </section>



      <Footer />
    </div>
  );
}
