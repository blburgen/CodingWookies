"use server";

import db from "@/lib/db";
import { Product } from "@/types/product";

export async function getListings(): Promise<Product[]> {
  const result = await db.query(
    "SELECT id, title, description, price, image_link, category FROM item ORDER BY id"
  );

  return result.rows.map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: String(r.id),
      title: r.title as string,
      description: r.description as string,
      price: Number(r.price),
      imageUrl: r.image_link as string,
      category: r.category as string,
    };
  });
}
