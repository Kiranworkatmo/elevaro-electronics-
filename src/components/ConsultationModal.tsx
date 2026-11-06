'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export default function ConsultationModal() {
  const {
    isConsultationOpen,
    closeConsultation,
    consultationSuccess,
    bookConsultation,
    openWhatsAppConcierge
  } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('15:00 IST (Afternoon Salon)');
  const [occasion, setOccasion] = useState('Bridal Trousseau');
  const [budget, setBudget] = useState('₹1,00,000 – ₹2,50,000');
  const [notes, setNotes] = useState('');

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookConsultation({
      name,
      phone,
      email,
      date,
      timeSlot,
      occasion,
      budget,
      specialRequests: notes,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeConsultation}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div className="relative inline-block w-full max-w-xl bg-[#12151B] border border-[#C59B27]/40 rounded-xl text-left overflow-hidden shadow-2xl z-10 p-6 sm:p-10 my-8">
          {/* Close button */}
          <button
            onClick={closeConsultation}
            className="absolute top-4 right-4 p-2 text-[#ECE4D8]/60 hover:text-white bg-[#0E1013]/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {consultationSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#170507] border-2 border-[#C59B27] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#C59B27]" />
              </div>
              <span className="text-[10px] text-[#C59B27] uppercase tracking-[0.3em] font-semibold block mb-1">
                Salon Invitation Confirmed
              </span>
              <h3 className="font-serif text-3xl text-[#FDF4D4] font-medium mb-3">
                Namaste, {name || 'Esteemed Patron'}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE4D8]/80 leading-relaxed max-w-md mx-auto mb-8 font-light">
                Your private bridal consultation has been allocated to a Senior Atelier Stylist for <strong className="text-[#F6E7B9] font-medium">{date || 'your selected date'}</strong> at <strong className="text-[#F6E7B9] font-medium">{timeSlot}</strong>. A calendar invite and HD video call link have been dispatched to your email and WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => openWhatsAppConcierge()}
                  className="w-full sm:w-auto px-6 py-3 bg-[#0C3027] hover:bg-[#134E3F] text-[#ECE4D8] border border-[#1B5E4B] text-xs font-semibold tracking-[0.16em] uppercase rounded flex items-center justify-center space-x-2 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#C59B27]" />
                  <span>Connect Immediately on WhatsApp</span>
                </button>

                <button
                  onClick={closeConsultation}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.2em] uppercase rounded"
                >
                  Close & Explore
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 text-[#C59B27] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Privé Bridal Salon</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FDF4D4] font-medium">
                  Schedule Your Private Consultation
                </h3>
                <p className="text-xs text-[#ECE4D8]/70 font-light mt-2 max-w-sm mx-auto">
                  Reserve a dedicated 45-minute virtual video draping appointment with our master saree drapers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] placeholder-[#ECE4D8]/30 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] placeholder-[#ECE4D8]/30 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="radhika@example.com"
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] placeholder-[#ECE4D8]/30 focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="11:00 IST (Morning Salon)">11:00 AM IST (Morning Salon)</option>
                      <option value="15:00 IST (Afternoon Salon)">03:00 PM IST (Afternoon Salon)</option>
                      <option value="18:00 IST (Evening Salon)">06:00 PM IST (Evening Salon)</option>
                      <option value="21:00 IST (US / UK Friendly Slot)">09:00 PM IST (International Time)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                      Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="Bridal Trousseau">Bridal Trousseau</option>
                      <option value="Grand Reception">Grand Reception</option>
                      <option value="Sangeet & Mehendi">Sangeet & Mehendi</option>
                      <option value="Royal Festive">Royal Festive</option>
                      <option value="Heirloom Collector">Heirloom Collector Investment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-wider uppercase text-[#C59B27] block mb-1">
                    Special Wishes / Color Palette Notes
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your wedding theme, jewelry metal tone, or specific heirloom weave requirements..."
                    className="w-full bg-[#0E1013] border border-[#C59B27]/30 rounded px-3 py-2 text-xs text-[#ECE4D8] placeholder-[#ECE4D8]/30 focus:outline-none focus:border-[#C59B27]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#C59B27] via-[#DFBD6E] to-[#C59B27] text-[#0E1013] text-xs font-semibold tracking-[0.22em] uppercase rounded shadow-xl hover:shadow-[#C59B27]/30 transition-all"
                  >
                    Confirm Private Salon Booking
                  </button>
                  <span className="text-[10px] text-[#ECE4D8]/50 text-center block mt-2 font-light">
                    Complimentary VIP Service • Completely confidential
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
