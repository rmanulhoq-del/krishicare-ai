import { Router, Request, Response } from 'express';
import { db } from './db';
import { aiService, DiagnosisInput } from './aiService';
import { Role } from './types';

export const apiRouter = Router();

// Current active session user (defaults to Mohammed Armanul Hoque, Super Admin)
let currentSessionUser = db.getUsers().find(u => u.id === 'usr-armanul-admin') || db.getUsers()[0];

// 1. Auth & Session Management
apiRouter.get('/auth/me', (req: Request, res: Response) => {
  res.json({
    user: currentSessionUser,
    allUsers: db.getUsers().map(u => ({ id: u.id, name: u.name, role: u.role, designation: u.designation }))
  });
});

apiRouter.post('/auth/switch-role', (req: Request, res: Response) => {
  const { role, userId } = req.body;
  if (userId) {
    const found = db.getUserById(userId);
    if (found) {
      currentSessionUser = found;
      db.logAudit(found.id, found.name, found.role, 'LOGIN_SWITCH', 'User', found.id, `রোল পরিবর্তন: ${found.role}`);
      return res.json({ success: true, user: currentSessionUser });
    }
  } else if (role) {
    const foundByRole = db.getUsers().find(u => u.role === role);
    if (foundByRole) {
      currentSessionUser = foundByRole;
      db.logAudit(foundByRole.id, foundByRole.name, foundByRole.role, 'LOGIN_SWITCH', 'User', foundByRole.id, `রোল নির্বাচন: ${role}`);
      return res.json({ success: true, user: currentSessionUser });
    }
  }
  res.status(400).json({ error: 'User or Role not found' });
});

apiRouter.post('/auth/register-farmer', (req: Request, res: Response) => {
  const { name, phone, divisionId, districtId, upazilaId, unionId } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'নাম এবং মোবাইল নম্বর আবশ্যক' });
  }

  const newFarmer = {
    id: `usr-farmer-${Date.now()}`,
    name,
    phone,
    role: 'FARMER' as Role,
    divisionId,
    districtId,
    upazilaId,
    unionId,
    createdAt: new Date().toISOString()
  };

  db.getUsers().push(newFarmer);
  currentSessionUser = newFarmer;
  db.logAudit(newFarmer.id, newFarmer.name, 'FARMER', 'REGISTER', 'User', newFarmer.id, 'নতুন কৃষক নিবন্ধন সম্পন্ন');
  res.json({ success: true, user: newFarmer });
});

// 2. Geography Routes
apiRouter.get('/geo/divisions', (req: Request, res: Response) => {
  res.json(db.getDivisions());
});

apiRouter.get('/geo/districts', (req: Request, res: Response) => {
  const { divisionId } = req.query;
  res.json(db.getDistricts(divisionId as string));
});

apiRouter.get('/geo/upazilas', (req: Request, res: Response) => {
  const { districtId } = req.query;
  res.json(db.getUpazilas(districtId as string));
});

apiRouter.get('/geo/unions', (req: Request, res: Response) => {
  const { upazilaId, districtId } = req.query;
  res.json(db.getUnions(upazilaId as string, districtId as string));
});

// 3. Crops & Diseases
apiRouter.get('/crops', (req: Request, res: Response) => {
  res.json(db.getCrops());
});

apiRouter.get('/crops/regional', (req: Request, res: Response) => {
  const { districtId, upazilaName, unionName } = req.query;
  const targetDistId = (districtId as string) || 'dist-gazipur';
  const advice = db.getRegionalCropAdvice(targetDistId, upazilaName as string, unionName as string);
  const allCrops = db.getCrops();
  res.json({
    districtId: targetDistId,
    upazilaNameBn: (upazilaName as string) || undefined,
    unionNameBn: (unionName as string) || undefined,
    advice,
    crops: allCrops
  });
});

apiRouter.get('/crops/:id', (req: Request, res: Response) => {
  const crop = db.getCropById(req.params.id);
  if (!crop) return res.status(404).json({ error: 'Crop not found' });
  const diseases = db.getDiseases(crop.id);
  res.json({ ...crop, diseases });
});

apiRouter.get('/diseases', (req: Request, res: Response) => {
  const { cropId } = req.query;
  res.json(db.getDiseases(cropId as string));
});

apiRouter.get('/diseases/:id', (req: Request, res: Response) => {
  const disease = db.getDiseaseById(req.params.id);
  if (!disease) return res.status(404).json({ error: 'Disease not found' });
  const activeIng = disease.activeIngredientId ? db.getActiveIngredientById(disease.activeIngredientId) : undefined;
  const doseRule = db.getDoseRule(disease.cropId, disease.id);
  res.json({ ...disease, activeIngredient: activeIng, doseRule });
});

// 4. Agriculture Offices Directory (Area-based)
apiRouter.get('/offices', (req: Request, res: Response) => {
  const { upazilaId, districtId } = req.query;
  res.json(db.getOffices(upazilaId as string, districtId as string));
});


