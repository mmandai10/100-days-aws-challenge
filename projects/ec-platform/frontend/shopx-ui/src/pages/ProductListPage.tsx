import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Product, Category } from '../types/product';
import { searchProducts, fetchCategories } from '../api/products';

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Category error:', err);
      }
    };
    loadCategories();
  }, []);

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
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParams.get('category') || '';
    setSelectedCategory(category);
    executeSearch({ category });
  }, [searchParams]);

  const handleSearch = () => {
    executeSearch({
      category: selectedCategory,
      keyword: searchKeyword,
      minPrice,
      maxPrice,
    });
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSearchKeyword('');
    setMinPrice('');
    setMaxPrice('');
    executeSearch({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div className="section-header">
        <h1 className="section-title">Products</h1>
      </div>

      {/* Filters */}
      <div className="search-filters">
        <div className="search-row">
          <div className="form-group keyword">
            <label>Search</label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Min Price</label>
            <input
              type="text"
              inputMode="numeric"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              placeholder="¥0"
            />
          </div>

          <div className="form-group">
            <label>Max Price</label>
            <input
              type="text"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={handleKeyDown}
              placeholder="¥999,999"
            />
          </div>
        </div>

        <div className="flex gap-md mt-lg items-center justify-between">
          <span className="text-sm text-muted">
            {loading ? 'Loading...' : `${products.length} products`}
          </span>
          <div className="flex gap-sm">
            <button type="button" onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
            <button type="button" onClick={handleClear} className="btn btn-secondary">
              Clear
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your filters</p>
          <button onClick={handleClear} className="btn btn-primary mt-md">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card"
            >
              <div className="product-card-image">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300'}
                  alt={product.name}
                />
              </div>
              <div className="product-card-category">{product.category || 'Uncategorized'}</div>
              <h3 className="product-card-title">{product.name}</h3>
              <div className="product-card-price">¥{product.price.toLocaleString()}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
