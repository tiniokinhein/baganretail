import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PublicRoute({ component: Component , authenticated , ...rest }) {
    return (
        <Route
            {...rest}
            render={
                (props) => authenticated === false ? <Component {...props} /> : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }}
                    />
                )
            }
        />
    )
}

export default PublicRoute
