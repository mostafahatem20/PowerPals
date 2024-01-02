import { baseAxios } from "../../utils/axios"
import { User } from "./userSlice"

export interface GetUsers {
  page: number
  limit: number
  byDistance: boolean
}
export const getUser = (id: number) => baseAxios.get(`/users/${id}`)

export const patchUser = (
  id: number,
  body: FormData | User,
  isForm?: boolean,
) =>
  isForm
    ? baseAxios.patch(`/users/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.patch(`/users/${id}`, body)

export const getAllUsers = ({ page, limit, byDistance }: GetUsers) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    byDistance: String(byDistance),
  })
  return baseAxios.get(`/users?${queryParams.toString()}`)
}
