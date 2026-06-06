export default function Watchlist() {
  const stocks = [
    "HDFCBANK",
    "ICICIBANK",
    "SBIN",
    "RELIANCE",
    "TCS",
    "INFY",
  ];

  return (
    <div>
      <h1>Watchlist</h1>

      <div className="cards">
        {stocks.map((stock) => (
          <div className="card" key={stock}>
            <h3>{stock}</h3>
            <p>Strong Buy</p>
          </div>
        ))}
      </div>
    </div>
  );
}