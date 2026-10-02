import useDynamicImages from "@/hooks/useDynamicImages";

export default function Hero() {
  const bannerImage = useDynamicImages(
    "landing-page",
    "BusinessPageBanner",
    "webp",
  );

  return (
    <header className="relative w-full overflow-x-hidden bg-[#b90b14] min-h-[700px] lg:min-h-[560px]">
      <img
        src={bannerImage}
        alt="Connectivity That Moves Your Business"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      <div className="relative z-10 flex items-start lg:absolute lg:inset-0 lg:items-center py-10 sm:py-12 md:py-14">
        <div className="w-[calc(100%-260px)] max-w-[1420px] mx-auto max-[1000px]:w-[calc(100%-40px)] max-[680px]:w-[calc(100%-28px)]">
          <div className="max-w-[650px] text-white">
            <span className="inline-flex items-center gap-2.5 bg-white/15 text-white text-[12px] font-black tracking-[0.08em] uppercase py-2 px-3 mb-5 rounded-full">
              For business
            </span>
            <h1 className="text-[clamp(42px,5.7vw,72px)] leading-[0.94] my-[22px] mx-0 tracking-[-0.065em] font-black uppercase">
              Connectivity That Moves Your Business
            </h1>
            <p className="text-[19px] max-w-[620px] mb-[26px] mt-0 text-white/[.92]">
              Partner with Yoowifi to deliver reliable global internet access
              for your customers, teams and operations — powered by our
              platform, network partners and support infrastructure.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr_1.05fr] gap-3 items-stretch justify-start mt-6 max-w-[860px] w-full">
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap max-lg:w-full cursor-pointer transition-all duration-200 ease-linear bg-[#ffd21a] text-[#111] hover:-translate-y-0.5 hover:saturate-[1.05]"
                style={{ boxShadow: "0 14px 30px rgba(0,0,0,.18)" }}
                href="#lets-talk"
              >
                Become a Partner →
              </a>
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap max-lg:w-full cursor-pointer transition-all duration-200 ease-linear bg-white/15 text-white border border-white/35 backdrop-blur-md hover:-translate-y-0.5"
                href="#business-detail"
              >
                Business Continuity
              </a>
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full py-[15px] px-6 font-black text-[14px] whitespace-nowrap max-lg:w-full cursor-pointer transition-all duration-200 ease-linear bg-white/15 text-white border border-white/35 backdrop-blur-md hover:-translate-y-0.5"
                href="#white-label-detail"
              >
                White Label Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