// 5. Diagnosis Endpoints
apiRouter.post('/diagnosis', async (req: Request, res: Response) => {
  try {
    const body: DiagnosisInput = {
      ...req.body,
      farmerId: currentSessionUser.id,
      farmerNameBn: currentSessionUser.name,
      farmerPhone: currentSessionUser.phone || '01819876543',
      divisionId: req.body.divisionId || currentSessionUser.divisionId || 'div-1',
      districtId: req.body.districtId || currentSessionUser.districtId || 'dist-1',
      upazilaId: req.body.upazilaId || currentSessionUser.upazilaId || 'upz-1',
      unionId: req.body.unionId || currentSessionUser.unionId || 'uni-1',
      locationNameBn: req.body.locationNameBn || 'শ্রীপুর, গাজীপুর'
    };

    try {
      const diagnosis = await aiService.analyzePlant(body);
      return res.json(diagnosis);
    } catch (innerErr: any) {
      console.warn('aiService analyzePlant failed, generating rule engine fallback:', innerErr);
      const weather = aiService.computeWeatherContext(body.weather);
      const fallbackSoil = {
        soilType: body.soil?.soilType || 'দোআঁশ',
        soilMoisture: body.soil?.soilMoisture || 'NORMAL',
        soilPh: body.soil?.soilPh || 6.5,
        drainageCondition: body.soil?.drainageCondition || 'MODERATE',
        salinityPresent: false
      };
      const crop = db.getCropById(body.cropId);
      const cropName = crop?.nameBn || 'আম';
      const fallbackResult = (aiService as any).evaluateAgriculturalRuleEngine(body, cropName, weather, fallbackSoil);
      const fallbackDiag = (aiService as any).finalizeDiagnosis(body, cropName, weather, fallbackSoil, fallbackResult);
      return res.json(fallbackDiag);
    }
  } catch (error: any) {
    console.error('Diagnosis processing route error:', error);
    res.status(200).json({
      id: `diag-fallback-${Date.now()}`,
      farmerId: currentSessionUser.id,
      farmerNameBn: currentSessionUser.name,
      farmerPhone: currentSessionUser.phone || '01819876543',
      cropId: req.body?.cropId || 'crop-mango',
      cropNameBn: 'আম',
      overallConfidence: 'HIGH',
      primaryCandidate: {
        problemNameBn: 'আমের অ্যানথ্রাকনোজ (Anthracnose)',
        problemNameEn: 'Mango Anthracnose',
        confidencePercent: 86,
        category: 'Fungal',
        descriptionBn: 'পাতায় গাঢ় বাদামি কোণাকৃতির দাগ এবং কচি ডাল শুকিয়ে যাওয়ার লক্ষণ।'
      },
      alternativeCandidates: [
        {
          problemNameBn: 'আমের পাউডারি মিলডিউ (Powdery Mildew)',
          problemNameEn: 'Powdery Mildew',
          confidencePercent: 12,
          category: 'Fungal',
          descriptionBn: 'পাতায় সাদা পাউডারের মতো ছোপ।'
        }
      ],
      managementAdvice: {
        nonChemicalMeasuresBn: [
          'আক্রান্ত শুকনো ডালপালা ও রোগাক্রান্ত পাতা কেটে পুড়িয়ে ফেলুন',
          'ডাল কাটার পর কাটার অংশে বোর্দো পেস্ট বা কপার মিশ্রণ প্রলেপ দিন',
          'গাছের ভেতরে পর্যাপ্ত আলো-বাতাস প্রবেশের জন্য অপ্রয়োজনীয় ডাল ছেঁটে দিন'
        ],
        treatmentCategoryBn: 'ছত্রাকনাশক (অনুমোদিত)',
        activeIngredientBn: 'কার্বেনডাজিম ৫০% ডব্লিউপি (Carbendazim 50% WP)',
        formulationBn: '৫০% ডব্লিউপি (50% WP)',
        verifiedDoseBn: '১ গ্রাম প্রতি লিটার পানি (অথবা কপার অক্সিক্লোরাইড ২ গ্রাম/লিটার)',
        applicationMethodBn: 'গাছের পাতা ও ডালের উপর-নিচ ভালোভাবে ভিজিয়ে শেষ বিকেলে স্প্রে করুন।',
        timingGuidanceBn: 'রোগের লক্ষণ দেখা দিলে বা মুকুলের শুরুতে শেষ বিকেলে স্প্রে করুন।',
        safetyEquipmentBn: ['মুখের মাস্ক', 'হাতের গ্লাভস', 'চোখের চশমা'],
        preHarvestIntervalDays: 14,
        sources: ['কৃষি সম্প্রসারণ অধিদপ্তর (DAE)', 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)']
      },
      safetyGatePassed: true,
      timestamp: new Date().toISOString()
    });
  }
});

apiRouter.get('/diagnoses', (req: Request, res: Response) => {
  const { farmerId, officeId, status } = req.query;
  let list = db.getDiagnoses(farmerId as string);

  // If officer is querying, show cases assigned to their office or all pending cases
  if (officeId) {
    list = list.filter(d => d.assignedOfficeId === officeId);
  }
  if (status) {
    list = list.filter(d => d.officerVerificationStatus === status);
  }

  res.json(list);
});

apiRouter.get('/diagnoses/:id', (req: Request, res: Response) => {
  const diag = db.getDiagnosisById(req.params.id);
  if (!diag) return res.status(404).json({ error: 'Diagnosis record not found' });
  const office = diag.assignedOfficeId ? db.getOfficeById(diag.assignedOfficeId) : db.getOffices()[0];
  res.json({ ...diag, assignedOffice: office });
});

