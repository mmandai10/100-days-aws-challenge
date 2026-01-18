import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Product } from '../types/product';
import { fetchFavorites, removeFavorite } from '../api/favorites';
import { useAuth } from '../context/AuthContext';

const FavoritesPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          setError('Authentication error');
          setLoading(false);
          return;
        }

        const data = await fetchFavorites(token);
        setProducts(data);
      } catch (err) {
        setError('Failed to load favorites');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadFavorites();
    }
  }, [isAuthenticated, authLoading]);

  const handleRemove = async (productId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      await removeFavorite(token, productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      console.error('Remove error:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div className="section-header">
        <h1 className="section-title">Favorites</h1>
        {products.length > 0 && (
          <span className="text-muted">{products.length} items</span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h3>No favorites yet</h3>
          <p>Save products you like by clicking the heart icon</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {products.map((product) => (
            <div key={product.id} style={{ position: 'relative' }}>
              <Link to={`/products/${product.id}`} className="product-card">
                <div className="product-card-image">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                  />
                </div>
                <div className="product-card-category">{product.category}</div>
                <h3 className="product-card-title">{product.name}</h3>
                <div className="product-card-price">¥{product.price.toLocaleString()}</div>
              </Link>
              <button
                type="button"
                onClick={() => handleRemove(product.id)}
                className="product-card-favorite"
                title="Remove from favorites"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
