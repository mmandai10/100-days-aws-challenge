import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://zzhyj5syl6.execute-api.ap-northeast-1.amazonaws.com/Prod';

function ProductDetail() {
  const { id } = useParams();  // URLから商品IDを取得
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('商品が見つかりません');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="detail-container">読み込み中...</div>;
  if (error) return <div className="detail-container">エラー: {error}</div>;
  if (!product) return <div className="detail-container">商品が見つかりません</div>;

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← 商品一覧に戻る</Link>
      
      <div className="detail-card">
        <h2>{product.name}</h2>
        <p className="detail-price">¥{product.price?.toLocaleString()}</p>
        <p className="detail-category">カテゴリ: {product.category}</p>
        <p className="detail-description">{product.description || '説明はありません'}</p>
        
        <button className="add-to-cart-btn">
          🛒 カートに入れる
        </button>
        <p className="coming-soon">※カート機能はWeek 3で実装</p>
      </div>
    </div>
  );
}

export default ProductDetail;