import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GARUDA_ORIGIN, GARUDA_BASE } from "@/constants/urls";

export default function GarudaEmbed() {
  const navigate = useNavigate();
  const location = useLocation();
  const iframeRef = useRef();

  // Compute initial src once — never update it after mount so the iframe
  // doesn't reload when the parent URL changes due to postMessage navigation.
  const initialSrc = useRef(null);
  if (initialSrc.current === null) {
    const subPath = location.pathname.replace(/^\/garuda/, "") || "/";
    initialSrc.current = `${GARUDA_BASE}${subPath}${location.search}`;
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.origin !== GARUDA_ORIGIN) return;
      if (e.data?.type !== "GARUDA_NAVIGATE") return;
      const sub = e.data.path === "/" ? "" : e.data.path;
      navigate(`/garuda${sub}`, { replace: true });
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate]);

  return (
    <iframe
      ref={iframeRef}
      src={initialSrc.current}
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        display: "block",
      }}
      title="Garuda eSIM"
    />
  );
}
