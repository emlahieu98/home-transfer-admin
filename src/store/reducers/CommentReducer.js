import { SET_COMMENTS, CREATE_COMMENT_ERROR, COMMENT_DETAIL, COMMENT_REQUEST, COMMENT_RESET, EDIT_COMMENT_ERROR, DELETE_COMMENT_ERROR } from '../types/CommentTypes.js'
import { REDIRECT_TRUE, REMOVE_ERROR } from '../types/CommonTypes.js'

const initState = {
    loading: false,
    totalDocs: 0,
    redirect: false,
    currentPage: 0,
    comments: [],
    comment: {},
    createCommentError: '',
    editCommentError: '',
    deleteCommentError: '',
    commentStatus: false
}
export const CommentReducer = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_COMMENTS) {
        return { ...state, comments: payload.data, totalDocs: payload.totalDocs, currentPage: payload.currentPage }
    } else if (type === COMMENT_DETAIL) {
        return { ...state, comment: payload };
    } else if (type === CREATE_COMMENT_ERROR) {
        return { ...state, createCommentError: payload }
    } else if (type === EDIT_COMMENT_ERROR) {
        return { ...state, editCommentError: payload }
    }
    else if (type === DELETE_COMMENT_ERROR) {
        return { ...state, deleteCommentError: payload }
    } else if (type === REMOVE_ERROR) {
        return { ...state, createCommentError: '', editCommentError: '', deleteCommentError: '', }
    }
    else if (type === COMMENT_REQUEST) {
        return { ...state, commentStatus: true };
    } else if (type === COMMENT_RESET) {
        return { ...state, commentStatus: false };
    }
    else if (type === REDIRECT_TRUE) {
        return { ...state, redirect: true }
    } else {
        return state
    }
}
