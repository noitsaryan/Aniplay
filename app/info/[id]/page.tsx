import { details } from '@/actions/anime.actions';
import Paragraph from '@/components/Paragraph';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type DetailType = {

    id: string,
    image: string,
    title: string,
    description: string,
    details: {
        type: string, PG: string, duration: string
    }
}

async function page(props: { params: { [key: string]: string } }) {
    const { id } = props.params;
    const data: DetailType = await details(id)
    return (
        <main className='flex flex-col items-center py-8'>
            <Image src={data.image} alt='' width={200} height={300} priority className='rounded-xl filter drop-shadow-3xl' />
            <div className='border shadow-xl z-50 max-w-sm my-8 p-4 bg-white/20 filter rounded-3xl space-y-4'>
                <h1 className='text-center font-bold text-2xl   text-primary '> {data.title} </h1>
                <div className='flex items-center gap-5 justify-center text-white'>
                    <p className='bg-blue-400 px-4 rounded-full'> {data.details.type} </p>
                    <p className='bg-primary px-4 rounded-full'> {data.details.PG} </p>
                    <p className='bg-secondary px-4 rounded-full'> {data.details.duration} </p>
                </div>
                <div className='flex items-center justify-center w-full'>
                    <Link href={`/watch/${data.id}?prev=0&next=50`} className='bg-primary hover:brightness-75 transition-all  text-white px-4 py-2 font-bold rounded-full w-full text-center '>Watch Now</Link>
                </div>
                <Paragraph content={data.description} />
            </div>
        </main>
    )
}

export default page