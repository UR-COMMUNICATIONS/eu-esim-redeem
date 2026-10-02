import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dateformat, orignalFormat } from "@/general";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  enUS,
  es,
  fr,
  de,
  id,
  ja,
  ms,
  pl,
  th,
  vi,
  zhCN,
  zhHK,
} from "date-fns/locale";
import { useState, useEffect } from "react";

function DatePicker({
  wrapper = "",
  label = "",
  isHideLabel = false,
  labelClass = "",
  index,
  date,
  value,
  setDate,
  radius = "",
  placeholderColor,
  closeOnSingleSelect = false,
  ...props
}) {
  const { t } = useTranslation();
  const currentLanguage = sessionStorage.getItem("i18next")?.toLowerCase();
  let locale = enUS;

  switch (currentLanguage) {
    case "en":
      locale = enUS;
      break;
    case "es":
      locale = es;
      break;
    case "fr":
      locale = fr;
      break;
    case "gm":
      locale = de;
      break;
    case "id":
      locale = id;
      break;
    case "jp":
      locale = ja;
      break;
    case "ms":
      locale = ms;
      break;
    case "ph":
      locale = pl;
      break;
    case "th":
      locale = th;
      break;
    case "vi":
      locale = vi;
      break;
    case "zhcn":
      locale = zhCN;
      break;
    case "zhhk":
      locale = zhHK;
      break;
    default:
      locale = enUS; // Default to English if the selected language is not supported
  }

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (date?.from && date?.to) {
      setOpen(false);
    }
  }, [date?.from, date?.to]);

  useEffect(() => {
    if (closeOnSingleSelect && date?.from) {
      setOpen(false);
    }
  }, [closeOnSingleSelect, date?.from]);

  return (
    <div className={cn("w-full flex items-center gap-2", wrapper)}>
      {!isHideLabel && (
        <span className={cn("label whitespace-nowrap", labelClass)}>
          {label}
        </span>
      )}
      <Popover
        open={props.disabled === true ? false : open}
        onOpenChange={props.disabled === true ? undefined : setOpen}
      >
        <PopoverTrigger className="" asChild>
          <Button
            onClick={() =>
              props.disabled === true ? null : setOpen((v) => !v)
            }
            variant="datepicker"
            size="datepicker"
            disabled={props.disabled === true}
            className={cn(
              "justify-start text-left font-normal w-full h-[3.125rem] bg-neutral-50 py-3.5 px-4 rounded-xl border border-neutral-300",
              props.disabled === true && "opacity-60 cursor-not-allowed",
              radius,
            )}
          >
            <CalendarIcon className={value ? "text-black" : placeholderColor} />
            <span
              className={cn("flex-1", value ? "text-black" : placeholderColor)}
            >
              {value ? format(orignalFormat(value), "PPP", { locale }) : label}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            onDayClick={setDate}
            selected={
              date?.from && date?.to
                ? date
                : date?.from
                  ? { from: date.from, to: date.from }
                  : undefined
            }
            disabled={
              props.disabled !== true && props.disabled
                ? props.disabled
                : { before: dateformat(null, 0, "rfcFormat") }
            }
            excludeDisabled
            initialFocus
          />
          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          /> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
