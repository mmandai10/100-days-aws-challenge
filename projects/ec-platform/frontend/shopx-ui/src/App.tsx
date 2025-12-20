import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { useCart } from './context/CartContext';

// ナビゲーションコンポーネント（カート個数を表示するため分離）
const Navigation = () => {
  const { totalItems } = useCart();
  
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
        <Link to="/products">商品一覧</Link>
      </div>
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
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
