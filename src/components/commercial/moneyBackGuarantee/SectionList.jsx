const SectionList = ({ items }) => (
  <ol className="list-decimal ml-5 space-y-4">
    {items?.map((item, index) => (
      <li
        key={index}
        className={`pl-1 ${item.isStrikethrough ? "line-through" : ""}`}
      >
        {item.text}
        {item.subItems && (
          <ul className="list-disc ml-5 mt-2 space-y-1">
            {item.subItems.map((sub, idx) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

export default SectionList;
