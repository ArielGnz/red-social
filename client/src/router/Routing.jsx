import React from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import PublicLayout from '../components/layout/public/PublicLayout';
import Register from '../components/user/Register';
import { Login } from '../components/user/Login';

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PublicLayout />}>
              <Route index element={<Login />} />
              <Route path='login' element={<Login />} />
              <Route path='registro' element={<Register />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing;
