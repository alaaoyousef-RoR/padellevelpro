import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-[rgba(248,249,250,0.08)] bg-[#070809] text-[#f8f9fa] pt-12 pb-10 text-right mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[rgba(248,249,250,0.08)]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <span className="label-mono">[ PLATFORM CORE ]</span>
            <h3 className="font-alexandria font-black text-2xl text-white tracking-tight uppercase">
              PADEL LEVEL <span className="text-[#d4ff00]">PRO</span>
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed max-w-sm">
              المنصة العربية المتخصصة لتقييم مستويات لاعبي البادل وفق المعايير الرياضية الدولية، وتوفير برامج تدريبية مخصصة ومكتبة شاملة للمهارات والتكتيك.
            </p>
            <div className="pt-2">
              <span className="font-mono-tag text-[10px] text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2.5 py-1 rounded inline-block">
                SYSTEM VER: 2.4.0 • PRODUCTION GRADE
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="label-mono">[ NAVIGATION ]</span>
            <ul className="space-y-2 text-xs font-semibold text-[#f8f9fa]/70">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#d4ff00] transition-colors">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('level-test')} className="hover:text-[#d4ff00] transition-colors flex items-center gap-1.5">
                  <span>اختبار تحديد المستوى</span>
                  <span className="font-mono-tag text-[9px] bg-[#d4ff00] text-black px-1 font-bold rounded">20Q</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('my-training-program')} className="hover:text-[#d4ff00] transition-colors">
                  البرامج التدريبية المخصصة
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('learn-padel')} className="hover:text-[#d4ff00] transition-colors">
                  دليل المهارات والتكتيك
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('video-tutorials')} className="hover:text-[#d4ff00] transition-colors">
                  فيديوهات التمارين
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('progress-tracker')} className="hover:text-[#d4ff00] transition-colors">
                  متتبع التقدم والمهارات
                </button>
              </li>
            </ul>
          </div>

          {/* Levels Info */}
          <div className="space-y-3">
            <span className="label-mono">[ LEVEL INDEX ]</span>
            <ul className="space-y-1.5 text-xs text-[#f8f9fa]/60 font-mono-tag">
              <li className="flex items-center justify-between">
                <span>STAGE [01]</span>
                <span className="text-[#f8f9fa]/40">مبتدئ (20-35)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [02]</span>
                <span className="text-[#f8f9fa]/40">متوسط أدنى (36-50)</span>
              </li>
              <li className="flex items-center justify-between text-[#d4ff00]">
                <span>STAGE [03]</span>
                <span className="text-[#d4ff00]">متوسط (51-62)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [04]</span>
                <span className="text-[#f8f9fa]/40">متقدم (63-72)</span>
              </li>
              <li className="flex items-center justify-between">
                <span>STAGE [05]</span>
                <span className="text-[#f8f9fa]/40">محترف (73-80)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-[#f8f9fa]/40">
          <p>© 2026 PadelLevel Pro. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-white">ABOUT</button>
            <span>/</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-white">FAQ</button>
            <span>/</span>
            <button onClick={() => navigateTo('contact')} className="hover:text-white">CONTACT</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
