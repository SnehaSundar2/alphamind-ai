import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

interface Stock {
  symbol: string;
  price: number;
  sentiment: string;
}

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/stocks")
      .then((res) => {
        setStocks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Market Dashboard</h1>

      <input
        type="text"
        placeholder="Search stocks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <div className="cards">
        {filteredStocks.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="card">
              <h3>{stock.symbol}</h3>

              <h2>₹{stock.price}</h2>

              <p>{stock.sentiment}</p>

              <small>Click to view details →</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}