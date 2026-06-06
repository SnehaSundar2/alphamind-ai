export default function Dashboard() {
  return (
    <div>
      <h1>Market Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Portfolio Value</h3>
          <h2>₹2,45,000</h2>
        </div>

        <div className="card">
          <h3>Today's P&L</h3>
          <h2>+₹5,200</h2>
        </div>

        <div className="card">
          <h3>Watchlist</h3>
          <h2>12 Stocks</h2>
        </div>

        <div className="card">
          <h3>AI Insights</h3>
          <h2>7 New</h2>
        </div>
      </div>
    </div>
  );
}