import React, { useState } from 'react';
import avatar from '../../../assets/img/user.png';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';


export const Nav = () => {

    const { auth } = useAuth();

    const [menuVisible, setMenuVisible] = useState(false)

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };


    return (
      
        <nav className="flex justify-between py-3 m-auto px-4 text-lg font-medium tracking-widest md:items-center lg:w-full">
            
            <div><h1 className='mx-4 font-medium text-gray-200 hover:text-white'>REACTSOCIAL</h1></div>
            
            <div id="menu" className={`h-[220px] w-[220px] flex flex-col items-center lg:justify-end rounded-lg  
                     md:flex-row md:w-full md:py-0 md:h-[50px] ${menuVisible ? 'flex' : 'hidden'} md:flex `}>
                
                <ul className='flex h-5/6 flex-col justify-around md:flex-row md:justify-end w-full'>
                    
                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to="/social">
                            <span>Inicio</span>
                        </NavLink>
                    </li>

                    {/* <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to="/social/feed">
                            <span>Timeline</span>
                        </NavLink>
                    </li> */}

                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to="/social/gente">
                            <span>Gente</span>
                        </NavLink>
                    </li>

                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to={"/social/perfil/" + auth._id}>
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="w-[50px] h-[40px] rounded-full " alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="w-[50px] h-[40px] rounded-full " alt="Foto de perfil" />}
                        </NavLink>
                    </li>
                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to={"/social/perfil/" + auth._id}>
                            <span>{auth.nick}</span>
                        </NavLink>
                    </li>
                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to="/social/ajustes" >

                            <span>Ajustes</span>
                        </NavLink>
                    </li>
                    <li className="font-medium px-6 text-gray-200 hover:text-white">
                        <NavLink to="/social/logout" >

                            <span>Cerrar Sesion</span>
                        </NavLink>
                    </li>
                </ul>

            </div>

            <button id="menu-button" className="absolute right-8 top-2 md:hidden" onClick={toggleMenu}>
                <span
                    className="br-1 block bg-white my-2 rounded-md h-[3px] w-[28px]"
                ></span>
                <span
                    className="br-2 block bg-white my-2 rounded-md h-[3px] w-[28px]"
                ></span>
                <span
                    className="br-3 block bg-white my-2 rounded-md h-[3px] w-[28px]"
                ></span>
            </button>
        </nav>
    )
}
