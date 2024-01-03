import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/user/userSlice"
import wikiReducer from "../features/wiki/wikiSlice"
import newsStickerReducer from "../features/newsSticker/newsStickerSlice"
import eventReducer from "../features/event/eventSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    wiki: wikiReducer,
    newsSticker: newsStickerReducer,
    event: eventReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
