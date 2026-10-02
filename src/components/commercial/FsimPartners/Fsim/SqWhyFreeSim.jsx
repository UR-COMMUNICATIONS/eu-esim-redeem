const SqWhyFreeSim = ({ comp, bgColor, textColor, headingColor }) => {
  return (
    <div
      className={`pb-10 ${bgColor ? `bg-[${bgColor}]` : "bg-red-600"} ${textColor ? `text-${textColor}` : "text-white"}`}
    >
      <div className="containerX mx-auto px-6">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-10 text-center ${headingColor || "text-white"}`}
        >
          Why Choose SQ Partner Program?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
            <p>
              Stay connected in over 100+ countries with our reliable network
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">High Speed</h3>
            <p>
              Experience fast and stable internet connection wherever you go
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-3">Business Solutions</h3>
            <p>Tailored solutions for SQ partners and their clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqWhyFreeSim;
