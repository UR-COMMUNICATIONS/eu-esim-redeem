import { cn } from "@/lib/utils";
import { YooWifiLogoIcon } from "@/services";
import React from "react";
import { images } from "@/services";
import { useTranslation } from "react-i18next";

const DownloadApp = () => {
    const { t } = useTranslation(["translation", "english", "local"])
    const steps = t("anaxYoowifi.howtoRedeemSteps", { returnObjects: true });
    return (
        <>
        </>
    );
};

export default DownloadApp;
