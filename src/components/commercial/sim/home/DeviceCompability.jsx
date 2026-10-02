import SectionHeader from "@/components/shared/others/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDownIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function DeviceCompability() {
  const { deviceCompatibilities } = useSelector((state) => state.sim);
  const { t } = useTranslation();

  return (
    <section className="sec_common_60">
      <div className="containerX">
        <SectionHeader
          heading={t("sim.deviceCompatibilities.heading")}
          subHeading={t("sim.deviceCompatibilities.subHeading")}
          containerClassName="gap-4"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10 md:mt-15">
          {deviceCompatibilities?.map((item, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <Button
                  variant="black"
                  className="w-full justify-between text-lg sm:text-xl md:text-2xl font-semibold md:font-bold leading-[140%]"
                >
                  <span>
                    {t(
                      `sim.deviceCompatibilities.compatibilities.${index}.title`
                    )}
                  </span>
                  <ArrowDownIcon className="shrink-0 !w-6 !h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full max-w-[290px] sm:max-w-[376px] bg-black text-white rounded-3xl pb-2 custom pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-6 pt-4 sm:pt-6 md:pt-8 border-none mt-2">
                <div className="grid gap-4 pr-4 max-h-[411px] overflow-auto custom-scrollbar">
                  <div className="flex flex-col gap-4">
                    {item?.devices?.map((device, dIndx) => (
                      <div key={dIndx} className="flex flex-col gap-3">
                        <h4 className="text-base font-semibold">
                          {t(
                            `sim.deviceCompatibilities.compatibilities.${index}.devices.${dIndx}.name`
                          )}
                        </h4>
                        <ul className="list-disc pl-5 text-base">
                          {device?.versions?.map((version, vIndx) => (
                            <li key={vIndx}>
                              {t(
                                `sim.deviceCompatibilities.compatibilities.${index}.devices.${dIndx}.versions.${vIndx}`
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {item?.note && (
                      <p className="text-sm">
                        <span className="font-semibold">Note:</span>
                        {t(
                          `sim.deviceCompatibilities.compatibilities.${index}.note`
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeviceCompability;
