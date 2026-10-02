import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PhoneInput from "../InstantEsim/PhoneInput";
import EsimModal from "../InstantEsim/EsimModal";

const IS_LOCAL = import.meta.env.DEV;

// Mock: each order has its own eSIMs that get "generated" on process
const MOCK_ORDERS = [
  {
    orderId: "ORD-1001",
    productName: "Japan 10GB - 30 Days eSIM",
    quantity: 2,
    esims: [
      {
        qrCode: "mock-qr-1a.png",
        planName: "Japan 10GB - 30 Days eSIM",
        iccid: "8901234567890123456",
        activationCode: "LPA:1$smdp.io$K2-2B6H-M4LTH",
        smdp: "smdp.io",
      },
      {
        qrCode: "mock-qr-1b.png",
        planName: "Japan 10GB - 30 Days eSIM",
        iccid: "8901234567890123457",
        activationCode: "LPA:1$smdp.io$J7-9F3K-R8QWP",
        smdp: "smdp.io",
      },
    ],
  },
  {
    orderId: "ORD-1002",
    productName: "Thailand 5GB - 15 Days eSIM",
    quantity: 1,
    esims: [
      {
        qrCode: "mock-qr-2a.png",
        planName: "Thailand 5GB - 15 Days eSIM",
        iccid: "8901234567890123458",
        activationCode: "LPA:1$smdp.io$N5-4D2X-T6YZB",
        smdp: "smdp.io",
      },
    ],
  },
  {
    orderId: "ORD-1003",
    productName: "Europe 20GB - 30 Days eSIM",
    quantity: 3,
    esims: [
      {
        qrCode: "mock-qr-3a.png",
        planName: "Europe 20GB - 30 Days eSIM",
        iccid: "8901234567890123459",
        activationCode: "LPA:1$smdp.io$A1-7G5M-W3RKL",
        smdp: "smdp.io",
      },
      {
        qrCode: "mock-qr-3b.png",
        planName: "Europe 20GB - 30 Days eSIM",
        iccid: "8901234567890123460",
        activationCode: "LPA:1$smdp.io$B3-8H6N-X4SLP",
        smdp: "smdp.io",
      },
      {
        qrCode: "mock-qr-3c.png",
        planName: "Europe 20GB - 30 Days eSIM",
        iccid: "8901234567890123461",
        activationCode: "LPA:1$smdp.io$C5-9J7P-Y5TMQ",
        smdp: "smdp.io",
      },
    ],
  },
];