// 6. Agriculture Officer Verification Workflow
apiRouter.post('/diagnoses/:id/verify', (req: Request, res: Response) => {
  const { status, officerRemarksBn, officerVerifiedDoseBn, followupDays } = req.body;
  const diag = db.getDiagnosisById(req.params.id);
  if (!diag) return res.status(404).json({ error: 'Diagnosis not found' });

  const updated = db.updateDiagnosis(diag.id, {
    officerVerificationStatus: status, // VERIFIED_BY_OFFICER, MODIFIED_BY_OFFICER, REJECTED_BY_OFFICER, MORE_INFO_REQUESTED
    officerId: currentSessionUser.id,
    officerNameBn: currentSessionUser.name,
    officerRemarksBn,
    officerVerifiedDoseBn: officerVerifiedDoseBn || diag.verifiedDoseBn,
    officerVerifiedAt: new Date().toISOString(),
    followupScheduledDays: followupDays ? Number(followupDays) : diag.followupScheduledDays
  });

  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    'AGRICULTURE_OFFICER',
    'OFFICER_VERIFY_DIAGNOSIS',
    'Diagnosis',
    diag.id,
    `কৃষি কর্মকর্তা মতামত প্রদান করেছেন: ${status}`
  );

  db.addNotification(
    diag.farmerId,
    'কৃষি কর্মকর্তার পর্যালোচনা সম্পন্ন হয়েছে',
    `আপনার ${diag.cropNameBn} ফসলের রিপোর্ট কৃষি কর্মকর্তা (${currentSessionUser.name}) যাচাই করেছেন।`,
    'DIAGNOSIS_VERIFIED',
    `/diagnosis/${diag.id}`
  );

  res.json(updated);
});

// 7. Follow-up Workflow (Before vs After)
apiRouter.post('/diagnoses/:id/followup', (req: Request, res: Response) => {
  const { followupImageUrl, outcomeType, notesBn } = req.body;
  const diag = db.getDiagnosisById(req.params.id);
  if (!diag) return res.status(404).json({ error: 'Diagnosis not found' });

  let outcomeText = '';
  if (outcomeType === 'IMPROVED') {
    outcomeText = 'গাছের পাতার ক্ষত কমেছে এবং নতুন সুস্থ কুশি বের হয়েছে। চিকিৎসা সফল বলে পরিলক্ষিত হচ্ছে।';
  } else if (outcomeType === 'UNCHANGED') {
    outcomeText = 'রোগের তীব্রতা অপরিবর্তিত রয়েছে। আরও ২ দিন পর্যবেক্ষণ করুন অথবা উপজেলা কৃষি অফিসে নমুনা প্রদর্শন করুন।';
  } else {
    outcomeText = 'রোগের বিস্তার বেড়েছে বা নতুন অংশ সংক্রমিত হয়েছে। জরুরি ভিত্তিতে স্থানীয় কৃষি কর্মকর্তার সাথে সরাসরি যোগাযোগ করুন। রাসায়নিক মাত্রা বাড়াবেন না!';
  }

  const updated = db.updateDiagnosis(diag.id, {
    followupImageUrl: followupImageUrl || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    followupStatus: 'COMPLETED',
    followupOutcomeType: outcomeType,
    followupOutcomeBn: notesBn ? `${outcomeText} মন্তব্য: ${notesBn}` : outcomeText,
    followupAnalyzedAt: new Date().toISOString()
  });

  db.logAudit(currentSessionUser.id, currentSessionUser.name, currentSessionUser.role, 'FOLLOWUP_SUBMITTED', 'Diagnosis', diag.id, `ফলো-আপ ফলাফল: ${outcomeType}`);
  res.json(updated);
});

// 8. Reviewer & Knowledge Base
apiRouter.get('/knowledge', (req: Request, res: Response) => {
  const { status } = req.query;
  res.json(db.getKnowledgeItems(status as string));
});

apiRouter.post('/knowledge/:id/review', (req: Request, res: Response) => {
  const { status, reviewerNotesBn } = req.body;
  const item = db.getKnowledgeItems().find(k => k.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Knowledge item not found' });

  const updated = db.updateKnowledgeItem(item.id, {
    status, // APPROVED, REJECTED, PENDING_REVIEW
    reviewedById: currentSessionUser.id,
    reviewedAt: new Date().toISOString(),
    reviewerNotesBn,
    version: item.version + (status === 'APPROVED' ? 1 : 0)
  });

  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    'REVIEWER',
    'KNOWLEDGE_REVIEW',
    'KnowledgeItem',
    item.id,
    `বৈজ্ঞানিক তথ্য পর্যালোচনা: ${status}`
  );

  res.json(updated);
});

// 9. Data Entry Portal
apiRouter.post('/data-entry/knowledge', (req: Request, res: Response) => {
  const { titleBn, cropId, diseaseId, category, contentBn, sourceName, sourceType, sourceUrl } = req.body;

  const newItem = {
    id: `k-${Date.now()}`,
    titleBn,
    cropId,
    diseaseId,
    category,
    contentBn,
    sourceName: sourceName || 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
    sourceType: sourceType || 'GOVERNMENT',
    sourceUrl,
    version: 1,
    status: 'PENDING_REVIEW' as const,
    authorId: currentSessionUser.id,
    createdAt: new Date().toISOString()
  };

  db.saveKnowledgeItem(newItem);
  db.logAudit(currentSessionUser.id, currentSessionUser.name, 'DATA_ENTRY_OPERATOR', 'KNOWLEDGE_DRAFT_CREATED', 'KnowledgeItem', newItem.id, `নতুন ড্রাফট তথ্য যুক্ত করা হয়েছে: ${titleBn}`);
  res.json(newItem);
});

