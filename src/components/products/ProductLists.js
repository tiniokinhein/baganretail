import React, { Component } from 'react'
import { RiEditBoxLine } from 'react-icons/ri'
import { withRouter } from 'react-router-dom'
import { imgUrl } from '../../helpers/firebase'
import { F_COLOR, L_COLOR, T_COLOR } from '../Color'

class ProductLists extends Component {
    render() {

        const { product } = this.props

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

        return (
            <tr>
                <td className="pl-0" style={cssName.fdsize}>
                    <small>{product.date.toString()}</small>
                </td>
                <td className="pl-0" style={cssName.fdsize}>
                    <img
                        src={imgUrl + product.image + '?alt=media'}
                        alt={product.title}
                        width="60"
                        className="rounded-lg shadow bg-white"
                    />
                    <small
                        className="pt-2 d-block"
                    >
                        {product.title}
                    </small>
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {
                        product.categories.map((m) => (
                            <>{m.title}<br /></>
                        ))
                    }
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {product.weight} <small>({product.unit.title})</small>
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {product.inStock}
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {
                        product.balance ? product.balance : product.inStock
                    }
                </td>
                <td className="pl-0 text-center" style={cssName.fdsize}>
                    {
                        product.user ? (
                            <small>
                                {
                                    product.user.name === 'None' ? product.user.email : product.user.name
                                }
                            </small>
                        ) : (
                            <small>
                                မရှိပါ
                            </small>
                        )
                    }
                </td>
                <td className="pl-0" style={cssName.fdsize}>
                    {
                        product.status === 'တင်ထားဆဲ' ? (
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
                                {product.status}
                            </button>
                        ) : (
                            <button
                                className="btn px-4 py-0 border-0 rounded-pill shadow"
                                style={{
                                    color: L_COLOR,
                                    lineHeight: 0,
                                    height: 30,
                                    fontSize: '0.7rem',
                                    minWidth: '120px',
                                    background: T_COLOR
                                }}
                            >
                                {product.status}
                            </button>
                        )
                    }
                </td>
                <td className="px-0" style={cssName.fdsize}>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn px-4 py-0 border-0 rounded-pill shadow mr-2"
                            style={{
                                background: L_COLOR,
                                color: F_COLOR,
                                lineHeight: 0,
                                height: 30
                            }}
                            onClick={() => this.props.history.push(`/qr-product/${product.id}`)}
                        >
                            <RiEditBoxLine size="1rem" />
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default withRouter(ProductLists)