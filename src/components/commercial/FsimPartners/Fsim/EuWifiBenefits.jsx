import SectionHeader from "@/components/shared/others/SectionHeader";
import useDynamicImages from "@/hooks/useDynamicImages";

const benefits = [
  {
    iconKey: "speedometer",
    alt: "Coverage",
    label: "Fast 4G/LTE Coverage\nAcross 100+ Countries",
  },
  { iconKey: "thunder", alt: "Speed", label: "Speeds Up to\n150Mbps" },
  {
    iconPath: "indicators",
    iconKey: "battery-blue",
    alt: "Battery",
    label: "Long-Lasting Battery\nUp to 18 Hours",
  },
  {
    iconKey: "mobile-hotspot-blue",
    alt: "Devices",
    label: "Connect Up to\n6 Devices",
  },
];

const BenefitIcon = ({ iconPath = "others", iconKey, alt }) => {
  const src = useDynamicImages(iconPath, iconKey);
  return <img src={src} alt={alt} className="h-12 w-12 object-contain" />;
};

const EuWifiBenefits = () => {
  return (
    <section className="sec_common_80 md:py-20 xl:px-28">
      <div
        className="text-white md:rounded-[24px] rounded-[12px]"
        style={{ backgroundColor: "#CEF5FF" }}
      >
        <div className="md:py-24 py-12 containerX mx-auto">
          <SectionHeader
            heading="Why Travelers Love EU POCKET WiFi"
            headingClassName="text-black"
            midHeading={
              "No more SIM card hassles, Skip expensive roaming fees and stay connected\neffortlessly with fast, reliable pocket WiFi."
            }
            midHeadingClass="text-[#4F4F4F] mt-5 md:text-[26px] text-[20px] whitespace-pre-line"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-16 md:px-15 px-4">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-[#191919] rounded-[12px] md:p-5 p-4 md:h-[174px] h-auto flex flex-col justify-between gap-4"
              >
                <div className="pl-2">
                  <BenefitIcon
                    iconPath={item.iconPath}
                    iconKey={item.iconKey}
                    alt={item.alt}
                  />
                </div>
                <p className="text-sm md:text-base font-semibold whitespace-pre-line">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuWifiBenefits;
