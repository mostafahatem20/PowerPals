import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {
  createNewsSticker,
  deleteNewsSticker,
  getNewsSticker,
  getNewsStickers,
  patchNewsSticker,
} from "./newsStickerAPI"
import { toast } from "react-toastify"

export interface NewsStickerDetails {
  id?: number
  title?: string
  subHeading?: string
  body?: string
  image?: string
}

export interface NewsStickerState {
  newsStickers: NewsStickerDetails[]
  currentNewsSticker: NewsStickerDetails | null
  loading: boolean
  loadingNewsStickers: boolean
}

const initialState: NewsStickerState = {
  newsStickers: [],
  loading: false,
  loadingNewsStickers: false,
  currentNewsSticker: null,
}

export const getNewsStickersThunk = createAsyncThunk(
  "newsSticker/getNewsStickers",
  async ({
    callback,
    ...query
  }: {
    page: number
    limit: number
    callback: (length: number) => void
  }) => {
    try {
      const response = await getNewsStickers(query)
      callback(response.data.length)
      return response.data
    } catch (error: any) {
      const message = error.response.data.message
      if (Array.isArray(message)) {
        message.forEach((one) => toast.error(one))
      } else {
        toast.error(message)
      }
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const getNewsStickerThunk = createAsyncThunk(
  "newsSticker/getNewsSticker",
  async ({
    id,
    callBack,
  }: {
    id: number
    callBack: (newsSticker: NewsStickerDetails) => void
  }) => {
    try {
      const response = await getNewsSticker(id)
      callBack(response.data)
      return response.data
    } catch (error: any) {
      const message = error.response.data.message
      if (Array.isArray(message)) {
        message.forEach((one) => toast.error(one))
      } else {
        toast.error(message)
      }
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const deleteNewsStickerThunk = createAsyncThunk(
  "newsSticker/deleteNewsSticker",
  async ({ id }: { id: number }) => {
    try {
      await deleteNewsSticker(id)
      toast.success("NewsSticker deleted successfully")
      return { id }
    } catch (error: any) {
      const message = error.response.data.message
      if (Array.isArray(message)) {
        message.forEach((one) => toast.error(one))
      } else {
        toast.error(message)
      }
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const createNewsStickerThunk = createAsyncThunk(
  "newsSticker/createNewsSticker",
  async ({
    body,
    isForm,
    callback,
  }: {
    body: FormData | NewsStickerDetails
    isForm: boolean
    callback: (id: number) => void
  }) => {
    try {
      const response = await createNewsSticker(body, isForm)
      callback(response.data.id)
      return response.data
    } catch (error: any) {
      const message = error.response.data.message
      if (Array.isArray(message)) {
        message.forEach((one) => toast.error(one))
      } else {
        toast.error(message)
      }
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const patchNewsStickerThunk = createAsyncThunk(
  "newsSticker/patchNewsSticker",
  async ({
    id,
    body,
    isForm,
    callback,
  }: {
    id: number
    body: FormData | NewsStickerDetails
    isForm: boolean
    callback?: () => void
  }) => {
    try {
      const response = await patchNewsSticker(id, body, isForm)
      if (callback) callback()
      return response.data
    } catch (error: any) {
      const message = error.response.data.message
      if (Array.isArray(message)) {
        message.forEach((one) => toast.error(one))
      } else {
        toast.error(message)
      }
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const newsStickerSlice = createSlice({
  name: "newsSticker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsStickersThunk.pending, (state) => {
        state.loadingNewsStickers = true
      })
      .addCase(getNewsStickersThunk.fulfilled, (state, action) => {
        state.loadingNewsStickers = false
        const uniqueNewsStickersIds = new Set(
          state.newsStickers.map((newsSticker) => newsSticker.id),
        )
        const filteredPayload = action.payload.filter(
          (newsSticker: NewsStickerDetails) =>
            !uniqueNewsStickersIds.has(newsSticker.id),
        )
        // Adding unique newsStickers to the state
        state.newsStickers.push(...filteredPayload)
      })
      .addCase(getNewsStickersThunk.rejected, (state) => {
        state.loadingNewsStickers = false
      })
    builder
      .addCase(getNewsStickerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getNewsStickerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentNewsSticker = action.payload
      })
      .addCase(getNewsStickerThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(createNewsStickerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewsStickerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentNewsSticker = action.payload
      })
      .addCase(createNewsStickerThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(patchNewsStickerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(patchNewsStickerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentNewsSticker = action.payload
      })
      .addCase(patchNewsStickerThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(deleteNewsStickerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNewsStickerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.newsStickers = state.newsStickers.filter(
          (newsSticker) => newsSticker.id !== action.payload.id,
        )
      })
      .addCase(deleteNewsStickerThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const selectNewsSticker = (state: RootState) => state.newsSticker

export default newsStickerSlice.reducer
