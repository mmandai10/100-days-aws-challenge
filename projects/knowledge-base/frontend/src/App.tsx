import { useState, useRef, useEffect } from 'react'
import './App.css'

// メッセージの型定義
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: string[]
  timestamp: Date
}

// API エンドポイント（後で Lambda に置き換え）
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || ''

// デモモード（API がない場合はモックを使用）
const DEMO_MODE = !API_ENDPOINT

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // デモ用のモック回答
  const getMockResponse = async (question: string): Promise<{ answer: string; sources: string[] }> => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // 疑似遅延
    
    const responses: Record<string, { answer: string; sources: string[] }> = {
      'lambda': {
        answer: `Lambda タイムアウトエラーの対処法：

1. タイムアウト設定を増やす
   - Terraform: timeout = 30
   - コンソール: 設定タブから変更

2. コードの最適化
   - 外部 API 呼び出しを非同期化
   - 不要な処理を削除

3. デバッグ方法
   - CloudWatch Logs でエラー確認
   - sam local invoke でローカルテスト`,
        sources: ['lambda-troubleshooting.md']
      },
      'dynamodb': {
        answer: `DynamoDB Single Table Design のポイント：

1. PK/SK の設計
   - PK: エンティティタイプ#ID
   - SK: 関連データのソート

2. GSI の活用
   - 逆引き検索用に GSI を作成
   - Sparse Index でコスト削減

3. アクセスパターン優先
   - クエリパターンを先に決める
   - 正規化より非正規化を優先`,
        sources: ['dynamodb-patterns.md']
      },
      'terraform': {
        answer: `Terraform 基本コマンド：

- terraform init: 初期化
- terraform plan: 変更内容の確認
- terraform apply: 変更の適用
- terraform destroy: リソースの削除

ベストプラクティス：
- .tfstate は S3 + DynamoDB でリモート管理
- 環境ごとに workspace を分ける`,
        sources: ['terraform-basics.md']
      }
    }

    // キーワードマッチング
    const lowerQ = question.toLowerCase()
    if (lowerQ.includes('lambda') || lowerQ.includes('タイムアウト')) {
      return responses['lambda']
    }
    if (lowerQ.includes('dynamodb') || lowerQ.includes('single table')) {
      return responses['dynamodb']
    }
    if (lowerQ.includes('terraform')) {
      return responses['terraform']
    }

    return {
      answer: `「${question}」についての情報は見つかりませんでした。
      
現在登録されているドキュメント：
- Lambda トラブルシューティング
- DynamoDB パターン
- Terraform 基礎
- MCP ガイド

これらに関する質問をお試しください。`,
      sources: []
    }
  }

  // API 呼び出し（本番用）
  const callApi = async (question: string): Promise<{ answer: string; sources: string[] }> => {
    const response = await fetch(`${API_ENDPOINT}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    
    if (!response.ok) {
      throw new Error('API エラーが発生しました')
    }
    
    return response.json()
  }

  // 送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = DEMO_MODE 
        ? await getMockResponse(userMessage.content)
        : await callApi(userMessage.content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'エラーが発生しました。もう一度お試しください。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AI Knowledge Base</h1>
        {DEMO_MODE && <span className="demo-badge">DEMO</span>}
      </header>

      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome">
            <h2>ナレッジベースに質問してください</h2>
            <p className="subtitle">社内ドキュメントを AI が検索し、回答を生成します</p>
            <div className="examples">
              <p>例：</p>
              <button onClick={() => setInput('Lambda でタイムアウトエラーが出たらどうすればいい？')}>
                Lambda でタイムアウトエラーが出たらどうすればいい？
              </button>
              <button onClick={() => setInput('DynamoDB の Single Table Design について教えて')}>
                DynamoDB の Single Table Design について教えて
              </button>
              <button onClick={() => setInput('Terraform の基本コマンドを教えて')}>
                Terraform の基本コマンドを教えて
              </button>
            </div>
          </div>
        ) : (
          <div className="messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.role}`}>
                <div className="message-content">
                  <pre>{message.content}</pre>
                  {message.sources && message.sources.length > 0 && (
                    <div className="sources">
                      <span>出典：</span>
                      {message.sources.map((source, i) => (
                        <span key={i} className="source-tag">{source}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content loading">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <footer className="input-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="質問を入力してください..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            送信
          </button>
        </form>
      </footer>
    </div>
  )
}

export default App
