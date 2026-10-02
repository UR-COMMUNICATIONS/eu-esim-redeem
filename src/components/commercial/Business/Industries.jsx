import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";

export default function Industries() {
  const IMAGE_SOURCE_1 = useDynamicImages(
    "landing-page",
    "corporate_business_8",
    "png",
  );
  const IMAGE_SOURCE_2 = useDynamicImages(
    "landing-page",
    "corporate_business_9",
    "png",
  );
  const IMAGE_SOURCE_3 = useDynamicImages(
    "landing-page",
    "corporate_business_2",
    "png",
  );
  const categories = [
    {
      name: "Travel & Mobility",
      total: "Support travellers, roadshows and on-the-go operations.",
      image: IMAGE_SOURCE_1,
    },
    {
      name: "Corporate Teams",
      total: "Reliable connectivity for teams, clients and business workflows.",
      image: IMAGE_SOURCE_2,
    },
    {
      name: "Events & Experiences",
      total: "Keep events, hospitality and customer experiences connected.",
      image: IMAGE_SOURCE_3,
    },
  ];

  return (
    <section
      className="py-[84px] px-0 max-[680px]:py-[60px]"
      style={{ background: "linear-gradient(135deg, #f6f6f6, #fff)" }}
    >
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)]">
        <div className="text-center max-w-[820px] mx-auto mb-[46px]">
          <span className="inline-flex items-center gap-2.5 bg-[#fff0f1] text-[#ee1b24] text-[12px] font-black tracking-[0.08em] uppercase py-2.25 px-3.5 rounded-full">
            Built for partners
          </span>
          <h2 className="text-[clamp(31px,4vw,50px)] leading-[1.05] my-[16px] mx-0 tracking-[-0.045em] font-bold">
            Ideal for businesses that need global connectivity.
          </h2>
          <p className="text-[#6f6f6f] text-[17px] mt-0 mb-5">
            Designed for partners who want to support operations, serve
            customers or create a new connectivity revenue stream.
          </p>
        </div>

        <div className="grid grid-cols-3 max-[1000px]:grid-cols-1 gap-[18px] mb-[28px]">
          {categories.map((c, i) => (
            <div
              key={i}
              className="relative rounded-3xl overflow-hidden h-[230px] max-[680px]:h-[200px] shadow-[0_16px_34px_rgba(0,0,0,0.08)] bg-neutral-400 flex items-center justify-center text-white font-bold"
            >
              <img
                src={c.image}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute left-4 bottom-4 z-10 text-white text-left">
                <b className="block text-[20px] leading-[1.1] mb-1 font-bold">
                  {c.name}
                </b>
                <span className="block text-[13px] opacity-92 font-normal">
                  {c.total}
                </span>
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 48%, rgba(0,0,0,.55))",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          {[
            "Travel Agencies",
            "Corporate Teams",
            "Events & Roadshows",
            "Resellers",
            "Hospitality",
            "Remote Operations",
          ].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center rounded-full py-3.5 px-4 bg-white border border-[#ececec] font-extrabold shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-sm text-[#121212]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
