import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import { fetchFavorites, removeFavorite } from '../api/favorites';
import { useAuth } from '../context/AuthContext';

const FavoritesPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // トークン取得
  const getToken = async (): Promise<string | null> => {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch {
      return null;
    }
  };

  // お気に入り一覧を取得
  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          setError('認証エラー');
          setLoading(false);
          return;
        }

        const data = await fetchFavorites(token);
        setProducts(data);
      } catch (err) {
        setError('お気に入りの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      loadFavorites();
    }
  }, [isAuthenticated, authLoading]);

  // お気に入りから削除
  const handleRemove = async (productId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      await removeFavorite(token, productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      console.error('削除エラー:', err);
    }
  };

  // 認証チェック中
  if (authLoading) {
    return <div>読み込み中...</div>;
  }

  // 未ログイン
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // ローディング中
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // エラー時
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>お気に入り</h1>

      {products.length === 0 ? (
        <div>
          <p>お気に入りの商品はありません</p>
          <Link to="/products">商品一覧を見る</Link>
        </div>
      ) : (
        <>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {products.length}件のお気に入り
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {products.map((product) => (
              <div key={product.id} style={{ position: 'relative' }}>
                <Link
                  to={`/products/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  title="お気に入りから削除"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
