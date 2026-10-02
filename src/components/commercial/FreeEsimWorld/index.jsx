import { images } from "@/services";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useDynamicImages from "@/hooks/useDynamicImages";

export default function FreeEsimWorld() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="sec_common_80 xl:px-28 lg:py-10">
            <img
                src={useDynamicImages("fsim-banner", "free-esim-landing")}
                alt="Free eSIM Landing"
                className="w-full h-full bg-contain"
            />
            <div className="bg-white text-gray-800 px-2 md:px-6 xl:px-10 py-10 lg:py-20 max-w-4xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-10">
                    {t("freeEsimWorld.title")}
                </h1>
                <p className="text-2xl md:text-3xl mb-8 font-bold">
                    {t("freeEsimWorld.subtitle")}
                </p>
                <p className="text-base md:text-lg mb-10 whitespace-pre-line">
                    <Trans
                        i18nKey="freeEsimWorld.intro"
                        components={{ 1: <span className="font-semibold" /> }}
                    />
                </p>
                <div className="mb-10">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        {t("freeEsimWorld.howItWorks.title")}
                    </h2>
                    <ul className="space-y-3 text-base md:text-lg">
                        {t("freeEsimWorld.howItWorks.steps", { returnObjects: true }).map(
                            (step, idx) => (
                                <li key={idx}>{step}</li>
                            )
                        )}
                    </ul>
                </div>
                <div className="mb-10">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        {t("freeEsimWorld.topup.title")}
                    </h2>
                    <p className="mb-4 text-base md:text-lg">
                        {t("freeEsimWorld.topup.desc")}
                    </p>
                    <ul className="space-y-2 text-base md:text-lg list-disc list-inside">
                        {t("freeEsimWorld.topup.plans", { returnObjects: true }).map(
                            (plan, idx) => (
                                <li key={idx}>{plan}</li>
                            )
                        )}
                    </ul>
                    <p className="mt-4 text-base md:text-lg">
                        {t("freeEsimWorld.topup.footer")}
                    </p>
                </div>
                <div className="mb-10">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        {t("freeEsimWorld.why.title")}
                    </h2>
                    <ul className="space-y-2 text-base md:text-lg">
                        {t("freeEsimWorld.why.points", { returnObjects: true }).map(
                            (point, idx) => (
                                <li key={idx}>{point}</li>
                            )
                        )}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">
                        {t("freeEsimWorld.cta.title")}
                    </h2>
                    <p className="text-base md:text-lg">
                        {t("freeEsimWorld.cta.desc")}
                    </p>
                    <p className="text-base md:text-lg mb-12 font-bold">
                        {t("freeEsimWorld.cta.download")}
                    </p>
                    <Button
                        className={
                            "!text-base font-semibold !leading-[1.2]"
                        }
                        onClick={() => navigate("/fsim")}
                    >
                        {t("freeEsimWorld.cta.button")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

