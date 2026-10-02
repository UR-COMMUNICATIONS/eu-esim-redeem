import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "./PhoneInput";
import EsimModal from "./EsimModal";
import { parsePhone } from "./countries";
import ApiService from "@/general/apiClient";
import { modulesURLPath } from "@/constants/urls";

const WesimInstantEsim = () => {
  const { t } = useTranslation();
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState(null); // array of order objects with status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [countryCode, setCountryCode] = useState("+62");
  const [localNumber, setLocalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Modal state
  const [modalEsims, setModalEsims] = useState(null);
  const [modalOrderId, setModalOrderId] = useState("");
  const [modalIsView, setModalIsView] = useState(false);

  const steps = Array.from({ length: 5 }, (_, i) => ({
    title: t(`wesimInstantEsim.steps.items.${i}.title`),
    desc: t(`wesimInstantEsim.steps.items.${i}.desc`),
  }));

  const tips = Array.from({ length: 3 }, (_, i) =>
    t(`wesimInstantEsim.tips.items.${i}`),
  );

  useEffect(() => {
    sessionStorage.setItem("source", "wesim");
  }, []);

  const handleSearch = async () => {
    setError("");
    setOrders(null);
    setUserName("");
    setCountryCode("+62");
    setLocalNumber("");
    setEmail("");
    setAgreedToTerms(false);

    const trimmed = orderId.trim();
    if (!trimmed) {
      setError(t("wesimInstantEsim.errors.emptyOrderId"));
      return;
    }

    setLoading(true);
    try {
      const json = await ApiService.request(
        modulesURLPath.MpOrder.getOrder(trimmed),
        {},
        { method: "GET" },
      );
      if (!json?.result) {
        setError(t("wesimInstantEsim.errors.orderNotFound"));
        return;
      }

      // API returns array of order objects
      const rawData = json?.data ?? json;
      const dataArray = Array.isArray(rawData) ? rawData : [rawData];

      const hasNoOrder =
        dataArray.length === 0 ||
        (dataArray.length === 1 &&
          dataArray[0].productName == null &&
          dataArray[0].orderId == null);

      if (hasNoOrder) {
        setError(t("wesimInstantEsim.errors.orderNotFound"));
        return;
      }

      const mapped = dataArray.map((o) => ({
        orderId: o.orderId,
        extOrderId: o.extOrderId,
        productName: o.productName,
        sku: o.sku,
        quantity: o.quantity,
        devices: Array.isArray(o.devices) ? o.devices : [],
        // orderStatus 1 = eSIM already generated, show View button
        status: o.orderStatus === 1 ? "view" : "idle",
      }));

      setOrders(mapped);
      setError("");

      // Populate user fields from first order that has them
      const first = dataArray[0];
      if (first.userName) setUserName(first.userName);
      if (first.phone) {
        const parsed = parsePhone(first.phone);
        setCountryCode(parsed.countryCode);
        setLocalNumber(parsed.localNumber);
      }
      if (first.email) setEmail(first.email);
    } catch (err) {
      setOrders(null);
      setError(
        err.message === "Request failed" || err.message.startsWith("HTTP")
          ? t("wesimInstantEsim.errors.orderNotFound")
          : t("wesimInstantEsim.errors.genericError"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProcessOrder = async (index) => {
    if (
      !userName.trim() ||
      !localNumber.trim() ||
      !email.trim() ||
      !agreedToTerms
    )
      return;

    const order = orders[index];

    setOrders((prev) =>
      prev.map((o, i) =>
        i === index ? { ...o, status: "processing", processError: "" } : o,
      ),
    );

    try {
      const res = await ApiService.request(
        modulesURLPath.MpOrder.processOrder,
        {
          orderId: order.extOrderId,
          userId: email.trim(),
          userName: userName.trim(),
          phone: `${countryCode}-${localNumber.trim().replace(/\s+/g, "")}`,
        },
      );
      const responseData = res?.data ?? res;
      const esims = Array.isArray(responseData) ? responseData : [responseData];

      // "eSim activated" = freshly generated; "order found" = already existed
      const isAlreadyGenerated = res?.message === "order found";

      const modalEsimsData = isAlreadyGenerated
        ? esims.flatMap((e) =>
            Array.isArray(e.devices)
              ? e.devices.map((d) => ({ qrCode: d }))
              : [],
          )
        : esims;

      setOrders((prev) =>
        prev.map((o, i) =>
          i === index
            ? {
                ...o,
                status: isAlreadyGenerated ? "view" : "completed",
                processedEsims: modalEsimsData,
              }
            : o,
        ),
      );

      setModalEsims(modalEsimsData);
      setModalOrderId(order.orderId);
      setModalIsView(isAlreadyGenerated);
      setShowModal(true);
    } catch (err) {
      const msg =
        err.message !== "Request failed"
          ? t("wesimInstantEsim.errors.genericError")
          : t("wesimInstantEsim.errors.generateFailed");
      setOrders((prev) =>
        prev.map((o, i) =>
          i === index ? { ...o, status: "error", processError: msg } : o,
        ),
      );
    }
  };

  const handleViewEsims = (index) => {
    const order = orders[index];
    if (order.processedEsims) {
      setModalEsims(order.processedEsims);
      setModalOrderId(order.orderId);
      setModalIsView(true);
      setShowModal(true);
    }
  };

  const handleViewFromDevices = (index) => {
    const order = orders[index];
    const esimsData = order.devices.map((filename) => ({
      qrCode: filename,
      iccid: filename.replace(/\.png$/i, ""),
    }));
    setModalEsims(esimsData);
    setModalOrderId(order.orderId);
    setModalIsView(true);
    setShowModal(true);
  };

  const canSubmit =
    orders &&
    userName.trim() &&
    localNumber.trim() &&
    email.trim() &&
    agreedToTerms;

  const completedCount = orders
    ? orders.filter((o) => o.status === "completed" || o.status === "view")
        .length
    : 0;

  const allView = orders ? orders.every((o) => o.status === "view") : false;

  return (
    <div className="overflow-hidden w-full">
      <img
        src="https://yw-banners.s3.ap-southeast-1.amazonaws.com/wesim-banner.png"
        alt={t("wesimInstantEsim.hero.title")}
        className="w-full h-auto block"
      />

      {/* Welcome Section */}
      <div className="bg-white py-10 px-4 text-center border-b border-neutral-200">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[15px] text-neutral-600 leading-[160%] mb-3">
            {t("wesimInstantEsim.welcome.line1")}
          </p>
          <p className="text-[15px] text-neutral-600 leading-[160%] mb-3">
            {t("wesimInstantEsim.welcome.line2")}
          </p>
          <p className="text-base font-bold text-[#01aee3] mt-4">
            {t("wesimInstantEsim.welcome.tagline")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[800px] mx-auto py-10 px-4 md:px-5">
        {/* Search Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6 border-t-[3px] border-[#01aee3]">
          <h2 className="text-[22px] font-bold text-neutral-900 mb-5 leading-[120%]">
            {t("wesimInstantEsim.form.title")}
          </h2>
          <p className="text-sm text-neutral-500 leading-[150%] mb-4 -mt-3">
            {t("wesimInstantEsim.form.subtitle")}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
              {t("wesimInstantEsim.form.orderIdLabel")}
            </label>
            <input
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-[#01aee3] focus:bg-white transition-colors font-dmsans"
              type="text"
              placeholder={t("wesimInstantEsim.form.orderIdPlaceholder")}
              maxLength={25}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {!orders && (
            <button
              className="w-full bg-[#01aee3] text-white py-3.5 px-7 rounded-xl text-[15px] font-semibold hover:bg-[#01aee3]/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading
                ? t("wesimInstantEsim.form.searching")
                : t("wesimInstantEsim.form.findOrder")}
            </button>
          )}

          {error && (
            <p className="text-[#01aee3] text-sm mt-3 font-medium">{error}</p>
          )}

          {/* User details form - shown once for all orders */}
          {orders && (
            <>
              <span className="inline-block bg-green-100 text-green-800 text-[13px] font-semibold px-3.5 py-1.5 rounded-full mb-4">
                {orders.length} {orders.length === 1 ? "order" : "orders"} found
              </span>

              {/* Orders summary table + user form: hidden when all orders are already generated */}
              {!allView && (
                <>
                  {/* Orders summary table */}
                  <table className="w-full border-collapse mt-2 mb-6">
                    <thead>
                      <tr>
                        <th className="bg-neutral-900 text-white px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wider rounded-tl-xl w-48">
                          Order ID
                        </th>
                        <th className="bg-neutral-900 text-white px-4 py-3 text-left text-[13px] font-semibold uppercase tracking-wider">
                          {t("wesimInstantEsim.form.productName")}
                        </th>
                        <th className="bg-neutral-900 text-white px-4 py-3 text-center text-[13px] font-semibold uppercase tracking-wider rounded-tr-xl">
                          {t("wesimInstantEsim.form.qty")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={i}>
                          <td className="px-4 py-3.5 text-[13px] border-b border-neutral-100 text-neutral-500 font-mono">
                            {order.extOrderId}
                          </td>
                          <td className="px-4 py-3.5 text-[15px] border-b border-neutral-100 text-neutral-700 break-words">
                            {order.productName}
                            {order.sku && (
                              <span className="text-neutral-400 text-[13px] ml-1">
                                ({order.sku})
                              </span>
                            )}
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
                      {t("wesimInstantEsim.form.fullName")}
                    </label>
                    <input
                      className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-[#01aee3] focus:bg-white transition-colors font-dmsans"
                      type="text"
                      placeholder={t(
                        "wesimInstantEsim.form.fullNamePlaceholder",
                      )}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      {t("wesimInstantEsim.form.phoneNumber")}
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
                      {t("wesimInstantEsim.form.emailAddress")}
                    </label>
                    <input
                      className="w-full px-4 py-3.5 border border-neutral-300 rounded-xl text-[15px] outline-none bg-neutral-50 focus:border-[#01aee3] focus:bg-white transition-colors font-dmsans"
                      type="email"
                      placeholder={t("wesimInstantEsim.form.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <p className="text-[13px] text-neutral-400 leading-[150%] mb-4">
                    {t("wesimInstantEsim.form.privacyNote")}
                  </p>

                  <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] mt-0.5 accent-[#01aee3] cursor-pointer"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="text-sm text-neutral-600 leading-[150%]">
                      {t("wesimInstantEsim.form.agreeTerms")}{" "}
                      <a
                        href="/terms-services"
                        className="text-[#01aee3] font-medium hover:underline"
                      >
                        {t("wesimInstantEsim.form.termsAndConditions")}
                      </a>{" "}
                      {t("wesimInstantEsim.form.and")}{" "}
                      <a
                        href="/privacy-policy"
                        className="text-[#01aee3] font-medium hover:underline"
                      >
                        {t("wesimInstantEsim.form.privacyPolicy")}
                      </a>
                    </span>
                  </label>
                </>
              )}
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
                key={order.orderId || index}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-sm border-l-4 transition-colors ${
                  order.status === "completed" || order.status === "view"
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
                        {order.extOrderId}
                      </span>
                      {(order.status === "completed" ||
                        order.status === "view") && (
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
                          {order.status === "view" ? "Generated" : "Completed"}
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
                      {order.sku && (
                        <span className="text-neutral-400 text-[13px] font-normal ml-1">
                          ({order.sku})
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {order.quantity} eSIM{order.quantity > 1 ? "s" : ""}
                    </p>
                    {order.processError && (
                      <p className="text-red-600 text-[13px] mt-1 font-medium">
                        {order.processError}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    {order.status === "idle" && (
                      <button
                        className="bg-[#01aee3] text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold hover:bg-[#01aee3]/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
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
                    {order.status === "view" && (
                      <button
                        className="bg-green-600 text-white py-2.5 px-5 rounded-xl text-[13px] font-semibold hover:bg-green-700 transition-colors whitespace-nowrap"
                        onClick={() => handleViewFromDevices(index)}
                      >
                        View eSIMs
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
                        disabled={!canSubmit}
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
            {t("wesimInstantEsim.steps.title")}
          </h2>
          <div className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <div className="flex gap-4 items-start" key={i}>
                <div className="w-9 h-9 min-w-[36px] rounded-full bg-[#01aee3] text-white text-[15px] font-bold flex items-center justify-center">
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
        <div className="bg-[#01aee3]/5 rounded-2xl p-6 md:p-8 shadow-sm mb-6 border border-[#01aee3]/20">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            {t("wesimInstantEsim.tips.title")}
          </h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-neutral-700 leading-[150%] pl-6 relative"
              >
                <span className="absolute left-0 text-[#01aee3] font-bold">
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
            {t("wesimInstantEsim.help.title")}
          </h2>
          <p className="text-sm text-neutral-600 leading-[160%] mb-3">
            {t("wesimInstantEsim.help.line1")}
          </p>
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
          isView={modalIsView}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default WesimInstantEsim;
