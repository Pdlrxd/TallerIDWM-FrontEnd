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

export { ApiBackend };
