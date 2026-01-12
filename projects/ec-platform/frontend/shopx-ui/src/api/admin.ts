import { fetchAuthSession } from 'aws-amplify/auth';

const API_URL = import.meta.env.VITE_API_URL;

export interface ProductInput {
  name: string;
  price: number;
  description?: string;
  category: string;
  imageUrl?: string;
  stock?: number;
}

export interface Product {
  productId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

const getAuthToken = async (): Promise<string> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
};

export const createProduct = async (product: ProductInput): Promise<Product> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  if (response.status === 403) {
    throw new Error('Admin access required');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create product');
  }

  const data = await response.json();
  return data.product;
};

export const updateProduct = async (productId: string, updates: Partial<ProductInput>): Promise<Product> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}admin/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });

  if (response.status === 403) {
    throw new Error('Admin access required');
  }

  if (response.status === 404) {
    throw new Error('Product not found');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update product');
  }

  const data = await response.json();
  return data.product;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}admin/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 403) {
    throw new Error('Admin access required');
  }

  if (response.status === 404) {
    throw new Error('Product not found');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete product');
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.products.map((p: Record<string, unknown>) => ({
    productId: p.productId as string,
    name: p.name as string,
    price: p.price as number,
    description: (p.description as string) || '',
    category: p.category as string,
    imageUrl: (p.imageUrl as string) || '',
    stock: (p.stock as number) || 0
  }));
};
