import { createBrowserRouter, Outlet } from "react-router-dom";
import { Login, SignUp } from "./components/pages";



const router = createBrowserRouter([
    {
        path: "/:users",
        element: <h1>user <Outlet></Outlet> </h1>,
        children: [
            {
                index: true,
                element: <h2>Индекс</h2>
            },
            {
                path: ':note',
                element: <h2>Заметка</h2>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])


export { router }