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

// Interceptor para agregar el token de autenticación en cada petición
ApiBackend.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers && typeof config.headers.set === 'function') {
      config.headers.set('Authorization', `Bearer ${token}`);
    } else if (config.headers) {
      // fallback si headers no es AxiosHeaders
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export { ApiBackend };
