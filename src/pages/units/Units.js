import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { db } from '../../helpers/firebase'
import { RiEditBoxLine } from 'react-icons/ri'
import { AiOutlineCloseSquare } from 'react-icons/ai'

class Categories extends Component {

    _isMounted = false

    state = {
        posts: []
    }

    getPosts = () => {
        this._isMounted = true

        db
        .ref('units')
        .orderByChild('title')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                const id = snap.key
                const data = snap.val()
                lists.push({
                    id,
                    ...data
                })
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    posts: data
                })
            }
        })
    }

    deleteCategory(id) {
        db 
        .ref(`units/${id}`)
        .remove()
    }

    componentDidMount() {
        this.getPosts()
        window.scrollTo(0,0)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {

        const { posts } = this.state

        const lists = posts.length ? (
            posts.map((p,i) => (
                <div className="d-flex align-items-center py-3 border-top border-secondary" key={p.id}>
                    <h4
                        className="m-0 font-weight-normal"
                        style={{
                            color: L_COLOR,
                            fontSize: '0.8rem'
                        }}
                    >
                        {p.title}
                    </h4>
                    <div className="ml-auto">
                        <button
                            className="btn px-4 py-0 border-0 rounded-pill shadow mr-2"
                            style={{
                                background: L_COLOR,
                                color: F_COLOR,
                                lineHeight: 0,
                                height: 30
                            }}
                            onClick={() => this.props.history.push(`/edit-unit/${p.id}`)}
                        >
                            <RiEditBoxLine size="1rem" />
                        </button>
                        <button
                            className="btn px-4 py-0 border-0 rounded-pill shadow bg-danger"
                            style={{
                                color: L_COLOR,
                                lineHeight: 0,
                                height: 30
                            }}
                            onClick={this.deleteCategory.bind(this, p.id)}
                        >
                            <AiOutlineCloseSquare size="1rem" />
                        </button>
                    </div>
                </div>
            ))
        ) : null

        return (
            <Layout>
                <h4
                    className="my-4 m-md-0 font-weight-normal position-absolute s-device-header"
                    style={{
                        top: '1.5rem',
                        fontSize: '1rem',
                        color: L_COLOR
                    }}
                >
                    အလေးချိန်များ
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR,
                    }}
                >
                    <Link
                        to="/add-unit"
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

export default Categories