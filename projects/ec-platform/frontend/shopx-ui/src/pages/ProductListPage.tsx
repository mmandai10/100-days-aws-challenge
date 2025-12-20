import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// ダミーデータ（後で API から取得する）
const dummyProducts = [
  { id: 'prod-001', name: 'ワイヤレスイヤホン', price: 12800 },
  { id: 'prod-002', name: 'スマートウォッチ', price: 24800 },
  { id: 'prod-003', name: 'モバイルバッテリー', price: 3980 },
  { id: 'prod-004', name: 'Bluetoothスピーカー', price: 8800 },
];

const ProductListPage = () => {
  return (
    <div>
      <h1>商品一覧</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {dummyProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;