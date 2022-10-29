import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signup";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import Users from "./Pages/Admin/Users";
import Booking from "./Pages/Admin/BookSlots";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminRoute from "./Components/AdminSide/AdminRoute";
import AdminProtectedRoute from "./Components/AdminSide/AdminProtectedRoute";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <Router>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLogin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Users />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/booking-slots"
          element={
            <AdminProtectedRoute>
              <Booking />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
