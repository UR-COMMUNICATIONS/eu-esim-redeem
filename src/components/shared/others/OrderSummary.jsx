import CartPaymentCard from "@/components/shared/cards/CartPaymentCard";
import Loader from "@/components/shared/Loader";
import OrderSingleItem from "@/components/shared/others/OrderSingleItem";
import PaymentComponent from "@/components/shared/others/PaymentComponent";
import PaymentIframe from "@/components/shared/others/PaymentIframe";
import UserPaymentForm from "@/components/shared/others/UserPaymentForm";
import SupportedPaymentMethods from "@/components/shared/others/SupportedPaymentMethods";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useOrderLogic } from "@/hooks/useOrderLogic";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { ErrorIcon, PlusIcon, SuccessIcon } from "@/services";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDynamicImages from "@/hooks/useDynamicImages";

/**
 * @typedef {Object} OrderSummaryConfig
 * @property {"sim"|"pocketWifi"} type
 * @property {React.ComponentType<any>} FooterComponent
 * @property {() => { planSummary: string, shippingOption: string, termsService: string, privacyPolicy: string }} getRoutes
 * @property {boolean} [showAppDownload]
 * @property {boolean} [useLocalizedNamespace]
 */

const formatDataSize = (dataSize, desc) =>
  Number(dataSize) >= 9999
    ? "True Unlimited"
    : `${dataSize}${desc?.trim() ? " " + desc.trim() : ""}`;

