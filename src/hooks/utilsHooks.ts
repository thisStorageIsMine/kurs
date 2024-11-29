import { useEffect, useRef } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [])
}
const useDebounce = (fn: (...args: unknown[]) => void, ms: number) => {
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined)

  return (...args: unknown[]) => {
    clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export { useTitle, useDebounce }
