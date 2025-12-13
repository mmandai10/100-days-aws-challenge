import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://zzhyj5syl6.execute-api.ap-northeast-1.amazonaws.com/Prod';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/products`).then(res => res.json()),
      fetch(`${API_URL}/categories`).then(res => res.json())
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData.products);
        setCategories(categoriesData.categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return <div className="App">読み込み中...</div>;
  }

  return (
    <div className="App">
      <h1>🛒 ShopX</h1>
      
      <div className="category-filter">
        <button 
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          すべて ({products.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.categoryId}
            className={selectedCategory === cat.categoryId ? 'active' : ''}
            onClick={() => setSelectedCategory(cat.categoryId)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.productId}>
            <h3>{product.name}</h3>
            <p className="price">¥{product.price?.toLocaleString()}</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;