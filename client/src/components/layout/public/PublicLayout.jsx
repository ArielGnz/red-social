import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <div>
      
      <Header />

      <section className='layout__content'>
        <Outlet />
      </section>
    </div>
  )
}

export default PublicLayout
