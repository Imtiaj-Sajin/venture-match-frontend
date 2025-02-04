"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // ✅ Icons for status

interface InvestorProps {
  investor: {
    id: number;
    investor_name: string;
    type: string;
    preferences: string;
    funds_available: string;
    history: string;
    proof_of_funds: boolean;
    nid_passport: boolean;
    source_of_funds: boolean;
    investment_portfolio: boolean;
    admin_decision: string | null;
  };
  refreshInvestors: () => void;
}

export default function InvestorCard({ investor, refreshInvestors }: InvestorProps) {
  const [status, setStatus] = useState(investor.admin_decision || "Pending");

  // Handle Approve/Reject API Request with Confirmation
  const handleDecision = async (decision: "Approved" | "Rejected") => {
    const confirmAction = window.confirm(`Are you sure you want to ${decision.toLowerCase()} this investor?`);
    if (!confirmAction) return;

    try {
      const updatedInvestor = { ...investor, admin_decision: decision };

      const response = await fetch("http://localhost:3000/sajin/addInvestors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
        body: JSON.stringify(updatedInvestor),
      });

      if (response.ok) {
        setStatus(decision); // Update UI immediately
        refreshInvestors(); // Refresh list
      } else {
        console.error("Failed to update investor decision.");
      }
    } catch (error) {
      console.error("Error sending decision:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-blue-500 font-semibold">#{investor.id}</span>
        <button className="text-sm text-blue-600 font-medium hover:underline">Edit</button>
      </div>

      {/* Investor Details */}
      <div className="mt-4 space-y-2 text-gray-700 text-sm">
        <p><strong className="text-gray-900">Investor Name:</strong> {investor.investor_name}</p>
        <p><strong className="text-gray-900">Type:</strong> {investor.type}</p>
        <p><strong className="text-gray-900">Preferences:</strong> {investor.preferences}</p>
        <p><strong className="text-gray-900">Funds Available:</strong> {investor.funds_available}</p>
        <p><strong className="text-gray-900">Investment History:</strong> {investor.history}</p>
        <p><strong className="text-gray-900">Status:</strong> {status}</p>
      </div>

      {/* Verification Status */}
      <div className="mt-4 ">
        <p className="font-semibold text-gray-900">Verification Status</p>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div className="flex items-center gap-2">
            {investor.proof_of_funds ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Proof of Funds</span>
          </div>

          <div className="flex items-center gap-2">
            {investor.nid_passport ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>NID/Passport</span>
          </div>

          <div className="flex items-center gap-2">
            {investor.source_of_funds ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Source of Funds</span>
          </div>

          <div className="flex items-center gap-2">
            {investor.investment_portfolio ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Investment Portfolio</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={() => handleDecision("Rejected")} className="bg-red-100 text-red-600 px-4 py-2 rounded border border-red-500 hover:bg-red-200 transition">
          REJECT
        </button>
        <button onClick={() => handleDecision("Approved")} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
          ACCEPT
        </button>
      </div>
    </div>
  );
}
