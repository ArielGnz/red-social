import React from 'react';
import useAuth from '../../hooks/useAuth';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more }) => {

    const { auth } = useAuth();

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
            setFollowing([...following, userId]);
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
            let filtrar = following.filter(userFollowing => userId !== userFollowing);
            setFollowing(filtrar);
        }
    }

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
      }


    return (

        <>

            <div className="mt-[66px] flex flex-wrap w-[470px] lg:w-full lg:justify-center">

                {users.map(user => {

                    return (
                        <div className='flex'>

                        <article className="border-2 p-2 m-2 w-[215px] lg:w-[390px] bg-gray-200 " key={user._id}>

                            <div className="flex flex-col justify-center">

                                <div className="mx-auto">
                                    <Link to={"/social/perfil/" + user._id} className="">
                                        
                                        {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="w-[90px] h-[90px] rounded-full" alt="Foto de perfil" />}
                                        {user.image == "default.png" && <img src={avatar} className="w-[90px] h-[90px] rounded-full" alt="Foto de perfil" />}
                                        
                                    </Link>
                                </div>

                                <div className="mx-auto">

                                    <div className="flex flex-col mx-2">
                                        
                                        <Link to={"/social/perfil/" + user._id} className="font-semibold text-lg text-gray-600 lg:text-xl">{user.name} {user.surname}</Link>
                                        
                                        <a className="mx-auto font-semibold text-gray-500"><ReactTimeAgo date={user.created_at} /></a>
                                    </div>

                                    <h4 className="">{user.bio}</h4>

                                </div>

                            </div>

                            {user._id != auth._id &&

                                <div className="flex justify-center mt-[30px]">

                                    {!following.includes(user._id) &&
                                        <button className="border-2 p-2 w-[150px] bg-violet-500 rounded-md text-gray-200 text-md hover:text-white font-semibold"
                                            onClick={() => follow(user._id)}>
                                            Seguir
                                        </button>

                                    }

                                    {following.includes(user._id) &&
                                        <button className="border-2 p-2 w-[150px] bg-gray-700 rounded-md text-gray-200 text-md hover:text-white font-semibold"
                                            onClick={() => unfollow(user._id)} >
                                            Dejar de Seguir
                                        </button>
                                    }

                                </div>
                            }


                        </article>
                        </div>
                    )
                })}

            </div>

            {more &&

                <div className="flex justify-center mx-auto mt-10">
                    <button className="p-2 w-[260px] bg-green-700 rounded-md text-gray-200 text-lg" onClick={nextPage}>
                        Ver mas Personas
                    </button>
                </div>
            }

        </>
    )
}
