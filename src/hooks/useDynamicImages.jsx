// import { useEffect, useState } from "react";

// // Preload all possible images
// const collaborators = import.meta.glob("@/assets/images/collaborators/*.{png,jpg,webp}");
// const countryCoverage = import.meta.glob("@/assets/images/country-coverage/*.{png,jpg,webp}");
// const indicators = import.meta.glob("@/assets/images/indicators/*.{png,jpg,webp}");
// const regions = import.meta.glob("@/assets/images/regions/*.{png,jpg,webp}");
// const others = import.meta.glob("@/assets/images/others/*.{png,jpg,webp}");
// const fsimBanner = import.meta.glob("@/assets/images/fsim-banner/*.{png,jpg,webp}")
// const anaxBanner = import.meta.glob("@/assets/images/anax-banner/*.{png,jpg,webp}")
// const allImages = { ...collaborators, ...countryCoverage, ...indicators, ...regions, ...others, ...fsimBanner, ...anaxBanner}
// // const allImages = import.meta.glob("@/assets/images/**/*.{png,jpg,webp}");

// // const imagePaths = {
// //     "banner": "/src/assets/images/banner/",
// //     "images": "/src/assets/images/",
// //     "collaborators": "/src/assets/images/collaborators/",
// //     "country-coverage": "/src/assets/images/country-coverage/"
// // }

// const useDynamicImages = (imgPath, imgName, ext = "webp") => {
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         if (!imgName) return;
//         let mounted = true;

//         // Construct the key Vite uses (important: absolute-like path)
//         const fullPath = `/src/assets/images/${imgPath}/${imgName}.${ext}`;
//         // console.log("path", fullPath);

//         if (allImages[fullPath]) {
//             allImages[fullPath]()
//                 .then((mod) => {
//                     if (mounted) setImage(mod.default);
//                 })
//                 .catch((err) => {
//                     console.error(`Error loading image ${imgName}.${ext}:`, err);
//                 });
//         } else {
//             console.error("Image not found:", fullPath);
//             setImage(null);
//         }

//         return () => {
//             mounted = false;
//         };
//     }, [imgPath, imgName, ext]);

//     return image;

//     // const LazyImage = useMemo(() => {
//     //     if (!imgName) {
//     //         console.warn(`Image ${imgName} not found.`);
//     //         return null;
//     //     }
//     //     try {
//     //         // return lazy(() =>
//     //         //     importer()
//     //         //         .then((mod) => ({ default: mod.default || mod }))
//     //         //         .catch((err) => {
//     //         //             console.error(`Error while loading module ${computedPath}:`, err);
//     //         //             // Re-throw error so React.lazy can handle it.
//     //         //             throw err;
//     //         //         })
//     //         // );

//     //         return lazy(() =>
//     //             import(`@assets/images/${imgName}.${ext}`)
//     //                 .then((mod) => mod.default || mod
//     //                     // if (mounted) setImage(mod.default);
//     //                 )
//     //                 .catch((err) => {
//     //                     console.error(`Error loading image ${imgName}.${ext}:`, err);
//     //                     if (mounted) setImage(null);
//     //                 })
//     //         );
//     //     }
//     //     catch (error) {
//     //         console.error(
//     //             `Unexpected error creating lazy component for ${imgName}:`,
//     //             error
//     //         );
//     //         return null;
//     //     }
//     // }, [imgName]);

//     // return LazyImage;
// };

// export default useDynamicImages;

import placeholderImg from "@/assets/images/others/dummy.webp";
import { useEffect, useState } from "react";

const collaborators = import.meta.glob(
  "@/assets/images/collaborators/*.{png,jpg,webp}",
);
const countryCoverage = import.meta.glob(
  "@/assets/images/country-coverage/*.{png,jpg,webp}",
);
const indicators = import.meta.glob(
  "@/assets/images/indicators/*.{png,jpg,webp}",
);
const regions = import.meta.glob("@/assets/images/regions/*.{png,jpg,webp}");
const others = import.meta.glob("@/assets/images/others/*.{png,jpg,webp}");
const fsimBanner = import.meta.glob(
  "@/assets/images/fsim-banner/*.{png,jpg,webp}",
);
const anaxBanner = import.meta.glob(
  "@/assets/images/anax-banner/*.{png,jpg,webp}",
);
const landingPage = import.meta.glob(
  "@/assets/images/landing-page/*.{png,jpg,webp}",
);
const raya = import.meta.glob("@/assets/images/raya/*.{png,jpg,webp}");
const travelAgency = import.meta.glob(
  "@/assets/images/TravelAgency/*.{png,jpg,webp}",
);
const productRouters = import.meta.glob(
  "@/assets/images/product-routers/*.{png,jpg,webp}",
);
const banner = import.meta.glob("@/assets/images/banner/*.{png,jpg,webp}");
const welcomeCredit = import.meta.glob(
  "@/assets/images/welcome-credit/*.{png,jpg,webp}",
);
const esimRedeem = import.meta.glob(
  "@/assets/images/esim-redeem/*.{png,jpg,webp}",
);

const allImages = {
  ...collaborators,
  ...countryCoverage,
  ...indicators,
  ...regions,
  ...others,
  ...fsimBanner,
  ...anaxBanner,
  ...landingPage,
  ...raya,
  ...travelAgency,
  ...productRouters,
  ...banner,
  ...welcomeCredit,
  ...esimRedeem,
};

const useDynamicImages = (imgPath, imgName, ext = "webp") => {
  const [image, setImage] = useState(placeholderImg);

  useEffect(() => {
    if (!imgName) return;

    let mounted = true;
    const fullPath = `/src/assets/images/${imgPath}/${imgName}.${ext}`;

    if (allImages[fullPath]) {
      allImages[fullPath]()
        .then((mod) => {
          if (mounted) setImage(mod.default);
        })
        .catch((err) => {
          console.error(`Error loading image ${imgName}.${ext}:`, err);
          if (mounted) setImage(placeholderImg);
        });
    } else {
      console.error("Image not found:", fullPath);
      setImage(placeholderImg);
    }

    return () => {
      mounted = false;
    };
  }, [imgPath, imgName, ext]);

  return image;
};

export default useDynamicImages;
