'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Flagship Procurement',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Concierge Inquiry Dispatched',
      message: 'A certified hardware specialist has been assigned to your ticket.',
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
            Private Client Relations
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mt-2">
            VIP Concierge Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
            Direct access to certified technology advisors, bespoke enterprise hardware orders, and private salon appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111111] p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Global Contact Desks
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Direct Client Hotline</p>
                    <p className="text-gray-400 mt-0.5">+1 (800) 4-ELEVARO / +1 (555) 382-9012</p>
                    <p className="text-[11px] text-emerald-400 mt-0.5">24/7 Priority Routing</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Electronic Dispatch</p>
                    <p className="text-gray-400 mt-0.5">concierge@elevaro.com</p>
                    <p className="text-[11px] text-gray-400">Response guaranteed in &lt; 15 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Flagship Technology Atelier</p>
                    <p className="text-gray-400 mt-0.5">
                      742 Evergreen Terrace, Suite 800, Penthouse Pavilion<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Operating Schedule</p>
                    <p className="text-gray-400 mt-0.5">
                      Continuous Global Operations (24 Hours, 365 Days)
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="pt-4 border-t border-white/[0.08]">
                <a
                  href="https://wa.me/15553829012?text=Hello%20Elevaro%20Concierge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Launch WhatsApp VIP Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, {form.name}. Your dedicated client concierge is reviewing your request and will connect with you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', subject: 'Flagship Procurement', message: '' });
                    }}
                    className="mt-4 py-2 px-6 rounded-xl bg-white/[0.08] text-xs font-bold text-white hover:bg-white/[0.14]"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                    Direct Concierge Dispatch Form
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 font-semibold">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Marcus Sterling"
                        className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 font-semibold">Client Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="marcus@domain.com"
                        className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Inquiry Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="Flagship Procurement">Flagship Procurement & Configuration</option>
                      <option value="Private Salon Appointment">Private Salon Appointment Booking</option>
                      <option value="Corporate Executive Order">Bespoke Corporate Executive Order</option>
                      <option value="Warranty & Care Claim">Elevaro 2-Year VIP Care Claim</option>
                      <option value="General Inquiry">General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-semibold">Your Message or Requirements</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Specify the instruments of interest, custom engraving, or preferred delivery timing..."
                      className="w-full bg-black/60 border border-white/[0.1] rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-gold-400 hover:bg-gold-300 text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xl shadow-gold-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch Priority Ticket</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
