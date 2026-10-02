import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";

export default function BusinessDetail() {
  const IMAGE_SOURCE_1 = useDynamicImages(
    "landing-page",
    "corporate_business_4",
    "png",
  );
  const IMAGE_SOURCE_2 = useDynamicImages(
    "landing-page",
    "corporate_business_5",
    "png",
  );
  const IMAGE_SOURCE_3 = useDynamicImages(
    "landing-page",
    "corporate_business_6",
    "png",
  );
  return (
    <section
      className="bg-[#f8f8f8] py-[84px] px-0 max-[680px]:py-[60px]"
      id="business-detail"
    >
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)]">
        <div className="grid grid-cols-[0.95fr_1.05fr] max-[1000px]:grid-cols-1 gap-14 items-center">
          <div className="bg-white rounded-lg relative p-4 bg-transparent grid grid-cols-[1.15fr_0.85fr] max-[1000px]:grid-cols-1 gap-4 min-h-[420px] max-[1000px]:min-h-[300px] before:content-[''] before:absolute before:top-[36px] before:right-[36px] before:w-[250px] before:h-[250px] before:rounded-full before:bg-[linear-gradient(135deg,rgba(238,27,36,0.18),rgba(238,27,36,0.02))]">
            <div className="relative rounded-3xl overflow-hidden min-h-[380px] max-[1000px]:min-h-[300px] shadow-[0_18px_42px_rgba(0,0,0,0.1)] bg-neutral-300 flex items-center justify-center text-sm font-semibold text-neutral-500">
              <img
                src={IMAGE_SOURCE_1}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="grid grid-rows-2 max-[1000px]:grid-cols-2 max-[680px]:grid-cols-1 gap-4 ">
              <div className="relative rounded-3xl overflow-hidden min-h-[182px] shadow-[0_14px_34px_rgba(0,0,0,0.08)] bg-neutral-400 flex items-center justify-center text-xs font-semibold text-white">
                <img
                  src={IMAGE_SOURCE_2}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="relative rounded-3xl overflow-hidden min-h-[182px] shadow-[0_14px_34px_rgba(0,0,0,0.08)] bg-neutral-400 flex items-center justify-center text-xs font-semibold text-white">
                <img
                  src={IMAGE_SOURCE_3}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2.5 bg-[#fff0f1] text-[#ee1b24] text-[12px] font-black tracking-[0.08em] uppercase py-2.25 px-3.5 rounded-full">
              Business continuity
            </span>
            <h2 className="text-[clamp(32px,4vw,48px)] leading-[1.05] mt-4 mb-4 mx-0 tracking-[-0.045em] font-bold">
              Keep your business connected, wherever it operates.
            </h2>
            <p className="text-[#6f6f6f] text-[17px] mt-0 mb-5">
              Yoowifi helps businesses stay connected across countries,
              locations and customer touchpoints. Support travelling teams,
              remote operations, events or customer-facing services with
              connectivity solutions designed to keep business moving.
            </p>

            <div className="grid grid-cols-2 max-[680px]:grid-cols-1 gap-3.5 my-7 mx-0">
              {[
                "Flexible connectivity plans for teams and customers",
                "Reliable network access for business continuity",
                "Centralised tracking for usage, orders and devices",
                "Support infrastructure handled by Yoowifi",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start bg-white border border-[#ececec] rounded-[18px] p-[15px] font-bold text-[14px]"
                >
                  <span className="flex-none w-6 height-6 bg-[#fff0f1] text-[#ee1b24] rounded-full grid place-items-center font-black">
                    ✓
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <a
              className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap cursor-pointer transition-all duration-200 ease bg-[#ee1b24] text-white hover:bg-[#d91620] hover:-translate-y-0.5"
              style={{ boxShadow: "0 14px 32px rgba(238,27,36,.25)" }}
              href="#lets-talk"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
