import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: {
    emotion: string;
    confidence: number;
    polarity: 'positive' | 'negative' | 'neutral';
  };
  escalationRisk?: number;
  retrievedDocs?: string[];
  satisfactionRating?: number;
}

export interface Conversation {
  id: string;
  messages: Message[];
  startTime: Date;
  status: 'active' | 'resolved' | 'escalated';
  customerSatisfaction?: number;
  escalationTriggered?: boolean;
}

interface ChatState {
  conversations: Conversation[];
  currentConversation: string | null;
  isTyping: boolean;
  analytics: {
    totalConversations: number;
    averageSatisfaction: number;
    escalationRate: number;
    resolvedCount: number;
    sentimentDistribution: Record<string, number>;
  };
}

type ChatAction = 
  | { type: 'START_CONVERSATION' }
  | { type: 'ADD_MESSAGE'; payload: Omit<Message, 'id' | 'timestamp'> }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'END_CONVERSATION'; payload: { satisfactionRating?: number } }
  | { type: 'ESCALATE_CONVERSATION' }
  | { type: 'UPDATE_ANALYTICS' };

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  isTyping: false,
  analytics: {
    totalConversations: 0,
    averageSatisfaction: 4.2,
    escalationRate: 0.08,
    resolvedCount: 0,
    sentimentDistribution: {
      happy: 45,
      neutral: 30,
      frustrated: 15,
      angry: 10
    }
  }
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'START_CONVERSATION': {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        messages: [],
        startTime: new Date(),
        status: 'active'
      };
      return {
        ...state,
        conversations: [...state.conversations, newConversation],
        currentConversation: newConversation.id
      };
    }

    case 'ADD_MESSAGE': {
      if (!state.currentConversation) return state;
      
      const newMessage: Message = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      };

      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === state.currentConversation
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        )
      };
    }

    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };

    case 'END_CONVERSATION': {
      if (!state.currentConversation) return state;
      
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === state.currentConversation
            ? {
                ...conv,
                status: 'resolved' as const,
                customerSatisfaction: action.payload.satisfactionRating
              }
            : conv
        ),
        analytics: {
          ...state.analytics,
          resolvedCount: state.analytics.resolvedCount + 1,
          totalConversations: state.analytics.totalConversations + 1
        }
      };
    }

    case 'ESCALATE_CONVERSATION': {
      if (!state.currentConversation) return state;
      
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === state.currentConversation
            ? { ...conv, status: 'escalated' as const, escalationTriggered: true }
            : conv
        )
      };
    }

    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}