import { SET_USERS, CREATE_USER_ERROR, SET_USER, USER_REQUEST, USER_RESET, EDIT_USER_ERROR, DELETE_USER_ERROR } from '../types/UserTypes.js'
import { REDIRECT_TRUE, REMOVE_ERROR, REDIRECT_FALSE } from '../types/CommonTypes.js'

const initState = {
    loading: false,
    totalDocs: 0,
    redirect: false,
    currentPage: 0,
    users: [],
    user: {},
    createUserError: '',
    editUserError: '',
    deleteUserError: '',
    userStatus: false
}
export const UserReducer = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_USERS) {
        return { ...state, users: payload.data, totalDocs: payload.totalDocs, currentPage: payload.currentPage }
    } else if (type === SET_USER) {
        return { ...state, user: payload };
    } else if (type === CREATE_USER_ERROR) {
        return { ...state, createUserError: payload }
    } else if (type === EDIT_USER_ERROR) {
        return { ...state, editUserError: payload }
    }
    else if (type === DELETE_USER_ERROR) {
        return { ...state, deleteUserError: payload }
    } else if (type === REMOVE_ERROR) {
        return { ...state, createUserError: '', editUserError: '', deleteUserError: '', }
    }
    else if (type === USER_REQUEST) {
        return { ...state, userStatus: true };
    } else if (type === USER_RESET) {
        return { ...state, userStatus: false };
    }
    else if (type === REDIRECT_TRUE) {
        return { ...state, redirect: true }
    } else if (type === REDIRECT_FALSE) {
        return { ...state, redirect: false }
    } else {
        return state
    }
}
