import React from 'react'
import { Nav } from './Nav'

export const Header = () => {

    // className="bg-violet-500 w-full flex justify-between items-center h-[60px] lg:fixed z-10"
    // <div>
    //             <a className="mx-4 font-medium text-gray-200 hover:text-white">REACTSOCIAL</a>
    // </div>

    return (
        
        <header className='w-full m-auto mt-0 border-slate-800 lg:fixed bg-violet-500'> 
                <Nav />
        </header>
    )
}
