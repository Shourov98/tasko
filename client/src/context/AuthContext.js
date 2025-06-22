"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import api from "@/lib/api";

/* ----------   state & reducer   ---------- */
const initialState = {
  user: null,          // { id, fullName, email, points }
  loading: true,       // true until we finish the boot refresh
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "BOOT_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "BOOT_FAIL":
      return { ...state, user: null, loading: false };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_POINTS":
      return { ...state, user: { ...state.user, points: action.payload } };
    default:
      return state;
  }
}

/* ----------   context wrapper   ---------- */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 1) run once on mount: try refresh
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post("/api/auth/refresh");
        dispatch({ type: "BOOT_SUCCESS", payload: data });
      } catch {
        dispatch({ type: "BOOT_FAIL" });
      }
    })();
  }, []);

  /* ---------- auth helper functions ---------- */
  const login = async (values) => {
    const { data } = await api.post("/api/auth/login", values);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };

  const signup = async (values) => {
    const { data } = await api.post("/api/auth/signup", values);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    dispatch({ type: "LOGOUT" });
  };

  const updatePoints = (points) =>
    dispatch({ type: "UPDATE_POINTS", payload: points });

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, updatePoints }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* small helper hook */
export const useAuthContext = () => useContext(AuthContext);
