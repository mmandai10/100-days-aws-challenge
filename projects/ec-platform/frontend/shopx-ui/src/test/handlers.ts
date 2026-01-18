// MSW ハンドラー - API のモック定義
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

// モック用のテストデータ
export const mockCategories = [
  { categoryId: 'electronics', name: 'Electronics', description: 'Smartphones, PCs' },
  { categoryId: 'fashion', name: 'Fashion', description: 'Clothes, shoes' },
  { categoryId: 'books', name: 'Books', description: 'Books and magazines' },
  { categoryId: 'home', name: 'Home', description: 'Home and kitchen' },
];

export const mockProducts = [
  { productId: 'prod-1', name: 'iPhone 15', price: 120000, description: 'Apple smartphone', category: 'electronics', imageUrl: 'https://via.placeholder.com/300' },
  { productId: 'prod-2', name: 'MacBook Pro', price: 200000, description: 'Apple laptop', category: 'electronics', imageUrl: 'https://via.placeholder.com/300' },
  { productId: 'prod-3', name: 'T-Shirt', price: 3000, description: 'Cotton T-shirt', category: 'fashion', imageUrl: 'https://via.placeholder.com/300' },
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

  // GET /products/:id
  http.get(`${API_BASE_URL}/products/:id`, ({ params }) => {
    const product = mockProducts.find((p) => p.productId === params['id']);
    if (product) {
      return HttpResponse.json(product);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
