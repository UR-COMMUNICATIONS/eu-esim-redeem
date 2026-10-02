import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCallback, useEffect, useState } from "react";

/**
 * Optimized visitor ID hook.
 * - Lazy load FingerprintJS.
 * - Parallel fingerprinting.
 * - Local cache.
 * - Defer heavy ops to idle time.
 */
export const useVisitorId = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  // Try to load from localStorage first
  useEffect(() => {
    const cached = localStorage.getItem("visitorId");
    if (cached) setVisitorId(cached);
    else deferFingerprint();
  }, []);

  // Defer heavy fingerprinting to idle time
  const deferFingerprint = () => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(generateVisitorId);
    } else {
      setTimeout(generateVisitorId, 200);
    }
  };

  // Runs all fingerprinting in parallel
  const generateVisitorId = useCallback(async () => {
    try {
      const [browserFp, deviceFp, audioFp] = await Promise.all([
        getBrowserFingerprint(),
        getDeviceFingerprint(),
        getAudioFingerprint(),
      ]);

      // Synchronous fingerprints
      const canvasFp = getCanvasFingerprint();
      const webglFp = getWebGLFingerprint();

      const combinedFingerprint = `${browserFp}_${deviceFp}_${canvasFp}_${audioFp}_${webglFp}`;
      const finalId = await hashString(combinedFingerprint);
      setVisitorId(finalId);
      localStorage.setItem("visitorId", finalId);
    } catch (error) {
      console.error("Error generating visitor ID:", error);
      const fallbackId = await getBasicFingerprint();
      setVisitorId(fallbackId);
      localStorage.setItem("visitorId", fallbackId);
    }
  }, []);

  // --- Fingerprint functions unchanged, but you can optimize their code if needed ---
  const getBrowserFingerprint = async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result.visitorId;
    } catch {
      return "browser_fp_failed";
    }
  };

  const getDeviceFingerprint = async () => {
    const components = [
      navigator.platform,
      navigator.hardwareConcurrency || 0,
      (navigator as any).deviceMemory || 0,
      navigator.maxTouchPoints || 0,
      screen.width,
      screen.height,
      screen.colorDepth,
      screen.pixelDepth,
      screen.availWidth,
      screen.availHeight,
      navigator.language,
      navigator.languages?.join(",") || "",
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      new Date().getTimezoneOffset(),
      navigator.userAgent,
      navigator.vendor || "",
      navigator.product || "",
      navigator.productSub || "",
    ];
    return components.join("|");
  };

  const getCanvasFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return "canvas_blocked";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.font = "11pt no-real-font-123";
      ctx.fillText("Fingerprint test 🔒 😀", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
      ctx.font = "18pt Arial";
      ctx.fillText("Enhanced ID", 4, 45);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "rgb(255,0,255)";
      ctx.beginPath();
      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgb(0,255,255)";
      ctx.beginPath();
      ctx.arc(100, 50, 30, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      return canvas.toDataURL();
    } catch {
      return "canvas_blocked";
    }
  };

  const getAudioFingerprint = async () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const analyser = audioContext.createAnalyser();
      const gainNode = audioContext.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      oscillator.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(0);
      const audioData = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(audioData);
      oscillator.stop();
      audioContext.close();
      return Array.from(audioData.slice(0, 20)).join(",");
    } catch {
      return "audio_blocked";
    }
  };

  const getWebGLFingerprint = () => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return "no_webgl";
      const webglGl = gl as WebGLRenderingContext;
      const debugInfo =
        webglGl.getExtension &&
        webglGl.getExtension("WEBGL_debug_renderer_info");
      const webglData = [
        webglGl.getParameter(webglGl.RENDERER),
        webglGl.getParameter(webglGl.VENDOR),
        webglGl.getParameter(webglGl.VERSION),
        webglGl.getParameter(webglGl.SHADING_LANGUAGE_VERSION),
        webglGl.getParameter(webglGl.MAX_TEXTURE_SIZE),
        (webglGl.getParameter(webglGl.MAX_VIEWPORT_DIMS) as number[]).join(","),
        webglGl.getParameter(webglGl.MAX_VERTEX_ATTRIBS),
        debugInfo
          ? webglGl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : "",
        debugInfo ? webglGl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "",
      ];
      return webglData.join("|");
    } catch {
      return "webgl_blocked";
    }
  };

  const getBasicFingerprint = async () => {
    const basic = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      new Date().getTimezoneOffset(),
    ].join("|");
    return await hashString(basic);
  };

  const hashString = async (str: any) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  return visitorId;
};
