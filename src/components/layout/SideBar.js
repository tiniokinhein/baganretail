import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdFilterTiltShift } from 'react-icons/md'
import { GiWeight } from 'react-icons/gi'
import { AiOutlineUser } from 'react-icons/ai'
import { RiDashboardLine, RiProductHuntLine } from 'react-icons/ri'
import { GoPackage } from 'react-icons/go'
import { FiUserPlus } from 'react-icons/fi'


class SideBar extends Component {

    render() {

        const cssName = {
            color: {
                color: '#fcdab7'
            }
        }

        return (
            <div 
                className="p-4 sticky-top w-100"
                style={{
                    top: 0
                }}
            >
                <Link 
                    to="/"
                    className="border-bottom border-secondary mb-4 pb-4 font-weight-bold d-block text-decoration-none" 
                    style={{
                        ...cssName.color,
                        fontSize: '1.6rem'
                    }}
                >
                    ADMIN
                </Link>

                <ul className="list-unstyled m-0">
                    <li className="mb-4 position-relative">
                        <NavLink to="/" className="text-decoration-none" style={cssName.color}>
                            <RiDashboardLine size="2rem" className="mr-3" />
                            မူလ
                        </NavLink>
                    </li>
                    <li className="mb-4 position-relative">
                        <NavLink to="/orders" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <GoPackage size="2rem" className="mr-3" />
                            အော်ဒါများ
                        </NavLink>
                    </li>
                    <li className="mb-4 position-relative">
                        <NavLink to="/accounts" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <AiOutlineUser size="2rem" className="mr-3" />
                            အကောင့်များ
                        </NavLink>
                    </li>
                    <li className="mb-4 position-relative">
                        <NavLink to="/new-accounts" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <FiUserPlus size="2rem" className="mr-3" />
                            အကောင့်သစ်ဖွင့်ထားသော
                        </NavLink>
                    </li>
                    <li className="mb-4 position-relative">
                        <NavLink to="/products" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <RiProductHuntLine size="2rem" className="mr-3" />
                            ကုန်ပစ္စည်းများ
                        </NavLink>
                    </li>
                    <li className="mb-4 position-relative">
                        <NavLink to="/categories" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <MdFilterTiltShift size="2rem" className="mr-3" />
                            အမျိုးအစားများ
                        </NavLink>
                    </li>
                    <li className="position-relative">
                        <NavLink to="/units" className="text-decoration-none" style={cssName.color} activeClassName="menu-side-active">
                            <GiWeight size="2rem" className="mr-3" />
                            အလေးချိန်များ
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideBar