import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Language } from "../types";
import { GetLanguages } from "../utils";
import LanguageDropdown from "./LanguageDropdown";

type PageProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultValue?: Language;
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: Language) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  displayNative?: boolean;
  src?: string;
};
const LanguageSelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  displayNative,
  src,
  ...props
}: PageProps) => {
  const [languagesunfiltered, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    GetLanguages(src).then((data) => {
      setLanguages(data);
    });
  }, [src]);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <LanguageDropdown
          {...props}
          placeHolder={placeHolder}
          options={languagesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Language);
            }
          }}
          displayNative={displayNative}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default LanguageSelect;
