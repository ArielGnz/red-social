import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    const request = await fetch(Global.url + 'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json();

    if (data.status == "Success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user))

      setSaved("login")

      setAuth(data.user);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSaved("Error")
    }
  }


  return (

    <div className='flex w-full h-screen '>

      <div className='w-full flex items-center justify-center lg:w-1/2'>

        <form className='bg-white border-2 border-gray-300 px-10 py-20 rounded-3xl border-2 border-gray-100' onSubmit={loginUser}>

          <div><h1 className='text-5xl font-semibold'>Login</h1></div>

          <div><h3 className='font-semibold mt-4'>!Hola! te damos la bienvenida</h3></div>

          <div><p className='font-semibold'>Completa tus datos y comenza a explorar</p></div>

          <div className='mt-8'>
            <label htmlFor="email" className='text-lg font-medium'>Email</label>
            <input
              type="email"
              name='email'
              onChange={changed}
              className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Ingresa tu email' />
          </div>

          <div className='mt-2'>
            <label htmlFor="password" className='text-lg font-medium'>Contraseña</label>
            <input type="password"
              name='password'
              onChange={changed}
              className='w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Ingresa tu contraseña' />
          </div>

          {/* <div className='mt-8 border-2 text-center bg-violet-500 rounded-xl'> */}
          <button
            type="submit"
            value="Iniciar Sesion"
            className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 text-white text-lg font-bold mt-8 border-2 text-center bg-violet-500 rounded-xl w-full'
          > Iniciar Sesion
          </button>
          {/* </div> */}

        </form>

      </div>

      <div className='hidden realtive lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin' />
        <div className='w-1/2 h-[480px] absolute bottom-0 bg-white/10 backdrop-blur-lg' />
      </div>

    </div>
  )
}
