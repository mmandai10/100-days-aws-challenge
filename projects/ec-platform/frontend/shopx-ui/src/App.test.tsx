import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App'

// Amplify をモック（Cognito 関連）
vi.mock('aws-amplify/auth', () => ({
  getCurrentUser: vi.fn().mockRejectedValue(new Error('Not authenticated')),
  fetchAuthSession: vi.fn().mockResolvedValue({}),
  signOut: vi.fn().mockResolvedValue(undefined),
}));

// App を描画（AuthProvider と CartProvider で囲む）
const renderApp = () => {
  return render(
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  )
}

describe('App', () => {
  it('ShopXロゴが表示される', async () => {
    renderApp()
    // ShopX はヘッダーとフッター両方にある
    const logos = screen.getAllByText('ShopX')
    expect(logos.length).toBeGreaterThan(0)
  })

  it('ナビゲーションリンクが表示される', async () => {
    renderApp()
    // Products と AI Assistant は複数箇所にあるので getAllBy を使用
    const productLinks = screen.getAllByRole('link', { name: 'Products' })
    expect(productLinks.length).toBeGreaterThan(0)
    
    const aiLinks = screen.getAllByRole('link', { name: 'AI Assistant' })
    expect(aiLinks.length).toBeGreaterThan(0)
  })
})
