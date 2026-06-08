"use client";

import { useState } from "react";

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (response.ok) {
        setMessage("✨ ¡Review added successfully!");
        setComment("");
        setRating(5);
      } else {
        setMessage("❌ Failed to add review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("❌ An error occurred connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-slate-900 border border-slate-700 rounded-lg space-y-4 max-w-xl mt-6 text-white"
    >
      <h3 className="text-xl font-bold text-amber-500">Leave a Review</h3>

      <div>
        <label className="block text-sm font-medium text-slate-300">
          Rating (1-5 stars)
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full p-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:border-indigo-500"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="bg-slate-800">
              {num} {num === 1 ? "Star" : "Stars"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">
          Your Comment
        </label>
        <textarea
          required
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          className="mt-1 block w-full p-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      {message && (
        <p className="text-sm text-center font-medium mt-2">{message}</p>
      )}
    </form>
  );
}
