// API クライアント - レビュー関連

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

export interface Review {
  reviewId: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  count: number;
  averageRating: number;
}

// レビュー一覧を取得
export const fetchReviews = async (productId: string): Promise<ReviewsResponse> => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

// レビューを投稿
export const createReview = async (
  token: string, 
  productId: string, 
  rating: number, 
  comment: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rating, comment })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};
