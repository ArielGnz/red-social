import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { SerializeForm } from '../../helpers/SerializeForm';
import avatar from '../../assets/img/user.png';

export const Config = () => {

    const { auth, setAuth } = useAuth();

    const [saved, setSaved] = useState("not_saved");

    const updateUser = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        let newDataUser = SerializeForm(e.target);
        delete newDataUser.file0;

        const request = await fetch(Global.url + "user/update", {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();
        console.log(data)

        if (data.status == "success" && data.user) {
            delete data.user.password;
            setAuth(data.user);
            setSaved("saved");

        } else {
            setSaved("Error")
        }

        const fileInput = document.querySelector("#file");

        if (data.status == "success" && fileInput.files[0]) {

            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "user/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();

            if (uploadData.status == "success" && uploadData) {
                delete uploadData.user.password;

                setAuth(uploadData.user);
                setSaved("saved");
            } else {
                setSaved("Error")
            }

        }

    }

    return (

        <div className='flex justify-center mt-6 border-4 lg:mt-[90px] lg:w-[600px] lg:mx-auto rounded-md'>

            {/* <header className="content__header content__header--public">
                <h1 className="content__title">Ajustes</h1>
            </header> */}

            <div className=''>

                {saved == "saved" ? <strong className=''> "Usuario Actualizado correctamente!!" </strong> : " "}
                {saved == "Error" ? <strong className=''> "Error al Actualizar el usuario" </strong> : " "}

                <form className='font-semibold text-lg text-gray-600 mt-4' onSubmit={updateUser}>

                    <div className='mt-4 w-full flex justify-between '>
                        <label htmlFor="name" className='w-[1/4]'>Nombre: </label>
                        <input className='w-[300px] px-2 rounded-md'type="text" name='name' defaultValue={auth.name} />
                    </div>

                    <div className='mt-4 w-full flex justify-between'>
                        <label htmlFor="surname">Apellido: </label>
                        <input className='w-[300px] px-2 rounded-md' type="text" name='surname' defaultValue={auth.surname} />
                    </div>

                    <div className='mt-4 w-full flex justify-between'>
                        <label htmlFor="nick">Nick: </label>
                        <input className='w-[300px] px-2 rounded-md' type="text" name='nick' defaultValue={auth.nick} />
                    </div>

                    <div className='mt-4 w-full flex justify-between'>
                        <label htmlFor="bio">Bio: </label>
                        <textarea className='w-[300px] h-[100px] px-2 rounded-md' name='bio' defaultValue={auth.bio} />
                    </div>

                    <div className='mt-4 w-full flex justify-between'>
                        <label htmlFor="email">Email: </label>
                        <input className='w-[300px] px-2 rounded-md' type="email" name='email' defaultValue={auth.email} />
                    </div>

                    <div className='mt-4 w-full flex justify-between'>
                        <label htmlFor="password">Contraseña: </label>
                        <input className='w-[300px] px-2 rounded-md' type="password" name='password' />
                    </div>

                    <div className='mt-4 w-full'>
                        <label htmlFor="file0">Avatar</label>
                        <div className="flex justify-center mt-2">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="" alt="Foto de perfil" />}
                        </div>
                        <br />
                        <input type="file" name='file0' id='file' />
                    </div>

                    <br />

                    <input type="submit" value="Actualizar" className='border-2 px-4 py-2 rounded-md bg-green-600 text-white cursor-pointer' />

                </form>
                <br />

            </div>
        </div>
    )
}
