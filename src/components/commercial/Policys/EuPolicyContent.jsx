import { cn } from "@/lib/utils";
import { memo } from "react";
import { euPolicyIntro, euPolicySections } from "./euPolicyDetails";

const EMAIL = "enquiry@euholidays.com.sg";
const PRIVACY_URL = "https://www.euholidays.com.sg/privacy";

const formatText = (text) => {
  if (!text) return text;

  const parts = text.split(
    /(ENQUIRY@EUHOLIDAYS\.COM\.SG|WWW\.EUHOLIDAYS\.COM\.SG\/PRIVACY)/gi,
  );

  return parts.map((part, index) => {
    const upper = part.toUpperCase();
    if (upper === "ENQUIRY@EUHOLIDAYS.COM.SG") {
      return (
        <a
          key={index}
          href={`mailto:${EMAIL}`}
          className="text-[#244C75] underline font-medium"
        >
          {EMAIL}
        </a>
      );
    }
    if (upper === "WWW.EUHOLIDAYS.COM.SG/PRIVACY") {
      return (
        <a
          key={index}
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#244C75] underline font-medium"
        >
          {PRIVACY_URL}
        </a>
      );
    }
    return part;
  });
};

const Paragraph = ({ children, className }) => (
  <p
    className={cn(
      "text-xs md:text-lg !leading-[1.6] text-gray-800 mb-6 last:mb-0",
      className,
    )}
    style={{ whiteSpace: "pre-line" }}
  >
    {typeof children === "string" ? formatText(children) : children}
  </p>
);

const LetterList = ({ items }) => (
  <ol className="list-[lower-alpha] pl-6 md:pl-8 space-y-3 mb-6 text-xs md:text-lg !leading-[1.6] text-gray-800">
    {items.map((item, index) => (
      <li key={index}>{formatText(item)}</li>
    ))}
  </ol>
);

const NumberedList = ({ items }) => (
  <ol className="list-decimal pl-6 md:pl-8 space-y-3 mb-6 text-xs md:text-lg !leading-[1.6] text-gray-800">
    {items.map((item, index) => (
      <li key={index}>{formatText(item)}</li>
    ))}
  </ol>
);

const BulletList = ({ items }) => (
  <ul className="list-disc pl-6 md:pl-8 space-y-3 mb-6 text-xs md:text-lg !leading-[1.6] text-gray-800">
    {items.map((item, index) => (
      <li key={index}>{formatText(item)}</li>
    ))}
  </ul>
);

const NumberedBlock = ({ block }) => (
  <div className="mb-6">
    {block.title && (
      <p className="text-xs md:text-lg !leading-[1.6] text-gray-800 font-semibold mb-4">
        {formatText(block.title)}
      </p>
    )}
    {block.paragraphs?.map((text, index) => (
      <Paragraph key={index}>{text}</Paragraph>
    ))}
    {block.letterItems && <LetterList items={block.letterItems} />}
  </div>
);

const EuPolicyContent = ({ containerClassName = "" }) => {
  return (
    <div
      className={cn(
        "container2X sec_common_60 xl:px-0 gap-4 md:gap-6 lg:gap-10",
        containerClassName,
      )}
    >
      <header className="space-y-4 md:space-y-6 mb-10 md:mb-14">
        <div className="text-lg md:text-2xl !leading-[1.2] md:!leading-[1.4] md:font-bold">
          <h1 className="text-[26px] md:text-[36px] font-bold text-[#1a2440] text-center">
            {euPolicyIntro.title}
          </h1>
          {euPolicyIntro.subtitle && (
            <h2 className="text-[22px] md:text-[30px] mt-6 md:mt-8 font-bold text-[#1a2440] uppercase tracking-wide">
              {euPolicyIntro.subtitle}
            </h2>
          )}
        </div>
        <div className="space-y-0">
          {euPolicyIntro.paragraphs.map((text, index) => (
            <Paragraph key={index}>{text}</Paragraph>
          ))}
        </div>
      </header>

      {euPolicySections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="space-y-4 mb-10 md:mb-14">
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#1a2440] !leading-[1.3] mb-4 md:mb-6">
            {section.heading}
          </h2>

          {section.paragraphs?.map((text, index) => (
            <Paragraph key={index}>{text}</Paragraph>
          ))}

          {section.letterItems && <LetterList items={section.letterItems} />}

          {section.numberedItems && (
            <NumberedList items={section.numberedItems} />
          )}

          {section.paragraphsAfter?.map((text, index) => (
            <Paragraph key={`after-${index}`}>{text}</Paragraph>
          ))}

          {section.numberedBlocks?.map((block, index) => (
            <NumberedBlock key={index} block={block} />
          ))}

          {section.subsections?.map((sub, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-base md:text-xl font-semibold text-[#1a2440] mb-4">
                {sub.title}
              </h3>
              {sub.paragraphs?.map((text, pIndex) => (
                <Paragraph key={pIndex}>{text}</Paragraph>
              ))}
              {sub.bulletItems && <BulletList items={sub.bulletItems} />}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default memo(EuPolicyContent);
