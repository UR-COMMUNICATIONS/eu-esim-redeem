const MoneyBackCard = ({ title, children }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col h-full border border-gray-100">
    <h3 className="font-['DMSans'] font-bold text-[24px] leading-[140%] text-[#D32F2F] mb-4">
      {title}
    </h3>
    <div className="font-['DMSans'] font-normal text-[18px] leading-[140%] text-[#4B5563] space-y-4">
      {children}
    </div>
  </div>
);

export default MoneyBackCard;
