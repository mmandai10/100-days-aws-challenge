import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { useCart, CartProvider } from './context/CartContext';
import { useAuth, AuthProvider } from './context/AuthContext';

// ナビゲーションコンポーネント
const Navigation = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <nav style={{
      padding: '1rem',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>ホーム</Link>
        <Link to="/products" style={{ marginRight: '1rem' }}>商品一覧</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isLoading ? (
          <span>読込中...</span>
        ) : isAuthenticated ? (
          <>
            <span>{user?.email}</span>
            <Link to="/orders" style={{ textDecoration: 'none' }}>注文履歴</Link>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ログアウト
            </button>
          </>
        ) : (
          <>
            <Link to="/login">ログイン</Link>
            <Link to="/signup">新規登録</Link>
          </>
        )}
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          🛒 カート
          {totalItems > 0 && (
            <span style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              padding: '0.2rem 0.5rem',
              marginLeft: '0.3rem',
              fontSize: '0.8rem',
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navigation />

          <main style={{ padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;