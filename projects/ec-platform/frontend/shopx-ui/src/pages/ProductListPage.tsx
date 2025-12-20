import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '../api/products';

const ProductListPage = () => {
  // 状態管理
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 画面表示時に API を呼び出す
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);  // [] = 最初の1回だけ実行

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
      <h1>商品一覧</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
