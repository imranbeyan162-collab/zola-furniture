import React, { useState } from 'react';
import { ShieldCheck, X, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin@zolafurniture.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      onLoginSuccess(data.token);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-[32px] luxury-card p-6 sm:p-7 border border-[#c9a24a]/40 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1915] text-[#a69c8f] hover:text-white border border-[#44382f] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#c9a24a]/20 border border-[#c9a24a] flex items-center justify-center text-[#c9a24a] mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading uppercase">
            Admin Authentication
          </h3>
          <p className="text-xs text-[#a69c8f] mt-1">
            Zola Furniture Management Console
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Credentials hint */}
        <div className="mb-4 p-3 rounded-xl bg-[#241c17] border border-[#3e3228] text-[11px] text-[#c9a24a] space-y-0.5">
          <span className="font-bold block text-white">Default Credentials:</span>
          <p>Email: <span className="underline">admin@zolafurniture.com</span></p>
          <p>Password: <span className="underline">admin123</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8e8172] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white focus:outline-none focus:border-[#c9a24a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#a69c8f] uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8e8172] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#1b1613] border border-[#3e3228] text-xs text-white focus:outline-none focus:border-[#c9a24a]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl gold-btn text-xs font-bold uppercase tracking-wider disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

      </div>
    </div>
  );
}
