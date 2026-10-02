import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";
import { DollarLabelIcon, EarthIcon, SignalIcon } from "@/services";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutYoowifi = () => {
  const featuresData = [
    {
      _id: 1,
      icon: <SignalIcon className={"h-6 w-6"} />,
      title: "Stay Connected Anywhere",
    },
    {
      _id: 2,
      icon: <EarthIcon className={"h-6 w-6"} />,
      title: "Save BIG on International Roaming",
    },
    {
      _id: 3,
      icon: <DollarLabelIcon className={"h-6 w-6"} />,
      title: "Unbeatable Pricing Guarantee",
    },
  ];

  return (
    <section className="sec_common_60 bg-white">
      <div className="containerX flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-[60px]">
        <div className="w-full md:w-1/2 min-[950px]:w-2/5 overflow-visible">
          <LazyLoadImage
            src={useDynamicImages("others", "pocket-wifi-sim-japan")}
            height={2000}
            width={2000}
            alt="why choose us"
            title="why choose us"
            className="min-w-full min-h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 min-[950px]:w-3/5 flex flex-col justify-center items-center md:items-start gap-6 md:gap-9">
          <h2 className="title text-start">Why Yoowifi?</h2>

          <div className="flex flex-col gap-4">
            {featuresData.map(({ _id, icon, title }) => (
              <div key={_id} className="flex items-center gap-4">
                <div className="flex_center bg-[#FFF1F1] rounded-full h-11 w-11">
                  {icon}
                </div>
                <p className="text-sm md:text-lg !leading-[1.4] text-black-700">
                  {title}
                </p>
              </div>
            ))}
          </div>

          <Button variant={"secondary"} size={"lg"} className={"md:h-[52px]"}>
            About Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutYoowifi;
