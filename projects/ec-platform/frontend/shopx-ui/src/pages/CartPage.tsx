import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  // カートが空の場合
  if (items.length === 0) {
    return (
      <div>
        <h1>🛒 カート</h1>
        <p>カートは空です</p>
        <Link to="/products">商品一覧を見る</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>🛒 カート（{totalItems}点）</h1>
      
      {/* カート内の商品一覧 */}
      <div style={{ marginBottom: '2rem' }}>
        {items.map((item) => (
          <div
            key={item.product.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderBottom: '1px solid #eee',
            }}
          >
            {/* 商品画像 */}
            <img
              src={item.product.imageUrl || 'https://placehold.co/80x80?text=No+Image'}
              alt={item.product.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
            />
            
            {/* 商品情報 */}
            <div style={{ flex: 1 }}>
              <Link
                to={`/products/${item.product.id}`}
                style={{ textDecoration: 'none', color: '#333' }}
              >
                <h3 style={{ margin: 0 }}>{item.product.name}</h3>
              </Link>
              <p style={{ margin: '0.25rem 0', color: '#666' }}>
                ¥{item.product.price.toLocaleString()} × {item.quantity}
              </p>
            </div>
            
            {/* 小計 */}
            <div style={{ fontWeight: 'bold', minWidth: '100px', textAlign: 'right' }}>
              ¥{(item.product.price * item.quantity).toLocaleString()}
            </div>
            
            {/* 削除ボタン */}
            <button
              onClick={() => removeFromCart(item.product.id)}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              削除
            </button>
          </div>
        ))}
      </div>
      
      {/* 合計・操作ボタン */}
      <div style={{
        borderTop: '2px solid #333',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          カートを空にする
        </button>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            合計: ¥{totalPrice.toLocaleString()}
          </p>
          <button
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '0.5rem',
            }}
          >
            購入手続きへ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
