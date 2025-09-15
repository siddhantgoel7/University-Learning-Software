import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signInProfessor, signUpProfessor } = useAuth();
  const navigate = useNavigate();

  function submit() {
    setError(null);
    if (mode === "signin") {
      const err = signInProfessor(email.trim(), password);
      if (err) return setError(err);
    } else {
      if (!name.trim()) return setError("Please enter your name.");
      const err = signUpProfessor(email.trim(), password, name.trim());
      if (err) return setError(err);
    }
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 border rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold mb-4">
          {mode === "signin" ? "Professor Sign in" : "Professor Sign up"}
        </h1>

        {mode === "signup" && (
          <>
            <label className="text-sm mb-1 block">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-700" />
          </>
        )}

        <label className="text-sm mb-1 block">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-700" />

        <label className="text-sm mb-1 block">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 dark:bg-gray-700" />

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <button className="w-full bg-blue-600 text-white py-2 rounded mb-3" onClick={submit}>
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button className="w-full text-sm text-blue-600" onClick={() => setMode(mode==="signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
