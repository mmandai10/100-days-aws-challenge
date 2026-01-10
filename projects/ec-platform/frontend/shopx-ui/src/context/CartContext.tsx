import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import { useAuth } from './AuthContext';
import { fetchCart, updateCart } from '../api/cart';
import { fetchProductById } from '../api/products';

// カート内の商品（商品情報 + 数量）
interface CartItem {
  product: Product;
  quantity: number;
}

// Context で共有する値の型
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // API にカートを保存（ログイン済みの場合）
  const saveCartToApi = useCallback(async (cartItems: CartItem[]) => {
    if (!isAuthenticated) return;
    
    try {
      const apiItems = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      await updateCart(apiItems);
    } catch (error) {
      console.error('カート保存エラー:', error);
    }
  }, [isAuthenticated]);

  // API からカートを読み込み（ログイン済みの場合）
  const loadCartFromApi = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const apiCart = await fetchCart();
      
      // 商品情報を取得してマージ
      const cartItems: CartItem[] = [];
      for (const item of apiCart) {
        const product = await fetchProductById(item.productId);
        if (product) {
          cartItems.push({ product, quantity: item.quantity });
        }
      }
      
      setItems(cartItems);
    } catch (error) {
      console.error('カート読み込みエラー:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // ログイン状態が変わったらカートを読み込む
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      loadCartFromApi();
    }
    if (!authLoading && !isAuthenticated) {
      setItems([]);  // ログアウト時はカートをクリア
    }
  }, [isAuthenticated, authLoading, loadCartFromApi]);

  // カートに追加
  const addToCart = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...currentItems, { product, quantity: 1 }];
      }

      // ログイン済みなら API に保存
      saveCartToApi(newItems);
      
      return newItems;
    });
  };

  // カートから削除
  const removeFromCart = (productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.product.id !== productId);
      saveCartToApi(newItems);
      return newItems;
    });
  };

  // カートを空にする
  const clearCart = () => {
    setItems([]);
    saveCartToApi([]);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
