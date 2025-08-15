import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Brain, MessageSquare, Bell } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    // AI Settings
    responseModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 512,
    enableContextMemory: true,
    
    // Sentiment Analysis
    sentimentThreshold: 0.6,
    escalationThreshold: 0.8,
    emotionCategories: ['happy', 'neutral', 'frustrated', 'angry', 'confused'],
    
    // Knowledge Base
    chunkSize: 512,
    chunkOverlap: 50,
    embeddingModel: 'text-embedding-ada-002',
    vectorStore: 'chroma',
    
    // Notifications
    emailAlerts: true,
    escalationNotifications: true,
    dailyReports: true,
    webhookUrl: ''
  });

  const handleSave = () => {
    // Save settings logic would go here
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    // Reset to defaults
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset logic would go here
      alert('Settings reset to defaults');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure AI models, sentiment analysis, and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Model Configuration</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Model
              </label>
              <select
                value={settings.responseModel}
                onChange={(e) => setSettings({...settings, responseModel: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature: {settings.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Tokens
              </label>
              <input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contextMemory"
                checked={settings.enableContextMemory}
                onChange={(e) => setSettings({...settings, enableContextMemory: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="contextMemory" className="text-sm text-gray-700">
                Enable conversation context memory
              </label>
            </div>
          </div>
        </div>

        {/* Sentiment Analysis Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sentiment Detection Threshold: {settings.sentimentThreshold}
              </label>
              <input
                type="range"
                min="0.3"
                max="0.9"
                step="0.1"
                value={settings.sentimentThreshold}
                onChange={(e) => setSettings({...settings, sentimentThreshold: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escalation Threshold: {settings.escalationThreshold}
              </label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={settings.escalationThreshold}
                onChange={(e) => setSettings({...settings, escalationThreshold: parseFloat(e.target.value)})}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emotion Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {['happy', 'neutral', 'frustrated', 'angry', 'confused', 'excited', 'worried'].map(emotion => (
                  <label key={emotion} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.emotionCategories.includes(emotion)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSettings({
                            ...settings,
                            emotionCategories: [...settings.emotionCategories, emotion]
                          });
                        } else {
                          setSettings({
                            ...settings,
                            emotionCategories: settings.emotionCategories.filter(e => e !== emotion)
                          });
                        }
                      }}
                      className="mr-1"
                    />
                    <span className="text-sm text-gray-700 capitalize">{emotion}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Base Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chunk Size
              </label>
              <input
                type="number"
                value={settings.chunkSize}
                onChange={(e) => setSettings({...settings, chunkSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chunk Overlap
              </label>
              <input
                type="number"
                value={settings.chunkOverlap}
                onChange={(e) => setSettings({...settings, chunkOverlap: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Embedding Model
              </label>
              <select
                value={settings.embeddingModel}
                onChange={(e) => setSettings({...settings, embeddingModel: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text-embedding-ada-002">OpenAI Ada-002</option>
                <option value="sentence-transformers">HuggingFace Sentence Transformers</option>
                <option value="all-MiniLM-L6-v2">MiniLM-L6-v2</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vector Store
              </label>
              <select
                value={settings.vectorStore}
                onChange={(e) => setSettings({...settings, vectorStore: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="chroma">Chroma</option>
                <option value="pinecone">Pinecone</option>
                <option value="weaviate">Weaviate</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailAlerts"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="emailAlerts" className="text-sm text-gray-700">
                Email alerts for escalations
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="escalationNotifications"
                checked={settings.escalationNotifications}
                onChange={(e) => setSettings({...settings, escalationNotifications: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="escalationNotifications" className="text-sm text-gray-700">
                Real-time escalation notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dailyReports"
                checked={settings.dailyReports}
                onChange={(e) => setSettings({...settings, dailyReports: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="dailyReports" className="text-sm text-gray-700">
                Daily performance reports
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL (optional)
              </label>
              <input
                type="url"
                value={settings.webhookUrl}
                onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
                placeholder="https://your-webhook-url.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset to Defaults</span>
        </button>
        
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
}