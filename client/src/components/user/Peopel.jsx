import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png'
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

  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  }

  

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>

      </header>

      <UserList users={users} 
                setUsers={setUsers} 
                following={following}
                setFollowing={setFollowing}
                
      />

      
      <br />
    </>
  )
}
