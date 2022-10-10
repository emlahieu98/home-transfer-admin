import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = (props) => {
    const { user } = useSelector((state) => state.AuthReducer)
    return (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    )
    // : (
    //     <Redirect to="/admin/login" />
    // )
}

export default PrivateRoute
