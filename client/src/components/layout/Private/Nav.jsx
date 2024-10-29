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

    // boton.addEventListener('click', () => {
    //     menu.classList.toggle('hidden');
    // })

    // <nav className="navbar__container-lists">

    //         <ul className="container-lists__menu-list">
    //             <li className="menu-list__item">
    //                 <NavLink to="/social" className="menu-list__link">
    //                     <i className="fa-solid fa-house"></i>
    //                     <span className="menu-list__title">Inicio</span>

    //                 </NavLink>
    //             </li>

    //             <li className="menu-list__item">
    //                 <NavLink to="/social/feed" className="menu-list__link">
    //                     <i className="fa-solid fa-list"></i>
    //                     <span className="menu-list__title">Timeline</span>
    //                 </NavLink>
    //             </li>

    //             <li className="menu-list__item">
    //                 <NavLink to="/social/gente" className="menu-list__link">
    //                     <i className="fa-solid fa-user"></i>
    //                     <span className="menu-list__title">Gente</span>
    //                 </NavLink>
    //             </li>

    //         </ul>

    //         <ul className="container-lists__list-end">
    //             <li className="list-end__item">
    //                 <NavLink to={"/social/perfil/" + auth._id} className="list-end__link-image">
    //                     {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="Foto de perfil" />}
    //                     {auth.image == "default.png" && <img src={avatar} className="list-end__img" alt="Foto de perfil" />}

    //                 </NavLink>
    //             </li>
    //             <li className="list-end__item">
    //                 <NavLink to={"/social/perfil/" + auth._id} href="#" className="list-end__link">
    //                     <span className="list-end__name">{auth.nick}</span>
    //                 </NavLink>
    //             </li>
    //             <li className="list-end__item">
    //                 <NavLink to="/social/ajustes" className="list-end__link">
    //                     <i className='fa-solid fa-gear'></i>
    //                     <span className="list-end__name">Ajustes</span>
    //                 </NavLink>
    //             </li>
    //             <li className="list-end__item">
    //                 <NavLink to="/social/logout" className="list-end__link">
    //                     <i className='fa-solid fa-arrow-right-from-bracket'></i>
    //                     <span className="list-end__name">Cerrar Sesion</span>
    //                 </NavLink>
    //             </li>
    //         </ul>

    //   </nav>

    return (

        // <nav className="mx-4 flex items-center w-full h-[60px] z-10">

        //     <div id='menu' className={`${menuVisible ? 'flex': 'hidden'} md:flex`}>

        //         <ul className="flex  space-x-4">
        //             <li className="font-medium text-gray-200 hover:text-white">
        //                 <NavLink to="/social">
        //                     <span>Inicio</span>
        //                 </NavLink>
        //             </li>

        //             <li className="font-medium text-gray-200 hover:text-white">
        //                 <NavLink to="/social/feed">
        //                     <span>Timeline</span>
        //                 </NavLink>
        //             </li>

        //             <li className="font-medium text-gray-200 hover:text-white">
        //                 <NavLink to="/social/gente">
        //                     <span>Gente</span>
        //                 </NavLink>
        //             </li>

        //         </ul>

        //         <ul className="flex space-x-4">
        // <li className="font-medium text-gray-200 hover:text-white">
        //     <NavLink to={"/social/perfil/" + auth._id}>
        //         {/* {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="Foto de perfil" />}
        //         {auth.image == "default.png" && <img src={avatar} className="list-end__img" alt="Foto de perfil" />} */}
        //     </NavLink>
        // </li>
        // <li className="font-medium text-gray-200 hover:text-white">
        //     <NavLink to={"/social/perfil/" + auth._id}>
        //         <span>{auth.nick}</span>
        //     </NavLink>
        // </li>
        // <li className="font-medium text-gray-200 hover:text-white">
        //     <NavLink to="/social/ajustes" >

        //         <span>Ajustes</span>
        //     </NavLink>
        // </li>
        // <li className="font-medium text-gray-200 hover:text-white">
        //     <NavLink to="/social/logout" >

        //         <span>Cerrar Sesion</span>
        //     </NavLink>
        // </li>
        //         </ul>
        //     </div>

        //     <button id="menu-button" className="absolute right-8 lg:hidden" onClick={toggleMenu}>
        //         <span
        //             className="br-1 block bg-white my-2 rounded-md h-[3px] w-[28px]"
        //         ></span>
        //         <span
        //             className="br-2 block bg-white my-2 rounded-md h-[3px] w-[28px]"
        //         ></span>
        //         <span
        //             className="br-3 block bg-white my-2 rounded-md h-[3px] w-[28px]"
        //         ></span>
        //     </button>



        // </nav>

        <nav className="flex justify-between py-4 m-auto px-4 text-lg font-medium tracking-widest md:items-center lg:w-full">
            
            <div><h1 className='mx-4 font-medium text-gray-200 hover:text-white'>REACTSOCIAL</h1></div>
            
            <div id="menu" className={`h-[220px] w-[220px] flex flex-col items-center lg:justify-end rounded-lg  
                     md:flex-row md:w-full md:py-0 md:h-[50px] ${menuVisible ? 'flex' : 'hidden'} md:flex `}>
                
                <ul className='flex h-5/6 flex-col justify-around md:flex-row md:justify-end w-full '>
                    
                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to="/social">
                            <span>Inicio</span>
                        </NavLink>
                    </li>

                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to="/social/feed">
                            <span>Timeline</span>
                        </NavLink>
                    </li>

                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to="/social/gente">
                            <span>Gente</span>
                        </NavLink>
                    </li>

                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to={"/social/perfil/" + auth._id}>
                            {/* {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="list-end__img" alt="Foto de perfil" />} */}
                        </NavLink>
                    </li>
                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to={"/social/perfil/" + auth._id}>
                            <span>{auth.nick}</span>
                        </NavLink>
                    </li>
                    <li className="font-medium px-2 text-gray-200 hover:text-white">
                        <NavLink to="/social/ajustes" >

                            <span>Ajustes</span>
                        </NavLink>
                    </li>
                    <li className="font-medium px-2 text-gray-200 hover:text-white">
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
