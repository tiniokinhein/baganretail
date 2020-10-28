import React, { Component } from 'react'
import Layout from '../../components/layout/Layout'
import { L_COLOR, S_COLOR } from '../../components/Color'
import { db } from '../../helpers/firebase'
import { KS } from '../../components/Currency'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import ProductLists from '../../components/products/ProductLists'

class Products extends Component {

    _isMounted = false

    state = {
        posts: []
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
                    posts: data
                })
            }
        })
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
            }
        }

        const lists = posts.length ? (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ရက်စွဲ</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>ပစ္စည်း</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>စျေးနှုန်း({KS})</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အမျိုးအစား</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အလေးချိန်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အရေအတွက်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>လက်ကျန်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}>အကောင့်</th>
                            <th scope="col" className="pl-0" style={cssName.fsize}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((p,index) => (
                                <ProductLists product={p} key={index} />
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
                    ကုန်ပစ္စည်းများ
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR,
                    }}
                >
                    <Link
                        to="/add-product"
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

export default Products