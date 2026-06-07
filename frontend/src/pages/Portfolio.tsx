import { useEffect, useState } from "react";
const email = localStorage.getItem("email");

interface PortfolioItem {
  id: number;
  symbol: string;
  quantity: string;
}

export default function Portfolio() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");

  const [portfolio, setPortfolio] = useState<
    PortfolioItem[]
  >([]);

  const loadPortfolio = async () => {
   const response = await fetch(
      `http://localhost:5000/api/portfolio/${email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    setPortfolio(data);
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

const addStock = async () => {
      if (!symbol || !quantity) {
        alert("Please fill all fields");
        return;
      }

      await fetch(
        "http://localhost:5000/api/portfolio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            symbol,
            quantity,
            email: localStorage.getItem("email"),
          }),
        }
      );

      setSymbol("");
      setQuantity("");

      loadPortfolio();
    };

  const deleteStock = async (
    id: number
  ) => {
    await fetch(
      `http://localhost:5000/api/portfolio/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    loadPortfolio();
  };

  return (
    <div>
      <h1>Portfolio Management</h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) =>
            setSymbol(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
          style={{
            marginLeft: "10px",
          }}
        />

        <button
          onClick={addStock}
          style={{
            marginLeft: "10px",
          }}
        >
          Add Stock
        </button>
      </div>

      <div className="cards">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            <h3>{item.symbol}</h3>

            <p>
              Quantity:{" "}
              {item.quantity}
            </p>

            <button
              onClick={() =>
                deleteStock(item.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}