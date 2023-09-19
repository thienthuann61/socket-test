import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api/v1",
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
  const token = localStorage.getItem("socket-test-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  return config;
});
