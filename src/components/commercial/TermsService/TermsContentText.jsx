import React, { memo } from "react";
import { cn } from "@/lib/utils";

const getParentSectionsWithSubPoints = (content) => {
  const parents = new Set();

  for (const line of content.split("\n")) {
    const match = line.trim().match(/^(\d+\.\d+)\.\d+/);
    if (match) {
      parents.add(match[1]);
    }
  }

  return parents;
};

const parseTermsLine = (line, parentSections) => {
  const trimmed = line.trim();
  if (!trimmed) return { type: "empty" };

  let match = trimmed.match(/^(\d+\.\d+\.\d+)\.?\s*(.*)$/);
  if (match) {
    return { type: "subPoint", number: match[1], text: match[2] };
  }

  match = trimmed.match(/^(\d+\.\d+\.)\s*(.*)$/);
  if (match) {
    return { type: "clause", number: match[1], text: match[2] };
  }

  match = trimmed.match(/^(\d+\.\d+)\s+(.*)$/);
  if (match) {
    if (parentSections.has(match[1])) {
      return { type: "subHeading", number: match[1], text: match[2] };
    }

    return { type: "clause", number: match[1], text: match[2] };
  }

  if (/^[•\u2022\u00a0\u2002\u2003]/.test(trimmed) || trimmed.startsWith("•")) {
    return { type: "bullet", text: trimmed };
  }

  return { type: "plain", text: trimmed };
};

const TermsLine = ({ parsed }) => {
  switch (parsed.type) {
    case "empty":
      return <div className="h-3" aria-hidden />;
    case "subHeading":
      return (
        <p className="font-semibold text-gray-900 md:font-bold">
          {parsed.number} {parsed.text}
        </p>
      );
    case "subPoint":
      return (
        <p className="pl-4 text-gray-800 md:pl-6">
          <span className="font-medium">{parsed.number}</span>
          {parsed.text ? ` ${parsed.text}` : ""}
        </p>
      );
    case "clause":
      return (
        <p className="text-gray-800">
          {parsed.number} {parsed.text}
        </p>
      );
    case "bullet":
      return <p className="pl-4 text-gray-800 md:pl-8">{parsed.text}</p>;
    default:
      return <p className="text-gray-800">{parsed.text}</p>;
  }
};

const TermsContentText = ({ content, className }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const parentSections = getParentSectionsWithSubPoints(content);

  return (
    <div className={cn("mb-[40px] space-y-3", className)}>
      {lines.map((line, index) => (
        <TermsLine key={index} parsed={parseTermsLine(line, parentSections)} />
      ))}
    </div>
  );
};

export default memo(TermsContentText);
