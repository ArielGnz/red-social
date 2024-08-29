import React from 'react'
import { useForm } from '../../hooks/useForm'

export default function Register() {

    const {form, changed} = useForm({})

    const saveUser = (e) => {
        e.preventDefault();

        let newUSer = form;
        console.log(newUSer);

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Registro</h1>
            </header>

            <div className="content__posts">

                <form className='register-form' onSubmit={saveUser}>
                    
                    <div className='form-group'>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name='name' onChange={changed}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="surnname">Apellido</label>
                        <input type="text" name='surnname' onChange={changed}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name='nick' onChange={changed}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={changed}/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name='password' onChange={changed}/>
                    </div>

                    <input type="submit" value="Registrate" className='btn btn-success' />
                </form>
            </div>
        </>
    )
}
