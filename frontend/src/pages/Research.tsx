export default function Research() {
  return (
    <div>
      <h1>AI Research Assistant</h1>

      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder="Ask AlphaMind AI..."
      />

      <button style={{ marginTop: "10px" }}>
        Analyze
      </button>

      <div className="card" style={{ marginTop: "20px" }}>
        <h3>AI Analysis</h3>

        <p>
          TCS shows strong revenue growth,
          healthy margins, and low debt.
        </p>

        <p>
          Long-term outlook: Positive
        </p>
      </div>
    </div>
  );
}