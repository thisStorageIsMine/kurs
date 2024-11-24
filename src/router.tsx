import { createBrowserRouter, } from "react-router-dom";
import { Login, Notes, SignUp } from "./components/pages";
import { Note } from "./components";
import { md } from "./helpers";

const text = `
# Title

---

* Tag  
* Bobr  

`

const router = createBrowserRouter([
    {
        path: "/:users",
        element: <Notes />,
        children: [
            {
                index: true,
                element: <h2>Индекс</h2>
            },
            {
                path: ':note',
                element: <Note name="Как создавать заметки" payload={text} md={md} />
            }
        ]
    },
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />
    }
])


export { router }