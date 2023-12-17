'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

function Search() {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/search?query=${search}`)
    }
    return (
        <div className='cursor-pointer' ref={searchRef}>
            <form onSubmit={handleSubmit}>
                <input type="text" className={`${isOpen ? 'block' : 'hidden'} border px-4 py-2 rounded-full border-primary text-primary w-full max-w-[250px] ml-3`} placeholder='Search Anime' onChange={(e) => setSearch(e.target.value)} />
            </form>
            <CiSearch size={30} className={`${isOpen ? 'hidden' : 'block'} text-primary`} onClick={() => setIsOpen(prev => !prev)} />
        </div>
    )
}

export default Search;
