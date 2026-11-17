'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ElevaroLogo from '@/components/ElevaroLogo';
import { useShop } from '@/context/ShopContext';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useShop();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all mandatory account fields.');
      return;
    }
    if (!agreeTerms) {
      setError('Please acknowledge the Elevaro Client Agreement.');
      return;
    }

    register(fullName, email, password);
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[#111111] border border-white/[0.1] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <ElevaroLogo size="lg" className="mb-4" />
          <h1 className="text-xl font-black text-white font-display">Create Elevaro Account</h1>
          <p className="text-xs text-gray-400 mt-1">
            Enroll for private hardware allocations, VIP concierge care, and express tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Marcus Sterling"
                className="w-full bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

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
                placeholder="marcus@domain.com"
                className="w-full bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Account Security Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create minimum 8-character passcode"
                className="w-full bg-black/60 border border-white/[0.1] focus:border-gold-500 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-gray-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded border-white/20 bg-black/60 text-gold-500 focus:ring-gold-500 cursor-pointer"
            />
            <span className="leading-relaxed">
              I agree to the <Link href="/terms" className="text-gold-400 hover:underline">Terms of Service</Link> and <Link href="/privacy-policy" className="text-gold-400 hover:underline">Privacy Policy</Link>.
            </span>
          </label>

          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
          >
            <span>Register Private Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center text-xs text-gray-400 relative z-10">
          <span>Already have an account? </span>
          <Link href="/login" className="text-gold-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
