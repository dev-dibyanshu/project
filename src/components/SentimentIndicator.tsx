import React from 'react';
import { Smile, Meh, Frown, AlertTriangle } from 'lucide-react';

interface SentimentIndicatorProps {
  sentiment: {
    emotion: string;
    confidence: number;
    polarity: 'positive' | 'negative' | 'neutral';
  };
}

export default function SentimentIndicator({ sentiment }: SentimentIndicatorProps) {
  const getEmotionIcon = () => {
    switch (sentiment.emotion) {
      case 'happy':
      case 'satisfied':
        return <Smile className="w-3 h-3 text-green-500" />;
      case 'neutral':
      case 'confused':
        return <Meh className="w-3 h-3 text-yellow-500" />;
      case 'frustrated':
        return <Frown className="w-3 h-3 text-orange-500" />;
      case 'angry':
        return <AlertTriangle className="w-3 h-3 text-red-500" />;
      default:
        return <Meh className="w-3 h-3 text-gray-500" />;
    }
  };

  const getConfidenceColor = () => {
    if (sentiment.confidence > 0.8) return 'text-green-400';
    if (sentiment.confidence > 0.6) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-blue-500 border-opacity-30">
      <div className="flex items-center space-x-1">
        {getEmotionIcon()}
        <span className="text-xs text-blue-200 capitalize">
          {sentiment.emotion}
        </span>
      </div>
      <span className={`text-xs ${getConfidenceColor()}`}>
        {Math.round(sentiment.confidence * 100)}%
      </span>
    </div>
  );
}