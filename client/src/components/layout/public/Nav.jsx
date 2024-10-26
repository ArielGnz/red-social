import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {

    // <nav className="h-[40px] fixed top-0 left-0 w-full z-10 bg-opacity-50 backdrop-blur-lg">


    return (

        <nav className="h-[40px] z-10">

            <ul className='flex justify-between items-center p-2'>

                <li className='mx-8 font-medium text-gray-200 text-xl'>
                    <NavLink to='/login' className="menu-list__link">
                        <span className="hover:text-white">Login</span>
                    </NavLink>

                </li>

                <li className='mx-8 font-medium text-gray-200 text-xl'>
                    <NavLink to='/registro' className="menu-list__link">
                        <span className="hover:text-white">Register</span>
                    </NavLink>
                </li>

            </ul>

        </nav>
    )
}
