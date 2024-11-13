import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
import { UserList } from '../user/UserList';
import useAuth from '../../hooks/useAuth';
import { GetProfile } from '../../helpers/GetProfile';


export const Following = () => {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const { auth } = useAuth();
  const params = useParams();


  useEffect(() => {
    getUsers(1);
    GetProfile(params.userId, setUserProfile);
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


  return (
    <>
      <header className="flex">
        <h1 className="mx-auto font-semibold text-gray-600 text-2xl mt-[85px]">Usuarios que sigue {userProfile.name}</h1>
      </header>

      <UserList users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        more={more}
        page={page}
        setPage={setPage}
      />

    </>
  )
}
