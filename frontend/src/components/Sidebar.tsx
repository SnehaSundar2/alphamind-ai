import { Link } from "react-router-dom";

export default function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <h2>📈 AlphaMind AI</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/portfolio">Portfolio</Link>

        <Link to="/watchlist">Watchlist</Link>

        <Link to="/research">Research</Link>

        <Link to="/news">Market News</Link>
      </nav>

      <button
        onClick={logout}
        style={{
          marginTop: "30px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}