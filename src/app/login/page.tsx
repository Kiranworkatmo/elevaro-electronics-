'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ElevaroLogo from '@/components/ElevaroLogo';
import { useShop } from '@/context/ShopContext';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useShop();

  const [email, setEmail] = useState('marcus.sterling@elevaro.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please provide your registered client email.');
      return;
    }
    login(email, password);
    router.push('/account');
  };

  const handleDemoLogin = (role: 'patron' | 'admin') => {
    if (role === 'admin') {
      login('admin@elevaro.com', 'admin');
      router.push('/admin');
    } else {
      login('marcus.sterling@elevaro.com', 'client');
      router.push('/account');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[#111111] border border-white/[0.1] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <ElevaroLogo size="lg" className="mb-4" />
          <h1 className="text-xl font-black text-white font-display">Client Authentication</h1>
          <p className="text-xs text-gray-400 mt-1">
            Access your private vault allocations and tracking telemetries.
          </p>
        </div>

        {/* Demo 1-Click Login Shortcut Cards */}
        <div className="mb-6 p-4 rounded-2xl bg-gold-500/10 border border-gold-500/25 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gold-300">
            Instant Demo Evaluation Shortcuts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('patron')}
              className="py-2 px-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-[11px] transition-colors flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo Patron</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-extrabold text-[11px] transition-colors border border-white/[0.1] flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-gold-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Client Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-gray-300">Client Passcode</label>
              <a href="#" className="text-gold-400 hover:underline text-[11px]">
                Forgot Code?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
          >
            <span>Authenticate Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center text-xs text-gray-400 relative z-10">
          <span>New to Elevaro Electronics? </span>
          <Link href="/register" className="text-gold-400 font-bold hover:underline">
            Register Private Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
