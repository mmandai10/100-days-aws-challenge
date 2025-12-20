// API クライアント - 商品関連

import type { Product, Category } from '../types/product';

// API のベース URL
const API_BASE_URL = 'https://zzhyj5syl6.execute-api.ap-northeast-1.amazonaws.com/Prod';

// API レスポンスの型（API が返す形式）
interface ApiProduct {
  productId: string;  // API は productId を使用
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}

// API レスポンスをフロントエンド用に変換
const mapProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.productId,  // productId → id に変換
  name: apiProduct.name,
  price: apiProduct.price,
  description: apiProduct.description,
  category: apiProduct.category,
  imageUrl: apiProduct.imageUrl,
});

// 商品一覧を取得
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.products.map(mapProduct);  // 変換して返す
};

// 商品詳細を取得
export const fetchProductById = async (id: string): Promise<Product | null> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  
  if (response.status === 404) {
    return null;
  }
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return mapProduct(data);  // 変換して返す
};

// カテゴリ別に商品を取得
export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products?category=${categoryId}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.products.map(mapProduct);
};

// カテゴリ一覧を取得
export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.categories;
};
