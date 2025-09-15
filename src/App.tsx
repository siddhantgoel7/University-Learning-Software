import { Routes, Route, Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import Login from "./pages/login";
import Students from "./pages/Students";

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "professor") return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function Shell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">UniLearn</h2>
        <nav className="space-y-3">
          <Link to="/dashboard" className="block hover:text-blue-500">
            Courses
          </Link>
          <Link to="/students" className="block hover:text-blue-500">
            Students
          </Link>
        </nav>
        {user && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mt-6 text-sm text-red-500"
          >
            Sign out
          </button>
        )}
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <Protected>
              <Shell />
            </Protected>
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
