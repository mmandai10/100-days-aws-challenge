// API クライアント - お気に入り関連

import type { Product } from '../types/product';

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

// お気に入り一覧を取得
export const fetchFavorites = async (token: string): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // 商品データを変換
  return (data.products || []).map((p: any) => ({
    id: p.productId,
    name: p.name,
    price: p.price,
    description: p.description,
    category: p.category,
    imageUrl: p.imageUrl
  }));
};

// お気に入りに追加
export const addFavorite = async (token: string, productId: string, category: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId, category })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};

// お気に入りから削除
export const removeFavorite = async (token: string, productId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};

// お気に入り状態をチェック（一覧から判定用）
export const checkFavoriteStatus = async (token: string): Promise<Set<string>> => {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    return new Set();
  }
  
  const data = await response.json();
  const productIds = (data.favorites || []).map((f: any) => f.productId);
  return new Set(productIds);
};
