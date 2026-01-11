
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ElectionAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As an election information assistant, answer this briefly: ${query}`,
        config: {
            systemInstruction: "You are a helpful election assistant. Provide factual and neutral information about democratic voting processes and the importance of participation. Keep answers under 100 words."
        }
      });
      setResponse(res.text || 'No response found.');
    } catch (err) {
      setResponse('Unable to connect to Election HQ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 mt-12 max-w-2xl mx-auto border border-blue-500/20 shadow-2xl">
      <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
        <span className="animate-pulse">🤖</span> AI Election Assistant
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about democratic voting..."
          className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-2 rounded-xl font-semibold transition-colors"
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      {response && (
        <div className="bg-white/5 rounded-xl p-4 text-slate-300 text-sm italic border-l-4 border-blue-500">
          {response}
        </div>
      )}
    </div>
  );
};

export default ElectionAssistant;
