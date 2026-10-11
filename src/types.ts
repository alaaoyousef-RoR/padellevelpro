export type PadelLevelNumber = 1 | 2 | 3 | 4 | 5;

export type PillarKey = 
  | 'serve_return'
  | 'net_volleys'
  | 'overhead_shots'
  | 'wall_defense'
  | 'tactics_positioning';

export type PlaytomicTier = 'D' | 'D+' | 'C' | 'C+' | 'B' | 'B+' | 'A' | 'A+';

export interface PillarScoreDetail {
  key: PillarKey;
  nameAr: string;
  score: number; // 4 to 16
  maxScore: number; // 16
  percentage: number; // 0 to 100
  playtomicScore: number; // 1.0 to 7.0
  tier: PlaytomicTier;
  tierAr: string;
}

export interface PadelLevelInfo {
  levelNumber: PadelLevelNumber;
  titleAr: string;
  subtitleAr: string;
  playtomicEquivalent: string;
  playtomicTier: string;
  minScore: number;
  maxScore: number;
  badgeColor: string;
  descriptionAr: string;
  recommendedProgramWeeks: number;
  characteristicsAr: string[];
}

export interface AssessmentOption {
  text: string;
  score: 1 | 2 | 3 | 4;
  tierTag?: string; // 'D' | 'C' | 'B' | 'A'
  description?: string;
}

export interface AssessmentQuestion {
  id: number;
  category: PillarKey;
  categoryAr: string;
  pillarNumber: number; // 1 to 5
  questionAr: string;
  scenarioAr?: string;
  hintAr?: string;
  options: AssessmentOption[];
}

export interface TestResultData {
  totalScore: number;
  maxScore: number;
  percentage: number;
  levelNumber: PadelLevelNumber;
  levelTitle: string;
  playtomicScore: number; // e.g. 3.85
  playtomicTier: PlaytomicTier; // e.g. 'C+'
  playtomicBadge: string;
  pillarBreakdown: Record<PillarKey, PillarScoreDetail>;
  strengths: string[];
  weaknesses: string[];
  personalizedMessage: string;
  takenAt: string;
  answers: Record<number, number>; // questionId -> option index (0-3)
}

export interface DrillItem {
  name: string;
  duration: string;
  goal: string;
  instructions: string[];
  tips: string;
}

export interface WeeklyBreakdown {
  weekNumber: number;
  theme: string;
  focus: string;
  sessionsPerWeek: number;
  sessionSummary: {
    warmUp: string[];
    technicalDrills: DrillItem[];
    tacticalDrills: DrillItem[];
    footworkDrills: DrillItem[];
    gamePractice: string;
    coolDown: string[];
    coachAdvice: string;
  };
}

export interface TrainingProgram {
  levelNumber: PadelLevelNumber;
  title: string;
  goal: string;
  durationWeeks: number;
  durationText: string;
  sessionsPerWeekText: string;
  focusAreas: string[];
  overview: string;
  weeks: WeeklyBreakdown[];
}

export interface TechniqueItem {
  id: string;
  slug: string;
  titleAr: string;
  titleOriginal: string; // e.g. Derecha, Bandeja, Vibora
  category: 'basic' | 'intermediate' | 'footwork' | 'walls' | 'tactics' | 'tricks';
  categoryAr: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم' | 'جميع المستويات';
  shortDesc: string;
  steps: string[];
  keyPoints: string[];
  commonMistakes: string[];
  practiceDrills: string[];
  proTips: string;
  courtPositionAr: string;
}

export interface VideoTutorial {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  titleAr: string;
  category: 'basic' | 'advanced' | 'tactics' | 'footwork' | 'walls';
  categoryAr: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'الكل';
  duration: string;
  descriptionAr: string;
  coachName: string;
  courtDiagramType: 'net' | 'baseline' | 'walls' | 'full';
  keyTakeaways: string[];
}

export interface TrainingSession {
  id: string;
  date: string;
  focus: string;
  durationMinutes: number;
  skillsWorkedOn: string[];
  rating: number; // 1 to 10
  notes: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  photoURL?: string;
  padelLevel?: string;
  levelNumber?: PadelLevelNumber;
  testScore?: number;
  playtomicScore?: number;
  playtomicTier?: PlaytomicTier;
  pillarBreakdown?: Record<PillarKey, PillarScoreDetail>;
  testTaken: boolean;
  testResultDate?: string;
  strengths?: string[];
  weaknesses?: string[];
  createdAt: string;
}

export interface CoachActionPlanItem {
  titleAr: string;
  repsOrDuration: string;
  focusGoalAr: string;
  proTipAr: string;
}

export interface CoachFeedbackData {
  headlineAr: string;
  recommendedPillarKey: PillarKey;
  recommendedPillarNameAr: string;
  urgencyReasonAr: string;
  playtomicGrowthPotential: string;
  detailedAnalysisAr: string;
  weeklyActionPlan: CoachActionPlanItem[];
  partnerTacticsAr: string;
  motivationalQuoteAr: string;
  source?: 'gemini' | 'fallback';
  generatedAt?: string;
}

export type PageRoute =
  | 'home'
  | 'level-test'
  | 'test-result'
  | 'my-training-program'
  | 'learn-padel'
  | 'technique-detail'
  | 'video-tutorials'
  | 'progress-tracker'
  | 'dashboard'
  | 'about'
  | 'faq'
  | 'contact';
