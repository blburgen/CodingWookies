"use client";

import { useState, useEffect } from "react";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import ReviewForm from "../ui/reviewform";

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
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="mb-12 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-1 rounded-sm tracking-wider">
              CODING WOOKIES PROJECT
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-100 tracking-tight">
            Handcrafted <span className="text-amber-500">Haven</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Connecting authentic global artisans with passionate collectors.
          </p>
        </div>

        <div className="text-right bg-slate-900 border border-slate-800 p-3 rounded-lg hidden sm:block">
          <p className="text-xs text-slate-500 font-mono">Deployment Status</p>
          <p className="text-sm text-indigo-400 font-semibold"></p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-xl transition-all hover:border-slate-700"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {product.category}
                </span>
                <span className="text-xs text-slate-500 italic">
                  By {product.artisan}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                {product.name}
              </h2>
              <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto">
              <div className="mt-auto pt-4 border-t border-slate-800">
                <div className="text-2xl font-black text-amber-500 mb-3">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors mb-6 text-sm tracking-wide">
                View Details
              </button>

              <div className="mt-4 pt-4 border-t border-slate-800/60">
                <ReviewForm productId={product.id} />
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
