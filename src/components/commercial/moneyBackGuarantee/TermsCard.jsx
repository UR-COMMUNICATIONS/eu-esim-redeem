const TermsCard = ({ title, items, introText }) => (
  <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col h-full border border-gray-50">
    <h3 className="font-['DMSans'] font-bold text-[24px] leading-[140%] text-[#D32F2F] mb-4">
      {title}
    </h3>

    {introText && (
      <p className="font-['DMSans'] font-normal text-[18px] leading-[140%] text-[#4B5563] mb-4">
        {introText}
      </p>
    )}

    <ol className="list-none space-y-4">
      {items?.map((item, index) => (
        <li
          key={index}
          className="flex gap-3 font-['DMSans'] font-normal text-[18px] leading-[140%] text-[#4B5563]"
        >
          <span className="shrink-0">{index + 1}.</span>
          <div>
            <span
              className={
                item.isStrikethrough
                  ? "line-through decoration-[#3B82F6] decoration-2"
                  : ""
              }
            >
              {item.text}
            </span>
            {item.subItems && (
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {item.subItems.map((sub, idx) => (
                  <li key={idx} className="pl-1">
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  </div>
);

export default TermsCard;
