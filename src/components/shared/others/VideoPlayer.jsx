import React from 'react';

const VideoPlayer = ({
    videoUrl = "https://www.youtube.com/embed/Vr9WoWXkKeE?si=HhDVOC3LF3MK2DE7", title
}) => {
    return (
        <iframe
            width="560"
            src={videoUrl} title={title || "YouTube video player"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
            className='w-full h-[200px] sm:h-[255px] md:h-[505px] lg:h-full rounded-xl md:rounded-3xl'
        ></iframe>
    );
};

export default VideoPlayer;
