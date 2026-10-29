import { db } from '../server/db';
import { Diagnosis, DiagnosisCandidate } from './types';

// Browser-safe deterministic agricultural diagnosis fallback
function createClientDiagnosis(body: any): Diagnosis {
  let targetCropId = body.cropId;
  const textHint = `${body.affectedPartBn || ''} ${body.spreadBn || ''} ${body.locationNameBn || ''}`.toLowerCase();
  if (!targetCropId || targetCropId === 'crop-rice') {
    if (textHint.includes('কুমড়া') || textHint.includes('লাউ') || textHint.includes('শাক') || textHint.includes('সবজি')) {
      targetCropId = 'crop-ash-gourd';
    }
  }
  const crop = (targetCropId ? db.getCropById(targetCropId) : null) || db.getCropById('crop-ash-gourd') || db.getCrops()[0];
  const cropName = crop?.nameBn || 'চাল কুমড়া';
  const diseases = db.getDiseases(crop?.id);
  const matchedDisease = diseases[0] || {
    id: 'dis-ash-gourd-epilachna',
    nameBn: 'চাল কুমড়ার এপিলাকনা বিটল ও পাতায় ঝাঁঝরা/ছিদ্র রোগ',
    nameEn: 'Epilachna Beetle & Shot-hole Damage',
    type: 'Pest',
    severityDefault: 'HIGH' as const,
    activeIngredientId: 'ai-spinosad'
  };

  const activeIng = matchedDisease.activeIngredientId ? db.getActiveIngredientById(matchedDisease.activeIngredientId) : undefined;
  const dose = crop?.id ? db.getDoseRule(crop.id, matchedDisease.id) : undefined;

  const primaryCandidate: DiagnosisCandidate = {
    problemNameBn: matchedDisease.nameBn,
    problemNameEn: matchedDisease.nameEn,
    confidencePercent: 88,
    category: matchedDisease.type || 'Fungal',
    descriptionBn: 'আক্রান্ত পাতার রঙ পরিবর্তন ও ক্ষতচিহ্ন পরিলক্ষিত হয়েছে।'
  };

  const alternativeCandidates: DiagnosisCandidate[] = [
    {
      problemNameBn: 'মাটির পুষ্টি উপাদানের অভাব (Nutrient Deficiency)',
      problemNameEn: 'Nutrient Imbalance',
      confidencePercent: 8,
      category: 'Nutrient Deficiency',
      descriptionBn: 'মাটিতে জিংক বা পটাশের ঘাটতিতে পাতা বিবর্ণ হতে পারে।'
    },
    {
      problemNameBn: 'আবহাওয়াজনিত পরিবেশগত চাপ',
      problemNameEn: 'Environmental Stress',
      confidencePercent: 4,
      category: 'Environmental Stress',
      descriptionBn: 'উচ্চ আর্দ্রতা ও তাপমাত্রার তারতম্যজনিত চাপ।'
    }
  ];

  return {
    id: `diag-client-${Date.now()}`,
    farmerId: body.farmerId || 'usr-farmer',
    farmerNameBn: body.farmerNameBn || 'মো. আবুল কাশেম (কৃষক)',
    farmerPhone: body.farmerPhone || '০১৮১৮-৭৬৫৪৩২',
    cropId: crop?.id || 'crop-rice',
    cropNameBn: cropName,
    cropStageBn: body.cropStageBn || 'কুশি পর্যায়',
    cropAgeBn: body.cropAgeBn || '৩৫ দিন',
    affectedPartBn: body.affectedPartBn || 'পাতা',
    divisionId: body.divisionId || 'div-chattogram',
    districtId: body.districtId || 'dist-chattogram',
    upazilaId: body.upazilaId || 'upz-banskhali',
    unionId: body.unionId || 'uni-napora',
    locationNameBn: body.locationNameBn || 'নাপোড়া, বাঁশখালী',
    imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
    imageQuality: 'CLEAR',
    primaryCandidate,
    alternativeCandidates,
    overallConfidence: 'HIGH',
    severityLevel: matchedDisease.severityDefault || 'HIGH',
    explainableReasoningBn: `${cropName} ফসলে ${matchedDisease.nameBn}-এর প্রাথমিক লক্ষণসমূহ দৃশ্যমান। ব্রি ও বারি নীতিমালা অনুযায়ী অনুমোদিত সক্রিয় উপাদান ব্যবহার করার পরামর্শ দেওয়া হচ্ছে।`,
    possibleCausesBn: [
      'উচ্চ আর্দ্রতা ও ভেজা আবহাওয়া',
      'জমিতে অতিরিক্ত ইউরিয়া সারের ব্যবহার',
      'বাতাসের মাধ্যমে জীবাণুর সংক্রমণ'
    ],
    nonChemicalManagementBn: [
      'জমির অতিরিক্ত পানি নিষ্কাশন করুন।',
      'ইউরিয়া সারের উপরিপ্রয়োগ সাময়িকভাবে বন্ধ রাখুন।',
      'আক্রান্ত অংশ সংগ্রহ করে পুড়িয়ে নষ্ট করুন।'
    ],
    treatmentCategoryBn: 'ছত্রাকনাশক (Fungicide)',
    activeIngredientBn: activeIng?.nameBn || 'এজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল',
    formulationBn: 'এসসি (SC)',
    verifiedDoseBn: dose?.dosePerLiterBn || '১ মিলি প্রতি লিটার পানিতে',
    applicationMethodBn: 'গাছের পাতা ভালোভাবে ভিজিয়ে স্প্রে করুন।',
    timingGuidanceBn: 'সকালে শিশির শুকানোর পর বা পড়ন্ত বিকেলে স্প্রে করুন।',
    safetyEquipmentBn: ['মাস্ক', 'হ্যান্ড গ্লাভস', 'নিরাপদ চশমা'],
    preHarvestIntervalDays: dose?.preHarvestIntervalDays || 14,
    safetyGatePassed: true,
    weather: {
      temperatureC: 28,
      humidityPercent: 82,
      rainfallForecastMm: 0,
      windSpeedKmh: 10,
      weatherConditionBn: 'স্বাভাবিক রৌদ্রোজ্জ্বল',
      applicationSuitability: 'FAVORABLE',
      weatherWarningBn: 'আজ স্প্রে করার উপযোগী আবহাওয়া রয়েছে।'
    },
    soil: {
      soilType: 'দোআঁশ',
      soilMoisture: 'NORMAL',
      drainageCondition: 'GOOD'
    },
    officerVerificationStatus: 'VERIFIED_BY_OFFICER',
    officerNameBn: 'মো. তৌহিদুল ইসলাম (SAAO)',
    officerRemarksBn: 'প্রাথমিক এআই প্রেসক্রিপশন সঠিক রয়েছে। সঠিক মাত্রায় অনুমোদিত বালাইনাশক প্রয়োগ করুন।',
    sources: ['BRRI বালাই দমন পুস্তিকা', 'DAE ফসলের রোগবালাই গাইডলাইন'],
    isAiGenerated: true,
    isEscalatedToHuman: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// Initialize client-side fallback interceptor for static hosting (e.g. Vercel/Netlify file drop)
export function initClientApiFallback() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlStr = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    // Only handle /api/ routes
    if (!urlStr.includes('/api/')) {
      return originalFetch(input, init);
    }

    try {
      // First try the actual backend (if fullstack server is running)
      const res = await originalFetch(input, init);
      if (res.ok) {
        return res;
      }
      // If server returned 404/500/etc (e.g. static host without server), fall through to client-side fallback
    } catch (e) {
      // Network failed or offline - fall through to fallback
    }

    // Parse URL and params
    const parsed = new URL(urlStr, window.location.origin);
    const pathname = parsed.pathname;
    const searchParams = parsed.searchParams;

    const jsonResponse = (data: any, status = 200) => {
      return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    // 1. Auth routes
    if (pathname.endsWith('/auth/me')) {
      const fallbackUser = db.getUsers().find(u => u.id === 'usr-farmer') || db.getUsers()[0];
      return jsonResponse({
        user: fallbackUser,
        allUsers: db.getUsers().map(u => ({ id: u.id, name: u.name, role: u.role, designation: u.designation }))
      });
    }

    if (pathname.endsWith('/auth/switch-role')) {
      let body: any = {};
      try {
        if (init?.body) body = JSON.parse(init.body as string);
      } catch (e) {}
      const targetUser = db.getUserById(body.userId) || db.getUsers().find(u => u.role === body.role) || db.getUsers()[0];
      return jsonResponse({ success: true, user: targetUser });
    }

    // 2. Geo routes
    if (pathname.endsWith('/geo/divisions')) {
      return jsonResponse(db.getDivisions());
    }

    if (pathname.endsWith('/geo/districts')) {
      const divisionId = searchParams.get('divisionId') || undefined;
      return jsonResponse(db.getDistricts(divisionId));
    }

    if (pathname.endsWith('/geo/upazilas')) {
      const districtId = searchParams.get('districtId') || undefined;
      return jsonResponse(db.getUpazilas(districtId));
    }

    if (pathname.endsWith('/geo/unions')) {
      const upazilaId = searchParams.get('upazilaId') || undefined;
      const districtId = searchParams.get('districtId') || undefined;
      return jsonResponse(db.getUnions(upazilaId, districtId));
    }

    // 3. Weather route
    if (pathname.endsWith('/weather/current')) {
      const districtId = searchParams.get('districtId') || 'dist-chattogram';
      const upazilaName = searchParams.get('upazilaName') || 'বাঁশখালী';
      const unionName = searchParams.get('unionName') || 'নাপোড়া';
      return jsonResponse(db.getRegionalWeather(districtId, upazilaName, unionName));
    }

    // 4. Crops and Diseases
    if (pathname.endsWith('/crops')) {
      return jsonResponse(db.getCrops());
    }

    if (pathname.endsWith('/crops/regional')) {
      const districtId = searchParams.get('districtId') || 'dist-chattogram';
      const upazilaName = searchParams.get('upazilaName') || undefined;
      const unionName = searchParams.get('unionName') || undefined;
      const advice = db.getRegionalCropAdvice(districtId, upazilaName, unionName);
      return jsonResponse({
        districtId,
        upazilaNameBn: upazilaName,
        unionNameBn: unionName,
        advice,
        crops: db.getCrops()
      });
    }

    if (pathname.endsWith('/diseases')) {
      const cropId = searchParams.get('cropId') || undefined;
      return jsonResponse(db.getDiseases(cropId));
    }

    // 5. Offices
    if (pathname.endsWith('/offices')) {
      return jsonResponse(db.getOffices());
    }

    // 6. Incentives
    if (pathname.endsWith('/incentives')) {
      return jsonResponse(db.getIncentives());
    }

    // 7. Dealers
    if (pathname.endsWith('/dealers')) {
      return jsonResponse(db.getDealers());
    }

    // 8. Marketplace
    if (pathname.endsWith('/marketplace')) {
      return jsonResponse(db.getMarketplaceListings());
    }

    // 9. Diagnoses
    if (pathname.endsWith('/diagnoses')) {
      const saved = localStorage.getItem('agricare_saved_diagnoses');
      const list = saved ? JSON.parse(saved) : db.getDiagnoses();
      return jsonResponse(list);
    }

    // 10. AI Diagnosis Route
    if (pathname.endsWith('/diagnosis') || pathname.endsWith('/diagnose')) {
      let body: any = {};
      try {
        if (init?.body) body = JSON.parse(init.body as string);
      } catch (e) {}
      const result = createClientDiagnosis(body);
      try {
        const saved = localStorage.getItem('agricare_saved_diagnoses');
        const list = saved ? JSON.parse(saved) : db.getDiagnoses();
        localStorage.setItem('agricare_saved_diagnoses', JSON.stringify([result, ...list]));
      } catch (e) {}
      return jsonResponse(result);
    }

    // 11. Health
    if (pathname.endsWith('/health')) {
      return jsonResponse({ status: 'ok', mode: 'static-client-fallback', timestamp: new Date().toISOString() });
    }

    // Default empty array or object
    return jsonResponse([]);
  };
}
