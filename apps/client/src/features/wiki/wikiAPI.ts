import { baseAxios } from "../../utils/axios"
import { WikiDetails } from "./wikiSlice"

export interface GetWikis {
  page: number
  limit: number
  tag?: string
}
export const getWiki = (id: number) => baseAxios.get(`/wikis/${id}`)

export const getWikis = ({ page, limit, tag }: GetWikis) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(tag && { tag }),
  })
  return baseAxios.get(`/wikis?${queryParams.toString()}`)
}

export const deleteWiki = (id: number) => baseAxios.delete(`/wikis/${id}`)

export const createWiki = (body: FormData | WikiDetails, isForm: boolean) =>
  isForm
    ? baseAxios.post(`/wikis`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.post(`/wikis`, body)

export const patchWiki = (
  id: number,
  body: FormData | WikiDetails,
  isForm: boolean,
) =>
  isForm
    ? baseAxios.patch(`/wikis/${id}`, body, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      })
    : baseAxios.patch(`/wikis/${id}`, body)
