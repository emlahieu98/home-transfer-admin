import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/asyncMethod/AuthMethod'
import IconImage from '../Auth/utils/IconImage'
import PandaIcon from '../Auth/utils/PandaIcon'
import { Link } from 'react-router-dom'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'

const Login = (props) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { loading, loginError } = useSelector((state) => state.AuthReducer)
    const dispatch = useDispatch()
    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const loginForm = async (e) => {
        e.preventDefault()
        dispatch(login(state))
    }
    useEffect(() => {
        if (loginError) {
            toast.error(loginError)
        }
    }, [loginError])
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }
    return (
        <>
            <Helmet>
                <title>Đăng nhập</title>
                <meta name="description" content="Đăng nhập cho admin" />
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
                            <form onSubmit={loginForm}>
                                <div className="group">
                                    <div className="text-avatar">
                                        <Link to="/">ADMIN</Link>
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
                                        type="submit"
                                        className="btn btn-default btn-block"
                                        value={loading ? '...' : 'Login'}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="form-auth__about">
                            <div className="group__about d-flex">
                                <div className="group__about__remember">
                                    <Checkbox
                                        style={{
                                            fontSize: '14px',
                                            padding: 0,
                                        }}
                                        onChange={onChange}
                                    >
                                        Ghi nhớ đăng nhập
                                    </Checkbox>
                                </div>
                                <div className="group__about__forget">
                                    <Link
                                        to="/auth/forget-password"
                                        style={{
                                            fontSize: '14px',
                                            padding: 0,
                                        }}
                                    >
                                        Quên mật khẩu
                                    </Link>
                                </div>
                            </div>
                            <div className="divider">
                                <span className="login-text">
                                    Hoặc đăng nhập bằng
                                </span>
                            </div>
                            <div className="group__about d-flex pt-3">
                                <div className="social__facebook">
                                    <Button
                                        style={{ width: '120px' }}
                                        shape="round"
                                        icon={<FacebookOutlined />}
                                        size={'24px'}
                                    >
                                        Facebook
                                    </Button>
                                </div>
                                <div className="social__google">
                                    <Button
                                        style={{ width: '120px' }}
                                        shape="round"
                                        icon={<GoogleOutlined />}
                                        size={'24px'}
                                    >
                                        Google
                                    </Button>
                                </div>
                            </div>
                            <p className="login-text pt-2">
                                Bạn chưa có tài khoản -{' '}
                                <Link to="/admin/login">
                                    thì kệ bạn chứ !!!{' '}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
