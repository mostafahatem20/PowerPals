import axios from "axios"
import { store } from "../app/store"

export const baseAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
})

baseAxios.interceptors.request.use(function (config) {
  const token = store.getState()?.auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
