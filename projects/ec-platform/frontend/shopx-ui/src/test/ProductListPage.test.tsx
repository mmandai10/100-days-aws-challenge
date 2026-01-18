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
  it('タイトルが表示される', async () => {
    renderWithRouter();
    expect(await screen.findByText('Products')).toBeInTheDocument();
  });

  it('商品一覧が表示される', async () => {
    renderWithRouter();

    // API からデータが返ってくるまで待つ
    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
  });

  it('検索フォームが表示される', async () => {
    renderWithRouter();

    // 検索フォームの要素を確認
    expect(await screen.findByPlaceholderText('Search products...')).toBeInTheDocument();
    // ボタンを探す（label と button 両方に "Search" があるので role で限定）
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });

  it('カテゴリドロップダウンが表示される', async () => {
    renderWithRouter();

    // カテゴリが読み込まれるまで待つ（findByRole は非同期で待機する）
    expect(await screen.findByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'Electronics' })).toBeInTheDocument();
  });

  it('Electronicsを選択するとElectronics商品のみ表示される', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // 商品が表示されるまで待つ
    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();

    // Electronics を選択
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'electronics');

    // Search ボタンをクリック（role で限定）
    await user.click(screen.getByRole('button', { name: 'Search' }));

    // Electronics の商品が表示される
    await waitFor(() => {
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    });

    // Fashion の商品は表示されない
    expect(screen.queryByText('T-Shirt')).not.toBeInTheDocument();
  });
});
