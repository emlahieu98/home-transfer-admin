import { BASE_URL } from '../../config/index'
import {
    SET_USERS,
    CREATE_USER_ERROR,
    SET_USER,
    USER_REQUEST,
    EDIT_USER_ERROR,
    DELETE_USER_ERROR,
} from '../types/UserTypes.js'
import {
    SET_LOADER,
    CLOSE_LOADER,
    REMOVE_ERROR,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
} from '../types/CommonTypes.js'

import axios from 'axios'

const token = localStorage.getItem('token')
export const getAllUsers = (page, page_size) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState()
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `${token}`,
                },
            }
            const {
                data: { data, totalDocs, currentPage },
            } = await axios.get(
                `${BASE_URL}/admin/users?page=${page}&page_size=${page_size}`,
                config
            )
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: SET_USERS,
                payload: { data, currentPage, totalDocs },
            })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
        }
    }
}
export const createUser = (user) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState()
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `${token}`,
                },
            }
            const res = await axios.post(
                `${BASE_URL}/admin/users`,
                user,
                config
            )
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error.response.data.message,
            })
            dispatch({ type: REMOVE_ERROR })
        }
    }
}
export const getUserDetail = (id) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState()
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        }
        dispatch({ type: SET_LOADER })
        try {
            const {
                data: { data },
            } = await axios.get(`${BASE_URL}/admin/users/${id}`, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_USER, payload: data })
            dispatch({ type: USER_REQUEST })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            console.log(error.message)
        }
    }
}

export const editUser = (id, user) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState()
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    Authorization: `${token}`,
                },
            }
            const res = await axios.put(
                `${BASE_URL}/admin/users/${id}`,
                user,
                config
            )
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: EDIT_USER_ERROR,
                payload: error.response.data.message,
            })
        }
    }
}
export const deleteUser = async (id) => {
    try {
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        }
        const res = await axios.delete(`${BASE_URL}/admin/users/${id}`, config)
        if (res.status === 200) {
            window.location.reload()
        }
    } catch (error) {
        console.log('error', error)
    }
}
