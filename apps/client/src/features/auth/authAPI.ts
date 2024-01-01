import { baseAxios } from "../../utils/axios"

export interface Register {
  name: string
  email: string
  password: string
  type: "user" | "organizer"
}
export const login = (email: string, password: string) =>
  baseAxios.post("/auth/login", { email, password })

export const register = (body: Register) => baseAxios.post("/users", body)
