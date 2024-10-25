import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {

    return (
        <nav className="bg-red-500 h-[50px] navbar__container-lists">

            <div className=" flex justify-between items-center mx-6 container-lists__menu-list">
                <button className="font-medium mx-6 menu-list__item">
                    <NavLink to='/login' className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Login</span>
                    </NavLink>
                </button>

                <button className="font-medium menu-list__item">
                    <NavLink to='/registro' className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Register</span>
                    </NavLink>
                </button>

            </div>

        </nav>
    )
}
