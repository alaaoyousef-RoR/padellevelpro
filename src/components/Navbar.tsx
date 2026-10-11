import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Menu, 
  X, 
  LogOut, 
  Activity, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  Sparkles, 
  ChevronDown,
  User,
  Zap
} from 'lucide-react';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, currentPage, navigateTo, openAuthModal, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems: { label: string; page: PageRoute; code: string; icon: React.ReactNode }[] = [
    { label: 'الرئيسية', page: 'home', code: '01', icon: null },
    { label: 'اختبار المستوى', page: 'level-test', code: '02', icon: <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" /> },
    { label: 'برنامجي التدريبي', page: 'my-training-program', code: '03', icon: <Trophy className="w-3.5 h-3.5 text-[#d4ff00]" /> },
    { label: 'تعلّم البادل', page: 'learn-padel', code: '04', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'فيديوهات التمارين', page: 'video-tutorials', code: '05', icon: <PlayCircle className="w-3.5 h-3.5" /> },
    { label: 'متتبع التقدم', page: 'progress-tracker', code: '06', icon: <TrendingUp className="w-3.5 h-3.5 text-[#d4ff00]" /> },
  ];

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR (Variation 2 fixed high-density sidebar) */}
      <aside className="hidden lg:flex w-[280px] h-screen sticky top-0 flex-shrink-0 flex-col justify-between p-6 border-l border-[rgba(248,249,250,0.1)] bg-gradient-to-b from-[#111315] to-[#070809] z-40 select-none">
        
        {/* Top Branding & Nav */}
        <div>
          {/* Header Brand */}
          <div className="mb-10 text-right cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="label-mono">[ PLATFORM ]</span>
            <h2 className="font-alexandria font-extrabold text-2xl tracking-tight text-[#f8f9fa] uppercase">
              PADEL LEVEL <span className="text-[#d4ff00]">PRO</span>
            </h2>
            <p className="text-[11px] text-[#f8f9fa]/50 font-medium mt-1">
              نظام التقييم وتطوير الأداء الرياضي
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-3 px-3 rounded-md text-sm font-semibold transition-all group ${
                    isActive
                      ? 'text-[#d4ff00] bg-[rgba(212,255,0,0.06)] border-r-2 border-[#d4ff00]'
                      : 'text-[#f8f9fa]/60 hover:text-[#f8f9fa] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span className={`font-mono-tag text-[10px] ${isActive ? 'text-[#d4ff00]' : 'text-[#f8f9fa]/20 group-hover:text-[#f8f9fa]/40'}`}>
                    [{item.code}]
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Secondary Links */}
          <div className="pt-6 mt-6 border-t border-[rgba(248,249,250,0.08)] space-y-1">
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-right py-1.5 px-3 rounded text-xs transition-colors ${
                currentPage === 'about' ? 'text-[#d4ff00]' : 'text-[#f8f9fa]/40 hover:text-[#f8f9fa]'
              }`}
            >
              عن المنصة
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`w-full text-right py-1.5 px-3 rounded text-xs transition-colors ${
                currentPage === 'faq' ? 'text-[#d4ff00]' : 'text-[#f8f9fa]/40 hover:text-[#f8f9fa]'
              }`}
            >
              الأسئلة الشائعة
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-right py-1.5 px-3 rounded text-xs transition-colors ${
                currentPage === 'contact' ? 'text-[#d4ff00]' : 'text-[#f8f9fa]/40 hover:text-[#f8f9fa]'
              }`}
            >
              اتصل بنا
            </button>
          </div>
        </div>

        {/* Bottom User Area & Primary Action */}
        <div className="space-y-3 pt-6 border-t border-[rgba(248,249,250,0.08)]">
          {isAuthenticated && user ? (
            <div className="bg-white/[0.04] p-3 rounded-md border border-[rgba(248,249,250,0.08)] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.fullName} className="w-8 h-8 rounded-full border border-[#d4ff00]/40 object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center text-[#d4ff00] text-xs font-bold flex-shrink-0">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#f8f9fa] truncate max-w-[110px]">{user.fullName}</p>
                    <p className="text-[10px] text-[#d4ff00] font-mono-tag">
                      {user.levelNumber ? `LEVEL [0${user.levelNumber}]` : (user.playtomicScore ? `PT ${user.playtomicScore.toFixed(1)}` : 'UNRANKED')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-[#f8f9fa]/40 hover:text-red-400 p-1 rounded transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-xs font-bold py-1.5 bg-white/[0.06] hover:bg-white/[0.1] text-[#f8f9fa] rounded flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#d4ff00]" />
                <span>لوحة التحكم الشخصية</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('level-test')}
                className="btn-neon w-full py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>ابدأ الآن مجاناً</span>
              </button>
              
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => openAuthModal('login')}
                  className="py-1.5 text-xs text-[#f8f9fa]/70 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded font-semibold text-center"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="py-1.5 text-xs text-[#d4ff00] bg-[#d4ff00]/10 hover:bg-[#d4ff00]/20 rounded font-bold text-center"
                >
                  إنشاء حساب
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] font-mono-tag text-[#f8f9fa]/40 text-center pt-2">
            © 2026 PadelLevel Pro
          </p>
        </div>

      </aside>

      {/* MOBILE TOPBAR (Visible on small screens) */}
      <header className="lg:hidden sticky top-0 z-50 bg-[#0b0c0d]/95 backdrop-blur-md border-b border-[rgba(248,249,250,0.1)] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-right focus:outline-none px-2.5 py-1.5 -mx-2 rounded-lg border border-transparent hover:border-[#d4ff00]/30 hover:bg-[#d4ff00]/[0.06] hover:shadow-[0_0_18px_rgba(212,255,0,0.25)] transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-5 h-5 text-[#d4ff00] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(212,255,0,0.8)] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              d="M12 2C7.5 2 4 5.5 4 10c0 3.3 2.1 6.1 5.1 7.2L8.2 21.5a0.8 0.8 0 0 0 .8.8h6a0.8 0.8 0 0 0 .8-.8l-.9-4.3c3-1.1 5.1-3.9 5.1-7.2 0-4.5-3.5-8-8-8zm0 1.6c3.5 0 6.4 2.9 6.4 6.4 0 2.5-1.5 4.7-3.8 5.6l-.5.2-.4 1.8h-3.4l-.4-1.8-.5-.2c-2.3-.9-3.8-3.1-3.8-5.6 0-3.5 2.9-6.4 6.4-6.4z"
              fill="rgba(212,255,0,0.2)"
            />
            <circle cx="10" cy="8.5" r="0.9" fill="#d4ff00" />
            <circle cx="14" cy="8.5" r="0.9" fill="#d4ff00" />
            <circle cx="12" cy="11" r="0.9" fill="#d4ff00" />
            <circle cx="10" cy="13.5" r="0.9" fill="#d4ff00" />
            <circle cx="14" cy="13.5" r="0.9" fill="#d4ff00" />
          </svg>
          <span className="font-alexandria font-extrabold text-lg text-white uppercase tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(212,255,0,0.4)]">
            PADEL LEVEL <span className="text-[#d4ff00] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(212,255,0,0.85)]">PRO</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <button
              onClick={() => handleNavClick('level-test')}
              className="btn-neon text-[11px] px-3 py-1.5 font-bold"
            >
              اختبار المستوى
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-[11px] text-[#d4ff00] font-bold bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2.5 py-1 rounded"
            >
              لوحتي
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#f8f9fa]/70 hover:text-white hover:bg-white/[0.05] rounded-md"
            aria-label="القائمة الرئيسية"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#d4ff00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-6 flex flex-col justify-between animate-in slide-in-from-top-4 duration-200">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(248,249,250,0.1)] mb-6">
              <div>
                <span className="label-mono">[ NAVIGATION ]</span>
                <h3 className="font-alexandria font-black text-xl text-white">PADEL LEVEL <span className="text-[#d4ff00]">PRO</span></h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[#d4ff00]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-md text-base font-bold text-right ${
                    currentPage === item.page
                      ? 'bg-[#d4ff00] text-[#0b0c0d]'
                      : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono-tag text-xs opacity-60">[{item.code}]</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[rgba(248,249,250,0.1)] space-y-3">
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="w-full py-3 rounded text-red-400 bg-red-950/20 border border-red-900/30 text-xs font-bold"
              >
                تسجيل الخروج
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('login'); setIsMobileMenuOpen(false); }}
                  className="py-3 rounded bg-white/[0.08] text-white font-bold text-xs"
                >
                  تسجيل الدخول
                </button>
                <button
                  onClick={() => { openAuthModal('register'); setIsMobileMenuOpen(false); }}
                  className="btn-neon py-3 text-xs justify-center"
                >
                  حساب جديد
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
