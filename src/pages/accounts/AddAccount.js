import React, { Component } from 'react'
import { MdArrowBack, MdClose, MdPhotoCamera } from 'react-icons/md'
import { Link, withRouter } from 'react-router-dom'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import Layout from '../../components/layout/Layout'
import { auth, db, storageProfiles } from '../../helpers/firebase'

class AddAccount extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        phone: '',
        profilePhoto: '',
        address: '',
        error: null,
        previewFile: null
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnFileChange = e => {
        this.setState({
            profilePhoto: e.target.files[0],
            previewFile: URL.createObjectURL(e.target.files[0])
        })
    }

    resetField = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            phone: '',
            profilePhoto: '',
            address: '',
            error: null,
            previewFile: null
        })
    }

    async handleOnSubmit(e) {
        e.preventDefault()

        const {
            name,
            email,
            password,
            phone,
            profilePhoto,
            address
        } = this.state
        
        try {

            storageProfiles
            .child(profilePhoto.name)
            .put(profilePhoto, {
                contentType: 'image/jpeg'
            })

            await auth.createUserWithEmailAndPassword(email,password)

            var user = auth.currentUser

            user.updateProfile({
                displayName: name,
                photoURL: `https://firebasestorage.googleapis.com/v0/b/bagan-retail.appspot.com/o/profiles%2F${profilePhoto.name}?alt=media`
            })

            const data = {
                date: new Date().toLocaleString(),
                name: name,
                email: email,
                phone: phone,
                profilePhoto: `https://firebasestorage.googleapis.com/v0/b/bagan-retail.appspot.com/o/profiles%2F${profilePhoto.name}?alt=media`,
                address: address,
                id: user.uid
            }

            db
            .ref(`users/${user.uid}`)
            .set(data, () => {})

            auth.signOut()

        } catch (error) {
            this.setState({
                error: error.message
            })
        }
    }

    render() {

        const { 
            name, 
            email, 
            password,
            phone,
            address,
            profilePhoto,
            previewFile,
            error
        } = this.state


        let filePreview
        if(previewFile) {
            filePreview = (
                <div className="position-relative">
                    <img
                        src={previewFile}
                        alt=""
                        className="w-100 h-100 rounded-circle"
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                    <button
                        className="btn rounded-circle text-center border-0 p-0 shadow position-absolute"
                        style={{
                            width: '24px',
                            height: '24px',
                            lineHeight: 0,
                            top: 0,
                            right: 0,
                            background: L_COLOR
                        }}
                        onClick={() => {
                            this.setState({
                                previewFile: null,
                                profilePhoto: ''
                            })
                        }}
                    >
                        <MdClose size="1rem" className="text-dark" />
                    </button>
                </div>
            )
        }

        const formList = (
            <form onSubmit={this.handleOnSubmit.bind(this)} className="col-12 px-0" autoComplete="off">
                <div className="row">
                    <div className="col-12 col-md-6 order-1 order-md-2">
                        <div className="h-100">
                            <div className="d-table w-100 h-100">
                                <div className="d-table-cell align-middle">
                                    <div 
                                        className="rounded-circle mx-auto profileFile"
                                        style={{
                                            width: 300,
                                            height: 300,
                                            background: F_COLOR
                                        }}
                                    >
                                        {
                                            previewFile === null ? (
                                                <label
                                                    className="m-0 position-absolute d-flex flex-column align-items-center justify-content-center h-100"
                                                    style={{
                                                        left: 0,
                                                        top: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <input
                                                        type="file"
                                                        name="profilePhoto"
                                                        value={profilePhoto}
                                                        onChange={this.handleOnFileChange.bind(this)}
                                                        required
                                                    />
                                                    <MdPhotoCamera size="2rem" className="text-light" />
                                                    <span className="text-white-50">
                                                        <small>
                                                            300 x 300 (px)
                                                        </small>
                                                    </span>
                                                </label>
                                            ) : filePreview
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 order-2 order-md-1">
                        <div className="form-group mb-3">
                            <label
                                htmlFor="name"
                                className="mb-2"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.9rem'
                                }}
                            >
                                အမည် 
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                                style={{
                                    color: L_COLOR,
                                    height: '50px',
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="email"
                                className="mb-2"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.9rem'
                                }}
                            >
                                အီးမေးလ် 
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                                style={{
                                    color: L_COLOR,
                                    height: '50px',
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="password"
                                className="mb-2"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.9rem'
                                }}
                            >
                                စကားဝှက်
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                                style={{
                                    color: L_COLOR,
                                    height: '50px',
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="phone"
                                className="mb-2"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.9rem'
                                }}
                            >
                                ဖုန်း
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={phone}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                                style={{
                                    color: L_COLOR,
                                    height: '50px',
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="address"
                                className="mb-2"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.9rem'
                                }}
                            >
                                လိပ်စာ
                            </label>
                            <textarea
                                cols="2"
                                name="address"
                                id="address"
                                value={address}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3 py-3"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group mb-0 mt-4">
                    {
                        error ? <p className="text-danger font-default">{error}</p> : null
                    }
                    <button
                        type="submit"
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
                    <Link to="/accounts" className="text-decoration-none mr-4" style={{color:L_COLOR}}>
                        <MdArrowBack size="1.6rem" />
                    </Link>
                    အသစ်ထည့်မည်
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

export default withRouter(AddAccount)