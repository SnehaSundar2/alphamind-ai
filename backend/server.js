const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const pool = require("./db/db");

app.use(cors());
app.use(express.json());

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
  });
});

/* Register */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users(name,email,password)
      VALUES($1,$2,$3)
      `,
      [name, email, hashedPassword]
    );

    res.json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
});

/* Login */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "alphamind_secret_key",
      {
        expiresIn: "24h",
      }
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
});

/* Portfolio APIs */

/* Portfolio APIs - PostgreSQL */

app.get("/api/portfolio/:email", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM portfolio
      WHERE user_email = $1
      ORDER BY id DESC
      `,
      [req.params.email]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load portfolio",
    });
  }
});

app.post("/api/portfolio", async (req, res) => {
  try {
    const { symbol, quantity, email } = req.body;

    const result = await pool.query(
      `
      INSERT INTO portfolio(symbol, quantity, user_email)
      VALUES($1,$2,$3)
      RETURNING *
      `,
      [symbol, quantity, email]
    );

    res.json({
      success: true,
      message: "Stock Added",
      stock: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add stock",
    });
  }
});

app.delete("/api/portfolio/:id", async (req, res) => {
  try {
    await pool.query(
      `
      DELETE FROM portfolio
      WHERE id = $1
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Stock Deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete stock",
    });
  }
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