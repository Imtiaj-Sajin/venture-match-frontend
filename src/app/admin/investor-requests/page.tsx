"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";
import InvestorCard from "@/components/InvestorCard";

export default function InvestorRequests() {
  const [queuedInvestors, setQueuedInvestors] = useState([]);
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, []);

  // Fetch queued investors from API
  const fetchQueuedInvestors = async () => {
    try {
      const response = await fetch("http://localhost:3000/sajin/investors/queued", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setQueuedInvestors(data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  useEffect(() => {
    fetchQueuedInvestors();
  }, []);

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Approved" value="320" percentage="10.5%" status="up" icon="approved" />
        <StatsCard title="In Pending" value="45" percentage="5.2%" status="up" icon="pending" />
        <StatsCard title="Total Rejected" value="120" percentage="4.8%" status="down" icon="rejected" />
        <StatsCard title="In Queue" value={queuedInvestors.length} percentage="2.3%" status="up" icon="queue" />
      </div>

      {/* Queued Investor Request Cards */}
      <div className="grid grid-cols-3 gap-6 ">
        {queuedInvestors.length > 0 ? (
          queuedInvestors.map((investor) => (
            <InvestorCard key={investor.id} investor={investor} refreshInvestors={fetchQueuedInvestors} />
          ))
        ) : (
          <p className="text-gray-500">No investors in queue.</p>
        )}
      </div>
    </div>
  );
}
