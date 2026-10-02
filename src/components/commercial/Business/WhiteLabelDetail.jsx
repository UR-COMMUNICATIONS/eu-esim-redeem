import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";

export default function WhiteLabelDetail() {
  const IMAGE_SOURCE_1 = useDynamicImages(
    "landing-page",
    "corporate_business_7",
    "png",
  );
  return (
    <section
      className="bg-white py-[84px] px-0 max-[680px]:py-[60px]"
      id="white-label-detail"
    >
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)]">
        <div className="bg-white border border-[#ececec] rounded-[36px] p-12 max-[680px]:p-7 grid grid-cols-[0.9fr_1.1fr] max-[1000px]:grid-cols-1 gap-10 items-start shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
          <div>
            <div className="w-[74px] h-[74px] rounded-full bg-white flex items-center justify-center text-[#ee1b24] text-[36px] mb-5 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
              ★
            </div>
            <div className="mt-0 mb-3.5">
              <h2 className="text-[42px] leading-[1.05] tracking-[-0.045em] font-bold mt-0 mb-3.5">
                Launch your own connectivity brand.
              </h2>
              <p className="text-[#6f6f6f] text-[17px] m-0">
                Offer global data and internet services under your own brand
                without building telecom infrastructure from the ground up.
              </p>
            </div>
            <div className="relative mt-6 h-[230px] rounded-3xl overflow-hidden shadow-[0_18px_42px_rgba(0,0,0,0.1)] bg-neutral-300 flex items-center justify-center text-sm font-semibold text-neutral-500">
              {/* Branded App Presentation */}
              <img
                src={IMAGE_SOURCE_1}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute left-4 bottom-4 z-10 bg-[#ffd21a] text-[#111] rounded-full py-2.5 px-3.5 text-[13px] font-black">
                Your Brand. Our Connectivity.
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 46%, rgba(0,0,0,.48))",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 max-[680px]:grid-cols-1 gap-x-[18px] gap-y-[18px]">
            {[
              {
                icon: "🏷",
                title: "Your Brand Identity",
                desc: "Custom branding across web, app, devices and communication.",
              },
              {
                icon: "☰",
                title: "End-to-End Control",
                desc: "Manage pricing, plans, users, orders and customer data.",
              },
              {
                icon: "⌘",
                title: "Seamless Integration",
                desc: "API, landing page and workflow integration options.",
              },
              {
                icon: "↗",
                title: "Scalable & Future Ready",
                desc: "Built to grow with your business and adapt to evolving needs.",
              },
              {
                icon: "☏",
                title: "Customer Support",
                desc: "Support for customer queries, technical issues and operations.",
              },
              {
                icon: "⚡",
                title: "Fast Onboarding",
                desc: "Simple setup so you can launch and start selling faster.",
              },
            ].map((f, i) => (
              <div key={i} className="border-l border-[#ececec] pl-5 py-0 pr-0">
                <div className="text-[28px] text-[#ee1b24] mb-3">{f.icon}</div>
                <h4 className="text-[16px] uppercase mt-0 mb-2 font-bold">
                  {f.title}
                </h4>
                <p className="text-[14px] text-[#6f6f6f] m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
