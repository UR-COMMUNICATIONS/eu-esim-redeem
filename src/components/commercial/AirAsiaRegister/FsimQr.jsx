import { useState, useEffect } from "react";
import { images, SuccessIcon } from "@/services";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Cross2Icon } from "@radix-ui/react-icons";
import useDynamicImages from "@/hooks/useDynamicImages";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

const FsimQr = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-full h-full lg:mt-5 sm:mt-10 mt-16">
                <h2 className="text-2xl lg:text-4xl font-bold text-black text-center">
                    {t(`FsimRegister.scanqr`)}
                </h2>
                <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg">
                    {t(`FsimRegister.verifydevice`)}
                </p>
                <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px] lg:mt-5 md:mt-10 sm:mt-10 mt-5 md:my-0 sm:my-0 my-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                    <img
                        src={useDynamicImages("fsim-banner", "fsim-qr-code" )}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className='relative'>
                <DialogContent
                    showCloseIcon={isSmallScreen ? true : false}
                    className="w-[calc(100vw-32px)] max-w-[500px] h-full max-h-[400px] sm:max-h-[500px] flex flex-col items-center justify-center p-10 sm:rounded-[40px] rounded-[20px]"

                >
                    <button
                        className="bg-white absolute left-[500px] bottom-[490px] rounded-[100px] w-[24px] h-[24px] sm:flex justify-center items-center border-none focus:outline-none shadow-md hidden"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        <Cross2Icon className="h-4 w-4" color="#F55151" />
                    </button>
                    <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                        {t(`FsimRegister.scanqr`)}
                    </DialogTitle>
                    <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg">
                        {t(`FsimRegister.verifydevice`)}
                    </p>
                    <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px]" >
                        <img
                            src={useDynamicImages("fsim-banner", "fsim-qr-code" )}
                            alt="QR Code"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FsimQr;
