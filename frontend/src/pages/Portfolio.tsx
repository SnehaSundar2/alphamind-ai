export default function Portfolio() {
  const holdings = [
    { stock: "TCS", shares: 10, value: "₹42,000" },
    { stock: "INFY", shares: 20, value: "₹35,000" },
    { stock: "RELIANCE", shares: 5, value: "₹18,000" },
  ];

  return (
    <div>
      <h1>Portfolio</h1>

      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Shares</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((item) => (
            <tr key={item.stock}>
              <td>{item.stock}</td>
              <td>{item.shares}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}