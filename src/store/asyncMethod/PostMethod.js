import axios from 'axios'
import {
    CREATE_POST_ERROR,
    SET_POSTS,
    POST_DETAIL,
    POST_REQUEST,
    EDIT_POST_ERROR,
} from '../types/PostTypes.js'
import {
    SET_LOADER,
    CLOSE_LOADER,
    REMOVE_ERROR,
    REDIRECT_TRUE,
} from '../types/CommonTypes.js'
import { BASE_URL } from '../../config/index'
import { useHistory } from 'react-router-dom'

const token = localStorage.getItem('token')

export const getAllPosts = (page, page_size) => {
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
                data: { data, totalDocs, currentPage },
            } = await axios.get(
                `${BASE_URL}/posts?page=${page}&page_size=${page_size}`,
                config
            )
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: SET_POSTS,
                payload: { data, currentPage, totalDocs },
            })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
        }
    }
}

export const createPost = (post) => {
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
            const res = await axios.post(`${BASE_URL}/posts`, post, config)
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: CREATE_POST_ERROR,
                payload: error.response.data.message,
            })
            dispatch({ type: REMOVE_ERROR })
        }
    }
}
export const getPostDetail = (id) => {
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
            } = await axios.get(`${BASE_URL}/posts/${id}`, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: POST_DETAIL, payload: data })
            dispatch({ type: POST_REQUEST })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            console.log(error.message)
        }
    }
}

export const editPost = (id, post) => {
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
            const res = await axios.put(`${BASE_URL}/posts/${id}`, post, config)
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: EDIT_POST_ERROR,
                payload: error.response.data.message,
            })
        }
    }
}
export const deletePost = async (id) => {
    try {
        const config = {
            headers: {
                Authorization: `${token}`,
            },
        }
        const res = await axios.delete(`${BASE_URL}/posts/${id}`, config)
        if (res.status === 200) {
            window.location.reload()
        }
    } catch (error) {
        console.log('error', error)
    }
}
