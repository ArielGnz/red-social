import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';

import { UserList } from './UserList';

export const Peopel = () => {

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

  return (

    <>
      <header className="flex">
        <h1 className="mx-auto font-semibold text-gray-600 text-2xl mt-[85px]">USUARIOS</h1>

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
