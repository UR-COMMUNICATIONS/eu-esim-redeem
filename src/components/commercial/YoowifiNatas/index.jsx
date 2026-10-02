import { commercialRoutes } from "@/services";
import { useTranslation, Trans } from "react-i18next";

export default function YoowifiNatas() {
  const { t } = useTranslation();

  return (
    <div className="container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10 text-[18px]">
      <p className="text-xl font-semibold mb-8">{t("yoowifiNatas.title")}</p>

      <ul className="list-disc pl-6">
        <li>{t("yoowifiNatas.intro")}</li>
      </ul>
      <ul className="list-disc pl-6">
        {t("yoowifiNatas.purposes", { returnObjects: true }).map((p, idx) => (
          <li key={idx} className="mt-2 ">
            {p}
          </li>
        ))}
      </ul>

      <p className="text-xl font-semibold my-6">{t("yoowifiNatas.acknowledgeTitle")}</p>

      <ul className="list-disc pl-6">
        {t("yoowifiNatas.acknowledgements", { returnObjects: true }).map((a, idx) => (
          <li key={idx} className="mt-2">
            {a}
          </li>
        ))}
      </ul>

      <p className="text-xl font-semibold my-6">{t("yoowifiNatas.withdrawalTitle")}</p>

      <ul className="list-disc pl-6">
        <li>{t("yoowifiNatas.withdrawalText")}</li>
      </ul>

      <div className="mt-6">
        <p>
          <Trans
            i18nKey="yoowifiNatas.privacyLinks.ana"
            components={{
              a: (
                <a
                  href="https://www.ana.co.jp/wws/privacy/e/ana.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-600 border-b-2 border-main-600 cursor-pointer font-medium hover:text-main-700"
                />
              ),
            }}
          />
        </p>

        <p>
          <Trans
            i18nKey="yoowifiNatas.privacyLinks.yoowifi"
            components={{
              a: (
                <a
                  href={commercialRoutes.privacyPolicy.path}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  className="text-main-600 border-b-2 border-main-600 cursor-pointer font-medium hover:text-main-700"
                />
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
}

