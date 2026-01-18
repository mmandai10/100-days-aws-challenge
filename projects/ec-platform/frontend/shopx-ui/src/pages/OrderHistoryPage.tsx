import { useState, useEffect } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { getOrders, createOrder } from '../api/orders';
import type { Order, ShippingAddress } from '../api/orders';
import { useCart } from '../context/CartContext';

const OrderHistoryPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const newOrderId = location.state?.newOrderId;
  const paymentSuccess = searchParams.get('success');

  useEffect(() => {
    const processPaymentSuccess = async () => {
      if (paymentSuccess === 'true') {
        // Stripe 決済成功後の処理
        const savedAddress = localStorage.getItem('pendingShippingAddress');
        if (savedAddress) {
          try {
            const shippingAddress: ShippingAddress = JSON.parse(savedAddress);
            const order = await createOrder(shippingAddress);
            setSuccessMessage(`Payment successful! Order ID: ${order.orderId.slice(0, 8)}...`);
            localStorage.removeItem('pendingShippingAddress');
            clearCart();
          } catch (err) {
            console.error('Failed to create order after payment:', err);
            setError('Payment received but order creation failed. Please contact support.');
          }
        }
      }
    };

    processPaymentSuccess();
  }, [paymentSuccess, clearCart]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    // 少し遅延させて注文作成後のデータを取得
    const timer = setTimeout(loadOrders, paymentSuccess ? 1000 : 0);
    return () => clearTimeout(timer);
  }, [paymentSuccess, successMessage]);

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: 'Processing',
      processing: 'Preparing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return map[status] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !successMessage) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>Orders</h1>

      {successMessage && (
        <div className="alert alert-success mb-xl">
          {successMessage}
        </div>
      )}

      {newOrderId && !successMessage && (
        <div className="alert alert-success mb-xl">
          Order placed successfully! Order ID: {newOrderId.slice(0, 8)}...
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="flex items-center gap-md">
                  <span className="badge">{getStatusLabel(order.status)}</span>
                  <span className="text-sm text-muted">
                    {order.orderId.slice(0, 8)}...
                  </span>
                </div>
                <span className="text-sm text-muted">
                  {formatDate(order.createdAt)}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="order-item-image">
                      <img src={item.imageUrl || 'https://via.placeholder.com/48'} alt={item.name} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: '0.875rem' }}>{item.name}</p>
                      <p className="text-sm text-muted" style={{ margin: 0 }}>
                        ¥{item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <div className="font-medium text-sm">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--color-border)'
                }}>
                  <div className="text-sm">
                    <span className="text-muted">Ship to: </span>
                    {order.shippingAddress.name}, {order.shippingAddress.address}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted">Total</span>
                    <p className="font-medium" style={{ margin: 0 }}>
                      ¥{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
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
