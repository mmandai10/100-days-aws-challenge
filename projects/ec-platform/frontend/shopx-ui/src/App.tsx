import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>ホーム</Link>
        <Link to="/products">商品一覧</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;