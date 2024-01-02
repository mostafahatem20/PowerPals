import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { createWiki, deleteWiki, getWiki, getWikis } from "./wikiAPI"
import { toast } from "react-toastify"

export interface WikiDetails {
  id?: number
  title?: string
  subHeading?: string
  body?: string
  tag?: string
  image?: string
}

export interface WikiState {
  wikis: WikiDetails[]
  currentWiki: WikiDetails | null
  loading: boolean
  loadingWikis: boolean
}

const initialState: WikiState = {
  wikis: [],
  loading: false,
  loadingWikis: false,
  currentWiki: null,
}

export const getWikisThunk = createAsyncThunk(
  "wiki/getWikis",
  async ({
    callback,
    ...query
  }: {
    page: number
    limit: number
    tag?: string
    callback: (length: number) => void
  }) => {
    try {
      const response = await getWikis(query)
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

export const getWikiThunk = createAsyncThunk(
  "wiki/getWiki",
  async ({
    id,
    callBack,
  }: {
    id: number
    callBack: (wiki: WikiDetails) => void
  }) => {
    try {
      const response = await getWiki(id)
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
export const deleteWikiThunk = createAsyncThunk(
  "wiki/deleteWiki",
  async ({ id }: { id: number }) => {
    try {
      await deleteWiki(id)
      toast.success("Wiki deleted successfully")
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

export const createWikiThunk = createAsyncThunk(
  "wiki/createWiki",
  async ({
    body,
    isForm,
    callback,
  }: {
    body: FormData | WikiDetails
    isForm: boolean
    callback: (id: number) => void
  }) => {
    try {
      const response = await createWiki(body, isForm)
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
export const wikiSlice = createSlice({
  name: "wiki",
  initialState,
  reducers: {
    clearWikis: (state) => {
      state.wikis = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWikisThunk.pending, (state) => {
        state.loadingWikis = true
      })
      .addCase(getWikisThunk.fulfilled, (state, action) => {
        state.loadingWikis = false
        const uniqueWikiIds = new Set(state.wikis.map((wiki) => wiki.id))
        const filteredPayload = action.payload.filter(
          (wiki: WikiDetails) => !uniqueWikiIds.has(wiki.id),
        )
        // Adding unique wikis to the state
        state.wikis.push(...filteredPayload)
      })
      .addCase(getWikisThunk.rejected, (state) => {
        state.loadingWikis = false
      })
    builder
      .addCase(getWikiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getWikiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentWiki = action.payload
      })
      .addCase(getWikiThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(createWikiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createWikiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentWiki = action.payload
      })
      .addCase(createWikiThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(deleteWikiThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteWikiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.wikis = state.wikis.filter(
          (wiki) => wiki.id !== action.payload.id,
        )
      })
      .addCase(deleteWikiThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { clearWikis } = wikiSlice.actions

export const selectWiki = (state: RootState) => state.wiki

export default wikiSlice.reducer
