import { baseAxios } from "../../utils/axios"
import { EventDetails } from "./eventSlice"

export interface GetEvents {
  page: number
  limit: number
  searchTitle?: string
}
export const getEvent = (id: number) => baseAxios.get(`/events/${id}`)

export const getEvents = ({ page, limit, searchTitle }: GetEvents) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(searchTitle && { searchTitle }),
  })
  return baseAxios.get(`/events?${queryParams.toString()}`)
}

export const deleteEvent = (id: number) => baseAxios.delete(`/events/${id}`)

export const createEvent = (body: FormData | EventDetails, isForm: boolean) =>
  isForm
    ? baseAxios.post(`/events`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.post(`/events`, body)

export const patchEvent = (
  id: number,
  body: FormData | EventDetails,
  isForm: boolean,
) =>
  isForm
    ? baseAxios.post(`/events/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.post(`/events/${id}`, body)

export const registerEvent = (
  id: number,
  body?: { name: string; email: string },
) =>
  body ? baseAxios.post(`/events/${id}`, body) : baseAxios.post(`/events/${id}`)
