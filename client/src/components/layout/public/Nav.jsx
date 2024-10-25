import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'

export const Nav = () => {

    // <nav className="bg-red-500 h-[50px] navbar__container-lists">

    //         <div className="flex justify-between items-center mx-6 container-lists__menu-list">
    //             <button className="font-medium mx-6 menu-list__item">
    //                 <NavLink to='/login' className="menu-list__link">
    //                     {/* <i className="fa-solid fa-user"></i> */}
    //                     <span className=" text-center menu-list__title">Login</span>
    //                 </NavLink>
    //             </button>

    //             <button className="font-medium menu-list__item">
    //                 <NavLink to='/registro' className="menu-list__link">
    //                     {/* <i className="fa-solid fa-users"></i> */}
    //                     <span className="menu-list__title">Register</span>
    //                 </NavLink>
    //             </button>

    //         </div>

    //     </nav>

    return (

        <nav className="h-[40px]">

            <ul className='flex justify-between items-center p-2'>

                <li className='mx-8 font-medium text-gray-200 text-xl'>
                    <NavLink to='/login' className="menu-list__link">
                        <span className=" text-center menu-list__title">Login</span>
                    </NavLink>

                </li>

                <li className='mx-8 font-medium text-gray-200 text-xl'>
                    <NavLink to='/registro' className="menu-list__link">
                        <span className="menu-list__title">Register</span>
                    </NavLink>
                </li>

            </ul>

        </nav>
    )
}
