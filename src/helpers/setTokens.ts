export const setTokens = (tokens: {accessToken: string, refreshToken: string}) => {
    const {accessToken, refreshToken} = tokens
    

    document.cookie = `Authorization=${accessToken}; HttpOnly;`
    document.cookie = `refreshToken=${refreshToken}; HttpOnly; Path=/auth`
}

export const decodeToken = (token:string) => {
    const base = token.split

}