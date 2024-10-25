import React from 'react'
import { Nav } from './Nav'

export const Header = () => {

    return (

        <header className="w-full flex justify-between items-center bg-blue-500 h-[50px] lg:fixed">

            <div>
                <a className="mx-4 font-medium">REACTSOCIAL</a>
            </div>

            <Nav />

        </header>
    )
}
