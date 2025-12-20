// MSW ハンドラー - API のモック定義
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://zzhyj5syl6.execute-api.ap-northeast-1.amazonaws.com/Prod';

// モック用のテストデータ
export const mockCategories = [
  { categoryId: 'electronics', name: 'Electronics', description: 'Smartphones, PCs' },
  { categoryId: 'clothing', name: 'Clothing', description: 'Clothes, shoes' },
];

export const mockProducts = [
  { productId: 'prod-1', name: 'iPhone 15', price: 120000, description: 'Apple', category: 'electronics' },
  { productId: 'prod-2', name: 'MacBook', price: 200000, description: 'Apple', category: 'electronics' },
  { productId: 'prod-3', name: 'T-Shirt', price: 3000, description: 'Cotton', category: 'clothing' },
];

// API リクエストをインターセプトして偽の応答を返す
export const handlers = [
  // GET /categories
  http.get(`${API_BASE_URL}/categories`, () => {
    return HttpResponse.json({ categories: mockCategories });
  }),

  // GET /products
  http.get(`${API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    // カテゴリ指定あり → フィルタリング
    const filtered = category
      ? mockProducts.filter((p) => p.category === category)
      : mockProducts;

    return HttpResponse.json({ products: filtered });
  }),
];