// Factory function to create order summary component
function createOrderSummaryComponent(config) {
  return function OrderSummary() {
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const { estimation } = cart;
    const [showForm, setShowForm] = useState(false);
    const { nameSpace } = useUserLocationLanguage();
    const { t } = useTranslation(
      config.useLocalizedNamespace
        ? ["translation", "english", "local"]
        : undefined,
    );

    const {
      cards,
      isChecked,
      setIsChecked,
      process,
      summary,
      handleDisable,
      handlePaymentCardSelect,
      handleSubmit,
      handleContinue,
      setProcess,
      pgwType,
      showAdyenPaymentModal,
      setShowAdyenPaymentModal,
      setinvoiceNo,
      onPlaceOrder,
      adyenSession,
      webPaymentUrl,
      handlePaymentSuccess,
      handlePaymentClose,
      selectedPaymentMethod,
      setSelectedPaymentMethod,
    } = useOrderLogic();

    // Get routes using the getter function (called at runtime, not module load time)
    const routes = config.getRoutes();

    const handleGoBack = () => {
      setProcess({
        isProcessing: false,
        isSuccess: false,
        title: "",
        alertType: "",
        alertMessage: "",
      });
      setIsChecked(false);
      setShowForm(false);
      setinvoiceNo(null);
    };

    const handlePrev = () => {
      if (["buy-esim", "add-plan"].includes(estimation.requestType)) {
        navigate(routes.planSummary);
      } else {
        navigate(routes.shippingOption);
      }
    };

    // Get localized plan attributes
    const getPlanAttributes = () => {
      const planAttbs = {
        planName: cart.package?.planName,
        nameAttributes: cart.package?.nameAttributes,
        description: cart.package?.description,
      };

      if (config.useLocalizedNamespace && cart.userLanguage !== "en") {
        return {
          planName: cart.package?.trPlanName || planAttbs.planName,
          nameAttributes:
            cart.package?.trNameAttributes || planAttbs.nameAttributes,
          description: cart.package?.trDescription || planAttbs.description,
        };
      }

      return planAttbs;
    };

    const planAttbs = getPlanAttributes();
    const { FooterComponent } = config;

    return (
      <div className="w-full">
        {showAdyenPaymentModal && (
          <PaymentComponent
            adyenSession={adyenSession}
            onSetShowAdyenPaymentModal={setShowAdyenPaymentModal}
            summary={summary}
            setinvoiceNo={setinvoiceNo}
            onPlaceOrder={onPlaceOrder}
          />
        )}

        {webPaymentUrl && (
          <PaymentIframe
            paymentUrl={webPaymentUrl}
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
            // Non-card channels (QRIS / IMBANK / Alipay, etc.) complete payment
            // OFF our domain and never return to us (they go to fpx.org), so the
            // order MUST be placed when the user finishes/leaves the payment
            // window by any means. orderOnExit makes every dismissal place the
            // order instead of cancelling it.
            orderOnExit={selectedPaymentMethod !== "CC"}
            paymentMethod={selectedPaymentMethod}
            title={
              selectedPaymentMethod === "QRIS"
                ? t("payment.scanQRCode")
                : t("orderSummary.completePayment")
            }
          />
        )}

        <div className="w-full">
          <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold">
            {t("orderSummary.orderSummary")}
          </h4>

          <div className="bg-neutral-100 rounded-2xl py-6 px-4 sm:p-8 md:p-10 divide-y divide-neutral-300 mt-4 sm:mt-6">
            {/* Plan Name Section */}
            <div className="pb-5 flex flex-col gap-4">
              <OrderSingleItem
                title={t("orderSummary.planName")}
                description={planAttbs.planName}
              />
            </div>

            {/* Variation, Destinations & Promo Section */}
            {(cart?.variation?.packageName ||
              cart?.variation?.dataSize ||
              cart?.variation?.days ||
              cart?.travelDetails?.length > 0 ||
              cart?.promoCode) && (
              <div className="pb-5 flex flex-col gap-4 pt-5">
                {cart?.variation?.packageName && (
                  <OrderSingleItem
                    title="Data Plan"
                    description={cart.variation.packageName}
                  />
                )}
                {cart?.variation?.dataSize && (
                  <OrderSingleItem
                    title="Data Size"
                    description={formatDataSize(
                      cart.variation.dataSize,
                      cart.variation.desc,
                    )}
                  />
                )}
                {cart?.variation?.days && (
                  <OrderSingleItem
                    title="Duration"
                    description={`${cart.variation.days} days`}
                  />
                )}
                {config.type === "sim" &&
                  cart?.travelDetails?.[0]?.startDate &&
                  cart?.variation?.days && (
                    <OrderSingleItem
                      title="Package Dates"
                      description={(() => {
                        const start = new Date(cart.travelDetails[0].startDate);
                        const end = new Date(start);
                        end.setDate(
                          end.getDate() + Number(cart.variation.days) - 1,
                        );
                        const fmt = (d) =>
                          d.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          });
                        return `${fmt(start)} → ${fmt(end)}`;
                      })()}
                    />
                  )}
                {config.type !== "sim" && cart?.travelDetails?.length > 0 && (
                  <div className="flex justify-between gap-3">
                    <span className="text-sm text-black-700 shrink-0">
                      Destinations
                    </span>
                    <div className="flex flex-col gap-1 text-right">
                      {cart.travelDetails.map((td, i) => (
                        <span
                          key={i}
                          className="text-sm text-black-900 font-medium"
                        >
                          {td.locationName ||
                            td.travelLocation ||
                            td.country ||
                            td.countryCode}
                          {td.startDate && (
                            <span className="text-black-500 font-normal">
                              {" "}
                              ({td.startDate}
                              {td.endDate && td.endDate !== td.startDate
                                ? ` → ${td.endDate}`
                                : ""}
                              )
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {cart?.promoCode && (
                  <OrderSingleItem
                    title="Promo Code"
                    description={cart.promoCode}
                    descriptionClass="text-green-600 font-semibold"
                  />
                )}
              </div>
            )}

            {/* Charges Section */}
            <div className="pb-5 flex flex-col gap-4 pt-5">
              <OrderSingleItem
                title={t("orderSummary.minimumCharges")}
                description={`${summary.currency} ${summary.minCharges}`}
                descriptionClass="uppercase"
              />
              <OrderSingleItem
                title={t("orderSummary.deposit")}
                description={`${summary.currency} ${summary.deposit}`}
                descriptionClass="uppercase"
              />
              <OrderSingleItem
                title={t("orderSummary.subtotal")}
                description={`${summary.currency} ${summary.subTotal}`}
                descriptionClass="uppercase"
              />
              <OrderSingleItem
                title={t("orderSummary.quantity")}
                description={summary.quantity}
                descriptionClass="uppercase"
              />
              {config.type === "sim" && (
                <OrderSingleItem
                  title={t("orderSummary.totalDataCharges")}
                  description={`${summary.currency} ${summary.totalDataCharges}`}
                  descriptionClass="uppercase"
                />
              )}
            </div>

            {/* Delivery Section */}
            <div className="pb-5 flex flex-col gap-4 pt-5">
              {summary.shippingType === "self" && (
                <>
                  <OrderSingleItem
                    title={t("orderSummary.selfPickupDeliveryFee")}
                    description="FREE"
                  />
                  <OrderSingleItem
                    title={t("orderSummary.returnDropOffFee")}
                    description="FREE"
                  />
                </>
              )}
              <OrderSingleItem
                title={t("orderSummary.totalDeliveryCharges")}
                description={`${summary.currency} ${summary.deliveryCharges}`}
              />
            </div>

            {/* Total Section */}
            <div className="flex items-center justify-between gap-3 pt-5">
              <span className="text-lg text-black-900 font-semibold">
                {t("orderSummary.totalAmount")}
              </span>
              <span className="text-lg text-black-900 font-semibold">
                {`${summary.currency} ${summary.totalPayable}`}
              </span>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-4 sm:mt-6">
            {/* Payment Method Selection - Only for 2C2P */}
            {pgwType === "2C2P" && (
              <div className="mb-6">
                <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold mb-4">
                  {t("orderSummary.paymentMethod") || "Payment Method"}
                </h4>
                <SupportedPaymentMethods
                  onTypeChange={setSelectedPaymentMethod}
                  selectedPaymentMethod={selectedPaymentMethod}
                />
              </div>
            )}

            {/* Only show card section for CC payment method */}
            {pgwType === "2C2P" && selectedPaymentMethod === "CC" && (
              <>
                {cards?.length > 0 && (
                  <div className="mt-4 sm:mt-6 grid lg:grid-cols-2 gap-4">
                    {cards?.map((item, index) => (
                      <CartPaymentCard
                        wrapperClass={
                          cart?.paymentCard?.cardId === item?.cardId
                            ? config.type === "sim"
                              ? "bg-main-700"
                              : "bg-red-700"
                            : ""
                        }
                        item={item}
                        key={index}
                        onClick={() => handlePaymentCardSelect(item)}
                      />
                    ))}

                    <button
                      type="button"
                      className="h-full min-h-[200px] text-lg font-semibold text-black-900 bg-neutral-200 rounded-2xl flex items-center justify-center"
                      onClick={() => setShowForm(true)}
                    >
                      <PlusIcon />
                      <span>{t("orderSummary.addCard")}</span>
                    </button>
                  </div>
                )}

                {cards?.length === 0 && !showForm && (
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold">
                      {t("orderSummary.addNewPaymentMethod")}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="px-10 py-6 w-full rounded-2xl bg-neutral-100 flex items-center gap-2 text-sm sm:text-base md:text-lg text-black-900 font-semibold mt-6"
                    >
                      <PlusIcon /> <span>{t("orderSummary.addCard")}</span>
                    </button>
                  </div>
                )}

                {showForm && (
                  <UserPaymentForm handler={() => setShowForm(false)} />
                )}
              </>
            )}

            {/* Info message for QRIS payment */}
            {pgwType === "2C2P" && selectedPaymentMethod === "QRIS" && (
              <div className="mt-4 sm:mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      {t("payment.qrisInfo") || "QRIS Payment"}
                    </h3>
                    <p className="text-sm text-blue-800">
                      {t("payment.qrisDescription") ||
                        "You'll be shown a QR code to scan with your mobile banking app to complete the payment."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info message for GCash payment */}
            {pgwType === "2C2P" && selectedPaymentMethod === "GCASH" && (
              <div className="mt-4 sm:mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      {t("payment.gcashInfo") || "GCash Payment"}
                    </h3>
                    <p className="text-sm text-blue-800">
                      {t("payment.gcashDescription") ||
                        "You'll be redirected to GCash to complete your payment securely."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info message for Bank Transfer payment */}
            {pgwType === "2C2P" && selectedPaymentMethod === "IMBANK" && (
              <div className="mt-4 sm:mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      {t("payment.bankTransferInfo") || "Bank Transfer Payment"}
                    </h3>
                    <p className="text-sm text-blue-800">
                      {t("payment.bankTransferDescription") ||
                        "You'll be redirected to your bank to complete the transfer securely."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ADYEN payment */}
            {pgwType === "ADYEN" && (
              <div className="mt-4 sm:mt-6">
                <h4 className="text-black-900 text-base sm:text-lg md:text-2xl font-bold">
                  {t("orderSummary.paymentMethod")}
                </h4>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-4 mt-6 sm:mt-8 md:mt-12">
              <Switch
                checked={isChecked}
                onCheckedChange={(ev) => setIsChecked(ev)}
              />
              <p className="text-black-700 text-base sm:text-lg">
                {t("orderSummary.readAndAgree")}{" "}
                <span className="font-semibold">
                  <a
                    href={routes.termsService}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("orderSummary.termsAndConditions")}
                  </a>{" "}
                  &{" "}
                  <a
                    href={routes.privacyPolicy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("orderSummary.privacyPolicy")}
                  </a>
                </span>
                {config.useLocalizedNamespace &&
                  ` ${t(`${nameSpace}:orderSummary.pleaseTapLeft`)}`}
                .
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Dialog */}
        <Dialog open={process.isSuccess}>
          <DialogContent
            showCloseIcon={false}
            className="w-[calc(100vw-32px)] max-w-[800px] h-full max-h-[400px] sm:max-h-[500px] flex items-center justify-center p-10 bg-main-50"
          >
            {process.isProcessing ? (
              <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
                <Loader
                  type="Oval"
                  color="white"
                  height={"18vw"}
                  width={"18vw"}
                  className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                  wrapperStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div className="text-center flex flex-col gap-3 sm:gap-4">
                  <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                    {t("orderSummary.orderProcessing")}
                  </DialogTitle>
                  <p className="text-base text-black-700">
                    {t("orderSummary.processingMessage")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center">
                  {process.alertType === "success" ? (
                    <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                  ) : (
                    <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
                  )}
                </div>
                <div className="text-center flex flex-col gap-3 sm:gap-4">
                  <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                    {process.title}
                  </DialogTitle>

                  {process.alertType === "success" ? (
                    <>
                      {config.showAppDownload && (
                        <p className="text-base text-black-700">
                          {t("orderSummary.downloadtheyoowifi")}
                        </p>
                      )}
                      {config.useLocalizedNamespace && (
                        <p className="text-base text-black-700">
                          {t(`${nameSpace}:orderSummary.welcomeMessage`)}
                        </p>
                      )}
                      {!config.showAppDownload &&
                        !config.useLocalizedNamespace && (
                          <p className="text-base text-black-700">
                            {process.alertMessage}
                          </p>
                        )}
                      <DialogClose
                        onClick={() => handleContinue(routes?.home)}
                        className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none md:mt-5"
                      >
                        {t("orderSummary.continue")}
                      </DialogClose>
                      {config.showAppDownload && (
                        <div className="flex flex-row gap-2 md:gap-4 justify-center md:mt-9">
                          <a
                            href="https://play.google.com/store/apps/details?id=com.urwifi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={useDynamicImages("others", "google-play")}
                              alt="google play"
                              className="w-[116px] md:w-[116px] h-auto"
                            />
                          </a>
                          <a
                            href="https://apps.apple.com/sg/app/id1632273383"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={useDynamicImages("others", "apple-store")}
                              alt="app store"
                              className="w-[116px] md:w-[116px] h-auto"
                            />
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-base text-black-700">
                        {process.alertMessage ||
                          t("orderSummary.somethingWrong")}
                      </p>
                      <DialogClose
                        onClick={handleGoBack}
                        className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none md:mt-5"
                      >
                        Go Back
                      </DialogClose>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <FooterComponent
          prevHandler={handlePrev}
          nextHandler={handleSubmit}
          disableHandler={handleDisable}
          label={
            config.useLocalizedNamespace
              ? `${t(`${nameSpace}:orderSummary.pay`)} ${summary?.currency} ${
                  summary?.totalPayable || ""
                }`
              : `Pay ${summary?.currency} ${summary?.totalPayable || ""}`
          }
        />
      </div>
    );
  };
}

export { createOrderSummaryComponent };
