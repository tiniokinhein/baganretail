import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import { db } from '../../helpers/firebase'
import { Link, withRouter } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

class EditUnit extends Component {

    _isMounted = false

    state = {
        title: '',
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = e => {
        e.preventDefault()

        const { id } = this.props.match.params

        const data = {
            title: this.state.title
        }

        db 
        .ref(`units/${id}`)
        .update(data, () => {
            this.props.history.push('/units')
        })
    }

    getCategory = () => {
        this._isMounted = true

        const { id } = this.props.match.params

        db
        .ref(`units/${id}`)
        .on('value' , (snap) => {
            const data = snap.val()

            if(this._isMounted) {
                this.setState({
                    title: data.title
                })
            }
        })
    }

    componentDidMount() {
        this.getCategory()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {

        const { title } = this.state

        const formList = (
            <form onSubmit={this.handleOnSubmit} className="col-12 col-md-6 px-0">
                <div className="form-group mb-4">
                    <label
                        htmlFor="title"
                        className="mb-3"
                        style={{
                            color: L_COLOR,
                            fontSize: '0.9rem'
                        }}
                    >
                        ခေါင်းစဥ်
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={this.handleOnChange.bind(this)}
                        className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                        style={{
                            color: L_COLOR,
                            height: '50px',
                            fontSize: '0.8rem'
                        }}
                    />
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
                        top: '1.5rem',
                        fontSize: '1rem',
                        color: L_COLOR
                    }}
                >
                    <Link to="/units" className="text-decoration-none mr-4" style={{color:L_COLOR}}>
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

export default withRouter(EditUnit)