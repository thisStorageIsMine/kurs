import { useNavigate } from 'react-router-dom'
import { useUser } from '../store'

export const useAuthRedirect = (redirectToLogin: boolean = false) => {
  const user = useUser((state) => state.user?.name)
  const navigate = useNavigate()

  if (user === undefined) {
    if (!redirectToLogin) return

    navigate('/')
  }

  navigate(`/${user}/welcome`)
}
