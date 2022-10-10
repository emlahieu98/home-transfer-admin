import axios from 'axios'
import { SET_TOKEN, REGISTER_ERROR, LOGIN_ERROR } from '../types/AuthTypes.js'
import { SET_LOADER, CLOSE_LOADER, REMOVE_ERROR } from '../types/CommonTypes.js'
import { BASE_URL } from '../../config'

const token = localStorage.getItem('token')
export const register = (user) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        dispatch({ type: SET_LOADER })
        try {
            const res = await axios.post(
                `${BASE_URL}/auth/register`,
                user,
                config
            )
            dispatch({ type: CLOSE_LOADER })
            if (res.status === 200) {
                window.location.href = `/admin/login`
            }
        } catch (error) {
            dispatch({ type: CLOSE_LOADER })
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.message,
            })
            dispatch({ type: REMOVE_ERROR })
        }
    }
}
export const login = (user) => {
    console.log('🚀 ~ file: AuthMethod.js ~ line 36 ~ login ~ user', user)
    return async (dispatch) => {
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // }
        dispatch({ type: SET_LOADER })
        try {
            // user.type = 'admin'
            // const { data } = await axios.post(
            //     `${BASE_URL}/auth/login`,
            //     user,
            //     config
            // )
            if (
                user.email === 'thanhhuyen155tb@gmail.com' &&
                user.password === '1'
            ) {
                console.log('login successful')
                window.location.href = '/dashboard'
                dispatch({ type: SET_TOKEN, payload: '0x' })
                dispatch({ type: CLOSE_LOADER })
            } else {
                dispatch({ type: CLOSE_LOADER })
                dispatch({
                    type: LOGIN_ERROR,
                    payload: 'Sai tài khoản hoặc mật khẩu',
                })
                console.log('login fail')
                // dispatch({ type: REMOVE_ERROR })
            }
            // localStorage.setItem('admin_token', data.token)
        } catch (error) {
            console.log('error', error.response.data.message)
        }
    }
}

export const changePassword = async (data) => {
    const config = {
        headers: {
            Authorization: `${token}`,
        },
    }
    await axios
        .post(`${BASE_URL}/auth/change-password`, data, config)
        .then((response) => {
            window.location.href = '/profile'
        })
        .catch((error) => {
            throw error.response.data.message
        })
}
