import React, { useState } from 'react';
import { 
  Calculator, Sprout, CheckCircle2, AlertTriangle, Printer, 
  Sparkles, Layers, Info, X, ShieldCheck, ArrowRight, Leaf
} from 'lucide-react';

interface FertilizerCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCropName?: string;
  initialAreaDecimel?: number;
}

interface CropDoseConfig {
  id: string;
  nameBn: string;
  categoryBn: string;
  defaultUnit: string;
  // Rates per decimal (শতক) in KG
  ureaPerDec: number;
  tspPerDec: number;
  mopPerDec: number;
  gypsumPerDec: number;
  zincPerDecGrams: number;
  boronPerDecGrams: number;
  cowdungPerDecKg: number;
  mustardOilCakePerDecKg?: number;
  stages: {
    basal: string;
    stage1: string;
    stage2?: string;
    stage3?: string;
  };
  tipsBn: string[];
}

const CROP_DATABASE: Record<string, CropDoseConfig> = {
  'rice-aman': {
    id: 'rice-aman',
    nameBn: 'রোপা আমন ধান (উফশী)',
    categoryBn: 'খাদ্যশস্য',
    defaultUnit: 'শতক',
    ureaPerDec: 1.05,
    tspPerDec: 0.45,
    mopPerDec: 0.55,
    gypsumPerDec: 0.40,
    zincPerDecGrams: 40,
    boronPerDecGrams: 0,
    cowdungPerDecKg: 10,
    stages: {
      basal: 'জমি তৈরির শেষ চাষে সমস্ত টিএসপি, জিপসাম, জিংক সালফেট এবং ৫০% পটাশ ও গোবর সার মাটির সাথে মিশিয়ে দিন।',
      stage1: 'চারা রোপণের ১৫-২০ দিন পর (কুশি গজানোর সময়) মোট ইউরিয়ার ১/৩ অংশ উপরিপ্রয়োগ করুন।',
      stage2: 'চারা রোপণের ৩৫-৪০ দিন পর (সর্বোচ্চ কুশি পর্যায়) দ্বিতীয় কিস্তির ১/৩ অংশ ইউরিয়া এবং বাকি ৫০% পটাশ দিন।',
      stage3: 'কাইচ থোড় আসার ৫-৭ দিন আগে শেষ কিস্তির ১/৩ অংশ ইউরিয়া উপরিপ্রয়োগ করুন।'
    },
    tipsBn: [
      'জমিতে ২-৩ ইঞ্চি পানি থাকা অবস্থায় ইউরিয়া ছিটানো সবচেয়ে ভালো। শুকনা জমিতে দিলে সার নষ্ট হয়।',
      'গুটি ইউরিয়া (USG) ব্যবহার করলে সাধারণ ইউরিয়ার চেয়ে ৩০% সার সাশ্রয় হয়।',
      'পাতা ভেজা থাকা অবস্থায় কখনোই ইউরিয়া ছিটাবেন না, এতে পাতা পুড়ে যায়।'
    ]
  },
  'rice-boro': {
    id: 'rice-boro',
    nameBn: 'বোরো ধান (উফশী ও হাইব্রিড)',
    categoryBn: 'খাদ্যশস্য',
    defaultUnit: 'শতক',
    ureaPerDec: 1.30,
    tspPerDec: 0.55,
    mopPerDec: 0.65,
    gypsumPerDec: 0.45,
    zincPerDecGrams: 45,
    boronPerDecGrams: 20,
    cowdungPerDecKg: 12,
    stages: {
      basal: 'শেষ চাষের সময় সমস্ত টিএসপি, জিপসাম, জিংক, বোরন এবং অর্ধেক পটাশ মাটির সাথে মিশিয়ে মই দিন।',
      stage1: 'রোপণের ১৫-২০ দিন পর প্রথম কিস্তির ১/৩ ইউরিয়া উপরিপ্রয়োগ।',
      stage2: 'রোপণের ৩০-৩৫ দিন পর দ্বিতীয় কিস্তির ১/৩ ইউরিয়া এবং বাকি ৫০% পটাশ উপরিপ্রয়োগ।',
      stage3: 'কাইচ থোড় আসার ৫-৭ দিন আগে শেষ ১/৩ ইউরিয়া দিন।'
    },
    tipsBn: [
      'শীতের সকালে শিশির শুকানোর পর সার প্রয়োগ করুন।',
      'জিংক সারের সাথে কখনো টিএসপি সার একসাথে দীর্ঘক্ষণ মিশিয়ে রাখবেন না, মাটিতে আলাদা দিন।'
    ]
  },
  'watermelon': {
    id: 'watermelon',
    nameBn: 'মিষ্টি তরমুজ (বাঁশখালী বিশেষ)',
    categoryBn: 'ফল ও তরমুজ',
    defaultUnit: 'শতক',
    ureaPerDec: 1.25,
    tspPerDec: 1.05,
    mopPerDec: 1.25,
    gypsumPerDec: 0.50,
    zincPerDecGrams: 50,
    boronPerDecGrams: 40,
    cowdungPerDecKg: 20,
    stages: {
      basal: 'মাদা (পিট) তৈরির সময় সমস্ত গোবর, টিএসপি, জিপসাম, জিংক ও বোরন এবং ১/৩ পটাশ মাদার মাটির সাথে ভালোভাবে মিশিয়ে ১০ দিন ফেলে রাখুন।',
      stage1: 'চারা লাগানোর ২০-২৫ দিন পর (লতা ছাড়ার সময়) ১/৩ ইউরিয়া ও ১/৩ পটাশ গাছের গোড়া থেকে ৪-৫ ইঞ্চি দূরে রিং করে দিন।',
      stage2: 'ফুল আসার সময় বাকি ইউরিয়া ও পটাশ সার সেচ নালার পাশে দিন।'
    },
    tipsBn: [
      'তরমুজের মিষ্টতা ও ফল ফাটা রোধে বোরন ও পটাশ অত্যন্ত জরুরি।',
      'গাছের মূল কাণ্ডে যেন সরাসরি রাসায়নিক সার না লাগে সেদিকে খেয়াল রাখুন।'
    ]
  },
  'potato': {
    id: 'potato',
    nameBn: 'গোল আলু (কার্ডিনাল / ডায়মন্ট)',
    categoryBn: 'সবজি',
    defaultUnit: 'শতক',
    ureaPerDec: 1.35,
    tspPerDec: 0.95,
    mopPerDec: 1.25,
    gypsumPerDec: 0.45,
    zincPerDecGrams: 40,
    boronPerDecGrams: 45,
    cowdungPerDecKg: 20,
    stages: {
      basal: 'জমি তৈরির সময় মোট ইউরিয়ার অর্ধেক এবং সমস্ত টিএসপি, পটাশ, জিপসাম, জিংক ও বোরন মাটির সাথে মিশিয়ে দিন।',
      stage1: 'গাছের বয়স ৩০-৩৫ দিন হলে (গোড়ায় মাটি তোলার সময়) বাকি অর্ধেক ইউরিয়া ও কিছু পটাশ উপরিপ্রয়োগ করে সেচ দিন।'
    },
    tipsBn: [
      'আলুর আকার বড় ও চামড়া মসৃণ করতে পটাশ এবং বোরন সার সবচেয়ে কার্যকর ভূমিকা পালন করে।'
    ]
  },
  'eggplant': {
    id: 'eggplant',
    nameBn: 'বেগুন (বারি বেগুন / স্থানীয় জাত)',
    categoryBn: 'সবজি',
    defaultUnit: 'শতক',
    ureaPerDec: 1.50,
    tspPerDec: 1.10,
    mopPerDec: 1.05,
    gypsumPerDec: 0.40,
    zincPerDecGrams: 40,
    boronPerDecGrams: 30,
    cowdungPerDecKg: 15,
    stages: {
      basal: 'মাদা ও জমি তৈরিতে সমস্ত গোবর, টিএসপি, জিপসাম, জিংক এবং ১/৩ পটাশ মাটির সাথে মিশিয়ে দিন।',
      stage1: 'চারা লাগানোর ২০-২৫ দিন পর প্রথম কিস্তির ইউরিয়া ও পটাশ উপরিপ্রয়োগ।',
      stage2: 'ফুল ও বেগুন ধরার সময় (৪০-৪৫ দিন) দ্বিতীয় কিস্তি ইউরিয়া উপরিপ্রয়োগ।',
      stage3: 'প্রতি ৩ বার ফল তোলার পর সামান্য ইউরিয়া ও পটাশ উপরিপ্রয়োগ করলে গাছ দীর্ঘদিন সতেজ থাকে।'
    },
    tipsBn: [
      'বেগুনে ডগা ও ফল ছিদ্রকারী পোকা দমনে অতিরিক্ত ইউরিয়া দেওয়া এড়িয়ে চলুন।'
    ]
  },
  'tomato': {
    id: 'tomato',
    nameBn: 'টমেটো (উচ্চফলনশীল জাত)',
    categoryBn: 'সবজি',
    defaultUnit: 'শতক',
    ureaPerDec: 1.40,
    tspPerDec: 1.20,
    mopPerDec: 1.15,
    gypsumPerDec: 0.40,
    zincPerDecGrams: 40,
    boronPerDecGrams: 40,
    cowdungPerDecKg: 18,
    stages: {
      basal: 'শেষ চাষের সময় সম্পূর্ণ গোবর, টিএসপি, জিপসাম, জিংক, বোরন এবং অর্ধেক পটাশ প্রয়োগ করুন।',
      stage1: 'চারা লাগানোর ১৫ দিন পর ইউরিয়ার প্রথম কিস্তি (১/৩ অংশ)।',
      stage2: 'ফুল আসার সময় ইউরিয়ার দ্বিতীয় কিস্তি ও বাকি পটাশ।',
      stage3: 'ফল পুষ্ট হওয়ার সময় ইউরিয়ার শেষ কিস্তি উপরিপ্রয়োগ।'
    },
    tipsBn: [
      'টমেটোর নিচের পাতা মাটি স্পর্শ করতে দেবেন না এবং ফল ফাটা রোধে বোরন অবশ্যই দিন।'
    ]
  },
  'mustard': {
    id: 'mustard',
    nameBn: 'সরিষা (বারি সরিষা ১৪ / ১৭ / ১৮)',
    categoryBn: 'তৈলবীজ',
    defaultUnit: 'শতক',
    ureaPerDec: 1.00,
    tspPerDec: 0.70,
    mopPerDec: 0.40,
    gypsumPerDec: 0.75, // High sulfur for oil synthesis
    zincPerDecGrams: 30,
    boronPerDecGrams: 40,
    cowdungPerDecKg: 10,
    stages: {
      basal: 'জমি তৈরির সময় মোট ইউরিয়ার অর্ধেক এবং সমস্ত টিএসপি, পটাশ, জিপসাম, জিংক ও বোরন মাটির সাথে মিশিয়ে দিন।',
      stage1: 'বীজ গজানোর ২৫-৩০ দিন পর (ফুল আসার আগে) হালকা সেচের পর বাকি অর্ধেক ইউরিয়া উপরিপ্রয়োগ করুন।'
    },
    tipsBn: [
      'সরিষার দানায় তেলের পরিমাণ বাড়াতে জিপসাম (গন্ধক/সালফার) অত্যন্ত গুরুত্বপূর্ণ উপাদান।'
    ]
  },
  'betel-leaf': {
    id: 'betel-leaf',
    nameBn: 'বাঁশখালী মিষ্টি পান (পান বরজ)',
    categoryBn: 'অর্থকরী ফসল',
    defaultUnit: 'শতক',
    ureaPerDec: 0.80,
    tspPerDec: 0.60,
    mopPerDec: 0.50,
    gypsumPerDec: 0.30,
    zincPerDecGrams: 25,
    boronPerDecGrams: 20,
    cowdungPerDecKg: 20,
    mustardOilCakePerDecKg: 3.5, // Sarisha khoil
    stages: {
      basal: 'বরজের ড্রেন ও বেড তৈরিতে পচা গোবর, সরিষার খৈল ও টিএসপি মাটির সাথে মিশিয়ে পচিয়ে নিতে হবে।',
      stage1: 'লতা বৃদ্ধির মৌসুমে প্রতি ২০-২৫ দিন অন্তর সরিষার খৈল পচা পানি এবং সামান্য ইউরিয়া ও পটাশ সার হিসেবে প্রয়োগ করতে হয়।'
    },
    tipsBn: [
      'পানে রাসায়নিক ইউরিয়া অতিরিক্ত দিলে লতাপচা রোগ বেড়ে যায়, তাই সরিষার খৈল ও জৈব সারই প্রধান উৎস।'
    ]
  }
};

