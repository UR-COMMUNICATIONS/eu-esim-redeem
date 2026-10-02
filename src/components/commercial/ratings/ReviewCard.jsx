import { Star } from "lucide-react";

const ReviewCard = ({ name, role, content, rating }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-[#191919]">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < rating ? "#FFC400" : "none"}
            color="#FFC400"
          />
        ))}
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
  </div>
);

export default ReviewCard;
