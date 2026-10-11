import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PADEL_TECHNIQUES } from '../data/techniquesData';
import { TechniqueItem } from '../types';
import { 
  BookOpen, 
  Search, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  X, 
  HelpCircle,
  Zap
} from 'lucide-react';

export const LearnPadelPage: React.FC = () => {
  const { selectedTechniqueSlug } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTechnique, setActiveModalTechnique] = useState<TechniqueItem | null>(() => {
    if (selectedTechniqueSlug) {
      return PADEL_TECHNIQUES.find(t => t.slug === selectedTechniqueSlug) || null;
    }
    return null;
  });

  const categories = [
    { id: 'all', label: 'جميع المهارات' },
    { id: 'basic', label: 'الضربات الأساسية' },
    { id: 'intermediate', label: 'الضربات المتقدمة' },
    { id: 'footwork', label: 'حركة القدمين' },
    { id: 'walls', label: 'الجدران الزجاجية' },
    { id: 'tactics', label: 'التكتيك المشترك' },
    { id: 'tricks', label: 'حيل الفوز' },
  ];

  const filteredTechniques = PADEL_TECHNIQUES.filter(tech => {
    const matchesCategory = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch = 
      tech.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.titleOriginal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-4 text-right space-y-8">
      
      {/* Header Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-3">
        <span className="label-mono">[ TECHNICAL REPOSITORY ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          تعلّم تقنيات وتكتيكات <span className="text-[#d4ff00]">وحيل البادل</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-2xl">
          دليلك الميكانيكي والتكتيكي الشامل لتنفيذ كل ضربة ومهارة، مع تجنب الأخطاء الشائعة والاطلاع على أسرار اللاعبين المحترفين.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-dark p-4 sm:p-6 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-4">
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أي ضربة أو مهارة (مثال: البانديخا، الفيبورا، الفورهاند، الزجاج)..."
            className="w-full bg-white/[0.04] border border-[rgba(248,249,250,0.12)] focus:border-[#d4ff00] rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-[#f8f9fa]/30 focus:outline-none pl-10 text-right"
          />
          <Search className="w-4 h-4 text-[#f8f9fa]/40 absolute left-3.5 top-3.5" />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tag text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-1.5 px-3.5 rounded whitespace-nowrap transition-colors font-bold ${
                  isSelected
                    ? 'bg-[#d4ff00] text-[#0b0c0d]'
                    : 'bg-white/[0.03] text-[#f8f9fa]/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechniques.map((tech) => (
          <div
            key={tech.id}
            className="card-dark p-6 rounded-lg border border-[rgba(248,249,250,0.08)] hover:border-[#d4ff00]/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono-tag">
                <span className="text-[10px] text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2 py-0.5 rounded">
                  {tech.categoryAr}
                </span>
                <span className="text-[10px] text-[#f8f9fa]/40 border border-white/10 px-2 py-0.5 rounded">
                  {tech.difficulty}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#d4ff00] transition-colors">
                  {tech.titleAr}
                </h3>
                <p className="font-mono-tag text-[10px] text-[#f8f9fa]/40 mt-0.5">
                  {tech.titleOriginal} • {tech.courtPositionAr}
                </p>
              </div>

              <p className="text-xs text-[#f8f9fa]/60 leading-relaxed line-clamp-3">
                {tech.shortDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(248,249,250,0.06)] space-y-3">
              <div className="text-[11px] text-[#f8f9fa]/50 flex items-center gap-1.5 truncate">
                <Zap className="w-3.5 h-3.5 text-[#d4ff00] flex-shrink-0" />
                <span className="truncate">{tech.proTips}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalTechnique(tech)}
                className="w-full py-2.5 bg-white/[0.04] hover:bg-[#d4ff00] hover:text-[#0b0c0d] text-[#d4ff00] border border-[#d4ff00]/30 rounded text-xs font-mono-tag font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>[ VIEW SPECIFICATIONS ]</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTechniques.length === 0 && (
        <div className="card-dark p-12 text-center text-[#f8f9fa]/40 space-y-2">
          <HelpCircle className="w-10 h-10 mx-auto text-white/20" />
          <p className="text-xs font-bold text-white">لم نجد نتائج مطابقة لبحثك.</p>
        </div>
      )}

      {/* Modal Detail View */}
      {activeModalTechnique && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="bg-[#111315] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[rgba(248,249,250,0.12)] text-right p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            
            <div className="flex items-start justify-between border-b border-[rgba(248,249,250,0.08)] pb-4">
              <div>
                <span className="font-mono-tag text-[10px] text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2 py-0.5 rounded">
                  {activeModalTechnique.categoryAr} • {activeModalTechnique.difficulty}
                </span>
                <h2 className="font-alexandria font-black text-2xl text-white mt-1">
                  {activeModalTechnique.titleAr}
                </h2>
                <p className="font-mono-tag text-xs text-[#f8f9fa]/40 mt-0.5">
                  {activeModalTechnique.titleOriginal} • {activeModalTechnique.courtPositionAr}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTechnique(null)}
                className="text-white/40 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#f8f9fa]/80 bg-white/[0.02] border border-white/5 p-4 rounded leading-relaxed">
              {activeModalTechnique.shortDesc}
            </p>

            {/* Steps */}
            <div className="space-y-3">
              <span className="label-mono">[ EXECUTION SEQUENCE ]</span>
              <ol className="space-y-2 text-xs text-[#f8f9fa]/80">
                {activeModalTechnique.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 bg-white/[0.02] p-3 rounded border border-white/5">
                    <span className="font-mono-tag text-[#d4ff00] font-black text-xs mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Points & Errors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-[rgba(248,249,250,0.08)] p-4 rounded space-y-2 text-xs">
                <span className="font-mono-tag text-[10px] text-[#d4ff00] uppercase block">CRITICAL BENCHMARKS</span>
                <ul className="space-y-1.5 text-[#f8f9fa]/70">
                  {activeModalTechnique.keyPoints.map((kp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#d4ff00]">•</span>
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-red-900/30 p-4 rounded space-y-2 text-xs">
                <span className="font-mono-tag text-[10px] text-red-400 uppercase block">AVOID REPEAT ERRORS</span>
                <ul className="space-y-1.5 text-[#f8f9fa]/70">
                  {activeModalTechnique.commonMistakes.map((cm, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">•</span>
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-[#d4ff00]/[0.05] border border-[#d4ff00]/30 p-4 rounded text-xs text-[#f8f9fa]">
              <span className="font-mono-tag text-[#d4ff00] block text-[10px] mb-1">
                [ PRO DIRECTIVE ]
              </span>
              <p>"{activeModalTechnique.proTips}"</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalTechnique(null)}
                className="btn-outline-ink px-6 py-2 text-xs font-mono-tag"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
