import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { languages } from "@/lib/utils";
import { languageOptions } from "@/services";
import { setCartData } from "@/store/module/cart/cartSlice";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const LanguageSelect = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const currentLanguage = sessionStorage.getItem("i18next");
  const [lang, setLang] = useState(currentLanguage);

  const handleLanguageChange = (language) => {
    dispatch(setCartData({ userLanguage: language }));
    sessionStorage.setItem("i18next", language);
    setLang(language);
    i18next.changeLanguage(language);
    // window.location.reload();
  };
  useEffect(() => {
    setLang(currentLanguage);
    i18next.changeLanguage(currentLanguage);
    dispatch(setCartData({ userLanguage: currentLanguage }));
  }, [cart.userCountry?.country]);

  const { isTargetCountry, currentCountry } = useUserLocationLanguage();
  // const currentCountry = cart.userCountry?.country
  // console.log("lang option", isTargetCountry, currentCountry);

  return (
    <Select
      value={lang}
      onValueChange={handleLanguageChange}
      defaultValue={lang}
    >
      <SelectTrigger
        aria-label="selectLanguage"
        className="w-full max-w-[320px] xl:w-16 h-10 px-2 rounded-lg bg-main-20 navbarLang"
      >
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent align="end" side="bottom">
        {languageOptions
          ?.filter((lang) =>
            isTargetCountry
              ? languages[currentCountry]?.includes(lang.value)
              : lang,
          )
          // filter(lang => currentCountry === 'JP' ? ['en', 'jp'].includes(lang.value) : lang)?.
          ?.map(({ _id, label, value, flag }, index) => (
            <SelectItem
              key={_id}
              value={value}
              className={"flex flex-row gap-1 items-center"}
            >
              <img
                src={flag()}
                // alt={label}
                // alt={t(`languageOptions.${index}.label`)}
                alt={t(`languageOptions.${value}`)}
                className="w-6 h-4 inline-block"
                title={t(`languageOptions.${value}`)}
              />{" "}
              {/* <span className="countryName">{label}</span> */}
              <span className="countryName">
                {t(`languageOptions.${value}`)}
              </span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
