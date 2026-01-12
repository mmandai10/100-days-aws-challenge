import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchAuthSession } from 'aws-amplify/auth';

// 型定義
interface Product {
  productId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
}

interface ProductInput {
  name: string;
  price: number;
  description?: string;
  category: string;
  imageUrl?: string;
  stock?: number;
}

const API_URL = import.meta.env.VITE_API_URL;

// JWT トークン取得
const getAuthToken = async (): Promise<string> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error('Not authenticated');
  return token;
};

// 全商品取得
const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.products;
};

// 商品作成
const createProduct = async (product: ProductInput): Promise<Product> => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  if (response.status === 403) throw new Error('Admin access required');
  if (!response.ok) throw new Error('Failed to create product');
  const data = await response.json();
  return data.product;
};

// 商品更新
const updateProduct = async (productId: string, updates: Partial<ProductInput>): Promise<Product> => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}admin/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  if (response.status === 403) throw new Error('Admin access required');
  if (response.status === 404) throw new Error('Product not found');
  if (!response.ok) throw new Error('Failed to update product');
  const data = await response.json();
  return data.product;
};

// 商品削除
const deleteProduct = async (productId: string): Promise<void> => {
  const token = await getAuthToken();
  const response = await fetch(`${API_URL}admin/products/${productId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 403) throw new Error('Admin access required');
  if (response.status === 404) throw new Error('Product not found');
  if (!response.ok) throw new Error('Failed to delete product');
};

const AdminPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
    stock: 0
  });

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('商品の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/signin', { state: { from: '/admin' } });
        return;
      }
      if (!isAdmin) {
        navigate('/');
        return;
      }
      loadProducts();
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  const resetForm = () => {
    setFormData({ name: '', price: 0, description: '', category: '', imageUrl: '', stock: 0 });
    setEditingProduct(null);
    setIsEditing(false);
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category,
      imageUrl: product.imageUrl || '',
      stock: product.stock || 0
    });
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.productId, formData);
        setSuccess('商品を更新しました');
      } else {
        await createProduct(formData);
        setSuccess('商品を追加しました');
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('この商品を削除しますか？')) return;
    setError(null);
    setSuccess(null);

    try {
      await deleteProduct(productId);
      setSuccess('商品を削除しました');
      loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : '削除に失敗しました');
    }
  };

  if (authLoading || isLoading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>読み込み中...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>商品管理</h1>

      {error && <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}
      {success && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{success}</div>}

      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>{editingProduct ? '商品を編集' : '新規商品追加'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label>商品名 *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label>価格 *</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required min="0" style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label>カテゴリ *</label>
            <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label>説明</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '10px', fontSize: '16px', minHeight: '80px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label>画像URL</label>
            <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label>在庫数</label>
            <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} min="0" style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
              {editingProduct ? '更新' : '追加'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} style={{ padding: '12px 24px', backgroundColor: '#757575', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
                キャンセル
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2>商品一覧（{products.length}件）</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>商品名</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>価格</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>カテゴリ</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>在庫</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{product.productId}</td>
                <td style={{ padding: '10px' }}>{product.name}</td>
                <td style={{ padding: '10px' }}>¥{product.price.toLocaleString()}</td>
                <td style={{ padding: '10px' }}>{product.category}</td>
                <td style={{ padding: '10px' }}>{product.stock || 0}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => startEdit(product)} style={{ padding: '6px 12px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', marginRight: '5px', cursor: 'pointer' }}>編集</button>
                  <button onClick={() => handleDelete(product.productId)} style={{ padding: '6px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
