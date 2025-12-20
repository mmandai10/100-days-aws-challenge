import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import type { Category } from '../types/product';
import { fetchProducts, fetchProductsByCategory, fetchCategories } from '../api/products';

const ProductListPage = () => {
  // URL パラメータを管理（?category=xxx）
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';  // 現在選択中のカテゴリ

  // 状態管理
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // カテゴリ一覧を取得（最初の1回だけ）
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

  // 商品を取得（カテゴリが変わるたびに実行）
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // カテゴリ選択あり → カテゴリ別取得、なし → 全件取得
        const data = selectedCategory
          ? await fetchProductsByCategory(selectedCategory)
          : await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);  // selectedCategory が変わったら再実行

  // カテゴリ選択時の処理
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ category: value });  // URL を ?category=xxx に更新
    } else {
      setSearchParams({});  // パラメータをクリア
    }
  };

  // エラー時
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>商品一覧</h1>

      {/* カテゴリフィルター */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="category-select">カテゴリ: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        >
          <option value="">すべて</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* ローディング中 */}
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
                  id={product.id}
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
