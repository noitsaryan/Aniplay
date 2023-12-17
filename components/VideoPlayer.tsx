'use client'
import { streamingLinks } from '@/actions/anime.actions'
import React, { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
});

function VideoPlayer({ videoId, id }: { videoId: string, id: string }) {
    const [data, setData] = useState([])
    const fetchData = async () => {
        const stream = await streamingLinks(`${id}?ep=${videoId}`, "sub");
        setData(stream.data.sources[0].url)
    }
    useEffect(() => {
        fetchData();
    }, [videoId])
    return (
        <>
            <Suspense fallback={<div className='aspect-video max-w-[550px] bg-primary animate-pulse'></div>} >
                <ReactPlayer url={data} controls style={{ aspectRatio: 16 / 9, maxWidth: "500px", margin: "0 auto" }} />
            </Suspense>
        </>
    )
}

export default VideoPlayer