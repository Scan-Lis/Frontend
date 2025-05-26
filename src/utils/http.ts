import axios from "axios";

// TODO: Cambiar esta implementacion usando el patron de Singleton

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
