import React from 'react'
import { Nav } from './Nav'

export const Header = () => {

    return (

        <header className='flex justify-between items-center h-[60px] w-full m-auto mt-0 border-slate-800 lg:fixed bg-violet-500 z-10'>

            <div>
                <a className="mx-4 font-medium text-gray-200 hover:text-white">REACTSOCIAL</a>
            </div>

            <Nav />

        </header>
    )
}
