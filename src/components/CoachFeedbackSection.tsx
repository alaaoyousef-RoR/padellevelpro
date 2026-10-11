import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CoachFeedbackData } from '../types';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle2, 
  Lightbulb, 
  Users, 
  Quote, 
  MessageSquare, 
  Send, 
  ArrowLeft,
  Flame,
  Zap,
  Activity
} from 'lucide-react';

export const CoachFeedbackSection: React.FC = () => {
  const { user, testResult, navigateTo } = useApp();
  const [feedback, setFeedback] = useState<CoachFeedbackData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [askingCoach, setAskingCoach] = useState<boolean>(false);
  const [coachAnswer, setCoachAnswer] = useState<string | null>(null);

  const cacheKey = `padellevel_coach_feedback_${user?.id || 'guest'}`;

  // Load from cache or trigger generation if test result exists
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setFeedback(parsed);
        return;
      } catch (e) {
        // invalid cache, will refetch
      }
    }

    if (testResult) {
      fetchCoachFeedback(false);
    }
  }, [testResult?.takenAt, user?.id]);

  const fetchCoachFeedback = async (force: boolean = false) => {
    if (!testResult && !user?.testTaken) return;

    setLoading(true);
    setError(null);

    // Build data payload
    const effectiveResult = testResult || {
      totalScore: user?.testScore || 56,
      maxScore: 80,
      percentage: Math.round(((user?.testScore || 56) / 80) * 100),
      levelNumber: user?.levelNumber || 3,
      levelTitle: user?.padelLevel || 'المستوى المتوسط',
      playtomicScore: user?.playtomicScore || 3.85,
      playtomicTier: user?.playtomicTier || 'C+',
      pillarBreakdown: user?.pillarBreakdown || {},
      strengths: user?.strengths || ['الروح القتالية', 'التمركز عند الشبكة'],
      weaknesses: user?.weaknesses || ['ارتداد الزجاج المزدوج', 'ثبات البانديخا'],
      takenAt: user?.testResultDate || new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/coach-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testResult: effectiveResult,
          playerName: user?.fullName || 'كابتن البادل',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: CoachFeedbackData = await response.json();
      data.generatedAt = new Date().toISOString();
      setFeedback(data);
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err: any) {
      console.error('Failed to fetch coach feedback:', err);
      setError('تعذر تحميل توجيهات الكوتش مؤقتاً. اضغط على إعادة المحاولة.');
    } finally {
      setLoading(false);
    }
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || askingCoach) return;

    setAskingCoach(true);
    try {
      const response = await fetch('/api/coach-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQuestion.trim(),
          currentPillar: feedback?.recommendedPillarNameAr || 'تكتيكات البادل',
          playerName: user?.fullName || 'كابتن',
        }),
      });

      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setCoachAnswer(data.answerAr);
      setUserQuestion('');
    } catch (err) {
      setCoachAnswer('تذكر دائماً أن التحكم في مسار الكرة والهدوء عند الزجاج يمنحك أفضلية على الخصم المتعجل!');
    } finally {
      setAskingCoach(false);
    }
  };

  const quickQuestions = [
    'كيف أتفادى أخطاء الزجاج المزدوج؟',
    'ما هي أفضل استراتيجية لنقطة الذهب؟',
    'كيف أضرب البانديخا بعمق دون ارتداد عالٍ؟',
    'نصيحة لتحسين استقبال الإرسال المائل؟'
  ];

  // If user has not taken the test yet
  if (!testResult && !user?.testTaken) {
    return (
      <div className="card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-6 relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4ff00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded bg-[#d4ff00]/10 text-[#d4ff00]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <span className="label-mono mb-0">[ AI TACTICAL COACH • كوتش البادل الذكي ]</span>
              <h2 className="font-alexandria font-bold text-lg text-white">
                توجيهات الكوتش الذكي (AI Coach Feedback)
              </h2>
            </div>
          </div>
          <span className="font-mono-tag text-xs text-white/50 border border-white/10 px-2.5 py-1 rounded">
            GEMINI POWERED
          </span>
        </div>

        <div className="py-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 mx-auto flex items-center justify-center text-[#d4ff00]">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="font-alexandria font-bold text-xl text-white">
            تحليل ذكي مخصص لنقاط قوتك وثغراتك الفنية
          </h3>
          <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed">
            يستخدم الكوتش الذكي نموذج Gemini لتحليل إجاباتك عبر الركائز الخمس (الإرسال، الشبكة، الكرات العلوية، ارتداد الزجاج، والتمركز التكتيكي)، ويحدد بدقة المحور الذي سيعطي قفزة نوعية في تصنيفك على سلم Playtomic.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('level-test')}
              className="btn-neon px-6 py-3 text-xs font-bold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>خوض اختبار تقييم المستوى (20 سؤالاً)</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark p-6 sm:p-8 rounded-lg border border-[#d4ff00]/20 space-y-8 relative overflow-hidden text-right shadow-[0_0_50px_rgba(212,255,0,0.03)]">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#d4ff00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#0F7B6C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] shadow-[0_0_15px_rgba(212,255,0,0.2)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="label-mono mb-0 text-[#d4ff00]">[ AI TACTICAL ADVISORY ]</span>
              <span className="text-[10px] font-mono-tag bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded text-white/70">
                GEMINI 3.8 FLASH
              </span>
            </div>
            <h2 className="font-alexandria font-bold text-xl text-white mt-1">
              توجيهات الكوتش الذكي وتحليل الأولويات
            </h2>
          </div>
        </div>

        <button
          onClick={() => fetchCoachFeedback(true)}
          disabled={loading}
          className="px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4ff00]/40 rounded text-xs font-mono-tag text-[#d4ff00] flex items-center gap-2 transition-all disabled:opacity-50 self-end sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'جاري التحليل...' : 'تحديث التحليل الفني'}</span>
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && !feedback && (
        <div className="py-12 text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#d4ff00] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-alexandria text-sm text-[#f8f9fa]/80">
            يقوم كوتش الذكاء الاصطناعي بدراسة إجاباتك الفنية وتحليل أرقام Playtomic...
          </p>
          <span className="text-xs text-white/40 font-mono-tag block">
            EVALUATING 5 TECHNICAL PILLARS & ERROR FREQUENCY
          </span>
        </div>
      )}

      {/* Error state */}
      {error && !feedback && (
        <div className="p-4 rounded bg-red-500/10 border border-red-500/30 text-red-200 text-xs text-center space-y-2">
          <p>{error}</p>
          <button
            onClick={() => fetchCoachFeedback(true)}
            className="text-[#d4ff00] underline font-bold"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Content Display */}
      {feedback && (
        <div className="space-y-6">
          
          {/* Main Focus Pillar Banner */}
          <div className="p-6 sm:p-7 rounded-xl bg-gradient-to-l from-white/[0.04] to-white/[0.01] border-2 border-[#d4ff00]/30 relative overflow-hidden space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-[#d4ff00] text-black text-[11px] font-mono-tag font-black tracking-wide">
                    PRIMARY PRIORITY
                  </span>
                  <span className="text-xs font-mono-tag text-[#d4ff00]">
                    [ المحور ذو الأولوية القصوى للتدريب ]
                  </span>
                </div>
                <h3 className="font-alexandria font-extrabold text-xl sm:text-2xl text-white">
                  {feedback.recommendedPillarNameAr}
                </h3>
              </div>

              <div className="flex items-center gap-2 bg-[#d4ff00]/10 border border-[#d4ff00]/40 px-3.5 py-2 rounded-lg self-start md:self-auto">
                <TrendingUp className="w-4 h-4 text-[#d4ff00]" />
                <span className="text-xs font-mono-tag font-bold text-[#d4ff00]">
                  {feedback.playtomicGrowthPotential}
                </span>
              </div>
            </div>

            {/* Coach Headline & Urgency Rationale */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#d4ff00] shrink-0 mt-0.5" />
                <h4 className="font-alexandria font-bold text-base sm:text-lg text-[#d4ff00] leading-snug">
                  {feedback.headlineAr}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#f8f9fa]/80 leading-relaxed pr-8">
                {feedback.urgencyReasonAr}
              </p>
            </div>
          </div>

          {/* Detailed Tactical Evaluation */}
          <div className="card-dark p-6 rounded-lg border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Activity className="w-4 h-4 text-[#d4ff00]" />
              <h4 className="font-alexandria font-bold text-sm">
                التقرير الفني الشامل لحركة الملعب:
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#f8f9fa]/75 leading-relaxed">
              {feedback.detailedAnalysisAr}
            </p>
          </div>

          {/* Targeted Weekly Action Plan */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#d4ff00]" />
                <h4 className="font-alexandria font-bold text-sm text-white">
                  خطة التمارين الموجهة لهذا الأسبوع (Drills & Action Items):
                </h4>
              </div>
              <span className="text-[11px] font-mono-tag text-white/40">
                {feedback.weeklyActionPlan?.length || 0} EXERCISES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedback.weeklyActionPlan?.map((item, index) => (
                <div
                  key={index}
                  className="card-dark p-4 rounded-lg border border-white/10 hover:border-[#d4ff00]/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tag text-[10px] text-[#d4ff00] bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                        DRILL 0{index + 1}
                      </span>
                      <span className="font-mono-tag text-[10px] text-white/50">
                        {item.repsOrDuration}
                      </span>
                    </div>

                    <h5 className="font-alexandria font-bold text-xs sm:text-sm text-white">
                      {item.titleAr}
                    </h5>

                    <p className="text-[11px] text-[#f8f9fa]/70 leading-relaxed">
                      {item.focusGoalAr}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-start gap-1.5 text-[11px] text-[#d4ff00]/90">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{item.proTipAr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Synergy & Motivational Quote in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Partner Synergy */}
            <div className="card-dark p-5 rounded-lg border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-white">
                <Users className="w-4 h-4 text-[#d4ff00]" />
                <h5 className="font-alexandria font-bold text-xs sm:text-sm">
                  التناغم مع الزميل في المباريات:
                </h5>
              </div>
              <p className="text-xs text-[#f8f9fa]/70 leading-relaxed">
                {feedback.partnerTacticsAr}
              </p>
            </div>

            {/* Coach Motivational Quote */}
            <div className="card-dark p-5 rounded-lg border border-white/10 bg-white/[0.01] space-y-2 relative">
              <Quote className="w-5 h-5 text-[#d4ff00]/30 absolute top-4 left-4" />
              <div className="flex items-center gap-2 text-[#d4ff00]">
                <Zap className="w-4 h-4" />
                <h5 className="font-alexandria font-bold text-xs sm:text-sm">
                  عقلية البادل الاحترافية (Coach Mindset):
                </h5>
              </div>
              <p className="text-xs text-white/90 italic font-alexandria leading-relaxed">
                "{feedback.motivationalQuoteAr}"
              </p>
            </div>
          </div>

          {/* Interactive "Ask Coach AI" Box */}
          <div className="card-dark p-5 rounded-lg border border-white/10 space-y-4 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#d4ff00]" />
              <h5 className="font-alexandria font-bold text-xs sm:text-sm text-white">
                اسأل الكوتش سؤالاً تكتيكياً فورياً:
              </h5>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setUserQuestion(q)}
                  className="text-[11px] px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4ff00]/30 text-white/80 transition-all text-right"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Question Form */}
            <form onSubmit={handleAskCoach} className="flex gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="اكتب سؤالك للكوتش (مثال: كيف أتحرك مع زميلي بعد اللوب؟)..."
                className="flex-1 bg-black/40 border border-white/10 focus:border-[#d4ff00] rounded px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={askingCoach || !userQuestion.trim()}
                className="btn-neon px-4 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              >
                {askingCoach ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>إرسال</span>
                    <Send className="w-3.5 h-3.5 rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Answer Display */}
            {coachAnswer && (
              <div className="p-3.5 rounded bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-xs text-white leading-relaxed flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4ff00] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#d4ff00] block mb-1">
                    إجابة كوتش البادل:
                  </span>
                  <p className="text-[#f8f9fa]/90">{coachAnswer}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
