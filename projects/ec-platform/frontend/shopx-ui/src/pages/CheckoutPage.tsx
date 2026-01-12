import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orders';
import type { ShippingAddress } from '../api/orders';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // フォームの状態
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    postalCode: '',
    address: '',
    phone: ''
  });

  // カートが空なら商品一覧へ
  if (items.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>カートが空です</h2>
        <button onClick={() => navigate('/products')}>
          商品一覧へ戻る
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // バリデーション
    if (!shippingAddress.name || !shippingAddress.postalCode || !shippingAddress.address) {
      setError('必須項目を入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder(shippingAddress);
      clearCart();  // ローカルのカートもクリア
      navigate('/orders', { state: { newOrderId: order.orderId } });
    } catch (err) {
      setError(err instanceof Error ? err.message : '注文に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>注文確認</h2>

      {/* 注文内容 */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>注文内容</h3>
        {items.map((item) => (
          <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <span>{item.product.name} × {item.quantity}</span>
            <span>¥{(item.product.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontWeight: 'bold', fontSize: '1.2em' }}>
          <span>合計</span>
          <span>¥{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* 配送先フォーム */}
      <form onSubmit={handleSubmit}>
        <h3>配送先情報</h3>

        {error && (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            お名前 <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={shippingAddress.name}
            onChange={handleInputChange}
            placeholder="山田太郎"
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            郵便番号 <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleInputChange}
            placeholder="123-4567"
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            住所 <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            name="address"
            value={shippingAddress.address}
            onChange={handleInputChange}
            placeholder="東京都渋谷区..."
            rows={3}
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            電話番号
          </label>
          <input
            type="tel"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleInputChange}
            placeholder="090-1234-5678"
            style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => navigate('/cart')}
            style={{ padding: '15px 30px', fontSize: '16px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            カートに戻る
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              backgroundColor: isSubmitting ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              flex: 1
            }}
          >
            {isSubmitting ? '処理中...' : '注文を確定する'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
