// テストセットアップ - 全テスト実行前に MSW を起動
import { beforeAll, afterAll, afterEach } from 'vitest';
import '@testing-library/jest-dom';  // toBeInTheDocument 等のマッチャー追加
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// MSW サーバーを作成
export const server = setupServer(...handlers);

// テスト開始前にサーバー起動
beforeAll(() => server.listen());

// 各テスト後にハンドラーをリセット
afterEach(() => server.resetHandlers());

// 全テスト終了後にサーバー停止
afterAll(() => server.close());
