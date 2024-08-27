import React from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import PublicLayout from '../components/layout/public/PublicLayout';

export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PublicLayout/>}>

            </Route>
        </Routes>
    </BrowserRouter>
  )
}
