"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Learning TypeScript - Master Edition",
    price: 29.99,
    description:
      "A comprehensive guide to static typing in Next.js applications and robust enterprise frameworks.",
    imageUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80",
    category: "Books",
  },
  {
    id: "2",
    title: "Mechanical Gaming Keyboard",
    price: 89.5,
    description:
      "Premium RGB mechanical keyboard with brown tactile switches and aluminum body.",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    category: "Electronics",
  },
];

export default function ListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        Marketplace Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
          >
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {product.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-1 mb-2 line-clamp-1">
                {product.title}
              </h2>
              <p className="text-sm text-gray-300 h-12 line-clamp-2 mb-4">
                {product.description}
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-700">
              <div className="text-xl font-bold text-amber-500 mb-3">
                ${product.price.toFixed(2)}
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
