import AffiliateService from "@/components/commercial/affiliate/AffiliateService";
import LetsTalk from "@/components/commercial/contact/LetsTalk";
import CorporateBanner from "@/components/shared/others/CorporateBanner";
import SectionHeader from "@/components/shared/others/SectionHeader";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Affiliate = () => {
  const { contact, socialLinks } = useSelector((state) => state.contact);
  const { t } = useTranslation();

  return (
    <div>
      <CorporateBanner
        isShowBannerBottom={false}
        bannerStyle2ColumnBased
        bannerStyle={2}
        pageTitle={t("affiliate.banner.pageTitle")}
        description={t("affiliate.banner.description")}
      />

      <section className="containerX" id="join-affiliate">
        <div className="sec_common_80 xl:!px-0">
          <SectionHeader
            heading={t("affiliate.joinAffiliateSection.sectionHeader.heading")}
            midHeading={t(
              "affiliate.joinAffiliateSection.sectionHeader.midHeading"
            )}
            subHeading={t(
              "affiliate.joinAffiliateSection.sectionHeader.subHeading"
            )}
            subHeadingClassName='md:mb-0 mb-10'
          />
        </div>
      </section>

      <AffiliateService />

      {/* <LetsTalk data={contact} socialLinks={socialLinks} /> */}
    </div>
  );
};

export default Affiliate;
