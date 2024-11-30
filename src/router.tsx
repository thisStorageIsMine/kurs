import { createBrowserRouter } from 'react-router-dom'
import { Login, Notes, SignUp } from './components/pages'
import { Loader, Note, Protected } from './components'

const router = createBrowserRouter([
    {
        path: '/:userId',
        element: (
            <Protected>
                <Notes />
            </Protected>
        ),
        children: [
            {
                index: true,
                element: <h2>Индекс</h2>,
            },
            {
                path: ':noteId',
                element: <Note />,
            },
        ],
    },
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/loader',
        element: <Loader />,
    },
])

export { router }
