import { useParams, Link } from 'react-router-dom';

// ダミーデータ（後で API から取得する）
const dummyProducts: Record<string, { name: string; price: number; description: string }> = {
  'prod-001': { name: 'ワイヤレスイヤホン', price: 12800, description: '高音質なワイヤレスイヤホン。ノイズキャンセリング機能付き。' },
  'prod-002': { name: 'スマートウォッチ', price: 24800, description: '健康管理に最適。心拍数、睡眠、運動を記録。' },
  'prod-003': { name: 'モバイルバッテリー', price: 3980, description: '大容量10000mAh。スマホを約3回充電可能。' },
  'prod-004': { name: 'Bluetoothスピーカー', price: 8800, description: '防水仕様。アウトドアでも使える高音質スピーカー。' },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = id ? dummyProducts[id] : null;

  if (!product) {
    return (
      <div>
        <h1>商品が見つかりません</h1>
        <Link to="/products">商品一覧に戻る</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/products">← 商品一覧に戻る</Link>
      <h1>{product.name}</h1>
      <img
        src="https://placehold.co/400x300?text=Product+Image"
        alt={product.name}
        style={{ borderRadius: '8px', marginTop: '1rem' }}
      />
      <p style={{ fontSize: '1.5rem', color: '#e74c3c', fontWeight: 'bold' }}>
        ¥{product.price.toLocaleString()}
      </p>
      <p>{product.description}</p>
      <button style={{
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '0.75rem 2rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
      }}>
        カートに追加
      </button>
    </div>
  );
};

export default ProductDetailPage;