import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { login, Register, register } from "./authAPI"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"

export interface AuthState {
  token: string | null
  loading: boolean
  id?: number
  name?: string
  email?: string
  type?: string
}

const initialState: AuthState = {
  token: null,
  loading: false,
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({
    email,
    password,
    callback,
  }: {
    email: string
    password: string
    callback: () => void
  }) => {
    try {
      const response = await login(email, password)
      callback()
      return response.data
    } catch (error) {
      toast.error("Invalid credentials")
      throw error // Rethrow the error for handling in the rejected case
    }
  },
)

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ callback, ...body }: Register & { callback: () => void }) => {
    try {
      const response = await register(body)
      callback()
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = null
      delete state.id
      delete state.email
      delete state.type
      delete state.name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.access_token
        // @ts-ignore
        const { id, email, type, name } = jwtDecode(action.payload.access_token)
        state.id = id
        state.email = email
        state.type = type
        state.name = name
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false
      })
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
