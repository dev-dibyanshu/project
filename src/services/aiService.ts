import { Message } from '../contexts/ChatContext';

// Mock knowledge base data
const knowledgeBase = [
  {
    id: '1',
    title: 'Password Reset Process',
    content: 'To reset your password: 1) Go to login page 2) Click "Forgot Password" 3) Enter your email 4) Check your inbox for reset link 5) Follow the instructions in the email',
    tags: ['password', 'reset', 'login', 'security'],
    category: 'Account Management'
  },
  {
    id: '2',
    title: 'Billing and Payment Issues',
    content: 'For billing concerns: Check your payment method is valid, ensure sufficient funds, contact billing support if charges appear incorrect. We process payments monthly on your signup date.',
    tags: ['billing', 'payment', 'charges', 'subscription'],
    category: 'Billing'
  },
  {
    id: '3',
    title: 'Technical Support Guidelines',
    content: 'Common troubleshooting: Clear browser cache, check internet connection, try different browser, restart your device. For persistent issues, contact our technical support team.',
    tags: ['troubleshooting', 'technical', 'browser', 'connection'],
    category: 'Technical Support'
  },
  {
    id: '4',
    title: 'Account Security Best Practices',
    content: 'Secure your account by: Using strong passwords, enabling two-factor authentication, not sharing login credentials, logging out from shared devices, reviewing account activity regularly.',
    tags: ['security', 'account', '2fa', 'best practices'],
    category: 'Security'
  }
];

// Sentiment analysis function
export function analyzeSentiment(text: string): {
  emotion: string;
  confidence: number;
  polarity: 'positive' | 'negative' | 'neutral';
} {
  const lowerText = text.toLowerCase();
  
  // Keywords for different emotions
  const emotionKeywords = {
    angry: ['angry', 'furious', 'mad', 'hate', 'terrible', 'awful', 'worst', 'disgusted', 'outraged'],
    frustrated: ['frustrated', 'annoying', 'annoyed', 'irritated', 'disappointed', 'upset', 'bothered'],
    confused: ['confused', 'unclear', 'don\'t understand', 'help me', 'not sure', 'what does', 'explain'],
    happy: ['great', 'excellent', 'amazing', 'love', 'perfect', 'wonderful', 'fantastic', 'happy'],
    neutral: ['okay', 'fine', 'alright', 'sure', 'yes', 'no', 'maybe']
  };

  let detectedEmotion = 'neutral';
  let highestScore = 0;

  // Calculate emotion scores
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    const matches = keywords.filter(keyword => lowerText.includes(keyword));
    const score = matches.length / keywords.length;
    
    if (score > highestScore) {
      highestScore = score;
      detectedEmotion = emotion;
    }
  });

  // Determine confidence based on keyword matches and text length
  const confidence = Math.min(0.95, Math.max(0.3, highestScore + (text.length > 50 ? 0.1 : 0) + 0.2));
  
  // Determine polarity
  let polarity: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (['angry', 'frustrated'].includes(detectedEmotion)) {
    polarity = 'negative';
  } else if (detectedEmotion === 'happy') {
    polarity = 'positive';
  }

  return {
    emotion: detectedEmotion,
    confidence,
    polarity
  };
}

// Escalation risk assessment
export function checkEscalationRisk(text: string, sentiment: any): number {
  const escalationKeywords = [
    'cancel', 'refund', 'lawyer', 'sue', 'complaint', 'manager', 
    'supervisor', 'escalate', 'unacceptable', 'ridiculous'
  ];
  
  const lowerText = text.toLowerCase();
  const keywordMatches = escalationKeywords.filter(keyword => lowerText.includes(keyword)).length;
  
  let riskScore = keywordMatches * 0.2;
  
  // Add risk based on sentiment
  if (sentiment.emotion === 'angry' && sentiment.confidence > 0.7) {
    riskScore += 0.4;
  } else if (sentiment.emotion === 'frustrated' && sentiment.confidence > 0.6) {
    riskScore += 0.2;
  }
  
  // Text length factor (longer complaints often indicate higher frustration)
  if (text.length > 200) {
    riskScore += 0.1;
  }
  
  return Math.min(1.0, riskScore);
}

