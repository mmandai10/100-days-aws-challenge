import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, isLoading, isAdmin, user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo">
          ShopX
        </Link>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/products" className={isActive('/products') ? 'active' : ''}>
            Products
          </Link>
          <Link to="/chat" className={isActive('/chat') ? 'active' : ''}>
            AI Assistant
          </Link>
          {isAdmin && (
            <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
              Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {isLoading ? (
            <span className="text-muted text-sm">...</span>
          ) : isAuthenticated ? (
            <>
              <span className="header-user hide-mobile">
                {user?.email?.split('@')[0]}
              </span>
              <Link to="/favorites" className="text-muted text-sm">
                Favorites
              </Link>
              <Link to="/orders" className="text-muted text-sm hide-mobile">
                Orders
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Sign Up
              </Link>
            </>
          )}
          
          <Link to="/cart" className="header-cart">
            Cart
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
        <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>AI Assistant</Link>
        <Link to="/favorites" onClick={() => setMobileMenuOpen(false)}>Favorites</Link>
        <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
        {isAdmin && (
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
