const pool = require("./db/db");

async function testConnection() {
  try {
    const result = await pool.query(
      "SELECT NOW()"
    );

    console.log(
      "Connected to PostgreSQL"
    );

    console.log(result.rows[0]);
  } catch (error) {
    console.error(error);
  }
}

testConnection();