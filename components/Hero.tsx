import { home } from '@/actions/anime.actions'
import React from 'react'
import AnimeCard from './AnimeCard';
import Image from 'next/image';

async function Hero() {
    const homeData = await home();
    return (
        <main>
            <div className='flex flex-col gap-8 items-center justify-center py-8'>
                <Image src="/main.png" alt='main-hero-image' width={350} height={350} priority className='filter drop-shadow-3xl drop' />
                <h1 className='font-semibold text-2xl max-w-sm text-center text-primary uppercase'>Binge your favourites.</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 gap-4'>
                {
                    homeData && homeData.map((e, i) => (
                        <AnimeCard key={i} data={e} />
                    ))
                }
            </div>
        </main>
    )
}

export default Hero