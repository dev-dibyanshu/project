import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import KnowledgeBase from './components/KnowledgeBase';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { ChatProvider } from './contexts/ChatContext';

function App() {
  const [currentPage, setCurrentPage] = useState('chat');

  return (
    <ChatProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ChatProvider>
  );
}

export default App;