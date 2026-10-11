import React from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS, ASSESSMENT_PILLARS } from '../data/assessmentData';
import { PillarKey } from '../types';
import { 
  Trophy, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  RotateCcw, 
  BookOpen, 
  TrendingUp, 
  Printer, 
  Zap,
  Award,
  Shield,
  Flame,
  Activity,
  Target,
  Sparkles,
  ExternalLink,
  Play
} from 'lucide-react';

export const TestResultPage: React.FC = () => {
  const { testResult, navigateTo } = useApp();

  if (!testResult) {
    return (
      <div className="card-dark max-w-xl mx-auto my-20 p-8 rounded-lg text-center space-y-4 font-alexandria">
        <span className="label-mono">[ NO DATA AVAILABLE ]</span>
        <h2 className="font-alexandria font-black text-2xl text-white">لم تقم بإجراء الاختبار بعد!</h2>
        <p className="text-xs text-[#f8f9fa]/60">
          خض اختبار المستوى المعتمد المكون من 20 سؤالاً وفق مقياس Playtomic للحصول على تقريرك التشخيصي المعتمد.
        </p>
        <button
          onClick={() => navigateTo('level-test')}
          className="btn-neon px-6 py-3 text-xs font-bold"
        >
          ابدأ الاختبار الآن
        </button>
      </div>
    );
  }

  const levelInfo = PADEL_LEVELS[testResult.levelNumber];
  const code = testResult.levelNumber < 10 ? `0${testResult.levelNumber}` : `${testResult.levelNumber}`;

  const handlePrint = () => {
    window.print();
  };

  const getPillarIcon = (key: PillarKey) => {
    switch (key) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#d4ff00]" />;
      case 'net_volleys': return <Shield className="w-4 h-4 text-[#d4ff00]" />;
      case 'overhead_shots': return <Flame className="w-4 h-4 text-[#d4ff00]" />;
      case 'wall_defense': return <Activity className="w-4 h-4 text-[#d4ff00]" />;
      case 'tactics_positioning': return <Target className="w-4 h-4 text-[#d4ff00]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Top Banner Box - Playtomic Benchmark Certificate */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4ff00]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono">[ OFFICIAL PLAYTOMIC BENCHMARK CERTIFIED ]</span>
              <span className="bg-[#0F7B6C] text-white text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded border border-[#22C55E]/40">
                VERIFIED EVALUATION
              </span>
            </div>
            
            <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              شهادة تقييم <span className="text-[#d4ff00]">مستوى لاعب البادل</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-xl">
              تم تشخيص كفاءتك الفنية بدقة عبر المحاور الخمسة الأساسية لرياضة البادل. إليك تصنيفك الرقمي المعتمد وفق سلم Playtomic الدولي وبرنامجك التدريبي المقترح.
            </p>

            {/* Playtomic Badge Highlight */}
            <div className="inline-flex items-center gap-3 p-3 bg-white/[0.03] border border-[#d4ff00]/30 rounded-lg">
              <Award className="w-6 h-6 text-[#d4ff00]" />
              <div className="text-right">
                <span className="font-mono-tag text-[10px] text-[#f8f9fa]/50 block uppercase">PLAYTOMIC EQUIVALENT RATING</span>
                <span className="text-lg font-black text-[#d4ff00]">
                  Playtomic Level {testResult.playtomicScore ? testResult.playtomicScore.toFixed(2) : '3.80'} • Tier {testResult.playtomicTier || 'C+'}
                </span>
              </div>
            </div>
          </div>

          {/* Level Badge Block */}
          <div className="bg-[#070809] border-2 border-[#d4ff00] p-6 rounded-lg text-center min-w-[260px] space-y-3 shadow-[0_0_25px_rgba(212,255,0,0.15)] relative">
            <div className="absolute top-2 left-2 bg-[#d4ff00] text-black font-mono-tag font-black text-[9px] px-1.5 py-0.5 rounded">
              CERTIFIED
            </div>

            <span className="font-mono-tag text-[10px] text-[#f8f9fa]/50 uppercase block">ASSIGNED TRAINING STAGE</span>
            
            <div className="font-alexandria font-black text-6xl text-[#d4ff00] my-1 tracking-tighter">
              {code}
            </div>

            <h3 className="font-bold text-base text-white">
              {levelInfo.titleAr}
            </h3>
            <p className="text-xs text-[#22C55E] font-mono-tag font-bold">
              {levelInfo.playtomicTier} • Playtomic {levelInfo.playtomicEquivalent}
            </p>

            <div className="pt-3 border-t border-[rgba(248,249,250,0.08)] grid grid-cols-2 gap-4 font-mono-tag text-xs">
              <div>
                <span className="text-[#f8f9fa]/40 text-[9px] block">TOTAL SCORE</span>
                <span className="text-white font-bold">{testResult.totalScore}/80</span>
              </div>
              <div className="border-r border-white/10 pr-4">
                <span className="text-[#f8f9fa]/40 text-[9px] block">INDEX RATIO</span>
                <span className="text-[#d4ff00] font-bold">{testResult.percentage}%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5 Pillars Performance Dashboard */}
      <div className="card-dark p-6 sm:p-8 rounded-lg space-y-6 border border-[rgba(248,249,250,0.1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(248,249,250,0.08)] pb-4">
          <div>
            <span className="label-mono">[ TECHNICAL PILLARS BREAKDOWN ]</span>
            <h2 className="font-alexandria font-bold text-xl text-white">تحليل أداء المحاور الخمسة الأساسية (5 Pillars of Padel)</h2>
          </div>
          <span className="font-mono-tag text-xs text-[#d4ff00]">
            5 / 5 PILLARS EVALUATED
          </span>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSESSMENT_PILLARS.map((pillar) => {
            const detail = testResult.pillarBreakdown?.[pillar.key] || {
              key: pillar.key,
              nameAr: pillar.shortTitleAr,
              score: Math.round(testResult.totalScore / 5),
              maxScore: 16,
              percentage: testResult.percentage,
              playtomicScore: testResult.playtomicScore || 3.5,
              tier: testResult.playtomicTier || 'C',
              tierAr: `Tier ${testResult.playtomicTier || 'C'}`
            };

            return (
              <div 
                key={pillar.key} 
                className="bg-white/[0.02] border border-[rgba(248,249,250,0.08)] hover:border-[#d4ff00]/40 p-5 rounded-lg space-y-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center">
                      {getPillarIcon(pillar.key)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {pillar.shortTitleAr}
                      </h4>
                      <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">
                        محور {pillar.pillarNumber} من 5
                      </span>
                    </div>
                  </div>

                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono-tag text-[10px] text-[#d4ff00] font-bold">
                    Tier {detail.tier}
                  </span>
                </div>

                <p className="text-[11px] text-[#f8f9fa]/60 line-clamp-2 leading-relaxed">
                  {pillar.descriptionAr}
                </p>

                {/* Score & Progress */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono-tag">
                    <span className="text-[#f8f9fa]/40">SCORE & RATING</span>
                    <span className="text-white font-bold">
                      {detail.score} / 16 PTS • <span className="text-[#d4ff00]">PT {detail.playtomicScore.toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#d4ff00] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(212,255,0,0.5)]"
                      style={{ width: `${detail.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono-tag text-[#f8f9fa]/40">
                    <span>نسبة الإتقان: {detail.percentage}%</span>
                    <span>{detail.tierAr}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Overall Benchmark Summary Card */}
          <div className="bg-[#0F7B6C]/20 border border-[#22C55E]/40 p-5 rounded-lg space-y-3 flex flex-col justify-between">
            <div>
              <span className="label-mono text-[#22C55E]">[ PLAYTOMIC SUMMARY ]</span>
              <h4 className="font-bold text-sm text-white mt-1">خلاصة تقييم الأداء التراكمي</h4>
              <p className="text-[11px] text-white/70 mt-1 leading-relaxed">
                معدلك العام يضعك بين صفوف لاعبي {levelInfo.titleAr} مع قدرة تنافسية على خوض مباريات الفئة المحددة.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono-tag text-xs">
              <span className="text-white/60">PLAYTOMIC RATING</span>
              <span className="text-[#d4ff00] font-black text-sm">{testResult.playtomicScore ? testResult.playtomicScore.toFixed(2) : '3.80'} / 7.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis & Feedback */}
      <div className="card-dark p-6 sm:p-8 rounded-lg space-y-6 border border-[rgba(248,249,250,0.1)]">
        
        <div className="flex items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-4">
          <div>
            <span className="label-mono">[ DIAGNOSTIC REPORT & COACHING FEEDBACK ]</span>
            <h2 className="font-alexandria font-bold text-xl text-white">تقرير التحليل التكتيكي وتوجيهات الكوتش</h2>
          </div>
          <span className="font-mono-tag text-[11px] text-[#f8f9fa]/40">
            DATE: {new Date(testResult.takenAt).toLocaleDateString('ar-EG')}
          </span>
        </div>

        {/* Coach Message Card */}
        <div className="bg-[#d4ff00]/[0.05] border border-[#d4ff00]/30 p-5 rounded-lg text-xs sm:text-sm text-[#f8f9fa] leading-relaxed space-y-2">
          <p className="font-mono-tag text-xs font-bold text-[#d4ff00] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-[#d4ff00]" />
            <span>[ TACTICAL COACH DIRECTIVE / توجيهات المدرب المعتمد ]</span>
          </p>
          <p className="text-[#f8f9fa]/90 leading-relaxed">{testResult.personalizedMessage}</p>
        </div>

        {/* Strengths and Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="bg-white/[0.02] border border-[rgba(248,249,250,0.08)] p-6 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-[#d4ff00]">
              <CheckCircle className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">نقاط القوة التنافسية المكتشفة</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#f8f9fa]/80">
              {testResult.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#d4ff00] font-mono-tag font-bold">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-[rgba(248,249,250,0.08)] p-6 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-bold text-sm text-white">أولويات التدريب ومعالجة الثغرات</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#f8f9fa]/80">
              {testResult.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-mono-tag font-bold">!</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Characteristics */}
        <div className="pt-4 border-t border-[rgba(248,249,250,0.08)] space-y-3">
          <span className="label-mono">[ BENCHMARKS FOR STAGE {code} ]</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-tag text-xs">
            {levelInfo.characteristicsAr.map((char, idx) => (
              <div key={idx} className="bg-white/[0.02] p-3 rounded border border-[rgba(248,249,250,0.06)] text-[#f8f9fa]/80 flex items-center gap-2.5">
                <span className="text-[#d4ff00] font-bold">•</span>
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Action Hub - Unlocked Training Program Banner */}
      <div className="card-dark p-6 sm:p-8 rounded-lg space-y-5 border border-[#d4ff00]/30 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="label-mono text-[#d4ff00]">[ TRAINING PROGRAM UNLOCKED ]</span>
              <span className="bg-[#d4ff00] text-black font-mono-tag text-[10px] font-black px-2 py-0.5 rounded">
                STAGE {code} ACTIVE
              </span>
            </div>
            <h3 className="font-alexandria font-bold text-xl text-white mt-1">
              تم تفعيل خطتك التدريبية المخصصة: {levelInfo.titleAr}
            </h3>
            <p className="text-xs text-[#f8f9fa]/70 mt-1 max-w-xl">
              تم تجهيز برنامج تدريبي مكثف لمدة {levelInfo.recommendedProgramWeeks} أسابيع يركز على معالجة نقاط الضعف وصقل الكفاءات الخمس لبلوغ المستوى التالي.
            </p>
          </div>

          <button
            onClick={() => navigateTo('my-training-program')}
            className="btn-neon px-8 py-4 text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(212,255,0,0.3)]"
          >
            <Trophy className="w-4 h-4 fill-black" />
            <span>ابدأ البرنامج التدريبي فوراً</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(248,249,250,0.08)]">
          <button
            onClick={() => navigateTo('my-training-program')}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-4 rounded-lg flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">جدول الحصص الأسبوعية</span>
              <span className="text-[10px] font-mono-tag text-[#d4ff00]">{levelInfo.recommendedProgramWeeks} أسابيع تدريبية مبرمجة</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-[#d4ff00]" />
          </button>

          <button
            onClick={() => navigateTo('video-tutorials')}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-4 rounded-lg flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">مكتبة التمارين المرئية (YouTube)</span>
              <span className="text-[10px] font-mono-tag text-[#d4ff00]">فيديوهات تدريبية لكل محور</span>
            </div>
            <Play className="w-4 h-4 text-[#d4ff00]" />
          </button>

          <button
            onClick={() => navigateTo('progress-tracker')}
            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-4 rounded-lg flex items-center justify-between text-right transition-colors"
          >
            <div>
              <span className="font-bold text-xs text-white block">سجل الحصص والمهارات الـ 12</span>
              <span className="text-[10px] font-mono-tag text-[#d4ff00]">متابعة التطور ومؤشرات الأداء</span>
            </div>
            <TrendingUp className="w-4 h-4 text-[#d4ff00]" />
          </button>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono-tag text-[#f8f9fa]/40">
          <button
            onClick={() => navigateTo('level-test')}
            className="hover:text-[#d4ff00] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>[ إعادة إجراء الاختبار التشخيصي ]</span>
          </button>

          <button
            onClick={handlePrint}
            className="hover:text-white flex items-center gap-1.5 bg-white/[0.04] px-3.5 py-1.5 rounded border border-white/10"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة شهادة التقييم المعتمدة</span>
          </button>
        </div>

      </div>

    </div>
  );
};
