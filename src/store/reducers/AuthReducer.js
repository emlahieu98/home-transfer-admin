import jwt_decode from 'jwt-decode'
import {
    SET_TOKEN,
    REGISTER_ERROR,
    LOGIN_ERROR,
    LOGOUT,
} from '../types/AuthTypes.js'
import { SET_LOADER, CLOSE_LOADER, REMOVE_ERROR } from '../types/CommonTypes.js'
const initState = {
    loading: false,
    registerError: '',
    loginError: '',
    token: '',
    user: '',
}
const verifyToken = (token) => {
    const decodeToken = jwt_decode(token)
    const expiresIn = new Date(decodeToken.exp * 1000)
    if (new Date() > expiresIn) {
        localStorage.removeItem('admin_token')
        return null
    } else {
        return decodeToken
    }
}
const token = localStorage.getItem('admin_token')
if (token) {
    const decoded = verifyToken(token)
    initState.token = token
    const { user } = decoded
    initState.user = user
}
const AuthReducer = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_LOADER) {
        return { ...state, loading: true }
    } else if (type === CLOSE_LOADER) {
        return { ...state, loading: false }
    } else if (type === REGISTER_ERROR) {
        return { ...state, registerError: payload }
    } else if (type === LOGIN_ERROR) {
        return { ...state, loginError: payload }
    } else if (type === SET_TOKEN) {
        const user = {
            email: 'admin',
        }
        return { ...state, token: payload, user: user }
    } else if (type === REMOVE_ERROR) {
        return { ...state, registerError: '', loginError: '' }
    } else if (type === LOGOUT) {
        return { ...state, token: '', user: '' }
    } else {
        return state
    }
}
export default AuthReducer
