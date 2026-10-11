import { 
  AssessmentQuestion, 
  PadelLevelInfo, 
  PadelLevelNumber, 
  PillarKey, 
  PillarScoreDetail, 
  PlaytomicTier, 
  TestResultData 
} from '../types';

export interface PillarDefinition {
  key: PillarKey;
  pillarNumber: number;
  titleAr: string;
  shortTitleAr: string;
  descriptionAr: string;
  benchmarkAr: string;
}

export const ASSESSMENT_PILLARS: PillarDefinition[] = [
  {
    key: 'serve_return',
    pillarNumber: 1,
    titleAr: 'الإرسال واستقبال الإرسال (Serve & Return)',
    shortTitleAr: 'الإرسال والاستقبال',
    descriptionAr: 'دقة توجيه الإرسال بالقطع السفلي نحو الزجاج الجانبي، والتحكم في رد الإرسال باللوب أو في أقدام الخصم.',
    benchmarkAr: 'القدرة على وضع الإرسال بدقة والتعامل مع ارتداد الزجاج الجانبي وبناء اللمسة الأولى.'
  },
  {
    key: 'net_volleys',
    pillarNumber: 2,
    titleAr: 'اللعب عند الشبكة والكرات الطائرة (Net Play & Volleys)',
    shortTitleAr: 'الشبكة والفولي',
    descriptionAr: 'إتقان فولي الفورهاند والباكهاند القاطع، والسيطرة على اشتباكات الشبكة السريعة وتوجيه الكرة في الزوايا العميقة.',
    benchmarkAr: 'لكم الكرة بحركة Punch قاطعة وتثبيت المعصم ونقل وزن الجسم للأمام.'
  },
  {
    key: 'overhead_shots',
    pillarNumber: 3,
    titleAr: 'الضربات الهوائية والعلوية (Overheads: Bandeja, Víbora, Smash)',
    shortTitleAr: 'الضربات العلوية',
    descriptionAr: 'إتقان ضربات البانديخا لحفظ موقع الهجوم، وفيبورا الدوران الجانبي، والسماتش الهجومي لإخراج الكرة خارج القفص.',
    benchmarkAr: 'اتخاذ القرار السريع عند مواجهة كرات اللوب العالية والتحكم في العمق والزوايا القاتلة.'
  },
  {
    key: 'wall_defense',
    pillarNumber: 4,
    titleAr: 'الارتداد عن الزجاج والدفاع واللوب (Wall Defense & Glass Rebounds)',
    shortTitleAr: 'الزجاج والدفاع',
    descriptionAr: 'قراءة ارتداد الجدار الخلفي والمزدوج (Doble Pared)، واستخدام اللوب الدفاعي المحكم وضربة الباخادا السريعة.',
    benchmarkAr: 'الصبر والهدوء مع الجدران الزجاجية، وتطويع الارتداد للتحول من الدفاع إلى الهجوم.'
  },
  {
    key: 'tactics_positioning',
    pillarNumber: 5,
    titleAr: 'التمركز التكتيكي واستراتيجية الملعب (Court Positioning & Tactics)',
    shortTitleAr: 'التمركز والتكتيك',
    descriptionAr: 'التحرك كحبل متصل مع الزميل، وإدارة وتيرة الراليات وصبر بناء النقطة، وحسم النقاط الذهبية (Punto de Oro).',
    benchmarkAr: 'التناغم المشترك وتغطية منتصف الملعب والتواصل الصوتي وإدارة الضغط الذهني.'
  }
];

