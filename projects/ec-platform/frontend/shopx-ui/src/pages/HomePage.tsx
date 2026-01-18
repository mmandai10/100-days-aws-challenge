import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import type { Product } from '../types/product';

const categories = [
  { id: 'electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
  { id: 'books', name: 'Books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { id: 'home', name: 'Home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      {/* Hero - Minimal */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Discover what you love.</h1>
          <p>
            AI-powered shopping experience with curated products just for you.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/chat" className="btn btn-secondary btn-lg">
              Ask AI
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Categories */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <Link to="/products" className="section-link">View all</Link>
          </div>
          <div className="grid grid-4">
            {categories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <div className="category-card-overlay">
                  <span className="category-card-title">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Featured</h2>
            <Link to="/products" className="section-link">View all</Link>
          </div>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-4">
              {featuredProducts.map(product => (
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
                  <div className="product-card-category">{product.category}</div>
                  <h3 className="product-card-title">{product.name}</h3>
                  <div className="product-card-price">¥{product.price.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* CTA - Minimal */}
        <section className="section" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ marginBottom: '1rem' }}>Need help finding something?</h2>
          <p className="text-muted" style={{ marginBottom: '2rem' }}>
            Our AI assistant can help you find the perfect product.
          </p>
          <Link to="/chat" className="btn btn-primary btn-lg">
            Chat with AI
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
