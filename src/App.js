import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./components/Compoenents/AdminLogin";
import UserLogin from "./components/Compoenents/UserLogin";
import AdminPanel from "./components/Screean/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import ExecutiveDirectorPanel from "./components/Screean/ExecutiveDirectorPanel";
import MemberPanel from "./components/Screean/MemberPanel";
import styles from "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<UserLogin />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected AdminPanel Route */}
      <Route
        path="/admin-panel/*"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Protected Executive Director Panel Route */}
      <Route
        path="/executive-director-panel/*"
        element={
          <ProtectedRoute role="executiveDirector">
            <ExecutiveDirectorPanel />
          </ProtectedRoute>
        }
      />
      {/* Protected Member Panel Route */}
      <Route path="/member-panel/*" element={<MemberPanel />} />

      {/* Redirect to Login if no matching route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
