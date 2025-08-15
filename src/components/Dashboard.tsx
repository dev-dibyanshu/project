import React from 'react';
import { 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

export default function Dashboard() {
  const { state } = useChat();

  const metrics = [
    {
      title: 'Total Conversations',
      value: state.analytics.totalConversations.toString(),
      change: '+12%',
      trend: 'up',
      icon: MessageCircle,
      color: 'blue'
    },
    {
      title: 'Average Satisfaction',
      value: state.analytics.averageSatisfaction.toFixed(1),
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'green'
    },
    {
      title: 'Escalation Rate',
      value: `${(state.analytics.escalationRate * 100).toFixed(1)}%`,
      change: '-2.1%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Resolved Issues',
      value: state.analytics.resolvedCount.toString(),
      change: '+18%',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    }
  ];

  const sentimentData = Object.entries(state.analytics.sentimentDistribution);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Customer support performance overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            red: 'bg-red-500',
            purple: 'bg-purple-500'
          };

          return (
            <div key={metric.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${colorClasses[metric.color]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Distribution</h3>
          <div className="space-y-4">
            {sentimentData.map(([emotion, percentage]) => (
              <div key={emotion} className="flex items-center">
                <span className="w-20 text-sm text-gray-600 capitalize">{emotion}</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm font-medium text-gray-900">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '2 min ago', event: 'Customer satisfaction rating: 5/5', type: 'positive' },
              { time: '5 min ago', event: 'Escalation triggered - High priority case', type: 'warning' },
              { time: '8 min ago', event: 'Knowledge base updated with new article', type: 'info' },
              { time: '12 min ago', event: 'AI response generated successfully', type: 'positive' },
              { time: '15 min ago', event: 'New customer conversation started', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'positive' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.event}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">92%</div>
            <p className="text-sm text-gray-600">Response Accuracy</p>
            <p className="text-xs text-gray-500 mt-1">Based on user feedback</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">1.2s</div>
            <p className="text-sm text-gray-600">Average Response Time</p>
            <p className="text-xs text-gray-500 mt-1">Including retrieval</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">87%</div>
            <p className="text-sm text-gray-600">Issue Resolution Rate</p>
            <p className="text-xs text-gray-500 mt-1">Without escalation</p>
          </div>
        </div>
      </div>
    </div>
  );
}