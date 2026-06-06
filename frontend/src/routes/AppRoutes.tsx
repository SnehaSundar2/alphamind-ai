import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import Watchlist from "../pages/Watchlist";
import Research from "../pages/Research";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Sidebar from "../components/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/portfolio"
        element={
          <Layout>
            <Portfolio />
          </Layout>
        }
      />

      <Route
        path="/watchlist"
        element={
          <Layout>
            <Watchlist />
          </Layout>
        }
      />

      <Route
        path="/research"
        element={
          <Layout>
            <Research />
          </Layout>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" />}
      />
    </Routes>
  );
}