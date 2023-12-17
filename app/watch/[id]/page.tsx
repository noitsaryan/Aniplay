import { streamingId, streamingLinks } from '@/actions/anime.actions'
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';
import React from 'react'

type StreamType = {
    data: { link: string, number: number }[],
    success: boolean
}

async function page({ params, searchParams }: { params: { [key: string]: string }, searchParams: { [key: string]: string } }) {
    const { prev, next, videoId } = searchParams;
    const data: StreamType = await streamingId(params.id);
    return (
        <main>
            <div>
                {videoId && <VideoPlayer videoId={videoId} id={params.id} />}
            </div>
            <div className='border p-3 rounded-xl shadow-xl max-w-sm mx-auto space-y-3'>
                <h1> Total Episodes : {data.data.length}</h1>
                <div className='grid grid-cols-5   gap-2 '>
                    {
                        data.success && data.data.slice(parseFloat(prev), parseFloat(next)).map((e: any, i: number) => (
                            <Link href={`/watch/${params.id}?prev=${prev}&next=${next}&videoId=${e.link}`} key={i} className='bg-primary text-center text-white py-1 font-semibold rounded-md'>
                                {e.number}
                            </Link>
                        ))
                    }
                </div>
                <div className='flex items-center justify-between px-4'>
                    <Link className='bg-primary  px-6 py-1 text-white font-semibold rounded-full' href={`/watch/${params.id}?prev=${parseInt(prev) - 50 < 0 ? 0 : parseInt(prev) - 50}&next=${parseInt(next) - 50 < 50 ? 50 : parseInt(next) - 50}`}>Back</Link>
                    <Link className='bg-primary  px-6 py-1 text-white font-semibold rounded-full' href={`/watch/${params.id}?prev=${parseInt(prev) + 50}&next=${parseInt(next) + 50}`}>Next</Link>
                </div>
            </div>
        </main>
    )
}

export default page