// Garuda app — standalone deploy or iframe embed
export const GARUDA_ORIGIN = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://garuda.yoowifi.com";

export const GARUDA_BASE = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://garuda.yoowifi.com";

// True when this garuda build is running inside the urwifi iframe.
// Detected at runtime: garuda is always exactly one level deep inside an iframe.
// We can't read window.top.location (cross-origin), but we CAN check nesting depth.
// Payment iframes inside the garuda embed are 2+ levels deep, so parent !== top.
export const IS_EMBED_MODE = (() => {
  try {
    if (window.self === window.top) return false; // top-level, not embedded
    if (window.parent !== window.top) return false; // 2+ levels deep = payment iframe
    return true; // exactly one level deep = intentional garuda embed
  } catch {
    return false;
  }
})();

const API_BASE_URL = import.meta.env.DEV
  ? "/api" // Vite proxy in dev
  : "https://coreapi.yoowifi.com"; // Full API URL in preview/prod

// Video server base URL
export const VIDEO_BASE_URL = "https://crm.yoowifi.com:8443/public/anaVideos";

// Marketplace orders base URL
const MP_BASE_URL = "https://coreapi.yoowifi.com";

// Payment Link
const PL_BASE_URL = "https://coreapi.yoowifi.com";

// CRM Jane API (ANA stats, etc.) — dev uses Vite proxy to avoid CORS
const CRM_JANE_BASE = import.meta.env.DEV
  ? "/crm-jane"
  : "https://crm.yoowifi.com:8443/jane";

export const modulesURLPath = {
  Payment: {
    pay3ds: `${API_BASE_URL}/payment-services/payments/process/payment-session-3ds`,
    // pay3ds: `${API_BASE_URL}/payment-services/payments/process/payment-3ds`,
    paynon3ds: `${API_BASE_URL}/payment-services/payments/process/payment-session`,
    getPgw: `${API_BASE_URL}/payment-services/payments/get-pgw`,
  },
  Order: {
    placeOrder: `${API_BASE_URL}/yw-services/api/order`,
    placePlanOrder: `${API_BASE_URL}/yw-services/api/order/plan`,
  },
  charges: {
    orderCharges: `${API_BASE_URL}/yw-services/api/order/charges`,
    plancharges: `${API_BASE_URL}/yw-services/api/order/plan/charges`,
  },
  MpOrder: {
    getOrder: (orderId) =>
      `${MP_BASE_URL}/yw-services/api/mp/orders/${encodeURIComponent(orderId)}`,
    processOrder: `${MP_BASE_URL}/yw-services/api/mp/order/process-order`,
  },
  PaymentLink: {
    getOrder: (orderId) =>
      `${PL_BASE_URL}/yw-services/api/plink/order/${encodeURIComponent(orderId)}`,
  },
  Jane: {
    getAnaStats: `${CRM_JANE_BASE}/getAnaStats`,
  },
};
