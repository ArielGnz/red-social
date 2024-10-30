import React, { useState } from 'react'
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

            if(data.status == "success" && uploadData.status == "success"){
                console.log(data.status)
                const myForm = document.querySelector("#form");
                myForm.reset();
            }
        }
    }

    // <aside className="layout__aside">

    //         <header className="aside__header">
    //             <h1 className="aside__title">Hola, {auth.name}</h1>
    //         </header>

    //         <div className="aside__container">

    //             <div className="aside__profile-info">

    //                 <div className="profile-info__general-info">
    //                     <div className="general-info__container-avatar">
    //                         {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
    //                         {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
    //                     </div>

    //                     <div className="general-info__container-names">
    //                         <NavLink to={"/social/perfil/" + auth._id}className="container-names__name">{auth.name} {auth.surname}</NavLink>
    //                         <p className="container-names__nickname">{auth.nick}</p>
    //                     </div>
    //                 </div>

    //                 <div className="profile-info__stats">

    //                     <div className="stats__following">
    //                         <Link to={'/social/siguiendo/' + auth._id} href="#" className="following__link">
    //                             <span className="following__title">Siguiendo</span>
    //                             <span className="following__number">{counters.following}</span>
    //                         </Link>
    //                     </div>
    //                     <div className="stats__following">
    //                         <Link to={'social/seguidores/' + auth._id} href="#" className="following__link">
    //                             <span className="following__title">Seguidores</span>
    //                             <span className="following__number">{counters.followed}</span>
    //                         </Link>
    //                     </div>


    //                     <div className="stats__following">
    //                         <NavLink to={"/social/perfil/" + auth._id} className="following__link">
    //                             <span className="following__title">Publicaciones</span>
    //                             <span className="following__number">{counters.publications}</span>
    //                         </NavLink>
    //                     </div>


    //                 </div>
    //             </div>


    //             <div className="aside__container-form">

    //                 {stored == "stored" ? <strong className='alert alert-success'> "Publicacion guardada correctamente!!" </strong> : " "}
    //                 {stored == "Error" ? <strong className='alert alert-danger'> "Error al guardar la Publicacion" </strong> : " "}

    //                 <form className="container-form__form-post" id='form' onSubmit={savePublication}>

    //                     <div className="form-post__inputs">
    //                         <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
    //                         <textarea name="text" className="form-post__textarea" onChange={changed} />
    //                     </div>

    //                     <div className="form-post__inputs">
    //                         <label htmlFor="file" className="form-post__label">Sube tu foto</label>
    //                         <input type="file" name="file0" id='file' className="form-post__image" />
    //                     </div>

    //                     <input type="submit" value="Enviar" className="form-post__btn-submit" />

    //                 </form>

    //             </div>

    //         </div>

    //     </aside>


    return (

        <aside className="h-screen  mt-20">

            <div className="">

                <div className="">

                    <div className="flex mb-3">
                        <div className="">
                            {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                            {auth.image == "default.png" && <img src={avatar} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                        </div>

                        <div className="px-4">
                            <NavLink to={"/social/perfil/" + auth._id}className="font-semibold text-xl text-gray-600">{auth.name} {auth.surname}</NavLink>
                            <p className="font-semibold text-xl text-gray-400">{auth.nick}</p>
                        </div>
                    </div>


                    <div className="flex justify-between">

                        <div className="">
                            <Link to={'/social/siguiendo/' + auth._id} className="flex flex-col items-center">
                                <span className="">Siguiendo</span>
                                <span className="">{counters.following}</span>
                            </Link>
                        </div>

                        <div className="">
                            <Link to={'social/seguidores/' + auth._id} className="flex flex-col items-center">
                                <span className="">Seguidores</span>
                                <span className="">{counters.followed}</span>
                            </Link>
                        </div>

                        <div className="">
                            <NavLink to={"/social/perfil/" + auth._id} className="flex flex-col items-center">
                                <span className="">Publicaciones</span>
                                <span className="">{counters.publications}</span>
                            </NavLink>
                        </div>

                    </div>
                </div>


                <div className="">

                    {stored == "stored" ? <strong className=''> "Publicacion guardada correctamente!!" </strong> : " "}
                    {stored == "Error" ? <strong className=''> "Error al guardar la Publicacion" </strong> : " "}

                    <form className="" id='form' onSubmit={savePublication}>

                        <div className="">
                            <label htmlFor="text" className="">¿Que estas pesando hoy?</label>
                            <textarea name="text" className="" onChange={changed} />
                        </div>

                        <div className="">
                            <label htmlFor="file" className="">Sube tu foto</label>
                            <input type="file" name="file0" id='file' className="" />
                        </div>

                        <input type="submit" value="Enviar" className="" />

                    </form>

                </div>

            </div>

        </aside>
    )
}
