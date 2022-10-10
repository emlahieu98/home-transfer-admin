import { Menu, Popover, Badge, Avatar } from 'antd'
import {
    ProfileOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../store/types/AuthTypes.js'
import { useHistory, Link } from 'react-router-dom'

const AdminHeader = () => {
    const history = useHistory()

    const handleMenuClick = (e) => {
        if (e.key === 'profile') {
            history.push('/profile')
            // window.location.href = '/profile'
        }
    }
    const handleChangePassword = (e) => {
        if (e.key === 'change-password') {
            history.push('/change-password')
            // window.location.href = '/change-password'
        }
    }

    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('token')
        dispatch({ type: LOGOUT })
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile" icon={<ProfileOutlined />}>
                My profile
            </Menu.Item>
            <Menu.Item
                key="change-password"
                icon={<EditOutlined />}
                onClick={handleChangePassword}
            >
                Change password
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )
    const { user } = useSelector((state) => state.AuthReducer)
    return (
        <>
            <div className="admin__header d-flex">
                <div className="admin__header__avatar">
                    {user && (
                        <Badge style={{}} count={0}>
                            <Popover content={menu} trigger="hover">
                                <Avatar
                                    overlay={menu}
                                    style={{}}
                                    src={user.avatar}
                                />
                            </Popover>
                        </Badge>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminHeader
