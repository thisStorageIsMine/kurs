import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../store"
import { ReactNode } from "react"

export interface IProtectedProps {
    children: ReactNode
}

const Protected = ({ children }: IProtectedProps) => {
    const navigate = useNavigate()
    const location = useLocation(),
        origin = location.pathname

    const isAuth = useUser(state => state.isAuth)

    if (!isAuth) {
        navigate('/', { state: { origin } })
    }

    return <>{children}</>
}

export { Protected }