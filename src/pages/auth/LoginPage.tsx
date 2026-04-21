import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { loginUser } from '../../services/authService';
// @ts-ignore
import logo from '../../images/logo.png';

export default function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser({
        email,
        password,
      });
      login(result.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f4f8] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Skill Together" className="mx-auto h-20 object-contain mb-6 drop-shadow-sm" />
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium text-sm">Your learning journey continues here</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-blue-900/5 border border-slate-100">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 mb-6 text-sm font-medium"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f] transition-all placeholder:text-slate-400 text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f] transition-all placeholder:text-slate-400 text-slate-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b1c9f] hover:bg-[#071375] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0b1c9f]/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>Continue <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          Don't have an account? <Link to="/signup" className="text-[#0b1c9f] font-bold hover:underline">Sign up for free</Link>
        </p>
      </motion.div>
    </div>
  );
}
