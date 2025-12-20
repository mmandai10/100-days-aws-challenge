// CartPage のテスト
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import CartPage from '../pages/CartPage';

// CartPage は CartProvider と BrowserRouter が必要
const renderCartPage = () => {
  return render(
    <CartProvider>
      <BrowserRouter>
        <CartPage />
      </BrowserRouter>
    </CartProvider>
  );
};

describe('CartPage', () => {
  it('カートが空の場合「カートは空です」が表示される', () => {
    renderCartPage();

    expect(screen.getByText('🛒 カート')).toBeInTheDocument();
    expect(screen.getByText('カートは空です')).toBeInTheDocument();
    expect(screen.getByText('商品一覧を見る')).toBeInTheDocument();
  });

  it('「商品一覧を見る」リンクが正しいURLを持つ', () => {
    renderCartPage();

    const link = screen.getByText('商品一覧を見る');
    expect(link).toHaveAttribute('href', '/products');
  });
});
