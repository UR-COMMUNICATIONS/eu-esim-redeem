import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const RatingForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
      <h2 className="font-['DMSans'] font-bold text-[24px] leading-[140%] text-[#191919] mb-4">
        {t("ratings.writeReview") || "Write a review"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("ratings.ratingsLabel") || "Ratings"}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                <Star
                  size={32}
                  fill={(hover || rating) >= star ? "#FFC400" : "none"}
                  color="#FFC400"
                  className="transition-colors"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("ratings.writeReviewsLabel") || "Write Reviews*"}
          </label>
          <textarea
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFC400] focus:outline-none min-h-[120px] bg-gray-50"
            placeholder={t("ratings.enterReviews") || "Enter your reviews"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#D32F2F] text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          {t("ratings.submit") || "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
