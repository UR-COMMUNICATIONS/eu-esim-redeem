import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import useDynamicImages from "@/hooks/useDynamicImages";

const MarinSmarterInternetSection = ({
  imageFolder = "landing-page",
  imageKey,
  sectionKey = "marin.smarterInternet",
}) => {
  const { t } = useTranslation();
  const imageSrc = useDynamicImages(imageFolder, imageKey ?? "");
  const bulletsRaw = t(`${sectionKey}.bullets`, { returnObjects: true });
  const bullets = Array.isArray(bulletsRaw) ? bulletsRaw : [];

  return (
    <section className="bg-[#F8F9FA] py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2">
          {imageKey ? (
            <img
              src={imageSrc}
              alt={t(`${sectionKey}.heading`)}
              className="w-full h-[420px] object-cover rounded-[2rem] shadow-sm"
            />
          ) : (
            <div className="w-full h-[420px] rounded-[2rem] bg-neutral-100 shadow-sm" />
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 leading-tight mb-4">
            {t(`${sectionKey}.heading`)}
          </h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            {t(`${sectionKey}.description`)}
          </p>
          {bullets.length > 0 ? (
            <ul className="m-0 list-none space-y-4 p-0">
              {bullets.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-gray-700 text-base leading-snug"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <a
            href="#lets-talk"
            className="mt-8 box-border inline-flex h-[52px] w-[189px] items-center justify-center gap-1 rounded-[100px] bg-[#D81F22] px-[40px] py-4 text-center text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            {t(`${sectionKey}.enquireCta`)}
          </a>
        </div>
      </div>
    </section>
  );
};

export default MarinSmarterInternetSection;
