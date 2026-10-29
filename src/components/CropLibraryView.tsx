import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ShieldCheck, ChevronRight, Info, AlertTriangle, MapPin, Sparkles, Filter, Calculator } from 'lucide-react';
import { Crop, Disease, Division, District, Upazila, Union } from '../types';
import { FertilizerCalculatorModal } from './FertilizerCalculatorModal';
import { 
  ALL_DIVISIONS, 
  ALL_DISTRICTS, 
  getUpazilasForDistrict, 
  getUnionsForUpazila, 
  getRegionalCropAdvice 
} from '../data/bangladeshGeo';

const DEFAULT_CROPS: Crop[] = [
  {
    id: 'crop-rice',
    nameBn: 'ধান',
    nameEn: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'Cereal',
    icon: '🌾',
    stages: ['চারা অবস্থা (Seedling)', 'কুশি অবস্থা (Tillering)', 'কাইচ থোড় / ফুল ফোটা (Panicle / Flowering)', 'দানা গঠন ও পাকা (Grain filling / Maturity)']
  },
  {
    id: 'crop-potato',
    nameBn: 'আলু',
    nameEn: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Vegetable',
    icon: '🥔',
    stages: ['অঙ্কুরোদগম (Sprouting)', 'উদ্ভিজ্জ বৃদ্ধি (Vegetative)', 'কন্দ গঠন (Tuber initiation)', 'কন্দ বৃদ্ধি ও পরিপক্বতা (Tuber bulking / Maturity)']
  },
  {
    id: 'crop-tomato',
    nameBn: 'টমেটো',
    nameEn: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable',
    icon: '🍅',
    stages: ['চারা রোপণ (Transplanting)', 'শাখা বিস্তার (Vegetative)', 'ফুল ধরা (Flowering)', 'ফল ধরা ও পাকা (Fruit development / Ripening)']
  },
  {
    id: 'crop-eggplant',
    nameBn: 'বেগুন',
    nameEn: 'Eggplant / Brinjal',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    icon: '🍆',
    stages: ['চারা অবস্থা (Seedling)', 'ফুল ফোটা (Flowering)', 'ফল তোলা (Harvesting)']
  },
  {
    id: 'crop-chili',
    nameBn: 'মরিচ',
    nameEn: 'Chili Pepper',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    icon: '🌶️',
    stages: ['প্রাথমিক বৃদ্ধি (Early vegetative)', 'ফুল ও কুঁড়ি (Budding / Flowering)', 'ফল পরিপক্বতা (Fruiting)']
  },
  {
    id: 'crop-mango',
    nameBn: 'আম',
    nameEn: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'Fruit',
    icon: '🥭',
    stages: ['মুকুল আসার পূর্বাবস্থা', 'মুকুল প্রস্ফুটন ও ফুল ফোটা', 'গুটি গঠন (মটর দানা আকার)', 'ফল পুষ্ট ও পরিপক্ব হওয়া']
  }
];

