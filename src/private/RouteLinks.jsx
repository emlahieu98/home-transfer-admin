import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
const RouteLinks = (props) => {
    const { user } = useSelector((state) => state.AuthReducer)
    return user.role === 'admin' ? (
        <Redirect to="/admin/dashboard" />
    ) : (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    )
}

export default RouteLinks
