import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  ArrowLeft, 
  Play, 
  Target, 
  Users, 
  Activity, 
  Award,
  Zap
} from 'lucide-react';
import { PADEL_LEVELS } from '../data/assessmentData';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-24 pb-16 text-right">
      
      {/* 1. HERO SECTION (Variation 2 Aesthetic) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2">
        
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-6">
          <span className="label-mono">RANKING & PERFORMANCE SYSTEM</span>
          
          <h1 className="font-alexandria font-black text-[21px] leading-[37.4px] text-[#f8f9fa] tracking-tight uppercase">
            اكتشف مستواك <br /> 
            الحقيقي في البادل <br /> 
            وتدرّب <span className="text-[#d4ff00]">بذكاء</span>
          </h1>

          <p className="text-[#f8f9fa]/70 leading-relaxed text-base sm:text-lg max-w-xl">
            هل تلعب البادل بانتظام ولا تعرف مستواك الحقيقي بدقة؟ قيّم مهاراتك الآن عبر اختبارنا التفاعلي المتخصص، واكتشف نقاط قوتك وضعفك، واحصل على برنامج تدريبي أسبوعي مفصل صُمم لمستواك.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('level-test')}
              className="btn-neon px-8 py-4.5 text-sm font-extrabold flex items-center gap-3"
            >
              <Zap className="w-4 h-4 fill-[#0b0c0d]" />
              <span>ابدأ اختبار تحديد المستوى</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('my-training-program')}
              className="btn-outline-ink px-8 py-4 text-sm font-bold flex items-center gap-2"
            >
              <span>استكشف البرامج</span>
            </button>
          </div>
        </div>

        {/* Right Column (Skill Index Card) */}
        <div className="lg:col-span-5">
          <div className="card-dark p-6 sm:p-8 rounded-lg relative overflow-hidden space-y-6 border border-[rgba(248,249,250,0.1)]">
            
            <div className="flex items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-4">
              <div>
                <span className="label-mono">LIVE PREVIEW</span>
                <h3 className="font-alexandria font-bold text-lg text-white">SKILL INDEX CARD</h3>
              </div>
              <span className="font-mono-tag text-[10px] bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30 px-2 py-0.5 rounded">
                SAMPLE 2026
              </span>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] font-mono-tag text-[#f8f9fa]/50 uppercase">CURRENT RATING</p>
                <p className="text-lg font-bold text-white mt-0.5">المستوى 3: متوسط</p>
              </div>
              <div className="font-alexandria font-black text-4xl sm:text-5xl text-[#d4ff00]">
                58<span className="text-xl text-[#f8f9fa]/40">/80</span>
              </div>
            </div>

            {/* Neon Accent Progress bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono-tag text-[#f8f9fa]/50 mb-1.5">
                <span>INDEX ACCURACY</span>
                <span className="text-[#d4ff00]">72.5%</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                <div className="h-full w-[72.5%] bg-[#d4ff00] rounded-full shadow-[0_0_12px_rgba(212,255,0,0.6)]"></div>
              </div>
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs py-2 border-b border-[rgba(248,249,250,0.06)]">
                <span className="text-[#f8f9fa]/80">الفولي والشبكة (Volleys)</span>
                <span className="font-mono-tag text-[#d4ff00] font-bold">85%</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-[rgba(248,249,250,0.06)]">
                <span className="text-[#f8f9fa]/80">ضربة البانديخا (Bandeja)</span>
                <span className="font-mono-tag text-[#d4ff00] font-bold">65%</span>
              </div>
              <div className="flex justify-between text-xs py-2 border-b border-[rgba(248,249,250,0.06)]">
                <span className="text-[#f8f9fa]/80">استخدام الجدران (Glass Walls)</span>
                <span className="font-mono-tag text-[#d4ff00] font-bold">78%</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('level-test')}
              className="w-full py-3 bg-white/[0.04] hover:bg-[#d4ff00] hover:text-[#0b0c0d] text-[#d4ff00] border border-[#d4ff00]/30 hover:border-[#d4ff00] rounded text-xs font-mono-tag font-bold tracking-wider uppercase transition-all"
            >
              [ RUN YOUR ASSESSMENT NOW ]
            </button>

          </div>
        </div>

      </section>

      {/* 2. STAT-GRID (Variation 2 Component) */}
      <div className="grid grid-cols-3 border-t border-[rgba(248,249,250,0.1)] pt-8 gap-6 text-right">
        <div className="space-y-1">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-[#f8f9fa]">20</h3>
          <p className="label-mono">سؤالاً شاملاً</p>
        </div>
        <div className="space-y-1 border-r border-[rgba(248,249,250,0.08)] pr-6">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-[#d4ff00]">05</h3>
          <p className="label-mono">مستويات معتمدة</p>
        </div>
        <div className="space-y-1 border-r border-[rgba(248,249,250,0.08)] pr-6">
          <h3 className="font-alexandria font-black text-3xl sm:text-4xl text-[#f8f9fa]">100%</h3>
          <p className="label-mono">برامج مخصصة</p>
        </div>
      </div>

      {/* 3. STAGES [01-05] SECTION (Variation 2 Level Row Structure) */}
      <section className="space-y-8">
        <div>
          <span className="label-mono">STAGES [01-05]</span>
          <h2 className="font-alexandria font-black text-[32px] leading-[42px] text-[#f8f9fa] tracking-tight">
            سلم المستويات المعتمد
          </h2>
          <p className="text-sm text-[#f8f9fa]/60 mt-1 max-w-xl">
            المعايير الفنية المطبقة لتصنيف وتقييم لاعبي البادل من التأسيس وحتى الاحتراف.
          </p>
        </div>

        <div className="border-t border-[rgba(248,249,250,0.1)] divide-y divide-[rgba(248,249,250,0.08)]">
          {([1, 2, 3, 4, 5] as const).map((lvl) => {
            const info = PADEL_LEVELS[lvl];
            const code = lvl < 10 ? `0${lvl}` : `${lvl}`;
            const isHighlighted = lvl === 3;
            return (
              <div 
                key={lvl} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 transition-all hover:bg-white/[0.03] gap-4 ${
                  isHighlighted ? 'bg-white/[0.02] border-r-2 border-[#d4ff00]' : ''
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="font-alexandria font-black text-4xl sm:text-5xl text-[#f8f9fa]/20 select-none">
                    {code}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base sm:text-lg text-[#f8f9fa]">
                        {info.titleAr}
                      </h4>
                      {isHighlighted && (
                        <span className="font-mono-tag text-[9px] text-[#0b0c0d] bg-[#d4ff00] font-black px-1.5 py-0.2 rounded">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#f8f9fa]/50 mt-1 leading-relaxed">
                      {info.subtitleAr} • برنامج {info.recommendedProgramWeeks} أسابيع
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-mono-tag text-xs font-black px-3 py-1 bg-[#d4ff00] text-[#0b0c0d] rounded-sm">
                    {info.minScore}-{info.maxScore} نقطة
                  </span>
                  <button
                    onClick={() => navigateTo('level-test')}
                    className="text-xs font-bold text-[#f8f9fa]/70 hover:text-[#d4ff00] p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="space-y-8">
        <div>
          <span className="label-mono">FRAMEWORK [3 STEPS]</span>
          <h2 className="font-alexandria font-black text-3xl sm:text-4xl text-[#f8f9fa]">
            كيف تعمل المنصة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-dark p-6 rounded-lg space-y-4">
            <span className="font-alexandria font-black text-3xl text-[#d4ff00]">01</span>
            <h3 className="font-bold text-lg text-white">خض اختبار المستوى</h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              20 سؤالاً تخصصياً يقيم كل جانب من ضرباتك الأرضية والهوائية وحركة القدمين والجدران.
            </p>
          </div>

          <div className="card-dark p-6 rounded-lg space-y-4">
            <span className="font-alexandria font-black text-3xl text-[#d4ff00]">02</span>
            <h3 className="font-bold text-lg text-white">اعرف تصنيفك ونقاطك</h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              احصل على رقم مستواك من 1 إلى 5 مع تقرير مفصل لنقاط القوة وأولويات التطوير الفني.
            </p>
          </div>

          <div className="card-dark p-6 rounded-lg space-y-4">
            <span className="font-alexandria font-black text-3xl text-[#d4ff00]">03</span>
            <h3 className="font-bold text-lg text-white">اتبع خطتك التدريبية</h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              برنامج أسبوعي مقسم إلى إحماء، تكنيك، تكتيك، ومحاكاة مباريات، مع متتبع لإنجاز مهاراتك.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CORE PLATFORM MODULES */}
      <section className="space-y-8">
        <div>
          <span className="label-mono">MODULES & TOOLSET</span>
          <h2 className="font-alexandria font-black text-3xl sm:text-4xl text-[#f8f9fa]">
            الأدوات والأنظمة المتكاملة
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => navigateTo('level-test')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ ASSESSMENT ]</span>
              <Award className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              تقييم المستوى الدقيق
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              خوارزمية قياس معتمدة لاحتساب إجمالي النقاط من 80 وتحديد نقاط القوة والضعف.
            </p>
          </div>

          <div 
            onClick={() => navigateTo('my-training-program')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ PROGRAMS ]</span>
              <Trophy className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              5 برامج تدريب مخصصة
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              من 4 أسابيع للمبتدئ وحتى 12 أسبوعاً للنخبة مع تفاصيل التمارين اليومية والإحماء.
            </p>
          </div>

          <div 
            onClick={() => navigateTo('learn-padel')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ LIBRARY ]</span>
              <BookOpen className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              موسوعة المهارات والتكتيك
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              شرح تفصيلي للبانديخا والفيبورا والتشيكيتا والباخادا وأسرار اللعب مع الجدران.
            </p>
          </div>

          <div 
            onClick={() => navigateTo('video-tutorials')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ VIDEO DRILLS ]</span>
              <Play className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              مكتبة الفيديو والتمارين
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              محاكاة حركة الملعب وتحليل فني بالفيديو لمواقف اللعب الدفاعية والهجومية.
            </p>
          </div>

          <div 
            onClick={() => navigateTo('progress-tracker')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ TRACKER ]</span>
              <TrendingUp className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              متتبع التقدم وقائمة المهارات
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              سجل الحصص التدريبية ومتابعة إنجاز الـ 12 مهارة رئيسية معتمدة في البادل.
            </p>
          </div>

          <div 
            onClick={() => navigateTo('learn-padel')}
            className="card-dark p-6 rounded-lg space-y-3 cursor-pointer group transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono">[ TACTICS ]</span>
              <Users className="w-5 h-5 text-[#d4ff00]" />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-[#d4ff00] transition-colors">
              التناغم والتكتيك الثنائي
            </h3>
            <p className="text-xs text-[#f8f9fa]/60 leading-relaxed">
              أسرار التحرك المشترك كحبل واحد في الملعب، وتغطية المنتصف وإدارة النقاط الذهبية.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="card-dark p-8 sm:p-12 rounded-lg border border-[#d4ff00]/20 bg-gradient-to-r from-black via-[#111315] to-[#141810] space-y-6 text-center">
        <span className="label-mono">[ READY TO ASCEND ]</span>
        <h2 className="font-alexandria font-black text-3xl sm:text-4xl text-white">
          جاهز لمعرفة مستواك الحقيقي في البادل؟
        </h2>
        <p className="text-sm text-[#f8f9fa]/70 max-w-lg mx-auto leading-relaxed">
          أجب عن أسئلة التقييم الـ 20 الآن واكتشف خطة تدريبك المصممة خصيصاً لمستواك في دقائق معدودة.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon px-8 py-4 text-sm font-extrabold"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>ابدأ اختبار تحديد المستوى الآن</span>
          </button>
          <button
            onClick={() => navigateTo('learn-padel')}
            className="btn-outline-ink px-6 py-3.5 text-xs font-bold"
          >
            تصفح دليل المهارات
          </button>
        </div>
      </section>

    </div>
  );
};
