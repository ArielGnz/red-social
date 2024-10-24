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
    console.log(form)

    const request = await fetch(Global.url + 'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json();
    console.log(data);

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


  {/* <header className="content__header content__header--public">
        <h1 className="lg:text-center text-4xl">Login</h1>
      </header>

      <div className="content__posts">

        {saved == "login" ? <strong className='alert alert-success'> "Usuario identificado correctamente!!" </strong> : " "}
        {saved == "Error" ? <strong className='alert alert-danger'> "Error al ingresar el usuario o contraseña" </strong> : " "}

        <form className='form-login' onSubmit={loginUser}>

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input type="password" name='password' onChange={changed} />
          </div>

          <input type="submit" value="Identificate" className='btn btn-success' />
        </form>
        
      </div> */}


  return (

    <div className='flex w-full h-screen '>

      <div className='w-full flex items-center justify-center lg:w-1/2'>

        <form className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100' onSubmit={loginUser}>

          <div><h1 className='text-5xl font-semibold'>Welcome Login</h1></div>

          <div className='mt-8'>
            <label htmlFor="email" className='text-lg font-medium'>Email</label>
            <input
              type="email"
              name='email'
              onChange={changed}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Email' />
          </div>

          <div className='text-lg font-medium'>
            <label htmlFor="password">Contraseña</label>
            <input type="password"
              name='password'
              onChange={changed}
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Contraseña' />
          </div>

          <div className='mt-8 border-2 text-center'>
            <input type="submit" value="Identificate" className='btn btn-success' />
          </div>
          
        </form>

      </div>

      <div className='hidden realtive lg:flex h-full w-1/2 items-center justify-center bg-gray-200'>
        <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin' />
        <div className='w-1/2 h-[380px] absolute bottom-0 bg-white/10 backdrop-blur-lg' />
      </div>

    </div>
  )
}
