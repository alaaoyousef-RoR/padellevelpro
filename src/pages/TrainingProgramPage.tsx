import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TRAINING_PROGRAMS } from '../data/trainingData';
import { PADEL_LEVELS } from '../data/assessmentData';
import { PadelLevelNumber } from '../types';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Target, 
  Printer, 
  Activity, 
  Flame, 
  Sparkles,
  Lightbulb
} from 'lucide-react';

export const TrainingProgramPage: React.FC = () => {
  const { testResult, user, navigateTo } = useApp();

  const initialLevel: PadelLevelNumber = testResult?.levelNumber || user?.levelNumber || 1;
  const [selectedLevel, setSelectedLevel] = useState<PadelLevelNumber>(initialLevel);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  useEffect(() => {
    setActiveWeekIndex(0);
  }, [selectedLevel]);

  const currentProgram = TRAINING_PROGRAMS[selectedLevel] || TRAINING_PROGRAMS[1];
  const levelInfo = PADEL_LEVELS[selectedLevel];
  const currentWeek = currentProgram.weeks[activeWeekIndex] || currentProgram.weeks[0];
  const code = selectedLevel < 10 ? `0${selectedLevel}` : `${selectedLevel}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto py-4 text-right space-y-8">
      
      {/* Notice if unassessed */}
      {!testResult && (
        <div className="card-dark border-[#d4ff00]/30 p-4 sm:p-5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-xs text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2 py-1 rounded">
              NOTICE
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">لم تقم بإجراء اختبار المستوى بعد</h4>
              <p className="text-xs text-[#f8f9fa]/50">
                خض الاختبار لتفعيل برنامجك المخصص تلقائياً. يمكنك تصفح المستويات الـ 5 يدوياً أدناه.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('level-test')}
            className="btn-neon text-xs px-4 py-2 whitespace-nowrap"
          >
            خض الاختبار الآن
          </button>
        </div>
      )}

      {/* Program Header */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono mb-0">[ PROGRAM STAGE {code} ]</span>
              <span className="font-mono-tag text-[10px] bg-white/[0.05] border border-white/10 text-[#d4ff00] font-bold px-2 py-0.5 rounded">
                Playtomic {levelInfo.playtomicEquivalent} • {levelInfo.playtomicTier}
              </span>
              {testResult?.levelNumber === selectedLevel && (
                <span className="font-mono-tag text-[9px] bg-[#d4ff00] text-[#0b0c0d] font-black px-1.5 py-0.5 rounded">
                  YOUR LEVEL
                </span>
              )}
            </div>

            <h1 className="font-alexandria font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              {currentProgram.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed">
              {currentProgram.goal}
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono-tag text-xs text-[#f8f9fa]/60 pt-2">
              <div className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-[#d4ff00]" />
                <span>DURATION: {currentProgram.durationWeeks} WEEKS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded border border-white/5">
                <Clock className="w-3.5 h-3.5 text-[#d4ff00]" />
                <span>FREQUENCY: {currentProgram.sessionsPerWeekText}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('progress-tracker')}
              className="btn-neon px-5 py-3 text-xs justify-center font-bold"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>تسجيل حصة اليوم</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn-outline-ink px-4 py-2.5 text-xs justify-center font-mono-tag"
            >
              <Printer className="w-3.5 h-3.5 inline ml-1.5" />
              <span>PRINT PLAN (PDF)</span>
            </button>
          </div>

        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="card-dark p-1.5 rounded-lg border border-[rgba(248,249,250,0.1)] flex items-center gap-1 overflow-x-auto font-mono-tag">
        {([1, 2, 3, 4, 5] as const).map((lvl) => {
          const isSelected = selectedLevel === lvl;
          const isUserLevel = (testResult?.levelNumber === lvl) || (user?.levelNumber === lvl);
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`flex-1 min-w-[130px] py-2.5 px-3 rounded text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-[#d4ff00] text-[#0b0c0d]'
                  : 'text-[#f8f9fa]/50 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <span>STAGE [0{lvl}]</span>
              {isUserLevel && (
                <span className={`text-[8px] px-1 rounded font-black ${
                  isSelected ? 'bg-black text-[#d4ff00]' : 'bg-[#d4ff00] text-black'
                }`}>
                  YOU
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focus Areas */}
      <div className="card-dark p-6 rounded-lg space-y-4 border border-[rgba(248,249,250,0.08)]">
        <span className="label-mono">[ CORE COMPETENCIES ]</span>
        <h3 className="font-alexandria font-bold text-base text-white">محاور التركيز الرئيسية للبرنامج:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 font-mono-tag text-xs">
          {currentProgram.focusAreas.map((area, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-[rgba(248,249,250,0.06)] p-3 rounded text-[#f8f9fa]/80 flex items-start gap-2">
              <span className="text-[#d4ff00]">•</span>
              <span className="font-sans text-xs">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Breakdown Navigation */}
      <div className="space-y-6">
        <div>
          <span className="label-mono">[ WEEKLY CURRICULUM ]</span>
          <h2 className="font-alexandria font-black text-2xl text-white">الجدول التدريبي الأسبوعي المفصل</h2>
        </div>

        {/* Week Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag">
          {currentProgram.weeks.map((week, idx) => {
            const isWeekActive = activeWeekIndex === idx;
            return (
              <button
                key={week.weekNumber}
                onClick={() => setActiveWeekIndex(idx)}
                className={`py-2 px-4 rounded text-xs transition-all whitespace-nowrap font-bold ${
                  isWeekActive
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-[#f8f9fa]/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                WEEK [{week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}]
              </button>
            );
          })}
        </div>

        {/* Selected Week Card */}
        {currentWeek && (
          <div className="card-dark rounded-lg border border-[rgba(248,249,250,0.1)] divide-y divide-[rgba(248,249,250,0.08)]">
            
            <div className="p-6 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-tag text-[10px] text-[#d4ff00]">
                  WEEK {currentWeek.weekNumber} OF {currentProgram.durationWeeks}
                </span>
                <span className="font-mono-tag text-xs text-[#f8f9fa]/40">
                  {currentWeek.sessionsPerWeek} SESSIONS / WEEK
                </span>
              </div>
              <h3 className="font-alexandria font-bold text-xl text-white">
                {currentWeek.theme}
              </h3>
              <p className="text-xs text-[#f8f9fa]/60 mt-1">
                الهدف: {currentWeek.focus}
              </p>
            </div>

            <div className="p-6 space-y-8">
              
              {/* 1. Warm-up */}
              <div className="space-y-2">
                <span className="label-mono">[ 01 • WARM-UP • 10 MIN ]</span>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-xs text-[#f8f9fa]/80 space-y-1">
                  {currentWeek.sessionSummary.warmUp.map((w, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-[#d4ff00]">•</span>
                      <span>{w}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* 2. Technical Drills */}
              <div className="space-y-3">
                <span className="label-mono">[ 02 • TECHNICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWeek.sessionSummary.technicalDrills.map((drill, idx) => (
                    <div key={idx} className="bg-white/[0.03] p-4 rounded border border-white/5 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm">{drill.name}</h4>
                        <span className="font-mono-tag text-[10px] text-[#d4ff00]">{drill.duration}</span>
                      </div>
                      <p className="text-[#f8f9fa]/60 font-semibold">{drill.goal}</p>
                      <ul className="space-y-1 text-[#f8f9fa]/70 list-disc list-inside">
                        {drill.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-white/5 text-[#d4ff00] text-[11px]">
                        نصيحة: {drill.tips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Tactical Drills */}
              <div className="space-y-3">
                <span className="label-mono">[ 03 • TACTICAL DRILLS ]</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentWeek.sessionSummary.tacticalDrills.map((drill, idx) => (
                    <div key={idx} className="bg-white/[0.03] p-4 rounded border border-white/5 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-white text-sm">{drill.name}</h4>
                        <span className="font-mono-tag text-[10px] text-[#d4ff00]">{drill.duration}</span>
                      </div>
                      <p className="text-[#f8f9fa]/60 font-semibold">{drill.goal}</p>
                      <ul className="space-y-1 text-[#f8f9fa]/70 list-disc list-inside">
                        {drill.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Match Practice */}
              <div className="space-y-2">
                <span className="label-mono">[ 04 • MATCH PRACTICE • 20 MIN ]</span>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded text-xs text-[#f8f9fa]/80">
                  <p>{currentWeek.sessionSummary.gamePractice}</p>
                </div>
              </div>

              {/* 5. Coach Directive */}
              <div className="bg-[#d4ff00]/[0.05] border border-[#d4ff00]/30 p-4 rounded text-xs text-[#f8f9fa]">
                <span className="font-mono-tag text-[#d4ff00] block text-[10px] mb-1">
                  [ COACH DIRECTIVE ]
                </span>
                <p>"{currentWeek.sessionSummary.coachAdvice}"</p>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  );
};
