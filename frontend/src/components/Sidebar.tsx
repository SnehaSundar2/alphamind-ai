import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>📈 AlphaMind AI</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/research">Research</Link>
    </div>
  );
}