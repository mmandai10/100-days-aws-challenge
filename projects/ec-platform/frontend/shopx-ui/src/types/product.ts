// 商品の型定義

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;  // 画像がない商品もあるかもしれないので optional
}

// API レスポンスの型（商品一覧）
export interface ProductListResponse {
  products: Product[];
}
