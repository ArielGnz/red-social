import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import { SideBar } from './SideBar'
import useAuth from '../../../hooks/useAuth'

const PrivateLayout = () => {

    // <div>

    //     {/*Cabecera*/}
    //     <Header />

    //     {/*contenido principal*/}
    //     <section className='layout__content'>
    //         {auth._id ?
    //             <Outlet />
    //             :
    //             <Navigate to="/login/" />
    //         }
    //     </section>

    //     {/*contenido principal*/}
    //     <SideBar />

    // </div>

    const { auth, loading } = useAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    } else {

        return (

            <div>

                {/*Cabecera*/}
                <Header />

                <div className='flex w-[100%] px-2 '>

                    <div className='w-4/5'>
                        {/*contenido principal*/}
                        <section>
                            {auth._id ?
                                <Outlet />
                                :
                                <Navigate to="/login/" />
                            }
                        </section>

                    </div>

                    <div className='hidden lg:flex w-1/5 border-4'>
                        {/*contenido principal*/}
                        <SideBar />
                    </div>

                </div>

            </div>
        )
    }
}

export default PrivateLayout
