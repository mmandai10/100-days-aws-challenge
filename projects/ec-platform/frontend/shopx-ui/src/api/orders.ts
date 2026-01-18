import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

export interface ShippingAddress {
  name: string;
  postalCode: string;
  address: string;
  phone?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: string;
  createdAt: string;
}

// JWT トークン取得
const getAuthToken = async (): Promise<string> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
};

// 注文作成
export const createOrder = async (shippingAddress: ShippingAddress): Promise<Order> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ shippingAddress })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create order');
  }

  const data = await response.json();
  return data.order;
};

// Stripe Checkout Session 作成
export const createCheckoutSession = async (): Promise<{ sessionId: string; url: string }> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/checkout/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      successUrl: `${window.location.origin}/orders?success=true`,
      cancelUrl: `${window.location.origin}/cart?canceled=true`
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  return response.json();
};

// 注文履歴取得
export const getOrders = async (): Promise<Order[]> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  return data.orders;
};
