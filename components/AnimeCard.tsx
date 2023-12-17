import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react'
import AnimeCardLoader from './AnimeCardLoader';

export type DataType = {
  id: string,
  title: string;
  type: string,
  poster: string
}

function AnimeCard({ data }: { data: DataType }) {
  return (
    <Link href={`/info/${data.id.slice(1)}`}>
      <Suspense fallback={<AnimeCardLoader/>}>
        <div className='transition-all hover:brightness-75 relative'>
          <div className='cursor-pointer'>
            <Image src={data.poster} alt='poster-image' priority width={300} height={300} className='aspect-[3/4] rounded-xl object-cover' />
          </div>
          <div className='absolute bottom-0 rounded-bl-xl rounded-br-xl w-full p-2  bg-secondary '>
            <h1 className='font-bold text-white '> {data.title} </h1>
          </div>
        </div>
      </Suspense>
    </Link>
  )
}

export default AnimeCard