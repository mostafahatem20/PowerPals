import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Event from "./pages/Event"
import EventDetails from "./pages/EventDetails"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Wiki from "./pages/Wiki"
import WikiDetails from "./pages/WikiDetails"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./pages/ProtectedRoute"
import CreateWiki from "./pages/CreateWiki"

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-wiki",
        element: <CreateWiki />,
      },
      {
        path: "/create-news-sticker",
        element: <CreateWiki />,
      },
    ],
  },
  {
    path: "/wiki",
    element: <Wiki />,
  },

  {
    path: "/wiki/news/:id",
    element: <WikiDetails />,
  },
  {
    path: "/wiki/article/:id",
    element: <WikiDetails />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/event/:id",
    element: <EventDetails />,
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
