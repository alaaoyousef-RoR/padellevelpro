import React from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_LEVELS } from '../data/assessmentData';
import { CoachFeedbackSection } from '../components/CoachFeedbackSection';
import { 
  Trophy, 
  Activity, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock, 
  Zap,
  Play
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, testResult, trainingSessions, masteredSkills, navigateTo } = useApp();

  const playerName = user?.fullName || 'كابتن البادل';
  const hasTakenTest = !!testResult || !!user?.testTaken;
  const levelNum = testResult?.levelNumber || user?.levelNumber || 1;
  const levelInfo = PADEL_LEVELS[levelNum];
  const code = levelNum < 10 ? `0${levelNum}` : `${levelNum}`;

  const totalSessions = trainingSessions.length;
  const totalMinutes = trainingSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto py-4 text-right space-y-8">
      
      {/* Welcome Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="label-mono">[ ATHLETE COMMAND CENTER ]</span>
            <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight">
              مرحباً بك مجدداً، <span className="text-[#d4ff00]">{playerName}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-xl">
              إليك ملخص مؤشراتك الفنية، ساعات التدريب المسجلة، والخطوات التكتيكية المقترحة لهذا الأسبوع.
            </p>
          </div>

          <button
            onClick={() => navigateTo('my-training-program')}
            className="btn-neon px-6 py-3.5 text-xs font-black flex items-center gap-2 whitespace-nowrap"
          >
            <Trophy className="w-4 h-4" />
            <span>متابعة خطة التدريب</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Status Card + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Level Card */}
        <div className="lg:col-span-5 card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-4">
            <div>
              <span className="label-mono">[ ACTIVE CLASSIFICATION ]</span>
              <h2 className="font-alexandria font-bold text-lg text-white">مستواك الحالي في البادل</h2>
            </div>
            <span className="font-mono-tag text-xs text-[#d4ff00]">
              {hasTakenTest ? 'CERTIFIED' : 'PENDING'}
            </span>
          </div>

          {hasTakenTest ? (
            <div className="space-y-6">
              <div className="bg-white/[0.02] p-6 rounded-lg border border-[#d4ff00]/30 text-center space-y-2">
                <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">OFFICIAL RATING</span>
                <div className="font-alexandria font-black text-6xl text-[#d4ff00] my-1">
                  {code}
                </div>
                <h3 className="font-bold text-base text-white">
                  {levelInfo.titleAr}
                </h3>
                <p className="font-mono-tag text-xs text-[#d4ff00]">
                  {levelInfo.subtitleAr}
                </p>

                <div className="inline-block mt-1 px-3 py-1 bg-white/[0.04] border border-[#d4ff00]/30 rounded text-[11px] font-mono-tag text-[#22C55E]">
                  Playtomic Level {testResult?.playtomicScore ? testResult.playtomicScore.toFixed(2) : (user?.playtomicScore ? user.playtomicScore.toFixed(2) : levelInfo.playtomicEquivalent)} • Tier {testResult?.playtomicTier || user?.playtomicTier || levelInfo.playtomicTier}
                </div>

                {testResult && (
                  <div className="pt-4 border-t border-[rgba(248,249,250,0.08)] flex justify-center gap-8 font-mono-tag text-xs">
                    <div>
                      <span className="text-[#f8f9fa]/40 text-[9px] block">TOTAL SCORE</span>
                      <span className="text-white font-bold">{testResult.totalScore}/80</span>
                    </div>
                    <div className="border-r border-white/10 pr-8">
                      <span className="text-[#f8f9fa]/40 text-[9px] block">ACCURACY</span>
                      <span className="text-[#d4ff00] font-bold">{testResult.percentage}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono-tag">
                <button
                  onClick={() => navigateTo('test-result')}
                  className="btn-outline-ink py-2.5 text-center text-xs justify-center"
                >
                  DIAGNOSTIC REPORT
                </button>
                <button
                  onClick={() => navigateTo('level-test')}
                  className="py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-[#d4ff00] border border-[#d4ff00]/30 rounded text-center text-xs justify-center font-bold"
                >
                  RETAKE TEST
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded text-center space-y-4">
              <span className="font-alexandria text-4xl block opacity-30">??</span>
              <p className="text-xs text-[#f8f9fa]/60">
                لم تقم بإجراء اختبار المستوى بعد. خض التقييم المعتمد الآن.
              </p>
              <button
                onClick={() => navigateTo('level-test')}
                className="btn-neon w-full py-3 text-xs justify-center"
              >
                ابدأ الاختبار الآن
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Quick Stats & Shortcuts */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick 3 Metrics */}
          <div className="grid grid-cols-3 gap-4 font-mono-tag">
            <div className="card-dark p-4 rounded-lg border border-[rgba(248,249,250,0.08)] text-right">
              <span className="label-mono mb-1">SESSIONS</span>
              <p className="font-alexandria font-black text-2xl text-white mt-1">{totalSessions}</p>
              <span className="text-[10px] text-[#f8f9fa]/40">حصة في الملعب</span>
            </div>

            <div className="card-dark p-4 rounded-lg border border-[rgba(248,249,250,0.08)] text-right">
              <span className="label-mono mb-1">HOURS</span>
              <p className="font-alexandria font-black text-2xl text-[#d4ff00] mt-1">{totalHours}</p>
              <span className="text-[10px] text-[#f8f9fa]/40">ساعة تدريب</span>
            </div>

            <div className="card-dark p-4 rounded-lg border border-[rgba(248,249,250,0.08)] text-right">
              <span className="label-mono mb-1">SKILLS</span>
              <p className="font-alexandria font-black text-2xl text-white mt-1">{masteredSkills.length}/12</p>
              <span className="text-[10px] text-[#d4ff00]">مهارة متقنة</span>
            </div>
          </div>

          {/* Quick Hub Grid */}
          <div className="card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-4">
            <span className="label-mono">[ QUICK NAVIGATION ]</span>
            <h3 className="font-alexandria font-bold text-base text-white">الوصول السريع إلى الأقسام:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo('my-training-program')}
                className="p-4 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4ff00]/40 text-right transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#d4ff00]">برنامجي التدريبي المخصص</h4>
                  <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">تمارين الأسبوع وإرشادات الكوتش</p>
                </div>
                <Trophy className="w-4 h-4 text-[#d4ff00]" />
              </button>

              <button
                onClick={() => navigateTo('learn-padel')}
                className="p-4 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4ff00]/40 text-right transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#d4ff00]">موسوعة المهارات والتكنيك</h4>
                  <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">شرح البانديخا والفيبورا والزجاج</p>
                </div>
                <BookOpen className="w-4 h-4 text-[#d4ff00]" />
              </button>

              <button
                onClick={() => navigateTo('progress-tracker')}
                className="p-4 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4ff00]/40 text-right transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#d4ff00]">متتبع التقدم وسجل التمارين</h4>
                  <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">تسجيل الحصص وقائمة المهارات</p>
                </div>
                <TrendingUp className="w-4 h-4 text-[#d4ff00]" />
              </button>

              <button
                onClick={() => navigateTo('video-tutorials')}
                className="p-4 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#d4ff00]/40 text-right transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#d4ff00]">مكتبة الفيديو التدريبية</h4>
                  <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5">شروحات ومحاكاة حركة الملعب</p>
                </div>
                <Play className="w-4 h-4 text-[#d4ff00]" />
              </button>
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-4">
            <span className="label-mono">[ ACTIVE ACTION ITEMS ]</span>
            <h3 className="font-alexandria font-bold text-base text-white">المهام التدريبية الموصى بها لهذا الأسبوع:</h3>

            <div className="space-y-2 font-mono-tag text-xs">
              <div className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-[#f8f9fa]/80">
                <div className="flex items-center gap-2">
                  <span className="text-[#d4ff00]">•</span>
                  <span className="font-sans font-semibold">التدرب على الفولي القاطع مع توجيهه للزجاج الجانبي</span>
                </div>
                <span className="text-[#d4ff00]">20 MIN</span>
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-[#f8f9fa]/80">
                <div className="flex items-center gap-2">
                  <span className="text-[#d4ff00]">•</span>
                  <span className="font-sans font-semibold">تطبيق مبدأ الحبل المتصل مع زميلك في مباريات نهاية الأسبوع</span>
                </div>
                <span className="text-white/40">TACTICS</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* AI Coach Feedback Section */}
      <CoachFeedbackSection />

    </div>
  );
};
