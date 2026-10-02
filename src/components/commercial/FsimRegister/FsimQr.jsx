import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { hostServices } from "@/general/host.services";
import { useSelector } from "react-redux";
import JtbLogo from "../FsimPartners/Fsim/JtbLogo";
import AirAsiaLogo from "../FsimPartners/Fsim/AirAsiaLogo";
import useDynamicImages from "@/hooks/useDynamicImages";

const FsimQr = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { cart } = useSelector((state) => state.cart);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [qrCode, setQr] = useState(null)
    const [esims, setEsims] = useState([])

    const { brand } = useParams();
    const comp = brand?.toLowerCase();

    const fsimQrCode = useDynamicImages("fsim-banner", "fsim-qr-code");

    const url = `${hostServices.remote}/jane/esim/`
    // const qrCode = `${hostServices.remote}/jane/esim/9000025081254830.png`

    const logoComponents = {
        jtb: <JtbLogo />,
        airasia: <AirAsiaLogo />
    }

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleBack = () => {
        // navigate(navBack[comp])
        navigate(`/${comp}`)
    }

    useEffect(() => {
        const esim = cart.esimDetails?.[0]
        // const code = `${hostServices.remote}/jane/esim/${esim?.qrCode}`
        const code = esim?.qrCode ? `${url}${esim?.qrCode}` : null
        setQr(code)
        setEsims(cart.esimDetails)
    }, [cart.esimDetails]);

    return (

        <div className="flex flex-col lg:flex-row min-h-screen w-full font-sans">
            {/* Left Section */}
            <div className="w-full min-h-screen lg:w-[50%] hidden lg:flex">
                <img
                    src={useDynamicImages("fsim-banner", comp == "frwfana" ? "fsim-register-ana" : "fsim-register")}
                    alt="Garuda Indonesia"
                    className="w-full h-full bg-contain"
                />
            </div>
            {/* Right Section */}
            <div className="w-full min-h-screen lg:w-[50%] overflow-y-auto">
                <div className="flex flex-col justify-between py-10 xl:py-20 lg:py-8 h-screen lg:h-full px-6 xl:px-0">
                    <div>
                        {logoComponents[comp]}
                        <div className="flex h-full lg:items-center justify-center lg:justify-start">
                            <div className="max-w-lg w-full mx-auto mb-0">
                                <div>
                                    <div className="flex flex-col justify-center items-center w-full h-full lg:mt-5 sm:mt-10 mt-16">
                                        <h2 className="text-2xl lg:text-4xl font-bold text-black text-center whitespace-pre-line">
                                            {t(`FsimRegister.scanqr`)}
                                        </h2>
                                        <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg whitespace-pre-line">
                                            {t(`FsimRegister.verifydevice`)}
                                        </p>
                                        <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px] lg:mt-5 md:mt-10 sm:mt-10 mt-5 md:my-0 sm:my-0 my-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                                            <img
                                                src={qrCode || fsimQrCode}
                                                alt="QR Code"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {/* {
                                            cart.esimDetails?.length == 0 ?
                                                <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px] lg:mt-5 md:mt-10 sm:mt-10 mt-5 md:my-0 sm:my-0 my-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                                                    <img
                                                        src={useDynamicImages("fsim-banner", "fsim-qr-code" )}
                                                        alt="QR Code"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                :
                                                cart.esimDetails?.map((esim) => {
                                                    const code = esim?.qrCode ? `${url}${esim?.qrCode}` : null
                                                    return (
                                                        <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px] lg:mt-5 md:mt-10 sm:mt-10 mt-5 md:my-0 sm:my-0 my-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
                                                            <img
                                                                // src={esim?.qrCode ? `${url}${esim?.qrCode}` : null || fsimQrCode}
                                                                src={qrCode || fsimQrCode}
                                                                alt="QR Code"
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                )
                                        } */}
                                        <button
                                            onClick={handleBack}
                                            className="mt-16 px-10 py-4 rounded-xl font-medium shadow-md transition-all duration-300 bg-[#00264C] hover:bg-[#00264C] hover:shadow-green-200 text-white"
                                        >
                                            {t("FsimRegister.main", "Back to Main")}
                                        </button>
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
                                            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center">
                                                {t(`FsimRegister.scanqr`)}
                                            </DialogTitle>
                                            <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg">
                                                {t(`FsimRegister.verifydevice`)}
                                            </p>
                                            <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px]" >
                                                <img
                                                    src={qrCode || fsimQrCode}
                                                    alt="QR Code"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <div>
        //     <div className="flex flex-col justify-center items-center w-full h-full lg:mt-5 sm:mt-10 mt-16">
        //         <h2 className="text-2xl lg:text-4xl font-bold text-black text-center">
        //             {t(`FsimRegister.scanqr`)}
        //         </h2>
        //         <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg">
        //             {t(`FsimRegister.verifydevice`)}
        //         </p>
        //         <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px] lg:mt-5 md:mt-10 sm:mt-10 mt-5 md:my-0 sm:my-0 my-4 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        //             <img
        //                src={qrCode || fsimQrCode}
        //                 alt="QR Code"
        //                 className="w-full h-full object-contain"
        //             />
        //         </div>
        //     </div>
        //     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} className='relative'>
        //         <DialogContent
        //             showCloseIcon={isSmallScreen ? true : false}
        //             className="w-[calc(100vw-32px)] max-w-[500px] h-full max-h-[400px] sm:max-h-[500px] flex flex-col items-center justify-center p-10 sm:rounded-[40px] rounded-[20px]"

        //         >
        //             <button
        //                 className="bg-white absolute left-[500px] bottom-[490px] rounded-[100px] w-[24px] h-[24px] sm:flex justify-center items-center border-none focus:outline-none shadow-md hidden"
        //                 onClick={() => setIsDialogOpen(false)}
        //             >
        //                 <Cross2Icon className="h-4 w-4" color="#F55151" />
        //             </button>
        //             <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
        //                 {t(`FsimRegister.scanqr`)}
        //             </DialogTitle>
        //             <p className="text-black mt-2 mb-6 text-center text-sm lg:text-lg">
        //                 {t(`FsimRegister.verifydevice`)}
        //             </p>
        //             <div className="w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] lg:w-[274px] lg:h-[272px]" >
        //                 <img
        //                     src={qrCode || fsimQrCode}
        //                     alt="QR Code"
        //                     className="w-full h-full object-contain"
        //                 />
        //             </div>
        //         </DialogContent>
        //     </Dialog>
        // </div>
    );
};

export default FsimQr;
