import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { signupUser } from '../../services/authService';
// @ts-ignore
import logo from '../../images/logo.png';

export default function SignupPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (pw: string) => {
    if (!pw) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-slate-300' };
    if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-slate-400' };
    if (score <= 3) return { level: 3, label: 'Good', color: 'bg-[#4f64d1]' };
    if (score <= 4) return { level: 4, label: 'Strong', color: 'bg-[#0b1c9f]' };
    return { level: 5, label: 'Excellent', color: 'bg-[#06116b]' };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await signupUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      login(result.user);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
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
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium text-sm">Begin your skill-building journey today</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="signup-username"
                  value={formData.username}
                  onChange={(e) => update('username', e.target.value)}
                  placeholder="CoolAdventurer42"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f] transition-all text-slate-900 placeholder:text-slate-400"
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="signup-email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f] transition-all text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="signup-password"
                  value={formData.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f] transition-all text-slate-900 placeholder:text-slate-400"
                  required
                  minLength={6}
                />
              </div>
              {formData.password && (
                <div className="flex items-center gap-2 px-2 pt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${i <= passwordStrength.level ? passwordStrength.color : 'bg-slate-200'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{passwordStrength.label}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  id="signup-confirm-password"
                  value={formData.confirmPassword}
                  onChange={(e) => update('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-10 text-sm font-medium focus:outline-none transition-all text-slate-900 placeholder:text-slate-400 ${passwordsMismatch ? 'border-red-400 focus:ring-1 focus:ring-red-400' :
                    passwordsMatch ? 'border-green-400 focus:ring-1 focus:ring-green-400' :
                      'focus:border-[#0b1c9f] focus:ring-1 focus:ring-[#0b1c9f]'
                    }`}
                  required
                />
                {passwordsMatch && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {passwordsMismatch && (
                <p className="text-red-500 text-[10px] font-bold ml-2">Passwords don't match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !!passwordsMismatch}
              className="w-full bg-[#0b1c9f] hover:bg-[#071375] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0b1c9f]/25 disabled:opacity-60 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <span className="animate-pulse">Creating account...</span>
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          Already have an account? <Link to="/login" className="text-[#0b1c9f] font-bold hover:underline">Login instead</Link>
        </p>
      </motion.div>
    </div>
  );
}
