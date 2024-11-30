import { createContext, useContext } from 'react'
import { INotification } from './Provider'

export type TNotificationContext = {
    add: (ctx: INotification) => void
    delete: (id: string) => void
}

export const NotificationContext = createContext<TNotificationContext>({
    add: () => {},
    delete: () => {},
})
export const useNotification = () => useContext(NotificationContext)
