
export interface IUser {
    name: string
    id: number
}

export interface IUseUserState {
    isAuth: boolean;
    user: IUser | null
}


export interface IUseUserActions {
    setAuth: (auth: boolean) => void
    setUser: (name: string, id: number) => void
}