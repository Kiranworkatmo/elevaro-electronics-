'use client';

import React, { useState } from 'react';
import { X, Sparkles, MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showPrompt, setShowPrompt] = useState(true);
  const phoneNumber = '919874561233';
  const displayPhone = '+91 9874561233';
  const defaultMessage = 'Namaste Kiran Sarees Concierge. I would like to inquire about your luxury handloom sarees.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Speech Prompt Bubble */}
      {showPrompt && (
        <div className="relative mb-3 max-w-xs bg-[#14171D] border border-[#C59B27]/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md animate-fade-in group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPrompt(false);
            }}
            className="absolute top-2 right-2 text-[#ECE4D8]/50 hover:text-white p-1 rounded transition-colors"
            title="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-left"
          >
            <div className="flex items-center space-x-1.5 mb-1 text-[#C59B27] text-[10px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
              <span>Senior Stylist Online</span>
            </div>
            <p className="text-xs text-[#FDF4D4] font-medium leading-snug">
              Curating a bridal or festive trousseau?
            </p>
            <p className="text-[11px] text-[#ECE4D8]/70 mt-1 font-light leading-relaxed">
              Message us on WhatsApp at <strong className="text-[#F6E7B9] font-medium">{displayPhone}</strong> for live drape videos & advice.
            </p>
            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#25D366] mt-2 group-hover:underline">
              <span>Start Conversation</span>
              <span>→</span>
            </span>
          </a>

          {/* Little speech arrow bottom right */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#14171D] border-r border-b border-[#C59B27]/40 transform rotate-45" />
        </div>
      )}

      {/* Floating Button with Pulse & WhatsApp Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kiran Sarees on WhatsApp (+91 9874561233)"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0C3027] via-[#128C7E] to-[#25D366] text-white shadow-2xl border-2 border-[#C59B27]/60 hover:scale-110 hover:border-[#F6E7B9] transition-all duration-300 focus:outline-none"
      >
        {/* Breathing glowing outer ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-pulse pointer-events-none" />

        {/* Authentic WhatsApp SVG */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md transform group-hover:rotate-6 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.938l-1.564 5.719 5.86-1.537c1.714.956 3.69 1.498 5.794 1.498 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>

        {/* Notification Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#C59B27] border-2 border-[#0E1013] rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>
      </a>
    </div>
  );
}
