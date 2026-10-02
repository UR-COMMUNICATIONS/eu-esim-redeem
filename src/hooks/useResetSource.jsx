import { useEffect } from "react";
import { APP_SOURCE } from "@/constants/app";

// Single-brand app: every page books accounts and orders under one source,
// whatever domain or path it is served from.
const useResetSource = () => {
  useEffect(() => {
    sessionStorage.setItem("source", APP_SOURCE);
  }, []);
};

export default useResetSource;
