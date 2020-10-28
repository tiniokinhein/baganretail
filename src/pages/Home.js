import React, { Component } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { L_COLOR, S_COLOR } from '../components/Color'
import { KS } from '../components/Currency'
import Layout from '../components/layout/Layout'
import { db, imgUrl } from '../helpers/firebase'

export default class Home extends Component {

    _isMounted = false

    state = {
        orders: [],
        accounts: [],
        new_accounts: [],
        posts: []
    }

    getOrders = () => {
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
                    orders: data.slice(0,10)
                })
            }
        })
    }

    getAccounts = () => {
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
                    accounts: data.slice(0,10)
                })
            }
        })
    }

    getNewAccounts = () => {
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
                    new_accounts: data.slice(0,10)
                })
            }
        })
    }

    getPosts = () => {
        this._isMounted = true 

        db
        .ref('products')
        .orderByChild('date')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists.reverse()

            if(this._isMounted) {
                this.setState({
                    posts: data.slice(0,10)
                })
            }
        })
    }

    componentDidMount() {
        this.getOrders()
        this.getAccounts()
        this.getNewAccounts()
        this.getPosts()
        window.scrollTo(0,0)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {

        const { orders , accounts , new_accounts , posts } = this.state

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

        const orderLists = orders.length ? (
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        {
                            orders.map((p) => (
                                <tr key={p.id}>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <small>{p.date.toString()}</small>
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <span className="text-warning">{p.checkout.user.name}</span> က <span className="text-warning">{p.checkout.products.title}</span> ကို <span className="text-warning"><strong>({p.checkout.products.weight})</strong> {p.checkout.products.unit}</span> ဝယ်ထားသည်
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) : null

        const accountLists = accounts.length ? (
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        {
                            accounts.map((p) => (
                                <tr key={p.id}>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <small>{p.date.toString()}</small>
                                    </td>
                                    <td 
                                        className="pl-0" 
                                        style={{
                                            ...cssName.fdsize,
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <span className="text-warning">{p.name}</span>
                                    </td>
                                    {/* <td className="pl-0" style={cssName.fdsize}>
                                        {p.phone}
                                    </td> */}
                                    <td className="pl-0 text-left" style={cssName.fdsize}>
                                        <span className="text-warning">{p.email}</span>
                                    </td>
                                    <td className="pr-0 text-right" style={cssName.fdsize}>
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) : null

        const newAccountLists = new_accounts.length ? (
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        {
                            new_accounts.map((p) => (
                                <tr key={p.id}>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <small>{p.date.toString()}</small>
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <span className="text-warning">{p.name}</span>
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        {p.phone}
                                    </td>
                                    <td className="pr-0 text-right" style={cssName.fdsize}>
                                        <span className="text-warning">{p.email}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        ) : null

        const productLists = posts.length ? (
            <div className="table-responsive">
                <table className="table mb-0">
                    <tbody>
                        {
                            posts.filter(fr => fr.status === 'အတည်ပြုပြီးပြီ').map((p) => (
                                <tr key={p.id}>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <small>{p.date.toString()}</small>
                                    </td>
                                    <td className="pl-0" style={cssName.fdsize}>
                                        <div className="d-flex">
                                            <img
                                                src={imgUrl + p.image + '?alt=media'}
                                                alt={p.title}
                                                width="30"
                                                className="rounded-lg shadow bg-white"
                                            />
                                            <small
                                                className="pl-2 flex-grow-1 text-warning"
                                            >
                                                {p.title}
                                            </small>
                                        </div>
                                    </td>
                                    <td 
                                        className="pl-0" 
                                        style={{
                                            ...cssName.fdsize,
                                            color: L_COLOR
                                        }}
                                    >
                                        {p.weight}<small className="text-warning">({p.unit.title})</small> - {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {KS}
                                    </td>
                                    <td className="pr-0 text-right text-warning" style={cssName.fdsize}>
                                        {p.inStock}
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
                    မူလ
                </h4>
                
                <div className="row">
                    <div className="col-12 col-md-6 mb-4">
                        <div 
                            className="h-100 px-4 pt-4 pb-3 rounded shadow"
                            style={{
                                background: S_COLOR
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4
                                    className="mb-0 font-weight-normal"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '1rem'
                                    }}
                                >
                                    အော်ဒါအသစ်များ
                                </h4>
                                <Link
                                    to="/orders"
                                    className="text-decoration-none"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <MdKeyboardArrowRight size="1.5rem" className="text-white" />
                                </Link>
                            </div>

                            {orderLists}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div 
                            className="h-100 px-4 pt-4 pb-3 rounded shadow"
                            style={{
                                background: S_COLOR
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4
                                    className="mb-0 font-weight-normal"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '1rem'
                                    }}
                                >
                                    အကောင့်သစ်ဖွင့်ထားသော
                                </h4>
                                <Link
                                    to="/new-accounts"
                                    className="text-decoration-none"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <MdKeyboardArrowRight size="1.5rem" className="text-white" />
                                </Link>
                            </div>

                            {accountLists}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div 
                            className="h-100 px-4 pt-4 pb-3 rounded shadow"
                            style={{
                                background: S_COLOR
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4
                                    className="mb-0 font-weight-normal"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '1rem'
                                    }}
                                >
                                    အကောင့်သစ်များ
                                </h4>
                                <Link
                                    to="/accounts"
                                    className="text-decoration-none"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <MdKeyboardArrowRight size="1.5rem" className="text-white" />
                                </Link>
                            </div>

                            {newAccountLists}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div 
                            className="h-100 px-4 pt-4 pb-3 rounded shadow"
                            style={{
                                background: S_COLOR
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4
                                    className="mb-0 font-weight-normal"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '1rem'
                                    }}
                                >
                                    ကုန်ပစ္စည်းအသစ်များ
                                </h4>
                                <Link
                                    to="/products"
                                    className="text-decoration-none"
                                    style={{
                                        color: L_COLOR,
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    <MdKeyboardArrowRight size="1.5rem" className="text-white" />
                                </Link>
                            </div>

                            {productLists}
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
