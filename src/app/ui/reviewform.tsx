"use client";

import { useState } from "react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: "default-1",
      rating: 5,
      comment: "Excellent craftsmanship! Highly recommended.",
      date: new Date().toLocaleDateString(),
    },
  ]);

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

        const newReview: Review = {
          id: Math.random().toString(),
          rating,
          comment,
          date: new Date().toLocaleDateString(),
        };
        setReviewsList([newReview, ...reviewsList]);

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
    <div style={{ marginTop: "1.5rem", fontFamily: "sans-serif" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          maxWidth: "500px",
        }}
      >
        <h3
          style={{
            color: "#f59e0b",
            margin: "0 0 1rem 0",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          Leave a Review
        </h3>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              color: "#cbd5e1",
              marginBottom: "0.5rem",
            }}
          >
            Rating (1-5 stars)
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "0.375rem",
              color: "#ffffff",
            }}
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              color: "#cbd5e1",
              marginBottom: "0.5rem",
            }}
          >
            Your Comment
          </label>
          <textarea
            required
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "0.375rem",
              color: "#ffffff",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            fontWeight: "600",
            padding: "0.625rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>

        {message && (
          <p
            style={{
              fontSize: "0.875rem",
              textAlign: "center",
              marginTop: "0.75rem",
              color: "#f59e0b",
            }}
          >
            {message}
          </p>
        )}
      </form>

      <div style={{ marginTop: "1.5rem", maxWidth: "500px" }}>
        <h4
          style={{
            color: "#cbd5e1",
            fontSize: "1rem",
            borderBottom: "1px solid #334155",
            paddingBottom: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          Recent Reviews ({reviewsList.length})
        </h4>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyBetween: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#f59e0b", fontWeight: "bold" }}>
                  {"⭐".repeat(rev.rating)}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                  {rev.date}
                </span>
              </div>
              <p
                style={{
                  color: "#e2e8f0",
                  fontSize: "0.875rem",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
