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

// useCart のモック
const mockCartItems = [
  {
    product: { id: '1', name: 'テスト商品', price: 1000, category: 'test', imageUrl: '' },
    quantity: 2,
  },
];

vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    items: mockCartItems,
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
    totalPrice: 2000,
    totalItems: 2,
  }),
}));

// useAuth のモック（デフォルト：未ログイン）
let mockIsAuthenticated = false;

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    isLoading: false,
    user: null,
  }),
}));

describe('CartPage - 購入手続き', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated = false;
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('カートに商品がある場合、購入手続きボタンが表示される', () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText('購入手続きへ')).toBeInTheDocument();
  });

  it('未ログインで「購入手続きへ」をクリックすると /login にリダイレクト', async () => {
    mockIsAuthenticated = false;
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByText('購入手続きへ');
    await user.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { from: { pathname: '/cart' } },
    });
  });

  it('ログイン済みで「購入手続きへ」をクリックするとアラート表示', async () => {
    mockIsAuthenticated = true;
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const checkoutButton = screen.getByText('購入手続きへ');
    await user.click(checkoutButton);

    expect(window.alert).toHaveBeenCalledWith('購入手続き機能は Phase 4 で実装します');
  });
});