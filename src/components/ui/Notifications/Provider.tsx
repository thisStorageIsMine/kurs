import { ReactNode, useCallback, useState } from "react";
import { NotificationContext } from "./Context";
import { NotificationContainer } from "./NotificationContainer";

export interface INotification {
    title: string;
    text: string;
    type: 'success' | 'error'
}

export const NotificationsProvider = ({ children }: {children: ReactNode}) => {
    const [nots, setNots] = useState<INotification[]>([])

    const addNot = useCallback((ctx: INotification) => {
        setNots(state => [...state, ctx])
    }, [])

    return (
        <NotificationContext.Provider value={addNot}>
            {children}
            <NotificationContainer nots={nots} setNots={setNots} />
        </NotificationContext.Provider>
    )
}