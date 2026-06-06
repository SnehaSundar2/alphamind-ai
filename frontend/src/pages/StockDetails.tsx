import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function StockDetails() {
  const { symbol } = useParams();
  const [stock, setStock] = useState<any>(null);

  useEffect(() => {
    api
      .get(`/stocks/${symbol}`)
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [symbol]);

  if (!stock) {
    return <h2>Loading...</h2>;
  }

  return (
  <div>
    <h1>{stock.symbol}</h1>

    <div className="cards">
      <div className="card">
        <h2>Current Price</h2>
        <p>₹{stock.price}</p>
      </div>

      <div className="card">
        <h2>Sentiment</h2>
        <p>{stock.sentiment}</p>
      </div>

      <div className="card">
        <h2>Recommendation</h2>
        <p>{stock.recommendation}</p>
      </div>

      <div className="card">
        <h2>AI Confidence Score</h2>
        <p>87%</p>
      </div>
    </div>
  </div>
);
}