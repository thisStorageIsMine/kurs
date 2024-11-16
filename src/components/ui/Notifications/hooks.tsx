import { useNotification } from "./Context"

export const useSuccessNotification = () => {
    const createNotification = useNotification()

    return (title: string, text: string) => createNotification({ title, text, type: 'success' })
}

export const useErrorNotification = () => {
    const createNotification = useNotification()

    return (title: string, text: string) => createNotification({ title, text, type: 'error' })
}