export const CropLibraryView: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>(DEFAULT_CROPS);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(DEFAULT_CROPS[0]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFertilizerModal, setShowFertilizerModal] = useState<boolean>(false);

  // 4-Tier Area Filter - pre-populated with synchronous client dataset
  const [divisions, setDivisions] = useState<Division[]>(ALL_DIVISIONS);
  const initialDistricts = ALL_DISTRICTS.filter(d => d.divisionId === 'div-dhaka');
  const [districts, setDistricts] = useState<District[]>(initialDistricts);
  const initialUpazilas = getUpazilasForDistrict('dist-gazipur');
  const [upazilas, setUpazilas] = useState<Upazila[]>(initialUpazilas);
  const initialUnions = getUnionsForUpazila(initialUpazilas[0]?.id || 'upz-gazipur-sadar', 'dist-gazipur');
  const [unions, setUnions] = useState<Union[]>(initialUnions);

  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('div-dhaka');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dist-gazipur');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState<string>(initialUpazilas[0]?.nameBn || '');
  const [selectedUnionName, setSelectedUnionName] = useState<string>(initialUnions[0]?.nameBn || '');

  const [regionalAdvice, setRegionalAdvice] = useState<any>(
    getRegionalCropAdvice('dist-gazipur', initialUpazilas[0]?.nameBn, initialUnions[0]?.nameBn)
  );

  useEffect(() => {
    fetch('/api/crops')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCrops(data);
          setSelectedCrop(data[0]);
          loadDiseases(data[0].id);
        }
      })
      .catch(() => {
        // Keep fallback DEFAULT_CROPS
        loadDiseases(DEFAULT_CROPS[0].id);
      });

    loadDiseases(DEFAULT_CROPS[0].id);
  }, []);

  const handleDivisionChange = (divId: string) => {
    setSelectedDivisionId(divId);
    const filteredDistricts = ALL_DISTRICTS.filter(d => d.divisionId === divId);
    setDistricts(filteredDistricts);
    const newDist = filteredDistricts[0];
    if (newDist) {
      setSelectedDistrictId(newDist.id);
      const newUpz = getUpazilasForDistrict(newDist.id);
      setUpazilas(newUpz);
      const firstUpz = newUpz[0];
      if (firstUpz) {
        setSelectedUpazilaName(firstUpz.nameBn);
        const newUni = getUnionsForUpazila(firstUpz.id, newDist.id);
        setUnions(newUni);
        const firstUni = newUni[0]?.nameBn || '';
        setSelectedUnionName(firstUni);
        setRegionalAdvice(getRegionalCropAdvice(newDist.id, firstUpz.nameBn, firstUni));
      } else {
        setSelectedUpazilaName('');
        setUnions([]);
        setSelectedUnionName('');
        setRegionalAdvice(getRegionalCropAdvice(newDist.id));
      }
    }
  };

  const handleDistrictChange = (distId: string) => {
    setSelectedDistrictId(distId);
    const newUpz = getUpazilasForDistrict(distId);
    setUpazilas(newUpz);
    const firstUpz = newUpz[0];
    if (firstUpz) {
      setSelectedUpazilaName(firstUpz.nameBn);
      const newUni = getUnionsForUpazila(firstUpz.id, distId);
      setUnions(newUni);
      const firstUni = newUni[0]?.nameBn || '';
      setSelectedUnionName(firstUni);
      setRegionalAdvice(getRegionalCropAdvice(distId, firstUpz.nameBn, firstUni));
    } else {
      setSelectedUpazilaName('');
      setUnions([]);
      setSelectedUnionName('');
      setRegionalAdvice(getRegionalCropAdvice(distId));
    }
  };

  const handleUpazilaChange = (upzName: string) => {
    setSelectedUpazilaName(upzName);
    const upz = upazilas.find(u => u.nameBn === upzName);
    if (upz) {
      const newUni = getUnionsForUpazila(upz.id, selectedDistrictId);
      setUnions(newUni);
      const firstUni = newUni[0]?.nameBn || '';
      setSelectedUnionName(firstUni);
      setRegionalAdvice(getRegionalCropAdvice(selectedDistrictId, upzName, firstUni));
    } else {
      setUnions([]);
      setSelectedUnionName('');
      setRegionalAdvice(getRegionalCropAdvice(selectedDistrictId, upzName, ''));
    }
  };

  const handleUnionChange = (uniName: string) => {
    setSelectedUnionName(uniName);
    setRegionalAdvice(getRegionalCropAdvice(selectedDistrictId, selectedUpazilaName, uniName));
  };

  const loadDiseases = (cropId: string) => {
    fetch(`/api/diseases?cropId=${cropId}`)
      .then(res => res.json())
      .then(data => {
        setDiseases(data);
        setSelectedDisease(data.length > 0 ? data[0] : null);
      })
      .catch(console.error);
  };

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    loadDiseases(crop.id);
  };

  const filteredCrops = crops.filter(c => 
    c.nameBn.includes(searchQuery) || 
    c.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-emerald-500/40 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>জাতীয় কৃষি তথ্যকোষ, শস্য ক্যালেন্ডার ও ৬৪ জেলার অঞ্চলভিত্তিক পরামর্শ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ফসল পরিচিতি ও এলাকাভিত্তিক বালাই নির্দেশিকা
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
          বাংলাদেশের বিভিন্ন কৃষি পরিবেশ অঞ্চলের (AEZ) প্রধান প্রধান ফসল, বৃদ্ধির পর্যায়, ক্ষতিকর রোগবালাই ও পরিবেশবান্ধব বিজ্ঞানসম্মত দমন পদ্ধতি।
        </p>

        {/* Search Bar */}
        <div className="mt-5 max-w-lg">
          <div className="bg-white rounded-2xl p-1.5 flex items-center gap-2 shadow-lg">
            <Search className="w-4 h-4 text-stone-400 ml-2 shrink-0" />
            <input
              type="text"
              placeholder="ফসলের নাম দিয়ে খুঁজুন (ধান, টমেটো, আলু, আম, বেগুন)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-stone-900 font-medium focus:outline-hidden"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-xs text-stone-400 hover:text-stone-700 mr-2">
                মুছুন
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4-Tier Area Filter (Division -> District -> Upazila -> Union) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>অঞ্চলভিত্তিক ফসল ও বালাই পরামর্শ দেখতে এলাকা নির্বাচন করুন (৬৪ জেলা ও সকল ইউনিয়ন):</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* 1. Division */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">১. বিভাগ:</label>
            <select
              value={selectedDivisionId}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            >
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>{d.nameBn} ({d.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 2. District */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">২. জেলা (৬৪ জেলা):</label>
            <select
              value={selectedDistrictId}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            >
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>{dist.nameBn} ({dist.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 3. Upazila */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">৩. উপজেলা:</label>
            <select
              value={selectedUpazilaName}
              onChange={(e) => handleUpazilaChange(e.target.value)}
              disabled={upazilas.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 bg-stone-50"
            >
              <option value="">{upazilas.length > 0 ? 'উপজেলা নির্বাচন করুন' : 'আগে জেলা নির্বাচন করুন'}</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.nameBn}>{u.nameBn} ({u.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 4. Union */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">৪. ইউনিয়ন / ব্লক:</label>
            <select
              value={selectedUnionName}
              onChange={(e) => handleUnionChange(e.target.value)}
              disabled={unions.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 bg-stone-50"
            >
              <option value="">{unions.length > 0 ? 'সব ইউনিয়ন' : 'আগে উপজেলা নির্বাচন করুন'}</option>
              {unions.map((uni) => (
                <option key={uni.id} value={uni.nameBn}>{uni.nameBn}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Regional Guidance Banner */}
        {regionalAdvice && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-emerald-200/60 pb-2">
              <span className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>{regionalAdvice.aezNameBn || 'কৃষি পরিবেশ অঞ্চল'} — শস্য ও বালাই পরামর্শ</span>
              </span>
              <span className="text-[11px] text-emerald-800 font-bold bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                {selectedUnionName ? `${selectedUnionName} ইউনিয়ন | ` : ''} 
                {selectedUpazilaName ? `${selectedUpazilaName} | ` : ''} 
                {districts.find(d => d.id === selectedDistrictId)?.nameBn} জেলা
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-stone-700">
              <div>
                <span className="font-bold text-stone-900 block mb-1">উপযোগী প্রধান প্রধান ফসল:</span>
                <div className="flex flex-wrap gap-1.5">
                  {regionalAdvice.topCropsBn?.map((cName: string, idx: number) => (
                    <span key={idx} className="bg-emerald-100/80 text-emerald-900 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                      {cName}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-bold text-stone-900 block mb-1">মৃত্তিকা ও আবহাওয়া সতর্কতা:</span>
                <p className="text-stone-600 leading-relaxed font-medium">
                  {regionalAdvice.specialNoteBn}
                </p>
              </div>
            </div>

            {regionalAdvice.seasonalAlertBn && (
              <div className="pt-1 text-emerald-900 font-bold border-t border-emerald-200/50 flex items-center gap-1">
                <span>⚠️ চলতি মৌসুমের নির্দেশনা:</span>
                <span className="font-normal text-stone-800">{regionalAdvice.seasonalAlertBn}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Layout: Crops Grid & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Crops List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <span>ফসল নির্বাচন করুন ({filteredCrops.length})</span>
          </h2>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => {
              const isSelected = selectedCrop?.id === crop.id;
              return (
                <div
                  key={crop.id}
                  onClick={() => handleSelectCrop(crop)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500'
                      : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm leading-tight">{crop.nameBn}</h4>
                      <p className="text-[11px] text-stone-500 italic mt-0.5">{crop.scientificName}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-stone-300'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Crop Details & Disease Management */}
        <div className="lg:col-span-2 space-y-4">
          {selectedCrop ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
              {/* Crop Header */}
              <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl shrink-0">
                    {selectedCrop.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {selectedCrop.category}
                    </span>
                    <h2 className="text-xl font-extrabold text-stone-900 mt-1">
                      {selectedCrop.nameBn} <span className="text-sm font-normal text-stone-500">({selectedCrop.nameEn})</span>
                    </h2>
                    <p className="text-xs text-stone-500 italic">বৈজ্ঞানিক নাম: {selectedCrop.scientificName}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowFertilizerModal(true)}
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>🧮 এই ফসলের সার ক্যালকুলেটর</span>
                </button>
              </div>

              {/* Crop Growth Stages */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  ফসলের বৃদ্ধির পর্যায়সমূহ (Growth Stages):
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedCrop.stages.map((stage, idx) => (
                    <div key={idx} className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-center">
                      <span className="block text-[10px] font-bold text-emerald-800 mb-1">পর্যায় {idx + 1}</span>
                      <span className="text-xs font-semibold text-stone-800">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Diseases for this Crop */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>প্রধান প্রধান রোগবালাই ও বালাই দমন নির্দেশিকা ({diseases.length}টি)</span>
                  </h3>
                  <span className="text-xs text-stone-500">ডিএই ও বারি স্বীকৃত</span>
                </div>

                {diseases.length === 0 ? (
                  <div className="bg-stone-50 p-6 rounded-2xl text-center text-xs text-stone-500">
                    এই ফসলের জন্য কোনো রোগের তথ্য পাওয়া যায়নি।
                  </div>
                ) : (
                  <div className="space-y-3">
                    {diseases.map((dis) => (
                      <div 
                        key={dis.id} 
                        className="bg-stone-50/70 border border-stone-200 p-4 rounded-2xl space-y-3 hover:border-emerald-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              {dis.type}
                            </span>
                            <h4 className="font-extrabold text-stone-900 text-sm mt-1">
                              {dis.nameBn} <span className="text-xs font-normal text-stone-500">({dis.nameEn})</span>
                            </h4>
                          </div>
                        </div>

                        {/* Symptoms */}
                        <div className="text-xs space-y-1">
                          <span className="font-bold text-stone-700 block text-[11px]">লক্ষণসমূহ (Symptoms):</span>
                          <ul className="list-disc list-inside space-y-0.5 text-stone-600 font-medium pl-1">
                            {(dis.symptomsBn || []).map((sym: string, i: number) => (
                              <li key={i}>{sym}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Non-Chemical First */}
                        <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl text-xs space-y-1">
                          <span className="font-bold text-emerald-950 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                            <span>রাসায়নিকমুক্ত প্রাথমিক পরিচর্যা (Cultural & Non-Chemical):</span>
                          </span>
                          <ul className="list-disc list-inside text-stone-700 space-y-0.5 pl-1">
                            {(dis.nonChemicalManagementBn || []).map((cp: string, i: number) => (
                              <li key={i}>{cp}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Brand Neutral Chemical Guidance */}
                        {dis.activeIngredientId && (
                          <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl text-xs space-y-1">
                            <span className="font-bold text-amber-950 flex items-center gap-1">
                              <Info className="w-3.5 h-3.5 text-amber-700" />
                              <span>অনুমোদিত সক্রিয় উপাদান (Brand-Neutral Active Ingredient):</span>
                            </span>
                            <p className="text-stone-700 leading-relaxed font-medium">
                              দোকান থেকে কোনো নির্দিষ্ট ব্র্যান্ডের ওষুধ কেনার প্রয়োজন নেই। প্যাকেটের গায়ে লেখা অনুমোদিত <strong>সক্রিয় উপাদান</strong> এবং সঠিক মাত্রা লক্ষ্য করুন। প্রয়োজনে উপজেলা কৃষি অফিসে বা কল সেন্টারে ১৬১২৩ নম্বরে পরামর্শ নিন।
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-400 text-sm">
              বাম পাশের তালিকা থেকে যেকোনো একটি ফসল নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>

      {/* Scientific Fertilizer Calculator Modal */}
      <FertilizerCalculatorModal
        isOpen={showFertilizerModal}
        onClose={() => setShowFertilizerModal(false)}
        initialCropName={selectedCrop?.nameBn}
      />
    </div>
  );
};
