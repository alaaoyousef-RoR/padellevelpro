import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSESSMENT_QUESTIONS, ASSESSMENT_PILLARS, calculateTestResult } from '../data/assessmentData';
import { PillarKey } from '../types';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  Zap,
  Shield,
  Flame,
  Activity,
  Target,
  Sparkles,
  Info
} from 'lucide-react';

export const LevelTestPage: React.FC = () => {
  const { saveAssessmentResult, navigateTo } = useApp();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Current pillar details
  const currentPillar = ASSESSMENT_PILLARS.find(p => p.key === currentQuestion.category) || ASSESSMENT_PILLARS[0];

  // Get icon for pillar
  const getPillarIcon = (key: PillarKey) => {
    switch (key) {
      case 'serve_return': return <Zap className="w-4 h-4 text-[#d4ff00]" />;
      case 'net_volleys': return <Shield className="w-4 h-4 text-[#d4ff00]" />;
      case 'overhead_shots': return <Flame className="w-4 h-4 text-[#d4ff00]" />;
      case 'wall_defense': return <Activity className="w-4 h-4 text-[#d4ff00]" />;
      case 'tactics_positioning': return <Target className="w-4 h-4 text-[#d4ff00]" />;
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
    setErrorMessage('');
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      setErrorMessage('يرجى اختيار الإجابة الأكثر دقة التي تصف أداءك الحقيقي في هذا الموقف للمتابعة.');
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmitTest();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setErrorMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitTest = () => {
    const missingQuestions = ASSESSMENT_QUESTIONS.filter(q => answers[q.id] === undefined);
    if (missingQuestions.length > 0) {
      setErrorMessage(`تبقى لديك ${missingQuestions.length} أسئلة دون إجابة.`);
      return;
    }

    const calculated = calculateTestResult(answers);
    saveAssessmentResult(calculated);
    navigateTo('test-result');
  };

  const qNum = currentQuestionIndex + 1 < 10 ? `0${currentQuestionIndex + 1}` : `${currentQuestionIndex + 1}`;

  return (
    <div className="max-w-4xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Top Header Cockpit Card */}
      <div className="card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#d4ff00]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="label-mono">[ PLAYTOMIC BENCHMARK SYSTEM ]</span>
              <span className="bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded">
                20 Q COMPETENCY TEST
              </span>
            </div>
            <h1 className="font-alexandria font-black text-2xl sm:text-3xl text-white tracking-tight">
              اختبار تقييم مستوى لاعب البادل المعتمد
            </h1>
            <p className="text-xs text-[#f8f9fa]/60 mt-1 max-w-xl">
              تمت هيكلة هذا الاختبار وفق معايير Playtomic الدولية على 5 محاور تقنية رئيسية لتشخيص مستواك وتوليد برنامجك التدريبي.
            </p>
          </div>

          <div className="flex items-center gap-4 font-mono-tag text-xs self-start sm:self-center">
            <div className="bg-white/[0.04] border border-[rgba(248,249,250,0.08)] px-3 py-2 rounded">
              <span className="text-[#f8f9fa]/40 block text-[10px]">PROGRESS</span>
              <span className="text-[#d4ff00] font-bold">{answeredCount} / {totalQuestions} Q</span>
            </div>
            <div className="bg-white/[0.04] border border-[rgba(248,249,250,0.08)] px-3 py-2 rounded">
              <span className="text-[#f8f9fa]/40 block text-[10px]">BENCHMARK</span>
              <span className="text-white font-bold">PLAYTOMIC 1.0 - 7.0</span>
            </div>
          </div>
        </div>

        {/* 5 Pillars Quick Tracker Indicator */}
        <div className="pt-3 border-t border-[rgba(248,249,250,0.08)]">
          <div className="text-[11px] font-mono-tag text-[#f8f9fa]/60 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#d4ff00] font-bold">
              {getPillarIcon(currentQuestion.category)}
              <span>المحور {currentPillar.pillarNumber} من 5: {currentPillar.shortTitleAr}</span>
            </span>
            <span>السؤال [{qNum}/20] • {progressPercent}%</span>
          </div>

          {/* Pillars Visual Track */}
          <div className="grid grid-cols-5 gap-2">
            {ASSESSMENT_PILLARS.map((p) => {
              const questionsInPillar = ASSESSMENT_QUESTIONS.filter(q => q.category === p.key);
              const answeredInPillar = questionsInPillar.filter(q => answers[q.id] !== undefined).length;
              const isCurrentPillar = p.key === currentQuestion.category;

              return (
                <div 
                  key={p.key} 
                  className={`p-1.5 rounded border transition-all text-center ${
                    isCurrentPillar 
                      ? 'border-[#d4ff00] bg-[#d4ff00]/10' 
                      : answeredInPillar === 4 
                      ? 'border-emerald-500/40 bg-emerald-950/20' 
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold">
                    <span className={isCurrentPillar ? 'text-[#d4ff00]' : answeredInPillar === 4 ? 'text-emerald-400' : 'text-white/40'}>
                      {p.shortTitleAr}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-[#d4ff00] h-full transition-all duration-300"
                      style={{ width: `${(answeredInPillar / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neon Main Progress Bar */}
        <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#d4ff00] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(212,255,0,0.6)]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="card-dark p-6 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-8 relative">
        
        {/* Category & Step Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono-tag text-[11px] text-[#0b0c0d] bg-[#d4ff00] font-black px-2.5 py-1 rounded flex items-center gap-1.5">
              {getPillarIcon(currentQuestion.category)}
              <span>محور {currentPillar.pillarNumber}: {currentQuestion.categoryAr}</span>
            </span>
            <span className="font-mono-tag text-xs text-[#f8f9fa]/40">
              سؤال #{currentQuestion.id} من 20
            </span>
          </div>

          <span className="font-mono-tag text-[11px] text-white/50 bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded">
            سؤال {((currentQuestionIndex % 4) + 1)} من 4 في هذا المحور
          </span>
        </div>

        {/* Tactical Game Scenario Callout */}
        {currentQuestion.scenarioAr && (
          <div className="bg-[#0F7B6C]/10 border border-[#0F7B6C]/40 p-4 rounded-lg flex items-start gap-3 text-right">
            <Info className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono-tag text-[#22C55E] block uppercase font-bold">
                [ GAME SCENARIO / سيناريو اللعب العملي ]
              </span>
              <p className="text-xs text-white/90 leading-relaxed mt-0.5">
                {currentQuestion.scenarioAr}
              </p>
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-2">
          <h2 className="font-black text-xl sm:text-2xl text-white leading-relaxed">
            {currentQuestion.questionAr}
          </h2>
          {currentQuestion.hintAr && (
            <p className="text-xs text-[#f8f9fa]/60 flex items-center gap-1.5 font-medium pt-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#d4ff00] flex-shrink-0" />
              <span>معيار التقييم: {currentQuestion.hintAr}</span>
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 sm:p-5 rounded-lg border text-right transition-all flex items-start gap-4 cursor-pointer relative ${
                  isSelected
                    ? 'border-[#d4ff00] bg-[#d4ff00]/[0.08] text-white shadow-[0_0_20px_rgba(212,255,0,0.15)] ring-1 ring-[#d4ff00]/50'
                    : 'border-[rgba(248,249,250,0.08)] bg-white/[0.02] hover:bg-white/[0.05] hover:border-[rgba(248,249,250,0.2)] text-[#f8f9fa]/80'
                }`}
              >
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center border font-mono-tag text-[10px] font-bold ${
                  isSelected
                    ? 'border-[#d4ff00] bg-[#d4ff00] text-[#0b0c0d]'
                    : 'border-white/20 bg-transparent text-transparent'
                }`}>
                  ✓
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-semibold leading-relaxed ${isSelected ? 'text-[#d4ff00]' : 'text-white'}`}>
                      {option.text}
                    </span>
                  </div>

                  {option.tierTag && (
                    <div className="flex items-center gap-2 pt-1 font-mono-tag text-[10px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isSelected 
                          ? 'bg-[#d4ff00]/20 text-[#d4ff00] border border-[#d4ff00]/40' 
                          : 'bg-white/5 text-white/50 border border-white/10'
                      }`}>
                        {option.tierTag}
                      </span>
                      <span className="text-white/30">
                        [+{option.score} نقطة]
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-red-950/40 border border-red-800 text-red-300 p-3.5 rounded-lg text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-6 border-t border-[rgba(248,249,250,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`w-full sm:w-auto px-6 py-3.5 rounded text-xs font-mono-tag uppercase transition-colors flex items-center justify-center gap-2 ${
              currentQuestionIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#f8f9fa]/40 border border-white/5'
                : 'btn-outline-ink'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>السابق (PREV)</span>
          </button>

          {/* Quick jump indicators */}
          <div className="hidden lg:flex items-center gap-1 font-mono-tag">
            {ASSESSMENT_QUESTIONS.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-6 h-6 rounded text-[9px] font-bold transition-all ${
                    isCurrent
                      ? 'bg-[#d4ff00] text-[#0b0c0d]'
                      : isAnswered
                      ? 'bg-[#0F7B6C] text-white border border-[#22C55E]/40'
                      : 'bg-white/[0.03] text-white/30 hover:bg-white/[0.08]'
                  }`}
                  title={`سؤال ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="btn-neon w-full sm:w-auto px-8 py-3.5 text-xs font-extrabold flex items-center justify-center gap-2"
          >
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                <span>السؤال التالي (NEXT)</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>إصدار تقرير Playtomic المعتمد</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
