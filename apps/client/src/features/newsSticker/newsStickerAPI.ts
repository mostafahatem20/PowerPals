import { baseAxios } from "../../utils/axios"
import { NewsStickerDetails } from "./newsStickerSlice"

export interface GetNewsStickers {
  page: number
  limit: number
  searchTitle?: string
}
export const getNewsSticker = (id: number) =>
  baseAxios.get(`/news-stickers/${id}`)

export const getNewsStickers = ({
  page,
  limit,
  searchTitle,
}: GetNewsStickers) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(searchTitle && { searchTitle }),
  })
  return baseAxios.get(`/news-stickers?${queryParams.toString()}`)
}

export const deleteNewsSticker = (id: number) =>
  baseAxios.delete(`/news-stickers/${id}`)

export const createNewsSticker = (
  body: FormData | NewsStickerDetails,
  isForm: boolean,
) =>
  isForm
    ? baseAxios.post(`/news-stickers`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.post(`/news-stickers`, body)

export const patchNewsSticker = (
  id: number,
  body: FormData | NewsStickerDetails,
  isForm: boolean,
) =>
  isForm
    ? baseAxios.post(`/news-stickers/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.post(`/news-stickers/${id}`, body)
