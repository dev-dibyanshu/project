import React from 'react';
import { TrendingUp, Clock, Users, MessageSquare, Zap, Target } from 'lucide-react';

export default function Analytics() {
  const chartData = {
    dailyConversations: [
      { day: 'Mon', conversations: 45, satisfaction: 4.2 },
      { day: 'Tue', conversations: 52, satisfaction: 4.1 },
      { day: 'Wed', conversations: 38, satisfaction: 4.4 },
      { day: 'Thu', conversations: 61, satisfaction: 4.3 },
      { day: 'Fri', conversations: 55, satisfaction: 4.2 },
      { day: 'Sat', conversations: 28, satisfaction: 4.5 },
      { day: 'Sun', conversations: 22, satisfaction: 4.6 }
    ],
    emotionBreakdown: [
      { emotion: 'Happy', count: 145, percentage: 45, color: 'bg-green-500' },
      { emotion: 'Neutral', count: 96, percentage: 30, color: 'bg-gray-500' },
      { emotion: 'Frustrated', count: 48, percentage: 15, color: 'bg-orange-500' },
      { emotion: 'Angry', count: 32, percentage: 10, color: 'bg-red-500' }
    ],
    escalationTrends: [
      { week: 'Week 1', escalations: 12, resolved: 8 },
      { week: 'Week 2', escalations: 15, resolved: 11 },
      { week: 'Week 3', escalations: 9, resolved: 7 },
      { week: 'Week 4', escalations: 11, resolved: 9 }
    ]
  };

  const performanceMetrics = [
    {
      title: 'Response Time',
      value: '1.2s',
      description: 'Average AI response time',
      icon: Clock,
      trend: '+5% faster this week'
    },
    {
      title: 'Resolution Rate',
      value: '87%',
      description: 'Issues resolved without escalation',
      icon: Target,
      trend: '+2% from last week'
    },
    {
      title: 'Customer Satisfaction',
      value: '4.3/5',
      description: 'Average rating across all interactions',
      icon: Users,
      trend: '+0.1 from last week'
    },
    {
      title: 'Knowledge Base Accuracy',
      value: '92%',
      description: 'Relevant information retrieval rate',
      icon: Zap,
      trend: '+3% improvement'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600">Detailed performance analysis and trends</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                <p className="text-xs text-gray-600">{metric.description}</p>
                <p className="text-xs text-green-600 font-medium">{metric.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Conversations Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Conversation Volume</h3>
          <div className="space-y-4">
            {chartData.dailyConversations.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <span className="w-12 text-sm font-medium text-gray-600">{day.day}</span>
                <div className="flex-1 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(day.conversations / 70) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-gray-900">{day.conversations}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">Sat:</span>
                  <span className="text-xs font-medium text-gray-900">{day.satisfaction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emotion Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Emotion Analysis</h3>
          <div className="space-y-4">
            {chartData.emotionBreakdown.map((emotion) => (
              <div key={emotion.emotion} className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${emotion.color}`}></div>
                <span className="w-20 text-sm font-medium text-gray-900">{emotion.emotion}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`${emotion.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${emotion.percentage}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm text-gray-600">{emotion.count}</span>
                <span className="w-12 text-xs text-gray-500">{emotion.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Escalation Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Escalation Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {chartData.escalationTrends.map((week, index) => (
            <div key={week.week} className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="text-lg font-bold text-gray-900">{week.escalations}</div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{week.resolved}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{week.week}</p>
                <p className="text-xs text-gray-600">{week.escalations} escalations</p>
                <p className="text-xs text-green-600">{week.resolved} resolved</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Model Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
            <p className="text-sm font-medium text-gray-900">Intent Recognition</p>
            <p className="text-xs text-gray-600 mt-1">Accuracy in understanding customer needs</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <p className="text-sm font-medium text-gray-900">Sentiment Accuracy</p>
            <p className="text-xs text-gray-600 mt-1">Correct emotion classification rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">0.95</div>
            <p className="text-sm font-medium text-gray-900">RAGAS Score</p>
            <p className="text-xs text-gray-600 mt-1">Retrieval-augmented generation quality</p>
          </div>
        </div>
      </div>
    </div>
  );
}