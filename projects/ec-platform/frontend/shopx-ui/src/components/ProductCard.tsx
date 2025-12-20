type Props = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

const ProductCard = ({ id, name, price, imageUrl }: Props) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      width: '200px',
    }}>
      <img
    src={imageUrl || 'https://placehold.co/200x200?text=No+Image'}
    alt={name}
    style={{ width: '100%', borderRadius: '4px' }}
    />
      <h3 style={{ margin: '0.5rem 0' }}>{name}</h3>
      <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
        ¥{price.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;