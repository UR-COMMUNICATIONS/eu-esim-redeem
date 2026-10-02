import useUserLocationLanguage from "@/hooks/useUserLocationLanguage";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const TermsList = ({
  titleKey,
  listKey,
  className = "",
  titleClassName = "",
  listClassName = "",
  ns,
}) => {
  // Include dynamic namespace if your app switches based on user location/language
  const { nameSpace } = useUserLocationLanguage?.() || {};
  const namespaces = Array.isArray(ns)
    ? ns
    : ["translation", "english", "local", nameSpace].filter(Boolean);
  const { t, i18n } = useTranslation(namespaces);

  // Ensure we only render arrays, not fallback strings
  const raw = t(listKey, { returnObjects: true });
  const items = Array.isArray(raw) ? raw : [];

  const title = t(titleKey);

  const renderItem = (item, index) => {
    // If item is an object with text and link, render as link
    if (typeof item === "object" && item !== null && item.text && item.link) {
      return (
        <li key={index}>
          {item.text}{" "}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black-600 hover:text-main-600"
          >
            {item.linkText || item.link}
          </a>
        </li>
      );
    }
    // If item is a string, render as plain text
    return <li key={index}>{item}</li>;
  };

  return (
    <div className={className}>
      <h1
        // cn() so a caller can override defaults (e.g. no-underline) instead of
        // the class merely being appended and losing to the default.
        className={cn(
          "md:text-2xl text-xl font-bold underline text-black mb-4",
          titleClassName,
        )}
      >
        {title}
      </h1>
      {items.length > 0 && (
        <ul
          className={`list-disc list-inside text-black space-y-2 md:text-lg text-sm ${listClassName}`}
        >
          {items.map((item, index) => renderItem(item, index))}
        </ul>
      )}
    </div>
  );
};

export default TermsList;
