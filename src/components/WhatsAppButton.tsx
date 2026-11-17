'use client';

import React, { useState } from 'react';
import { X, Shield, ArrowUpRight } from 'lucide-react';

function RealWhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.651.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.577-.01c-.2 0-.526.075-.802.376-.275.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.634.722.23 1.38.197 1.9.12.579-.086 1.78-.727 2.031-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.576-.35zM12.04 21.75c-1.748 0-3.46-.466-4.965-1.35l-.356-.211-3.693.968.986-3.599-.232-.369a9.704 9.704 0 01-1.49-5.189c0-5.38 4.378-9.758 9.76-9.758 2.607 0 5.058 1.016 6.901 2.86a9.697 9.697 0 012.857 6.897c0 5.381-4.378 9.76-9.763 9.76zM12.04 0C5.399 0 0 5.398 0 12.04c0 2.12.553 4.19 1.603 6.012L0 24.08l6.195-1.625A12.008 12.008 0 0012.04 24.08c6.64 0 12.04-5.4 12.04-12.04S18.68 0 12.04 0z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const predefinedInquiries = [
    {
      title: 'Consult on Flagship Device',
      message: 'Hello Elevaro Concierge, I would like personal advice on selecting a flagship smartphone or workstation.',
    },
    {
      title: 'Order Tracking & Vault Delivery',
      message: 'Hello, I would like to inquire about the delivery status of my Elevaro order.',
    },
    {
      title: 'Bespoke Corporate Procurement',
      message: 'Hello, our firm is interested in high-volume executive hardware procurement.',
    },
  ];

  const handleLaunchWhatsApp = (customMsg: string) => {
    const phone = '15553829012'; // Elevaro Concierge international desk
    const encoded = encodeURIComponent(customMsg);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Concierge Popover Dialog (Positioned on the Right) */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#121212] border border-gold-500/30 rounded-2xl shadow-2xl p-4 backdrop-blur-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-[#25D366]/30 shrink-0">
                <RealWhatsAppIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Elevaro Concierge Desk
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] text-gray-400">Online • Response &lt; 2 mins</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 my-3 leading-relaxed">
            Welcome to Elevaro Privé. How may our certified technology advisors assist you today?
          </p>

          <div className="space-y-2">
            {predefinedInquiries.map((inq, idx) => (
              <button
                key={idx}
                onClick={() => handleLaunchWhatsApp(inq.message)}
                className="w-full text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#25D366]/50 text-xs text-gray-200 transition-all flex items-center justify-between group"
              >
                <span>{inq.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#25D366] opacity-70 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-gold-400" />
              Official Verified WhatsApp Channel
            </span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger with Real WhatsApp Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 py-2.5 px-4 rounded-full bg-[#141414] border border-[#25D366]/40 hover:border-[#25D366] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(37,211,102,0.25)] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact Concierge via WhatsApp"
      >
        <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold shadow-lg shadow-[#25D366]/40 transition-transform group-hover:rotate-6">
          <RealWhatsAppIcon className="w-5 h-5 fill-current" />
        </div>
        <div className="text-left pr-1 hidden sm:block">
          <p className="text-[10px] text-[#25D366] font-bold uppercase tracking-wider">
            Live Concierge
          </p>
          <p className="text-xs text-white font-semibold -mt-0.5">VIP WhatsApp</p>
        </div>
      </button>
    </div>
  );
}
