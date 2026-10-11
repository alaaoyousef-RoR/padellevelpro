import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, Send, CheckCircle, Zap } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('استفسار حول برنامج التدريب');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 6000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 text-right space-y-10">
      
      {/* Header */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-3">
        <span className="label-mono">[ DISPATCH & INQUIRIES ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          تواصل مع الفريق <span className="text-[#d4ff00]">الفني والتدريبي</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-xl">
          سواء كان لديك استفسار تدريبي، مقترح لتطوير المنصة، أو ترغب في شراكة لأكاديميتك أو ناديك، يسعدنا التواصل معك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-dark p-6 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-5">
            <span className="label-mono">[ DIRECT CHANNELS ]</span>
            
            <div className="space-y-4 text-xs sm:text-sm text-[#f8f9fa]/80">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-white/[0.04] text-[#d4ff00] border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40 uppercase block">DIRECT EMAIL</span>
                  <a href="mailto:support@padellevel.pro" className="font-bold text-white hover:text-[#d4ff00]">
                    support@padellevel.pro
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-white/[0.04] text-[#d4ff00] border border-white/5 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40 uppercase block">COMMUNITY GROUP</span>
                  <span className="font-bold text-white">
                    مجتمع PadelLevel العربي على تليجرام
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-white/[0.04] text-[#d4ff00] border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40 uppercase block">HOURS & RESPONSE</span>
                  <span className="font-bold text-white">
                    يومياً 9:00 ص حتى 10:00 م (الرد خلال ساعتين)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-dark p-5 rounded-lg border border-[#d4ff00]/30 bg-[#d4ff00]/[0.02] space-y-2">
            <span className="font-mono-tag text-[10px] text-[#d4ff00] uppercase block">[ COACHES & CLUBS ]</span>
            <p className="text-xs text-[#f8f9fa]/70 leading-relaxed">
              نوفر برامج شراكة للأندية والمدربين لاعتماد اختبار PadelLevel Pro لتقييم مشتركي الأكاديمية وإعداد بطولات متكافئة المستويات.
            </p>
          </div>
        </div>

        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-6">
          <div>
            <span className="label-mono">[ TRANSMISSION FORM ]</span>
            <h2 className="font-alexandria font-bold text-xl text-white">أرسل استفسارك وسنرد عليك فوراً</h2>
          </div>

          {isSubmitted && (
            <div className="bg-[#d4ff00]/[0.08] border border-[#d4ff00]/40 p-4 rounded text-xs text-[#d4ff00] flex items-center gap-2 font-mono-tag">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>[ TRANSMISSION CONFIRMED: MESSAGE RECEIVED ]</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tag text-[#f8f9fa]/60 mb-1">
                  FULL NAME / الاسم الكامل
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: يوسف إبراهيم"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-[#d4ff00] rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tag text-[#f8f9fa]/60 mb-1">
                  EMAIL / البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-[#d4ff00] rounded p-2.5 text-xs text-white placeholder-white/20 focus:outline-none text-right font-mono-tag"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tag text-[#f8f9fa]/60 mb-1">
                TOPIC / الموضوع
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 focus:border-[#d4ff00] rounded p-2.5 text-xs text-white focus:outline-none text-right font-sans"
              >
                <option value="استفسار حول برنامج التدريب" className="bg-[#111315]">استفسار حول برنامج التدريب</option>
                <option value="استفسار حول اختبار المستوى" className="bg-[#111315]">استفسار حول اختبار تحديد المستوى</option>
                <option value="شراكة أندية وأكاديميات" className="bg-[#111315]">طلب شراكة لنادٍ أو أكاديمية بادل</option>
                <option value="اقتراح فني أو تقني" className="bg-[#111315]">اقتراح فني لتطوير المنصة</option>
                <option value="أخرى" className="bg-[#111315]">أخرى</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-tag text-[#f8f9fa]/60 mb-1">
                MESSAGE / نص الرسالة
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب استفسارك بالتفصيل هنا..."
                rows={4}
                required
                className="w-full bg-white/[0.04] border border-white/10 focus:border-[#d4ff00] rounded p-3 text-xs text-white placeholder-white/20 focus:outline-none text-right"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-neon w-full py-3 text-xs justify-center font-bold"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
