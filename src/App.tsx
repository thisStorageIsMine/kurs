import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationsProvider } from './components/ui/Notifications'

const queryClient = new QueryClient()

function App() {



  return (
    <NotificationsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
        </RouterProvider>
      </QueryClientProvider>
    </NotificationsProvider>

  )
}

export default App
