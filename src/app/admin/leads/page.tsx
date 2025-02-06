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

      const sortedLeads = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

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
      const response = await fetch("/api/send-email", {
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
    <div className="flex bg-gray-50 overflow-hidden" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Left Panel - Leads List */}
      <div className="w-1/3 p-4 border-r overflow-y-auto bg-white shadow-md">

        {leads.length === 0 ? (
          <p className="text-gray-500 text-center">No leads available.</p>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={`p-4 mb-3 rounded-lg shadow cursor-pointer ${
                selectedLead?.id === lead.id
                  ? "bg-purple-100"
                  : "bg-gray-100 hover:bg-purple-50"
              } transition`}
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {lead.email}
              </h3>
              <p className="text-sm text-gray-600">
                {lead.city || "Unknown"},{" "}
                {lead.regionName || "Unknown Region"}, {lead.country || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(lead.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Right Panel - Lead Details */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
    {selectedLead ? (
    <div className="space-y-6">
      {/*  Map  */}
      {selectedLead.latitude && selectedLead.longitude && (
        <div className="rounded-xl overflow-hidden shadow-md">
          <iframe
            src={`https://www.google.com/maps?q=${selectedLead.latitude},${selectedLead.longitude}&hl=es;z=140&output=embed`}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}

      {/* 📅 Date Display */}
      <div className="text-center text-gray-700 text-lg font-semibold">
        {new Date(selectedLead.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* ✅ Pill-shaped Tags for Key Info */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: "IP", value: selectedLead.ip },
          { label: "Mobile", value: selectedLead.mobile ? "Yes" : "No" },
          { label: "Device", value: selectedLead.device || "Unknown" },
          { label: "Timezone", value: selectedLead.timezone || "Unknown" },
          { label: "Currency", value: selectedLead.currency || "Unknown" },
          { label: "Region", value: selectedLead.regionName || "Unknown" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full shadow-sm text-sm font-medium"
          >
            {item.label}: {item.value}
          </div>
        ))}
      </div>

      {/* ✅ Email and Referrer Details */}
      <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
        <div className="text-gray-800 font-semibold">
          Email: {selectedLead.email}
        </div>
        <div className="text-gray-600">
          Referrer: {selectedLead.referrer || "None"}
        </div>
        <div className="text-gray-600">Source: {selectedLead.source}</div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                    Send Email
                </h3>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 border rounded-md mb-2 focus:outline-none"
                />
                <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full p-2 border rounded-md focus:outline-none"
                ></textarea>
                <button
                    onClick={handleSendEmail}
                    disabled={emailLoading}
                    className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    {emailLoading ? "Sending..." : "Send Email"}
                </button>
                {emailResponseMessage && (
                    <p className="mt-2 text-center text-sm text-gray-600">
                    {emailResponseMessage}
                    </p>
                )}
                </div>
      

    </div>
    

  ) : (
    <div className="flex items-center justify-center h-full text-gray-500">
      <p>Select a lead to view details.</p>
    </div>
  )}

        
</div>


    </div>
  );
}
