import { useCallback, useEffect, useRef } from 'react'

const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title
    }, [])
}
const useDebounce = <T>(fn: (arg: T) => unknown | Promise<unknown>, ms: number) => {
    const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)

    return (arg: T) => {
        clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => {
            fn(arg)
        }, ms)
    }
}

export const useUniqueDebounce = <T>(
    fn: (arg: T) => unknown | Promise<unknown>,
    ms: number
): ((arg: T, id: number | undefined) => void) => {
    const timeouts = useRef(new Map<number | undefined, NodeJS.Timeout>())

    return useCallback(
        (arg: T, id: number | undefined) => {
            //Очищаем предыдущий таймаут для этого id
            clearTimeout(timeouts.current.get(id))

            const timeout = setTimeout(() => {
                fn(arg)
                timeouts.current.delete(id) // Удаляем таймаут после выполнения
            }, ms)

            timeouts.current.set(id, timeout)
        },
        [fn, ms]
    )
}
export { useTitle, useDebounce }
