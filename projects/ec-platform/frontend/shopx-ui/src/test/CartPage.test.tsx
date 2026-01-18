// CartPage のテスト
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CartPage from '../pages/CartPage';

// useNavigate のモック
const mockNavigate = vi.fn();

// react-router-dom のモック
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// useCart のモック（商品あり）
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();

vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    items: [
      {
        product: { id: '1', name: 'Test Product', price: 1000, description: 'test', category: 'test', imageUrl: '' },
        quantity: 2,
      },
    ],
    removeFromCart: mockRemoveFromCart,
    clearCart: mockClearCart,
    totalPrice: 2000,
    totalItems: 2,
  }),
}));

// useAuth のモック
let mockIsAuthenticated = false;

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    isLoading: false,
    user: null,
  }),
}));

describe('CartPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated = false;
  });

  it('カートの商品名が表示される', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('カートのタイトルにアイテム数が表示される', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart (2)')).toBeInTheDocument();
  });

  it('Checkout ボタンが表示される', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
  });

  it('未ログインで Checkout をクリックすると /login にリダイレクト', async () => {
    mockIsAuthenticated = false;
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    await user.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { from: { pathname: '/cart' } },
    });
  });

  it('ログイン済みで Checkout をクリックすると /checkout にリダイレクト', async () => {
    mockIsAuthenticated = true;
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
    await user.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('Remove ボタンをクリックすると removeFromCart が呼ばれる', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    await user.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
  });

  it('Clear Cart ボタンをクリックすると clearCart が呼ばれる', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const clearButton = screen.getByRole('button', { name: 'Clear Cart' });
    await user.click(clearButton);

    expect(mockClearCart).toHaveBeenCalled();
  });
});
