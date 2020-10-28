import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import { db } from '../../helpers/firebase'
import { Link, withRouter } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

class EditNewAccount extends Component {

    _isMounted = false

    state = {
        selectedOption: '',
    }

    handleOnChange = e => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleOnSubmit = e => {
        e.preventDefault()

        const { id } = this.props.match.params

        const data = {
            status: this.state.selectedOption
        }

        db 
        .ref(`registers/${id}`)
        .update(data, () => {
            this.props.history.push('/new-accounts')
        })
    }

    render() {

        const formList = (
            <form onSubmit={this.handleOnSubmit} className="col-12 col-sm-8 px-0">
                <div className="form-group mb-5">
                    <label
                        htmlFor="status"
                        className="mb-4"
                        style={{
                            color: L_COLOR,
                            fontSize: '0.9rem'
                        }}
                    >
                        အခြေအနေ
                    </label>
                    <div className="d-flex align-items-center">
                        {/* <label 
                            className="form-check-box-label mr-5" 
                            style={{
                                fontSize: '0.8rem',
                                color: L_COLOR
                            }}
                        >
                            တင်ထားဆဲ
                            <input 
                                className="form-check-input" 
                                type="radio"  
                                value='တင်ထားဆဲ'
                                onChange={this.handleOnChange.bind(this)}
                                checked={this.state.selectedOption === 'တင်ထားဆဲ'}
                            />
                            <span className="checkmark" />
                        </label> */}

                        <label 
                            className="form-check-box-label" 
                            style={{
                                fontSize: '0.8rem',
                                color: L_COLOR
                            }}
                        >
                            ဖွင့်ထားပီးပီ
                            <input 
                                className="form-check-input" 
                                type="radio"  
                                value='ဖွင့်ထားပီးပီ'
                                onChange={this.handleOnChange.bind(this)}
                                checked={this.state.selectedOption === 'ဖွင့်ထားပီးပီ'}
                            />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>
                <div className="form-group mb-0">
                    <button
                        className="btn rounded border-0 shadow px-5 py-0 font-weight-normal"
                        style={{
                            fontSize: '0.8rem',
                            color: F_COLOR,
                            background: L_COLOR,
                            lineHeight: 0,
                            height: '45px'
                        }}
                    >
                        သိမ်းမည်
                    </button>
                </div>
            </form>
        )

        return (
            <Layout>
                <h4
                    className="my-4 m-md-0 s-device-header font-weight-normal position-absolute"
                    style={{
                        top: '1.2rem',
                        fontSize: '1rem',
                        color: L_COLOR
                    }}
                >
                    <Link to="/new-accounts" className="text-decoration-none mr-4" style={{color:L_COLOR}}>
                        <MdArrowBack size="1.6rem" />
                    </Link>
                    ပြင်မည်
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR,
                    }}
                >
                    {formList}
                </div>
            </Layout>
        )
    }
}

export default withRouter(EditNewAccount)