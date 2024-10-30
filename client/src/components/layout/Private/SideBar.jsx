import React, { useState, useEffect } from 'react'
import avatar from '../../../assets/img/user.png';
import useAuth from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';


export const SideBar = () => {

    const { auth, counters } = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState("not_stored");
   
    const savePublication = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        let newPublication = form;
        newPublication.user = auth._id;

        const request = await fetch(Global.url + "publication/save", {
            method: "POST",
            body: JSON.stringify(newPublication),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setStored("stored");
        } else {
            setStored("Error")
        }

        const fileInput = document.querySelector("#file");

        if(data.status == "success" && fileInput.files[0]){

            const formData = new FormData();
            formData.append("file0", fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "publication/upload/" + data.publicationStored._id, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();

            if(uploadData == "success"){
                setStored("stored")
            } else {
                setStored("Erorr")
            }
        }

            if(data.status == "success" || uploadData.status == "success"){
                console.log(data.status)
                const myForm = document.querySelector("#form");
                myForm.reset();
            }
        
    }

    useEffect(() => {
        
        if (stored) {
          const timer = setTimeout(() => {
            setStored(null); // Limpiar el mensaje después de 3 segundos
          }, 2000);
          return () => clearTimeout(timer); // Limpiar el temporizador cuando se desmonte o cambie el estado
        }
      }, [stored]);


    return (

        <aside className="h-screen p-2 mt-20">

            <div className="">

                <div className="">

                    <div className="flex mb-3">
                        <div className="">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                        </div>

                        <div className="px-4">
                            <NavLink to={"/social/perfil/" + auth._id} className="font-semibold text-xl text-gray-600 hover:text-black">{auth.name} {auth.surname}</NavLink>
                            <p className="font-semibold text-xl text-gray-400">{auth.nick}</p>
                        </div>
                    </div>


                    <div className="flex justify-between font-semibold mt-6">

                        <div className="text-gray-600 hover:text-black text-lg">
                            <Link to={'/social/siguiendo/' + auth._id} className="flex flex-col items-center">
                                <span className="">Siguiendo</span>
                                <span className="mt-2">{counters.following}</span>
                            </Link>
                        </div>

                        <div className="text-gray-600 hover:text-black text-lg">
                            <Link to={'/social/seguidores/' + auth._id} className="flex flex-col items-center">
                                <span className="">Seguidores</span>
                                <span className="mt-2">{counters.followed}</span>
                            </Link>
                        </div>

                        <div className="text-gray-600 hover:text-black text-lg">
                            <NavLink to={"/social/perfil/" + auth._id} className="flex flex-col items-center">
                                <span className="">Publicaciones</span>
                                <span className="mt-2">{counters.publications}</span>
                            </NavLink>
                        </div>

                    </div>
                </div>


                <div className="mt-4">

                    {stored == "stored" ? <strong className='text-green-500'> "Publicacion guardada correctamente!!" </strong> : " "}
                    {stored == "Error" ? <strong className='text-red-400'> "Error al guardar la Publicacion" </strong> : " "}

                    <form className="" id='form' onSubmit={savePublication}>

                        <div className="flex flex-col">
                            <label htmlFor="text" className="mb-4 font-semibold text-gray-600">¿Que estas pesando hoy?</label>
                            <textarea name="text" className="h-[180px] bg-gray-200 text-gray-500 p-2" onChange={changed} />
                        </div>

                        <div className="font-semibold text-gray-600 mt-4">
                            <label htmlFor="file" className="mt-2">Sube tu foto</label>
                            <input type="file" name="file0" id='file' className="mt-2" />
                        </div>

                        <input type="submit" value="Enviar" className="rounded-md border-2 px-4 bg-gray-200 hover:bg-gray-300 text-lg font-semibold text-gray-600 mt-2" />

                    </form>

                </div>

            </div>

        </aside>
    )
}
