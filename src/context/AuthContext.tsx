import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; email: string; role: "professor" | "student" };
type AuthCtx = {
  user: User | null;
  signUpProfessor: (email: string, password: string, name: string) => string | null; // returns error string or null
  signInProfessor: (email: string, password: string) => string | null;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

// very tiny in-browser "db"
type StoredProf = { id: string; name: string; email: string; password: string };
const KEY_USER = "auth:user";
const KEY_PROFS = "auth:professors";

function loadProfs(): StoredProf[] {
  try { return JSON.parse(localStorage.getItem(KEY_PROFS) || "[]"); } catch { return []; }
}
function saveProfs(list: StoredProf[]) { localStorage.setItem(KEY_PROFS, JSON.stringify(list)); }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY_USER);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const signUpProfessor = (email: string, password: string, name: string) => {
    const profs = loadProfs();
    if (profs.some(p => p.email === email)) return "An account with that email already exists.";
    const p: StoredProf = { id: crypto.randomUUID(), name, email, password };
    saveProfs([...profs, p]);
    const u: User = { id: p.id, name: p.name, email: p.email, role: "professor" };
    setUser(u);
    localStorage.setItem(KEY_USER, JSON.stringify(u));
    return null;
  };

  const signInProfessor = (email: string, password: string) => {
    const p = loadProfs().find(p => p.email === email && p.password === password);
    if (!p) return "Invalid email or password.";
    const u: User = { id: p.id, name: p.name, email: p.email, role: "professor" };
    setUser(u);
    localStorage.setItem(KEY_USER, JSON.stringify(u));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(KEY_USER);
  };

  return <Ctx.Provider value={{ user, signUpProfessor, signInProfessor, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}
