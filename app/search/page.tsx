import { search } from '@/actions/anime.actions'
import AnimeCard, { DataType } from '@/components/AnimeCard';
import React from 'react'

async function page(props: { searchParams: { [key: string]: string } }) {
    const data = await search(props.searchParams.query);
    return (
        <main>
            <h1 className='text-xl font-bold mx-4 text-primary  mt-8 mb-2'> Search Results :  </h1>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 gap-4'>
                {
                    data && data.map((e: DataType, i: any) => (
                        <AnimeCard key={i} data={e} />
                    ))
                }
            </div>
        </main>
    )
}

export default page