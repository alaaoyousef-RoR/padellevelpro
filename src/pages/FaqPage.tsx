import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'ما هو الهدف الأساسي من منصة PadelLevel Pro؟',
    a: 'المنصة تهدف لحل أكبر مشكلة تواجه لاعبي البادل: عدم معرفة مستواهم الحقيقي الدقيق وغياب التوجيه التدريبي المنظم. تساعدك المنصة في تقييم مستواك الفني والتكتيكي عبر 20 سؤالاً تخصصياً، ثم توليد برنامج تدريبي أسبوعي مفصل مصمم لمستواك، مع مكتبة لشرح أسرار وحيل البادل ومتتبع لتسجيل تقدمك.'
  },
  {
    q: 'كيف يعمل اختبار تحديد المستوى وما هي آلية احتساب النقاط؟',
    a: 'يتكون الاختبار من 20 سؤالاً شاملاً تغطي: مدة ممارستك، الفورهاند، الباكهاند، الفولي، السماتش، البانديخا، حركة القدمين، الجدران الزجاجية، التكتيك، والتناغم مع الزميل. لكل سؤال 4 خيارات بنقاط من 1 إلى 4، لتكون الدرجة الإجمالية من 80 نقطة. بناءً على مجموع نقاطك يتم تحديد مستواك المعتمد من 1 إلى 5 بدقة علمية.'
  },
  {
    q: 'هل نتيجة التقييم دقيقة ومطابقة للمعايير الدولية؟',
    a: 'نعم، تم تصميم الأسئلة وخوارزمية التقييم وفق معايير الاتحاد الدولي للبادل (FIP) وتجارب كبار المدربين المحترفين. دقة التقييم تعتمد بدرجة أولى على صراحتك وموضوعيتك عند الإجابة عن كل سؤال دون مبالغة.'
  },
  {
    q: 'كم من الوقت سأستغرقه لألاحظ تحسناً حقيقياً في مستواي؟',
    a: 'عند الالتزام بالبرنامج التدريبي المخصص لمستواك (3 إلى 4 حصص أسبوعياً)، يلاحظ 92% من اللاعبين تحسناً فارقاً في أول أسبوعين إلى 3 أسابيع، لا سيما في تقليل الأخطاء غير المبررة وزيادة الثبات في الراليات وإتقان اللعب مع الزجاج الخلفي.'
  },
  {
    q: 'هل يمكن للاعب مبتدئ تماماً الاستفادة من المنصة؟',
    a: 'بكل تأكيد! المستوى الأول (مبتدئ) مصمم خصيصاً لمن دخلوا عالم البادل حديثاً. يركز البرنامج على تأسيس القبضة القارية الصحيحة، تجنب إصابات المرفق، حركة القدمين، وكسر حاجز الخوف من الجدران الزجاجية.'
  },
  {
    q: 'هل أحتاج لمدرب خاص لتطبيق البرامج التدريبية المخصصة؟',
    a: 'البرامج التدريبية مصممة لتكون ذاتية التطبيق وواضحة المعالم، حيث يمكنك تطبيقها مع زميلك في الملعب خطوة بخطوة. ومع ذلك، إذا كان لديك مدرب خاص، فيمكنك مشاركة خطتك معه ليركز معك على التمارين المحددة في أسبوعك الحالي.'
  },
  {
    q: 'ما هي أهم ضربة يجب أن يركز عليها اللاعب المتوسط للانتقال للمستوى المتقدم؟',
    a: 'ضربة البانديخا (Bandeja) بلا منازع! هي الضربة التي تحافظ لك على السيطرة عند الشبكة وتمنع الخصم من الهجوم. يضاف إليها إتقان ضربة التشيكيتا (Chiquita) وقراءة ارتداد الكرة من الجدارين (Doble Pared).'
  },
  {
    q: 'هل يمكنني إعادة خوض اختبار تحديد المستوى لاحقاً؟',
    a: 'نعم، نوصي جميع اللاعبين بإعادة إجراء الاختبار كل 4 إلى 6 أسابيع لقياس مدى تطورهم والانتقال تلقائياً إلى المستوى التدريبي التالي.'
  }
];

export const FaqPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 text-right space-y-8">
      
      {/* Header */}
      <div className="card-dark p-8 sm:p-10 rounded-lg border border-[rgba(248,249,250,0.12)] space-y-3">
        <span className="label-mono">[ KNOWLEDGE BASE & FAQ ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          الأسئلة الشائعة حول <span className="text-[#d4ff00]">المنصة والتدريب</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed">
          إجابات شاملة عن كل ما يدور في ذهنك حول اختبار المستوى، البرامج التدريبية، وكيفية التطور السريع في البادل.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`card-dark rounded-lg border transition-all overflow-hidden ${
                isOpen ? 'border-[#d4ff00]/40 bg-white/[0.04]' : 'border-[rgba(248,249,250,0.08)]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-right font-bold text-white text-sm sm:text-base flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono-tag text-xs text-[#d4ff00]">
                    [{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]
                  </span>
                  <span>{faq.q}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#d4ff00] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-[rgba(248,249,250,0.06)] text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="card-dark p-8 rounded-lg text-center space-y-3 border border-white/10">
        <h3 className="font-alexandria font-bold text-lg text-white">
          هل لديك استفسار آخر لم تجد إجابته هنا؟
        </h3>
        <p className="text-xs text-[#f8f9fa]/50">
          فريقنا الفني جاهز لمساعدتك والإجابة على أي سؤال تدريبي أو تقني.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="btn-outline-ink px-6 py-2.5 text-xs font-mono-tag"
        >
          <span>CONTACT SUPPORT</span>
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5 inline" />
        </button>
      </div>

    </div>
  );
};
