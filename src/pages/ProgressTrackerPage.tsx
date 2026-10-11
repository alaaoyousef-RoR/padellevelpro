import React, { useState } from 'react';
import { useApp, MASTER_SKILLS_LIST } from '../context/AppContext';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  Star, 
  Activity, 
  X,
  Zap
} from 'lucide-react';

export const ProgressTrackerPage: React.FC = () => {
  const { 
    trainingSessions, 
    addTrainingSession, 
    deleteTrainingSession, 
    masteredSkills, 
    toggleSkillMastered,
    testResult,
    user
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formFocus, setFormFocus] = useState('تقنية وتكنيك الضربات الهوائية (Volley)');
  const [formDuration, setFormDuration] = useState(60);
  const [formRating, setFormRating] = useState(8);
  const [formSelectedSkills, setFormSelectedSkills] = useState<string[]>(['volley_net', 'shot_placement']);
  const [formNotes, setFormNotes] = useState('');

  const totalSessions = trainingSessions.length;
  const totalMinutes = trainingSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const masteredCount = masteredSkills.length;
  const skillsPercent = Math.round((masteredCount / 12) * 100);

  const uniqueDays = new Set(trainingSessions.map(s => s.date)).size;
  const currentLevelNum = testResult?.levelNumber || user?.levelNumber || 1;
  const improvementRate = Math.min(100, Math.round((masteredCount / 12) * 60 + totalSessions * 4));

  const handleToggleFormSkill = (id: string) => {
    setFormSelectedSkills(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainingSession({
      date: formDate,
      focus: formFocus,
      durationMinutes: Number(formDuration),
      rating: Number(formRating),
      skillsWorkedOn: formSelectedSkills,
      notes: formNotes
    });
    setIsAddModalOpen(false);
    setFormNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 text-right space-y-8">
      
      {/* Header Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="label-mono">[ ATHLETE LOG & METRICS ]</span>
            <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              متتبع التقدم <span className="text-[#d4ff00]">وسجل التمارين</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-xl">
              سجل ساعات تدريبك في الملعب، راقب تطور مستواك، وحدد المهارات الـ 12 المعتمدة مع كل خطوة تخطوها نحو الاحتراف.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-neon px-6 py-3.5 text-xs font-black flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل حصة تدريبية جديدة</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (Variation 2 Stat Style) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">SESSIONS</span>
          <p className="font-alexandria font-black text-3xl text-white">{totalSessions}</p>
          <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">حصة مسجلة</span>
        </div>

        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">HOURS LOGGED</span>
          <p className="font-alexandria font-black text-3xl text-[#d4ff00]">{totalHours}</p>
          <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">ساعة فعلية</span>
        </div>

        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">MASTERY</span>
          <p className="font-alexandria font-black text-3xl text-white">{masteredCount}<span className="text-xs text-[#f8f9fa]/40">/12</span></p>
          <span className="font-mono-tag text-[10px] text-[#d4ff00]">{skillsPercent}% مكتمل</span>
        </div>

        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">ACTIVE DAYS</span>
          <p className="font-alexandria font-black text-3xl text-white">{uniqueDays}</p>
          <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">يوماً رياضياً</span>
        </div>

        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">STAGE</span>
          <p className="font-alexandria font-black text-3xl text-[#d4ff00]">0{currentLevelNum}</p>
          <span className="font-mono-tag text-[10px] text-[#f8f9fa]/40">تصنيف معتمد</span>
        </div>

        <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-1">
          <span className="label-mono mb-1">EFFICIENCY</span>
          <p className="font-alexandria font-black text-3xl text-white">+{improvementRate}%</p>
          <span className="font-mono-tag text-[10px] text-[#d4ff00]">معدل التحسن</span>
        </div>

      </div>

      {/* Grid: 12 Skills Checklist + History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Skills Checklist */}
        <div className="lg:col-span-5 card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="label-mono">[ 12 CORE COMPETENCIES ]</span>
              <span className="font-mono-tag text-xs text-[#d4ff00] font-bold">
                {masteredCount} / 12
              </span>
            </div>
            <h2 className="font-alexandria font-bold text-lg text-white">قائمة المهارات المعتمدة</h2>
            <p className="text-xs text-[#f8f9fa]/50 mt-0.5">
              حدد المهارة التي أتقنتها لتحديث سجلك التدريبي فورياً.
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-[11px] font-mono-tag text-[#f8f9fa]/50 mb-1">
              <span>COMPLETION RATIO</span>
              <span className="text-[#d4ff00]">{skillsPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#d4ff00] rounded-full transition-all duration-300 shadow-[0_0_8px_#d4ff00]"
                style={{ width: `${skillsPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            {MASTER_SKILLS_LIST.map((skill) => {
              const isChecked = masteredSkills.includes(skill.id);
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkillMastered(skill.id)}
                  className={`p-3 rounded border transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-[#d4ff00]/[0.06] border-[#d4ff00]/40 text-white'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] text-[#f8f9fa]/70'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#d4ff00]" />
                    ) : (
                      <Square className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isChecked ? 'text-[#d4ff00]' : 'text-white'}`}>
                        {skill.nameAr}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#f8f9fa]/50 mt-0.5 leading-relaxed">
                      {skill.descriptionAr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sessions History */}
        <div className="lg:col-span-7 card-dark p-6 sm:p-8 rounded-lg border border-[rgba(248,249,250,0.1)] space-y-6">
          <div className="flex items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-4">
            <div>
              <span className="label-mono">[ LOG ENTRIES ]</span>
              <h2 className="font-alexandria font-bold text-lg text-white">سجل الحصص التدريبية السابقة</h2>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-neon text-xs px-3 py-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة حصة</span>
            </button>
          </div>

          {trainingSessions.length > 0 ? (
            <div className="space-y-3">
              {trainingSessions.map((session) => (
                <div 
                  key={session.id}
                  className="bg-white/[0.02] border border-[rgba(248,249,250,0.06)] hover:border-[#d4ff00]/30 p-4 rounded-lg space-y-2.5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">{session.focus}</h4>
                      <div className="flex items-center gap-3 font-mono-tag text-[11px] text-[#f8f9fa]/40 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#d4ff00]" />
                          <span>{session.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#d4ff00]" />
                          <span>{session.durationMinutes} MIN</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center font-mono-tag text-xs">
                      <span className="text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2 py-0.5 rounded font-bold">
                        RATING: {session.rating}/10
                      </span>

                      <button
                        onClick={() => deleteTrainingSession(session.id)}
                        className="text-[#f8f9fa]/30 hover:text-red-400 p-1"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {session.notes && (
                    <p className="text-xs text-[#f8f9fa]/70 bg-black/40 p-2.5 rounded border border-white/5 leading-relaxed">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#f8f9fa]/40 space-y-2 font-mono-tag">
              <Calendar className="w-8 h-8 mx-auto text-white/20" />
              <p className="text-xs">[ NO ENTRIES RECORDED YET ]</p>
            </div>
          )}
        </div>

      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-[#111315] rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[rgba(248,249,250,0.12)] text-right p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[rgba(248,249,250,0.08)] pb-3">
              <div>
                <span className="label-mono">[ LOG ENTRY FORM ]</span>
                <h3 className="font-alexandria font-bold text-lg text-white">تسجيل حصة تدريبية جديدة</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/40 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSession} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 font-mono-tag">
                <div>
                  <label className="block text-xs text-[#f8f9fa]/60 mb-1">DATE / التاريخ</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff00]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#f8f9fa]/60 mb-1">DURATION (MINUTES)</label>
                  <input
                    type="number"
                    min="15"
                    max="300"
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4ff00] text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#f8f9fa]/60 mb-1">FOCUS AREA / مجال التركيز</label>
                <input
                  type="text"
                  value={formFocus}
                  onChange={(e) => setFormFocus(e.target.value)}
                  placeholder="مثال: الفولي والكرات الهوائية، البانديخا..."
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4ff00] text-right"
                />
              </div>

              <div>
                <label className="block text-xs text-[#f8f9fa]/60 mb-1">
                  RATING (1-10): <span className="text-[#d4ff00] font-mono-tag font-bold">{formRating}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formRating}
                  onChange={(e) => setFormRating(Number(e.target.value))}
                  className="w-full accent-[#d4ff00]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#f8f9fa]/60 mb-1">OBSERVATIONS & COACH NOTES</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="سجل أخطاء لاحظتها، نصائح من زميلك أو الكوتش..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/10 rounded p-3 text-xs text-white focus:outline-none focus:border-[#d4ff00] text-right"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-neon flex-1 py-3 text-xs font-bold justify-center"
                >
                  حفظ الحصة التدريبية
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-outline-ink px-5 py-3 text-xs font-mono-tag"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
