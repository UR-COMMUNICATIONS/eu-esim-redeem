import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../../../hooks/useRecaptcha';
import useModal from '@/hooks/useModal';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

const GoogleCaptcha = () => {
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
    const { setIsAuthDialogOpen, setIsOtpDialogOpen, otpModal } = useModal();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (capchaToken) {
        setIsOtpDialogOpen(true, 2) // signInStage 2 is for otp dialog
        // }
        // if (capchaToken) {
        //     // Send login request with captcha token, username, and password
        //     const result = await axios.post(`https://your-login-endpoint`, {
        //         username,
        //         password,
        //         capchaToken,
        //     });

        //     // Check if the reCAPTCHA validation failed on the server-side
        //     if (result.data.recaptchaValid === false) {
        //         alert('ReCAPTCHA validation failed. Please try again.');
        //         handleRecaptcha('');
        //         if (recaptchaRef.current) {
        //             recaptchaRef.current.reset();
        //         }
        //         return;
        //     }

        //     // Reset captcha after submission
        //     recaptchaRef.current?.reset();

        //     // If the login is successful, perform post-login logic
        //     if (result.data.success) {
        //         // Example post-login logic:
        //         // - Store user token or session data
        //         // - Redirect to a protected page
        //         // - Update user state in the application
        //         console.log('Login successful');
        //         // ...
        //     } else {
        //         // If the login fails, display an error message to the user
        //         alert('Login failed. Please check your credentials and try again.');
        //     }
        // } else {
        //     alert('Please fill in all fields and complete the captcha.');
        // }
    };

    useEffect(() => {
        if (capchaToken) {
            // setIsOpen(false);
            // setSignInStage(4);
            // setIsAuthDialogOpen(true)
            setIsButtonDisabled(false)
        }
    }, [capchaToken]);


    return (
        // <form onSubmit={handleSubmit}>
        <>
            <div className="flex justify-center pt-6 px-2 md:px-8 mt-16 mb-16">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LezyEMrAAAAABB-BiJCGIgHzfaU558dMjNcNnSN"
                    onChange={handleRecaptcha}
                />
            </div>
            <div className="flex justify-center pt-6 px-2 md:px-8 mt-16 mb-16">
                <Button
                    size="lg"
                    className={cn(
                        "h-11 md:h-[52px] text-base font-semibold !leading-[1.2] rounded-xl select-none",
                        // isButtonDisabled && "bg-disabled",

                    )}
                    // disabled={isButtonDisabled}
                    onClick={handleSubmit}
                >
                    {t(`buttonText.continue`)}
                </Button>
            </div>
            {/* </form > */}
        </>
    );
};

export default GoogleCaptcha;
