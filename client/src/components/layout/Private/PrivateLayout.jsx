import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { SideBar } from './SideBar'
import useAuth from '../../../hooks/useAuth'

const PrivateLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    } else {

        return (
            
            <div>
                {/*Cabecera*/}
                <Header />

                {/*contenido principal*/}
                <section className='layout__content'>
                    {auth._id ?
                        <Outlet />
                        :
                        <Navigate to="/login/" />
                    }
                </section>

                {/*contenido principal*/}
                <SideBar />

            </div>
        )
    }
}

export default PrivateLayout
