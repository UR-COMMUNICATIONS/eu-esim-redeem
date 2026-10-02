import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { City } from "../types";
import { GetCity } from "../utils";
import Dropdown from "./Dropdown";
type PageProps = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: City) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: City;
  countryid: number;
  stateid: number;
  placeHolder?: string;
  src?: string;
};

const CitySelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  countryid,
  stateid,
  placeHolder,
  src,
  ...props
}: PageProps) => {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    if (countryid) {
      GetCity(countryid, stateid, src).then((data) => {
        setCities(data);
      });
    }
  }, [countryid, stateid, src]);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <Dropdown
          {...props}
          placeHolder={placeHolder}
          options={cities}
          onChange={(value) => {
            if (onChange) {
              onChange(value as City);
            }
          }}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default CitySelect;
