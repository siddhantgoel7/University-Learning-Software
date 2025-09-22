import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Role = "professor" | "student";
type User = { id: string; name: string; email: string; role: Role };
type AuthCtx = {
  user: User | null;
  signUpProfessor: (email: string, password: string, name: string) => Promise<string | null>;
  signInProfessor: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

function mapUser(u: any | null): User | null {
  if (!u) return null;
  const meta = u.user_metadata || {};
  return {
    id: u.id,
    email: u.email ?? "",
    name: (meta.name as string) || u.email?.split("@")[0] || "Professor",
    role: (meta.role as Role) || "professor",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) setUser(mapUser(data.session?.user ?? null));
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(mapUser(session?.user ?? null));
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signUpProfessor = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: "professor" } },
    });
    if (error) return error.message;

    // For local env, sign-in usually succeeds immediately:
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
    if (signInErr) console.warn("Post-signup sign-in failed:", signInErr.message);
    return null;
  };

  const signInProfessor = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return error.message;
    return null;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return <Ctx.Provider value={{ user, signUpProfessor, signInProfessor, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}
