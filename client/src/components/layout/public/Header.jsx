import React from 'react'
import { Nav } from './Nav'

export const Header = () => {

    return (
        
        <header className="bg-blue-500 layout__navbar">

            <div className="navbar__header">
                <a href="#" className="navbar__title">REACTSOCIAL</a>
            </div>

            <Nav />

        </header>
    )
}
