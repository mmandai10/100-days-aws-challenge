import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../api/orders';
import type { Order } from '../api/orders';

const OrderHistoryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 新規注文完了時のメッセージ
  const newOrderId = location.state?.newOrderId;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '注文履歴の取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  // ステータスの日本語表示
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '処理中',
      confirmed: '確定',
      shipped: '発送済み',
      delivered: '配達完了',
      cancelled: 'キャンセル'
    };
    return statusMap[status] || status;
  };

  // 日付フォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>読み込み中...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={() => window.location.reload()}>再読み込み</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>注文履歴</h2>

      {/* 新規注文完了メッセージ */}
      {newOrderId && (
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          ✅ 注文が完了しました！（注文番号: {newOrderId}）
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>注文履歴がありません</p>
          <button
            onClick={() => navigate('/products')}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            商品一覧へ
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '20px',
                overflow: 'hidden'
              }}
            >
              {/* 注文ヘッダー */}
              <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <strong>注文番号:</strong> {order.orderId}
                </div>
                <div>
                  <strong>注文日:</strong> {formatDate(order.createdAt)}
                </div>
                <div>
                  <strong>ステータス:</strong>{' '}
                  <span style={{
                    padding: '3px 8px',
                    backgroundColor: order.status === 'pending' ? '#fff3e0' : '#e8f5e9',
                    borderRadius: '4px'
                  }}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>

              {/* 注文内容 */}
              <div style={{ padding: '15px' }}>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: index < order.items.length - 1 ? '1px solid #eee' : 'none'
                    }}
                  >
                    <span>{item.name} × {item.quantity}</span>
                    <span>¥{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}

                {/* 配送先 */}
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fafafa', borderRadius: '4px' }}>
                  <strong>配送先:</strong>
                  <p style={{ margin: '5px 0' }}>
                    {order.shippingAddress.name}<br />
                    〒{order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.address}
                  </p>
                </div>

                {/* 合計 */}
                <div style={{
                  marginTop: '15px',
                  textAlign: 'right',
                  fontSize: '1.2em',
                  fontWeight: 'bold'
                }}>
                  合計: ¥{order.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
