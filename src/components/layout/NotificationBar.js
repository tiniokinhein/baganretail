import React, { Component } from 'react'
import { CgClose } from 'react-icons/cg'
import { withRouter } from 'react-router-dom'
import { L_COLOR, S_COLOR } from '../Color'
import { db, imgUrl } from '../../helpers/firebase'
import { RiUserAddFill } from 'react-icons/ri'
import Moment from 'react-moment'


class NotificationBar extends Component {

    _isMounted = false

    state = {
        orders: [],
        registers: [],
        products: []
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
                    orders: data.filter(fr => fr.status === 'တင်ထားဆဲ')
                })
            }
        })

        db
        .ref('registers')
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
                    registers: data.filter(fr => fr.status === 'တင်ထားဆဲ')
                })
            }
        })

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
                    products: data.filter(fr => fr.status === 'တင်ထားဆဲ')
                })
            }
        })
    }

    componentDidMount() {
        this.getPosts()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    closeNotification = () => {
        document.getElementById('notiBar').style.transform = 'rotateY(180deg)'
        document.getElementById('notiBar').style.transformOrigin = 'right'
    }

    render() {

        const { orders, registers, products } = this.state


        const orderLists = orders.length ? (
            orders.filter(fr => fr.adminNotify === false).map((p) => (
                <div 
                    className="d-flex mb-3 align-items-center" 
                    key={p.id}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => this.props.history.push('/')}
                >
                    <img
                        src={imgUrl + p.checkout.products.image + '?alt=media'}
                        alt=""
                        className="shadow rounded-circle"
                        style={{
                            width: 45
                        }}
                    />
                    <div className="flex-grow-1 ml-2">
                        <p
                            className="mb-0"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.8rem',
                                lineHeight: '1.5'
                            }}
                        >
                            <span className="text-warning">{p.checkout.user.name}</span> က <span className="text-warning">{p.checkout.products.title}</span> (ပစ္စည်း)ကို <span className="text-warning">({p.checkout.products.weight}) {p.checkout.products.unit}</span> ဝယ်ထားသည်
                        </p>
                        <small 
                            className="text-light"
                            style={{
                                fontSize: '0.6rem'
                            }}
                        >
                            <Moment fromNow>{p.date.toString()}</Moment>
                        </small>
                    </div>
                </div>
            ))
        ) : null

        const registerLists = registers.length ? (
            registers.map((p) => (
                <div 
                    className="d-flex mb-3 align-items-center" 
                    key={p.id}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => this.props.history.push(`/edit-newaccount/${p.id}`)}
                >
                    <div
                        className="text-center rounded-circle shadow"
                        style={{
                            minWidth: 45,
                            height: 45,
                            lineHeight: '45px',
                            background: L_COLOR,
                            color: S_COLOR
                        }}
                    >
                        <RiUserAddFill size="1.4rem" />
                    </div>
                    <div className="flex-grow-1 ml-2">
                        <p
                            className="mb-0"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.8rem',
                                lineHeight: '1.5'
                            }}
                        >
                            <span className="text-warning">{p.name}</span> က <span className="text-light">{p.email}</span> ဖြင့် အကောင့်သစ် ဖွင့်ထားသည်
                        </p>
                        <small 
                            className="text-light"
                            style={{
                                fontSize: '0.6rem'
                            }}
                        >
                            <Moment fromNow>{p.date.toString()}</Moment>
                        </small>
                    </div>
                </div>
            ))
        ) : null

        const productLists = products.length ? (
            products.map((p) => (
                <div 
                    className="d-flex mb-3 align-items-center" 
                    key={p.id}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => this.props.history.push(`/qr-product/${p.id}`)}
                >
                    <img
                        src={imgUrl + p.image + '?alt=media'}
                        alt=""
                        className="shadow rounded-circle"
                        style={{
                            width: 45
                        }}
                    />
                    <div className="flex-grow-1 ml-2">
                        <p
                            className="mb-0"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.8rem',
                                lineHeight: '1.5'
                            }}
                        >
                            <span className="text-warning">{p.user.name}</span> က <span className="text-warning">{p.title}</span> (ပစ္စည်းအသစ်တစ်ခု)ကို တင်ထားသည်
                        </p>
                        <small 
                            className="text-light"
                            style={{
                                fontSize: '0.6rem'
                            }}
                        >
                            <Moment fromNow>{p.date.toString()}</Moment>
                        </small>
                    </div>
                </div>
            ))
        ) : null

        return (
            <div
                id="notiBar"
                className="position-fixed"
                onClick={this.closeNotification}
            >
                <div 
                    className="px-4 pb-5 pt-3 position-relative col-12 col-md-8 col-lg-4 ml-auto shadow-lg h-100"
                    style={{
                        background: S_COLOR,
                        overflowY: 'scroll'
                    }}
                >
                    <button
                        className="btn rounded-0 border-0 shadow-none p-0"
                        onClick={this.closeNotification}
                    >
                        <CgClose size="1.6rem" className="text-white" />
                    </button>

                    <h4
                        className="mb-3 pb-3 border-bottom border-secondary font-weight-normal"
                        style={{
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            color: L_COLOR
                        }}
                    >
                        အချက်ပေးမှုများ
                    </h4>

                    {productLists}
                    {registerLists}
                    {orderLists}

                </div>
            </div>
        )
    }
}

export default withRouter(NotificationBar)