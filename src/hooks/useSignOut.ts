import { signOut } from '../helpers/signOut'
import { useUser } from '../store'

export const useSingOut = () => {
    const setIsAuth = useUser((state) => state.setAuth)

    return () => {
        signOut()
        setIsAuth(false)
    }
}
