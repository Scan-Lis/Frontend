import axios from "axios";
import { getSession } from "next-auth/react";

// TODO: Cambiar esta implementacion usando el patron de Singleton

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }
  return config;
});
