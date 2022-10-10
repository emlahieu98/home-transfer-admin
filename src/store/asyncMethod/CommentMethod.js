import { BASE_URL } from '../../config'
import { SET_COMMENTS, CREATE_COMMENT_ERROR, COMMENT_DETAIL, COMMENT_REQUEST, EDIT_COMMENT_ERROR, DELETE_COMMENT_ERROR } from '../types/CommentTypes.js'
import { SET_LOADER, CLOSE_LOADER, REMOVE_ERROR, REDIRECT_TRUE } from '../types/CommonTypes.js'

import axios from 'axios';

const token = localStorage.getItem('token')
export const getAllComments = (page, page_size) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    "Authorization": `${token}`
                }
            }
            const { data: { data, totalDocs, currentPage } } = await axios.get(`${BASE_URL}/comments?page=${page}&page_size=${page_size}`, config)
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: SET_COMMENTS, payload: { data, currentPage, totalDocs } })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: CLOSE_LOADER })

        }
    }
}
export const createComment = (comment) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    "Authorization": `${token}`
                }
            }
            const res = await axios.post(`${BASE_URL}/comments`, comment, config)
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: CREATE_COMMENT_ERROR, payload: error.response.data.message })
            dispatch({ type: REMOVE_ERROR })
        }
    }
}
export const getCommentDetail = (id) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        dispatch({ type: SET_LOADER });
        try {
            const {
                data:
                { data }
            } = await axios.get(`${BASE_URL}/comments/${id}`, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: COMMENT_DETAIL, payload: data });
            dispatch({ type: COMMENT_REQUEST });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    };
};

export const editComment = (id, Comment) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        dispatch({ type: SET_LOADER })
        try {
            const config = {
                headers: {
                    "Authorization": `${token}`
                }
            }
            const res = await axios.put(`${BASE_URL}/admin/Comments/${id}`, Comment, config)
            dispatch({ type: REDIRECT_TRUE })
            dispatch({ type: REMOVE_ERROR })
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: CLOSE_LOADER })
            dispatch({ type: EDIT_COMMENT_ERROR, payload: error.response.data.message })
        }
    }
}
export const deleteComment = async (id) => {
    try {
        const config = {
            headers: {
                "Authorization": `${token}`
            }
        }
        const res = await axios.delete(`${BASE_URL}/comments/${id}`, config)
        if (res.status === 200) {
            window.location.reload();
        }

    } catch (error) {
        console.log('error', error);
    }
}