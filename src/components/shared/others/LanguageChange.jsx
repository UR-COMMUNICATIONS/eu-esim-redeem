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

  // @malik Arslan, always resolve equal amount of hooks that are declared, so we can't conditionally call useTranslation() or useSelector() based on isTargetCountry. Instead, we filter the options after resolving them all.
  const resolvedOptions = languageOptions.map((option) => ({
    ...option,
    flagSrc: option.flag(),
  }));
  const visibleOptions = resolvedOptions.filter((lang) =>
    isTargetCountry ? languages[currentCountry]?.includes(lang.value) : lang,
  );

  return (
    <Select
      value={lang}
      onValueChange={handleLanguageChange}
      defaultValue={lang}
    >
      <SelectTrigger
        aria-label="selectLanguage"
        className="navbarLang h-10 w-full max-w-[320px] rounded-lg bg-eu-50 px-2 xl:w-16"
      >
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent align="end" side="bottom">
        {visibleOptions.map(({ _id, value, flagSrc }) => (
          <SelectItem
            key={_id}
            value={value}
            className={"flex flex-row gap-1 items-center"}
          >
            <img
              src={flagSrc}
              alt={t(`languageOptions.${value}`)}
              className="w-6 h-4 inline-block"
              title={t(`languageOptions.${value}`)}
            />{" "}
            <span className="countryName">{t(`languageOptions.${value}`)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
