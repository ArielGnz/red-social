import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export default function PublicationLayout() {
  return (
    <>
        <Header />

        <section className='layout__content'> 
            <Outlet />
        </section>
    </>
  )
}
