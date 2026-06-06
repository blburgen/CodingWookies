"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Review } from "@/types/review";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { ReviewCard } from "@/app/ui/reviewcard";

interface ExtensionReview extends Review {
  productId: string;
}

const TEAM_NAME: string = "Coding_Wookies";

function formatGuildDescription(baseText: string): string {
  const cleanName = TEAM_NAME.replace("_", " ");
  return `${baseText} Hand-designed and crafted exclusively by the ${cleanName} Artisan Guild.`;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Sublimated Star Wars Wookiee Hoodie",
    price: 65.0,
    description: formatGuildDescription(
      "A premium, highly detailed sublimated hoodie featuring rich earth tones and a stylized Chewbacca pattern.",
    ),
    imageUrl: "/coding_wookies_sweater.jpg",
    category: "Geek Apparel",
  },
  {
    id: "2",
    title: "Artisan Battle-Ready Wookiee Miniature",
    price: 45.0,
    description: formatGuildDescription(
      "A custom-sculpted, hand-painted Wookiee warrior miniature wielding an authentic bowcaster in an aggressive combat stance.",
    ),
    imageUrl: "/wooden_wookie_2.jfif",
    category: "Miniatures",
  },
  {
    id: "3",
    title: "Hand-Poured Botanical Soy Candle Set",
    price: 24.99,
    description:
      "A curated collection of three organic soy candles infused with natural essential oils. Hand-poured into minimalist reusable concrete and ceramic jars.",
    imageUrl:
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600&q=80",
    category: "Home Decor",
  },
  {
    id: "4",
    title: "Custom Hand-Woven Macramé Wall Hanging",
    price: 38.5,
    description:
      "A stunning bohemian-style wall art piece woven by hand using 100% natural cotton cords on a rustic, locally sourced wooden support.",
    imageUrl:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80",
    category: "Accessories",
  },
];

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
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setReviews(MOCK_REVIEWS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
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
        className="w-full bg-slate-950 min-h-screen"
      >
        <div className="w-full">
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
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
