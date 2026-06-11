"use client";

import { useState, useEffect } from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import ReviewForm from "../ui/reviewform";
import { ReviewCard } from "@/app/ui/reviewcard";
import { Product } from "@/types/product";
import { Review } from "@/types/review";
import { getListings } from "@/app/actions/listings";

interface ExtensionReview extends Review {
  productId: string;
}


const MOCK_REVIEWS: ExtensionReview[] = [
  {
    id: "1",
    productId: "1",
    userName: "Alex Skywalker",
    rating: 5,
    comment:
      "The sublimated print quality is breathtaking! The 'Coding Wookies' branding looks so sharp and professional. The fabric is comfortable and fits perfectly.",
    date: "June 3, 2026",
  },
  {
    id: "2",
    productId: "1",
    userName: "Elena Solo",
    rating: 5,
    comment:
      "Absolutely love the artwork on this sweater! It truly looks like an artisan piece rather than generic merchandise. Definite 5 stars.",
    date: "June 5, 2026",
  },
  {
    id: "3",
    productId: "2",
    userName: "Ben Kenobi",
    rating: 5,
    comment:
      "The aggressive stance and the detailing on the bowcaster are exactly what I wanted. Hand-painted perfection, it stands out beautifully on my desk!",
    date: "June 4, 2026",
  },
  {
    id: "4",
    productId: "3",
    userName: "Sarah Jenkins",
    rating: 5,
    comment:
      "These candles smell divine even before lighting them! The ceramic jars look beautiful on my coffee table, and the sandalwood scent is very relaxing.",
    date: "May 28, 2026",
  },
  {
    id: "5",
    productId: "4",
    userName: "Michael Smith",
    rating: 4,
    comment:
      "Beautiful macramé design. It arrived safely and well-packaged. The driftwood piece gives it a genuine, rustic touch that transformed my workspace walls.",
    date: "June 1, 2026",
  },
];

export default function ListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<ExtensionReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getListings().then((items) => {
      setProducts(items);
      setReviews(MOCK_REVIEWS);
      setIsLoading(false);
    });
  }, []);

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 bg-slate-950 min-h-screen text-white">
        <p className="text-xl font-semibold text-gray-400 animate-pulse">
          Loading marketplace listings...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          paddingLeft: "8%",
          paddingRight: "8%",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
        className="w-full bg-slate-950 min-h-screen text-white"
      >
        <div className="w-full">
 
          <header className="mb-12 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-1 rounded-sm tracking-wider">
                  CODING WOOKIES PROJECT
                </span>
              </div>
              <p className="text-slate-400 mt-1">
                Connecting authentic global artisans with passionate collectors.
              </p>
            </div>

            <div className="text-right bg-slate-900 border border-slate-800 p-3 rounded-lg hidden sm:block">
              <p className="text-xs text-slate-500 font-mono">
                Deployment Status
              </p>
              <p className="text-sm text-indigo-400 font-semibold">
                🟢 Vercel Production Active
              </p>
            </div>
          </header>

          <h1 className="text-3xl font-bold text-white mb-10 border-b border-slate-800 pb-4 tracking-tight">
            Marketplace Listings
          </h1>

          <div className="space-y-16 w-full">
            {products.map((product) => {
              const productReviews = reviews.filter(
                (r) => r.productId === product.id,
              );

              return (
                <div
                  key={product.id}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex flex-col md:flex-row gap-8 pb-8 border-b border-slate-800/80 w-full">

                    <div className="w-full md:w-64 h-64 md:h-48 flex-shrink-0 overflow-hidden rounded-xl shadow-md border border-slate-700/30 bg-slate-950 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-900/40">
                          {product.category}
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-3 mb-2 tracking-tight">
                          {product.title}
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6 md:mt-0 pt-4 md:pt-0 w-full">
                        <div className="text-2xl font-extrabold text-amber-500">
                          ${product.price.toFixed(2)}
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 w-full">
                    <h3 className="text-md font-semibold text-slate-300 mb-5 flex items-center gap-2.5">
                      Customer Feedback
                      <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-700/50 font-medium">
                        {productReviews.length}
                      </span>
                    </h3>

                    {productReviews.length === 0 ? (
                      <p className="text-xs text-gray-500 italic bg-slate-950/40 border border-slate-800/50 rounded-xl p-4 w-full">
                        No reviews available for this item yet.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-6">
                        {productReviews.map((item) => (
                          <ReviewCard
                            key={item.id}
                            review={item}
                            onDelete={handleDeleteReview}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  
                  <div className="mt-6 pt-6 border-t border-slate-800/60 w-full">
                    <ReviewForm productId={product.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
