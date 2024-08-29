import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'

const PrivateLayout = () => {
    return (
        <div>
            {/*Cabecera*/}
            <Header />

            {/*contenido principal*/}
            <section className='layout__content'>
                <Outlet />
            </section>

            {/*contenido principal*/}
            <SideBar />

        </div>
    )
}

export default PrivateLayout
