import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';

// カート内の商品（商品情報 + 数量）
interface CartItem {
  product: Product;
  quantity: number;
}

// Context で共有する値の型
interface CartContextType {
  items: CartItem[];                          // カートの中身
  addToCart: (product: Product) => void;      // カートに追加
  removeFromCart: (productId: string) => void; // カートから削除
  clearCart: () => void;                      // カートを空にする
  totalPrice: number;                         // 合計金額
  totalItems: number;                         // 合計個数
}

// Context を作成（初期値は undefined）
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider コンポーネント（アプリ全体を囲む）
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // カートに追加
  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      // 既にカートにある商品か確認
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // あれば数量を +1
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // なければ新規追加
        return [...currentItems, { product, quantity: 1 }];
      }
    });
  };

  // カートから削除
  const removeFromCart = (productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  };

  // カートを空にする
  const clearCart = () => {
    setItems([]);
  };

  // 合計金額を計算
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 合計個数を計算
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// カスタムフック（Context を簡単に使うため）
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
