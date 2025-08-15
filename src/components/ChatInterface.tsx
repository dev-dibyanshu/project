import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { analyzeSentiment, generateResponse, checkEscalationRisk } from '../services/aiService';
import SentimentIndicator from './SentimentIndicator';
import EscalationAlert from './EscalationAlert';

export default function ChatInterface() {
  const { state, dispatch } = useChat();
  const [input, setInput] = useState('');
  const [showSatisfactionPrompt, setShowSatisfactionPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentConversation = state.conversations.find(
    conv => conv.id === state.currentConversation
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages, state.isTyping]);

  useEffect(() => {
    if (!state.currentConversation) {
      dispatch({ type: 'START_CONVERSATION' });
    }
  }, [state.currentConversation, dispatch]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    // Analyze sentiment
    const sentiment = analyzeSentiment(userMessage);
    
    // Add user message
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        text: userMessage,
        sender: 'user',
        sentiment,
        escalationRisk: checkEscalationRisk(userMessage, sentiment)
      }
    });

    // Show typing indicator
    dispatch({ type: 'SET_TYPING', payload: true });

    // Generate bot response
    setTimeout(async () => {
      const response = await generateResponse(userMessage, sentiment, currentConversation?.messages || []);
      
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          text: response.text,
          sender: 'bot',
          retrievedDocs: response.retrievedDocs
        }
      });

      dispatch({ type: 'SET_TYPING', payload: false });

      // Check for escalation
      if (sentiment.emotion === 'angry' && sentiment.confidence > 0.8) {
        setTimeout(() => {
          dispatch({ type: 'ESCALATE_CONVERSATION' });
        }, 1000);
      }
    }, 1500);
  };

  const handleSatisfactionRating = (rating: number) => {
    dispatch({ 
      type: 'END_CONVERSATION', 
      payload: { satisfactionRating: rating } 
    });
    setShowSatisfactionPrompt(false);
    // Start new conversation
    dispatch({ type: 'START_CONVERSATION' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Customer Support Chat</h2>
            <p className="text-sm text-gray-600">AI-powered support with sentiment analysis</p>
          </div>
          {currentConversation?.status === 'escalated' && (
            <EscalationAlert />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentConversation?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900 border border-gray-200'
            }`}>
              <p className="text-sm">{message.text}</p>
              
              {message.sender === 'user' && message.sentiment && (
                <SentimentIndicator sentiment={message.sentiment} />
              )}
              
              {message.retrievedDocs && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Sources: {message.retrievedDocs.join(', ')}
                  </p>
                </div>
              )}
              
              <p className="text-xs mt-1 opacity-75">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {state.isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 border border-gray-200">
              <div className="flex items-center space-x-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-600">AI is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Satisfaction Prompt */}
      {showSatisfactionPrompt && (
        <div className="border-t border-gray-200 p-4 bg-blue-50">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 mb-3">
              How satisfied were you with this conversation?
            </p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleSatisfactionRating(rating)}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  {rating} ⭐
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={() => setShowSatisfactionPrompt(true)}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            End conversation & rate experience
          </button>
          
          <div className="flex space-x-4 text-xs text-gray-500">
            <span>Real-time sentiment analysis enabled</span>
            <span>•</span>
            <span>Escalation detection active</span>
          </div>
        </div>
      </div>
    </div>
  );
}