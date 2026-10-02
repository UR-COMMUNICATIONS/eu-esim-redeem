import { cn } from "@/lib/utils";
import { commercialRoutes, YooWifiLogoIcon } from "@/services";
import React from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import upgradeDevice from '@assets/images/anax-banner/upgrade-device.webp'
import useDynamicImages from "@/hooks/useDynamicImages";

const DeviceUpgradePH = () => {
    const { t } = useTranslation(["translation", "english", "local"])
    const steps = t("DeviceUpgrade.howtoRedeemSteps", { returnObjects: true });
    const navigate = useNavigate();
    const hurryText = t("DeviceUpgradePH.hurry");
    const replacedText = hurryText.replace(
        "15th",
        '15<sup>th</sup>'
    );

    return (
        <div className="bg-white p-6 md:p-10 mx-auto rounded-xl space-y-6">
            <img
                src={upgradeDevice}
                alt="upgradeDevice"
                className="w-full h-auto pt-4 md:pt-[29px]"
            />
            <h2 className="text-[18px] md:text-[36px] lg:text-[45px] font-bold leading-tight">
                {t(`DeviceUpgrade.deviceUpgrade`)}
            </h2>
            <p className="md:text-[26px] text-[18px] " style={{ whiteSpace: "pre-line" }}>
                <Trans i18nKey="DeviceUpgrade.upgradeDevice" components={{ strong: <strong className="font-bold" /> }} />
            </p>

            <div>
                <h3 className="text-[18px] md:text-[36px] lg:text-[45px] mb-2">{t(`DeviceUpgrade.howtoUpgrade`)}</h3>
                <ol className="list-decimal list-inside space-y-1 md:text-[26px] text-[18px]">
                    <li><Trans i18nKey="DeviceUpgrade.openYoowifi" components={{ strong: <strong className="font-bold" /> }} /></li>
                    <li><Trans i18nKey="DeviceUpgradePH.PromoCode" components={{ strong: <strong className="font-bold" /> }} /></li>
                    <li><Trans i18nKey="DeviceUpgrade.pickPreferred" components={{ strong: <strong className="font-bold" /> }} /></li>
                    <img
                        src={useDynamicImages("anax-banner", "promo-bnr-ph" )}
                        alt="promoBnr"
                        className="w-full h-auto pt-4 md:pt-[29px]"
                    />
                    <li className="md:pt-[29px]">{t(`DeviceUpgrade.checkOut`)}</li>
                </ol>
            </div>

            <p className="md:text-[26px] text-[18px]">
                {t(`DeviceUpgrade.preloaded`)}
            </p>

            <div>
                <h3 className="text-[18px] md:text-[36px] lg:text-[45px] mb-2">{t(`DeviceUpgrade.waitingforYou`)}</h3>
                <ul className="list-disc list-inside space-y-1 md:text-[26px] text-[18px]">
                    <li className="font-bold">{t(`DeviceUpgrade.upSpeed`)}</li>
                    <li className="font-bold">{t(`DeviceUpgrade.connectDevices`)}</li>
                    <li><Trans i18nKey="DeviceUpgrade.smartDisplay" components={{ strong: <strong className="font-bold" /> }} /></li>
                </ul>
            </div>

            <p className="md:text-[26px] text-[18px] whitespace-pre-line">
                {t(`DeviceUpgrade.devicesReady`)}
            </p>
            <div className="space-y-0">
                <p className="md:text-[26px] text-[18px] font-medium text-red-500">
                    ⏳<span dangerouslySetInnerHTML={{ __html: replacedText }} />
                </p>
                <p className="md:text-[26px] text-[18px]">
                    <Trans i18nKey="DeviceUpgradePH.buttonBelow" components={{ strong: <strong className="font-bold" /> }} />
                </p>
            </div>
            <div className="flex justify-center">
                <a
                    href="https://link.yoowifi.com/FJxw?ref=qrcode"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-200 text-[18px]"
                    // onClick={() => navigate(commercialRoutes.DownloadApp.path)}
                    >
                        {t(`DeviceUpgradePH.reserveDevice`)}
                    </button>
                </a>
            </div>
        </div>
    );
};

export default DeviceUpgradePH;
