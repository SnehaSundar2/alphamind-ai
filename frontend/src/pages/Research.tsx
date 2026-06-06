import { useState } from "react";

export default function Research() {
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeStock = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/analyze?stock=${query}`
      );

      const data = await response.json();

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
      setAnalysis("Failed to fetch analysis.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>AI Research Assistant</h1>

      <input
        type="text"
        placeholder="Enter Stock Symbol"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px",
        }}
      />

      <button onClick={analyzeStock}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}

      {analysis && (
        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>AI Analysis</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}