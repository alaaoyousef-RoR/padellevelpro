import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, Zap, AlertCircle, Loader2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalTab, 
    closeAuthModal, 
    openAuthModal, 
    loginWithGoogle, 
    login, 
    register, 
    loginDemo 
  } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsGoogleLoading(true);
    const result = await loginWithGoogle();
    setIsGoogleLoading(false);
    if (!result.success && result.message) {
      setErrorMsg(result.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authModalTab === 'register') {
      if (!fullName.trim()) {
        setErrorMsg('يرجى إدخال اسمك الكامل.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('كلمة المرور يجب ألا تقل عن 6 أحرف.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('كلمتا المرور غير متطابقتين.');
        return;
      }
      setIsLoading(true);
      const res = await register(fullName, email, password);
      setIsLoading(false);
      if (!res.success && res.message) {
        setErrorMsg(res.message);
      }
    } else {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
        return;
      }
      setIsLoading(true);
      const res = await login(email, password);
      setIsLoading(false);
      if (!res.success && res.message) {
        setErrorMsg(res.message);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-alexandria"
      onClick={closeAuthModal}
    >
      <div 
        className="bg-[#0e1012] rounded-xl max-w-md w-full shadow-2xl border border-[rgba(248,249,250,0.12)] overflow-hidden relative text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[rgba(248,249,250,0.08)] bg-gradient-to-b from-[#16191c] to-[#0e1012] relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 left-5 text-[#f8f9fa]/50 hover:text-white p-1 rounded-md hover:bg-white/[0.08] transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="label-mono">[ ATHLETE AUTHENTICATION ]</span>
          <h3 className="font-alexandria font-black text-xl text-white mt-1">
            PADEL LEVEL <span className="text-[#d4ff00]">PRO</span>
          </h3>
          <p className="text-xs text-[#f8f9fa]/60 mt-1">
            {authModalTab === 'login' ? 'سجل دخولك لحفظ مستواك وسجلات التدريب سحابياً' : 'أنشئ حساب لاعب جديد لحفظ تقدمك ومستواك'}
          </p>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="mt-4 w-full bg-white hover:bg-neutral-100 text-[#0b0c0d] font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] shadow-md cursor-pointer disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-neutral-800" />
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>المتابعة باستخدام حساب Google</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[rgba(248,249,250,0.08)] bg-white/[0.02]">
          <button
            type="button"
            onClick={() => {
              setErrorMsg('');
              openAuthModal('login');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              authModalTab === 'login'
                ? 'text-[#d4ff00] border-b-2 border-[#d4ff00] bg-white/[0.04]'
                : 'text-[#f8f9fa]/50 hover:text-white'
            }`}
          >
            تسجيل الدخول بالبريد
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMsg('');
              openAuthModal('register');
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors cursor-pointer ${
              authModalTab === 'register'
                ? 'text-[#d4ff00] border-b-2 border-[#d4ff00] bg-white/[0.04]'
                : 'text-[#f8f9fa]/50 hover:text-white'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-800 text-red-300 p-3 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {authModalTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs text-[#f8f9fa]/70 font-semibold block">
                الاسم الكامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: تركي الصالح"
                  className="w-full bg-white/[0.04] border border-[rgba(248,249,250,0.12)] focus:border-[#d4ff00] focus:ring-1 focus:ring-[#d4ff00] rounded-lg py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition"
                />
                <User className="w-4 h-4 text-white/40 absolute top-3 right-3 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs text-[#f8f9fa]/70 font-semibold block">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                dir="ltr"
                className="w-full bg-white/[0.04] border border-[rgba(248,249,250,0.12)] focus:border-[#d4ff00] focus:ring-1 focus:ring-[#d4ff00] rounded-lg py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right"
              />
              <Mail className="w-4 h-4 text-white/40 absolute top-3 right-3 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-[#f8f9fa]/70 font-semibold block">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full bg-white/[0.04] border border-[rgba(248,249,250,0.12)] focus:border-[#d4ff00] focus:ring-1 focus:ring-[#d4ff00] rounded-lg py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right"
              />
              <Lock className="w-4 h-4 text-white/40 absolute top-3 right-3 pointer-events-none" />
            </div>
          </div>

          {authModalTab === 'register' && (
            <div className="space-y-1.5">
              <label className="text-xs text-[#f8f9fa]/70 font-semibold block">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full bg-white/[0.04] border border-[rgba(248,249,250,0.12)] focus:border-[#d4ff00] focus:ring-1 focus:ring-[#d4ff00] rounded-lg py-2.5 px-3 pr-10 text-xs text-white placeholder-white/30 outline-none transition text-right"
                />
                <Lock className="w-4 h-4 text-white/40 absolute top-3 right-3 pointer-events-none" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full btn-neon py-3 text-xs font-black rounded-lg mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>
              {authModalTab === 'login' ? 'دخول إلى الحساب' : 'إنشاء الحساب وتفعيل السحابة'}
            </span>
          </button>

          {/* Quick Demo Option */}
          <div className="pt-3 border-t border-[rgba(248,249,250,0.08)] flex items-center justify-between text-[11px]">
            <span className="text-[#f8f9fa]/40">لتجربة المنصة فوراً:</span>
            <button
              type="button"
              onClick={loginDemo}
              className="text-[#d4ff00] hover:underline font-mono-tag font-bold flex items-center gap-1 cursor-pointer"
            >
              <Zap className="w-3 h-3 fill-[#d4ff00]" />
              <span>دخول تجريبي سريع (Demo)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