export const FertilizerCalculatorModal: React.FC<FertilizerCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialCropName,
  initialAreaDecimel = 20
}) => {
  const [selectedCropKey, setSelectedCropKey] = useState<string>('rice-aman');
  const [varietyType, setVarietyType] = useState<'HYBRID' | 'HYV' | 'LOCAL'>('HYV');
  const [landArea, setLandArea] = useState<number>(initialAreaDecimel || 20);
  const [landUnit, setLandUnit] = useState<'DECIMAL' | 'BIGHA' | 'KANI' | 'ACRE'>('DECIMAL');
  const [useOrganicManure, setUseOrganicManure] = useState<boolean>(true);
  const [useDapInsteadOfTsp, setUseDapInsteadOfTsp] = useState<boolean>(false);

  if (!isOpen) return null;

  // Convert any selected land unit to decimals (শতক)
  const getDecimals = (): number => {
    const area = Number(landArea) || 0;
    switch (landUnit) {
      case 'BIGHA': return area * 33;       // ১ বিঘা = ৩৩ শতক
      case 'KANI': return area * 40;        // ১ কানি (চট্টগ্রাম/বাঁশখালী) = ৪০ শতক
      case 'ACRE': return area * 100;       // ১ একর = ১০০ শতক
      case 'DECIMAL':
      default: return area;
    }
  };

  const currentCrop = CROP_DATABASE[selectedCropKey] || CROP_DATABASE['rice-aman'];
  const totalDecimals = Math.max(0.1, getDecimals());

  // Variety multiplier
  const varietyMultiplier = varietyType === 'HYBRID' ? 1.15 : (varietyType === 'LOCAL' ? 0.80 : 1.0);
  // Organic manure savings discount
  const organicDiscount = useOrganicManure ? 0.88 : 1.0; // 12% chemical saving

  // Calculations
  let totalUrea = currentCrop.ureaPerDec * totalDecimals * varietyMultiplier * organicDiscount;
  let totalTsp = currentCrop.tspPerDec * totalDecimals * varietyMultiplier;
  let totalMop = currentCrop.mopPerDec * totalDecimals * varietyMultiplier;
  let totalGypsum = currentCrop.gypsumPerDec * totalDecimals * varietyMultiplier;
  let totalZincGrams = currentCrop.zincPerDecGrams * totalDecimals * varietyMultiplier;
  let totalBoronGrams = currentCrop.boronPerDecGrams * totalDecimals * varietyMultiplier;
  let totalCowdungKg = currentCrop.cowdungPerDecKg * totalDecimals;
  let totalMustardCakeKg = currentCrop.mustardOilCakePerDecKg ? currentCrop.mustardOilCakePerDecKg * totalDecimals : 0;

  // DAP adjustment if selected:
  // DAP has 18% N and 46% P2O5 (similar to TSP's 46% P2O5). Replacing 1kg TSP with 1kg DAP saves ~0.39kg Urea
  let totalDap = 0;
  if (useDapInsteadOfTsp) {
    totalDap = totalTsp;
    totalUrea = Math.max(0, totalUrea - (totalDap * 0.38));
  }

  const formatKg = (val: number) => {
    if (val <= 0) return '০';
    if (val < 1) return `${Math.round(val * 1000)} গ্রাম`;
    return `${val.toFixed(1).replace(/\.0$/, '')} কেজি`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full rounded-3xl p-5 sm:p-7 border border-stone-200 shadow-2xl space-y-5 my-6 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold shadow-2xs shrink-0">
              🧮
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  ডিজিটাল সার ও জৈব পুষ্টি ক্যালকুলেটর
                </h2>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  BARC ও DAE নির্দেশিকা
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                জমির সঠিক পরিমাপে ইউরিয়া, টিএসপি, পটাশ, জিপসাম, দস্তা ও বোরনের বৈজ্ঞানিক মাত্রা এবং কিস্তির ভাগ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Input Parameters Form Controls */}
        <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Crop Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">১. ফসল নির্বাচন করুন:</label>
              <select
                value={selectedCropKey}
                onChange={(e) => setSelectedCropKey(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-800 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                {Object.values(CROP_DATABASE).map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.nameBn} ({crop.categoryBn})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Variety Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">২. জাতের ধরন:</label>
              <select
                value={varietyType}
                onChange={(e) => setVarietyType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              >
                <option value="HYV">উফশী / উন্নত জাত (স্ট্যান্ডার্ড)</option>
                <option value="HYBRID">হাইব্রিড জাত (+১৫% সার প্রয়োজন)</option>
                <option value="LOCAL">দেশি / স্থানীয় জাত (-২০% সার)</option>
              </select>
            </div>

            {/* 3. Land Area & Unit */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">৩. জমির পরিমাণ ও একক:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                  className="w-1/2 p-2.5 rounded-xl border border-stone-300 text-xs font-black text-stone-900 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value as any)}
                  className="w-1/2 p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-800 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  <option value="DECIMAL">শতক / ডেসিমাল</option>
                  <option value="BIGHA">বিঘা (৩৩ শতক)</option>
                  <option value="KANI">কানি (৪০ শতক)</option>
                  <option value="ACRE">একর (১০০ শতক)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Options: Organic Manure & DAP Switch */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/80 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700 select-none">
              <input
                type="checkbox"
                checked={useOrganicManure}
                onChange={(e) => setUseOrganicManure(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>🌱 জমিতে পচা গোবর / কম্পোস্ট ব্যবহার করব (রাসায়নিক সার ১২% সাশ্রয়)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-700 select-none">
              <input
                type="checkbox"
                checked={useDapInsteadOfTsp}
                onChange={(e) => setUseDapInsteadOfTsp(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
              />
              <span>টিএসপি এর পরিবর্তে ডিএপি (DAP) সার ব্যবহার করব</span>
            </label>
          </div>
        </div>

        {/* Calculated Results Summary Cards */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>আপনার {landArea} {landUnit === 'BIGHA' ? 'বিঘা' : (landUnit === 'KANI' ? 'কানি' : (landUnit === 'ACRE' ? 'একর' : 'শতক'))} ({totalDecimals.toFixed(1)} শতক) জমির জন্য প্রয়োজনীয় সারের মোট পরিমাণ:</span>
            </h3>
            <button
              onClick={handlePrint}
              className="text-[11px] font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg border border-stone-200 cursor-pointer no-print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>রসিদ প্রিন্ট করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Urea */}
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">নাইট্রোজেন (N)</span>
                <div className="font-black text-stone-900 text-base sm:text-lg mt-1">{formatKg(totalUrea)}</div>
              </div>
              <div className="text-[11px] font-bold text-stone-600 mt-1">ইউরিয়া সার (Urea)</div>
            </div>

            {/* TSP or DAP */}
            <div className="bg-teal-50 border border-teal-200 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 px-2 py-0.5 rounded-md">ফসফরাস (P)</span>
                <div className="font-black text-stone-900 text-base sm:text-lg mt-1">
                  {useDapInsteadOfTsp ? formatKg(totalDap) : formatKg(totalTsp)}
                </div>
              </div>
              <div className="text-[11px] font-bold text-stone-600 mt-1">
                {useDapInsteadOfTsp ? 'ডিএপি সার (DAP)' : 'টিএসপি সার (TSP)'}
              </div>
            </div>

            {/* MOP / Potash */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">পটাশিয়াম (K)</span>
                <div className="font-black text-stone-900 text-base sm:text-lg mt-1">{formatKg(totalMop)}</div>
              </div>
              <div className="text-[11px] font-bold text-stone-600 mt-1">এমওপি / পটাশ (MOP)</div>
            </div>

            {/* Gypsum */}
            <div className="bg-stone-100 border border-stone-200 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded-md">গন্ধক / সালফার (S)</span>
                <div className="font-black text-stone-900 text-base sm:text-lg mt-1">{formatKg(totalGypsum)}</div>
              </div>
              <div className="text-[11px] font-bold text-stone-600 mt-1">জিপসাম সার</div>
            </div>

            {/* Zinc Sulphate */}
            {totalZincGrams > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded-md">দস্তা (Zn)</span>
                  <div className="font-black text-stone-900 text-base sm:text-lg mt-1">
                    {totalZincGrams >= 1000 ? `${(totalZincGrams / 1000).toFixed(2)} কেজি` : `${Math.round(totalZincGrams)} গ্রাম`}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-stone-600 mt-1">জিংক সালফেট (৩৬%)</div>
              </div>
            )}

            {/* Boron */}
            {totalBoronGrams > 0 && (
              <div className="bg-purple-50 border border-purple-200 p-3 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-md">বোরন (B)</span>
                  <div className="font-black text-stone-900 text-base sm:text-lg mt-1">
                    {totalBoronGrams >= 1000 ? `${(totalBoronGrams / 1000).toFixed(2)} কেজি` : `${Math.round(totalBoronGrams)} গ্রাম`}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-stone-600 mt-1">বোরিক এসিড / সলোবর</div>
              </div>
            )}

            {/* Organic Manure / Cowdung */}
            <div className="bg-lime-50 border border-lime-200 p-3 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-lime-800 bg-lime-100/80 px-2 py-0.5 rounded-md">জৈব পুষ্টি</span>
                <div className="font-black text-stone-900 text-base sm:text-lg mt-1">
                  {totalCowdungKg >= 40 ? `${(totalCowdungKg / 40).toFixed(1)} মণ` : `${Math.round(totalCowdungKg)} কেজি`}
                </div>
              </div>
              <div className="text-[11px] font-bold text-stone-600 mt-1">পচা গোবর / কম্পোস্ট</div>
            </div>

            {/* Mustard Oil Cake (For Betel Leaf) */}
            {totalMustardCakeKg > 0 && (
              <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-800 bg-orange-100/80 px-2 py-0.5 rounded-md">খৈল সার</span>
                  <div className="font-black text-stone-900 text-base sm:text-lg mt-1">
                    {formatKg(totalMustardCakeKg)}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-stone-600 mt-1">সরিষার খৈল (বরজের জন্য)</div>
              </div>
            )}
          </div>
        </div>

        {/* Application Schedule & Split Doses (প্রয়োগের সময়সূচি ও কিস্তি) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2.5">
            <Layers className="w-4 h-4 text-emerald-800" />
            <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm">
              কোন সার কখন কীভাবে প্রয়োগ করবেন? (ধাপভিত্তিক কিস্তির নিয়ম)
            </h4>
          </div>

          <div className="space-y-2.5 text-xs text-stone-700">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5">
              <span className="font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md shrink-0">ধাপ ১</span>
              <div>
                <span className="font-bold text-amber-950 block">জমি তৈরির শেষ চাষে (বেসাল ডোজ):</span>
                <p className="mt-0.5 leading-relaxed">{currentCrop.stages.basal}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
              <span className="font-black text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-md shrink-0">ধাপ ২</span>
              <div>
                <span className="font-bold text-emerald-950 block">১ম কিস্তি উপরিপ্রয়োগ:</span>
                <p className="mt-0.5 leading-relaxed">{currentCrop.stages.stage1}</p>
              </div>
            </div>

            {currentCrop.stages.stage2 && (
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 flex items-start gap-2.5">
                <span className="font-black text-teal-900 bg-teal-200 px-2 py-0.5 rounded-md shrink-0">ধাপ ৩</span>
                <div>
                  <span className="font-bold text-teal-950 block">২য় কিস্তি উপরিপ্রয়োগ:</span>
                  <p className="mt-0.5 leading-relaxed">{currentCrop.stages.stage2}</p>
                </div>
              </div>
            )}

            {currentCrop.stages.stage3 && (
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-2.5">
                <span className="font-black text-blue-900 bg-blue-200 px-2 py-0.5 rounded-md shrink-0">ধাপ ৪</span>
                <div>
                  <span className="font-bold text-blue-950 block">৩য় কিস্তি উপরিপ্রয়োগ:</span>
                  <p className="mt-0.5 leading-relaxed">{currentCrop.stages.stage3}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scientific Agronomic Tips */}
        {currentCrop.tipsBn.length > 0 && (
          <div className="bg-teal-50/60 border border-teal-200 p-3.5 rounded-2xl text-xs space-y-1">
            <div className="font-bold text-teal-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>কৃষি কর্মকর্তার বিশেষ সতর্কতা ও পরামর্শ:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-700">
              {currentCrop.tipsBn.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <span className="text-[11px] text-stone-400">
            * মাটি পরীক্ষা প্রতিবেদন (STW) থাকলে সে অনুযায়ী সামান্য সমন্বয় করা যেতে পারে।
          </span>
          <button
            onClick={onClose}
            className="bg-stone-900 hover:bg-stone-800 text-white font-extrabold px-6 py-2.5 rounded-xl cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
