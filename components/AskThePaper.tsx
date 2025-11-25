import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PAPER_CONTENT } from '../constants.ts';

const AskThePaper: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm your AI research assistant for this paper. Ask me anything about the RIFE fine-tuning process, the dataset, or the results!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion('');
    setHistory(prev => [...prev, { role: 'user', text: currentQuestion }]);
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         throw new Error("API Key not found");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an expert research assistant answering questions about the following academic paper:
        ---
        ${PAPER_CONTENT}
        ---
        Answer the user's question concisely based ONLY on the provided paper content. If the answer is not in the paper, say "The paper does not provide information on this."
        User Question: ${currentQuestion}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const answer = response.text || "I couldn't generate a response.";
      
      setHistory(prev => [...prev, { role: 'model', text: answer }]);

    } catch (error) {
      console.error("Gemini Error:", error);
      setHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the AI. Please check the API Key configuration." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl flex flex-col h-[600px]">
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 flex items-center gap-3">
        <Sparkles className="text-brand-orange" />
        <h3 className="font-bold text-white">Ask the Paper (AI Assistant)</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
        {history.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-brand-orange'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-blue-600/20 text-blue-100 rounded-tr-none border border-blue-500/30' 
                : 'bg-gray-800/80 text-gray-200 rounded-tl-none border border-gray-700'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                    <Bot size={16} />
                </div>
                <div className="bg-gray-800/80 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2">
                    <Loader2 className="animate-spin text-gray-400" size={16} />
                    <span className="text-sm text-gray-400">Thinking...</span>
                </div>
            </div>
        )}
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-gray-800 text-white pl-4 pr-12 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-500"
            placeholder="E.g., What dataset was used for training?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={handleAsk}
            disabled={isLoading || !question.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-orange hover:bg-orange-600 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskThePaper;