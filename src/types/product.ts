// types/product.ts

// Each Product
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

// Prompts Listing Page
export interface ListingPageProps {
  products: Product[];
  isLoading: boolean;
  error?: string;
}
