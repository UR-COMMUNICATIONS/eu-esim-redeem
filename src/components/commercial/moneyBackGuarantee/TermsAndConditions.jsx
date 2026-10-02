import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TermsCard from "./TermsCard";

const PAGE_KEY = "moneyBackGuarantee";

const getContentByTab = (activeTab) => {
  const isESim = activeTab === "eSIM";
  return {
    title: `${activeTab} Terms & Conditions`,
    sections: [
      {
        title: "Eligibility",
        items: [
          {
            text: `This guarantee applies only to ${activeTab} purchased directly from our official Shopee store.`,
          },
          {
            text: "The guarantee covers activation or connection failures that are not caused by user error, device incompatibility, or network restrictions.",
          },
        ],
      },
      {
        title: "Valid Reasons for Refund",
        introText: "You are eligible for a full refund if:",
        items: [
          {
            text: `The ${activeTab} cannot be activated despite following our setup instructions; or`,
          },
          {
            text: `The ${activeTab} fails to connect to the network within the validity period, after troubleshooting with our support team.`,
          },
        ],
      },
      {
        title: "Exclusions (Refunds not applicable if)",
        items: isESim
          ? [
              { text: "Refunds will not be issued if:" },
              {
                text: "The device is not eSIM compatible or carrier-locked",
                isStrikethrough: true,
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
            ]
          : [
              { text: "Refunds will not be issued if:" },
              {
                text: "The customer using the wrong device, different plan bought for covered countries or used when the data is fully used up.",
              },
              {
                text: "The customer entered the wrong QR code, deleted the eSIM, or reinstalled it improperly.",
              },
              {
                text: "The Pocket Wifi plan was successfully activated and data/service was used (partially or fully).",
              },
              {
                text: "The network outage was temporary or due to roaming coverage limitations.",
              },
              {
                text: "The refund request is made after the Pocket Wifi validity period has expired.",
              },
            ],
      },
      {
        title: "Refund Process",
        items: [
          {
            text: "Customers must contact us via Yoowifi WhatsApp Support or Shopee chat within 48 hours of activation failure.",
          },
          {
            text: "You will need to provide:",
            subItems: [
              "Order ID",
              "Screenshot of activation attempt or error message",
              isESim ? "Device model" : "Device ID",
            ],
          },
          {
            text: `Our support team will verify the issue and, if eligible, process a full refund for the number of days which the ${activeTab} could not be used.`,
          },
        ],
      },
      {
        title: "Resolution Timeline",
        items: [
          {
            text: "Verification and refund processing may take up to 7-10 working days after complete details are received.",
          },
          {
            text: "Refunds will be issued via your original payment mode or Shopee's refund system only (no external transfers).",
          },
        ],
      },
      {
        title: "Right to Refuse Refund",
        items: [
          {
            text: "We reserve the right to decline refund requests if evidence of misuse, fraud, or violation of these terms is found.",
          },
        ],
      },
    ],
  };
};

function TermsAndConditions({ onBuyNow }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("Pocket WiFi");
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(getContentByTab(activeTab));
  }, [activeTab]);

  if (!content) return null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-[#FFF2F2] py-12 px-2 md:px-6 my-8 rounded-md flex flex-col gap-8">
      <div className="max-w-full mx-auto">
        <h1 className="font-['DMSans'] font-bold text-[36px] leading-[140%] text-center text-[#191919] mb-12">
          {content.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {content.sections.map((section, idx) => (
            <TermsCard
              key={idx}
              title={section.title}
              introText={section.introText}
              items={section.items}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => onBuyNow?.()}
            className="bg-[#C63D2F] hover:bg-[#A32F24] text-white px-12 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            {t(`${PAGE_KEY}.buyNow`) || "Buy Now"} <ArrowUpRight size={22} />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveTab((prev) => (prev === "eSIM" ? "PocketWiFi" : "eSIM"))
            }
            className="text-xs text-gray-400 underline"
          >
            {activeTab === "eSIM"
              ? t(`${PAGE_KEY}.switchToPocketWifi`) ||
                "Switch to Pocket WiFi Preview"
              : t(`${PAGE_KEY}.switchToEsim`) || "Switch to eSIM Preview"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
