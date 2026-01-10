// API クライアント - カート関連

import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

// カートアイテムの型
export interface CartItem {
  productId: string;
  quantity: number;
}

// 認証トークンを取得
const getAuthToken = async (): Promise<string | null> => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() || null;
  } catch {
    return null;
  }
};

// カートを取得
export const fetchCart = async (): Promise<CartItem[]> => {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.cart || [];
};

// カートを更新
export const updateCart = async (items: CartItem[]): Promise<void> => {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};
