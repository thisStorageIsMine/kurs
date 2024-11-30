import { ReactNode, useCallback, useState } from 'react'
import { NotificationContext } from './Context'
import { NotificationContainer } from './NotificationContainer'

export interface INotification {
    id: string
    title: string
    text: string
    type: 'success' | 'error' | 'load'
}

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
    const [nots, setNots] = useState<INotification[]>([])

    const addNot = useCallback((ctx: INotification) => {
        setNots((state) => {
            const nextState = state.some((c) => c.id === ctx.id) ? state : [...state, ctx]

            return nextState
        })
    }, [])
    const deleteNot = useCallback((id: string) => {
        setNots((state) => state.filter((n) => n.id !== id))
    }, [])

    return (
        <NotificationContext.Provider
            value={{
                add: addNot,
                delete: deleteNot,
            }}
        >
            {children}
            <NotificationContainer nots={nots} setNots={setNots} />
        </NotificationContext.Provider>
    )
}
