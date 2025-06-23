import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  withCredentials: true,          // send cookie JWTs
});

// Auto-refresh on 401 (when we add /refresh endpoint later)
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true;
      try {
        await api.post('/api/auth/refresh');   // refresh cookie
        return api(err.config);                // retry original call
      } catch (_) { /* fall through */ }
    }
    return Promise.reject(err);
  }
);

export default api;
