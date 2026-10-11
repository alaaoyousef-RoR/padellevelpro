import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageRoute, 
  PadelLevelNumber, 
  TestResultData, 
  TrainingSession, 
  UserProfile 
} from '../types';
import { PADEL_LEVELS } from '../data/assessmentData';

export interface SkillItemDefinition {
  id: string;
  nameAr: string;
  category: string;
  descriptionAr: string;
}

export const MASTER_SKILLS_LIST: SkillItemDefinition[] = [
  { id: 'forehand_control', nameAr: 'التحكم في الفورهاند (Forehand Control)', category: 'ضربات أرضية', descriptionAr: 'توجيه ضربات الفورهاند بدقة وعمق وثبات في عمق الملعب' },
  { id: 'backhand_control', nameAr: 'التحكم في الباكهاند (Backhand Control)', category: 'ضربات أرضية', descriptionAr: 'إعادة كرات الباكهاند بأمان وقوة وتجنب الأخطاء عند الزوايا' },
  { id: 'volley_net', nameAr: 'الفولي عند الشبكة (Volley)', category: 'كرات هوائية', descriptionAr: 'لكم الكرة بحركة Punch قاطعة وتوجيهها في أقدام الخصم' },
  { id: 'smash_overhead', nameAr: 'الضربة الساحقة (Smash / Remate)', category: 'كرات هوائية', descriptionAr: 'حسم الكرات العالية بتوجيه ذكي أو إخراج الكرة خارج القفص' },
  { id: 'footwork_split', nameAr: 'حركة القدمين والرشاقة (Footwork)', category: 'لياقة وحركة', descriptionAr: 'إتقان القفزة التحضيرية والخطوات الجانبية والتوازن' },
  { id: 'movement_recovery', nameAr: 'التمركز واستعادة الموقع (Recovery)', category: 'تمركز', descriptionAr: 'العودة الفورية لموقع التمركز المثالي بعد كل ضربة' },
  { id: 'using_walls', nameAr: 'استخدام الجدران الزجاجية (Using Walls)', category: 'جدران', descriptionAr: 'قراءة ارتداد الكرة من الزجاج الخلفي والمزدوج بهدوء' },
  { id: 'bandeja_shot', nameAr: 'ضربة البانديخا (Bandeja)', category: 'ضربات خاصة', descriptionAr: 'الحفاظ على موقع الشبكة بضربة هوائية مقطوعة عميقة' },
  { id: 'vibora_shot', nameAr: 'ضربة الفيبورا (Víbora)', category: 'ضربات خاصة', descriptionAr: 'هجوم حاسم بدوران جانبي يزحف بالكرة على الأرض' },
  { id: 'tactics_positioning', nameAr: 'التمركز والتناغم المشترك (Tactics & Positioning)', category: 'تكتيك', descriptionAr: 'التحرك كحبل متصل مع الزميل والتواصل الصوتي المستمر' },
  { id: 'consistency_rallies', nameAr: 'الثبات في الراليات (Consistency)', category: 'عقلية وصبر', descriptionAr: 'بناء النقطة بصبر وتبادل 15+ ضربة دون ارتكاب خطأ ذاتي' },
  { id: 'shot_placement', nameAr: 'توجيه ودقة وضع الكرة (Shot Placement)', category: 'دقة وتوجيه', descriptionAr: 'استهداف الفراغات بين اللاعبين وزوايا الشباك والزجاج' }
];

