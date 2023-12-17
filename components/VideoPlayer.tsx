'use client'
import { streamingLinks } from '@/actions/anime.actions'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
});

function VideoPlayer({ videoId, id }: { videoId: string, id: string }) {
    const [data, setData] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const stream = await streamingLinks(`${id}?ep=${videoId}`, "sub");
            setData(stream.data.sources[0].url);
        } catch (error) {
            console.error("Error fetching streaming links:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [videoId]);

    return (
        <div className='w-full aspect-w-16 aspect-h-9 my-8 '>
            {data && (
                <ReactPlayer
                    url={data}
                    controls
                    width="100%"
                    height="100%"
                    style={{ margin: "0 auto" }}
                    playing
                    fallback={<div className='w-full aspect-w-16 aspect-h-9 bg-primary animate-pulse'></div>}
                />
            )}
        </div>
    );
}

export default VideoPlayer;
