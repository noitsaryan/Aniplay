'use client'
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

function Paragraph({ content }: { content: string }) {
    const maxWords = 80;
    const [showFullContent, setShowFullContent] = useState(false);

    const words = content.split(' ');

    const displayContent = showFullContent ? content : words.slice(0, maxWords).join(' ');

    return (
        <div>
            <p>{displayContent}</p>
            {words.length > maxWords && (
                <span
                    className='flex items-center gap-1 text-sm font-bold text-secondary cursor-pointer'
                    onClick={() => setShowFullContent((prev) => !prev)}
                >
                    {showFullContent ? <FaMinus /> : <FaPlus />} {showFullContent ? 'Read Less' : 'Read More'}
                </span>
            )}
        </div>
    );
}

export default Paragraph;
