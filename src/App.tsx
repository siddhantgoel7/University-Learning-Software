import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import Login from "./pages/login";
import Students from "./pages/Students";

import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/students" element={<Students />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
