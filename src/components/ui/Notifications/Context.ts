import { createContext, useContext } from "react";
import { INotification } from "./Provider";

export type TNotificationContext = (ctx: INotification) => void


export const NotificationContext = createContext<TNotificationContext>(() => { })
export const useNotification = () => useContext(NotificationContext);
