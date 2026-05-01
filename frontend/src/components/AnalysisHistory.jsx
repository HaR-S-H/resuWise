import React, { useState, useEffect } from 'react';
import {
  getAnalysisHistory,
  deleteAnalysisFromHistory,
  clearAllHistory,
  exportHistoryAsJSON
} from '../utils/storageManager';

export default function AnalysisHistory({ onSelectAnalysis, currentAnalysisId }) {
  const [history, setHistory] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const data = getAnalysisHistory();
    setHistory(data);
  };

  const handleDelete = (id) => {
    deleteAnalysisFromHistory(id);
    loadHistory();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all analysis history? This cannot be undone.')) {
      clearAllHistory();
      setHistory([]);
      setShowConfirm(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-[#050505] shadow-2xl overflow-y-auto z-40 border-r border-white/6">
      {/* Header */}
      <div className="sticky top-0 bg-[#080808] border-b border-white/6 p-4">
        <h3 className="text-sm font-bold text-white">📋 Analysis History</h3>
        <p className="text-xs text-gray-600 mt-0.5">Your recent analyses</p>
      </div>

      <div className="p-3 space-y-2">
        {history.length > 0 ? (
          <>
            {history.map((analysis) => (
              <div
                key={analysis.id}
                onClick={() => onSelectAnalysis(analysis.fullResults)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  currentAnalysisId === analysis.id
                    ? 'bg-blue-600/10 border-blue-600/40 shadow-md shadow-blue-600/10'
                    : 'bg-[#0a0a0a] border-white/5 hover:border-blue-600/20 hover:bg-[#0d0d0d]'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-[11px] text-gray-600">{analysis.dateForDisplay}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(analysis.id); }}
                    className="text-gray-700 hover:text-red-400 transition-colors text-xs"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Match</span>
                    <span className={`text-xs font-bold ${getScoreColor(analysis.matchPercentage)}`}>
                      {analysis.matchPercentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">ATS</span>
                    <span className={`text-xs font-bold ${getScoreColor(analysis.atsScore)}`}>
                      {analysis.atsScore}%
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-gray-600 truncate">{analysis.resumePreview}</div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-white/5 space-y-2 mt-2">
              <button
                onClick={() => exportHistoryAsJSON()}
                className="w-full px-3 py-2 bg-green-500/8 text-green-500 hover:bg-green-500/15 border border-green-500/20 rounded-lg transition-all text-xs font-semibold"
              >
                📥 Export as JSON
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full px-3 py-2 bg-red-500/8 text-red-400 hover:bg-red-500/15 border border-red-500/20 rounded-lg transition-all text-xs font-semibold"
              >
                🗑️ Clear History
              </button>
            </div>

            {showConfirm && (
              <div className="mt-2 p-3 bg-[#0f0808] border border-red-500/25 rounded-xl">
                <p className="text-xs text-red-400 mb-2">Delete all history?</p>
                <div className="flex gap-2">
                  <button onClick={handleClearAll} className="flex-1 px-2 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition">Yes</button>
                  <button onClick={() => setShowConfirm(false)} className="flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg transition">No</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-sm">No analyses yet</p>
            <p className="text-gray-700 text-xs mt-1">Your analyses will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
