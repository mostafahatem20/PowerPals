import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PlaceDetails, User } from "../user/userSlice"
import { toast } from "react-toastify"
import {
  createEvent,
  patchEvent,
  getEvent,
  getEvents,
  deleteEvent,
  registerEvent,
} from "./eventAPI"
import { RootState } from "../../app/store"

export interface EventDetails extends PlaceDetails {
  id?: number
  image?: string
  title?: string
  eventDateTime?: Date
  info?: string
  createdBy?: User
}

export interface EventState {
  events: EventDetails[]
  currentEvent: EventDetails | null
  loading: boolean
  loadingEvents: boolean
}

const initialState: EventState = {
  events: [],
  loading: false,
  loadingEvents: false,
  currentEvent: null,
}

export const getEventsThunk = createAsyncThunk(
  "event/getEvents",
  async ({
    callback,
    clear,
    ...query
  }: {
    page: number
    limit: number
    clear?: boolean
    searchTitle?: string
    callback: (length: number) => void
  }) => {
    try {
      const response = await getEvents(query)
      callback(response.data.length)
      return { clear, events: response.data }
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

export const getEventThunk = createAsyncThunk(
  "event/getEvent",
  async ({ id }: { id: number }) => {
    try {
      const response = await getEvent(id)
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

export const deleteEventThunk = createAsyncThunk(
  "event/deleteEvent",
  async ({ id }: { id: number }) => {
    try {
      await deleteEvent(id)
      toast.success("Event deleted successfully")
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

export const createEventThunk = createAsyncThunk(
  "event/createEvent",
  async ({
    body,
    isForm,
    callback,
  }: {
    body: FormData | EventDetails
    isForm: boolean
    callback: (id: number) => void
  }) => {
    try {
      const response = await createEvent(body, isForm)
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

export const patchEventThunk = createAsyncThunk(
  "event/patchEvent",
  async ({
    id,
    body,
    isForm,
    callback,
  }: {
    id: number
    body: FormData | EventDetails
    isForm: boolean
    callback?: () => void
  }) => {
    try {
      const response = await patchEvent(id, body, isForm)
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

export const registerEventThunk = createAsyncThunk(
  "event/registerEvent",
  async ({
    id,
    body,
    callback,
  }: {
    id: number
    body?: { name: string; email: string }
    callback?: () => void
  }) => {
    try {
      const response = await registerEvent(id, body)
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

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsThunk.pending, (state) => {
        state.loadingEvents = true
      })
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        state.loadingEvents = false
        if (!action.payload.clear) {
          const uniqueEventIds = new Set(state.events.map((event) => event.id))
          const filteredPayload = action.payload.events.filter(
            (event: EventDetails) => !uniqueEventIds.has(event.id),
          )
          // Adding unique events to the state
          state.events.push(...filteredPayload)
        } else {
          state.events = action.payload.events
        }
      })
      .addCase(getEventsThunk.rejected, (state) => {
        state.loadingEvents = false
      })
    builder
      .addCase(getEventThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getEventThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload
      })
      .addCase(getEventThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(createEventThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createEventThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload
      })
      .addCase(createEventThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(patchEventThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(patchEventThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload
      })
      .addCase(patchEventThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(registerEventThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerEventThunk.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(registerEventThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(deleteEventThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        state.loading = false
        state.events = state.events.filter(
          (event) => event.id !== action.payload.id,
        )
      })
      .addCase(deleteEventThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const selectEvent = (state: RootState) => state.event

export default eventSlice.reducer
