import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/products';
import { addFavorite, removeFavorite, checkFavoriteStatus } from '../api/favorites';
import { fetchReviews, createReview, type Review } from '../api/reviews';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// 星評価コンポーネント
const StarRating = ({ 
  rating, 
  onRate, 
  readonly = false 
}: { 
  rating: number; 
  onRate?: (r: number) => void; 
  readonly?: boolean;
}) => {
  const [hover, setHover] = useState(0);
  
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{
            cursor: readonly ? 'default' : 'pointer',
            fontSize: '1.25rem',
            color: star <= (hover || rating) ? '#f1c40f' : '#ddd'
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  // 商品状態
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);
  
  // お気に入り状態
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  
  // レビュー状態
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // トークン取得
  const getToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch {
      return null;
    }
  };

  // データ取得
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError('商品IDが指定されていません');
        setLoading(false);
        return;
      }

      try {
        // 商品取得
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('商品が見つかりません');
          setLoading(false);
          return;
        }

        // レビュー取得
        const reviewData = await fetchReviews(id);
        setReviews(reviewData.reviews);
        setAverageRating(reviewData.averageRating);

        // ログイン済みならお気に入り状態チェック
        if (isAuthenticated) {
          const token = await getToken();
          if (token) {
            const favoriteIds = await checkFavoriteStatus(token);
            setIsFavorite(favoriteIds.has(id));
          }
        }
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isAuthenticated]);

  // カートに追加
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 2000);
    }
  };

  // お気に入り切り替え
  const handleToggleFavorite = async () => {
    if (!product || !isAuthenticated) return;
    
    setFavoriteLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      if (isFavorite) {
        await removeFavorite(token, product.id);
        setIsFavorite(false);
      } else {
        await addFavorite(token, product.id, product.category);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('お気に入り操作エラー:', err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  // レビュー投稿
  const handleSubmitReview = async () => {
    if (!id || !isAuthenticated || newRating === 0) return;
    
    setReviewSubmitting(true);
    try {
      const token = await getToken();
      if (!token) return;

      await createReview(token, id, newRating, newComment);
      
      // レビュー一覧を再取得
      const reviewData = await fetchReviews(id);
      setReviews(reviewData.reviews);
      setAverageRating(reviewData.averageRating);
      
      // フォームリセット
      setNewRating(0);
      setNewComment('');
    } catch (err) {
      console.error('レビュー投稿エラー:', err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error || !product) {
    return (
      <div>
        <h1>{error || '商品が見つかりません'}</h1>
        <Link to="/products">商品一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/products">← 商品一覧に戻る</Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        
        {isAuthenticated && (
          <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={favoriteLoading}
            style={{
              background: 'none',
              border: 'none',
              cursor: favoriteLoading ? 'wait' : 'pointer',
              fontSize: '1.5rem',
              padding: '0.25rem',
            }}
            title={isFavorite ? 'お気に入りから削除' : 'お気に入りに追加'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>

      {/* 平均評価 */}
      {reviews.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <StarRating rating={Math.round(averageRating)} readonly />
          <span style={{ marginLeft: '0.5rem', color: '#666' }}>
            {averageRating} ({reviews.length}件のレビュー)
          </span>
        </div>
      )}

      <img
        src={product.imageUrl || 'https://placehold.co/400x300?text=No+Image'}
        alt={product.name}
        style={{ borderRadius: '8px', marginTop: '1rem', maxWidth: '400px' }}
      />
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        カテゴリ: {product.category}
      </p>
      <p style={{ fontSize: '1.5rem', color: '#e74c3c', fontWeight: 'bold' }}>
        ¥{product.price.toLocaleString()}
      </p>
      <p>{product.description}</p>
      
      <button
        type="button"
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        カートに追加
      </button>
      
      {addedMessage && (
        <p style={{ color: '#27ae60', marginTop: '0.5rem' }}>
          ✓ カートに追加しました！
        </p>
      )}

      {/* レビューセクション */}
      <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
        <h2>レビュー</h2>
        
        {/* レビュー投稿フォーム */}
        {isAuthenticated ? (
          <div style={{ 
            backgroundColor: '#f9f9f9', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginTop: 0 }}>レビューを書く</h3>
            <div style={{ marginBottom: '1rem' }}>
              <span>評価: </span>
              <StarRating rating={newRating} onRate={setNewRating} />
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="コメントを入力（任意）"
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={newRating === 0 || reviewSubmitting}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: newRating === 0 ? '#ccc' : '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: newRating === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {reviewSubmitting ? '送信中...' : 'レビューを投稿'}
            </button>
          </div>
        ) : (
          <p style={{ color: '#666' }}>
            レビューを投稿するには<Link to="/login">ログイン</Link>してください
          </p>
        )}

        {/* レビュー一覧 */}
        {reviews.length === 0 ? (
          <p style={{ color: '#666' }}>まだレビューはありません</p>
        ) : (
          <div>
            {reviews.map((review) => (
              <div 
                key={review.reviewId}
                style={{
                  borderBottom: '1px solid #eee',
                  paddingBottom: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StarRating rating={review.rating} readonly />
                  <strong>{review.userName}</strong>
                  <span style={{ color: '#999', fontSize: '0.875rem' }}>
                    {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
                {review.comment && (
                  <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
