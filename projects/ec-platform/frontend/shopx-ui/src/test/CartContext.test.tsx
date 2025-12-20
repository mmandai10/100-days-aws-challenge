// CartContext のテスト
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../context/CartContext';

// テスト用のコンポーネント（CartContext の機能を使う）
const TestComponent = () => {
  const { items, addToCart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  const testProduct = {
    id: 'test-1',
    name: 'テスト商品',
    price: 1000,
    description: 'テスト用',
    category: 'test',
  };

  const testProduct2 = {
    id: 'test-2',
    name: 'テスト商品2',
    price: 2000,
    description: 'テスト用2',
    category: 'test',
  };

  return (
    <div>
      <p data-testid="total-items">個数: {totalItems}</p>
      <p data-testid="total-price">合計: {totalPrice}</p>
      <p data-testid="item-count">カート内: {items.length}種類</p>
      
      <button onClick={() => addToCart(testProduct)}>商品1を追加</button>
      <button onClick={() => addToCart(testProduct2)}>商品2を追加</button>
      <button onClick={() => removeFromCart('test-1')}>商品1を削除</button>
      <button onClick={clearCart}>カートを空にする</button>
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
  it('初期状態ではカートが空', () => {
    renderWithProvider();

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 0');
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 0種類');
  });

  it('addToCart で商品を追加できる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('商品1を追加'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 1000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 1種類');
  });

  it('同じ商品を追加すると数量が増える', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('商品1を追加'));
    await user.click(screen.getByText('商品1を追加'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 2000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 1種類'); // 種類は1
  });

  it('異なる商品を追加すると種類が増える', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('商品1を追加'));
    await user.click(screen.getByText('商品2を追加'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 3000'); // 1000 + 2000
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 2種類');
  });

  it('removeFromCart で商品を削除できる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('商品1を追加'));
    await user.click(screen.getByText('商品2を追加'));
    await user.click(screen.getByText('商品1を削除'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 2000');
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 1種類');
  });

  it('clearCart でカートを空にできる', async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByText('商品1を追加'));
    await user.click(screen.getByText('商品2を追加'));
    await user.click(screen.getByText('カートを空にする'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('個数: 0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('合計: 0');
    expect(screen.getByTestId('item-count')).toHaveTextContent('カート内: 0種類');
  });
});
