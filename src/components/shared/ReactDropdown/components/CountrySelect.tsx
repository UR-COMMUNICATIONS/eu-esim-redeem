import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Country } from "../types";
import { GetCountries, GetCountriesByRegion } from "../utils";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";

type PageProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultValue?: Country;
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: Country) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  showFlag?: boolean;
  region?: string;
  src?: string;
  countriesList?: Array<Country>
};
const CountrySelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  showFlag,
  region,
  src,
  filteredCodes,
  ...props
}: PageProps) => {
  const [countriesunfiltered, setCountries] = useState<Country[]>([]);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { reactCountries } = cart
  useEffect(() => {
    let filteredData = []
    if (reactCountries.length === 0) {
      if (region)
        GetCountriesByRegion(region, src).then((data) => {
          setCountries(data);
        });
      else
        GetCountries(src).then((data) => {
          filteredData = data.filter(dat => {
            if (filteredCodes == null) {
              return dat
            }
            else {
              return filteredCodes?.includes(dat.iso2)
            }
          })
          setCountries(filteredData);
          // setCountries(data.filter(dat => filteredCodes?.includes(dat.iso2)));
        });
    }
    else {
      filteredData = reactCountries.filter(dat => {
        if (filteredCodes == null) {
          return dat
        }
        else {
          return filteredCodes?.includes(dat.iso2)
        }
      })
      setCountries(filteredData);
    }
  }, [region, src, filteredCodes]);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <Dropdown
          {...props}
          placeHolder={placeHolder}
          options={countriesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Country);
            }
          }}
          showFlag={showFlag}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default CountrySelect;
