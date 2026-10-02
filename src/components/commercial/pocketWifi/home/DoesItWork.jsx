import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";

function DoesItWork() {
    const { t } = useTranslation(["translation", "english", "local"])

    return (
        <section className="sec_common_60">
            <div className="containerX">
                <SectionHeader
                    heading={t("pocketWifi.doesItWork.heading")}
                    subHeading={t("pocketWifi.doesItWork.connectsToLocal")}
                    containerClassName="pb-10 mb:pb-[60px]"
                    headingClassName="md:text-[5rem]"
                    subHeadingClassName="text-sm md:text-base"
                />
            </div>
        </section>
    );
}

export default DoesItWork;
