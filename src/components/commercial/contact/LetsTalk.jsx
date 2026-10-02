import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDisApi } from "@/general";
import useDynamicImages from "@/hooks/useDynamicImages";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { handleNumericInput, SuccessIcon } from "@/services";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { countries } from "@/general/Arrays";

const LetsTalk = ({
  data = [],
  socialLinks = [],
  /** `"marine"` — smaller icons inside light rounded bordered chips */
  socialLinksVariant = "default",
  whatsappLink: whatsappLinkProp, // optional: when not passed, uses useUserLocationLanguage()
  supportPhone: supportPhoneProp, // optional: when not passed, uses useUserLocationLanguage()
} = {}) => {
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [subject, setSubject] = useState("");
  // const [text, setText] = useState("");

  const { supportEmail, supportPhone, WhatsappLink, supportimage } =
    useUserLocationLanguage();
  const displayPhone = supportPhoneProp ?? supportPhone;
  const displayWhatsappLink = whatsappLinkProp ?? WhatsappLink;
  let updateData = JSON.parse(JSON.stringify(data));
  updateData[1].value = supportEmail;
  updateData[0].value = displayPhone;
  updateData[0].image = supportimage;

  const maxChars = 250;

  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    text: "",
    originCountryName: "",
    originCountryCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Field Name: ${name}, Field Value: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDisable = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.subject ||
      !formData.text ||
      !formData.originCountryName ||
      !formData.originCountryCode
    ) {
      return true;
    } else {
      return false;
    }
  };

  const contactUs = useDisApi({
    apiCall: "contactUs",
    setCallBack: (res) => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        text: "",
        originCountryName: "",
        originCountryCode: "",
      });
      setIsDialogOpen(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit data", formData);
    contactUs(formData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submit data", { name, phone, email, subject, text });
  //   setName("");
  //   setPhone("");
  //   setEmail("");
  //   setSubject("");
  //   setText("");
  // };

  const parseMessage = (message) => {
    const parts = message.split(/(<a[^>]*>.*?<\/a>)/g);
    return parts.map((part, index) => {
      if (part.startsWith("<a")) {
        return (
          <a key={index} href="/faq" className="underline">
            FAQ
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="containerX xl:px-0" id="lets-talk">
      <div className="sec_common_80 xl:px-0 flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-[60px]">
        {/* LEFT PORTION */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-12">
          <h2 className="title text-start">{t("contact.letsTalk.heading")}</h2>
          <p className="p_common text-black-700">
            {t("contact.letsTalk.subHeading")}
          </p>

          {updateData?.map((item, index) => {
            const imageSrc = useDynamicImages(
              "others",
              item.type === "email" ? "email" : "whatsapp",
            );

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-row items-center gap-6",
                  index === 1 && "mt-2 md:mt-0",
                )}
              >
                <LazyLoadImage
                  src={imageSrc}
                  alt={item?.name}
                  title={item?.name}
                  className="w-12 md:w-16 aspect-square shrink-0 object-contain"
                />

                <div className="flex flex-col gap-1">
                  <p className="p_common text-black-600 uppercase">
                    {t(`contact.letsTalk.social.${index}.text`)}
                  </p>
                  <a
                    href={
                      item.type === "email"
                        ? `mailto:${item.value}`
                        : displayWhatsappLink
                    }
                    target="_blank"
                    className="text-lg md:text-2xl font-semibold md:font-bold !leading-[1.4]"
                  >
                    {item?.value}
                  </a>
                </div>
              </div>
            );
          })}
          {socialLinks.length > 0 && (
            <div
              className={cn(
                "flex items-center mt-2 md:mt-0",
                socialLinksVariant === "marine" ? "flex-wrap gap-3" : "gap-x-5",
              )}
            >
              {socialLinks.map((item, index) =>
                socialLinksVariant === "marine" ? (
                  <a
                    key={item._id ?? index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      "border border-gray-200 bg-white/90 text-gray-700 shadow-sm",
                      "transition-colors hover:border-gray-300 hover:bg-white",
                      "[&_svg]:!h-[15px] [&_svg]:!w-[15px] [&_svg]:max-h-[15px] [&_svg]:max-w-[15px]",
                      "[&_svg]:lg:!h-[15px] [&_svg]:lg:!w-[15px]",
                    )}
                  >
                    {item.icon()}
                  </a>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={item._id ?? index}
                  >
                    {item.icon()}
                  </a>
                ),
              )}
            </div>
          )}
        </div>

        {/* RIGHT PORTION */}
        <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
          <div className="w-full grid grid-cols-2 h-fit gap-x-[28px] gap-y-6">
            <Input
              label={t(`contact.letsTalk.form.fields.0.label`)}
              placeholder={t(`contact.letsTalk.form.fields.0.placeholder`)}
              name="name"
              value={formData.name}
              onChange={handleChange}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              wrapperClass={"col-span-2 md:col-span-1"}
            />
            <Input
              label={t(`contact.letsTalk.form.fields.1.label`)}
              placeholder={t(`contact.letsTalk.form.fields.1.placeholder`)}
              name="phone"
              wrapperClass={"col-span-2 md:col-span-1"}
              className="no-spinner"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handleNumericInput}
              onPaste={handleNumericInput}
            />
            <Input
              label={t(`contact.letsTalk.form.fields.2.label`)}
              placeholder={t(`contact.letsTalk.form.fields.2.placeholder`)}
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              value={formData.email}
              onChange={handleChange}
              className="no-spinner"
              wrapperClass={"col-span-2"}
            />
            <div className="relative flex flex-col gap-2 col-span-2">
              <span className="label">{t(`form.originCountry`)}</span>
              <Select
                value={formData.originCountryCode}
                onValueChange={(value) => {
                  const selectedCountry = countries.find(
                    (c) => c.countryCode === value,
                  );
                  setFormData((prev) => ({
                    ...prev,
                    originCountryCode: value,
                    originCountryName: selectedCountry?.countryName || "",
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t(`form.selectOriginCountry`)} />
                </SelectTrigger>
                <SelectContent>
                  {countries?.map((country, index) => (
                    <SelectItem key={index} value={country.countryCode}>
                      {country.emoji} {country.countryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <Input
              label={t(`contact.letsTalk.form.fields.3.label`)}
              placeholder={t(`contact.letsTalk.form.fields.3.placeholder`)}
              name="subject"
              // value={subject}
              // onChange={(e) => setSubject(e.target.value)}
              value={formData.subject}
              onChange={handleChange}
              className="no-spinner"
              wrapperClass={"col-span-2 md:col-span-1"}
            /> */}
            <div className="relative flex flex-col gap-2 col-span-2">
              <span className="label">
                {t(`contact.letsTalk.form.fields.3.label`)}
              </span>
              <Select
                value={formData.subject}
                onValueChange={(value) =>
                  handleChange({ target: { name: "subject", value: value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={t(
                      `contact.letsTalk.form.fields.3.placeholder`,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Array(8)
                    .fill(8)
                    ?.map((_, index) => (
                      <SelectItem
                        key={index}
                        value={t(`form.contactSubjects.${index}`)}
                      >
                        {t(`form.contactSubjects.${index}`)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              label={t(`contact.letsTalk.form.fields.4.label`)}
              placeholder={t(`contact.letsTalk.form.fields.4.placeholder`)}
              wrapperClass={"col-span-2"}
              name="text"
              // value={text}
              // onChange={(e) => setText(e.target.value)}
              value={formData.text}
              onChange={handleChange}
              maxLength={maxChars}
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            size={"lg"}
            className="mt-6"
            onClick={() => setIsDialogOpen(false)}
            disabled={handleDisable()}
          >
            {t("buttonText.submit")}
          </Button>
        </form>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            showCloseIcon={false}
            className="w-[calc(100vw-32px)] max-w-[700px] h-full max-h-[400px] sm:max-h-[500px] flex flex-col items-center justify-center p-10 bg-main-50"
          >
            <SuccessIcon className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28" />
            <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-700">
              {t("orderSummary.thankReaching")}
            </DialogTitle>
            <p className="text-base text-black-700">
              {parseMessage(t("orderSummary.receivedYourMessage"))}
              <br />
              <span className="text-center block">
                {t("orderSummary.lookForwardSoon")}
              </span>
            </p>

            <DialogClose
              onClick={() => setIsDialogOpen(false)}
              className="px-10 py-4 bg-main-600 text-white rounded-xl max-w-max mx-auto outline-none border-none md:mt-5"
            >
              {t("orderSummary.continue")}
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LetsTalk;
