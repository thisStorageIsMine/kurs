import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { NotificationsProvider } from './components/ui/Notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

function App() {
    return (
        <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </NotificationsProvider>
    )
}

export default App
