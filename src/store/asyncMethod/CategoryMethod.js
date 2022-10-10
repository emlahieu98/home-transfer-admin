import axios from 'axios'
import { BASE_URL } from '../../config'
import { SET_LOADER, CLOSE_LOADER } from '../types/CommonTypes.js'
import { SET_CATEGORIES } from '../types/CategoryTypes'

export const getAllCategories = (page, page_size) => {
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
                data: { data, currentPage, totalDocs },
            } = await axios.get(
                `${BASE_URL}/post?page=${page}&page_size=${page_size}`,
                config
            )
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: SET_CATEGORIES,
                payload: { currentPage, data, totalDocs },
            })
        } catch (error) {
            console.log('error', error)
            dispatch({ type: CLOSE_LOADER })
        }
    }
}
