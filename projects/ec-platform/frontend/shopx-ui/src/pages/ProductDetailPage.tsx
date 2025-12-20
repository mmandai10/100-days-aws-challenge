import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/products';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();  // カート機能を取得
  
  // 状態管理
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);  // 追加時のメッセージ

  // 画面表示時（または id 変更時）に API を呼び出す
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError('商品IDが指定されていません');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('商品が見つかりません');
        }
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // カートに追加する処理
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedMessage(true);
      // 2秒後にメッセージを消す
      setTimeout(() => setAddedMessage(false), 2000);
    }
  };

  // ローディング中
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // エラー時
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
      <h1>{product.name}</h1>
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
      
      {/* 追加時のメッセージ */}
      {addedMessage && (
        <p style={{ color: '#27ae60', marginTop: '0.5rem' }}>
          ✓ カートに追加しました！
        </p>
      )}
    </div>
  );
};

export default ProductDetailPage;
