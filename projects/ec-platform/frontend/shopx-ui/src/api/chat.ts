// AI チャット API クライアント

const API_BASE_URL = 'https://6tw3k46gmk.execute-api.ap-northeast-1.amazonaws.com/Prod';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  history: ChatMessage[];
}

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[] = []
): Promise<ChatResponse> => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export type { ChatMessage, ChatResponse };
