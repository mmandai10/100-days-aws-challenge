import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { items, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    navigate('/checkout');
  };

  const shippingFee = totalPrice >= 5000 ? 0 : 500;

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="section-title" style={{ marginBottom: '2rem' }}>Cart ({totalItems})</h1>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.product.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.product.imageUrl || 'https://via.placeholder.com/80'}
                alt={item.product.name}
              />
            </div>
            
            <div className="cart-item-info">
              <Link to={`/products/${item.product.id}`}>
                <h3>{item.product.name}</h3>
              </Link>
              <p className="cart-item-price">
                ¥{item.product.price.toLocaleString()} × {item.quantity}
              </p>
            </div>
            
            <div style={{ fontWeight: 500 }}>
              ¥{(item.product.price * item.quantity).toLocaleString()}
            </div>
            
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="btn btn-secondary"
              style={{ padding: '8px 16px' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>¥{totalPrice.toLocaleString()}</span>
        </div>
        <div className="cart-summary-row">
          <span>Shipping</span>
          <span>{shippingFee === 0 ? 'Free' : `¥${shippingFee}`}</span>
        </div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>¥{(totalPrice + shippingFee).toLocaleString()}</span>
        </div>
        
        <div className="flex gap-md mt-lg">
          <button onClick={clearCart} className="btn btn-secondary">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
            Checkout
          </button>
        </div>
        
        {totalPrice < 5000 && (
          <p className="text-sm text-muted mt-md text-center">
            ¥{(5000 - totalPrice).toLocaleString()} more for free shipping
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
