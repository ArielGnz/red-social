import React from 'react';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';

export const PublicationList = ({ publications, getPublications, page, setPage, more, setMore }) => {

    const { auth } = useAuth();

    const deletePublication = async (publicationId) => {

        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        setPage(1);
        setMore(true);
        getPublications(1, true);

    }

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    
    return (

        <div className='px-6 py-6 border-4 rounded-md'>

            <div className="">

                {publications.map(publication => {

                    return (

                        <article className="border-b-2 my-4" key={publication._id}>

                            <div className="flex">

                                <div className="">
                                    <Link to={"/social/perfil/" + publication.user._id} className="">
                                        {publication.user.image != "default.png" && <img src={Global.url + "user/avatar/" + publication.user.image} className="w-[60px] h-[60px] rounded-full" alt="Foto de perfil" />}
                                        {publication.user.image == "default.png" && <img src={avatar} className="w-[60px] h-[60px] rounded-full" alt="Foto de perfil" />}

                                    </Link>
                                </div>

                                <div className="flex flex-col font-bold text-gray-600 mx-4">
                                    <a href="#" className="text-lg">{publication.user.name + " " + publication.user.surname}</a>

                                    <a href="#" className=""><ReactTimeAgo date={publication.created_at} locale='es-ES' /></a>
                                </div>

                            </div>

                            <h4 className="font-semibold text-gray-700 text-lg text-center">{publication.text}</h4>

                            {publication.file && <img src={Global.url + "publication/media/" + publication.file} className='h-[500px] w-[500px] mx-auto' />}


                            {auth._id == publication.user._id &&
                                <div className="">

                                    <button onClick={() => deletePublication(publication._id)} className="">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                </div>
                            }

                        </article>
                    )
                })}

            </div>

            {more &&
                <div className="flex justify-center  mx-auto">
                    <button className="p-2 w-[260px] bg-green-700 rounded-md text-gray-200 text-lg" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }

        </div>
    )
}
