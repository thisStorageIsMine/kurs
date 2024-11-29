import { createBrowserRouter } from 'react-router-dom'
import { Login, Notes, SignUp } from './components/pages'
import { Note, Protected } from './components'

const router = createBrowserRouter([
  {
    path: '/:user',
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
        path: ':note',
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
])

export { router }
