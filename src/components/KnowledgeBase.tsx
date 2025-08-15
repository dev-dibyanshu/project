import React, { useState } from 'react';
import { Search, BookOpen, Plus, Edit, Trash2, Tag } from 'lucide-react';

const knowledgeArticles = [
  {
    id: '1',
    title: 'How to Reset Your Password',
    category: 'Account Management',
    content: 'To reset your password, click on "Forgot Password" on the login page...',
    tags: ['password', 'account', 'security'],
    lastUpdated: '2024-01-15',
    views: 1250
  },
  {
    id: '2',
    title: 'Understanding Billing Cycles',
    category: 'Billing',
    content: 'Billing cycles are monthly periods that determine when you are charged...',
    tags: ['billing', 'payment', 'subscription'],
    lastUpdated: '2024-01-12',
    views: 890
  },
  {
    id: '3',
    title: 'Setting Up Two-Factor Authentication',
    category: 'Security',
    content: 'Two-factor authentication adds an extra layer of security to your account...',
    tags: ['security', '2fa', 'authentication'],
    lastUpdated: '2024-01-10',
    views: 670
  },
  {
    id: '4',
    title: 'Troubleshooting Connection Issues',
    category: 'Technical Support',
    content: 'If you are experiencing connection issues, try the following steps...',
    tags: ['connection', 'troubleshooting', 'network'],
    lastUpdated: '2024-01-08',
    views: 1150
  }
];

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['All', 'Account Management', 'Billing', 'Security', 'Technical Support'];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600">Manage support articles and documentation</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
              <div className="flex space-x-1">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Updated {article.lastUpdated}</span>
              <span>{article.views} views</span>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new article.</p>
        </div>
      )}

      {/* Add Article Modal (simplified) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Article</h3>
            <p className="text-gray-600 mb-4">Article creation functionality would be implemented here.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Create Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}