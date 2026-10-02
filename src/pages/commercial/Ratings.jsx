import {
  RatingForm,
  ReviewCard,
  ReviewSummary,
} from "@/components/commercial/ratings";
import LandingHeroV2 from "@/components/shared/others/LandingHeroV2";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PAGE_KEY = "ratings";

const DEFAULT_DISTRIBUTION = [
  { stars: 5, count: 18 },
  { stars: 4, count: 6 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Darrell Steward",
    role: "Traveler",
    rating: 5,
    content:
      "Best app for creating projects and concepts, supports massive projects like AmeOS 16 for example, but could benefit from Android / iOS optimizations to use GPU more",
  },
  {
    id: 2,
    name: "Darlene Robertson",
    role: "Traveler",
    rating: 5,
    content:
      "Best app for creating projects and concepts, supports massive projects like AmeOS 16 for example, but could benefit from Android / iOS optimizations to use GPU more",
  },
  {
    id: 3,
    name: "Annette Black",
    role: "Traveler",
    rating: 4,
    content:
      "Best app for creating projects and concepts, supports massive projects like AmeOS 16 for example, but could benefit from Android / iOS optimizations to use GPU more",
  },
  {
    id: 4,
    name: "Courtney Henry",
    role: "Traveler",
    rating: 5,
    content:
      "Best app for creating projects and concepts, supports massive projects like AmeOS 16 for example, but could benefit from Android / iOS optimizations to use GPU more",
  },
];

function Ratings() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [distribution] = useState(DEFAULT_DISTRIBUTION);

  useEffect(() => {
    setReviews(DEFAULT_REVIEWS);
  }, []);

  const handleSubmitReview = (payload) => {
    console.log("Review submitted:", payload);
    // API call here
  };

  const handleLoadMore = () => {
    // Load more reviews
  };

  return (
    <div className="overflow-hidden w-full">
      <LandingHeroV2 pageKey={PAGE_KEY} backgroundColor="#F7D259" />

      <section className="sec_common_60">
        <div className="containerX">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Left: summary only; area under it stays empty */}
            <div className="w-full lg:w-auto lg:max-w-sm flex-shrink-0">
              <ReviewSummary
                average={4.5}
                totalRatings={2256896}
                distribution={distribution}
              />
            </div>

            {/* Right: Write a review (full width as before) + Reviews by users (same width as form) */}
            <div className="w-full flex-1 flex flex-col gap-8 min-w-0">
              <RatingForm onSubmit={handleSubmitReview} />
              <div className="space-y-6">
                <h3 className="font-['DMSans'] font-bold text-2xl text-[#191919]">
                  {t("ratings.reviewsByUsers") || "Reviews by users"}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((rev) => (
                    <ReviewCard key={rev.id} {...rev} />
                  ))}
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="bg-[#FFC400] text-[#191919] font-bold px-10 py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {t("ratings.loadMore") || "Load More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ratings;
