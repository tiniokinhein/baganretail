import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { L_COLOR, S_COLOR } from '../../components/Color'
import { db, imgUrl } from '../../helpers/firebase'
import { AiOutlineCloseSquare } from 'react-icons/ai'
import { KS } from '../../components/Currency'
import { withRouter } from 'react-router-dom'

class Orders extends Component {

    _isMounted = false

    state = {
        posts: []
    }

    getPosts = () => {
        this._isMounted = true

        db
        .ref('orders')
        .orderByChild('date')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists.reverse()

            if(this._isMounted) {
                this.setState({
                    posts: data
                })
            }
        })
    }

    deleteOrder(id) {
        db 
        .ref(`orders/${id}`)
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
                verticalAlign: 'top'
            }
        }

        const lists = posts.length ? (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ရက်စွဲ</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>Invoice</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အမည်</th>                            
                            <th scope="col" className="pl-0" style={cssName.fsize}>ပစ္စည်း</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ဝယ်ယူ</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အခြေအနေ</th>
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
                                    <td className="pl-0 text-warning" style={cssName.fdsize}>
                                        {p.invoice_number}
                                    </td>
                                    <td className="pl-0 text-warning" style={cssName.fdsize}>
                                        {p.checkout.user.name}
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <div 
                                            className="d-flex"
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => this.props.history.push(`/qr-product/${p.checkout.products.id}`)}
                                        >
                                            <img
                                                src={imgUrl + p.checkout.products.image + '?alt=media'}
                                                alt=""
                                                width="50"
                                                className="rounded-lg shadow bg-white"
                                            />
                                            <span
                                                className="pl-2 flex-grow-1 text-warning"
                                            >
                                                {p.checkout.products.title}
                                                <small className="d-block mt-2 text-light">
                                                    ({p.checkout.products.weight}){p.checkout.products.unit} - {p.checkout.products.price} {KS}
                                                </small>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="pl-0 text-warning" style={cssName.fdsize}>
                                        {p.checkout.products.weight} {p.checkout.products.unit}
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
                                            <button
                                                className="btn px-4 py-0 border-0 rounded-pill shadow bg-danger"
                                                style={{
                                                    color: L_COLOR,
                                                    lineHeight: 0,
                                                    height: 30
                                                }}
                                                onClick={this.deleteOrder.bind(this, p.id)}
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
                    အော်ဒါများ
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR
                    }}
                >
                    {lists}
                </div>
            </Layout>
        )
    }
}

export default withRouter(Orders)