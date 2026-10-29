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
  designation?: string;
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
  hotline: string;
  unions?: Union[];
}

export interface Crop {
  id: string;
  nameBn: string;
  nameEn: string;
  scientificName: string;
  category: string;
  icon: string;
  stages: string[];
}

export interface Disease {
  id: string;
  cropId: string;
  nameBn: string;
  nameEn: string;
  scientificName?: string;
  type: string;
  severityDefault: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  symptomsBn: string[];
  possibleCausesBn: string[];
  nonChemicalManagementBn: string[];
  treatmentCategoryId: string;
  activeIngredientId?: string;
  safetyWarningBn: string;
  source: string;
}

export interface DiagnosisCandidate {
  problemNameBn: string;
  problemNameEn: string;
  confidencePercent: number;
  category: string;
  descriptionBn: string;
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
  soilType?: string;
  soilMoisture?: 'DRY' | 'NORMAL' | 'WATERLOGGED';
  soilPh?: number;
  drainageCondition?: 'GOOD' | 'MODERATE' | 'POOR';
  salinityPresent?: boolean;
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
  imageQuality: 'CLEAR' | 'BLURRY' | 'DARK' | 'TOO_DISTANT' | 'INSUFFICIENT';
  
  weather: WeatherCondition;
  soil: SoilContext;

  primaryCandidate: DiagnosisCandidate;
  alternativeCandidates: DiagnosisCandidate[];
  overallConfidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explainableReasoningBn: string;
  possibleCausesBn: string[];
  nonChemicalManagementBn: string[];
  
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

  officerVerificationStatus: 'PENDING_OFFICER_REVIEW' | 'VERIFIED_BY_OFFICER' | 'MODIFIED_BY_OFFICER' | 'REJECTED_BY_OFFICER' | 'MORE_INFO_REQUESTED';
  assignedOfficeId?: string;
  officerId?: string;
  officerNameBn?: string;
  officerRemarksBn?: string;
  officerVerifiedDoseBn?: string;
  officerVerifiedAt?: string;

  followupScheduledDays?: number;
  followupStatus?: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
  followupImageUrl?: string;
  followupOutcomeBn?: string;
  followupOutcomeType?: 'IMPROVED' | 'UNCHANGED' | 'WORSE';
  followupAnalyzedAt?: string;

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
  category: string;
  contentBn: string;
  sourceName: string;
  sourceType: string;
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
  type: string;
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
  authorizedBrands: string[];
  productsAvailableBn: string[];
  isVerified: boolean;
  isFeaturedSponsored: boolean;
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
  quantityBn: string;
  expectedPriceBn: string;
  districtNameBn: string;
  upazilaNameBn: string;
  unionNameBn: string;
  harvestDateBn: string;
  descriptionBn: string;
  qualityGradeBn: 'PREMIUM' | 'GRADE_A' | 'STANDARD';
  status: 'AVAILABLE' | 'SOLD' | 'BOOKED';
  createdAt: string;
}

