import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";
import { ArrowRightIcon, images } from '@/services';
import { useDisApi } from "@/general";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { cart } = useSelector((state) => state.cart);

    const [contact, setContact] = useState({ code: "", number: "" });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const verifyAndRegister = useDisApi({
        apiCall: "createUser",
        setCallBack: (res) => {
            if (res?.status?.result) {
                console.log("result", res?.status?.result)
            } else {
            }
        },
    });

    const handleSignUp = async () => {

        const request = {
            email: email,
            firstName: name.firstName,
            phone: contact.number,

        };
        // await verifyAndRegister(request);

    }

    return (
        <>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#4F4F4F] text-center">
                {t(`FsimRegister.header`)}
            </h2>
            <p className="text-[#888888] mt-2 mb-6 text-center text-sm lg:text-lg">
                {t(`FsimRegister.dec`)}
            </p>

            <form className="space-y-5">
                <Input
                    placeholder={t(`FsimRegister.name`)}
                    name="firstName"
                    type="text"
                    onChange={(e) =>
                        // setName({ ...name, firstName: e.target.value })
                        setName(e.target.value)
                    }
                    required
                />
                <Input
                    placeholder={t(`FsimRegister.email`)}
                    name="email"
                    type="email"
                    onChange={(e) =>
                        setEmail(e.target.value.replace(/\s/g, "").toLowerCase())
                    }
                    required
                />
                <PhoneInput
                    defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                    value={contact.number}
                    className={cn(
                        "text-sm md:text-base font-normal !leading-normal w-full bg-white"
                    )}
                    onChange={(value, obj) =>
                        setContact({
                            ...contact,
                            code: "+" + obj?.country?.dialCode || "",
                            number: value,
                        })
                    }
                    style={{
                        "--react-international-phone-flag-background-color":
                            "transparent rounded-[20px]",
                    }}
                />
                <div className="flex justify-center items-center">
                    <Button
                        className="bg-[#00264C] hover:bg-[#00264C] text-[18px] w-full flex items-center justify-center text-center"
                        onClick={() => handleSignUp()}
                    // onClick={() => navigate("/confirmation-message")}
                    >
                        <span className="block sm:inline sm:whitespace-nowrap whitespace-pre-line leading-snug">
                            {t(`FsimRegister.buttonText`)}
                        </span>
                        <ArrowRightIcon className="!h-6 !w-6 shrink-0 ml-2 mt-1 sm:mt-0" />
                    </Button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
