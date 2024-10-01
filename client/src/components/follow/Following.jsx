import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { UserList } from '../user/UserList';

export const Following = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});


  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (nextPage = 1) => {

    const userId = params.userId;

    const request = await fetch(Global.url + 'follow/following/' + userId + '/' + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    let cleanUsers = [];
    data.follows.forEach(follow => {
      cleanUsers = [...cleanUsers, follow.followed]
    });

    data.users = cleanUsers;


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

  const getProfile = async () => {

    const request = await fetch(Global.url + 'user/profile/' + params.userId , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status == "success"){
      setUserProfile(data.user)
    }
  }


  return (
    <>
      <header className="content__header">
        <h1 className="content__title">USUARIOS QUE SIGU "USER"</h1>

      </header>

      <UserList users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        more={more}
        page={page}
        setPage={setPage}
      />


      <br />
    </>
  )
}
