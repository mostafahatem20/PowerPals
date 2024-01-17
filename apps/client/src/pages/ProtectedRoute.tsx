import { Backdrop, CircularProgress } from "@mui/material"
import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { selectAuth } from "../features/auth/authSlice"

const ProtectedRoute = () => {
  const { loading, token, type } = useAppSelector(selectAuth)
  const location = useLocation()

  if (loading)
    return (
      <Backdrop
        sx={{ color: "#24345F", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  if (!token) return <Navigate to="/" replace />
  if (location.pathname === "/users" && type !== "organizer")
    <Navigate to="/" replace />
  if (
    (location.pathname === "/create-community" ||
      location.pathname === "/community") &&
    type !== "community_leader"
  )
    <Navigate to="/" replace />
  return <Outlet />
}

export default ProtectedRoute