interface AppContextType {
  user: UserProfile | null;
  firebaseUser: any | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  currentPage: PageRoute;
  selectedTechniqueSlug: string | null;
  testResult: TestResultData | null;
  trainingSessions: TrainingSession[];
  masteredSkills: string[];
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  navigateTo: (page: PageRoute, params?: { techniqueSlug?: string }) => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginDemo: () => void;
  logout: () => Promise<void>;
  saveAssessmentResult: (result: TestResultData) => Promise<void>;
  addTrainingSession: (session: Omit<TrainingSession, 'id' | 'createdAt'>) => Promise<void>;
  deleteTrainingSession: (id: string) => Promise<void>;
  toggleSkillMastered: (skillId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'padellevel_user',
  TEST_RESULT: 'padellevel_test_result',
  SESSIONS: 'padellevel_sessions',
  SKILLS: 'padellevel_mastered_skills'
};

const DEFAULT_DEMO_SESSIONS: TrainingSession[] = [
  {
    id: 'sess-1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'تقنية وتكنيك الفولي عند الشبكة',
    durationMinutes: 75,
    skillsWorkedOn: ['volley_net', 'footwork_split', 'shot_placement'],
    rating: 8,
    notes: 'تحسن ملحوظ في توجيه الفولي القاطع نحو الزجاج الجانبي، والالتزام بالوقفة المنخفضة.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sess-2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'الدفاع عن الجدار الزجاجي الخلفي واللوب',
    durationMinutes: 60,
    skillsWorkedOn: ['using_walls', 'movement_recovery', 'consistency_rallies'],
    rating: 9,
    notes: 'تم تبادل 12 رالي طويل متصل بدون ارتكاب خطأ في الشبكة، مع تنفيذ لوب دفاعي متقن.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sess-3',
    date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    focus: 'مباراة تدريبية وتمركز ثنائي',
    durationMinutes: 90,
    skillsWorkedOn: ['tactics_positioning', 'forehand_control', 'backhand_control'],
    rating: 8,
    notes: 'تواصل صوتي ممتاز مع الزميل وتغطية الخط المستقيم بنجاح في أغلب النقاط.',
    createdAt: new Date().toISOString()
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedTechniqueSlug, setSelectedTechniqueSlug] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [testResult, setTestResult] = useState<TestResultData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEST_RESULT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_SESSIONS;
    } catch {
      return DEFAULT_DEMO_SESSIONS;
    }
  });

  const [masteredSkills, setMasteredSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : ['forehand_control', 'volley_net', 'footwork_split', 'consistency_rallies'];
    } catch {
      return ['forehand_control', 'volley_net', 'footwork_split', 'consistency_rallies'];
    }
  });

  // Sync state changes with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    if (testResult) {
      localStorage.setItem(STORAGE_KEYS.TEST_RESULT, JSON.stringify(testResult));
    }
  }, [testResult]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(trainingSessions));
  }, [trainingSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(masteredSkills));
  }, [masteredSkills]);

  const navigateTo = (page: PageRoute, params?: { techniqueSlug?: string }) => {
    setCurrentPage(page);
    if (params?.techniqueSlug) {
      setSelectedTechniqueSlug(params.techniqueSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Google Authentication simulation
  const loginWithGoogle = async () => {
    try {
      const mockProfile: UserProfile = {
        id: 'google_user_' + Date.now(),
        fullName: 'لاعب جوجل بادل',
        email: 'player.google@padellevel.pro',
        padelLevel: testResult ? testResult.levelTitle : undefined,
        levelNumber: testResult ? testResult.levelNumber : undefined,
        testScore: testResult ? testResult.totalScore : undefined,
        playtomicScore: testResult ? testResult.playtomicScore : undefined,
        playtomicTier: testResult ? testResult.playtomicTier : undefined,
        pillarBreakdown: testResult ? testResult.pillarBreakdown : undefined,
        testTaken: !!testResult,
        testResultDate: testResult?.takenAt,
        strengths: testResult?.strengths,
        weaknesses: testResult?.weaknesses,
        createdAt: new Date().toISOString()
      };
      setUser(mockProfile);
      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل تسجيل الدخول بواسطة Google.';
      return { success: false, message };
    }
  };

  // Email & Password Login
  const login = async (email: string, pass: string) => {
    try {
      if (!email || !pass) {
        return { success: false, message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' };
      }
      const existingUser = user;
      const profile: UserProfile = existingUser ? {
        ...existingUser,
        email: email.trim(),
        fullName: existingUser.fullName || email.split('@')[0]
      } : {
        id: 'user_' + Date.now(),
        fullName: email.split('@')[0],
        email: email.trim(),
        padelLevel: testResult ? testResult.levelTitle : undefined,
        levelNumber: testResult ? testResult.levelNumber : undefined,
        testScore: testResult ? testResult.totalScore : undefined,
        playtomicScore: testResult ? testResult.playtomicScore : undefined,
        playtomicTier: testResult ? testResult.playtomicTier : undefined,
        pillarBreakdown: testResult ? testResult.pillarBreakdown : undefined,
        testTaken: !!testResult,
        testResultDate: testResult?.takenAt,
        strengths: testResult?.strengths,
        weaknesses: testResult?.weaknesses,
        createdAt: new Date().toISOString()
      };

      setUser(profile);
      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل تسجيل الدخول.';
      return { success: false, message };
    }
  };

  // Email & Password Registration
  const register = async (fullName: string, email: string, pass: string) => {
    try {
      if (!fullName || !email || !pass) {
        return { success: false, message: 'يرجى تعبئة كافة الحقول المطلوبة.' };
      }
      const newProfile: UserProfile = {
        id: 'user_' + Date.now(),
        fullName: fullName.trim(),
        email: email.trim(),
        padelLevel: testResult ? testResult.levelTitle : undefined,
        levelNumber: testResult ? testResult.levelNumber : undefined,
        testScore: testResult ? testResult.totalScore : undefined,
        playtomicScore: testResult ? testResult.playtomicScore : undefined,
        playtomicTier: testResult ? testResult.playtomicTier : undefined,
        pillarBreakdown: testResult ? testResult.pillarBreakdown : undefined,
        testTaken: !!testResult,
        testResultDate: testResult?.takenAt,
        strengths: testResult?.strengths,
        weaknesses: testResult?.weaknesses,
        createdAt: new Date().toISOString()
      };

      setUser(newProfile);
      closeAuthModal();
      return { success: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل إنشاء الحساب.';
      return { success: false, message };
    }
  };

  const loginDemo = () => {
    const demoLevel: PadelLevelNumber = 3;
    const levelInfo = PADEL_LEVELS[demoLevel];
    const demoResult: TestResultData = {
      totalScore: 56,
      maxScore: 80,
      percentage: 70,
      levelNumber: demoLevel,
      levelTitle: levelInfo.titleAr,
      playtomicScore: 4.60,
      playtomicTier: 'B',
      playtomicBadge: 'Playtomic Level 4.60 (B)',
      pillarBreakdown: {
        serve_return: {
          key: 'serve_return',
          nameAr: 'الإرسال واستقبال الإرسال',
          score: 11,
          maxScore: 16,
          percentage: 69,
          playtomicScore: 4.50,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        net_volleys: {
          key: 'net_volleys',
          nameAr: 'اللعب عند الشبكة والكرات الطائرة',
          score: 13,
          maxScore: 16,
          percentage: 81,
          playtomicScore: 5.50,
          tier: 'B',
          tierAr: 'متقدم تنافسي (Tier B)'
        },
        overhead_shots: {
          key: 'overhead_shots',
          nameAr: 'الضربات الهوائية والعلوية',
          score: 10,
          maxScore: 16,
          percentage: 63,
          playtomicScore: 4.00,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        wall_defense: {
          key: 'wall_defense',
          nameAr: 'الارتداد عن الزجاج الدفاعي واللوب',
          score: 10,
          maxScore: 16,
          percentage: 63,
          playtomicScore: 4.00,
          tier: 'C+',
          tierAr: 'متوسط أعلى (Tier C+)'
        },
        tactics_positioning: {
          key: 'tactics_positioning',
          nameAr: 'التمركز التكتيكي واستراتيجية الملعب',
          score: 12,
          maxScore: 16,
          percentage: 75,
          playtomicScore: 5.00,
          tier: 'B',
          tierAr: 'متقدم تنافسي (Tier B)'
        }
      },
      strengths: [
        'تميز واضح في الكرات الهوائية واللعب عند الشبكة بنسبة إتقان 81%',
        'إتقان واعد في التمركز التكتيكي والتناغم مع الزميل',
        'فهم ملموس لقوانين التمركز والحفاظ على التوازن أثناء المباراة'
      ],
      weaknesses: [
        'أولوية تدريب: تطوير ضربات البانديخا والفيبورا لمنع الخصم من استرداد موقع الهجوم',
        'تحسين اللوب الدفاعي المرتفع في الزوايا المعقدة وقراءة ارتداد الجدار المزدوج'
      ],
      personalizedMessage: 'أداء متميز! تصنيفك وفق معايير Playtomic هو (Playtomic Level 4.60 B)، في المستوى الثالث (متوسط / متوسط أعلى). تمتلك فهماً تكتيكياً جيداً وتستطيع السيطرة على مجريات اللعب. برنامجك التدريبي لمدة 8 أسابيع جاهز للارتقاء بمهاراتك نحو الفئة المتقدمة.',
      takenAt: new Date().toISOString(),
      answers: {}
    };

    const demoProfile: UserProfile = {
      id: 'demo_user_001',
      fullName: 'كابتن أحمد يوسف',
      email: 'player@padellevel.pro',
      padelLevel: levelInfo.titleAr,
      levelNumber: demoLevel,
      testScore: 56,
      playtomicScore: 4.60,
      playtomicTier: 'B',
      pillarBreakdown: demoResult.pillarBreakdown,
      testTaken: true,
      testResultDate: new Date().toISOString(),
      strengths: demoResult.strengths,
      weaknesses: demoResult.weaknesses,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    setUser(demoProfile);
    setTestResult(demoResult);
    closeAuthModal();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    navigateTo('home');
  };

  const saveAssessmentResult = async (result: TestResultData) => {
    setTestResult(result);
    localStorage.setItem(STORAGE_KEYS.TEST_RESULT, JSON.stringify(result));

    const updatedUser: UserProfile = user ? {
      ...user,
      padelLevel: result.levelTitle,
      levelNumber: result.levelNumber,
      testScore: result.totalScore,
      playtomicScore: result.playtomicScore,
      playtomicTier: result.playtomicTier,
      pillarBreakdown: result.pillarBreakdown,
      testTaken: true,
      testResultDate: result.takenAt,
      strengths: result.strengths,
      weaknesses: result.weaknesses
    } : {
      id: 'guest_' + Date.now(),
      fullName: 'لاعب بادل',
      email: 'guest@padellevel.pro',
      padelLevel: result.levelTitle,
      levelNumber: result.levelNumber,
      testScore: result.totalScore,
      playtomicScore: result.playtomicScore,
      playtomicTier: result.playtomicTier,
      pillarBreakdown: result.pillarBreakdown,
      testTaken: true,
      testResultDate: result.takenAt,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      createdAt: new Date().toISOString()
    };

    setUser(updatedUser);
  };

  const addTrainingSession = async (sessionData: Omit<TrainingSession, 'id' | 'createdAt'>) => {
    const newSession: TrainingSession = {
      ...sessionData,
      id: 'sess_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setTrainingSessions(prev => [newSession, ...prev]);
  };

  const deleteTrainingSession = async (id: string) => {
    setTrainingSessions(prev => prev.filter(s => s.id !== id));
  };

  const toggleSkillMastered = (skillId: string) => {
    setMasteredSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId) 
        : [...prev, skillId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        firebaseUser: null,
        isAuthenticated: !!user,
        isAuthLoading,
        currentPage,
        selectedTechniqueSlug,
        testResult,
        trainingSessions,
        masteredSkills,
        isAuthModalOpen,
        authModalTab,
        navigateTo,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        login,
        register,
        loginDemo,
        logout,
        saveAssessmentResult,
        addTrainingSession,
        deleteTrainingSession,
        toggleSkillMastered
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
