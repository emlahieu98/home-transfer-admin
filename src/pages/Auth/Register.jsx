import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/asyncMethod/AuthMethod'
import IconImage from '../Auth/utils/IconImage'
import PandaIcon from '../Auth/utils/PandaIcon'
import { Link } from 'react-router-dom'

const Register = (props) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    })
    const { loading, registerError } = useSelector((state) => state.AuthReducer)

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const registerForm = async (e) => {
        if (state.password !== state.confirm_password) {
            toast.error('Xác nhận 2 mật khẩu không khớp nhau')
        }
        e.preventDefault()
        dispatch(register(state))
    }
    useEffect(() => {
        if (registerError) {
            toast.error(registerError)
        }
    }, [registerError])
    return (
        <>
            <Helmet>
                <title>Đăng kí</title>
                <meta name="description" content="Đăng kí" />
            </Helmet>
            <div className="bg">
                <div className="container pt-15">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            duration: 1000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                                fontSize: 13,
                            },
                        }}
                    />
                    <div className="form-auth col-4">
                        <div className="form-auth__section">
                            <form onSubmit={registerForm}>
                                <div className="group">
                                    <div className="text-avatar">
                                        <Link to="/">FUNNY CODE</Link>
                                        <PandaIcon
                                            style={{
                                                fontSize: '25px',
                                                marginLeft: '8px',
                                            }}
                                        />
                                    </div>
                                    <IconImage />
                                </div>
                                <div className="group">
                                    <input
                                        type="text"
                                        className="group__control"
                                        name="name"
                                        placeholder="Nhập họ tên ..."
                                        value={state.name}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="text"
                                        className="group__control"
                                        name="email"
                                        placeholder="Nhập email ..."
                                        value={state.email}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="password"
                                        className="group__control"
                                        name="password"
                                        placeholder="Nhập mật khẩu ..."
                                        value={state.password}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="password"
                                        className="group__control"
                                        name="confirm_password"
                                        placeholder="Xác nhận mật khẩu ..."
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="submit"
                                        className="btn btn-default btn-block"
                                        value={loading ? '...' : 'Đăng kí'}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="form-auth__about">
                            <p className="login-text pt-2">
                                Bạn đã có tài khoản -{' '}
                                <a href="/auth/login">Đăng nhập ngay</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
