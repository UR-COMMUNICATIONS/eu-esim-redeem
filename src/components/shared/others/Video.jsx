import React from "react";

/**
 * Generic responsive video component
 * Supports both local video files and YouTube embeds
 *
 * @param {string} src - Video source (local file path or YouTube embed URL)
 * @param {string} title - Video title for accessibility
 * @param {string} className - Additional CSS classes
 * @param {object} videoProps - Additional props for video element (controls, autoplay, etc.)
 */
const Video = ({
  src,
  title = "Video player",
  className = "",
  videoProps = {},
  ...props
}) => {
  // Check if it's a YouTube URL
  const isYouTube = src?.includes("youtube.com") || src?.includes("youtu.be");

  // Default responsive classes
  const defaultClasses =
    "w-full h-[200px] sm:h-[255px] md:h-[505px] lg:h-full rounded-xl md:rounded-3xl";

  if (isYouTube) {
    // Handle YouTube embeds
    return (
      <iframe
        width="560"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={`${defaultClasses} ${className}`}
        {...props}
      />
    );
  }

  // Handle local video files
  return (
    <video
      src={src}
      title={title}
      className={`${defaultClasses} ${className}`}
      controls
      playsInline
      {...videoProps}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
