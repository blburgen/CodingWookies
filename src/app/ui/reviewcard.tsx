import React from "react";
import { Review } from "../../types/review";

interface ReviewCardProps {
  review: Review;
  onDelete: (id: string) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onDelete }) => {
  const { id, userName, rating, comment, date } = review;

  const renderStars = (count: number) => {
    return "⭐".repeat(count);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 mb-4 flex flex-col justify-between shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-base font-bold text-white">{userName}</h4>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <div className="text-sm bg-slate-700/50 px-2 py-1 rounded">
          {renderStars(rating)}
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mb-4">{comment}</p>

      <div className="flex justify-end border-t border-slate-700 pt-3">
        <button
          onClick={() => onDelete(id)}
          className="mt-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors duration-200"
          title="Delete review"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};
