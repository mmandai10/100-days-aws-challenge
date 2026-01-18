import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import type { Category } from '../types/product';
import { searchProducts, fetchCategories } from '../api/products';

// 入力フィールドの共通スタイル
const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const ProductListPage = () => {
  // フィルター状態
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // データ状態
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // カテゴリ一覧を取得
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('カテゴリ取得エラー:', err);
      }
    };
    loadCategories();
  }, []);

  // 商品検索を実行
  const executeSearch = async (params: {
    category?: string;
    keyword?: string;
    minPrice?: string;
    maxPrice?: string;
  }) => {
    setLoading(true);
    try {
      const data = await searchProducts({
        category: params.category || undefined,
        keyword: params.keyword || undefined,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
      });
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('商品の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロード
  useEffect(() => {
    executeSearch({});
  }, []);

  // 検索ボタンクリック
  const handleSearch = () => {
    executeSearch({
      category: selectedCategory,
      keyword: searchKeyword,
      minPrice,
      maxPrice,
    });
  };

  // フィルタークリア
  const handleClear = () => {
    setSelectedCategory('');
    setSearchKeyword('');
    setMinPrice('');
    setMaxPrice('');
    executeSearch({});
  };

  // Enterキーで検索
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>商品一覧</h1>

      {/* 検索・フィルターエリア */}
      <div style={{ 
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div style={{ 
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'flex-end'
        }}>
          {/* キーワード検索 */}
          <div style={{ width: '220px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              キーワード
            </label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="商品名・説明で検索..."
              style={{ ...inputStyle, width: '100%' }}
            />
          </div>

          {/* カテゴリフィルター */}
          <div style={{ width: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              カテゴリ
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ ...inputStyle, width: '100%' }}
            >
              <option value="">すべて</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 価格帯フィルター */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
              価格帯
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={handleKeyDown}
                placeholder="最小"
                style={{ ...inputStyle, width: '100px' }}
              />
              <span>〜</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={handleKeyDown}
                placeholder="最大"
                style={{ ...inputStyle, width: '100px' }}
              />
              <span>円</span>
            </div>
          </div>

          {/* ボタン */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleSearch}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              検索
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '1rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              クリア
            </button>
          </div>
        </div>

        {/* 検索結果数 */}
        <div style={{ marginTop: '0.75rem', color: '#666', height: '1.5rem' }}>
          {loading ? '検索中...' : `${products.length}件の商品が見つかりました`}
        </div>
      </div>

      {/* 商品一覧 */}
      {loading ? (
        <div>読み込み中...</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
          {products.length === 0 ? (
            <p>商品がありません</p>
          ) : (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ProductCard
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
