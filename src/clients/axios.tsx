import axios from 'axios';

console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_URL);

const ApiBackend = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
    }
    
});

export { ApiBackend };
