import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import { useSelector } from "react-redux";
import CorporateAccountTerms from "./CorporateAccountTerms";
import CorporateCheckbox from "./CorporateCheckbox";
import CustomDropdown from "@/components/shared/CustomDropdown";

const CorporateAccountForm = () => {
    const { contact, faqs } = useSelector((state) => state.contact);
    const { t } = useTranslation();
    const { cart } = useSelector((state) => state.cart);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [missingFieldsList, setMissingFieldsList] = useState([]);


    const initialFormData = useMemo(
        () => ({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            address: "",
            apartment: "",
            country: cart?.productCountry || "",
            cityState: "",
            province: "",
            postalCode: "",
            text: "",
            memberOfYoowifi: false,
            agreedToTerms: false,
        }),
        [cart?.productCountry]
    );

    const [formData, setFormData] = useState(initialFormData);
    const [contactNo, setcontactNo] = useState({ code: "", number: "" });

    // Handles input field changes
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Handles select dropdown changes
    const handleSelectChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Merge phone number logic efficiently
        const updatedFormData = {
            ...formData,
            phone:
                contactNo.code && contactNo.number ? contactNo.number : formData.phone,
        };

        // Define required fields
        const requiredFields = ["email", "phone", "companyName"];

        // Find missing fields dynamically
        const missingFields = requiredFields.reduce((acc, field) => {
            if (
                updatedFormData[field] === null ||
                updatedFormData[field] === undefined ||
                updatedFormData[field] === false || // Now false is treated as invalid
                (typeof updatedFormData[field] === "string" &&
                    !updatedFormData[field].trim())
            ) {
                acc.push(t(`form.${field}`));
            }

            return acc;
        }, []);

        // Show error if any fields are missing

        if (!formData.agreedToTerms) {
            missingFields.push(t("form.agreeToTerms"));
        }
        if (missingFields.length > 0) {
            setMissingFieldsList(missingFields);
            setIsDialogOpen(true);
            return;
        }

        // if (missingFields.length > 0) {
        //     alert(`Missing fields: ${missingFields.join(", ")}`);
        //     return;
        // }
        // if (formData.agreedToTerms === false) {
        //     alert("You must agree to the terms and conditions");
        //     return;
        // }
    };

    return (
        <div className="flex justify-center md:mt-[127px] mt-[30px]">
            <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
                <div className="w-full grid grid-cols-2 h-fit gap-x-[28px] gap-y-6 items-end">
                    {/* First Name & Last Name */}
                    <Input
                        label={t("authModal.placeholders.firstName")}
                        placeholder={t("authModal.placeholders.firstName")}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        wrapperClass="col-span-2 md:col-span-1"
                    />
                    <Input
                        label={t("authModal.placeholders.lastName")}
                        placeholder={t("authModal.placeholders.lastName")}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        wrapperClass="col-span-2 md:col-span-1"
                        className="no-spinner"
                    />

                    {/* Email */}
                    <Input
                        label={`${t("contact.letsTalk.form.fields.2.label")} *`}
                        placeholder={t("contact.letsTalk.form.fields.2.label")}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        wrapperClass="col-span-2"
                    />

                    {/* Phone Code & Number */}
                    <div className="md:flex w-full col-span-2 gap-x-[28px] items-end">
                        {/* <Select
              onValueChange={(value) => handleSelectChange("phoneCode", value)}
            >
              <SelectTrigger className="col-span-2 md:col-span-1 w-full md:w-[301px]">
                <SelectValue placeholder={t("form.code")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
                <SelectItem value="+91">+91</SelectItem>
              </SelectContent>
            </Select> */}
                        {/* <PhonecodeSelect />
            <Input
              placeholder={t("form.mobileNumber")}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              wrapperClass="col-span-2 md:col-span-1 w-full"
              className="no-spinner"
            /> */}
                        <PhoneInput
                            defaultCountry={cart?.userCountry?.country?.toLowerCase()}
                            value={contactNo.number}
                            className={cn(
                                "text-sm md:text-base !mt-0 font-normal !leading-normal w-full bg-white"
                            )}
                            onChange={(value, obj) =>
                                setcontactNo({
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
                    </div>

                    {/* Company Information */}
                    <Input
                        label={t("form.companyInformation")}
                        placeholder={t("form.companyName")}
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="no-spinner"
                        wrapperClass="col-span-2"
                    />

                    {/* Address */}
                    <Input
                        placeholder={t("form.address")}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="no-spinner"
                        wrapperClass="col-span-2"
                    />
                    <Input
                        placeholder={t("form.apartment")}
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="no-spinner"
                        wrapperClass="col-span-2"
                    />

                    {/* Country Selector */}
                    <CustomDropdown
                        onChange={(countryObj) => handleSelectChange("country", countryObj?.countryCode)}
                    />

                    {/* City & Province */}
                    <Input
                        placeholder={t("form.cityState")}
                        name="cityState"
                        value={formData.cityState}
                        onChange={handleChange}
                        className="no-spinner"
                        wrapperClass="col-span-1 md:col-span-1"
                    />
                    <Select
                        onValueChange={(value) => handleSelectChange("province", value)}
                    >
                        <SelectTrigger className="col-span-1 md:col-span-1 w-full">
                            <SelectValue placeholder={t("form.province")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="province1">Province 1</SelectItem>
                            <SelectItem value="province2">Province 2</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Postal Code */}
                    <Input
                        placeholder={t("form.postalCode")}
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="no-spinner"
                        wrapperClass="col-span-1 md:col-span-1"
                    />

                    {/* Additional Information */}
                    <Textarea
                        label={t("form.additionalInformation")}
                        placeholder={t("form.optional")}
                        wrapperClass="col-span-2"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        className="resize-none"
                    />
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-lg">
                        <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">{t("form.missingFields")}</DialogTitle>
                        <ul className="list-disc pl-5">
                            {missingFieldsList.map((field, index) => (
                                <li key={index} className="text-red-500">{field}</li>
                            ))}
                        </ul>
                    </DialogContent>
                </Dialog>

                {/* Corporate Checkbox */}
                <CorporateCheckbox
                    handleSelectChange={handleSelectChange}
                    formData={formData}
                    type="checkbox"
                />

                {/* Submit Button */}
                <div className="flex justify-center md:mt-[83px] mt-[43px]">
                    <Button type="submit" size="lg" className="mt-6 w-full md:w-[202px]" onClick={() => setIsDialogOpen(false)}>
                        {t("buttonText.submit")}
                    </Button>
                </div>

                {/* Terms & Conditions */}
                <CorporateAccountTerms />
            </form>
        </div>
    );
};

export default CorporateAccountForm;
