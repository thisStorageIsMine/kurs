const host = 'http://0.0.0.0:8080'

export const API = {
    login: host + '/auth/login',
    signup: host + '/auth/signup',
    refresh: host + '/auth/refresh',
    checkLogin: host + '/auth/is-login-exists',
    getNotes: host + '/note/get',
    deleteNote: host + '/note/delete',
    insertNote: host + '/note/add',
}
