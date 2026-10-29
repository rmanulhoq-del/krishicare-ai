export type Role = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'AGRICULTURE_OFFICER' 
  | 'REVIEWER' 
  | 'DATA_ENTRY_OPERATOR' 
  | 'FARMER' 
  | 'GUEST';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  designation?: string; // for officers (e.g. SAAO, উপজেলা কৃষি কর্মকর্তা)
  avatar?: string;
  createdAt: string;
}

export interface Division {
  id: string;
  nameBn: string;
  nameEn: string;
}

export interface District {
  id: string;
  divisionId: string;
  nameBn: string;
  nameEn: string;
}

export interface Upazila {
  id: string;
  districtId: string;
  nameBn: string;
  nameEn: string;
}

export interface Union {
  id: string;
  upazilaId: string;
  districtId?: string;
  nameBn: string;
  nameEn: string;
  blockNameBn?: string;
  saaoNameBn?: string;
  saaoMobile?: string;
  centerAddressBn?: string;
  mainCropsBn?: string;
}

export interface AgricultureOffice {
  id: string;
  upazilaId: string;
  districtId: string;
  districtNameBn?: string;
  upazilaNameBn?: string;
  nameBn: string;
  nameEn: string;
  addressBn: string;
  phone: string;
  email: string;
  officeHoursBn: string;
  officerNameBn: string;
  officerDesignationBn: string;
  officerMobile: string;
  hotline: string; // 16123
  unions?: Union[];
}

export interface Crop {
  id: string;
  nameBn: string;
  nameEn: string;
  scientificName: string;
  category: 'Cereal' | 'Vegetable' | 'Fruit' | 'Pulse' | 'Oilseed' | 'Cash Crop' | 'Other';
  icon: string;
  imageUrl?: string;
  stages: string[];
}

export interface Disease {
  id: string;
  cropId: string;
  nameBn: string;
  nameEn: string;
  scientificName?: string;
  type: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient Deficiency' | 'Environmental Stress';
  severityDefault: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptomsBn: string[];
  symptomsEn: string[];
  possibleCausesBn: string[];
  nonChemicalManagementBn: string[];
  treatmentCategoryId: string;
  activeIngredientId?: string;
  doseRuleId?: string;
  safetyWarningBn: string;
  source: string;
}

export interface TreatmentCategory {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
}

export interface ActiveIngredient {
  id: string;
  categoryId: string;
  nameBn: string;
  nameEn: string;
  commonFormulation: string; // e.g. 50 WP, 250 EC, 80 WG
  targetPestsBn: string[];
  brandNeutralNoteBn: string;
  source: string;
}

export interface DoseRule {
  id: string;
  cropId: string;
  diseaseId: string;
  activeIngredientId: string;
  dosePerLiterBn: string; // e.g. "২ গ্রাম প্রতি লিটার পানি"
  dosePerDecimelBn: string; // per shothok/decimal
  waterVolumeBn: string; // e.g. "১০ লিটার পানি প্রতি শতকে"
  applicationMethodBn: string; // e.g. "গাছের পাতা ও ডালপালা ভালোভাবে ভিজিয়ে স্প্রে করুন"
  timingBn: string; // e.g. "সকালে অথবা শেষ বিকেলে, তীব্র রোদে স্প্রে করবেন না"
  maxApplicationsPerSeason: number;
  preHarvestIntervalDays: number; // PHI
  safetyEquipmentBn: string[]; // মাস্ক, গ্লাভস, গগলস
  verifiedBy: string; // DAE, BARI, BRRI
  approvalStatus: 'DRAFT' | 'REVIEWED' | 'APPROVED';
}

export interface WeatherCondition {
  temperatureC: number;
  humidityPercent: number;
  rainfallForecastMm: number;
  windSpeedKmh: number;
  weatherConditionBn: string;
  applicationSuitability: 'FAVORABLE' | 'MODERATE' | 'UNFAVORABLE' | 'PROHIBITED';
  weatherWarningBn?: string;
}

export interface SoilContext {
  soilType?: string; // দোআঁশ, বেলে দোআঁশ, এটেল, পলি
  soilMoisture?: 'DRY' | 'NORMAL' | 'WATERLOGGED';
  soilPh?: number;
  drainageCondition?: 'GOOD' | 'MODERATE' | 'POOR';
  salinityPresent?: boolean;
}

export interface DiagnosisCandidate {
  problemNameBn: string;
  problemNameEn: string;
  confidencePercent: number;
  category: string;
  descriptionBn: string;
}

export interface Diagnosis {
  id: string;
  farmerId: string;
  farmerNameBn: string;
  farmerPhone: string;
  cropId: string;
  cropNameBn: string;
  cropStageBn?: string;
  cropAgeBn?: string;
  affectedPartBn?: string;
  durationBn?: string;
  spreadBn?: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionId?: string;
  locationNameBn: string;
  imageUrl: string;
  additionalImages?: string[];
  imageQuality: 'CLEAR' | 'BLURRY' | 'DARK' | 'TOO_DISTANT' | 'INSUFFICIENT';
  
  // Weather & Soil Context
  weather: WeatherCondition;
  soil: SoilContext;

  // AI Diagnostic Outputs
  primaryCandidate: DiagnosisCandidate;
  alternativeCandidates: DiagnosisCandidate[];
  overallConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explainableReasoningBn: string;
  possibleCausesBn: string[];
  nonChemicalManagementBn: string[];
  
  // Brand-Neutral Treatment Guidance
  treatmentCategoryBn?: string;
  activeIngredientBn?: string;
  formulationBn?: string;
  verifiedDoseBn?: string;
  applicationMethodBn?: string;
  timingGuidanceBn?: string;
  safetyEquipmentBn?: string[];
  preHarvestIntervalDays?: number;
  safetyGatePassed: boolean;
  safetyGateReasonBn?: string;

  // Officer Verification Layer
  officerVerificationStatus: 'PENDING_OFFICER_REVIEW' | 'VERIFIED_BY_OFFICER' | 'MODIFIED_BY_OFFICER' | 'REJECTED_BY_OFFICER' | 'MORE_INFO_REQUESTED';
  assignedOfficeId?: string;
  officerId?: string;
  officerNameBn?: string;
  officerRemarksBn?: string;
  officerVerifiedDoseBn?: string;
  officerVerifiedAt?: string;

  // Follow-up
  followupScheduledDays?: number;
  followupStatus?: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
  followupImageUrl?: string;
  followupOutcomeBn?: string;
  followupOutcomeType?: 'IMPROVED' | 'UNCHANGED' | 'WORSE';
  followupAnalyzedAt?: string;

  // Metadata
  sources: string[];
  isAiGenerated: boolean;
  isEscalatedToHuman: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeItem {
  id: string;
  titleBn: string;
  cropId?: string;
  diseaseId?: string;
  category: 'CROP_MANAGEMENT' | 'DISEASE_CONTROL' | 'DOSE_GUIDELINE' | 'SAFETY_RULE' | 'GOVERNMENT_SCHEME';
  contentBn: string;
  sourceName: string;
  sourceType: 'GOVERNMENT' | 'RESEARCH_INSTITUTE' | 'INTERNATIONAL';
  sourceUrl?: string;
  version: number;
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  authorId: string;
  reviewedById?: string;
  reviewedAt?: string;
  reviewerNotesBn?: string;
  createdAt: string;
}

export interface MarketPrice {
  id: string;
  cropNameBn: string;
  marketNameBn: string;
  districtBn: string;
  wholesalePriceBn: string;
  retailPriceBn: string;
  unitBn: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastUpdatedBn: string;
  source: string;
}

export interface GovernmentUpdate {
  id: string;
  titleBn: string;
  summaryBn: string;
  departmentBn: string;
  dateBn: string;
  isImportant: boolean;
  link?: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ip: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  titleBn: string;
  messageBn: string;
  type: 'DIAGNOSIS_VERIFIED' | 'WEATHER_ALERT' | 'FOLLOWUP_REMINDER' | 'GOVERNMENT_NOTICE';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface IncentivePackage {
  id: string;
  titleBn: string;
  seasonBn: string;
  ministryBn: string;
  departmentBn: string;
  category: 'FREE_SEEDS_FERTILIZER' | 'MACHINERY_SUBSIDY' | 'DISASTER_RELIEF' | 'CASH_INCENTIVE' | 'SPECIAL_PROJECT';
  benefitsBn: string[];
  eligibilityBn: string[];
  requiredDocsBn: string[];
  applicationStepsBn?: string[];
  applicationDeadlineBn: string;
  allocationStatusBn: string;
  distributionVenuesBn: string[];
  hotline: string;
  contactOfficerBn: string;
  isActive: boolean;
}

export interface AgriDealer {
  id: string;
  shopNameBn: string;
  proprietorNameBn: string;
  phone: string;
  divisionId?: string;
  districtId?: string;
  districtNameBn: string;
  upazilaNameBn: string;
  marketAddressBn: string;
  dealerType: 'BCIC_FERTILIZER' | 'BADC_SEEDS' | 'AUTHORIZED_PESTICIDE' | 'GENERAL_AGRI_INPUT' | 'MACHINERY_RENTAL' | 'IRRIGATION_SERVICE';
  dealerTypeBn: string;
  rentalRateBn?: string;
  machineryTypeBn?: string;
  authorizedBrands: string[]; // e.g. ['Syngenta', 'ACI Crop Care', 'Auto Crop Care', 'Square Agro', 'BADC']
  productsAvailableBn: string[]; // e.g. ['ইউরিয়া', 'ডিএপি', 'এমওপি', 'কীটনাশক', 'ধান বীজ', 'স্প্রে মেশিন']
  isVerified: boolean;
  isFeaturedSponsored: boolean; // For monetization: sponsored dealers appear at top
  monthlyTier?: 'FREE' | 'BRONZE' | 'SILVER' | 'GOLD';
  subscriptionValidUntil?: string;
  createdAt: string;
}

export interface MarketplaceCropListing {
  id: string;
  farmerNameBn: string;
  farmerPhone: string;
  cropNameBn: string;
  cropCategoryBn: string;
  quantityBn: string; // e.g. '৫০ মণ'
  expectedPriceBn: string; // e.g. '১,২৫০ টাকা / মণ'
  districtNameBn: string;
  upazilaNameBn: string;
  unionNameBn: string;
  harvestDateBn: string; // e.g. '৩ দিন পর সরাসরি জমি থেকে'
  descriptionBn: string;
  qualityGradeBn: 'PREMIUM' | 'GRADE_A' | 'STANDARD';
  status: 'AVAILABLE' | 'SOLD' | 'BOOKED';
  createdAt: string;
}

