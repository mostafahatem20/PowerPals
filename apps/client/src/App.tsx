import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Event from "./pages/Event"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Wiki from "./pages/Wiki"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/wiki",
    element: <Wiki />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
