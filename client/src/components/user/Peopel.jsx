import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Peopel = () => {

  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {

    const request = await fetch(Global.url + 'user/list/' + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if (data.users && data.status == "success") {
      let newUsers = data.users;
      if (users.length >= 1) {
        newUsers = [...users, ...data.users];
      }

      setUsers(newUsers);
      setFollowing(data.user_following);

      if (users.length >= (data.total - data.users.length)) {
        setMore(false);
      }
      
    }

  }

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
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

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>

      </header>

      <div className="content__posts">

        {users.map(user => {
          return (
            <article className="posts__post" key={user._id}>

              <div className="post__container">

                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="post__user-image" alt="Foto de perfil" />}
                    {user.image == "default.png" && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                    <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                  </a>
                </div>

                <div className="post__body">

                  <div className="post__user-info">
                    <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">{user.created_at}</a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>

                </div>

              </div>
              
              
                <div className="post__buttons">

                  {!following.includes(user._id) &&
                    <button className="post__button post__button--green"
                      onClick={() => follow(user._id)}>
                      Seguir
                    </button>
                    
                  }

                  {following.includes(user._id) &&
                    <button className="post__button post__button--green"
                      onClick={() => unfollow(user._id)} >
                      Dejar de Seguir
                    </button>
                  }

                </div>
              

            </article>
          )
        })}

      </div>

      {more &&

        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas Personas
          </button>
        </div>
      }
      <br />
    </>
  )
}
