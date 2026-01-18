import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found. The page you're looking for doesn't exist.</p>
      <div className="flex gap-md">
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/products" className="btn btn-secondary">
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
