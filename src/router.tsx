import { createBrowserRouter } from 'react-router-dom'
import { Login, Notes, SignUp } from './components/pages'
import { Note, Protected, notesLoader } from './components'
import { JWTWrapper } from './components/JWTWrapper'
import { Empty } from './components/pages/Empty'

const router = createBrowserRouter([
    {
        path: '/',
        element: <JWTWrapper />,
        children: [
            {
                path: '/:userId',
                element: (
                    <Protected>
                        <Notes />
                    </Protected>
                ),
                loader: notesLoader,
                children: [
                    {
                        index: true,
                        element: <Empty />,
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
        ],
    },
])

export { router }
