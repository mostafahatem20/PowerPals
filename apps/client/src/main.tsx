import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "@fontsource/lato/400.css"
import "@fontsource/lato/700.css"
import "./index.css"
import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import theme from "./utils/theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
