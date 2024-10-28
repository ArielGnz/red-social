import React from 'react'
import { Nav } from './Nav'

export const Header = () => {

    return (
        
        <header className="w-full flex justify-between items-center bg-violet-500 h-[50px] lg:fixed z-10">
            
            <div>
                <a className="mx-4 font-medium text-gray-200 hover:text-white">REACTSOCIAL</a>
            </div>

            <div>
                <Nav />
            </div>
            
        </header>
    )
}
