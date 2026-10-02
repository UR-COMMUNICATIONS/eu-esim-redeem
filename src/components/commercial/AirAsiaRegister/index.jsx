import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { images, commercialRoutes } from '@/services';
import { Trans } from "react-i18next";
import FsimLogo from "../Fsim/FsimLogo";
import RegisterForm from "./RegisterForm";
import FsimQr from "./FsimQr";
import useDynamicImages from "@/hooks/useDynamicImages";

const FsimRegister = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans">
            {/* Left Section */}
            <div className="w-full min-h-screen lg:w-[50%] hidden lg:flex">
                <img
                    src={useDynamicImages("fsim-banner", "fsim-register" )}
                    alt="Garuda Indonesia"
                    className="w-full h-full bg-contain"
                />
            </div>
            {/* Right Section */}
            <div className="w-full min-h-screen lg:w-[50%]">
                <div className="flex flex-col justify-between py-10 xl:py-20 lg:py-8 h-screen lg:h-full px-6 xl:px-0">
                    <div>
                        <FsimLogo />
                        <div className="flex h-full lg:items-center justify-center lg:justify-start">
                            <div className="max-w-lg w-full mx-auto mb-0">
                                <div className="xl:mt-5 lg:mt-0 mt-5 ">
                                    <RegisterForm />
                                </div>
                                {/* <FsimQr/> */}
                            </div>
                        </div>
                    </div>
                    <p className="text-[#888888] text-center text-sm lg:text-lg whitespace-pre-line xl:mt-0 lg:mt-10 md:mt-0 sm:mt-0 mt-8 sm:mb-0 mb-2">
                        <Trans
                            i18nKey="FsimRegister.condition"
                            components={{
                                a1: (
                                    <a
                                        href={commercialRoutes.termsService.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                                    />
                                ),
                                a2: (
                                    <a
                                        href={commercialRoutes.privacyPolicy.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#244C75] font-semibold border-b-2 border-[#244C75]"
                                    />
                                )
                            }}
                        />
                    </p>

                </div>

            </div>
        </div>
    );
};

export default FsimRegister;
