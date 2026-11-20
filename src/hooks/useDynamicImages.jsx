import placeholderImg from "@/assets/images/others/dummy.webp";
import { useEffect, useState } from "react";

// Only the folders the EU flow looks images up in by name. Vite emits every
// file a glob matches, so keep these narrow.
const allImages = {
  ...import.meta.glob("@/assets/images/others/*.{png,jpg,webp}"),
  ...import.meta.glob("@/assets/images/country-coverage/*.{png,jpg,webp}"),
  ...import.meta.glob("@/assets/images/esim-redeem/*.{png,jpg,webp}"),
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
