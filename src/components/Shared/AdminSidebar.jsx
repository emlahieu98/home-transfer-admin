import { Link } from 'react-router-dom'
import { IoLogoSnapchat } from 'react-icons/io'
import { TiWeatherNight } from 'react-icons/ti'
import { FiUsers } from 'react-icons/fi'
import { RiFeedbackLine } from 'react-icons/ri'
import { BiNote, BiLogInCircle } from 'react-icons/bi'
import { CgMail } from 'react-icons/cg'
import { HiLogout } from 'react-icons/hi'
import {
    AiOutlineDashboard,
    AiOutlineComment,
    AiOutlineSetting,
} from 'react-icons/ai'
import { FcDocument } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../store/types/AuthTypes.js'
const AdminSidebar = () => {
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('token')
        dispatch({ type: LOGOUT })
    }
    return (
        <>
            <div className="sidebar col-2">
                <h2 className="sidebar__logo">
                    <span
                        style={{
                            margin: '5px',
                            backgroundColor: '#fae814',
                            borderRadius: '5px',
                            height: '3rem',
                        }}
                    >
                        ADMIN{' '}
                    </span>
                    <span
                        style={{
                            margin: '10px',
                            backgroundColor: '#39c449',
                            borderRadius: '5px',
                            height: '3rem',
                        }}
                    >
                        FUNNY{' '}
                    </span>
                </h2>
                <div className="sidebar__manager">
                    <div className="sidebar__title">
                        <h3>SITE MANAGER</h3>
                    </div>
                    <div className="sidebar__item">
                        <li class="sidebar__item__link">
                            <Link to="/admin/dashboard">
                                <AiOutlineDashboard />
                                <span class="hide-menu">Dashboard</span>
                            </Link>
                        </li>

                        {/* <li class="sidebar__item__link">
                            <Link to="/admin/users">
                                <FiUsers />
                                <span class="hide-menu">Users</span>
                            </Link>
                        </li> */}
                        <li class="sidebar__item__link">
                            <Link to="/admin/posts">
                                <BiNote />
                                <span class="hide-menu">Posts</span>
                            </Link>
                        </li>
                        {/* <li class="sidebar__item__link">
                            <Link to="/admin/comments">
                                <AiOutlineComment />
                                <span class="hide-menu">Comments</span>
                            </Link>
                        </li>
                        <li class="sidebar__item__link">
                            <Link to="/admin/feedback">
                                <RiFeedbackLine />
                                <span class="hide-menu">Feedback</span>
                            </Link>
                        </li> */}
                    </div>
                </div>
                <div className="sidebar__manager">
                    <div className="sidebar__title">
                        <h3>SITE SETTING</h3>
                    </div>
                    <div className="sidebar__item">
                        <li class="sidebar__item__link">
                            <Link>
                                <FcDocument />
                                <span class="hide-menu">Document</span>
                            </Link>
                        </li>
                        <li class="sidebar__item__link">
                            <Link onClick={logout}>
                                <RiFeedbackLine />
                                <span class="hide-menu">Logout</span>
                            </Link>
                        </li>
                    </div>
                </div>
                {/* <div class="sidebar__footer">
                    <div class="sidebar__footer__icon">

                        <a href="" class="link" data-toggle="tooltip" title="Settings"><AiOutlineSetting /></a>
                    </div><div class="sidebar__footer__icon">

                        <a href="" class="link" data-toggle="tooltip" title="Email"><CgMail /></a>

                    </div><div class="sidebar__footer__icon">

                        <a href='javascript:;' onclick='logout()' class="link" data-toggle="tooltip" title="Settings"><HiLogout /></a>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AdminSidebar
