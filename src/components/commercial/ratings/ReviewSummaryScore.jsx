import ratingLeft from "@/assets/images/landing-page/rating-left.webp";
import ratingRight from "@/assets/images/landing-page/rating-right.webp";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReviewSummaryScore = ({ average, totalRatings }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F8F8F8] rounded-2xl p-10 flex flex-row items-center justify-center gap-4 mb-8">
      <img
        src={ratingLeft}
        alt=""
        className="h-28 w-auto object-contain flex-shrink-0"
      />
      <div className="text-center flex-shrink-0">
        <h1 className="font-['DMSans'] font-bold text-[80px] leading-[104%] text-[#191919]">
          {average}
        </h1>
        <div className="flex justify-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              fill={i < Math.round(average) ? "#FFC400" : "none"}
              color="#FFC400"
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm font-medium">
          {totalRatings?.toLocaleString()}{" "}
          {t("ratings.ratingsLabel") || "Ratings"}
        </p>
      </div>
      <img
        src={ratingRight}
        alt=""
        className="h-28 w-auto object-contain flex-shrink-0"
      />
    </div>
  );
};

export default ReviewSummaryScore;
