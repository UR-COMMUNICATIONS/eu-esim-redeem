import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    commercialRoutes,
    ErrorIcon,
    SuccessIcon,
    validateEmail,
} from "@/services";
import { Fragment, useEffect, useRef, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { LogOutIcon, User2Icon, UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDisApi } from "@/general";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuth, setUserData } from "@/store/module/auth/slice";
import { resetCart } from "@/store/module/cart/cartSlice";
import { resetPlan } from "@/store/module/plan/planSlice";
import Loader from "../Loader";
import ReCAPTCHA from "react-google-recaptcha";

const DialogHeader = ({ title, text }) => {
    return (
        <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700 !leading-[1.4] text-center">
                {title}
            </h1>
            <p className="text-sm md:text-base !leading-[1.4] md:!leading-[1.5] text-center text-black-600">
                {text}
            </p>
        </div>
    );
};

const OTPInput = ({ setOtp, ...props }) => {
    return (
        <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            containerClassName={"w-full"}
            onChange={(otp) => setOtp(otp)}
            autoFocus
            {...props}
        >
            <InputOTPGroup className={"w-full flex justify-center gap-3"}>
                {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                        index={index}
                        key={index}
                        readOnly
                        className={
                            "border-2 shadow-none text-black-600 rounded-[8px] md:rounded-xl h-10 md:h-[52px] w-10 md:w-[52px] text-lg md:text-[27px] !leading-[1.4]"
                        }
                    />
                ))}
            </InputOTPGroup>
        </InputOTP>
    );
};

const BottomTextLink = ({ text, linkText, onClick }) => (
    <p className="text-sm md:text-base font-normal text-black-600 mt-2 md:mt-3">
        {text}{" "}
        <span
            className="font-semibold text-main-600 hover:underline cursor-pointer"
            onClick={onClick}
        >
            {linkText}
        </span>
    </p>
);

const OtpDialog = ({ isOpen, setIsOpen }) => {

    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [otp, setOtp] = useState("");
    const [process, setProcess] = useState({
        title: "",
        alertMessage: "",
        alertType: "",
        isDialog: false,
        isProcessing: false,
        isSuccess: false,
    });

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRef = useRef();

    useEffect(() => {
        setIsButtonDisabled(otp.length !== 6);
    }, [otp]
    );

    const resetDialog = () => {
        setIsOpen(!isOpen);
        setProcess({
            ...process,
            isDialog: false,
            isProcessing: false,
            isSuccess: false,
            title: "",
            alertType: "",
            alertMessage: "",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => resetDialog()}>
            <DialogContent
                showCloseIcon={true}
                className="w-[calc(100vw-32px)] max-w-[540px] h-auto min-h-[286px] sm:min-h-[438px] rounded-xl md:rounded-3xl flex flex_center flex-col px-4 md:px-8 lg:px-[60px] pt-10 md:pt-[60px] pb-6 md:pb-[60px] gap-6 md:gap-12 bg-white"
            >
                <DialogTitle className={"hidden"} />
                {process.isDialog && (
                    <Fragment>
                        {process.isProcessing ? (
                            <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
                                <Loader
                                    type="Oval"
                                    color="white"
                                    height={"18vw"}
                                    width={"18vw"}
                                    className="max-h-[100px] max-w-[100px] min-h-[60px] min-w-[60px]"
                                    wrapperStyle={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                />
                            </div>
                        ) : (
                            <ErrorIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24" />
                        )}
                        <div className="text-center flex flex-col gap-2 sm:gap-2">
                            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
                                {process.isProcessing
                                    ? t("process.processing")
                                    : t("process.failed")}
                            </DialogTitle>
                            <p className="text-base text-black-700">
                                {process.isProcessing
                                    ? t("process.processMessage")
                                    : process.alertMessage}
                            </p>
                        </div>
                    </Fragment>
                )}
                <Fragment>
                    <DialogHeader
                        title={t(`authModal.authMessages.verification.title`)}
                        text={t(`authModal.authMessages.verification.text`)}
                    />
                    <OTPInput setOtp={setOtp} />
                </Fragment>

                {/* EVENT HANDLER BUTTON WITH BOTTOM TEXT AND NAVIGATION */}
                {/* {!process.isProcessing && signInStage <= 3 && signUpStage <= 4 && ( */}
                <div className="w-full flex_center flex-col">
                    <Button
                        size="lg"
                        className={cn(
                            "h-11 md:h-[52px] text-base font-semibold !leading-[1.2] rounded-xl select-none",
                            isButtonDisabled && "bg-disabled",
                            "w-full"
                        )}
                        disabled={isButtonDisabled}
                    // onClick={handleContinuePress}
                    >
                        {t(`buttonText.verify`)}
                    </Button>

                    <BottomTextLink
                        text={t(`authModal.prompts.resendOTP.text`)}
                        linkText={t(`authModal.prompts.resendOTP.linkText`)}
                    // onClick={() => {
                    //     // Function to send otp
                    //     // Add your resend OTP logic here
                    //     // For example:
                    //     if (signInStage === 2) {
                    //         const phoneNumber =
                    //             contact.code +
                    //             "-" +
                    //             contact.number.substring(contact.code.length);
                    //         loginPassCode({ userId: phoneNumber });
                    //     } else if (signUpStage === 3) {
                    //         const phoneNumber =
                    //             contact.code +
                    //             "-" +
                    //             contact.number.substring(contact.code.length);
                    //         const request = {
                    //             userId: email,
                    //             firstName: name.firstName,
                    //             lastName: name.lastName,
                    //             userName: name.firstName + " " + name.lastName,
                    //             phone: phoneNumber,
                    //             dob: "2000-01-01",
                    //             country: cart.userCountry?.country,
                    //             originCountry: cart.userCountry?.country,
                    //         };
                    //         registerPassCode(request);
                    //     }
                    // }}
                    />

                </div>
                {/* )} */}
            </DialogContent>
        </Dialog>
    );
};

export default OtpDialog;
