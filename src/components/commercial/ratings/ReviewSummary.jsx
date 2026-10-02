import { Star } from "lucide-react";
import ReviewSummaryScore from "./ReviewSummaryScore";

const ReviewSummary = ({ average, totalRatings, distribution }) => {
  const maxCount = Math.max(...(distribution?.map((d) => d.count) || [1]), 1);

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full max-w-sm">
      <ReviewSummaryScore average={average} totalRatings={totalRatings} />

      <div className="space-y-3">
        {distribution?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="flex gap-0.5 w-24">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < 5 - idx ? "#FFC400" : "#E5E7EB"}
                  color="transparent"
                />
              ))}
            </div>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFC400] transition-all"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-4">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
