import Link from 'next/link'
import React from 'react'
import Search from './Search';

function Header() {
    return (
        <nav className='flex items-center justify-between px-8 py-2 '>
            <Link href="/" className='font-bold text-3xl text-primary'> Aniplay </Link>
            <Search />
        </nav>
    )
}

export default Header