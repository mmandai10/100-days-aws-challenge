// CartContext のテスト
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';

// AuthContext をモック（CartProvider が useAuth を使うため）
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    isLoading: false,
    user: null,
  }),
}));

// cart API をモック
vi.mock('../api/cart', () => ({
  fetchCart: vi.fn().mockResolvedValue([]),
  updateCart: vi.fn().mockResolvedValue(undefined),
}));

// テスト用のコンポーネント（CartContext の機能を使う）
const TestComponent = () => {
  const { items, addToCart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  const testProduct = {
    id: 'test-1',
    name: 'Test Product 1',
    price: 1000,
    description: 'Test',
    category: 'test',
  };

  const testProduct2 = {
    id: 'test-2',
    name: 'Test Product 2',
    price: 2000,
    description: 'Test 2',
    category: 'test',
  };

  return (
    <div>
      <p data-testid="total-items">Items: {totalItems}</p>
      <p data-testid="total-price">Total: {totalPrice}</p>
      <p data-testid="item-count">Types: {items.length}</p>
      
      <button onClick={() => addToCart(testProduct)}>Add Product 1</button>
      <button onClick={() => addToCart(testProduct2)}>Add Product 2</button>
      <button onClick={() => removeFromCart('test-1')}>Remove Product 1</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

const renderWithProvider = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('初期状態ではカートが空', () => {
    renderWithProvider();

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 0');
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 0');
  });

  it('addToCart で商品を追加できる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('Add Product 1'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 1000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 1');
  });

  it('同じ商品を追加すると数量が増える', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('Add Product 1'));
    await user.click(screen.getByText('Add Product 1'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 2000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 1'); // 種類は1
  });

  it('異なる商品を追加すると種類が増える', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('Add Product 1'));
    await user.click(screen.getByText('Add Product 2'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 3000'); // 1000 + 2000
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 2');
  });

  it('removeFromCart で商品を削除できる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('Add Product 1'));
    await user.click(screen.getByText('Add Product 2'));
    await user.click(screen.getByText('Remove Product 1'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 2000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 1');
  });

  it('clearCart でカートを空にできる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('Add Product 1'));
    await user.click(screen.getByText('Add Product 2'));
    await user.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('Items: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('Total: 0');
    expect(screen.getByTestId('item-count')).toHaveTextContent('Types: 0');
  });
});
