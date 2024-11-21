import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login, SignUp } from "./components/pages";



const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: "notes/:userName/:noteName",
        element: <h1>user <Outlet></Outlet> </h1>
    }
])


export { router }