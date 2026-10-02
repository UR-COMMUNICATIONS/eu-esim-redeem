import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Country } from "../types";
const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

type ComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  placeHolder?: string;
  options: Array<Country>;
  inputClassName?: string;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: Country;
  onChange: (e: Country) => void;
  showFlag?: boolean;
};
const PhonecodeDropdown = ({
  placeHolder,
  options,
  onChange,
  inputClassName,
  onTextChange,
  defaultValue,
  showFlag = true,
  ...props
}: ComponentProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Country>();
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Element)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = () => {
    setShowMenu(true);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return searchValue ? searchValue : "";
    }
    return `${
      showFlag && "emoji" in selectedValue ? selectedValue.emoji : ""
    } +${selectedValue.phone_code}`;
  };

  const onItemClick = (option: Country) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: Country) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.id === option.id;
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSelectedValue(undefined);
    if (onTextChange) {
      onTextChange(e);
    }
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ||
        option.phone_code.indexOf(searchValue) >= 0 ||
        ("+" + option.phone_code).indexOf(searchValue) >= 0
    );
  };

  return (
    <div className={"stdropdown-container"}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={"stdropdown-input stsearch-box"}
      >
        <input
          {...props}
          className={inputClassName}
          onChange={onSearch}
          value={getDisplay()}
          placeholder={placeHolder}
          ref={searchRef}
        />
        <div className={"stdropdown-tools"}>
          <div className={"stdropdown-tool"}>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={"stdropdown-menu"}>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.id}
              className={`${"stdropdown-item"} ${
                isSelected(option) && "selected"
              }`}
            >
              {showFlag && (
                <span className="stdropdown-flag">
                  {"emoji" in option ? option.emoji : ""}{" "}
                </span>
              )}
              +{option.phone_code}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhonecodeDropdown;