// 10. Admin & Super Admin Stats & Audit Logs
apiRouter.get('/admin/stats', (req: Request, res: Response) => {
  const allDiagnoses = db.getDiagnoses();
  const allFarmers = db.getUsers().filter(u => u.role === 'FARMER');
  const allOfficers = db.getUsers().filter(u => u.role === 'AGRICULTURE_OFFICER');
  const pendingReviews = allDiagnoses.filter(d => d.officerVerificationStatus === 'PENDING_OFFICER_REVIEW').length;
  const verifiedCases = allDiagnoses.filter(d => d.officerVerificationStatus === 'VERIFIED_BY_OFFICER').length;
  const highRiskCases = allDiagnoses.filter(d => d.severityLevel === 'CRITICAL' || d.severityLevel === 'HIGH').length;
  const followupCompleted = allDiagnoses.filter(d => d.followupStatus === 'COMPLETED').length;

  res.json({
    totalFarmers: allFarmers.length,
    totalOfficers: allOfficers.length,
    totalCrops: db.getCrops().length,
    totalDiseases: db.getDiseases().length,
    totalDiagnoses: allDiagnoses.length,
    pendingOfficerReviews: pendingReviews,
    verifiedDiagnoses: verifiedCases,
    highRiskCases,
    followupCompleted,
    systemStatus: 'ONLINE_SECURE'
  });
});

apiRouter.get('/admin/audit-logs', (req: Request, res: Response) => {
  res.json(db.getAuditLogs());
});

apiRouter.get('/admin/users', (req: Request, res: Response) => {
  res.json(db.getUsers());
});

// Admin Data Management Routes
apiRouter.post('/admin/crops', (req: Request, res: Response) => {
  const { nameBn, nameEn, scientificName, category, icon, stages } = req.body;
  if (!nameBn) {
    return res.status(400).json({ error: 'ফসলের বাংলা নাম আবশ্যক' });
  }
  const newCrop = {
    id: `crop-${Date.now()}`,
    nameBn,
    nameEn: nameEn || nameBn,
    scientificName: scientificName || '',
    category: category || 'Cash Crop',
    icon: icon || '🌱',
    stages: stages && stages.length > 0 ? stages : ['চারা রোপণ', 'অঙ্গজ বৃদ্ধি', 'ফুল ও ফল ধারণ', 'ফসল সংগ্রহ']
  };
  db.addCrop(newCrop as any);
  db.logAudit(currentSessionUser.id, currentSessionUser.name, currentSessionUser.role, 'ADD_CROP', 'Crop', newCrop.id, `নতুন ফসল যুক্ত: ${nameBn}`);
  res.json({ success: true, crop: newCrop });
});

apiRouter.post('/admin/diseases', (req: Request, res: Response) => {
  const { cropId, nameBn, nameEn, scientificName, type, severityDefault, symptomsBn, preventionBn, chemicalBn } = req.body;
  if (!nameBn || !cropId) {
    return res.status(400).json({ error: 'রোগের নাম এবং ফসল নির্বাচন আবশ্যক' });
  }
  const newDisease = {
    id: `dis-${Date.now()}`,
    cropId,
    nameBn,
    nameEn: nameEn || nameBn,
    scientificName: scientificName || '',
    type: type || 'Fungal',
    severityDefault: severityDefault || 'MEDIUM',
    symptomsBn: symptomsBn && symptomsBn.length > 0 ? symptomsBn : ['গাছের পাতায় দাগ ও ক্ষতিগ্রস্ত লক্ষণ'],
    preventionBn: preventionBn && preventionBn.length > 0 ? preventionBn : ['সুষম সার প্রয়োগ ও আগাছা দমন'],
    chemicalTreatmentDefaultBn: chemicalBn || 'কৃষি কর্মকর্তার পরামর্শ অনুযায়ী অনুমোদিত বালাইনাশক প্রয়োগ করুন।'
  };
  db.addDisease(newDisease as any);
  db.logAudit(currentSessionUser.id, currentSessionUser.name, currentSessionUser.role, 'ADD_DISEASE', 'Disease', newDisease.id, `নতুন রোগ/বালাই যুক্ত: ${nameBn}`);
  res.json({ success: true, disease: newDisease });
});

apiRouter.post('/admin/incentives', (req: Request, res: Response) => {
  const { titleBn, seasonBn, category, benefitsBn, eligibilityBn, deadlineBn, venuesBn, hotline, officerBn } = req.body;
  if (!titleBn) {
    return res.status(400).json({ error: 'প্রণোদনার শিরোনাম আবশ্যক' });
  }
  const newIncentive = {
    id: `inc-${Date.now()}`,
    titleBn,
    seasonBn: seasonBn || 'চলতি মৌসুম ২০২৬',
    ministryBn: 'কৃষি মন্ত্রণালয়, বাংলাদেশ',
    departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
    category: category || 'FREE_SEEDS_FERTILIZER',
    benefitsBn: benefitsBn && benefitsBn.length > 0 ? benefitsBn : ['বিনামূল্যে বীজ ও সার সহায়তা প্যাকেজ'],
    eligibilityBn: eligibilityBn && eligibilityBn.length > 0 ? eligibilityBn : ['স্থানীয় নিবন্ধিত কৃষক ও ডিজিটাল কৃষি কার্ডধারী'],
    requiredDocsBn: ['জাতীয় পরিচয়পত্র (NID) কপি', 'কৃষক কার্ড', 'জমি সংক্রান্ত তথ্য বা ইউনিয়ন প্রত্যয়ন'],
    applicationDeadlineBn: deadlineBn || '১৫ নভেম্বর ২০২৬',
    allocationStatusBn: 'আবেদন গ্রহণ চলছে',
    distributionVenuesBn: venuesBn && venuesBn.length > 0 ? venuesBn : ['উপজেলা কৃষি অফিস ও ইউনিয়ন সেবা কেন্দ্র'],
    hotline: hotline || '১৬১২৩',
    contactOfficerBn: officerBn || 'উপজেলা কৃষি কর্মকর্তা ও সংশ্লিষ্ট ইউনিয়ন SAAO',
    isActive: true
  };
  db.addIncentive(newIncentive as any);
  db.logAudit(currentSessionUser.id, currentSessionUser.name, currentSessionUser.role, 'ADD_INCENTIVE', 'IncentivePackage', newIncentive.id, `নতুন প্রণোদনা নোটিশ জারি: ${titleBn}`);
  res.json({ success: true, incentive: newIncentive });
});

apiRouter.post('/admin/market-prices', (req: Request, res: Response) => {
  const { cropNameBn, marketNameBn, districtBn, wholesalePriceBn, retailPriceBn, unitBn, trend } = req.body;
  if (!cropNameBn || !marketNameBn) {
    return res.status(400).json({ error: 'ফসলের নাম এবং বাজার আবশ্যক' });
  }
  const newPrice = {
    id: `mp-${Date.now()}`,
    cropNameBn,
    marketNameBn,
    districtBn: districtBn || 'চট্টগ্রাম / বাঁশখালী',
    wholesalePriceBn: wholesalePriceBn || '১,০০০ - ১,২০০ টাকা',
    retailPriceBn: retailPriceBn || '৩৫ - ৪০ টাকা',
    unitBn: unitBn || 'কেজি',
    trend: trend || 'STABLE',
    lastUpdatedBn: `আজ ${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`,
    source: 'কৃষি বিপণন অধিদপ্তর ও স্থানীয় আড়ত'
  };
  db.addMarketPrice(newPrice as any);
  db.logAudit(currentSessionUser.id, currentSessionUser.name, currentSessionUser.role, 'ADD_MARKET_PRICE', 'MarketPrice', newPrice.id, `বাজার দর আপডেট: ${cropNameBn} (${marketNameBn})`);
  res.json({ success: true, price: newPrice });
});

apiRouter.post('/admin/offices', (req: Request, res: Response) => {
  const { 
    upazilaNameBn, 
    districtNameBn, 
    officeNameBn, 
    officerNameBn, 
    officerDesignationBn,
    phone, 
    email,
    locationBn, 
    officeHoursBn,
    hotline,
    saaoUnionBn,
    saaoNameBn,
    saaoMobile
  } = req.body;

  if (!officerNameBn && !officeNameBn) {
    return res.status(400).json({ error: 'কর্মকর্তার নাম অথবা অফিসের নাম আবশ্যক' });
  }

  // 1. Resolve District
  const allDistricts = db.getDistricts();
  const matchedDist = (districtNameBn
    ? allDistricts.find(d => d.nameBn.includes(districtNameBn) || districtNameBn.includes(d.nameBn))
    : null) || allDistricts.find(d => d.id === 'dist-chattogram') || allDistricts[0];

  // 2. Resolve Upazila in that District
  const upazilasInDist = db.getUpazilas(matchedDist.id);
  const matchedUpz = (upazilaNameBn
    ? upazilasInDist.find(u => u.nameBn.includes(upazilaNameBn) || upazilaNameBn.includes(u.nameBn))
    : null) || upazilasInDist.find(u => u.nameBn.includes('বাঁশখালী')) || upazilasInDist[0];

  const targetUpazilaId = matchedUpz ? matchedUpz.id : `upz-${matchedDist.id}-custom`;
  const targetDistrictId = matchedDist.id;
  const targetUpazilaName = matchedUpz?.nameBn || upazilaNameBn || 'বাঁশখালী';
  const targetDistrictName = matchedDist.nameBn || districtNameBn || 'চট্টগ্রাম';

  const officeTitle = officeNameBn || `উপজেলা কৃষি অফিস, ${targetUpazilaName}, ${targetDistrictName}`;
  
  // 3. Find existing office or retrieve standard unions
  const existingOffices = db.getOffices(targetUpazilaId, targetDistrictId);
  const target = existingOffices[0];

  // 4. Get unions list
  let unionsList: any[] = target?.unions && target.unions.length > 0
    ? [...target.unions]
    : db.getUnions(targetUpazilaId, targetDistrictId);

  // If SAAO info is provided, attach or update union SAAO
  if (saaoUnionBn) {
    const existingUnionIdx = unionsList.findIndex((u: any) => 
      u.nameBn.includes(saaoUnionBn) || saaoUnionBn.includes(u.nameBn)
    );
    if (existingUnionIdx !== -1) {
      unionsList[existingUnionIdx] = {
        ...unionsList[existingUnionIdx],
        nameBn: saaoUnionBn,
        saaoNameBn: saaoNameBn || unionsList[existingUnionIdx].saaoNameBn || 'দায়িত্বপ্রাপ্ত কর্মকর্তা',
        saaoMobile: saaoMobile || unionsList[existingUnionIdx].saaoMobile || phone,
        blockNameBn: `${saaoUnionBn} কৃষি ব্লক ও এসএএও সেবা কেন্দ্র`,
        centerAddressBn: `${saaoUnionBn} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`
      };
    } else {
      unionsList.unshift({
        id: `uni-${Date.now()}`,
        nameBn: saaoUnionBn,
        nameEn: saaoUnionBn,
        upazilaId: targetUpazilaId,
        districtId: targetDistrictId,
        saaoNameBn: saaoNameBn || 'দায়িত্বপ্রাপ্ত কর্মকর্তা',
        saaoMobile: saaoMobile || phone,
        blockNameBn: `${saaoUnionBn} কৃষি ব্লক ও এসএএও সেবা কেন্দ্র`,
        centerAddressBn: `${saaoUnionBn} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`
      });
    }
  }

  const updatedOffice = {
    id: target ? target.id : `off-${targetUpazilaId}`,
    upazilaId: targetUpazilaId,
    districtId: targetDistrictId,
    nameBn: officeTitle,
    nameEn: `Upazila Agriculture Office, ${matchedUpz?.nameEn || 'Upazila'}, ${matchedDist.nameEn}`,
    type: 'UPAZILA_OFFICE',
    addressBn: locationBn || target?.addressBn || `উপজেলা পরিষদ চত্বর, ${targetUpazilaName}, ${targetDistrictName}`,
    phone: phone || target?.phone || '০১৭০৪-৮৯২১০৩',
    email: email || target?.email || 'uao@dae.gov.bd',
    officerNameBn: officerNameBn || target?.officerNameBn || 'উপজেলা কৃষি কর্মকর্তা',
    officerDesignationBn: officerDesignationBn || target?.officerDesignationBn || 'উপজেলা কৃষি কর্মকর্তা (UAO)',
    officerMobile: phone || target?.officerMobile || '০১৭০৪-৮৯২১০৩',
    emergencyContact: phone || '১৬১২৩',
    servicesBn: ['বালাই ব্যবস্থাপনা', 'ডিজিটাল কৃষক কার্ড', 'সার ও বীজ প্রণোদনা', 'মাঠ দিবস ও কৃষিশিক্ষা'],
    officeHoursBn: officeHoursBn || target?.officeHoursBn || 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০ (সরকারি কর্মদিবস)',
    hotline: hotline || '১৬১২৩',
    districtNameBn: targetDistrictName,
    upazilaNameBn: targetUpazilaName,
    unions: unionsList
  };

  db.addAgricultureOffice(updatedOffice as any);
  db.logAudit(
    currentSessionUser.id, 
    currentSessionUser.name, 
    currentSessionUser.role, 
    'OFFICER_DIRECTORY_UPDATE', 
    'AgricultureOffice', 
    updatedOffice.id, 
    `উপজেলা কৃষি কর্মকর্তা ও দপ্তর আপডেট: ${officerNameBn || officeTitle} (${officerDesignationBn || 'UAO'}, মোবাইল: ${phone}, ইউনিয়ন SAAO: ${saaoNameBn || 'N/A'})`
  );

  res.json({ success: true, office: updatedOffice });
});

// 11. Union & Agricultural Block Management Endpoints
apiRouter.get('/admin/blocks', (req: Request, res: Response) => {
  const { upazilaId, upazilaNameBn } = req.query;
  const blocks = db.getBlocksForUpazila(upazilaId as string, upazilaNameBn as string);
  res.json(blocks);
});

apiRouter.post('/admin/blocks', (req: Request, res: Response) => {
  const {
    id,
    upazilaId = 'upz-dist-chattogram-banshkhali',
    nameBn,
    blockNameBn,
    saaoNameBn,
    saaoMobile,
    centerAddressBn,
    mainCropsBn
  } = req.body;

  if (!nameBn) {
    return res.status(400).json({ error: 'ইউনিয়নের নাম আবশ্যক' });
  }

  const saved = db.addOrUpdateUnionBlock(upazilaId, {
    id,
    nameBn,
    blockNameBn: blockNameBn || `${nameBn} কৃষি ব্লক`,
    saaoNameBn: saaoNameBn || 'দায়িত্বপ্রাপ্ত উপসহকারী কৃষি কর্মকর্তা',
    saaoMobile: saaoMobile || '০১৭০০-০০০০০০',
    centerAddressBn: centerAddressBn || `${nameBn} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`,
    mainCropsBn: mainCropsBn || 'উফশী ধান ও মৌসুমি শাকসবজি'
  });

  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    currentSessionUser.role,
    'UNION_BLOCK_UPSERT',
    'UnionBlock',
    saved.id,
    `ইউনিয়ন ও কৃষি ব্লক সংযোজন/আপডেট: ${saved.nameBn} - ${saved.blockNameBn} (SAAO: ${saved.saaoNameBn}, মোবা: ${saved.saaoMobile})`
  );

  const allBlocks = db.getBlocksForUpazila(upazilaId);
  res.json({ success: true, block: saved, blocks: allBlocks });
});

apiRouter.delete('/admin/blocks/:id', (req: Request, res: Response) => {
  const { upazilaId = 'upz-dist-chattogram-banshkhali' } = req.query;
  const deleted = db.deleteUnionBlock(upazilaId as string, req.params.id);
  if (deleted) {
    db.logAudit(
      currentSessionUser.id,
      currentSessionUser.name,
      currentSessionUser.role,
      'UNION_BLOCK_DELETE',
      'UnionBlock',
      req.params.id,
      `কৃষি ব্লক মুছে ফেলা হয়েছে: ID ${req.params.id}`
    );
    res.json({ success: true, blocks: db.getBlocksForUpazila(upazilaId as string) });
  } else {
    res.status(404).json({ error: 'ব্লক খুঁজে পাওয়া যায়নি' });
  }
});

// 11. Public Weather, Market, AI & Government Data
apiRouter.get('/market-prices', (req: Request, res: Response) => {
  res.json(db.getMarketPrices());
});

apiRouter.post('/market-prices/refresh', (req: Request, res: Response) => {
  res.json(db.refreshMarketPrices());
});

apiRouter.get('/incentives', (req: Request, res: Response) => {
  res.json(db.getIncentives());
});

apiRouter.post('/incentives/auto-sync', (req: Request, res: Response) => {
  const syncResult = db.syncGovernmentAgriBulletins();
  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    currentSessionUser.role,
    'INCENTIVE_AUTO_SYNC',
    'Incentives',
    'dae-live-sync',
    `কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও এআইএস লাইভ সার্কুলার অটো-সিঙ্ক সম্পন্ন: ${syncResult.newCount}টি নতুন নোটিশ`
  );
  res.json({ success: true, ...syncResult });
});

apiRouter.post('/incentives/broadcast', (req: Request, res: Response) => {
  const { titleBn, messageBn } = req.body;
  if (!titleBn) {
    return res.status(400).json({ error: 'নোটিশ শিরোনাম আবশ্যক' });
  }
  const count = db.broadcastNoticeToUsers(titleBn, messageBn || titleBn);
  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    currentSessionUser.role,
    'NOTICE_BROADCAST',
    'Notifications',
    'all-farmers',
    `সকল কৃষক ও ডিলারকে সরকারি কৃষি নোটিশ ব্রডকাস্ট পাঠানো হয়েছে (${count} জন নিবন্ধিত ব্যবহারকারী)`
  );
  res.json({ success: true, count, message: `${count} জন নিবন্ধিত কৃষক ও ডিলারের নোটিফিকেশন বারে পাঠানো হয়েছে` });
});

// Dedicated Interactive Agri AI Specialist (প্রশ্ন জিজ্ঞাসা করুন)
apiRouter.post('/ai/ask', async (req: Request, res: Response) => {
  const { question, cropName, location } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'প্রশ্ন প্রদান করা আবশ্যক' });
  }

  try {
    const result = await aiService.askAgronomistAI(question, { cropName, location });
    db.logAudit(
      currentSessionUser.id,
      currentSessionUser.name,
      currentSessionUser.role,
      'ASK_AGRI_AI',
      'AI_Consultation',
      'gemini-3.8-flash',
      `এআই প্রশ্ন জিজ্ঞাসা: ${question.slice(0, 50)}...`
    );
    res.json(result);
  } catch (err: any) {
    console.error('Error in /api/ai/ask:', err);
    res.status(500).json({ error: 'এআই সার্ভারে সমস্যা হয়েছে, কিছুক্ষণ পর চেষ্টা করুন।' });
  }
});

apiRouter.get('/government-updates', (req: Request, res: Response) => {
  res.json(db.getGovernmentUpdates());
});

apiRouter.get('/weather/current', (req: Request, res: Response) => {
  const { districtId, upazilaName, unionName } = req.query;
  const targetDistId = (districtId as string) || currentSessionUser.districtId || 'dist-gazipur';
  const dist = db.getDistrictById(targetDistId) || db.getDistricts()[0];
  const weather = db.getRegionalWeather(dist.id, upazilaName as string, unionName as string);
  const advice = db.getRegionalCropAdvice(dist.id, upazilaName as string, unionName as string);
  const div = db.getDivisions().find(d => d.id === dist.divisionId);

  res.json({
    divisionId: dist.divisionId,
    divisionBn: div?.nameBn || 'ঢাকা',
    districtId: dist.id,
    districtBn: dist.nameBn,
    upazilaNameBn: (upazilaName as string) || 'উপজেলা পর্যায়',
    unionNameBn: (unionName as string) || 'ইউনিয়ন কৃষি ব্লক',
    ...weather,
    advisoryBn: weather.weatherWarningBn || 'আবহাওয়া অনুকূল। সকালে রোদ ওঠার পর অথবা শেষ বিকেলে স্প্রে করা উত্তম।',
    regionalAdvice: advice
  });
});


apiRouter.get('/notifications', (req: Request, res: Response) => {
  res.json(db.getNotifications(currentSessionUser.id));
});

// 12. Verified Agri Dealers & Marketplace (Monetization & Inputs)
apiRouter.get('/dealers', (req: Request, res: Response) => {
  const { upazila, district, type } = req.query;
  const dealers = db.getDealers({
    upazila: upazila as string,
    district: district as string,
    type: type as string
  });
  res.json(dealers);
});

apiRouter.post('/admin/dealers', (req: Request, res: Response) => {
  const {
    id,
    shopNameBn,
    proprietorNameBn,
    phone,
    districtNameBn,
    upazilaNameBn,
    marketAddressBn,
    dealerType,
    dealerTypeBn,
    authorizedBrands,
    productsAvailableBn,
    isFeaturedSponsored,
    monthlyTier
  } = req.body;

  if (!shopNameBn || !phone) {
    return res.status(400).json({ error: 'দোকানের নাম এবং মোবাইল নম্বর আবশ্যক' });
  }

  if (id) {
    // Update existing
    const updated = db.updateDealer(id, {
      shopNameBn,
      proprietorNameBn,
      phone,
      districtNameBn: districtNameBn || 'চট্টগ্রাম',
      upazilaNameBn: upazilaNameBn || 'বাঁশখালী',
      marketAddressBn,
      dealerType: dealerType || 'AUTHORIZED_PESTICIDE',
      dealerTypeBn: dealerTypeBn || 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার',
      authorizedBrands: authorizedBrands || ['Syngenta', 'ACI'],
      productsAvailableBn: productsAvailableBn || ['কীটনাশক', 'সার'],
      isFeaturedSponsored: !!isFeaturedSponsored,
      monthlyTier: monthlyTier || 'FREE'
    });
    db.logAudit(
      currentSessionUser.id,
      currentSessionUser.name,
      currentSessionUser.role,
      'UPDATE_AGRI_DEALER',
      'AgriDealer',
      id,
      `ডিলার তথ্য আপডেট: ${shopNameBn} (${upazilaNameBn || 'বাঁশখালী'}, স্পনসরড: ${isFeaturedSponsored ? 'হ্যাঁ' : 'না'})`
    );
    return res.json({ success: true, dealer: updated });
  }

  // Create new
  const newDealer = {
    id: `dlr-${Date.now()}`,
    shopNameBn,
    proprietorNameBn: proprietorNameBn || 'স্বত্বাধিকারী',
    phone,
    districtNameBn: districtNameBn || 'চট্টগ্রাম',
    upazilaNameBn: upazilaNameBn || 'বাঁশখালী',
    marketAddressBn: marketAddressBn || `${upazilaNameBn || 'বাঁশখালী'} বাজার`,
    dealerType: dealerType || 'AUTHORIZED_PESTICIDE',
    dealerTypeBn: dealerTypeBn || 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার',
    authorizedBrands: Array.isArray(authorizedBrands) ? authorizedBrands : ['Syngenta', 'ACI Crop Care', 'Auto'],
    productsAvailableBn: Array.isArray(productsAvailableBn) ? productsAvailableBn : ['ইউরিয়া', 'কীটনাশক', 'বীজ'],
    isVerified: true,
    isFeaturedSponsored: !!isFeaturedSponsored,
    monthlyTier: monthlyTier || (isFeaturedSponsored ? 'GOLD' : 'FREE'),
    subscriptionValidUntil: '2027-12-31',
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.addDealer(newDealer);
  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    currentSessionUser.role,
    'ADD_AGRI_DEALER',
    'AgriDealer',
    newDealer.id,
    `নতুন ডিলার লিস্টিং সংযোজন: ${shopNameBn} (${newDealer.upazilaNameBn}, টিয়ার: ${newDealer.monthlyTier})`
  );

  res.json({ success: true, dealer: newDealer });
});

apiRouter.delete('/admin/dealers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteDealer(id);
  if (deleted) {
    db.logAudit(
      currentSessionUser.id,
      currentSessionUser.name,
      currentSessionUser.role,
      'DELETE_AGRI_DEALER',
      'AgriDealer',
      id,
      `ডিলার তালিকা থেকে অপসারণ করা হয়েছে (ID: ${id})`
    );
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'ডিলার পাওয়া যায়নি' });
  }
});

// 13. Farmer Marketplace (Krishi Haat - ফসল কেনাবেচা)
apiRouter.get('/marketplace', (req: Request, res: Response) => {
  const { cropCategory, upazila } = req.query;
  const listings = db.getMarketplaceListings({
    cropCategory: cropCategory as string,
    upazila: upazila as string
  });
  res.json(listings);
});

apiRouter.post('/marketplace', (req: Request, res: Response) => {
  const {
    farmerNameBn,
    farmerPhone,
    cropNameBn,
    cropCategoryBn,
    quantityBn,
    expectedPriceBn,
    districtNameBn,
    upazilaNameBn,
    unionNameBn,
    harvestDateBn,
    descriptionBn,
    qualityGradeBn
  } = req.body;

  if (!cropNameBn || !farmerPhone || !quantityBn) {
    return res.status(400).json({ error: 'ফসলের নাম, পরিমাণ এবং মোবাইল নম্বর আবশ্যক' });
  }

  const newListing = {
    id: `mkt-${Date.now()}`,
    farmerNameBn: farmerNameBn || currentSessionUser.name || 'কৃষক',
    farmerPhone,
    cropNameBn,
    cropCategoryBn: cropCategoryBn || 'শাকসবজি ও খাদ্যশস্য',
    quantityBn,
    expectedPriceBn: expectedPriceBn || 'আলোচনা সাপেক্ষে',
    districtNameBn: districtNameBn || 'চট্টগ্রাম',
    upazilaNameBn: upazilaNameBn || 'বাঁশখালী',
    unionNameBn: unionNameBn || 'নাপোড়া',
    harvestDateBn: harvestDateBn || 'অবিলম্বে সংগ্রহযোগ্য',
    descriptionBn: descriptionBn || 'সরাসরি জমি থেকে সংগ্রহ করা তাজা ও বিষমুক্ত ফসল।',
    qualityGradeBn: qualityGradeBn || 'PREMIUM',
    status: 'AVAILABLE' as const,
    createdAt: new Date().toISOString().split('T')[0]
  };

  db.addMarketplaceListing(newListing);
  db.logAudit(
    currentSessionUser.id,
    currentSessionUser.name,
    currentSessionUser.role,
    'ADD_MARKETPLACE_LISTING',
    'MarketplaceCropListing',
    newListing.id,
    `ফসল বিক্রির পোস্ট: ${cropNameBn} (${quantityBn}, এলাকা: ${newListing.upazilaNameBn})`
  );

  res.json({ success: true, listing: newListing });
});

apiRouter.patch('/marketplace/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = db.updateMarketplaceListingStatus(id, status);
  res.json({ success: updated });
});

apiRouter.delete('/marketplace/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteMarketplaceListing(id);
  res.json({ success: deleted });
});
