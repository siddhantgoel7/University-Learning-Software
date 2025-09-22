import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          <Link to="/dashboard">UniLearn</Link>
        </h2>

        <nav className="space-y-1">
          <NavLink to="/dashboard" className={({ isActive }) => navCls(isActive)}>
            Courses
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => navCls(isActive)}>
            Students
          </NavLink>
        </nav>

        {user && (
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="mt-6 text-sm text-red-500 hover:text-red-600"
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

function navCls(isActive: boolean) {
  return `block rounded-md px-3 py-2 text-sm ${
    isActive
      ? "bg-gray-900 text-white dark:bg-gray-700"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
  }`;
}
