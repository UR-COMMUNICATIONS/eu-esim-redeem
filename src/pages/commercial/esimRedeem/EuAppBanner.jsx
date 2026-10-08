import useDynamicImages from "@/hooks/useDynamicImages";

/**
 * The "Download the EU Wifi App" band that closes both EU screens.
 *
 * Supplied as a single flattened artwork (copy, store badges and QR are all
 * baked into the image), so there is nothing to lay out here — it is rendered
 * full-bleed and scales with the viewport. If any of it ever needs to be
 * selectable, linkable or translated, it has to come back as markup first.
 */
export default function EuAppBanner({ alt = "" }) {
  const bannerImage = useDynamicImages("esim-redeem", "footer-image");

  return (
    <img
      src={bannerImage}
      alt={alt}
      className="w-full select-none object-cover"
    />
  );
}
