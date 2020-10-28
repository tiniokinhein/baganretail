import React, { Component } from 'react'
import { auth } from '../helpers/firebase'
import MoonLoader from 'react-spinners/MoonLoader'

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        error: null,
        loading: false
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async loginSubmit(e) {
        e.preventDefault()

        this.setState({
            error: '',
            loading: true
        })

        try {
            await auth.signInWithEmailAndPassword(this.state.email, this.state.password)

            setTimeout(() => {
                this.setState({
                    loading: false
                })
            }, 2000);
        } catch(error) {
            this.setState({
                error: error.message
            })
        }
    }

    render() {

        const { email , password , error } = this.state

        const cssName = {
            margin: {
              margin: '0 auto'
            }
        }

        return (
            <>
                {
                    this.state.loading && 
                    <div 
                        className="position-fixed"
                        style={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(29,45,80,0.62)',
                            zIndex: 9999
                        }}
                    >
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle text-center">
                                <MoonLoader
                                    css={cssName.margin}
                                    size={20}
                                    color={"#fff"}
                                    loading={this.state.loading}
                                />
                            </div>
                        </div>
                    </div>
                }

                <div className="d-table w-100 h-100">
                    <div className="d-table-cell align-middle" style={{height:'100vh',minHeight:'600px'}}>
                        <div className="col-12 col-sm-5 col-md-3 mx-auto">
                            <form onSubmit={this.loginSubmit.bind(this)} autoComplete="off">
                                <h4 className="text-uppercase mb-5 text-center font-weight-bold">Retail Admin Login</h4>

                                <div className="field-group mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleOnChange.bind(this)}
                                        placeholder="Email"
                                        className="form-control p-4 bg-light text-dark rounded-0 border-0 shadow-none"
                                        required
                                    />
                                </div>
                                <div className="field-group mb-4">
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleOnChange.bind(this)}
                                        placeholder="Password"
                                        className="form-control p-4 bg-light text-dark rounded-0 border-0 shadow-none"
                                        required
                                    />
                                </div>
                                <div className="field-group">
                                    {
                                        error ? <p className="text-danger">{error}</p> : null
                                    }
                                    <button
                                        className="btn text-uppercase border-0 rounded-0 shadow-none bg-primary text-light w-100 p-3"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
