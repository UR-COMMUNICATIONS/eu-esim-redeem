import React from "react";

export default function DarkUSPs() {
  const usps = [
    {
      icon: "◎",
      title: "200+",
      subtitle: "160+ \nCountries",
      desc: "Global coverage across major travel and business destinations.",
    },
    {
      icon: "✣",
      title: "5G/4G",
      subtitle: "Multi-Homing Network",
      desc: "Smarter routing designed for maximum uptime and reliability.",
    },
    {
      icon: "▤",
      title: "Secure",
      subtitle: "Management Portal",
      desc: "Control, monitor and optimise users, orders and usage easily.",
    },
    {
      icon: "▯",
      title: "100%",
      subtitle: "Mobile App",
      desc: "Manage, top up and track connectivity conveniently on the go.",
    },
    {
      icon: "$",
      title: "24/7",
      subtitle: "Cost Efficient",
      desc: "Competitive pricing and flexible solutions for different needs.",
    },
    {
      icon: "☏",
      title: "REST",
      subtitle: "24/7 Support",
      desc: "Customer and technical assistance whenever it is needed.",
    },
  ];

  return (
    <section className="bg-[#090909] text-white relative overflow-hidden py-[84px] px-0 max-[680px]:py-[60px]">
      <div
        className="absolute inset-x-[-160px] -bottom-[270px] h-[440px] pointer-events-none blur-[7px]"
        style={{
          background:
            "radial-gradient(circle, rgba(238,27,36,.68), transparent 62%)",
        }}
      />
      <div className="w-[min(1180px,calc(100%-40px))] mx-auto max-[680px]:w-[calc(100%-28px)] relative z-10">
        <div className="text-center max-w-[820px] mx-auto mb-[46px]">
          <span
            style={{ background: "rgba(238, 27, 36, .2)" }}
            className="inline-flex items-center gap-2.5 text-white text-[12px] font-black tracking-[0.08em] uppercase py-2 px-3 mb-5 rounded-full"
          >
            What Yoowifi offers
          </span>
          <h2 className="text-[clamp(31px,4vw,50px)] leading-[1.05] my-[16px] mx-0 tracking-[-0.045em] font-bold">
            Everything you need to deliver connectivity with confidence.
          </h2>
          <p className="text-[17px] text-[#c9c9c9] m-0">
            A refined platform experience for businesses, resellers and partners
            who need dependable global connectivity.
          </p>
        </div>
        <div className="grid grid-cols-6 max-[1000px]:grid-cols-3 max-[680px]:grid-cols-1 gap-4">
          {usps.map((item, index) => (
            <div
              key={index}
              className="min-h-[220px] border border-[#ee1b24] border-opacity-[0.38] rounded-3xl py-6 px-[18px] text-center shadow-[inset_0_0_24px_rgba(238,27,36,0.1)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(238,27,36,.13), rgba(255,255,255,.035))",
              }}
            >
              <span
                className="text-[36px] text-[#ff3340] mb-4"
                style={{ textShadow: "0 0 18px rgba(238,27,36,.65)" }}
              >
                {item.icon}
              </span>
              <b className="block text-[22px] mb-1.5 font-bold">
                {item.subtitle}
              </b>
              {/* <strong className="block text-[14px] uppercase tracking-[0.01em] mb-2.5 font-bold">{item.subtitle}</strong> */}
              <small className="text-[#d8d8d8] text-[12px] leading-[1.45] block">
                {item.desc}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
