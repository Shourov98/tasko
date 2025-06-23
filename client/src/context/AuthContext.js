"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

/* ----------  state & reducer  ---------- */
const initial = { user: null, loading: true, error: null };

function reducer(state, { type, payload }) {
  switch (type) {
    case "BOOT_OK":
    case "LOGIN_OK":
      return { ...state, user: payload, loading: false };
    case "BOOT_FAIL":
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    case "UPDATE_POINTS":
      return { ...state, user: { ...state.user, points: payload } };
    default:
      return state;
  }
}

/* ----------  context + refs  ---------- */
const AuthCtx = createContext(initial);
let externalLogout = () => {};          // filled inside provider

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const router = useRouter();

  /* ----------  boot: try refresh cookie  ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post("/api/auth/refresh");
        dispatch({ type: "BOOT_OK", payload: data });
      } catch {
        dispatch({ type: "BOOT_FAIL" });
      }
    })();
  }, []);

  /* ----------  helpers  ---------- */
  const login = async (body) => {
    const { data } = await api.post("/api/auth/login", body);
    dispatch({ type: "LOGIN_OK", payload: data });
    router.push("/dashboard");
  };

  const signup = async (body) => {
    const { data } = await api.post("/api/auth/signup", body);
    dispatch({ type: "LOGIN_OK", payload: data });
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      dispatch({ type: "LOGOUT" });
      router.push("/login");
    }
  };

  const updatePoints = (pts) => dispatch({ type: "UPDATE_POINTS", payload: pts });

  /* expose logout to non-React code */
  externalLogout = logout;

  return (
    <AuthCtx.Provider value={{ ...state, login, signup, logout, updatePoints }}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ----------  hooks & plain helpers  ---------- */
export const useAuth = () => useContext(AuthCtx);

/* call this from Axios interceptors, worker scripts, etc. */
export const authLogout = () => externalLogout();
