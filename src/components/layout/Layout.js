import React, { Component } from 'react'
import { F_COLOR, T_COLOR } from '../Color'
import SideBar from './SideBar'
import TopBar from './TopBar'

class Layout extends Component {
    render() {
        return (
            <div 
                style={{
                    background: F_COLOR
                }}
            >
                <div className="container-fluid">
                    <div className="row">
                        <div 
                            className="d-none d-md-block col-md-4 col-lg-3 shadow"
                            style={{
                                background: T_COLOR,
                                minHeight: '100vh'
                            }}
                        >
                            <SideBar />
                        </div>
                        <div className="col-12 col-md-8 col-lg-9 pl-3 mt-5 mt-md-0 pt-4 pt-md-0">
                            <TopBar />
                            <div className="px-md-3 s-device">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout