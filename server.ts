import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini client utility server-side with telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for fallback coach advice if API key is not yet set or model request fails
function generateFallbackFeedback(testResult: any, playerName: string = 'كابتن البادل') {
  // Find pillar with lowest score percentage
  const pillars = testResult?.pillarBreakdown || {};
  const pillarKeys = ['serve_return', 'net_volleys', 'overhead_shots', 'wall_defense', 'tactics_positioning'];
  
  let lowestPillarKey = 'wall_defense';
  let lowestScore = 999;
  
  for (const key of pillarKeys) {
    if (pillars[key] && typeof pillars[key].percentage === 'number') {
      if (pillars[key].percentage < lowestScore) {
        lowestScore = pillars[key].percentage;
        lowestPillarKey = key;
      }
    }
  }

  const pillarNames: Record<string, string> = {
    serve_return: 'الإرسال واستقبال الإرسال (Serve & Return)',
    net_volleys: 'لعب الشبكة والكرات الهوائية (Net Play & Volleys)',
    overhead_shots: 'الكرات العلوية - البانديخا والفيبورا (Overhead Shots)',
    wall_defense: 'ارتداد الزجاج واللعب الدفاعي (Wall Defense)',
    tactics_positioning: 'التمركز التكتيكي والتناغم مع الزميل (Court Tactics)',
  };

  const adviceByPillar: Record<string, any> = {
    wall_defense: {
      headlineAr: `كوتش التحليل الفني: ارتداد الزجاج هو مفتاح صعودك لمستوى Playtomic أعلى!`,
      urgencyReasonAr: 'أظهرت إجاباتك تردداً عند كرات الزجاج المزدوج (Doble Pared) والكرات ذات الارتداد العميق. التحكم في دفاع الزجاج يمنحك هدوءاً يربك المنافسين ويقلل أخطاءك السهلة بنسبة 40%.',
      playtomicGrowthPotential: '+0.50 إلى +0.75 درجة Playtomic',
      detailedAnalysisAr: `تحليلك يوضح أنك تهاجم بشكل جيد عند الشبكة، لكن عند إجبارك على العودة إلى الخط الخلفي تبدأ المعاناة. الخطأ الشائع هو ضرب الكرة قبل اكتمال ارتدادها من الزجاج أو الوقوف قريباً جداً من الزجاج الخلفي. يحتاج تركيزك التدريبي هذا الأسبوع إلى تمارين الترقب، وانتظار الكرة لتتجاوز جسمك مع قراءة زاوية الخروج.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين الزجاج الخلفي الفردي (Pared de Fondo)',
          repsOrDuration: '20 دقيقة - 3 جولات',
          focusGoalAr: 'انتظار الكرة لتصل إلى قمة ارتدادها بعد الزجاج قبل تسديد اللوب أو الباخادا.',
          proTipAr: 'حافظ على ركبتيك مثنيتين ووجه المضرب مائلاً للأعلى قليلاً لتوليد لوب عميق.'
        },
        {
          titleAr: 'قراءة الزجاج المزدوج الافتتاحي (Doble Pared que abre)',
          repsOrDuration: '15 دقيقة',
          focusGoalAr: 'الدوران مع مسار الكرة بدلاً من ملاحقتها بالعين فقط.',
          proTipAr: 'اتبع الكرة بحركة دائرية سريعة بالقدمين لتكون دائماً خلف الكرة عند خروجها من الزاوية.'
        },
        {
          titleAr: 'لعبة الحفاظ على النقطة من الخط الخلفي',
          repsOrDuration: '25 دقيقة مباراة تدريبية',
          focusGoalAr: 'ممنوع لعب كرات هجومية متسرعة؛ الهدف هو كسب النقطة باللوب المتقن والكرات المنخفضة في الأرجل (Chiquita).'
        }
      ],
      partnerTacticsAr: 'تواصل صوتياً بوضوح مع زميلك ("كرتي" أو "لك") عند الكرات في منتصف الزوايا، وامنحه الثقة لتغطية الشبكة أثناء إعادة بنائك للنقطة من الزجاج.',
      motivationalQuoteAr: 'في البادل، من يتقن الزجاج يمتلك مفاتيح الملعب! الصبر والدقة يكسران أشرس الهجمات.'
    },
    overhead_shots: {
      headlineAr: `كوتش التحليل الفني: تطوير البانديخا والفيبورا سيحول دفاعك إلى هجوم كاسح!`,
      urgencyReasonAr: 'الكرات العلوية لديك إما تفتقر إلى الأمان أو تنتهي بسماش متسرع يمنح الخصم فرصة هجوم مرتد. البانديخا الآمنة هي صمام الأمان للاعب البادل المتطور.',
      playtomicGrowthPotential: '+0.45 إلى +0.65 درجة Playtomic',
      detailedAnalysisAr: `عندما يرفع الخصم كرة عالية (لوب)، هدفك الأول ليس بالضرورة إنهاء النقطة بضربة ساحقة، بل الحفاظ على موقع الشبكة وإرسال كرة عميقة بزاوية تلتصق بالزجاج الخلفي للمنافس. التدرب على تكنيك ضرب الكرة بجانب الرأس مع دوران جانبي (Slice) سيجعلك لاعباً لا يُقهر عند الشبكة.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين تكنيك البانديخا (Bandeja Placement)',
          repsOrDuration: '20 دقيقة',
          focusGoalAr: 'توجيه الكرة بهدوء نحو الزاوية العكسية مع ارتداد منخفض جداً من الزجاج.',
          proTipAr: 'اضرب الكرة على مستوى الأذن ببطء، لا تبحث عن السرعة بل عن العمق والانخفاض.'
        },
        {
          titleAr: 'تمرين الانتقال من اللوب إلى السماش أو الفيبورا',
          repsOrDuration: '15 دقيقة',
          focusGoalAr: 'التمييز بين الكرة التي تسمح بالسماش الفائز وتلك التي تتطلب بانديخا دفاعية.',
          proTipAr: 'إذا كانت الكرة خلف رأسك، العب دائماً بانديخا أمان؛ لا تسدد السماش وأنت تتحرك للخلف!'
        }
      ],
      partnerTacticsAr: 'عند لعب البانديخا العميقة، تقدم فوراً مع زميلك خطوتين للأمام لإغلاق المساحات عند الشبكة وقطع أي رد سريع.',
      motivationalQuoteAr: 'البانديخا ليست مجرد ضربة، إنها إعلان سيطرة على مجريات الشوط!'
    },
    net_volleys: {
      headlineAr: `كوتش التحليل الفني: إتقان الفولي الهجومي سيحسم لك 70% من النقاط الحاسمة!`,
      urgencyReasonAr: 'أنت تخسر نقاطاً سهلة عند الشبكة بسبب ضربات فولي عشوائية ترتد للأعلى، مما يعطي الخصم فرصة للانقضاض.',
      playtomicGrowthPotential: '+0.40 إلى +0.60 درجة Playtomic',
      detailedAnalysisAr: `اللعب عند الشبكة في البادل يتطلب قبضة قوية ورسغاً ثابتاً، مع نقل وزن الجسم للأمام في اتجاه الكرة. تدريبات الفولي القاطع الموجه نحو أقدام المنافس والزجاج الجانبي سترفع كفاءتك الهجومية بشكل فوري.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين الفولي القاطع العميق (Deep Slice Volley)',
          repsOrDuration: '20 دقيقة',
          focusGoalAr: 'إبقاء الكرة منخفضة بعد الارتداد عن طريق ضربها بحركة من الأعلى إلى الأسفل بحجم مضرب صغير.',
          proTipAr: 'لا تؤرجح المضرب للخلف كثيراً؛ جهز المضرب أمام صدرك واعتمد على قوة اندفاع الكرة.'
        }
      ],
      partnerTacticsAr: 'حافظ على مسافة متساوية مع زميلك عند الشبكة وكأن بينكما حبلاً مشدوداً بطول 3 أمتار.',
      motivationalQuoteAr: 'الشبكة هي قلعة البادل، من يدافع عنها بذكاء يحصد النصر حتماً!'
    },
    serve_return: {
      headlineAr: `كوتش التحليل الفني: تحسين الإرسال واستقبال الإرسال سيمنحك أفضلية فورية!`,
      urgencyReasonAr: 'بداية كل شوط هي التي تحدد من يسيطر على الشبكة. إرسالك واستقبالك يحتاجان إلى ثبات وتوجيه دقيق نحو الزجاج الجانبي.',
      playtomicGrowthPotential: '+0.35 إلى +0.55 درجة Playtomic',
      detailedAnalysisAr: `استقبال الإرسال بنجاح يعني إرجاع كرة منخفضة أو لوب عميق يجبر الخصم على التراجع عن الشبكة، بينما الإرسال المتقن يضمن لك ولزميلك الوصول إلى موقع الشبكة قبل ارتداد الكرة.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين دقة الإرسال نحو الزجاج الجانبي (Cristal Lateral)',
          repsOrDuration: '15 دقيقة - 50 إرسالاً',
          focusGoalAr: 'إسقاط الكرة في آخر 30 سم من مربع الإرسال لترتطم بالزجاج الجانبي مباشرة.',
          proTipAr: 'اضرب الكرة عند مستوى الحزام مع دوران خفيف واصعد مباشرة نحو الشبكة بعد التسديد.'
        }
      ],
      partnerTacticsAr: 'تفق مع زميلك قبل الإرسال على نوع الضربة واتجاه الصعود لضمان تغطية كاملة للملعب.',
      motivationalQuoteAr: 'الإرسال الممتاز نصف شوط، والرد الذكي يسرق المبادرة في ثوانٍ!'
    },
    tactics_positioning: {
      headlineAr: `كوتش التحليل الفني: التمركز الذكي والتناغم هو الفارق بين اللاعب العادي والمحترف!`,
      urgencyReasonAr: 'المهارات الفردية جيدة، لكن ترك مساحات شاغرة في منتصف الملعب أو عدم التحرك كوحدة واحدة يكلفكم مباريات كاملة.',
      playtomicGrowthPotential: '+0.50 إلى +0.70 درجة Playtomic',
      detailedAnalysisAr: `البادل لعبة مساحات وزوايا وليست قوة عضلية. عندما يتحرك زميلك لإنقاذ كرة في الزاوية، يجب أن تغطي أنت منتصف الملعب فوراً. تطبيق مبدأ "الحبل المشدود" والتواصل المستمر سيضاعف ثقتكما في المباريات التنافسية.`,
      weeklyActionPlan: [
        {
          titleAr: 'تمرين مبدأ الحبل المشدود وتغطية الوسط (Principio de la Cuerda)',
          repsOrDuration: '25 دقيقة مباراة تدريبية',
          focusGoalAr: 'التحرك معاً للأمام وللخلف وللجانبين ككتلة واحدة.',
          proTipAr: 'عين زميلك هي عينك؛ راقب موقعه قبل اتخاذ قرار التقدم أو التراجع.'
        }
      ],
      partnerTacticsAr: 'التواصل الكلامي المستمر ("أمامك"، "ارجع"، "لوحده") يزيل الشك ويسرّع اتخاذ القرار.',
      motivationalQuoteAr: 'لاعبان متوسطان متناغمان يفوزان دائماً على لاعبين موهوبين غير متفاهمين!'
    }
  };

  const advice = adviceByPillar[lowestPillarKey] || adviceByPillar.wall_defense;
  
  return {
    headlineAr: advice.headlineAr,
    recommendedPillarKey: lowestPillarKey,
    recommendedPillarNameAr: pillarNames[lowestPillarKey] || lowestPillarKey,
    urgencyReasonAr: advice.urgencyReasonAr,
    playtomicGrowthPotential: advice.playtomicGrowthPotential,
    detailedAnalysisAr: advice.detailedAnalysisAr,
    weeklyActionPlan: advice.weeklyActionPlan,
    partnerTacticsAr: advice.partnerTacticsAr,
    motivationalQuoteAr: advice.motivationalQuoteAr,
    source: 'fallback',
  };
}

