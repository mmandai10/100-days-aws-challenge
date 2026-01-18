import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/products';
import { addFavorite, removeFavorite, checkFavoriteStatus } from '../api/favorites';
import { fetchReviews, createReview, type Review } from '../api/reviews';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
    <div className="star-input" style={{ display: 'inline-flex' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={star <= (hover || rating) ? 'active' : ''}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const getToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError('Product ID not specified');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
          setLoading(false);
          return;
        }

        const reviewData = await fetchReviews(id);
        setReviews(reviewData.reviews);
        setAverageRating(reviewData.averageRating);

        if (isAuthenticated) {
          const token = await getToken();
          if (token) {
            const favoriteIds = await checkFavoriteStatus(token);
            setIsFavorite(favoriteIds.has(id));
          }
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isAuthenticated]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 2000);
    }
  };

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
      console.error('Favorite error:', err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!id || !isAuthenticated || newRating === 0) return;
    
    setReviewSubmitting(true);
    try {
      const token = await getToken();
      if (!token) return;

      await createReview(token, id, newRating, newComment);
      
      const reviewData = await fetchReviews(id);
      setReviews(reviewData.reviews);
      setAverageRating(reviewData.averageRating);
      
      setNewRating(0);
      setNewComment('');
    } catch (err) {
      console.error('Review error:', err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>{error || 'Product not found'}</h3>
          <Link to="/products" className="btn btn-primary mt-lg">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-main-image">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500'}
            alt={product.name}
          />
        </div>
        <Link to="/products" className="text-sm text-muted">
          ← Back to Products
        </Link>
      </div>

      <div className="product-info">
        <span className="badge mb-md">{product.category}</span>
        
        <h1>{product.name}</h1>

        {reviews.length > 0 && (
          <div className="flex items-center gap-sm mb-md">
            <StarRating rating={Math.round(averageRating)} readonly />
            <span className="text-muted text-sm">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        )}

        <div className="product-price">¥{product.price.toLocaleString()}</div>

        <p className="product-description">{product.description}</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          
          <button onClick={handleAddToCart} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
            Add to Cart
          </button>
          
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleToggleFavorite}
              disabled={favoriteLoading}
              className="btn btn-secondary"
              style={{ opacity: favoriteLoading ? 0.5 : 1 }}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          )}
        </div>
        
        {addedMessage && (
          <div className="alert alert-success">Added to cart</div>
        )}

        {/* Reviews */}
        <div className="reviews-section">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Reviews</h2>
          
          {isAuthenticated ? (
            <div className="review-form">
              <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem' }}>Write a review</h4>
              <div className="mb-md">
                <StarRating rating={newRating} onRate={setNewRating} />
              </div>
              <div className="form-group">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts (optional)"
                  rows={3}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={newRating === 0 || reviewSubmitting}
                className="btn btn-primary"
              >
                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          ) : (
            <div className="alert alert-info mb-lg">
              <Link to="/login">Sign in</Link> to write a review
            </div>
          )}

          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet</p>
          ) : (
            <div>
              {reviews.map((review) => (
                <div key={review.reviewId} className="review-card">
                  <div className="flex items-center justify-between mb-sm">
                    <div className="flex items-center gap-sm">
                      <StarRating rating={review.rating} readonly />
                      <span className="font-medium text-sm">{review.userName}</span>
                    </div>
                    <span className="text-sm text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && <p style={{ margin: 0 }}>{review.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
