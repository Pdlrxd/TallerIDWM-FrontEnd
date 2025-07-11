import axios from "axios";
import https from "https";

const isLocalhost = process.env.NEXT_PUBLIC_API_URL?.includes("localhost");

const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  httpsAgent: isLocalhost ? new https.Agent({ rejectUnauthorized: false }) : undefined,
});

// Solo registrar interceptor en cliente (navegador)
if (typeof window !== "undefined") {
  ApiBackend.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  ApiBackend.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        if (status >= 500) {
          alert("Error del servidor. Intente más tarde.");
        }
      }
      return Promise.reject(error);
    }
  );
}

export { ApiBackend };
