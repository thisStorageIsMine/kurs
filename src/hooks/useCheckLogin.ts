import { useState } from 'react'
import { useQuery } from 'react-query'
import { supabase } from '../supabase'

const useCheckLogin = (login: string, onStart?: () => void, onSettled?: () => void) => {
  const [isLoginExist, setIsLoginExist] = useState(false)

  const { isFetching, isError } = useQuery({
    queryKey: ['getLogin', login],
    queryFn: async () => {
      if (onStart) {
        onStart()
      }

      const { data, error } = await supabase
        .from('users')
        .select('login')
        .eq('login', login)

      if (error || !data) {
        throw new Error('Failed to check login avalability')
      }

      setIsLoginExist(data.length !== 0)
    },
    refetchOnMount: false,
    onSettled: onSettled,
  })

  return { isLoginExist, isFetching, isError }
}

export { useCheckLogin }
