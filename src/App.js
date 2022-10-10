import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './scss/main.scss'
import { Provider } from 'react-redux'
import PrivateRoute from './private/PrivateRoute'
import RouteLinks from './private/RouteLinks'
import Store from './store'
import Login from './pages/Auth/Login'
import AdminHeader from './components/Shared/AdminHeader'
import AdminSidebar from './components/Shared/AdminSidebar'
import AdminDashboard from './pages/Admin'
import NotFound from './components/NotFound'
import AdminUser from './pages/Admin/User'
import AdminCreateUser from './pages/Admin/User/create'
import AdminEditUser from './pages/Admin/User/edit'
import AdminPost from './pages/Admin/Post'
import AdminCreatePost from './pages/Admin/Post/create'
import AdminEditPost from './pages/Admin/Post/edit'
import AdminComment from './pages/Admin/Comment'
import ChangePassword from './pages/Auth/ChangePassword'
import AdminProfile from './pages/Admin/Profile'

function App() {
    return (
        <Provider store={Store}>
            <Router>
                <Switch>
                    <RouteLinks path="/admin/login" component={Login} />
                    <div className="d-flex">
                        <AdminSidebar />
                        <div className="col-10">
                            <AdminHeader />
                            <PrivateRoute
                                path="/admin/dashboard"
                                exact={true}
                                component={AdminDashboard}
                            />
                            {/* <PrivateRoute path='/admin/users' component={AdminUser} />
              <PrivateRoute path='/admin/create-user' component={AdminCreateUser} />
              <PrivateRoute path='/admin/edit-user/:id' component={AdminEditUser} /> */}
                            <PrivateRoute
                                path="/admin/posts"
                                component={AdminPost}
                            />
                            <PrivateRoute
                                path="/admin/create-post"
                                component={AdminCreatePost}
                            />
                            <PrivateRoute
                                path="/admin/edit-post/:id"
                                component={AdminEditPost}
                            />
                            {/* <PrivateRoute path='/admin/comments' component={AdminComment} />
              <PrivateRoute path='/admin/change-password' component={ChangePassword} />
              <PrivateRoute path='/admin/profile' component={AdminProfile} /> */}
                        </div>
                    </div>

                    {/* <Route path='*' component={NotFound} /> */}
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
