// src/lib/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',                 // ← ajusta si usas otra base
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ↓ helper de tipado: api.get<T>(url) devuelve AxiosResponse<T>
export type ApiResponse<T> = Promise<T>;
