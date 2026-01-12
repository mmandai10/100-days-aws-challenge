import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCurrentUser, signOut, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

type User = {
  username: string;
  userId: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // 認証状態をチェック
  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setUser({
        username: currentUser.username,
        userId: currentUser.userId,
        email: attributes.email || '',
      });

      // グループ情報を取得（IDトークンから）
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken;
      if (idToken) {
        const payload = idToken.payload;
        const groups = payload['cognito:groups'] as string[] | undefined;
        setIsAdmin(groups?.includes('admin') ?? false);
      }
    } catch {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ログアウト
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAdmin(false);
    } catch (err) {
      console.error('ログアウトエラー:', err);
    }
  };

  // 初回マウント時に認証状態をチェック
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
