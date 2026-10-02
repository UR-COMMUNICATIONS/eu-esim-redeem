import useDynamicImages from "@/hooks/useDynamicImages";
import React from "react";

export default function TwoRoutes() {
  const IMAGE_SOURCE_1 = useDynamicImages(
    "landing-page",
    "corporate_business_1",
    "png",
  );
  const IMAGE_SOURCE_2 = useDynamicImages(
    "landing-page",
    "corporate_business_3",
    "png",
  );
  return (
    <section className="py-[84px] px-0 max-[680px]:py-[60px]">
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)]">
        <div className="text-center max-w-[820px] mx-auto mb-[46px]">
          <span className="inline-flex items-center gap-2.5 bg-[#fff0f1] text-[#ee1b24] text-[12px] font-black tracking-[0.08em] uppercase py-2.5 px-3.5 rounded-full">
            One platform. Two ways to grow.
          </span>
          <h2 className="text-[clamp(31px,4vw,50px)] leading-[1.05] my-[16px] mx-0 tracking-[-0.045em] font-bold">
            Business connectivity and white label solutions, built for scale.
          </h2>
          <p className="text-[17px] text-[#6f6f6f] m-0">
            Whether you need dependable connectivity for operations or a branded
            platform to sell global data services, Yoowifi provides the
            technology and support to help you move faster.
          </p>
        </div>

        <div className="grid grid-cols-2 max-[1000px]:grid-cols-1 gap-[22px]">
          {/* Card 1 */}
          <article
            className="border border-[#ececec] rounded-[28px] p-[34px] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.06)] relative overflow-hidden max-[680px]:p-[26px]"
            id="business"
          >
            <div className="absolute -right-[80px] -top-[80px] w-[190px] h-[190px] rounded-full bg-[#ee1b24]/[0.08]" />
            <div className="h-[180px] rounded-[22px] overflow-hidden mb-5 relative shadow-[0_16px_36px_rgba(0,0,0,0.1)] max-[680px]:h-[160px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,.22))",
                }}
              />
              <img
                src={IMAGE_SOURCE_1}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="w-[58px] h-[58px] rounded-[18px] bg-[#fff0f1] text-[#ee1b24] border border-[#ffd8db] grid place-items-center text-[29px] mb-6">
              🌐
            </div>
            <h3 className="text-[28px] tracking-[-0.035em] mt-0 mb-3 font-bold">
              Business Partnership & Continuity
            </h3>
            <p className="text-[#6f6f6f] mt-0 mb-6">
              Keep teams, customers and operations connected across destinations
              with flexible connectivity plans, centralised management and
              dependable global coverage.
            </p>
            <ul className="grid gap-3 m-0 p-0 list-none font-bold text-[14px] text-[#262626] mb-7">
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Reliable internet access across 160+ countries
              </li>
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Connectivity support for travel, events and operations
              </li>
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Managed usage, orders and device control
              </li>
            </ul>

            <a
              className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap cursor-pointer transition-all duration-200 ease bg-[#ee1b24] text-white hover:bg-[#d91620] hover:-translate-y-0.5"
              style={{ boxShadow: "0 14px 32px rgba(238,27,36,.25)" }}
              href="#business-detail"
            >
              Explore Business Solutions
            </a>
          </article>

          {/* Card 2 */}
          <article
            className="border border-[#ececec] rounded-[28px] p-[34px] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.06)] relative overflow-hidden max-[680px]:p-[26px]"
            id="whitelabel"
          >
            <div className="absolute -right-[80px] -top-[80px] w-[190px] h-[190px] rounded-full bg-[#ee1b24]/[0.08]" />
            <div className="h-[180px] rounded-[22px] overflow-hidden mb-5 relative shadow-[0_16px_36px_rgba(0,0,0,0.1)] max-[680px]:h-[160px]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,.22))",
                }}
              />
              <img
                src={IMAGE_SOURCE_2}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="w-[58px] h-[58px] rounded-[18px] bg-[#fff0f1] text-[#ee1b24] border border-[#ffd8db] grid place-items-center text-[29px] mb-6">
              ★
            </div>
            <h3 className="text-[28px] tracking-[-0.035em] mt-0 mb-3 font-bold">
              White Label Connectivity Solutions
            </h3>
            <p className="text-[#6f6f6f] mt-0 mb-6">
              Launch and sell global data services under your own brand while
              Yoowifi powers the network, platform, technology and support
              behind the scenes.
            </p>
            <ul className="grid gap-3 m-0 p-0 list-none font-bold text-[14px] text-[#262626] mb-7">
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Branded web, app, device and communication experience
              </li>
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Flexible plans, pricing and customer management
              </li>
              <li className="flex gap-[11px] before:content-['✓'] before:text-[#ee1b24] before:font-black">
                Fast setup without building telecom infrastructure
              </li>
            </ul>
            <a
              className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap cursor-pointer transition-all duration-200 ease bg-[#ee1b24] text-white hover:bg-[#d91620] hover:-translate-y-0.5"
              style={{ boxShadow: "0 14px 32px rgba(238,27,36,.25)" }}
              href="#white-label-detail"
            >
              Explore White Label
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
