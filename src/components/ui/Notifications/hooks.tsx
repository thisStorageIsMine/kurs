import { useNotification } from './Context'

export const useSuccessNotification = () => {
    const { add: createNotification } = useNotification()

    return (title: string, text: string, id: string) =>
        createNotification({ title, text, type: 'success', id })
}

export const useErrorNotification = () => {
    const { add: createNotification } = useNotification()

    return (title: string, text: string, id: string) =>
        createNotification({ title, text, type: 'error', id })
}

export const useLoadNotification = () => {
    const { add: createNotification } = useNotification()

    return (text: string, id: string) =>
        createNotification({ title: '', text, type: 'load', id })
}

export const useDeleteNotification = () => {
    const { delete: deleteNotification } = useNotification()

    return (id: string) => deleteNotification(id)
}
