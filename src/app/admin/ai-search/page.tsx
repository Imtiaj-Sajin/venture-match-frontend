"use client";

import { useState } from "react";

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleSearch = async () => {
    if (!query.trim()) return; 

    setLoading(true);
    setError(""); 

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }), 
      });

      const data = await response.json();
      setResults(data.results || []); 
    } catch (err) {
      setError("Failed to fetch data."); 
    }
    setLoading(false); 
  };

  return (
    <div className="p-8 bg-gray-50" style={{ height: "calc(100vh - 4rem)" }}>
      <h1 className="text-3xl font-bold text-purple-700 mb-6">AI Query</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Ask anything (e.g., Total leads in March)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-4 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-purple-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* Display Results in Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg text-purple-700">Result {index + 1}</h3>
            <pre className="text-gray-700 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
