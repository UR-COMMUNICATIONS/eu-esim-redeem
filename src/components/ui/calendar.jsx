import { DayPicker } from "react-day-picker";
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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
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

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale} //Multi Language Support
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 hover:bg-transparent hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-black-900 rounded-md w-9 font-normal text-[0.8rem] dark:text-zinc-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-100/50 [&:has([aria-selected])]:bg-zinc-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-zinc-800/50 dark:[&:has([aria-selected])]:bg-zinc-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal hover:bg-main-600 hover:text-white aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-main-600 text-white hover:bg-main-600 hover:text-white dark:text-zinc-900 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 dark:focus:bg-zinc-50 dark:focus:text-zinc-900",
        // day_today:
        //   "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        day_outside:
          "day-outside text-zinc-500 opacity-50 aria-selected:bg-zinc-100/50 aria-selected:text-zinc-500 aria-selected:opacity-30 dark:text-zinc-400 dark:aria-selected:bg-zinc-800/50 dark:aria-selected:text-zinc-400",
        day_disabled: "text-zinc-500 opacity-50 dark:text-zinc-400",
        day_range_middle:
          "aria-selected:bg-zinc-100 aria-selected:text-zinc-900 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft {...props} className="h-4 w-4" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight {...props} className="h-4 w-4" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
