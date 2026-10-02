import { useEffect } from "react";

export const useTracking = () => {
  // Visitor Tracking
  useEffect(() => {
    // Define init_tracer before loading the script
    if (typeof window.init_tracer !== "function") {
      window.init_tracer = function() {
        console.log("init_tracer called (fallback implementation)");
      };
    }

    const loadVisitorTracking = () => {
      if (document.querySelector('script[src*="tracer.js"]')) {
        return; // Already loaded
      }

      const script = document.createElement('script');
      script.src = 'https://app.visitortracking.com/assets/js/tracer.js';
      script.async = true;
      
      script.onload = () => {
        if (window.Tracer) {
          try {
            new window.Tracer({
              websiteId: "602b7bf4-bb33-492b-a037-185a600b5912",
              async: true,
              debug: false,
            });
          } catch (error) {
            console.warn("Failed to initialize Visitor Tracking:", error);
          }
        }
      };

      script.onerror = () => {
        console.warn("Failed to load Visitor Tracking script");
      };

      document.head.appendChild(script);
    };

    loadVisitorTracking();
  }, []);

  // Google Analytics
  useEffect(() => {
    const loadGoogleAnalytics = () => {
      if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        return; // Already loaded
      }

      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-LWF9Z8NQGN';
      script.async = true;
      
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag; // Make gtag globally available
        gtag("js", new Date());
        gtag("config", "G-LWF9Z8NQGN");
      };

      script.onerror = () => {
        console.warn("Failed to load Google Analytics script");
      };

      document.head.appendChild(script);
    };

    loadGoogleAnalytics();
  }, []);

  // Facebook Pixel — lazy load on user interaction
  useEffect(() => {
    let isLoaded = false;

    const loadFBPixel = () => {
      if (isLoaded || document.querySelector('script[src*="connect.facebook.net"]')) {
        return; // Already loaded
      }

      isLoaded = true;
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.async = true;
      
      script.onload = () => {
        if (!window.fbq) {
          window.fbq = function () {
            window.fbq.callMethod
              ? window.fbq.callMethod.apply(window.fbq, arguments)
              : window.fbq.queue.push(arguments);
          };
          if (!window._fbq) window._fbq = window.fbq;
          window.fbq.push = window.fbq;
          window.fbq.loaded = true;
          window.fbq.version = "2.0";
          window.fbq.queue = [];
        }
        window.fbq("init", "627783176375719");
        window.fbq("track", "PageView");
      };

      script.onerror = () => {
        console.warn("Failed to load Facebook Pixel script");
        isLoaded = false; // Reset flag to allow retry
      };

      document.head.appendChild(script);
    };

    const handleInteraction = () => {
      loadFBPixel();
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);
};