import { useState, useRef, useEffect } from 'react';
import { sendChatMessage, type ChatMessage } from '../api/chat';

export const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // ユーザーメッセージを追加
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await sendChatMessage(userMessage, messages);
      setMessages(response.history);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'エラーが発生しました。もう一度お試しください。' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // クイックアクション
  const quickActions = [
    '5000円以下のおすすめ商品は？',
    '電子機器でおすすめは？',
    'プレゼントにいい商品は？',
    'カテゴリ一覧を教えて',
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🤖 AIアシスタント</h1>
      <p style={styles.subtitle}>商品のおすすめや検索をお手伝いします</p>

      {/* チャットエリア */}
      <div style={styles.chatArea}>
        {messages.length === 0 ? (
          <div style={styles.welcome}>
            <p>こんにちは！ShopXのAIアシスタントです。</p>
            <p>商品に関するご質問をどうぞ！</p>
            <div style={styles.quickActions}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  style={styles.quickButton}
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage),
              }}
            >
              <div style={styles.messageRole}>
                {msg.role === 'user' ? '👤 あなた' : '🤖 アシスタント'}
              </div>
              <div
                style={styles.messageContent}
                dangerouslySetInnerHTML={{
                  __html: msg.content
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/## (.*?)(<br>|$)/g, '<h3 style="margin: 10px 0 5px;">$1</h3>'),
                }}
              />
            </div>
          ))
        )}
        {isLoading && (
          <div style={{ ...styles.message, ...styles.assistantMessage }}>
            <div style={styles.messageRole}>🤖 アシスタント</div>
            <div style={styles.loading}>考え中...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <form onSubmit={handleSubmit} style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力..."
          style={styles.input}
          disabled={isLoading}
        />
        <button type="submit" style={styles.sendButton} disabled={isLoading || !input.trim()}>
          送信
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    height: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: '0 0 5px 0',
    color: '#333',
  },
  subtitle: {
    margin: '0 0 20px 0',
    color: '#666',
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    marginBottom: '15px',
  },
  welcome: {
    textAlign: 'center',
    color: '#666',
    padding: '40px 20px',
  },
  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  quickButton: {
    padding: '8px 16px',
    backgroundColor: '#e3f2fd',
    border: '1px solid #2196f3',
    borderRadius: '20px',
    color: '#1976d2',
    cursor: 'pointer',
    fontSize: '14px',
  },
  message: {
    marginBottom: '15px',
    padding: '12px',
    borderRadius: '8px',
  },
  userMessage: {
    backgroundColor: '#e3f2fd',
    marginLeft: '40px',
  },
  assistantMessage: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    marginRight: '40px',
  },
  messageRole: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '5px',
  },
  messageContent: {
    lineHeight: '1.6',
  },
  loading: {
    color: '#666',
    fontStyle: 'italic',
  },
  inputArea: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
  },
  sendButton: {
    padding: '12px 24px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
