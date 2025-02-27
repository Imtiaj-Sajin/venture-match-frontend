"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 

interface CompanyProps {
  company: {
    id: number;
    company_name: string;
    company_type: string;
    growth: string;
    launch_date: string;
    funding: string;
    status: string;
    business_plan: boolean;
    liabilities_report: boolean;
    income_statement: boolean;
    pitch_deck: boolean;
    balance_sheet: boolean;
    valuation_report: boolean;
  };
  refreshCompanies: () => void;
}

export default function CompanyCard({ company, refreshCompanies }: CompanyProps) {
  const [status, setStatus] = useState(company.status);

  // Handle Approve/Reject API Request with Confirmation
  const handleDecision = async (decision: "Approved" | "Rejected") => {
    const confirmAction = window.confirm(`Are you sure you want to ${decision.toLowerCase()} this company?`);
    if (!confirmAction) return;

    try {
      const updatedCompany = { ...company, admin_decision: decision };

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL+"/sajin/addCompanies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
        body: JSON.stringify(updatedCompany),
      });

      if (response.ok) {
        setStatus(decision); // Update local UI
        refreshCompanies(); // Refresh company list
      } else {
        console.error("Failed to update company decision.");
      }
    } catch (error) {
      console.error("Error sending decision:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-purple-500 font-semibold">#{company.id}</span>
        <button className="text-sm text-purple-600 font-medium hover:underline">Edit</button>
      </div>

      {/* Company Details */}
      <div className="mt-4 space-y-2 text-gray-700 text-sm">
        <p><strong className="text-gray-900">Company Name:</strong> {company.company_name}</p>
        <p><strong className="text-gray-900">Type:</strong> {company.company_type}</p>
        <p><strong className="text-gray-900">Growth:</strong> {company.growth}</p>
        <p><strong className="text-gray-900">Launch Date:</strong> {company.launch_date}</p>
        <p><strong className="text-gray-900">Funding:</strong> {company.funding}</p>
        <p><strong className="text-gray-900">Status:</strong> {status}</p>
      </div>

      {/* Reports Submitted with Icons */}
      <div className="mt-4">
        <p className="font-semibold text-gray-900">Reports Submitted</p>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
          <div className="flex items-center gap-2">
            {company.business_plan ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Business Plan</span>
          </div>

          <div className="flex items-center gap-2">
            {company.liabilities_report ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Liabilities Report</span>
          </div>

          <div className="flex items-center gap-2">
            {company.income_statement ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Income Statement</span>
          </div>

          <div className="flex items-center gap-2">
            {company.pitch_deck ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Pitch Deck</span>
          </div>

          <div className="flex items-center gap-2">
            {company.balance_sheet ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Balance Sheet</span>
          </div>

          <div className="flex items-center gap-2">
            {company.valuation_report ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span>Valuation Report</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleDecision("Rejected")}
          className="bg-red-100 text-red-600 px-4 py-2 rounded border border-red-500 hover:bg-red-200 transition"
        >
          REJECT
        </button>
        <button
          onClick={() => handleDecision("Approved")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          ACCEPT
        </button>
      </div>
    </div>
  );
}
