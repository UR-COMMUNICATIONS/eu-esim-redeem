
import React, { Suspense } from 'react';
import BlurImage from "./BlurImage";
// import { Blurhash } from "react-blurhash";

function SimpleSkeleton() {  // Using Tailwind CSS (simple custom skeleton)
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
}

function ImageSkeleton() {  //  For Images (Skeleton with aspect ratio)
  return (
    <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
  );
}


function CardSkeleton() {  //  Combined Skeleton (Image + Text)
  return (
    <div className="w-full max-w-sm rounded-lg border p-4 shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="h-40 w-full bg-gray-300 rounded-md mb-4"></div>

      {/* Title Placeholder */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Subtitle/Description Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );

  // fallback={
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //     {Array.from({ length: 6 }).map((_, i) => (
  //       <CardSkeleton key={i} />
  //     ))}
  //   </div>
  // }
}

function ImageWithBlur() {  //  Blur Placeholder for Images (Optional)
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="relative w-full h-40 rounded-md overflow-hidden">
      {!loaded && (
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <img
        src="/real-image.jpg"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"
          }`}
        onLoad={() => setLoaded(true)}
        alt="..."
      />
    </div>
  );
}



function ProductCardSkeleton() {  //  Professional Product Card Skeleton (Image + Text + Buttons + Ratings)
  return (
    <div className="w-full max-w-sm rounded-xl border p-4 shadow-md animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 w-full bg-gray-300 rounded-lg mb-4"></div>

      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>

      {/* Rating Stars */}
      <div className="flex gap-2 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-300 rounded-full"></div>
        ))}
      </div>

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  // fallback={
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //     {Array.from({ length: 6 }).map((_, i) => (
  //       <ProductCardSkeleton key={i} />
  //     ))}
  //   </div>
  // }
}


function FeedSkeleton() {  //  Facebook/YouTube Style Feed Skeleton  
  return (
    <div className="w-full rounded-xl border p-4 shadow-md animate-pulse">
      {/* Header (Profile + Name) */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      {/* Content text */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>

      {/* Image/Video */}
      <div className="h-56 w-full bg-gray-300 rounded-lg mb-4"></div>

      {/* Actions */}
      <div className="flex justify-around">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  //  fallback={
  //   <div className="space-y-6">
  //     {Array.from({ length: 4 }).map((_, i) => (
  //       <FeedSkeleton key={i} />
  //     ))}
  //   </div>
  // }
}


function ProductCardSkeleton() {  //  ProductCard with BlurImage
  return (
    <div className="w-full max-w-sm rounded-xl border p-4 shadow-md animate-pulse">
      <div className="h-48 w-full bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="flex gap-2 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-300 rounded-full"></div>
        ))}
      </div>
      <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
      <div className="flex gap-3">
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}



function ProductCard({ product }) { //  ProductCard with BlurImage
  return (
    <div className="w-full max-w-sm rounded-xl border p-4 shadow-md">
      <BlurImage src={product.image} alt={product.title} className="h-48 w-full mb-4" />
      <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
      <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
      <p className="text-xl font-bold mb-3">${product.price}</p>
      <div className="flex gap-3">
        <button className="bg-gray-800 text-white rounded-lg px-4 py-2 flex-1">
          Add to Cart
        </button>
        <button className="bg-gray-200 rounded-lg px-4 py-2 flex-1">
          Details
        </button>
      </div>
    </div>
  );

  // fallback={
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //     {Array.from({ length: 6 }).map((_, i) => (
  //       <ProductCardSkeleton key={i} />
  //     ))}
  //   </div>
  // }
}


function FeedSkeleton() { //  Facebook/YouTube Feed Skeleton + Blur Image
  return (
    <div className="w-full rounded-xl border p-4 shadow-md animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="h-56 w-full bg-gray-300 rounded-lg mb-4"></div>
      <div className="flex justify-around">
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

import BlurImage from "./BlurImage";

function FeedCard({ post }) {
  return (
    <div className="w-full rounded-xl border p-4 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={post.userAvatar}
          alt={post.userName}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{post.userName}</h3>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="mb-3">{post.content}</p>
      <BlurImage src={post.image} alt="post" className="h-56 w-full mb-4" />
      <div className="flex justify-around text-sm text-gray-600">
        <button>Like</button>
        <button>Comment</button>
        <button>Share</button>
      </div>
    </div>
  );
}




function Skeletons() {

  return (
    <>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        }
      >
      </Suspense>


      <Suspense
        fallback={
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <FeedSkeleton key={i} />
            ))}
          </div>
        }
      >
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
      </Suspense>


      <Suspense
        fallback={
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <FeedSkeleton key={i} />
            ))}
          </div>
        }
      >
      </Suspense>

    </>

  );
}

export default Skeletons;


