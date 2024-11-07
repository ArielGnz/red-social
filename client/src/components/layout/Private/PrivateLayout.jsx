import React from 'react';
import { Header } from './Header';
import { Navigate, Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';
import useAuth from '../../../hooks/useAuth';

const PrivateLayout = () => {

    const { auth, loading } = useAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    } else {

        return (

            <div>

                {/*Cabecera*/}
                <Header />

                <div className='flex w-[100%] px-2 '>

                    <div className='w-full lg:w-3/4'>
                        {/*contenido principal*/}
                        <section>
                            {auth._id ?
                                <Outlet />
                                :
                                <Navigate to="/login/" />
                            }
                        </section>

                    </div>

                    <div className='hidden lg:flex w-1/4 h-[640px] '>
                        {/*contenido principal*/}
                        <SideBar />
                    </div>

                </div>

            </div>
        )
    }
}

export default PrivateLayout
