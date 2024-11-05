import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png';
import { GetProfile } from '../../helpers/GetProfile';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';

export const Profile = () => {

    const { auth } = useAuth();
    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const params = useParams();

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(true);
        getPublications(1, true);
    }, [params]);

    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, setUser);
        if (dataUser.following && dataUser.following._id) setIFollow(true);
    }

    const getCounters = async () => {
        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setCounters(data);
        }

    }

    const follow = async (userId) => {

        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setIFollow(true);
        }
    }

    const unfollow = async (userId) => {

        const request = await fetch(Global.url + 'follow/unfollow/' + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {
            setIFollow(false);
        }
    }

    const getPublications = async (nextPage = 1, newProfile = false) => {

        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        if (data.status == "success") {

            let newPublications = data.publications;

            if (!newProfile && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            if (newProfile) {
                newPublications = data.publications;
                setMore(true);
                setPage(1);
            }

            setPublications(newPublications);

            if (!newProfile && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
        }

    }


    return (

        <div className='mt-[100px] mx-4'>

            <header className="">

                <div className="flex justify-center">
                    
                    <div className="">
                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                        {user.image == "default.png" && <img src={avatar} className="w-[80px] h-[80px] rounded-full" alt="Foto de perfil" />}
                    </div>

                    <div className="mx-4 font-semibold text-gray-600">
                        <div className="">
                            <h1 className='text-2xl'>{user.name} {user.surname}</h1>
                            <div className='flex mt-2'>
                                
                                <h2 className="text-lg">{user.nick}</h2>

                                {user._id != auth._id &&

                                    (iFollow ?
                                        <button onClick={() => unfollow(user._id)} className="mx-2 bg-gray-400 hover:text-white rounded-md px-2 border-2">Dejar de Seguir</button>
                                        :
                                        <button onClick={() => follow(user._id)} className="mx-2 bg-green-600 hover:text-white rounded-md px-2 border-2">Seguir</button>
                                    )
                                }
                            </div>

                        </div>

                       

                    </div>

                </div>

                <div className="">

                <p>{user.bio}</p>

                    <div className="">
                        <Link to={'/social/siguiendo/' + user._id} className="">
                            <span className="">Siguiendo</span>
                            <span className="">{counters.following}</span>
                        </Link>
                    </div>

                    <div className="">
                        <Link to={'/social/seguidores/' + user._id} className="">
                            <span className="">Seguidores</span>
                            <span className="">{counters.followed}</span>
                        </Link>
                    </div>


                    <div className="">
                        <Link to={'/social/perfil/' + user._id} className="">
                            <span className="">Publicaciones</span>
                            <span className="">{counters.publications}</span>
                        </Link>
                    </div>


                </div>
            </header>


            <PublicationList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />

        </div >
    )
}
