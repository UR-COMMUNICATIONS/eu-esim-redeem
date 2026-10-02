import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import MoneyBackCard from "./MoneyBackCard";
import SectionList from "./SectionList";

const PAGE_KEY = "moneyBackGuarantee";

const DEFAULT_TERMS_DATA = {
  eligibility: [
    {
      text: "This guarantee applies only to eSIMs purchased directly from our official Shopee store.",
    },
    {
      text: "The guarantee covers activation or connection failures that are not caused by user error, device incompatibility, or network restrictions.",
    },
  ],
  refundReasons: {
    intro: "You are eligible for a full refund if:",
    items: [
      {
        text: "The eSIM cannot be activated despite following our setup instructions; or",
      },
      {
        text: "The eSIM fails to connect to the network within the validity period, after troubleshooting with our support team.",
      },
    ],
  },
  exclusions: [
    { text: "Refunds will not be issued if:" },
    {
      text: "The device is not eSIM compatible or carrier-locked",
    },
    {
      text: "The customer entered the wrong QR code, deleted the eSIM, or reinstalled it improperly.",
    },
    {
      text: "The eSIM was successfully activated and data/service was used (partially or fully).",
    },
    {
      text: "The network outage was temporary or due to roaming coverage limitations.",
    },
  ],
  refundProcess: [
    {
      text: "Customers must contact us via Yoowifi WhatsApp Support or Shopee chat within 48 hours of activation failure.",
    },
    {
      text: "You will need to provide:",
      subItems: [
        "Order ID",
        "Screenshot of activation attempt or error message",
        "Device model and iOS/Android version",
      ],
    },
    {
      text: "Our support team will verify the issue and, if eligible, process a full refund for the number of days which the eSIM could not be used.",
    },
  ],
  timeline: [
    {
      text: "Verification and refund processing may take up to 7-10 working days after complete details are received.",
    },
    {
      text: "Refunds will be issued via your original payment mode or Shopee's refund system only (no external transfers).",
    },
  ],
  rightToRefuse: [
    {
      text: "We reserve the right to decline refund requests if evidence of misuse, fraud, or violation of these terms is found.",
    },
  ],
};

function ESimTerms({ termsData: dataProp, onBuyNow }) {
  const { t } = useTranslation();
  const termsData = dataProp || DEFAULT_TERMS_DATA;

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#FFF2F2] py-12 px-2 md:px-6 my-8 rounded-md flex flex-col gap-8">
      <div className="max-w-full mx-auto">
        <h1 className="font-['DMSans'] font-bold text-[36px] leading-[140%] text-center text-[#191919] mb-12">
          {t(`${PAGE_KEY}.termsTitle`) || "eSIM Terms & Conditions"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <MoneyBackCard
            title={t(`${PAGE_KEY}.eligibilityTitle`) || "Eligibility"}
          >
            <SectionList items={termsData.eligibility} />
          </MoneyBackCard>

          <MoneyBackCard
            title={
              t(`${PAGE_KEY}.refundReasonsTitle`) || "Valid Reasons for Refund"
            }
          >
            <p className="mb-4">{termsData.refundReasons.intro}</p>
            <SectionList items={termsData.refundReasons.items} />
          </MoneyBackCard>

          <MoneyBackCard
            title={
              t(`${PAGE_KEY}.exclusionsTitle`) ||
              "Exclusions (Refunds not applicable if)"
            }
          >
            <SectionList items={termsData.exclusions} />
          </MoneyBackCard>

          <MoneyBackCard
            title={t(`${PAGE_KEY}.refundProcessTitle`) || "Refund Process"}
          >
            <SectionList items={termsData.refundProcess} />
          </MoneyBackCard>

          <MoneyBackCard
            title={t(`${PAGE_KEY}.timelineTitle`) || "Resolution Timeline"}
          >
            <SectionList items={termsData.timeline} />
          </MoneyBackCard>

          <MoneyBackCard
            title={
              t(`${PAGE_KEY}.rightToRefuseTitle`) || "Right to Refuse Refund"
            }
          >
            <SectionList items={termsData.rightToRefuse} />
          </MoneyBackCard>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onBuyNow?.()}
            className="bg-[#C63D2F] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#A32F24] transition-colors shadow-lg"
          >
            {t(`${PAGE_KEY}.buyNow`) || "Buy Now"} <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ESimTerms;