// Knowledge base retrieval
function retrieveRelevantDocuments(query: string, limit: number = 3): string[] {
  const lowerQuery = query.toLowerCase();
  const scores = knowledgeBase.map(doc => {
    let score = 0;
    
    // Check title relevance
    if (doc.title.toLowerCase().includes(lowerQuery)) score += 2;
    
    // Check content relevance
    const queryWords = lowerQuery.split(' ');
    queryWords.forEach(word => {
      if (word.length > 3 && doc.content.toLowerCase().includes(word)) {
        score += 1;
      }
    });
    
    // Check tag relevance
    doc.tags.forEach(tag => {
      if (lowerQuery.includes(tag)) score += 1.5;
    });
    
    return { ...doc, score };
  });
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter(doc => doc.score > 0)
    .map(doc => doc.title);
}

// Response generation with empathy adjustment
export async function generateResponse(
  userMessage: string, 
  sentiment: any, 
  conversationHistory: Message[]
): Promise<{ text: string; retrievedDocs: string[] }> {
  
  const retrievedDocs = retrieveRelevantDocuments(userMessage);
  
  // Get context from knowledge base
  const relevantInfo = knowledgeBase
    .filter(doc => retrievedDocs.includes(doc.title))
    .map(doc => doc.content)
    .join(' ');
  
  // Generate empathetic response based on sentiment
  let responseText = '';
  let empathyPrefix = '';
  
  // Adjust tone based on sentiment
  switch (sentiment.emotion) {
    case 'angry':
      empathyPrefix = "I understand your frustration, and I sincerely apologize for the inconvenience. Let me help resolve this immediately. ";
      break;
    case 'frustrated':
      empathyPrefix = "I can see this has been frustrating for you. Let me do my best to help you get this sorted out quickly. ";
      break;
    case 'confused':
      empathyPrefix = "I'd be happy to clarify this for you. Let me break this down step by step. ";
      break;
    case 'happy':
      empathyPrefix = "I'm glad to help! ";
      break;
    default:
      empathyPrefix = "Thank you for reaching out. I'm here to help. ";
  }
  
  // Generate response based on query type
  if (userMessage.toLowerCase().includes('password') || userMessage.toLowerCase().includes('login')) {
    responseText = empathyPrefix + "For password issues: You can reset your password by going to the login page and clicking 'Forgot Password'. Enter your email address, and you'll receive a secure reset link. If you don't see the email within a few minutes, please check your spam folder. The link will be valid for 24 hours for security purposes.";
  } else if (userMessage.toLowerCase().includes('billing') || userMessage.toLowerCase().includes('payment') || userMessage.toLowerCase().includes('charge')) {
    responseText = empathyPrefix + "Regarding billing: I can help you with payment concerns. Please check that your payment method is current and has sufficient funds. Payments are processed monthly on your signup anniversary date. If you see unexpected charges, I can review your account details. Would you like me to look into any specific billing questions?";
  } else if (userMessage.toLowerCase().includes('technical') || userMessage.toLowerCase().includes('not working') || userMessage.toLowerCase().includes('error')) {
    responseText = empathyPrefix + "For technical issues: Let's troubleshoot this together. First, try clearing your browser cache and cookies, then restart your browser. If that doesn't help, try using a different browser or device. Also, ensure your internet connection is stable. If the problem persists, I can escalate this to our technical team for further investigation.";
  } else if (userMessage.toLowerCase().includes('cancel') || userMessage.toLowerCase().includes('refund')) {
    responseText = empathyPrefix + "I understand you're considering changes to your account. I'd love the opportunity to address any concerns first. Could you tell me more about what's not meeting your expectations? We have various options available, and I want to make sure we find the best solution for your needs.";
  } else {
    // General response with retrieved information
    if (relevantInfo) {
      responseText = empathyPrefix + `Based on your question, here's what I can help with: ${relevantInfo.substring(0, 300)}... Is there a specific aspect you'd like me to explain further?`;
    } else {
      responseText = empathyPrefix + "I want to make sure I provide you with the most helpful information. Could you provide a bit more detail about what you're looking for? This will help me give you a more targeted response.";
    }
  }
  
  // Add follow-up based on escalation risk
  const escalationRisk = checkEscalationRisk(userMessage, sentiment);
  if (escalationRisk > 0.6) {
    responseText += "\n\nI want to ensure you have the best possible experience. If you'd prefer to speak with a human agent, I can arrange that for you right away.";
  }
  
  return {
    text: responseText,
    retrievedDocs
  };
}