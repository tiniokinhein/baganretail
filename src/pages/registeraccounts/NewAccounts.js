import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import { db } from '../../helpers/firebase'
import { RiEditBoxLine } from 'react-icons/ri'
import { AiOutlineCloseSquare } from 'react-icons/ai'

class NewAccounts extends Component {

    _isMounted = false

    state = {
        posts: []
    }

    getPosts = () => {
        this._isMounted = true

        db
        .ref('registers')
        .orderByChild('date')
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

            const data = lists.reverse()

            if(this._isMounted) {
                this.setState({
                    posts: data
                })
            }
        })
    }

    deleteCategory(id) {
        db 
        .ref(`registers/${id}`)
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

        const cssName = {
            fsize: {
                fontSize: '0.8rem',
                fontWeight: 'normal',
                lineHeight: '1.5',
                color: L_COLOR,
                border: 0
            },
            fdsize: {
                fontSize: '0.75rem',
                fontWeight: 'normal',
                lineHeight: '1.5',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.1)'
            }
        }

        const lists = posts.length ? (
            <div 
                className="my-3 rounded shadow p-4"
                style={{
                    background: S_COLOR,
                }}
            >
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="px-0" style={cssName.fsize}>ရက်စွဲ</th>
                                <th scope="col" className="px-0" style={cssName.fsize}>အမည်</th>
                                <th scope="col" className="px-0" style={cssName.fsize}>ဖုန်းနံပါတ်</th>
                                <th scope="col" className="px-0" style={cssName.fsize}>အီးမေးလ်</th>
                                <th scope="col" className="px-0" style={cssName.fsize}>လိပ်စာ</th>
                                <th scope="col" className="px-0" style={cssName.fsize}>အခြေအနေ</th>
                                <th scope="col" className="px-0" style={cssName.fsize}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((p) => (
                                    <tr key={p.id}>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {p.date.toString()}
                                        </td>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {p.name}
                                        </td>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {p.phone}
                                        </td>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {p.email}
                                        </td>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {p.address}
                                        </td>
                                        <td className="pl-0" style={cssName.fdsize}>
                                            {
                                                p.status === 'တင်ထားဆဲ' ? (
                                                    <button
                                                        className="btn px-4 py-0 border-0 rounded-pill shadow bg-danger"
                                                        style={{
                                                            color: L_COLOR,
                                                            lineHeight: 0,
                                                            height: 30,
                                                            fontSize: '0.7rem',
                                                            minWidth: '100px'
                                                        }}
                                                    >
                                                        {p.status}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn px-4 py-0 border-0 rounded-pill shadow bg-primary"
                                                        style={{
                                                            color: L_COLOR,
                                                            lineHeight: 0,
                                                            height: 30,
                                                            fontSize: '0.7rem',
                                                            minWidth: '100px'
                                                            
                                                        }}
                                                    >
                                                        {p.status}
                                                    </button>
                                                )
                                            }
                                        </td>
                                        <td className="px-0" style={cssName.fdsize}>
                                            <div className="d-flex justify-content-end">
                                                {
                                                    p.status === 'တင်ထားဆဲ' ? (
                                                        <button
                                                            className="btn px-4 py-0 border-0 rounded-pill shadow mr-2"
                                                            style={{
                                                                background: L_COLOR,
                                                                color: F_COLOR,
                                                                lineHeight: 0,
                                                                height: 30
                                                            }}
                                                            onClick={() => this.props.history.push(`/edit-newaccount/${p.id}`)}
                                                        >
                                                            <RiEditBoxLine size="1rem" />
                                                        </button>
                                                    ) : null
                                                }
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
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
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
                    အကောင့်သစ်ဖွင့်ထားသော
                </h4>

                {lists}
                
            </Layout>
        )
    }
}

export default NewAccounts