const MockInstantEsim = () => {
  if (!IS_LOCAL) return <Navigate to="/" replace />;

  const { t } = useTranslation();
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState(null); // array of order objects with status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [countryCode, setCountryCode] = useState("+65");
  const [localNumber, setLocalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalEsims, setModalEsims] = useState(null);
  const [modalOrderId, setModalOrderId] = useState("");

  const steps = Array.from({ length: 5 }, (_, i) => ({
    title: t(`instantEsim.steps.items.${i}.title`),
    desc: t(`instantEsim.steps.items.${i}.desc`),
  }));

  const tips = Array.from({ length: 3 }, (_, i) =>
    t(`instantEsim.tips.items.${i}`),
  );

  const helpFeatures = Array.from({ length: 3 }, (_, i) =>
    t(`instantEsim.help.features.${i}`),
  );

  const handleSearch = () => {
    setError("");
    setOrders(null);
    setUserName("");
    setCountryCode("+65");
    setLocalNumber("");
    setEmail("");
    setAgreedToTerms(false);

    const trimmed = orderId.trim();
    if (!trimmed) {
      setError(t("instantEsim.errors.emptyOrderId"));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setOrders(
        MOCK_ORDERS.map((o) => ({
          ...o,
          status: "idle", // idle | processing | completed | error
          processedEsims: null,
        })),
      );
      setUserName("John Doe");
      setCountryCode("+65");
      setLocalNumber("8123 4567");
      setEmail("john.doe@example.com");
      setLoading(false);
    }, 800);
  };

  const handleProcessOrder = (index) => {
    if (
      !userName.trim() ||
      !localNumber.trim() ||
      !email.trim() ||
      !agreedToTerms
    )
      return;

    setOrders((prev) =>
      prev.map((o, i) => (i === index ? { ...o, status: "processing" } : o)),
    );

    // Simulate API call for this specific order
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o, i) =>
          i === index
            ? { ...o, status: "completed", processedEsims: o.esims }
            : o,
        ),
      );
      // Immediately open modal with this order's eSIMs
      const order = MOCK_ORDERS[index];
      setModalEsims(order.esims);
      setModalOrderId(order.orderId);
      setShowModal(true);
    }, 1200);
  };

  const handleViewEsims = (index) => {
    const order = orders[index];
    if (order.processedEsims) {
      setModalEsims(order.processedEsims);
      setModalOrderId(order.orderId);
      setShowModal(true);
    }
  };

  const canSubmit =
    orders &&
    userName.trim() &&
    localNumber.trim() &&
    email.trim() &&
    agreedToTerms;

  const completedCount = orders
    ? orders.filter((o) => o.status === "completed").length
    : 0;

  return (
    <div className="overflow-hidden w-full">
      {/* Mock Banner */}
      <div className="w-full bg-gradient-to-r from-main-600 to-main-600/80 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Mock Instant eSIM
        </h1>
        <p className="text-white/80 text-lg">
          Multi-order flow with individual eSIM processing
        </p>
      </div>

      {/* Welcome Section */}
      <div className="bg-white py-10 px-4 text-center border-b border-neutral-200">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[15px] text-neutral-600 leading-[160%] mb-3">
            {t("instantEsim.welcome.line1")}
          </p>
          <p className="text-[15px] text-neutral-600 leading-[160%] mb-3">
            {t("instantEsim.welcome.line2")}
          </p>
          <p className="text-base font-bold text-main-600 mt-4">
            {t("instantEsim.welcome.tagline")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[720px] mx-auto py-10 px-4 md:px-5">
        {/* Search Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6 border-t-[3px] border-main-600">
          <h2 className="text-[22px] font-bold text-neutral-900 mb-5 leading-[120%]">
            {t("instantEsim.form.title")}
          </h2>
          <p className="text-sm text-neutral-500 leading-[150%] mb-4 -mt-3">
            {t("instantEsim.form.subtitle")}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              {t("instantEsim.form.orderIdLabel")}
            </label>
            <input
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-main-600 focus:bg-white transition-colors font-dmsans"
              type="text"
              placeholder={t("instantEsim.form.orderIdPlaceholder")}
              maxLength={25}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {!orders && (
            <button
              className="w-full bg-main-600 text-white py-3.5 px-7 rounded-xl text-[15px] font-semibold hover:bg-main-600/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading
                ? t("instantEsim.form.searching")
                : t("instantEsim.form.findOrder")}
            </button>
          )}

          {error && (
            <p className="text-main-600 text-sm mt-3 font-medium">{error}</p>
          )}

          {/* User details form - shown once for all orders */}
          {orders && (
            <>
              <span className="inline-block bg-green-100 text-green-800 text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-4">
                {orders.length} {orders.length === 1 ? "order" : "orders"} found
              </span>

              {/* Orders summary table */}
              <table className="w-full border-collapse mt-2 mb-6">
                <thead>
                  <tr>
                    <th className="bg-neutral-900 text-white px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wider rounded-tl-xl">
                      Order ID
                    </th>
                    <th className="bg-neutral-900 text-white px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wider">
                      {t("instantEsim.form.productName")}
                    </th>
                    <th className="bg-neutral-900 text-white px-4 py-3 text-center text-[13px] font-semibold uppercase tracking-wider rounded-tr-xl">
                      {t("instantEsim.form.qty")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3.5 text-[13px] border-b border-neutral-100 text-neutral-500 font-mono">
                        {order.orderId}
                      </td>
                      <td className="px-4 py-3.5 text-[15px] border-b border-neutral-100 text-neutral-700 break-words">
                        {order.productName}
                      </td>
                      <td className="px-4 py-3.5 text-[15px] border-b border-neutral-100 text-neutral-700 text-center">
                        {order.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="border-neutral-200 my-6" />

              <div className="mb-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  {t("instantEsim.form.fullName")}
                </label>
                <input
                  className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-main-600 focus:bg-white transition-colors font-dmsans"
                  type="text"
                  placeholder={t("instantEsim.form.fullNamePlaceholder")}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  {t("instantEsim.form.phoneNumber")}
                </label>
                <PhoneInput
                  countryCode={countryCode}
                  onCountryChange={setCountryCode}
                  localNumber={localNumber}
                  onLocalChange={setLocalNumber}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  {t("instantEsim.form.emailAddress")}
                </label>
                <input
                  className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-main-600 focus:bg-white transition-colors font-dmsans"
                  type="email"
                  placeholder={t("instantEsim.form.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <p className="text-[13px] text-neutral-400 leading-[150%] mb-4">
                {t("instantEsim.form.privacyNote")}
              </p>

              <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-[18px] h-[18px] mt-0.5 accent-main-600 cursor-pointer"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span className="text-sm text-neutral-600 leading-[150%]">
                  {t("instantEsim.form.agreeTerms")}{" "}
                  <a
                    href="/terms-services"
                    className="text-main-600 font-medium hover:underline"
                  >
                    {t("instantEsim.form.termsAndConditions")}
                  </a>{" "}
                  {t("instantEsim.form.and")}{" "}
                  <a
                    href="/privacy-policy"
                    className="text-main-600 font-medium hover:underline"
                  >
                    {t("instantEsim.form.privacyPolicy")}
                  </a>
                </span>
              </label>
            </>
          )}
        </div>

        {/* Individual Order Cards */}
        {orders && (
          <div className="flex flex-col gap-4 mb-6">
            {completedCount > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800 font-medium">
                {completedCount} of {orders.length} orders processed
              </div>
            )}

            {orders.map((order, index) => (
              <div
                key={order.orderId}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border-l-4 transition-colors ${
                  order.status === "completed"
                    ? "border-green-500"
                    : order.status === "processing"
                      ? "border-amber-400"
                      : order.status === "error"
                        ? "border-red-500"
                        : "border-neutral-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-mono text-neutral-400">
                        {order.orderId}
                      </span>
                      {order.status === "completed" && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Completed
                        </span>
                      )}
                      {order.status === "processing" && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          <svg
                            className="w-3 h-3 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Processing...
                        </span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-bold text-neutral-900 mb-0.5">
                      {order.productName}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {order.quantity} eSIM{order.quantity > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {order.status === "idle" && (
                      <button
                        className="bg-main-600 text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold hover:bg-main-600/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                        onClick={() => handleProcessOrder(index)}
                        disabled={!canSubmit}
                      >
                        Generate eSIM
                      </button>
                    )}
                    {order.status === "processing" && (
                      <button
                        className="bg-neutral-200 text-neutral-500 py-2.5 px-5 rounded-xl text-[13px] font-semibold cursor-not-allowed whitespace-nowrap"
                        disabled
                      >
                        Generating...
                      </button>
                    )}
                    {order.status === "completed" && (
                      <button
                        className="bg-green-600 text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
                        onClick={() => handleViewEsims(index)}
                      >
                        View eSIMs
                      </button>
                    )}
                    {order.status === "error" && (
                      <button
                        className="bg-red-600 text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                        onClick={() => handleProcessOrder(index)}
                      >
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* What to Expect */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            {t("instantEsim.steps.title")}
          </h2>
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <div className="flex gap-4 items-start" key={i}>
                <div className="w-9 h-9 min-w-[36px] rounded-full bg-main-600 text-white text-[15px] font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-[15px] font-bold text-neutral-900 mb-1">
                    {step.title}
                  </div>
                  <div className="text-sm text-neutral-500 leading-[150%]">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-2xl p-6 md:p-8 shadow-sm mb-6 border border-yellow-200">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            {t("instantEsim.tips.title")}
          </h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-amber-900 leading-[150%] pl-6 relative"
              >
                <span className="absolute left-0 text-main-600 font-bold">
                  &#10003;
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            {t("instantEsim.help.title")}
          </h2>
          <p className="text-sm text-neutral-600 leading-[160%] mb-3">
            {t("instantEsim.help.line1")}
          </p>
          <p className="text-sm text-neutral-600 leading-[160%] mb-3">
            {t("instantEsim.help.line2")}{" "}
            <a href="/" className="text-main-600 font-semibold hover:underline">
              {t("instantEsim.help.appName")}
            </a>{" "}
            {t("instantEsim.help.line2End")}
          </p>
          <ul className="mb-6">
            {helpFeatures.map((item, i) => (
              <li
                key={i}
                className="text-sm text-neutral-600 leading-[150%] py-1.5 pl-5 relative"
              >
                <span className="absolute left-0 text-main-600 font-bold">
                  &bull;
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://apps.apple.com/us/app/yoowifi-travel-wifi-esim-sim/id1632273383"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store"
                className="h-11 hover:opacity-80 transition-opacity"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.urwifi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-11 hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>

      {/* eSIM Modal */}
      {showModal && modalEsims && (
        <EsimModal
          processResponse={modalEsims}
          userName={userName}
          countryCode={countryCode}
          localNumber={localNumber}
          email={email}
          orderId={modalOrderId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MockInstantEsim;
