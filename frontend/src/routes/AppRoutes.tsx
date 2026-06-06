import { Routes, Route, Navigate } from "react-router-dom";

import News from "../pages/News";
import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import Watchlist from "../pages/Watchlist";
import Research from "../pages/Research";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StockDetails from "../pages/StockDetails";
import ProtectedRoute from "../components/ProtectedRoute";
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
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Layout Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Layout>
              <Portfolio />
            </Layout>
          </ProtectedRoute>
          
        }
      />

      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Layout>
              <Watchlist />
            </Layout>
          </ProtectedRoute>
          
        }
      />

      <Route
        path="/research"
        element={
          <ProtectedRoute>
            <Layout>
              <Research />
            </Layout>
          </ProtectedRoute>
          
        }
      />

      <Route
        path="/stock/:symbol"
        element={
          <ProtectedRoute>
              <Layout>
                <StockDetails />
              </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <Layout>
              <News />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" />}
      />
    </Routes>
  );
}