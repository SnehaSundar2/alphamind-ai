const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* In-Memory Storage */
const users = [];
const portfolio = [];

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
  });
});

/* Register */
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(
    (u) => u.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  users.push({
    name,
    email,
    password,
  });

  res.json({
    success: true,
    message: "Registration Successful",
  });
});

/* Login */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  res.json({
    success: true,
    token: "alphamind-demo-token",
    user,
  });
});

/* Portfolio APIs */

app.get("/api/portfolio", (req, res) => {
  res.json(portfolio);
});

app.post("/api/portfolio", (req, res) => {
  const { symbol, quantity } = req.body;

  portfolio.push({
    id: Date.now(),
    symbol,
    quantity,
  });

  res.json({
    success: true,
    message: "Stock Added",
  });
});

app.delete("/api/portfolio/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = portfolio.findIndex(
    (item) => item.id === id
  );

  if (index !== -1) {
    portfolio.splice(index, 1);
  }

  res.json({
    success: true,
    message: "Stock Deleted",
  });
});

/* Stock List */
app.get("/api/stocks", (req, res) => {
  res.json([
    {
      symbol: "TCS",
      price: 4200,
      sentiment: "Bullish",
    },
    {
      symbol: "INFY",
      price: 1750,
      sentiment: "Bullish",
    },
    {
      symbol: "RELIANCE",
      price: 2900,
      sentiment: "Neutral",
    },
  ]);
});

/* Stock Details */
app.get("/api/stocks/:symbol", (req, res) => {
  const stocks = {
    TCS: {
      symbol: "TCS",
      price: 4200,
      sentiment: "Bullish",
      recommendation: "BUY",
    },
    INFY: {
      symbol: "INFY",
      price: 1750,
      sentiment: "Bullish",
      recommendation: "BUY",
    },
    RELIANCE: {
      symbol: "RELIANCE",
      price: 2900,
      sentiment: "Neutral",
      recommendation: "HOLD",
    },
  };

  res.json(
    stocks[req.params.symbol.toUpperCase()] || {
      symbol: req.params.symbol.toUpperCase(),
      price: 0,
      sentiment: "Unknown",
      recommendation: "N/A",
    }
  );
});

/* AI Research */
app.get("/api/analyze", (req, res) => {
  const stock = (req.query.stock || "").toUpperCase();

  const analyses = {
    TCS: "Strong revenue growth, low debt, excellent long-term investment opportunity.",
    INFY: "Healthy margins, strong client base, positive outlook for IT sector.",
    RELIANCE: "Diversified business model with stable growth potential. HOLD.",
  };

  res.json({
    stock,
    analysis:
      analyses[stock] ||
      "No AI analysis available for this stock.",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});