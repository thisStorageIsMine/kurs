import { useCallback } from 'react'
import { useNotification } from './Context'

export const useSuccessNotification = () => {
    const { add: createNotification } = useNotification()

    return useCallback(
        (title: string, text: string, id: string) =>
            createNotification({ title, text, type: 'success', id }),
        [createNotification]
    )
}

export const useErrorNotification = () => {
    const { add: createNotification } = useNotification()

    return useCallback(
        (title: string, text: string, id: string) =>
            createNotification({ title, text, type: 'error', id }),
        [createNotification]
    )
}

export const useLoadNotification = () => {
    const { add: createNotification } = useNotification()

    return useCallback(
        (text: string, id: string) =>
            createNotification({ title: '', text, type: 'load', id }),
        [createNotification]
    )
}

export const useDeleteNotification = () => {
    const { delete: deleteNotification } = useNotification()

    return useCallback((id: string) => deleteNotification(id), [deleteNotification])
}
