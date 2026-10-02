// LazyWrapper.js
import React, { Suspense } from 'react';

// Fconst Hero = React.lazy(() => import("@/components/commercial/home/Hero"));
export default function LazyBanner({ children, fallback = null }) {
    return (
        <Suspense fallback={fallback ?? <div>Loading...</div>}>
            {children}
        </Suspense>
    );
}


// const AboutPage = loadable(() => import('./pages/AboutPage'));
// export default function LazyBanner(importFunc, fallback = null) {
//     const Component = React.lazy(importFunc);

//     return (props) => (
//         <Suspense fallback={fallback ?? <div>Loading...</div>}>
//             <Component {...props} />
//         </Suspense>
//     );
// }
