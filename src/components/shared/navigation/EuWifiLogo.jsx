import { LazyLoadImage } from "react-lazy-load-image-component";
import useDynamicImages from "@/hooks/useDynamicImages";

/**
 * The EU Wifi brand mark, in one place.
 *
 * Replaces the Yoowifi `LogoIcon` SVG in the header and `others/red-logo` in
 * the footer. Those took a colour prop because the Yoowifi mark was a
 * single-path SVG tinted white or red per surface; this logo is a fixed
 * multi-colour artwork, so the callers' light/dark branching no longer applies
 * and the same file is used everywhere.
 *
 * It is legible on both the white header and the black footer — the white
 * "eu" and gold "wifi" carry it — but the navy field around them does flatten
 * against black. If a knockout version is ever supplied, swap it in here and
 * every surface picks it up.
 */
export default function EuWifiLogo({ className = "h-11 w-auto" }) {
  const logo = useDynamicImages("others", "eu-logo");

  return (
    <LazyLoadImage
      src={logo}
      alt="EU Wifi"
      title="EU Wifi"
      className={className}
    />
  );
}
