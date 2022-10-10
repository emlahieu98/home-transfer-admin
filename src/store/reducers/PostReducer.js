import { SET_POSTS, CREATE_POST, CREATE_POST_ERROR, SET_MESSAGE, POST_DETAIL, REMOVE_MESSAGE, POST_REQUEST, POST_RESET } from '../types/PostTypes.js'
import { REMOVE_ERROR, SET_LOADER, CLOSE_LOADER, REDIRECT_TRUE, REDIRECT_FALSE } from '../types/CommonTypes.js'
const initState = {
    loading: false,
    totalDocs: 0,
    redirect: false,
    currentPage: 0,
    createPostError: '',
    message: '',
    posts: [],
    post: {},
    postStatus: false
}
export const PostReducer = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_POSTS) {
        return { ...state, posts: payload.data, totalDocs: payload.totalDocs, currentPage: payload.currentPage }
    }
    else if (type === SET_LOADER) {
        return { ...state, loading: true }
    } else if (type === CLOSE_LOADER) {
        return { ...state, loading: true }
    }
    else if (type === CREATE_POST_ERROR) {
        return { ...state, createPostError: payload }
    } else if (type === CREATE_POST) {
        return { ...state, loading: true }
    } else if (type === REDIRECT_TRUE) {
        return { ...state, redirect: true }
    } else if (type === REDIRECT_FALSE) {
        return { ...state, redirect: false }
    }
    else if (type === SET_MESSAGE) {
        return { ...state, message: payload }
    }
    else if (type === REMOVE_MESSAGE) {
        return { ...state, message: '' }
    } else if (type === REMOVE_ERROR) {
        return { ...state, createPostError: '' }
    } if (type === POST_DETAIL) {
        return { ...state, post: payload }
    }
    else if (type === POST_REQUEST) {
        return { ...state, postStatus: true };
    } else if (type === POST_RESET) {
        return { ...state, postStatus: false };
    } else {
        return state
    }

}
