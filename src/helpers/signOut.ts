export const signOut = () => {
    sessionStorage.removeItem('refreshToken')
    sessionStorage.removeItem('Authorization')
}
