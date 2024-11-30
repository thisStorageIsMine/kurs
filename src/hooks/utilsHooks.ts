import { useEffect, useRef } from 'react'

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

export { useTitle, useDebounce }
