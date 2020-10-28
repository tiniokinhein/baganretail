import React, { Component } from 'react'
import { RiLogoutBoxRLine, RiSearchLine } from 'react-icons/ri'
import { BiNotification } from 'react-icons/bi'
import { F_COLOR, L_COLOR } from '../Color'
import { auth, db } from '../../helpers/firebase'
import { CgMenuHotdog } from 'react-icons/cg'

class TopBar extends Component {

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
        .orderByChild('status')
        .equalTo('တင်ထားဆဲ')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    orders: data.filter(fr => fr.adminNotify === false).length
                })
            }
        })

        db
        .ref('registers')
        .orderByChild('status')
        .equalTo('တင်ထားဆဲ')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    registers: data.length
                })
            }
        })

        db
        .ref('products')
        .orderByChild('status')
        .equalTo('တင်ထားဆဲ')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    products: data.length
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

    openSideBar = () => {
        document.getElementById('sideBar').style.transform = 'rotateY(0deg)'
        document.getElementById('sideBar').style.transformOrigin = 'left'
    }

    openNotification = () => {
        document.getElementById('notiBar').style.transform = 'rotateY(0deg)'
        document.getElementById('notiBar').style.transformOrigin = 'right'
    }

    render() {

        const { orders, registers, products } = this.state

        return (
            <header className="py-3 header">
                <div className="d-block d-md-none">
                    <button
                        className="btn border-0 rounded-0 shadow-none p-0"
                        onClick={this.openSideBar}
                    >
                        <CgMenuHotdog size="1.5rem" className="text-white" />
                    </button>
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => {}}
                        className="btn p-0 border-0 rounded-0 shadow-none"
                    >
                        <RiSearchLine size="1.6rem" className="text-light" />
                    </button>
                    <button
                        onClick={this.openNotification}
                        className="btn pl-4 pr-0 py-0 border-0 rounded-0 shadow-none position-relative"
                    >
                        <BiNotification size="1.8rem" className="text-light" />
                        <span
                            className="num-alert position-absolute rounded-circle bg-warning font-weight-bold text-center"
                            style={{
                                right: '-10px',
                                top: '-10px',
                                border: '3px solid' + F_COLOR,
                                color: F_COLOR,
                                width: 24,
                                height: 24,
                                lineHeight: '18.5px',
                                fontSize: '0.6rem'
                            }}
                        >
                            {
                                (orders + registers + products) <= 0 ? null : (orders + registers + products)
                            }
                        </span>
                    </button>
                    <button
                        onClick={async () => await auth.signOut()}
                        className="btn pl-4 pr-0 py-0 border-0 rounded-0 shadow-none"
                        style={{
                            color: L_COLOR
                        }}
                    >
                        <RiLogoutBoxRLine size="1.6rem" />
                    </button>
                </div>
            </header>
        )
    }
}

export default TopBar