import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component , authenticated , ...rest }) {
    return (
        <Route
            {...rest}
            render={
                (props) => authenticated === true ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute
