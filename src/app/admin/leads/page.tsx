"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);


  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailResponseMessage, setEmailResponseMessage] = useState("");


  const fetchLeads = async () => {
    try {
      const response = await fetch("http://localhost:3000/leads");
      const data = await response.json();
      const sortedLeads = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLeads(sortedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);


  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      setEmailResponseMessage("Please provide both subject and message.");
      return;
    }

    setEmailLoading(true);
    setEmailResponseMessage("");

    const leadEmail = selectedLead ? selectedLead.email : "default@example.com"; 

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          text: message,
          toEmail: leadEmail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailResponseMessage("Email sent successfully!");
        setSubject("");
        setMessage("");
      } else {
        setEmailResponseMessage(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setEmailResponseMessage("Error sending email.");
    }

    setEmailLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Leads List */}
      <div className="w-1/3 p-4 border-r overflow-y-auto bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Leads</h2>

        {leads.length === 0 ? (
          <p className="text-gray-500 text-center">No leads available.</p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 mb-3 rounded-lg shadow cursor-pointer ${
                selectedLead?.id === lead.id ? "bg-purple-100" : "bg-gray-100 hover:bg-purple-50"
              } transition`}
            >
              <h3 className="font-semibold text-lg text-gray-800">{lead.email}</h3>
              <p className="text-sm text-gray-600">
                {lead.city || "Unknown"}, {lead.country || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mt-1">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>




      <div className="flex-1 p-6 bg-gray-100">
        {selectedLead ? (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Lead Details</h2>

            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Email:</span> {selectedLead.email}
              </div>
              <div>
                <span className="font-semibold text-gray-700">IP Address:</span> {selectedLead.ip}
              </div>
              <div>
                <span className="font-semibold text-gray-700">City:</span> {selectedLead.city || "Unknown"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Country:</span> {selectedLead.country || "Unknown"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Source:</span> {selectedLead.source}
              </div>
              <div>
                <span className="font-semibold text-gray-700">User Agent:</span>{" "}
                {selectedLead.userAgent || "Unknown"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Referrer:</span>{" "}
                {selectedLead.referrer || "None"}
              </div>
              <div>
                <span className="font-semibold text-gray-700">Date Submitted:</span>{" "}
                {new Date(selectedLead.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a lead to view details.</p>
          </div>
        )}

        {/* Email Form to Send Email */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Send Email to Lead</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
              ></textarea>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSendEmail}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                disabled={emailLoading}
              >
                {emailLoading ? "Sending..." : "Send Email"}
              </button>
            </div>
            {emailResponseMessage && (
              <div className="mt-4 text-center text-gray-600">{emailResponseMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
