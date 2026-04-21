import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, ShieldQuestion } from 'lucide-react';
import { fetchCaptcha } from '../services/authService';

interface CaptchaWidgetProps {
  onCaptchaReady: (token: string) => void;
  captchaAnswer: string;
  onAnswerChange: (answer: string) => void;
}

export default function CaptchaWidget({ onCaptchaReady, captchaAnswer, onAnswerChange }: CaptchaWidgetProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCaptcha = useCallback(async () => {
    setLoading(true);
    setError('');
    onAnswerChange('');
    try {
      const data = await fetchCaptcha();
      setQuestion(data.question);
      onCaptchaReady(data.token);
    } catch {
      setError('Failed to load captcha');
    } finally {
      setLoading(false);
    }
  }, [onCaptchaReady, onAnswerChange]);

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-quest-muted ml-2">
        Security Check
      </label>
      <div className="flex items-center gap-3 bg-quest-border/30 border-2 border-quest-border rounded-2xl p-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <ShieldQuestion className="w-5 h-5 text-duo-blue flex-shrink-0" />
          {loading ? (
            <span className="text-sm text-quest-muted animate-pulse">Loading...</span>
          ) : error ? (
            <span className="text-sm text-red-500">{error}</span>
          ) : (
            <span className="text-sm font-bold text-quest-text whitespace-nowrap">{question}</span>
          )}
        </div>
        <button
          type="button"
          onClick={loadCaptcha}
          className="p-1.5 rounded-xl hover:bg-duo-blue/10 transition-colors flex-shrink-0"
          title="Get a new question"
        >
          <RefreshCw className={`w-4 h-4 text-duo-blue ${loading ? 'animate-spin' : ''}`} />
        </button>
        <input
          type="text"
          value={captchaAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Answer"
          className="w-20 bg-white border-2 border-quest-border rounded-xl py-2 px-3 text-sm font-bold text-center focus:outline-none focus:border-duo-blue transition-all"
          required
        />
      </div>
    </div>
  );
}
