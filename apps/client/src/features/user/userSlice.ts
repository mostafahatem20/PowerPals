import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { getAllUsers, getUser, patchUser } from "./userAPI"
import { toast } from "react-toastify"

export interface User {
  id?: number
  name?: string
  type?: "user" | "organizer" | "community_leader"
  email?: string
  password?: string
  profile?: {
    id?: number
    telephoneNumber?: string
    profileImage: string
  } & Profile &
    Address
}
export interface Profile {
  size?: string
  type?: "Privat" | "Gewerblich" | "Gemeinde"
  solar?: boolean
  electricityStorage?: boolean
}
export interface PlaceDetails {
  street?: string
  number?: string
  postalCode?: number
  city?: string
  lat?: number
  lng?: number
}

export interface Address extends PlaceDetails {
  addressName?: string
  meterNumber?: string
  networkProvider?: string
}

export interface UserState {
  users: (User & { profileImage: string })[]
  currentUser: User | null
  loading: boolean
  loadingUsers: boolean
}

const initialState: UserState = {
  users: [],
  loading: false,
  loadingUsers: false,
  currentUser: null,
}

export const getUsersThunk = createAsyncThunk(
  "user/getUsers",
  async ({
    callback,
    ...query
  }: {
    page: number
    limit: number
    byDistance: boolean
    callback: (length: number) => void
  }) => {
    try {
      const response = await getAllUsers(query)
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

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async ({ id }: { id: number }) => {
    try {
      const response = await getUser(id)
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

export const patchUserThunk = createAsyncThunk(
  "user/patchUser",
  async ({
    id,
    body,
    isForm,
    callback,
  }: {
    id: number
    body: any
    isForm: boolean
    callback?: () => void
  }) => {
    try {
      const { data } = await patchUser(id, body, isForm)
      if (callback) callback()
      return data
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

export const patchOtherUserThunk = createAsyncThunk(
  "user/patchOtherUser",
  async ({ id, body, isForm }: { id: number; body: any; isForm: boolean }) => {
    try {
      const { data } = await patchUser(id, body, isForm)
      return data
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.loadingUsers = true
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loadingUsers = false
        const uniqueUserIds = new Set(state.users.map((user) => user.id))
        const filteredPayload = action.payload.filter(
          (user: User) => !uniqueUserIds.has(user.id),
        )
        // Adding unique users to the state
        state.users.push(...filteredPayload)
      })
      .addCase(getUsersThunk.rejected, (state) => {
        state.loadingUsers = false
      })
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(patchUserThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(patchUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(patchUserThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(patchOtherUserThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(patchOtherUserThunk.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        )
        if (index !== -1) {
          // Update the user object with the provided data
          state.users[index] = { ...state.users[index], ...action.payload }
        }
      })
      .addCase(patchOtherUserThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { clearUsers } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
