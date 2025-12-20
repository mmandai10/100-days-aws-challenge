import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider } from './context/CartContext'
import App from './App'

// App は CartProvider だけで囲む（BrowserRouter は App 内にある）
const renderApp = () => {
  return render(
    <CartProvider>
      <App />
    </CartProvider>
  )
}

describe('App', () => {
  it('ShopXが表示される', async () => {
    renderApp()
    expect(screen.getByText('ホーム')).toBeInTheDocument()
    expect(screen.getByText('商品一覧')).toBeInTheDocument()
  })
})
