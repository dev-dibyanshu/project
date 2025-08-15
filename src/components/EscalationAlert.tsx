import React from 'react';
import { AlertTriangle, Phone } from 'lucide-react';

export default function EscalationAlert() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <div>
          <h4 className="text-sm font-medium text-red-800">Escalation Triggered</h4>
          <p className="text-xs text-red-700">High frustration detected. Human agent notified.</p>
        </div>
      </div>
      <button className="mt-2 flex items-center space-x-1 text-xs text-red-700 hover:text-red-800 transition-colors">
        <Phone className="w-3 h-3" />
        <span>Connect to agent</span>
      </button>
    </div>
  );
}