import { SET_CATEGORIES } from '../types/CategoryTypes'
import { REDIRECT_TRUE, REMOVE_ERROR } from '../types/CommonTypes.js'

const initState = {
    loading: false,
    totalDocs: 0,
    redirect: false,
    currentPage: 0,
    categories: [],
    category: {},
    userStatus: false
}
export const CategoryReducer = (state = initState, action) => {
    const { type, payload } = action
    if (type === SET_CATEGORIES) {
        return { ...state, categories: payload.data, totalDocs: payload.totalDocs, currentPage: payload.currentPage }
    } else {
        return state
    }
}
