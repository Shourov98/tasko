import axios from "axios";
import { authLogout } from "@/context/AuthContext";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const cfg = err.config;
    const isRefresh = cfg?.url?.includes("/auth/refresh");

    if (cfg?._retry || isRefresh) {
      authLogout();                 // ← one call, no import cycles
      return Promise.reject(err);
    }

    if (err.response?.status === 401) {
      try {
        cfg._retry = true;
        await api.post("/api/auth/refresh");
        return api(cfg);            // retry original
      } catch (e) {
        authLogout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
