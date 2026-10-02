import Marquee from "@/components/ui/marquee";
import useDynamicImages from "@/hooks/useDynamicImages";
import { useTranslation } from "react-i18next";

const CollaborateMarquee = () => {
  const { t } = useTranslation();

  const collaboarators = [
    { _id: 1, file: "1", alt: "collaborator 1", titleAttr: "collaborator 1" },
    { _id: 2, file: "2", alt: "collaborator 2", titleAttr: "collaborator 2" },
    { _id: 3, file: "3", alt: "collaborator 3", titleAttr: "collaborator 3" },
    { _id: 4, file: "4", alt: "collaborator 4", titleAttr: "collaborator 4" },
    { _id: 5, file: "5", alt: "collaborator 5", titleAttr: "collaborator 5" },
    { _id: 6, file: "6", alt: "collaborator 6", titleAttr: "collaborator 6" },
    { _id: 7, file: "7", alt: "collaborator 7", titleAttr: "collaborator 7" },
  ];

  return (
    <div
      className="w-full bg-[#FFFBEC] pb-6 pt-6 md:pb-[60px] md:pt-10"
      id={"companies"}
    >
      <p className="text-center text-black-600 md:text-black-700 text-base md:text-2xl !leading-[1.4]">
        {t("collaborateMarquee.sectionHeading")}
      </p>

      <Marquee pauseOnHover className="[--duration:20s] mt-6 md:mt-7 lg:mt-8">
        {collaboarators.map((collab, index) => {
          const image = useDynamicImages("collaborators", collab.file);
          return (
            <img
              src={image}
              alt={collab.alt}
              title={collab.titleAttr}
              height={200}
              width={400}
              className="h-[18px] md:h-6 lg:h-10 w-auto object-contain grayscale mx-6 md:mx-8 lg:mx-[60px]"
              key={index}
              loading="lazy"
            />
          );
        })}
      </Marquee>
    </div>
  );
};

export default CollaborateMarquee;