export const PADEL_LEVELS: Record<PadelLevelNumber, PadelLevelInfo> = {
  1: {
    levelNumber: 1,
    titleAr: 'المستوى 1: مبتدئ (Beginner)',
    subtitleAr: 'مرحلة التأسيس واكتساب الأساسيات الصحيحة',
    playtomicEquivalent: '1.0 - 2.5',
    playtomicTier: 'Tier D / D+',
    minScore: 20,
    maxScore: 35,
    badgeColor: 'bg-white/10 text-white border border-white/20',
    descriptionAr: 'أنت في بداية رحلتك الشيقة في رياضة البادل. تتقن ضرب الكرة ولكنك تحتاج إلى تطوير القبضة القارية (Continental Grip)، حركة القدمين، والتعود على الارتداد من الجدران الزجاجية.',
    recommendedProgramWeeks: 4,
    characteristicsAr: [
      'تعلم القبضة القارية الصحيحة والمواقف التأسيسية',
      'تطوير الثبات في تبادل الكرات (الرالي الأساسي)',
      'فهم الخطوط وقوانين اللعبة ومناطق الملعب',
      'بناء الثقة مع الجدران الزجاجية الخلفية'
    ]
  },
  2: {
    levelNumber: 2,
    titleAr: 'المستوى 2: متوسط أدنى (Lower-Intermediate)',
    subtitleAr: 'مرحلة ضبط الإيقاع والتحكم في الاتجاه',
    playtomicEquivalent: '2.6 - 3.8',
    playtomicTier: 'Tier C',
    minScore: 36,
    maxScore: 49,
    badgeColor: 'bg-teal-950/60 text-teal-300 border border-teal-500/40',
    descriptionAr: 'لديك أساسيات جيدة وتلعب بانتظام، ولديك قدرة على الحفاظ على راليات قصيرة. التركيز الآن على تقليل الأخطاء غير المبررة، اللعب على الشبكة بالفولي، وبدء استخدام الجدران في الدفاع.',
    recommendedProgramWeeks: 6,
    characteristicsAr: [
      'ضربات فورهاند وباكهاند بانتظام وثبات أعلى',
      'بدء التقدم إلى الشبكة واللعب بالكرات الهوائية (Volley)',
      'التعامل الأولي مع الكرات المرتدة من الجدار الخلفي',
      'تنسيق الحركة والوقفة مع زميل الفريق'
    ]
  },
  3: {
    levelNumber: 3,
    titleAr: 'المستوى 3: متوسط / متوسط أعلى (Intermediate)',
    subtitleAr: 'مرحلة السيطرة التكتيكية وضربات البانديخا',
    playtomicEquivalent: '3.9 - 5.0',
    playtomicTier: 'Tier C+ / B',
    minScore: 50,
    maxScore: 61,
    badgeColor: 'bg-[#d4ff00] text-[#0b0c0d] font-black border border-[#d4ff00]',
    descriptionAr: 'أنت لاعب متمرس تفهم تكتيك البادل وتتحكم في وتيرة المباراة. تتقن ضربات الشبكة وتستخدم ضربة البانديخا (Bandeja) للحفاظ على موقع الهجوم، وتدافع بكفاءة عن الجدران.',
    recommendedProgramWeeks: 8,
    characteristicsAr: [
      'إتقان ضربة البانديخا (Bandeja) لمنع المنافس من الهجوم',
      'التحكم الدقيق في الكرات الهوائية (Volley Placement)',
      'تحويل الدفاع إلى هجوم باستخدام اللوب المحكم (Lob)',
      'قراءة ثغرات الخصم وبناء النقطة بصبر'
    ]
  },
  4: {
    levelNumber: 4,
    titleAr: 'المستوى 4: متقدم (Advanced)',
    subtitleAr: 'مرحلة الحسم الهجومي والضربات الخاصة',
    playtomicEquivalent: '5.1 - 6.1',
    playtomicTier: 'Tier B+',
    minScore: 62,
    maxScore: 71,
    badgeColor: 'bg-purple-950/60 text-purple-300 border border-purple-500/40',
    descriptionAr: 'مستواك متقدم وتنافسي للغاية. تتقن الضربات المعقدة مثل الفيبورا (Víbora) والباخادا (Bajada) وتتحكم في الزوايا والسرعات، ولديك كيمياء وتناغم عالٍ مع زميلك.',
    recommendedProgramWeeks: 10,
    characteristicsAr: [
      'تنفيذ ضربات الفيبورا والسماتش الهجومي (Por 3 / Por 4)',
      'استغلال الجدار المزدوج (Doble Pared) في الدفاع والهجوم',
      'تحكم استثنائي في سرعة اللعب وتغيير الاتجاهات',
      'قدرة عالية على حسم النقاط الحرجة والذهبية'
    ]
  },
  5: {
    levelNumber: 5,
    titleAr: 'المستوى 5: محترف / تنافسي فائق (Advanced-Pro)',
    subtitleAr: 'أعلى مستويات اللعب التنافسي والبطولات',
    playtomicEquivalent: '6.2 - 7.0+',
    playtomicTier: 'Tier A / A+',
    minScore: 72,
    maxScore: 80,
    badgeColor: 'bg-amber-400 text-black font-black border border-amber-300',
    descriptionAr: 'أنت من نخبة لاعبي البادل وتنافس في بطولات الفئة الأولى. تتميز بردود أفعال خارقة، قراءة مسبقة للكرات، ضربات ساحقة خارج الملعب، واستراتيجية لعب متكاملة.',
    recommendedProgramWeeks: 12,
    characteristicsAr: [
      'إتقان شامل لكافة ضربات البادل مع نسبة أخطاء شبه معدومة',
      'خروج من القفص لإعادة الكرات الساحقة (Por 3)',
      'إدارة الضغط النفسي واستراتيجيات متقدمة للمباريات الرسمية',
      'لياقة بدنية وسرعة رد فعل تلائم بطولات المحترفين'
    ]
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ==========================================
  // PILLAR 1: SERVE & RETURN (الإرسال والاستقبال)
  // ==========================================
  {
    id: 1,
    category: 'serve_return',
    categoryAr: 'الإرسال والاستقبال',
    pillarNumber: 1,
    questionAr: 'كيف تصف جودة ودقة ضربة إرسالك الأول وتوجيهه نحو الزجاج الجانبي؟',
    scenarioAr: 'أنت في بداية النقطة وتبحث عن كسب الميزة الهجومية من الضربة الأولى.',
    hintAr: 'معيار Playtomic: العمق والدوران القاطع (Slice) والقدرة على ضرب الزجاج الجانبي.',
    options: [
      { 
        text: 'إرسال عالي وبطيء بمنتصف مربع الإرسال بدون قطع أو دوران، وكثيراً ما يلمس الشبك المعدني أو يخرج عن الخط.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'إرسال آمن بقطع سفلي خفيف يصل إلى الزجاج الجانبي لكن بارتفاع سهل يمكن للمستقبل رده براحة دون ضغط.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'إرسال عميق وسريع موجه بدقة نحو الزجاج الجانبي بزاوية حادة، يجبر الخصم على ارتكاب رد دفاعي ضعيف.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'تنويع تكتيكي متقن بين زاوية الزجاج الجانبي وزاوية المنتصف (T-Zone) بدوران قاطع منخفض يموت فور ملامسة الزجاج.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 2,
    category: 'serve_return',
    categoryAr: 'الإرسال والاستقبال',
    pillarNumber: 1,
    questionAr: 'كيف تتعامل مع الإرسال الثاني عند خسارة الإرسال الأول وتحت ضغط خسارة النقطة؟',
    scenarioAr: 'أهدرت إرسالك الأول، وتحتاج لتنفيذ إرسال ثانٍ يحميك من هجوم الخصم المباشر.',
    hintAr: 'معيار الثبات والصلابة الذهنية ونسبة الأخطاء المزدوجة (Double Faults).',
    options: [
      { 
        text: 'أشعر بتوتر شديد وأرتكب أخطاء مزدوجة متكررة، أو أرسل كرة بطيئة وعالية جداً تمنح الخصم هجوماً فائزاً فورياً.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أرسل ببطء لضمان دخول الكرة في المربع ولكن بدون أي عمق، مما يسمح للخصم بالتقدم ومهاجمتي فوراً.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'إرسال ثانٍ ثابت وعميق بقطع سفلي يضمن صعوبة الهجوم، ونسبة أخطائي المزدوجة لا تتعدى خطأ واحداً في المباراة.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'إرسال ثانٍ موثوق بنسبة 98%+ بنفس جودة وعمق الإرسال الأول، مع تحكم كامل بالارتداد ومفاجأة المستقبل بتغيير التوجيه.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 3,
    category: 'serve_return',
    categoryAr: 'الإرسال والاستقبال',
    pillarNumber: 1,
    questionAr: 'كيف تتصرف عند استقبال إرسال سريع موجه مباشرة ليرتد من الزجاج الجانبي؟',
    scenarioAr: 'المنافس يرسل إرسالاً قوياً يلامس الأرض ويقترب بسرعة من الزجاج الجانبي لمربعك.',
    hintAr: 'معيار قراءة زاوية الخروج وحركة الأقدام والهدوء في استقبال الزجاج الجانبي.',
    options: [
      { 
        text: 'أتعثر في التراجع وغالباً ما تصطدم الكرة بجسمي أو تعبر بعد فوات الأوان دون أن ألمسها بمضربي.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أحاول ضربها قبل ملامسة الزجاج خوفاً من الارتداد، مما يؤدي لكرات عشوائية ترتطم بالشبكة أو تطير خارجاً.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أترك الكرة ترتد من الزجاج الجانبي بهدوء ثم أعيدها بأمان فوق الشبكة كضربة لوب أو في منتصف الملعب.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'أقرأ مسار ارتداد الزجاج مبكراً، وأنزل بمركزي لأسفل لتسديد لوب عميق في الزاوية المقابلة أو شيزا سفلية (Chiquita) دقيقة.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 4,
    category: 'serve_return',
    categoryAr: 'الإرسال والاستقبال',
    pillarNumber: 1,
    questionAr: 'ما هي استراتيجيتك التكتيكية في توجيه ضربة الاستقبال (Return Placement)؟',
    scenarioAr: 'استقبلت إرسال المنافس، وعليك تحديد الضربة التي تكسر سيطرة لاعبيه الصاعدين للشبكة.',
    hintAr: 'معيار تنويع الرد بين اللوب المرتفع (Lob) والكرة المنخفضة في الأقدام (Chiquita).',
    options: [
      { 
        text: 'هدفي الوحيد رد الكرة لأي مكان متاح، وغالباً ما تذهب سهلة إلى لاعبي الشبكة فينقضون عليها بحسم.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أعتمد دائماً على اللوب المرتفع ولكن كثيراً ما يخرج طويلاً خارج الزجاج الخلفي أو يكون قصيراً جداً.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أنوع بنجاح بين لوب عالي خلف لاعبي الشبكة وبين كرة منخفضة عند أقدام اللاعب المتقدم لمنعه من الهجوم.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'أتقن ضربة "التشيكيتا" (Chiquita) السفلية عند أقدام المهاجمين لإجبارهم على رفع الفولي ثم انتزاع موقع الشبكة منهم فوراً.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },

  // ==========================================
  // PILLAR 2: NET PLAY & VOLLEYS (الشبكة والفولي)
  // ==========================================
  {
    id: 5,
    category: 'net_volleys',
    categoryAr: 'الشبكة والفولي',
    pillarNumber: 2,
    questionAr: 'ما هي دقة وميكانيكية تسديدك لفولي الفورهاند والباكهاند القاطع (Sliced Volley)؟',
    scenarioAr: 'أنت متمركز عند الشبكة وتأتيك كرة متوسطة الارتفاع تريد إعادتها بقوة قطع سفلية.',
    hintAr: 'معيار تثبيت الرسغ، منع أرجحة المضرب للخلف، والقطع السفلي المنخفض (Under-spin).',
    options: [
      { 
        text: 'أؤرجح المضرب للخلف باندفاع مثل التنس فتطير الكرة مباشرة إلى الزجاج الخلفي للخصم دون لمس الأرض.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'ألكم الكرة حركة مسطحة (Block) بدون دوران قاطع، فترتد الكرة بارتفاع يسهل على المدافع التعامل معها.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أضرب بفولي قاطع خفيف (Under-spin) مع نقل وزن الجسم للأمام ووضع الكرة في عمق زوايا الملعب بنسبة نجاح 80%.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'فولي قاطع احترافي ثقيل ومائل (Heavy Slice) يموت ارتداده عن الجدران، مع ثبات كامل لمعصم اليد والتحكم في الاتجاه.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 6,
    category: 'net_volleys',
    categoryAr: 'الشبكة والفولي',
    pillarNumber: 2,
    questionAr: 'كيف تتصرف عندما يوجه الخصم كرة صاروخية سريعة مباشرة نحو جسمك أو صدرك عند الشبكة؟',
    scenarioAr: 'المنافس سدد ضربة باخادا أو فورهاند قوي باتجاهك مباشرة ولا تملك سوى كسر من الثانية للتصرف.',
    hintAr: 'معيار ردود الأفعال الانعكاسية (Reflexes) واستخدام الباكهاند بلوك لامتصاص السرعة.',
    options: [
      { 
        text: 'أشعر بالذعر وأحمي وجهي بالمضرب دون توجيه، أو أبتعد عن مسار الكرة فتضيع النقطة فوراً.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أضع المضرب لصد الكرة (Block) دفاعياً لكنها غالباً ما تصعد عالية فوق الشبكة وتصبح صيداً سهلاً للمنافس.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'رد فعل سريع باستخدام الباكهاند بلوك لامتصاص قوة الكرة وإعادتها منخفضة وميتة فوق الشبكة في المساحة الخالية.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'ردود أفعال ميكانيكية متقدمة؛ تحويل فوري لسرعة الكرة إلى فولي زاوية قاتل نحو الشبك المعدني أو القدم الضعيفة للمنافس.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 7,
    category: 'net_volleys',
    categoryAr: 'الشبكة والفولي',
    pillarNumber: 2,
    questionAr: 'كيف تقيّم قدرتك على تنفيذ الفولي الساقط القصير (Drop Volley / Dejada) وفولي التهدئة؟',
    scenarioAr: 'تمركز مدافعي الخصم عميقاً جداً خلف خط الإرسال وتريد معاقبتهم بكرة ناعمة خلف الشبكة.',
    hintAr: 'معيار اللمسة الناعمة (Soft Hands) والتمويه وقراءة تمركز المنافسين.',
    options: [
      { 
        text: 'لا أحاول تنفيذه إطلاقاً لأنه غالباً ما يسقط في شباك ملعبي أو يرتفع عالياً بدون تحكم.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أنفذه أحياناً بتهور عندما يكون الخصم قريباً فيسهل عليه اللحاق به وتسجيل النقطة في وجهي.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أختار التوقيت المناسب عندما يكون المنافسون في أقصى الخلف، فتسقط الكرة بهدوء بنسبة ارتداد منخفضة قرب الشباك.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'تمويه خادع لحركة الذراع حتى اللحظة الأخيرة، مع لمسة ناعمة تميت الكرة تماماً بجانب الشبك الجانبي (Malla) دون رد.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 8,
    category: 'net_volleys',
    categoryAr: 'الشبكة والفولي',
    pillarNumber: 2,
    questionAr: 'ما مدى ثباتك وصمودك في اشتباكات الشبكة السريعة وتبادل الفوليهات الصاروخية المتتالية؟',
    scenarioAr: 'الفريقان متواجدان عند الشبكة واندلع اشتباك سريع ومتبادل بالكرات الهوائية (Net Duel).',
    hintAr: 'معيار التوازن، الوقفة المنخفضة، وسرعة إعادة تجهيز المضرب (Ready Position).',
    options: [
      { 
        text: 'أفقد توازني بعد أول كرة سريعة وأترك مساحات شاسعة مفتوحة في ملعبي أو أرتكب خطأ مباشراً.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أتحمل تبادل أو اثنين فقط قبل ارتكاب خطأ مباشر في الشبكة نتيجة التسرع وعدم استقرار الوقفة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أتحمل 4 إلى 6 تبادلات سريعة مع الحفاظ على وقفة الاستعداد المنخفضة وتغيير الاتجاه بحثاً عن ثغرة الخصم.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'هيمنة كاملة في اشتباكات الشبكة؛ قدرة فائقة على تغيير نسق السرعة والتهدئة التكتيكية لفرض السيطرة وحسم النقطة.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },

  // ==========================================
  // PILLAR 3: OVERHEAD SHOTS (الضربات الهوائية والعلوية)
  // ==========================================
  {
    id: 9,
    category: 'overhead_shots',
    categoryAr: 'الضربات العلوية',
    pillarNumber: 3,
    questionAr: 'كيف تنفذ ضربة البانديخا (Bandeja) عند مواجهة كرة لوب نصف عالية خلفك؟',
    scenarioAr: 'الخصم لعب لوب متوسط العمق وأنت عند الشبكة، وعليك الرجوع لضرب الكرة في الهواء للحفاظ على موقعك.',
    hintAr: 'معيار وضعية صينية التقديم، الضرب بجانب الرأس، وتوجيه الكرة للزاوية العميقة.',
    options: [
      { 
        text: 'أحاول ضربها سماتش بكامل قوتي من خلف رأسي فتطير الكرة عشوائياً أو ترتد سهلة جداً للخصم.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أتراجع وأضربها بدون دوران واضح، لتعود كرة عادية تسمح للخصم بالتقدم ومهاجمتي وانتزاع الشبكة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أرجع بخطوات جانبية سريعة وأنفذ بانديخا مقطوعة بدقة في الزاوية العميقة مع العودة الفورية لاحتلال الشبكة.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'بانديخا نموذجية بارتفاع مائل متقن، سرعة تحكم عالية تضع الكرة في تقاطع الجدارين (Doble Pared) دون منح المنافس أي زاوية.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 10,
    category: 'overhead_shots',
    categoryAr: 'الضربات العلوية',
    pillarNumber: 3,
    questionAr: 'ما مدى إتقانك لضربة الفيبورا الهجومية ذات الدوران الجانبي الحاد (Víbora)؟',
    scenarioAr: 'وصلتك كرة عالية عائمة على جانبك وتملك فرصة للهجوم الشرس بكرة تدور أفقياً وتزحف على الزجاج.',
    hintAr: 'معيار الدوران الجانبي (Side-spin) واستهداف أقدام المنافسين أو الشبك المعدني.',
    options: [
      { 
        text: 'لا أعرف تقنية الفيبورا وأخلط بينها وبين السماتش التقليدي أو البانديخا.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أحاول تنفيذها أحياناً لكن الكرة تخرج خارج الملعب أو تفقد الدوران وتكون سهلة للمنافس في الدفاع.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أضرب الكرة من جانب الرأس بدوران حلزوني جانبي يجعلها تنحرف نحو الشبك المعدني أو الزجاج الجانبي بقوة.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'فيبورا هجومية شرسة بزوايا حادة وسرعة خارقة، تلتصق بالزجاج الجانبي وتتحرك بشكل لولبي منخفض يستحيل إرجاعه.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 11,
    category: 'overhead_shots',
    categoryAr: 'الضربات العلوية',
    pillarNumber: 3,
    questionAr: 'كيف تقيّم قدرتك على حسم النقطة بالضربة الساحقة (Smash / Por 3 & Por 4)؟',
    scenarioAr: 'الخصم أخطأ ولعب لوباً قصيراً ومرتفعاً في منتصف ملعبك وأنت جاهز لحسم النقطة.',
    hintAr: 'معيار القوة والارتداد وإخراج الكرة خارج الملعب عبر الجدار الجانبي (Por 3) أو الخلفي (Por 4).',
    options: [
      { 
        text: 'أضرب بأقصى قوة للأرض فترتد الكرة من الزجاج الخلفي وتعود كهدية سهلة للمنافس لينهي النقطة في وجهي.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أستطيع تسديد سماتش قوي داخل الملعب ولكن نادراً ما أستطيع إخراج الكرة من القفص أو إرجاعها لملعبي.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أتقن السماتش الملتف (Topspin Smash) لإعادة الكرة إلى ملعبي فوق الشبكة، أو إخراجها (Por 3) عندما أكون قريباً من الشبكة.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'دقة مطلقة في ضربة الخروج من القفص (Por 3) من أي موقع بمنتصف الملعب، وضربة (Por 4) الساحقة فوق الجدار بارتياح كامل.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 12,
    category: 'overhead_shots',
    categoryAr: 'الضربات العلوية',
    pillarNumber: 3,
    questionAr: 'كيف تصف سرعة اتخاذك للقرار عند استقبال كرة عالية من الخصم (Overhead Decision Making)؟',
    scenarioAr: 'ارتفعت الكرة عالياً في السماء، ولديك ثانية واحدة لتقرر: سماتش هجومي، أم بانديخا، أم تركها ترتد من الزجاج.',
    hintAr: 'معيار النضج التكتيكي وقراءة عمق اللوب وسرعة الرياح وتمركز لاعبي الخصم.',
    options: [
      { 
        text: 'أتردد وأتحير بين ترك الكرة أو ضربها في الهواء، فترتطم بالمضرب بشكل سيء أو تسقط بيني وبين زميلي.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أضرب كل كرة عالية كسماتش هجومي دون النظر لموقعي أو سرعة اللوب مما يسبب أخطاء كثيرة متكررة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أميز بدقة: اللوب القصير أتعامل معه بسماتش حاسم، واللوب العميق ببانديخا لحفظ الشبكة، واللوب العالي جداً أتركه للزجاج.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'قراءة فورية في أجزاء من الثانية لموقع الخصم وارتفاع الكرة، واختيار الضربة المثالية بنسبة نجاح تفوق 92%.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },

  // ==========================================
  // PILLAR 4: WALL REBOUNDS & DEFENSE (الزجاج والدفاع واللوب)
  // ==========================================
  {
    id: 13,
    category: 'wall_defense',
    categoryAr: 'الزجاج والدفاع',
    pillarNumber: 4,
    questionAr: 'كيف تقرأ وتتعامل مع الكرات المرتدة من الجدار الزجاجي الخلفي البسيط (Single Back Glass)؟',
    scenarioAr: 'كرة عميقة تتجاوزك نحو الزجاج الخلفي، وعليك تنظيم وقفتك وتوقيت ضربها بعد الارتداد.',
    hintAr: 'معيار ترك مسافة كافية، انتظار خروج الكرة للأمام، والضرب عند استقرار الارتفاع.',
    options: [
      { 
        text: 'ألتصق بالزجاج خوفاً من اصطدام الكرة، أو أضربها أثناء ارتدادها للخلف فتصطدم بالمضرب بشكل سيء.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أترك مسافة لكنني أضرب الكرة مبكراً جداً فور خروجها من الزجاج قبل أن تستقر وتنخفض لارتفاع الخصر.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أتحرك مع الكرة وأتركها تتجاوزني نحو الزجاج ثم أضربها بهدوء بعد الارتداد ونزولها لارتفاع الخصر بأمان.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'مرونة وثقة مطلقة في قراءة سرعة الدوران، مع استخدام وقفة منخفضة وتوجيه الكرة للوب عميق أو كرة أرضية هجومية في خط مستقيم.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 14,
    category: 'wall_defense',
    categoryAr: 'الزجاج والدفاع',
    pillarNumber: 4,
    questionAr: 'كيف تتعامل مع الكرة المرتدة من الجدار المزدوج الملتف (Double Glass / Doble Pared)؟',
    scenarioAr: 'كرة ترتطم بالزجاج الخلفي ثم الجدار الجانبي (أو العكس) وتلتف بشكل دائري في زاوية ملعبك.',
    hintAr: 'معيار التمييز بين الجدار المزدوج الذي يفتح للخارج أو يغلق للداخل والحركة الدائرية.',
    options: [
      { 
        text: 'نقطة ضعفي الكبرى؛ يختل توازني تماماً وتدور الكرة حولي دون أن أعرف أين ستخرج فتضيع النقطة.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أنجح في إرجاعها أحياناً بضربة عشوائية للأعلى ولكن بدون أي تحكم أو اتزان حركي أو توجيه دقيق.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أميز نوع الجدار المزدوج (يفتح للخارج أو يغلق للداخل)، وأدور مع الكرة بخطوات دائرية لإعادتها بأمان فوق الشبكة.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'أقرأ زاوية الدوران بدقة متناهية، وأستغل ارتداد الجدار المزدوج لشن هجمة مضادة فورية بضربة باخادا سريعة أو لوب مثالي.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 15,
    category: 'wall_defense',
    categoryAr: 'الزجاج والدفاع',
    pillarNumber: 4,
    questionAr: 'ما هي جودة ودقة ضربة اللوب الدفاعي المرتفع والعميق (Defensive Lob)؟',
    scenarioAr: 'أنت تحت ضغط هجومي شديد من مهاجمي الشبكة وتحتاج لضرب لوب دفاعي يمنحك وزميلك فرصة استعادة الأنفاس.',
    hintAr: 'معيار الارتفاع الشاهق والعمق الذي يسقط داخل المتر الأخير قبل الزجاج الخلفي للخصم.',
    options: [
      { 
        text: 'ضرباتي منخفضة وسهلة لمهاجمي الشبكة، أو ترتطم مباشرة بسقف الملعب أو الزجاج الخلفي للخارج.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'اللوب الخاص بي غالباً ما يكون قصيراً جداً في منتصف الملعب، مما يمنح الخصم سماتشاً سهلاً جداً لإنهاء النقطة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أتقن تسديد لوب مرتفع وعميق يسقط على بُعد خطوات من الزجاج الخلفي للخصم، ويدفعه للتراجع لانتزاع الشبكة منه.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'لوب دفاعي وهجومي فتاك؛ دقة سنتيمترية في الزوايا العميقة، مع قدرة على تنفيذ اللوب من أصعب الوضعيات تحت الضغط الخانق.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 16,
    category: 'wall_defense',
    categoryAr: 'الزجاج والدفاع',
    pillarNumber: 4,
    questionAr: 'ما مدى قدرتك على تنفيذ ضربة الباخادا الهجومية من الزجاج الخلفي المرتفع (Bajada de Pared)؟',
    scenarioAr: 'ارتدت الكرة عالية جداً من الزجاج الخلفي وأصبحت أعلى من مستوى كتفك وأنت تواجه الملعب.',
    hintAr: 'معيار التحول من الدفاع إلى هجوم ساحق وقطع الكرة من أعلى لأسفل.',
    options: [
      { 
        text: 'لا أستطيع تنفيذها وأنتظر نزول الكرة للأرض دائماً برد دفاعي بطيء يمنح الخصم وقتاً للاستعداد.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'أحاول ضربها بقوة من أعلى لكنها تصطدم بالشبكة أو تطير خارج الملعب بدون دوران متحكم به.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أضرب كرة باخادا سريعة هابطة عندما ترتد الكرة عالية من الزجاج، وأوجهها في أقدام مهاجمي الشبكة أو في المنتصف.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'باخادا هجومية فتاكة ومقطوعة بدوران فورهاند أو باكهاند مع فتح الزاوية في التقاطع الخالي لإنهاء النقطة مباشرة.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },

  // ==========================================
  // PILLAR 5: COURT POSITIONING & TACTICS (التمركز والتكتيك)
  // ==========================================
  {
    id: 17,
    category: 'tactics_positioning',
    categoryAr: 'التمركز والتكتيك',
    pillarNumber: 5,
    questionAr: 'كيف تصف التناغم الحركي والتمركز المشترك مع زميلك في الملعب (The Invisible Rope)؟',
    scenarioAr: 'المباراة تجري بإيقاع سريع وتتطلب تحرك الثنائي ككتلة واحدة صعوداً للشبكة وهبوطاً للدفاع.',
    hintAr: 'معيار الحبل غير المرئي بين اللاعبين وتغطية الخطوط وتجنب الفجوات القاتلة.',
    options: [
      { 
        text: 'ألعب بمفردي تماماً؛ أحياناً أكون أنا وزميلي في نفس المكان أو نتصادم بالمضارب وتضيع النقطة.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'نتفق على خطة عامة لكننا ننسى التحرك معاً، فتجد أحياناً أحدنا عند الشبكة والآخر في أقصى الخلف دون داعٍ.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'نتحرك معاً كخط متزامن (حبل غير مرئي)؛ نصعد معاً للشبكة ونتراجع معاً للدفاع ونغطي زوايا بعضنا بنجاح.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'تفاهم غريزي وتنسيق كامل في تغطية المساحات، مع حركات تغطية عكسية (Switching) سريعة وتواصل فوري وتناغم ذهني عالي.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 18,
    category: 'tactics_positioning',
    categoryAr: 'التمركز والتكتيك',
    pillarNumber: 5,
    questionAr: 'ما مدى صبرك وانضباطك التكتيكي في بناء النقطة أثناء الراليات الطويلة (Shot Selection & Patience)؟',
    scenarioAr: 'رالي محتدم استمر أكثر من 10 ضربات والخصم يدافع بصلابة دون ارتكاب خطأ واضح.',
    hintAr: 'معيار الصبر وعدم التهور بتسديد كرات فائزة مستحيلة وانتظار الكرة المناسبة.',
    options: [
      { 
        text: 'أفقد صبري بعد 3 أو 4 ضربات وأحاول تسديد كرة فائزة مستحيلة فأرتكب خطأ مباشراً يضيع النقطة.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'ألعب راليات أطول لكنني أتعجل الهجوم في كرات غير مناسبة مما يكلفنا النقطة في لحظات متكررة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'أتحلى بالصبر وأبني النقطة بذكاء، وأنتظر حتى يجبر تكتيكنا الخصم على تقديم كرة ضعيفة قبل شن الهجوم الحاسم.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'إدارة استراتيجية متكاملة للنقطة، تحكم كامل في إيقاع اللعب بين التهدئة والتسريع، مع نسبة أخطاء شبه معدومة في الراليات الطويلة.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 19,
    category: 'tactics_positioning',
    categoryAr: 'التمركز والتكتيك',
    pillarNumber: 5,
    questionAr: 'كيف تتواصل مع زميلك وتتقاسم المسؤولية عن الكرات الموجهة في منتصف الملعب (Center Court Communication)؟',
    scenarioAr: 'كرة هجومية من الخصم تتجه في منتصف الملعب تماماً بينك وبين زميلك.',
    hintAr: 'معيار قاعدة الفورهاند في المنتصف والنداء الصوتي المبكر (Mía / Tuya).',
    options: [
      { 
        text: 'نترك الكرات المشتركة تمر بيننا ظناً أن الآخر سيأخذها، أو نتصادم بالمضارب في ارتباك دائم.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'ننادي متأخرين مما يسبب تردداً وتضرب الكرة باهتزاز وضعف يسهل على المنافس ردها.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'قاعدة واضحة: اللاعب الذي يملك الفورهاند في المنتصف يأخذ الكرة المشتركة، مع نداء صوتي مسبق واضح (لك / لي).',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'تواصل صوتي وبصري احترافي قبل كسر اللوب، مع تغطية استباقية لثغرات المنتصف وإغلاق كامل لزوايا تمرير المنافسين.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  },
  {
    id: 20,
    category: 'tactics_positioning',
    categoryAr: 'التمركز والتكتيك',
    pillarNumber: 5,
    questionAr: 'كيف تدير النقطة الذهبية (Punto de Oro) والنقاط الحاسمة تحت الضغط الذهني العالي؟',
    scenarioAr: 'النتيجة 40-40 (النقطة الذهبية)، نقطة واحدة تفصل بين الفوز بالشوط أو خسارته.',
    hintAr: 'معيار الثبات الانفعالي، اختيار الخطة الأبسط والأكثر أماناً، والجرأة المدروسة.',
    options: [
      { 
        text: 'يتجمد تفكيري تحت الضغط وأرتكب أخطاء ساذجة في الإرسال أو اللمسة الأولى نتيجة التوتر العصبي.',
        score: 1,
        tierTag: 'Tier D / D+ (مبتدئ)'
      },
      { 
        text: 'ألعب بحذر شديد مبالغ فيه يجعل ضرباتي قصيرة وضعيفة فينقض عليها المنافس ويحسم النقطة بسهولة.',
        score: 2,
        tierTag: 'Tier C / C+ (متوسط)'
      },
      { 
        text: 'نضع خطة تكتيكية محددة للنقطة الذهبية، ونستهدف اللاعب الأضعف أو الزاوية الأكثر أماناً بثبات ذهني ملحوظ.',
        score: 3,
        tierTag: 'Tier B / B+ (متقدم)'
      },
      { 
        text: 'هدوء أعصاب نخبوي، استغلال ذكاء تكتيكي وخبرة عالية لاقتناص النقطة الذهبية بتنفيذ متقن ومثالي بدون أي تردد.',
        score: 4,
        tierTag: 'Tier A / A+ (محترف)'
      }
    ]
  }
];

export function mapScoreToPlaytomicTier(scoreVal: number): { tier: PlaytomicTier; tierAr: string } {
  if (scoreVal < 2.0) return { tier: 'D', tierAr: 'مبتدئ تأسيسي (Tier D)' };
  if (scoreVal < 2.6) return { tier: 'D+', tierAr: 'مبتدئ متمرس (Tier D+)' };
  if (scoreVal < 3.6) return { tier: 'C', tierAr: 'متوسط أدنى (Tier C)' };
  if (scoreVal < 4.6) return { tier: 'C+', tierAr: 'متوسط أعلى (Tier C+)' };
  if (scoreVal < 5.6) return { tier: 'B', tierAr: 'متقدم تنافسي (Tier B)' };
  if (scoreVal < 6.3) return { tier: 'B+', tierAr: 'متقدم نخبوي (Tier B+)' };
  if (scoreVal < 6.8) return { tier: 'A', tierAr: 'محترف بطولات (Tier A)' };
  return { tier: 'A+', tierAr: 'نخبة المحترفين (Tier A+)' };
}

export function calculateTestResult(answers: Record<number, number>): TestResultData {
  let totalScore = 0;
  const maxScore = ASSESSMENT_QUESTIONS.length * 4; // 20 * 4 = 80

  // 5 Pillars tracking
  const pillarTotals: Record<PillarKey, { score: number; count: number; nameAr: string }> = {
    serve_return: { score: 0, count: 0, nameAr: 'الإرسال واستقبال الإرسال' },
    net_volleys: { score: 0, count: 0, nameAr: 'اللعب عند الشبكة والكرات الطائرة' },
    overhead_shots: { score: 0, count: 0, nameAr: 'الضربات الهوائية والعلوية' },
    wall_defense: { score: 0, count: 0, nameAr: 'الارتداد عن الزجاج والدفاع واللوب' },
    tactics_positioning: { score: 0, count: 0, nameAr: 'التمركز التكتيكي واستراتيجية الملعب' }
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const selectedOptionIdx = answers[q.id] ?? 0;
    const scoreVal = q.options[selectedOptionIdx]?.score || 1;
    totalScore += scoreVal;

    if (pillarTotals[q.category]) {
      pillarTotals[q.category].score += scoreVal;
      pillarTotals[q.category].count += 1;
    }
  });

  const percentage = Math.round((totalScore / maxScore) * 100);

  // Accurate Playtomic continuous rating (scale 1.0 to 7.0+)
  // Score 20 -> 1.00, Score 80 -> 7.00
  const rawPlaytomic = 1.0 + ((totalScore - 20) / 60) * 6.0;
  const playtomicScore = Number(Math.min(7.0, Math.max(1.0, rawPlaytomic)).toFixed(2));
  const { tier: playtomicTier, tierAr: playtomicTierAr } = mapScoreToPlaytomicTier(playtomicScore);

  // Map to platform 5 levels for training program unlocks:
  // Level 1: 20 - 35 (Playtomic 1.0 - 2.5) -> Tier D / D+
  // Level 2: 36 - 49 (Playtomic 2.6 - 3.8) -> Tier C
  // Level 3: 50 - 61 (Playtomic 3.9 - 5.0) -> Tier C+ / B
  // Level 4: 62 - 71 (Playtomic 5.1 - 6.1) -> Tier B+
  // Level 5: 72 - 80 (Playtomic 6.2 - 7.0) -> Tier A / A+
  let levelNumber: PadelLevelNumber = 1;
  if (totalScore >= 72) {
    levelNumber = 5;
  } else if (totalScore >= 62) {
    levelNumber = 4;
  } else if (totalScore >= 50) {
    levelNumber = 3;
  } else if (totalScore >= 36) {
    levelNumber = 2;
  } else {
    levelNumber = 1;
  }

  const levelInfo = PADEL_LEVELS[levelNumber];

  // Pillar breakdown construction
  const pillarBreakdown: Record<PillarKey, PillarScoreDetail> = {} as Record<PillarKey, PillarScoreDetail>;
  const pillarList: PillarScoreDetail[] = [];

  (Object.keys(pillarTotals) as PillarKey[]).forEach((key) => {
    const item = pillarTotals[key];
    const maxPillarScore = item.count * 4; // 4 * 4 = 16
    const pillarPerc = maxPillarScore > 0 ? Math.round((item.score / maxPillarScore) * 100) : 0;
    const rawPillarPlaytomic = 1.0 + ((item.score - 4) / 12) * 6.0;
    const pillarPtScore = Number(Math.min(7.0, Math.max(1.0, rawPillarPlaytomic)).toFixed(2));
    const pillarTierInfo = mapScoreToPlaytomicTier(pillarPtScore);

    const detail: PillarScoreDetail = {
      key,
      nameAr: item.nameAr,
      score: item.score,
      maxScore: maxPillarScore,
      percentage: pillarPerc,
      playtomicScore: pillarPtScore,
      tier: pillarTierInfo.tier,
      tierAr: pillarTierInfo.tierAr
    };

    pillarBreakdown[key] = detail;
    pillarList.push(detail);
  });

  // Sort pillars to find strengths and weaknesses
  pillarList.sort((a, b) => b.percentage - a.percentage);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Top 2 pillars
  strengths.push(`كفاءة مرتفعة في ${pillarList[0].nameAr} بنسبة إتقان ${pillarList[0].percentage}% (Playtomic ${pillarList[0].playtomicScore})`);
  strengths.push(`أداء واعد في ${pillarList[1].nameAr} بنسبة إتقان ${pillarList[1].percentage}% (${pillarList[1].tierAr})`);
  if (totalScore >= 50) {
    strengths.push('نضج تكتيكي ملحوظ في السيطرة على مجريات المباراة وتقدير المخاطر');
  } else {
    strengths.push('إمكانات واعدة لتطور سريع بفضل وضوح نقاط القوة في الأساسيات');
  }

  // Bottom 2 pillars for focused training
  const lowest = pillarList[pillarList.length - 1];
  const secondLowest = pillarList[pillarList.length - 2];

  weaknesses.push(`أولوية تدريب قصوى: تعزيز ${lowest.nameAr} (معدلك الحالي: ${lowest.playtomicScore} - ${lowest.percentage}%)`);
  weaknesses.push(`تطوير المهارات التكتيكية في ${secondLowest.nameAr} لرفع تصنيفك العام`);
  if (levelNumber <= 2) {
    weaknesses.push('زيادة ساعات اللعب مع الجدران الزجاجية وبناء الصبر وتفادي التسرع في إنهاء النقاط');
  } else if (levelNumber === 3) {
    weaknesses.push('إتقان ضربات البانديخا والفيبورا في الزوايا العميقة لمنع الخصم من افتكاك الشبكة');
  } else {
    weaknesses.push('صقل حسم الكرات الذهبية (Punto de Oro) والسماتش الخارجي في البطولات التنافسية');
  }

  const playtomicBadge = `Playtomic Level ${playtomicScore.toFixed(2)} (${playtomicTier})`;

  let personalizedMessage = '';
  switch (levelNumber) {
    case 1:
      personalizedMessage = `تهانينا على إتمام الاختبار التشخيصي الشامل! تصنيفك وفق معايير Playtomic هو (${playtomicBadge})، مما يضعك في المستوى الأول (مبتدئ). هذه المحطة التأسيسية الذهبية لاكتساب القبضة القارية، التمركز الصحيح، وبناء علاقة آمنة مع الجدران الزجاجية. برنامجك التدريبي لمدة ${levelInfo.recommendedProgramWeeks} أسابيع جاهز لفتح أبواب التطور أمامك.`;
      break;
    case 2:
      personalizedMessage = `أداء رائع ومحفز! تصنيفك المعتمد وفق Playtomic هو (${playtomicBadge})، في المستوى الثاني (متوسط أدنى). لديك معرفة واضحة باللعبة وشغف متقد. التحدي الآن هو التحول من مجرد رد الكرة إلى التوجيه القاطع، الصعود المدروس للشبكة، واستثمار الجدار الخلفي في الدفاع.`;
      break;
    case 3:
      personalizedMessage = `مستوى متميز ومثير للإعجاب! تصنيفك وفق مقياس Playtomic هو (${playtomicBadge})، في المستوى الثالث (متوسط / متوسط أعلى). أنت لاعب متمرس تشكل خطورة حقيقية بالملعب. للقفز إلى صفوف النخبة المتقدمة، حان وقت إتقان ضربات البانديخا والتحكم الكامل في وتيرة النقطة عبر برنامجك المخصص.`;
      break;
    case 4:
      personalizedMessage = `تصنيف متقدم رفيع المستوى! درجتك وفق تقييم Playtomic الرسمي تعادل (${playtomicBadge})، في المستوى الرابع (متقدم). أسلوبك يتسم بالدقة والذكاء التكتيكي والتنوع الهجومي. ركز في تدريباتك القادمة على الفيبورا الساحقة، سماتش الخروج من القفص (Por 3)، وحسم النقاط المعقدة.`;
      break;
    case 5:
      personalizedMessage = `تصنيف نخبوي استثنائي! حققت تقييم Playtomic فائقاً يعادل (${playtomicBadge})، في المستوى الخامس (نخبة المحترفين / Pro). تمتلك جميع المقومات الفنية والبدنية والتكتيكية لخوض بطولات الفئة الأولى. خطتك التدريبية المتقدمة تركز على اللياقة التنافسية وسرعة رد الفعل والجاهزية للبطولات.`;
      break;
  }

  return {
    totalScore,
    maxScore,
    percentage,
    levelNumber,
    levelTitle: levelInfo.titleAr,
    playtomicScore,
    playtomicTier,
    playtomicBadge,
    pillarBreakdown,
    strengths,
    weaknesses,
    personalizedMessage,
    takenAt: new Date().toISOString(),
    answers
  };
}
