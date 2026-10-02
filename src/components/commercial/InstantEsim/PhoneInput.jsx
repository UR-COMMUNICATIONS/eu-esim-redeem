import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { COUNTRIES } from "./countries";

function PhoneInput({
  countryCode,
  onCountryChange,
  localNumber,
  onLocalChange,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const selected =
    COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[140];

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search),
      )
    : COUNTRIES;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  return (
    <div
      className="flex relative border border-neutral-300 rounded-xl bg-neutral-50 focus-within:border-main-600 focus-within:bg-white transition-colors"
      ref={dropdownRef}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-3.5 border-r border-neutral-300 rounded-l-xl hover:bg-neutral-100 transition-colors whitespace-nowrap"
        onClick={() => {
          setOpen(!open);
          setSearch("");
        }}
      >
        <span className="text-xl leading-none">{selected.flag}</span>
        <span className="text-sm font-medium text-neutral-900">
          {selected.code}
        </span>
        <span className="text-[8px] text-neutral-400 ml-0.5">
          {open ? "\u25B2" : "\u25BC"}
        </span>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[300px] bg-white rounded-xl shadow-lg border border-neutral-200 z-50 overflow-hidden animate-fadeIn">
          <input
            ref={searchRef}
            className="w-full px-4 py-3 border-b border-neutral-100 outline-none text-sm bg-neutral-50 font-dmsans"
            type="text"
            placeholder={t("instantEsim.form.searchCountry")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="text-neutral-400 text-center py-5 text-sm">
                No results
              </div>
            )}
            {filtered.map((c, i) => (
              <button
                key={`${c.code}-${c.name}-${i}`}
                type="button"
                className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 transition-colors ${c.code === countryCode && c.name === selected.name ? "bg-red-50" : ""}`}
                onClick={() => {
                  onCountryChange(c.code);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <span className="text-xl leading-none">{c.flag}</span>
                <span className="flex-1 text-neutral-900">{c.name}</span>
                <span className="text-neutral-400 text-[13px]">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <input
        className="flex-1 px-4 py-3.5 border-none outline-none text-[15px] bg-transparent rounded-r-xl font-dmsans"
        type="tel"
        placeholder="8123 4567"
        value={localNumber}
        onChange={(e) => onLocalChange(e.target.value)}
      />
    </div>
  );
}

export default PhoneInput;
