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
        path: "/:userName",
        element: <h1>user <Outlet></Outlet> </h1>,
        children: [
            {
                path: '/:noteName',
                element: <h2>Note</h2>
            }
        ]
    }
])

export { router }