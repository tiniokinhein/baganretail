import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { L_COLOR, S_COLOR } from '../../components/Color'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { db } from '../../helpers/firebase'
import { AiOutlineCloseSquare } from 'react-icons/ai'


class Accounts extends Component {

    _isMounted = false

    state = {
        posts: []
    }

    gePosts = () => {
        this._isMounted = true

        db
        .ref('users')
        .orderByChild('date')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                const id = snap.key
                const value = snap.val()
                lists.push({
                    id,
                    ...value
                })
            })

            const data = lists.reverse()

            if(this._isMounted) {
                this.setState({
                    posts: data
                })
            }
        })
    }

    deleteAccount(id) {
        db 
        .ref(`users/${id}`)
        .remove()
    }

    componentDidMount() {
        this.gePosts()
        window.scrollTo(0,0)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {

        const { posts } = this.state

        const cssName = {
            fsize: {
                fontSize: '0.9rem',
                fontWeight: 'normal',
                lineHeight: '1.5',
                color: L_COLOR,
                border: 0,
                whiteSpace: 'nowrap'
            },
            fdsize: {
                fontSize: '0.8rem',
                fontWeight: 'normal',
                lineHeight: '1.5',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.1)',
                verticalAlign: 'middle'
            }
        }

        const lists = posts.length ? (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ရက်စွဲ</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အမည်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အီးမေးလ်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ဖုန်း</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>လိပ်စာ</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((p) => (
                                <tr key={p.id}>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <small>{p.date.toString()}</small>
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        {/* <img
                                            src={p.profilePhoto}
                                            alt={p.name}
                                            width="60"
                                            className="rounded-circle shadow"
                                        />
                                        <small
                                            className="pl-2 d-inline-block"
                                        > */}
                                        {p.name}
                                        {/* </small> */}
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        {p.email}
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        {p.phone}
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <span dangerouslySetInnerHTML={{__html: p.address}} />
                                    </td>
                                    <td className="px-0" style={cssName.fdsize}>
                                        <div className="d-flex justify-content-end">
                                            <button
                                                className="btn px-4 py-0 border-0 rounded-pill shadow bg-danger"
                                                style={{
                                                    color: L_COLOR,
                                                    lineHeight: 0,
                                                    height: 30
                                                }}
                                                onClick={this.deleteAccount.bind(this, p.id)}
                                            >
                                                <AiOutlineCloseSquare size="1rem" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) : null

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
                    အကောင့်များ
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR
                    }}
                >
                    <Link
                        to="/add-account"
                        className="d-inline-block text-decoration-none mb-4"
                        style={{
                            color: L_COLOR,
                            fontSize: '0.75rem',
                            lineHeight: '1.5'
                        }}
                    >
                        <BsFillPlusSquareFill className="mr-2" size="2rem" />
                        အသစ်ထည့်မည်
                    </Link>

                    {lists}
                </div>
            </Layout>
        )
    }
}

export default Accounts