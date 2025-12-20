// ProductListPage のテスト
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProductListPage from '../pages/ProductListPage';

// React Router が必要なので BrowserRouter で囲む
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <ProductListPage />
    </BrowserRouter>
  );
};

describe('ProductListPage', () => {
  it('商品一覧が表示される', async () => {
    renderWithRouter();

    // API からデータが返ってくるまで待つ（findBy = getBy + waitFor）
    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('MacBook')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
  });

  it('カテゴリドロップダウンが表示される', async () => {
    renderWithRouter();

    // カテゴリが読み込まれるまで待つ
    expect(await screen.findByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'すべて' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Clothing' })).toBeInTheDocument();
  });

  it('Electronicsを選択するとElectronics商品のみ表示される', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // 商品が表示されるまで待つ
    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();

    // Electronics を選択
    const select = screen.getByLabelText('カテゴリ:');
    await user.selectOptions(select, 'electronics');

    // Electronics の商品が表示される
    await waitFor(() => {
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('MacBook')).toBeInTheDocument();
    });

    // Clothing の商品は表示されない
    expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
  });

  it('Clothingを選択するとClothing商品のみ表示される', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // 商品が表示されるまで待つ
    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();

    // Clothing を選択
    const select = screen.getByLabelText('カテゴリ:');
    await user.selectOptions(select, 'clothing');

    // Clothing の商品が表示される
    expect(await screen.findByText('T-Shirt')).toBeInTheDocument();

    // Electronics の商品は表示されない
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    expect(screen.queryByText('MacBook')).not.toBeInTheDocument();
  });
});
