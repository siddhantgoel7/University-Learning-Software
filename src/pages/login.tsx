import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [name, setName] = useState("Dr. Smith");
  const { loginAsProfessor } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 border rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">Professor Sign in</h1>
        <label className="text-sm mb-1 block">Your name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 dark:bg-gray-700"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={() => {
            loginAsProfessor(name);
            navigate("/dashboard");
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
