"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";
import CompanyCard from "@/components/CompanyCard";

export default function CompanyRequests() {
  const [queuedCompanies, setQueuedCompanies] = useState([]);
  const router = useRouter();

  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    console.log("isAuthenticated ==> ", isAuthenticated);
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, []);

  // Fetch queued companies from API
  const fetchQueuedCompanies = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/sajin/companies/queued", {
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
      setQueuedCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchQueuedCompanies();
  }, []);

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Approved" value="689" percentage="8.5%" status="up" icon="approved" />
        <StatsCard title="In Pending" value="32" percentage="1.3%" status="up" icon="pending" />
        <StatsCard title="Total Rejected" value="95" percentage="4.3%" status="down" icon="rejected" />
        <StatsCard title="In Queue" value={queuedCompanies.length} percentage="1.8%" status="up" icon="queue" />
      </div>

      {/* Queued Company Request Cards */}
      <div className="grid grid-cols-3 gap-6">
        {queuedCompanies.length > 0 ? (
          queuedCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} refreshCompanies={fetchQueuedCompanies} />
          ))
        ) : (
          <p className="text-gray-500">No companies in queue.</p>
        )}
      </div>
    </div>
  );
}
