import { Download, Play } from "lucide-react";

const StepItem = ({ step, variant = "boxed" }) => {
  if (variant === "numbered") {
    return (
      <div className="bg-white p-6 rounded-[24px] flex items-start gap-6 shadow-sm border border-gray-50">
        <span className="text-[48px] font-bold text-[#D32F2F] leading-none">
          {step.id}
        </span>
        <div className="space-y-1">
          <h4 className="font-['DMSans'] font-bold text-[20px] text-[#191919]">
            {step.title}
          </h4>
          <p className="font-['DMSans'] text-gray-400 text-[16px] leading-[1.4]">
            {step.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[#D32F2F] font-bold text-sm">Step-{step.id}</span>
        {step.showDownload && (
          <button
            type="button"
            className="bg-[#D32F2F] text-white text-[12px] px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-[#B71C1C] transition-colors"
          >
            Download Yoowifi <Download size={14} />
          </button>
        )}
      </div>
      <h4 className="font-['DMSans'] font-bold text-[22px] text-[#191919] mb-2">
        {step.title}
      </h4>
      <p className="font-['DMSans'] text-gray-400 text-[16px] leading-[1.4]">
        {step.description}
      </p>
    </div>
  );
};

const TutorialSection = ({
  title,
  subtitle,
  videoThumbnail,
  steps = [],
  imagePosition = "left",
  stepsVariant = "boxed",
}) => {
  return (
    <section className="py-20 px-4 bg-[#FDFDFD]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-['DMSans'] font-bold text-[40px] md:text-[64px] leading-[120%] text-[#191919]">
            {title}
          </h2>
          <p className="font-['DMSans'] font-normal text-[18px] leading-[140%] text-gray-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div
          className={`
          flex flex-col lg:items-center gap-12
          ${imagePosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse"}
        `}
        >
          <div className="flex-1 space-y-6">
            {steps.map((step) => (
              <StepItem key={step.id} step={step} variant={stepsVariant} />
            ))}
          </div>

          <div className="flex-1 relative group cursor-pointer">
            <div className="aspect-square rounded-[40px] overflow-hidden bg-[#8B1A1A] relative shadow-2xl">
              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Play
                    fill="#D32F2F"
                    className="text-[#D32F2F] ml-1"
                    size={32}
                  />
                </div>
                <h3 className="text-[48px] font-bold leading-tight tracking-tight">
                  TUTORIAL:
                  <br />
                  HOW TO RENT
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;
