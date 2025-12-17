import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentAdmin, loginAdmin } from "./blogApi";

const AuthContext = createContext(null);
const STORAGE_KEY = "cwn_admin_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(token));
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, token || "");
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setChecking(false);
      return;
    }
    setChecking(true);
    fetchCurrentAdmin(token)
      .then((res) => {
        const email = res.email || res.data?.email || null;
        setUser(email ? { email } : null);
        setError("");
      })
      .catch(() => {
        setUser(null);
        setToken("");
        setError("Session expired. Please sign in again.");
      })
      .finally(() => setChecking(false));
  }, [token]);

  const login = async (email, password) => {
    setError("");
    const res = await loginAdmin({ email, password });
    const nextToken = res.token || res.data?.token;
    if (!nextToken) {
      throw new Error("No token returned from server");
    }
    setToken(nextToken);
    const me = await fetchCurrentAdmin(nextToken);
    const adminEmail = me.email || me.data?.email || email;
    setUser({ email: adminEmail });
    return { token: nextToken, email: adminEmail };
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setError("");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      checking,
      error,
      login,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user, checking, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