// POST /api/coach-feedback
app.post('/api/coach-feedback', async (req, res) => {
  try {
    const { testResult, playerName, customQuestion } = req.body;

    if (!testResult) {
      return res.status(400).json({ error: 'Missing testResult in request body' });
    }

    // Check if API key is present
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not set. Serving high-fidelity rule-based coach feedback.');
      const fallback = generateFallbackFeedback(testResult, playerName);
      return res.json(fallback);
    }

    const pillarBreakdownStr = JSON.stringify(testResult.pillarBreakdown || {}, null, 2);
    const strengths = (testResult.strengths || []).join(', ');
    const weaknesses = (testResult.weaknesses || []).join(', ');

    const prompt = `
You are an elite World Padel Tour (Premier Padel) Technical Master Coach and Playtomic Certified Evaluator analyzing the player's diagnostic results.

Player Name: ${playerName || 'كابتن البادل'}
Total Score: ${testResult.totalScore}/80 (${testResult.percentage}%)
Platform Level: Level ${testResult.levelNumber} - ${testResult.levelTitle}
Playtomic Score: ${testResult.playtomicScore || 'N/A'} (Tier: ${testResult.playtomicTier || 'N/A'})
Diagnosed Strengths: ${strengths || 'متوازن'}
Diagnosed Weaknesses: ${weaknesses || 'يحتاج تقييم شامل'}

5 Technical Pillars Breakdown:
${pillarBreakdownStr}

${customQuestion ? `Specific tactical question from the player: "${customQuestion}"` : ''}

Analyze the scores across the 5 Padel Pillars:
1. 'serve_return' (Serve & Return / الإرسال واستقبال الإرسال)
2. 'net_volleys' (Net Play & Volleys / لعب الشبكة والكرات الهوائية)
3. 'overhead_shots' (Overhead Shots: Bandeja, Víbora, Smash / الكرات العلوية)
4. 'wall_defense' (Wall Rebounds & Defense / ارتداد الزجاج واللعب الدفاعي)
5. 'tactics_positioning' (Tactics & Positioning / التمركز التكتيكي والتناغم)

Identify which SINGLE pillar is the most urgent constraint holding back this player from jumping to the next Playtomic tier.
Provide an inspiring, rigorous, and highly actionable diagnostic coach report in Arabic.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an elite Spanish-Arabic Premier Padel Master Coach. You provide deeply authentic, motivating, and tactically precise coaching advice in clear, engaging Arabic. Use proper padel terminology (Bandeja, Víbora, Chiquita, Globo/Lob, Bajada de pared, Doble pared, Rulo, Golden Point, etc.). Always output strictly valid JSON conforming to the requested schema.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headlineAr: {
              type: Type.STRING,
              description: 'Catchy and inspiring headline in Arabic from the coach',
            },
            recommendedPillarKey: {
              type: Type.STRING,
              description: 'The key of the pillar to prioritize: serve_return, net_volleys, overhead_shots, wall_defense, or tactics_positioning',
            },
            recommendedPillarNameAr: {
              type: Type.STRING,
              description: 'Arabic title of the recommended pillar',
            },
            urgencyReasonAr: {
              type: Type.STRING,
              description: 'Tactical rationale explaining why this pillar is currently capping their performance',
            },
            playtomicGrowthPotential: {
              type: Type.STRING,
              description: 'Estimated Playtomic rating surge potential (e.g. +0.45 إلى +0.65 درجة Playtomic)',
            },
            detailedAnalysisAr: {
              type: Type.STRING,
              description: 'In-depth tactical evaluation of the player current state and court habits in Arabic',
            },
            weeklyActionPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  titleAr: { type: Type.STRING },
                  repsOrDuration: { type: Type.STRING },
                  focusGoalAr: { type: Type.STRING },
                  proTipAr: { type: Type.STRING },
                },
                required: ['titleAr', 'repsOrDuration', 'focusGoalAr', 'proTipAr'],
              },
            },
            partnerTacticsAr: {
              type: Type.STRING,
              description: 'How to coordinate with doubles partner regarding this technical area',
            },
            motivationalQuoteAr: {
              type: Type.STRING,
              description: 'Inspirational coach quote in Arabic',
            },
          },
          required: [
            'headlineAr',
            'recommendedPillarKey',
            'recommendedPillarNameAr',
            'urgencyReasonAr',
            'playtomicGrowthPotential',
            'detailedAnalysisAr',
            'weeklyActionPlan',
            'partnerTacticsAr',
            'motivationalQuoteAr',
          ],
        },
      },
    });

    const text = response.text?.trim() || '{}';
    const parsedData = JSON.parse(text);
    return res.json({ ...parsedData, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating coach feedback with Gemini:', error);
    // On error, smoothly return fallback rather than breaking client
    const fallback = generateFallbackFeedback(req.body?.testResult, req.body?.playerName);
    return res.json(fallback);
  }
});

// POST /api/coach-ask (Quick interactive follow-up question)
app.post('/api/coach-ask', async (req, res) => {
  try {
    const { question, currentPillar, playerName } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        answerAr: `كوتش البادل يجيبك: التركيز على ${currentPillar || 'الأساسيات الفنية'} يتطلب دائماً ثني الركبتين، تثبيت رسغ اليد، واللعب بهدوء نحو المساحات المفتوحة. احرص على تكرار الحركة 50 مرة في تدريب السبت القادم!`,
        source: 'fallback',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Player (${playerName || 'كابتن'}) asks coach: "${question}". Current focus pillar: ${currentPillar || 'General padel tactics'}. Give a concise, professional 3-sentence tactical answer in Arabic.`,
      config: {
        systemInstruction: 'You are an elite Premier Padel coach answering a quick technical query in concise Arabic with tactical terms.',
      },
    });

    return res.json({
      answerAr: response.text?.trim() || 'واصل التدريب والتزم بتوجيه الكرة نحو المساحات الفارغة!',
      source: 'gemini',
    });
  } catch (err: any) {
    console.error('Error asking coach:', err);
    return res.json({
      answerAr: 'حافظ على هدوئك في الملعب، وتذكر أن التمركز السليم يسبق قوة الضربة دائماً!',
      source: 'fallback',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PadelLevel Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
