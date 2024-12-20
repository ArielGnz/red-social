import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import fondo10 from "../../assets/img/fondo10.png";
import logo1 from "../../assets/img/logo1.png";
import { Navigate } from 'react-router-dom';

export default function Register() {

    const { form, changed } = useForm({});
    const [saved, setSaved] = useState("not_saved");

    const saveUser = async (e) => {

        e.preventDefault();

        let newUSer = form;

        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUSer),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setSaved("saved");
        } else {
            setSaved("Error")
        }

    }

    
    return (

        <div className='flex w-full h-screen '>

            <div className='w-full flex items-center justify-center lg:w-1/2'>

                <form className='' onSubmit={saveUser}>

                    {saved == "saved" ? <strong className='text-xl font-bold text-green-500'> "Usuario registrado correctamente!!" </strong> : " "}
                    {saved == "Error" ? <strong className='text-xl font-bold text-red-500'> "Error al registrar el usuario" </strong> : " "}

                    <div><h1 className='text-5xl font-semibold'>Registrate!</h1></div>

                    <div><h3 className='font-semibold mt-4'>!Hola! te damos la bienvenida</h3></div>

                    <div><p className='font-semibold'>Completa tus datos y registrate</p></div>

                    <div className='mt-8'>
                        <label htmlFor="name" className='text-lg font-medium'>Nombre</label>
                        <input
                            type="text"
                            name='name'
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            onChange={changed} />
                    </div>

                    <div className=''>
                        <label htmlFor="surname" className='text-lg font-medium'>Apellido</label>
                        <input
                            type="text"
                            name='surname'
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            onChange={changed} />
                    </div>

                    <div className=''>
                        <label htmlFor="nick" className='text-lg font-medium'>Nick</label>
                        <input
                            type="text"
                            name='nick'
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            onChange={changed} />
                    </div>

                    <div className=''>
                        <label htmlFor="email" className='text-lg font-medium'>Email</label>
                        <input
                            type="email"
                            name='email'
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            onChange={changed} />
                    </div>

                    <div className=''>
                        <label htmlFor="password" className='text-lg font-medium'>Contraseña</label>
                        <input
                            type="password"
                            name='password'
                            className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
                            onChange={changed} />
                    </div>

                    <button
                        type="submit"
                        value="Registrate"
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 text-white text-lg font-bold mt-8 border-2 text-center bg-violet-500 rounded-xl w-full'
                    >Registrate
                    </button>

                </form>

            </div>


            <div className='relative hidden lg:flex h-full w-1/2 bg-violet-200 z-0'>

                <img src={fondo10} alt="" className='w-full h-full object-cover object-center z-0' />

                {/* <div className='absolute inset-0 flex items-center justify-center z-1'>
                    <h1 className='text-white text-4xl font-bold'>Título Aquí</h1>
                    <img src={logo1} alt="" className='absolute'/>
                </div> */}

            </div>

        </div>

    )
}
