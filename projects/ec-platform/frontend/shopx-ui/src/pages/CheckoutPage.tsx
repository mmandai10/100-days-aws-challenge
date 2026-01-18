import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, createCheckoutSession } from '../api/orders';
import type { ShippingAddress } from '../api/orders';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe'>('stripe');

  const canceled = searchParams.get('canceled');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    postalCode: '',
    address: '',
    phone: ''
  });

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Cart is empty</h3>
          <p>Add products before checkout</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
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

    if (!shippingAddress.name || !shippingAddress.postalCode || !shippingAddress.address) {
      setError('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === 'stripe') {
        // 配送先を localStorage に保存（決済成功後に使う）
        localStorage.setItem('pendingShippingAddress', JSON.stringify(shippingAddress));
        
        // Stripe Checkout Session 作成
        const { url } = await createCheckoutSession();
        
        // Stripe 決済ページにリダイレクト
        window.location.href = url;
      } else {
        // 代引き（従来の処理）
        const order = await createOrder(shippingAddress);
        clearCart();
        navigate('/orders', { state: { newOrderId: order.orderId } });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order failed');
      setIsSubmitting(false);
    }
  };

  const shippingFee = totalPrice >= 5000 ? 0 : 500;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem' }}>
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>Checkout</h1>

      {canceled && (
        <div className="alert alert-error mb-lg">
          Payment was canceled. Please try again.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Shipping Address</h3>

          {error && <div className="alert alert-error mb-lg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={handleInputChange}
                placeholder="Full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                placeholder="123-4567"
                required
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Street address"
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleInputChange}
                placeholder="090-1234-5678"
              />
            </div>

            <h3 style={{ fontSize: '1rem', marginTop: '2rem', marginBottom: '1rem' }}>Payment Method</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={() => setPaymentMethod('stripe')}
                />
                <span>Credit Card (Stripe)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <div className="flex gap-md mt-xl">
              <button type="button" onClick={() => navigate('/cart')} className="btn btn-secondary">
                Back
              </button>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                {isSubmitting ? 'Processing...' : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Order Summary</h3>
            
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm" style={{ padding: '0.5rem 0' }}>
                <span className="text-muted">{item.product.name} × {item.quantity}</span>
                <span>¥{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1rem', paddingTop: '1rem' }}>
              <div className="flex justify-between text-sm" style={{ marginBottom: '0.5rem' }}>
                <span>Subtotal</span>
                <span>¥{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ marginBottom: '0.5rem' }}>
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Free' : `¥${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-medium" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <span>Total</span>
                <span>¥{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {paymentMethod === 'stripe' && (
              <p className="text-sm text-muted mt-md">
                Test card: 4242 4242 4242 4242
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
