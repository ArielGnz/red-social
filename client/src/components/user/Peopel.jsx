import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global';

export const Peopel = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

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

    if (data.users && data.status == "success"){
      let newUsers = data.users;
      if(users.length >= 1){
        newUsers = [...users, ...data.users];
      }

      setUsers(newUsers);
    }

  }

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);

    console.log(page, users)
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

                <a href="#" className="post__button post__button--green" >
                  Seguir
                </a>

                {/*
            <a href="#" className="post__button post__button--green" >
              Dejar de Seguir
            </a>
            */}

              </div>

            </article>
          )
        })}

      </div>

      <div className="content__container-btn">
        <button className="content__btn-more-post" onClick={nextPage}>
          Ver mas Personas
        </button>
      </div>
    </>
  )
}
