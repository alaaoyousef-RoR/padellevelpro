import React, { useState, useEffect } from 'react';
import { VIDEO_TUTORIALS } from '../data/videoData';
import { VideoTutorial } from '../types';
import { 
  Play, 
  Clock, 
  X, 
  ExternalLink,
  Youtube,
  Tv,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const VideoTutorialsPage: React.FC = () => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('الكل');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoTutorial | null>(null);

  // Close modal with Escape key and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
      }
    };
    if (activeVideoModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideoModal]);

  const levelFilters = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];
  const categoryFilters = [
    { id: 'all', label: 'جميع الفيديوهات' },
    { id: 'basic', label: 'الضربات الأساسية' },
    { id: 'advanced', label: 'الضربات المتقدمة' },
    { id: 'tactics', label: 'التكتيك والتمركز' },
    { id: 'walls', label: 'الجدران الزجاجية' },
    { id: 'footwork', label: 'حركة القدمين' }
  ];

  const filteredVideos = VIDEO_TUTORIALS.filter(video => {
    const matchesLevel = selectedLevelFilter === 'الكل' || video.level === selectedLevelFilter || video.level === 'الكل';
    const matchesCat = selectedCategoryFilter === 'all' || video.category === selectedCategoryFilter;
    return matchesLevel && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto py-4 text-right space-y-8 font-alexandria">
      
      {/* Header Banner */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-3 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4ff00]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2">
          <span className="label-mono">[ VISUAL DRILL LIBRARY ]</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono-tag bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30 px-2 py-0.5 rounded">
            <Youtube className="w-3 h-3 text-[#d4ff00]" />
            YOUTUBE POWERED
          </span>
        </div>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          مكتبة تمارين وتكنيك <span className="text-[#d4ff00]">البادل المرئية</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-2xl">
          فيديوهات تدريبية وتحليلات بصرية حية لأدق ضربات وتكتيكات البادل. انقر على أي تمرين لمشاهدته فوراً بجودة عالية داخل المنصة دون مغادرة الصفحة.
        </p>
      </div>

      {/* Filter Bars */}
      <div className="card-dark p-5 rounded-lg border border-[rgba(248,249,250,0.08)] space-y-3 font-mono-tag text-xs">
        
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[#f8f9fa]/40 ml-2 whitespace-nowrap font-bold">LEVEL:</span>
          {levelFilters.map((lvl) => {
            const isSelected = selectedLevelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`py-1.5 px-3.5 rounded whitespace-nowrap transition-colors font-bold ${
                  isSelected
                    ? 'bg-[#d4ff00] text-[#0b0c0d]'
                    : 'bg-white/[0.03] text-[#f8f9fa]/60 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[rgba(248,249,250,0.06)]">
          <span className="text-[#f8f9fa]/40 ml-2 whitespace-nowrap font-bold">TOPIC:</span>
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`py-1.5 px-3 rounded whitespace-nowrap transition-colors font-bold ${
                  isSelected
                    ? 'bg-white text-black'
                    : 'bg-white/[0.03] text-[#f8f9fa]/50 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideoModal(vid)}
            className="card-dark rounded-lg border border-[rgba(248,249,250,0.08)] hover:border-[#d4ff00]/50 overflow-hidden flex flex-col justify-between group transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          >
            <div>
              {/* Dynamic YouTube Thumbnail Area */}
              <div className="relative aspect-video bg-black overflow-hidden border-b border-white/5">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-neutral-900"></div>

                {/* Real YouTube Thumbnail image */}
                <img
                  src={vid.thumbnailUrl || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.titleAr}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    // Fallback to standard quality if hq fails
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                  }}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0d] via-black/30 to-black/40 group-hover:via-black/10 transition-colors"></div>

                {/* Centered Neon Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#d4ff00] text-[#0b0c0d] flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.5)] group-hover:scale-115 transition-transform duration-200 pl-0.5">
                    <Play className="w-6 h-6 fill-[#0b0c0d]" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 left-2.5 bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono-tag font-bold text-[#d4ff00] flex items-center gap-1 z-10 border border-white/10">
                  <Clock className="w-3 h-3 text-[#d4ff00]" />
                  <span>{vid.duration}</span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono-tag z-10 border border-white/10">
                  {vid.level}
                </div>

                {/* YouTube Pill */}
                <div className="absolute top-2.5 left-2.5 bg-red-600/90 text-white px-1.5 py-0.5 rounded text-[9px] font-mono-tag font-bold flex items-center gap-1 z-10">
                  <Youtube className="w-2.5 h-2.5" />
                  <span>HD</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tag text-[9px] text-[#d4ff00] bg-[#d4ff00]/10 border border-[#d4ff00]/30 px-2 py-0.5 rounded">
                    {vid.categoryAr}
                  </span>
                  <span className="text-[10px] font-mono-tag text-[#f8f9fa]/40">
                    {vid.coachName}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-[#d4ff00] transition-colors leading-snug line-clamp-2">
                  {vid.titleAr}
                </h3>

                <p className="text-xs text-[#f8f9fa]/55 line-clamp-2 leading-relaxed">
                  {vid.descriptionAr}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                type="button"
                className="w-full py-2.5 bg-white/[0.04] group-hover:bg-[#d4ff00] group-hover:text-[#0b0c0d] text-[#d4ff00] border border-[#d4ff00]/30 group-hover:border-[#d4ff00] rounded text-xs font-mono-tag font-bold transition-all text-center flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>[ تشغيل التمرين المرئي ]</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive YouTube Video Player Modal */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="bg-[#111315] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#d4ff00]/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-right p-5 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[rgba(248,249,250,0.1)] pb-4 gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tag text-[10px] text-[#0b0c0d] bg-[#d4ff00] font-black px-2 py-0.5 rounded">
                    {activeVideoModal.categoryAr}
                  </span>
                  <span className="font-mono-tag text-[10px] text-[#f8f9fa]/70 bg-white/10 px-2 py-0.5 rounded">
                    المستوى: {activeVideoModal.level}
                  </span>
                  <span className="font-mono-tag text-[10px] text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span>YouTube Embed</span>
                  </span>
                </div>
                <h2 className="font-alexandria font-black text-lg sm:text-2xl text-white mt-1 leading-snug">
                  {activeVideoModal.titleAr}
                </h2>
                <p className="font-mono-tag text-xs text-[#f8f9fa]/50">
                  المدرب: {activeVideoModal.coachName} • المدة: {activeVideoModal.duration}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                aria-label="إغلاق مشغل الفيديو"
                className="text-white/60 hover:text-[#d4ff00] hover:bg-white/10 p-2 rounded-lg transition-colors border border-white/10 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded Responsive YouTube Player */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-[#d4ff00]/30 shadow-[0_0_30px_rgba(212,255,0,0.12)]">
              <iframe
                className="w-full h-full border-0 absolute inset-0"
                src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideoModal.titleAr}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Drill Details & Coaching Takeaways */}
            <div className="space-y-4">
              <div className="bg-white/[0.02] p-4 rounded-lg border border-white/5 space-y-2">
                <span className="label-mono">[ DRILL BREAKDOWN & TACTICS ]</span>
                <p className="text-xs sm:text-sm text-[#f8f9fa]/80 leading-relaxed">
                  {activeVideoModal.descriptionAr}
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="label-mono">[ KEY DRILL TAKEAWAYS // أهم نقاط الإتقان ]</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeVideoModal.keyTakeaways.map((point, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/[0.02] p-3 rounded-lg border border-white/5 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#d4ff00] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#f8f9fa]/80 leading-relaxed font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-2 border-t border-[rgba(248,249,250,0.08)] flex flex-wrap items-center justify-between gap-3">
              <a
                href={activeVideoModal.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ink px-4 py-2 text-xs font-bold flex items-center gap-2 hover:border-red-500 hover:text-red-400"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>فتح في YouTube مباشرة</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="btn-neon px-6 py-2 text-xs font-bold"
                >
                  إغلاق المشغل
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
