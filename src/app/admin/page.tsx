"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /admin/company-requests
    router.push("/admin/company-requests");
  }, []);

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Redirecting...</h1>
    </div>
  );
}
