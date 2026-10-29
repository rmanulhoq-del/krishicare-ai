import React, { useState, useEffect } from 'react';
import { 
  CloudSun, Droplets, Wind, Thermometer, CloudRain, 
  TrendingUp, TrendingDown, Minus, Building, AlertTriangle, 
  MapPin, Filter, Sparkles, Bell, CheckCircle2, ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { MarketPrice, GovernmentUpdate, Division, District, Upazila, Union } from '../types';
import { 
  ALL_DIVISIONS, 
  ALL_DISTRICTS, 
  getUpazilasForDistrict, 
  getUnionsForUpazila, 
  generateRegionalWeather 
} from '../data/bangladeshGeo';

interface MarketWeatherViewProps {
  onNavigateToMarketplace?: () => void;
}

export const MarketWeatherView: React.FC<MarketWeatherViewProps> = ({
  onNavigateToMarketplace
}) => {
  // Pre-populate divisions, districts, upazilas, unions from verified dataset for instant rendering
  const [divisions, setDivisions] = useState<Division[]>(ALL_DIVISIONS);
  const [selectedDivision, setSelectedDivision] = useState<string>('div-dhaka');
  
  const [districts, setDistricts] = useState<District[]>(() => 
    ALL_DISTRICTS.filter(d => d.divisionId === 'div-dhaka')
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>('dist-gazipur');

  const [upazilas, setUpazilas] = useState<Upazila[]>(() => 
    getUpazilasForDistrict('dist-gazipur', 'গাজীপুর')
  );
  const [selectedUpazila, setSelectedUpazila] = useState<string>('শ্রীপুর');

  const [unions, setUnions] = useState<Union[]>(() => 
    getUnionsForUpazila('upz-dist-gazipur-sreepur', 'শ্রীপুর', 'dist-gazipur')
  );
  const [selectedUnion, setSelectedUnion] = useState<string>('মাওনা');

  const [weatherData, setWeatherData] = useState<any>(() => 
    generateRegionalWeather('dist-gazipur', 'শ্রীপুর', 'মাওনা')
  );
  const [govtUpdates, setGovtUpdates] = useState<GovernmentUpdate[]>([
    { 
      id: 'gu-1', 
      titleBn: 'উপকূলীয় ও হাওর এলাকায় আধুনিক কৃষি যন্ত্রপাতিতে ৭০% সরকারি ভর্তুকির আবেদন শুরু', 
      departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)', 
      dateBn: '১৫ মার্চ ২০২৬', 
      isImportant: true, 
      summaryBn: 'কৃষক ভাইদের কম্বাইন হারভেস্টার ও পাওয়ার টিলার পেতে উপজেলা কৃষি অফিসে যোগাযোগ করার আহ্বান।' 
    },
    { 
      id: 'gu-2', 
      titleBn: 'বোরো মৌসুমে ধানের ব্লাস্ট ও মাজরা পোকা প্রতিরোধে কৃষি সম্প্রসারণ অধিদপ্তরের জরুরি সতর্কতা', 
      departmentBn: 'উদ্ভিদ সংরক্ষণ উইং', 
      dateBn: '১৪ মার্চ ২০২৬', 
      isImportant: true, 
      summaryBn: 'আক্রান্ত জমিতে ট্রাইসাইক্লাজোল ও সঠিক অনুমোদিত বালাইনাশক স্প্রে করার পরামর্শ।' 
    },
    { 
      id: 'gu-3', 
      titleBn: 'কৃষি হেল্পলাইন ১৬১২৩ সার্বক্ষণিক কৃষকদের বিনামূল্যে সেবা দিচ্ছে', 
      departmentBn: 'কৃষি তথ্য সার্ভিস (AIS)', 
      dateBn: '১০ মার্চ ২০২৬', 
      isImportant: false, 
      summaryBn: 'যেকোনো কৃষি সমস্যায় সরাসরি বিসিএস কৃষি ক্যাডারের কর্মকর্তাদের সাথে কথা বলুন।' 
    }
  ]);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);

  // Load backend data if available, with resilient fallback
  useEffect(() => {
    // Divisions from API (if online/fullstack)
    fetch('/api/geo/divisions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setDivisions(data);
      })
      .catch(() => {});

    // Government updates
    fetch('/api/government-updates')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setGovtUpdates(data);
      })
      .catch(() => {});
  }, []);

  // Synchronous, Instant Cascade When Division Changes
  const handleDivisionChange = (divId: string) => {
    setSelectedDivision(divId);
    
    // 1. Get districts for selected division
    const nextDistricts = ALL_DISTRICTS.filter(d => d.divisionId === divId);
    setDistricts(nextDistricts);

    const firstDist = nextDistricts[0] || ALL_DISTRICTS[0];
    if (firstDist) {
      setSelectedDistrict(firstDist.id);

      // 2. Get upazilas for first district
      const nextUpazilas = getUpazilasForDistrict(firstDist.id, firstDist.nameBn);
      setUpazilas(nextUpazilas);

      const firstUpz = nextUpazilas[0];
      if (firstUpz) {
        setSelectedUpazila(firstUpz.nameBn);

        // 3. Get unions for first upazila
        const nextUnions = getUnionsForUpazila(firstUpz.id, firstUpz.nameBn, firstDist.id);
        setUnions(nextUnions);

        const firstUni = nextUnions[0];
        if (firstUni) {
          setSelectedUnion(firstUni.nameBn);
          fetchAreaWeather(firstDist.id, firstUpz.nameBn, firstUni.nameBn);
        }
      }
    }
  };

  // Synchronous, Instant Cascade When District Changes
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrict(distId);
    const distObj = ALL_DISTRICTS.find(d => d.id === distId);

    // 1. Get upazilas for district
    const nextUpazilas = getUpazilasForDistrict(distId, distObj?.nameBn);
    setUpazilas(nextUpazilas);

    const firstUpz = nextUpazilas[0];
    if (firstUpz) {
      setSelectedUpazila(firstUpz.nameBn);

      // 2. Get unions for upazila
      const nextUnions = getUnionsForUpazila(firstUpz.id, firstUpz.nameBn, distId);
      setUnions(nextUnions);

      const firstUni = nextUnions[0];
      if (firstUni) {
        setSelectedUnion(firstUni.nameBn);
        fetchAreaWeather(distId, firstUpz.nameBn, firstUni.nameBn);
      }
    } else {
      setSelectedUpazila('');
      setUnions([]);
      setSelectedUnion('');
    }
  };

  // Synchronous, Instant Cascade When Upazila Changes
  const handleUpazilaChange = (upzName: string) => {
    setSelectedUpazila(upzName);
    const upzObj = upazilas.find(u => u.nameBn === upzName);
    const upzId = upzObj ? upzObj.id : '';

    // 1. Get unions for upazila
    const nextUnions = getUnionsForUpazila(upzId, upzName, selectedDistrict);
    setUnions(nextUnions);

    const firstUni = nextUnions[0];
    if (firstUni) {
      setSelectedUnion(firstUni.nameBn);
      fetchAreaWeather(selectedDistrict, upzName, firstUni.nameBn);
    } else {
      setSelectedUnion('');
      fetchAreaWeather(selectedDistrict, upzName, '');
    }
  };

  // Synchronous, Instant Cascade When Union Changes
  const handleUnionChange = (uniName: string) => {
    setSelectedUnion(uniName);
    fetchAreaWeather(selectedDistrict, selectedUpazila, uniName);
  };

  // Weather fetch with instant synthetic fallback
  const fetchAreaWeather = (distId: string, upzName?: string, uniName?: string) => {
    setLoadingWeather(true);
    let url = `/api/weather/current?districtId=${distId}`;
    if (upzName) url += `&upazilaName=${encodeURIComponent(upzName)}`;
    if (uniName) url += `&unionName=${encodeURIComponent(uniName)}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Weather API error');
        return res.json();
      })
      .then(data => {
        if (data && data.temperature) {
          setWeatherData(data);
        } else {
          setWeatherData(generateRegionalWeather(distId, upzName, uniName));
        }
        setLoadingWeather(false);
      })
      .catch(() => {
        // Instant offline / static fallback
        setWeatherData(generateRegionalWeather(distId, upzName, uniName));
        setLoadingWeather(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-emerald-500/40 mb-2">
          <CloudSun className="w-4 h-4" />
          <span>সারাদেশের ৬৪ জেলা, প্রায় ৫০০ উপজেলা ও ইউনিয়ন ভিত্তিক মাইক্রো-ক্লাইমেট আবহাওয়া</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          ইউনিয়ন ভিত্তিক কৃষি আবহাওয়া ও স্প্রে উপযোগিতা
        </h1>
        <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl">
          আপনার বিভাগ, জেলা, উপজেলা এবং ইউনিয়ন নির্বাচন করে স্থানীয় তাপমাত্রা, আর্দ্রতা, বৃষ্টির ঝুঁকি এবং বালাইনাশক স্প্রে করার নিরাপদ সময় নির্ধারণ করুন।
        </p>
      </div>

      {/* 4-Tier Area Selector (Division -> District -> Upazila -> Union) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <MapPin className="w-4 h-4 text-emerald-700" />
          <span>আপনার নির্দিষ্ট ইউনিয়ন নির্বাচন করুন (৬৪ জেলা ও ৫০০ উপজেলার অধীনে):</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* 1. Division */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">১. বিভাগ:</label>
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            >
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>{d.nameBn} ({d.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 2. District (64 Districts) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">২. জেলা (৬৪ জেলা):</label>
            <select
              value={selectedDistrict}
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
              value={selectedUpazila}
              onChange={(e) => handleUpazilaChange(e.target.value)}
              disabled={upazilas.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 bg-stone-50"
            >
              {upazilas.length === 0 ? (
                <option value="">উপজেলা লোড হচ্ছে...</option>
              ) : (
                upazilas.map((u) => (
                  <option key={u.id} value={u.nameBn}>{u.nameBn} ({u.nameEn})</option>
                ))
              )}
            </select>
          </div>

          {/* 4. Union */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">৪. ইউনিয়ন / কৃষি ব্লক:</label>
            <select
              value={selectedUnion}
              onChange={(e) => handleUnionChange(e.target.value)}
              disabled={unions.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 bg-stone-50"
            >
              {unions.length === 0 ? (
                <option value="">ইউনিয়ন লোড হচ্ছে...</option>
              ) : (
                unions.map((uni) => (
                  <option key={uni.id} value={uni.nameBn}>{uni.nameBn}</option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Selected Area Breadcrumb Banner */}
        {weatherData && (
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
            <div className="flex items-center gap-1.5 font-bold">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>নির্বাচিত অবস্থান:</span>
              <span className="text-emerald-800">
                {selectedUnion ? `${selectedUnion} ইউনিয়ন ➔ ` : ''} 
                {weatherData.upazilaNameBn} ➔ 
                {weatherData.districtBn} জেলা ➔ 
                {weatherData.divisionBn} বিভাগ
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded-md font-semibold border border-emerald-300">
              মাইক্রো-ক্লাইমেট সংযুক্ত
            </span>
          </div>
        )}
      </div>

      {/* Main Weather Card & Spray Suitability */}
      {loadingWeather ? (
        <div className="p-12 text-center text-stone-400 text-sm animate-pulse space-y-2">
          <div className="text-3xl">🌦️</div>
          <div>ইউনিয়ন ভিত্তিক আবহাওয়া তথ্য লোড হচ্ছে...</div>
        </div>
      ) : weatherData ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
          {/* Suitability Banner */}
          <div className={`p-4 rounded-2xl flex items-start sm:items-center justify-between gap-3 text-xs ${
            weatherData.applicationSuitability === 'FAVORABLE' 
              ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-950'
              : weatherData.applicationSuitability === 'MODERATE'
                ? 'bg-amber-50 border-2 border-amber-300 text-amber-950'
                : 'bg-rose-50 border-2 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {weatherData.applicationSuitability === 'FAVORABLE' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : weatherData.applicationSuitability === 'MODERATE' ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                ) : (
                  <ShieldAlert className="w-6 h-6 text-rose-600" />
                )}
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                  <span>স্প্রে উপযোগিতা:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    weatherData.applicationSuitability === 'FAVORABLE'
                      ? 'bg-emerald-200 text-emerald-900'
                      : weatherData.applicationSuitability === 'MODERATE'
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-rose-200 text-rose-900'
                  }`}>
                    {weatherData.applicationSuitability === 'FAVORABLE'
                      ? 'অনুকূল (Safe to Spray)'
                      : weatherData.applicationSuitability === 'MODERATE'
                        ? 'সতর্কতা প্রয়োজন (Moderate)'
                        : 'স্প্রে করা কঠোরভাবে নিষিদ্ধ (Prohibited)'}
                  </span>
                </div>
                <div className="text-stone-700 mt-1 font-medium leading-relaxed">
                  {weatherData.advisoryBn}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Weather Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>তাপমাত্রা</span>
                <Thermometer className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                {weatherData.temperatureC}°<span className="text-sm font-bold text-stone-500">C</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                {weatherData.temperatureC > 32 ? 'উচ্চ তাপমাত্রা' : 'সহনীয় মাত্রা'}
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>বাতাসের আর্দ্রতা</span>
                <Droplets className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                {weatherData.humidityPercent}<span className="text-sm font-bold text-stone-500">%</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                {weatherData.humidityPercent > 85 ? 'অতিরিক্ত আর্দ্র (ছত্রাকের ঝুঁকি)' : 'স্বাভাবিক মাত্রা'}
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>বৃষ্টির সম্ভাবনা</span>
                <CloudRain className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                {weatherData.rainfallForecastMm} <span className="text-sm font-bold text-stone-500">মিমি</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                {weatherData.rainfallForecastMm > 5 ? 'বৃষ্টির পূর্বাভাস রয়েছে' : 'বৃষ্টির সম্ভাবনা নেই'}
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div className="flex items-center justify-between text-stone-500 text-xs">
                <span>বাতাসের গতিবেগ</span>
                <Wind className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                {weatherData.windSpeedKmh} <span className="text-sm font-bold text-stone-500">কিমি/ঘণ্টা</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-1">
                {weatherData.windSpeedKmh > 15 ? 'বাতাসের গতি বেশি (স্প্রে ছড়াবে)' : 'মৃদু বাতাস'}
              </div>
            </div>
          </div>

          {/* Regional Agro-Advisory Note */}
          {weatherData.regionalAdvice && (
            <div className="bg-teal-50/70 border border-teal-200 p-4 rounded-2xl space-y-1.5 text-xs text-teal-950">
              <div className="font-bold flex items-center gap-1.5 text-teal-900">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>অঞ্চলভিত্তিক বিশেষ কৃষি ও মৃত্তিকা পরামর্শ ({weatherData.regionalAdvice.aezNameBn || 'কৃষি পরিবেশ অঞ্চল'}):</span>
              </div>
              <p className="text-stone-700 leading-relaxed font-medium">
                {weatherData.regionalAdvice.specialNoteBn}
              </p>
              {weatherData.regionalAdvice.seasonalAlertBn && (
                <p className="text-teal-800 font-semibold pt-1">
                  ⚠️ চলতি মৌসুমের সতর্কতা: {weatherData.regionalAdvice.seasonalAlertBn}
                </p>
              )}
            </div>
          )}
        </div>
      ) : null}

      {/* Krishi Haat & Market Prices Commercial Hub Banner */}
      <div 
        onClick={onNavigateToMarketplace}
        className="bg-gradient-to-r from-teal-900 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 shadow-sm border border-emerald-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group hover:shadow-md transition-all"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-[11px] bg-amber-400 text-stone-950 font-black px-2.5 py-0.5 rounded-full shadow-2xs">
              একসাথে যুক্ত
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors">
              কৃষিপণ্যের লাইভ বাজারদর ও ফসল কেনাবেচার হাট
            </h3>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
            আজকের ধান, তরমুজ, আলু, বেগুন ও পান-সুপারির পাইকারি ও খুচরা বাজারদর জানতে এবং মধ্যস্বত্বভোগী ছাড়া সরাসরি মাঠ থেকে ফসল বিক্রয় করতে আমাদের ফসল হাটে প্রবেশ করুন।
          </p>
        </div>
        <div className="bg-amber-400 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shrink-0 group-hover:bg-amber-300 transition-colors shadow-xs">
          <span>ফসল হাট ও বাজারদরে প্রবেশ ➔</span>
        </div>
      </div>

      {/* Government Agricultural Alerts */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Bell className="w-4 h-4 text-blue-700" />
          <h3 className="font-extrabold text-stone-900 text-base">
            সরকারি কৃষি বার্তা ও জরুরি নোটিশ
          </h3>
        </div>

        <div className="space-y-3">
          {govtUpdates.map((update) => (
            <div 
              key={update.id}
              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                update.isImportant 
                  ? 'bg-amber-50/60 border-amber-300' 
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-md">
                  {update.departmentBn}
                </span>
                <span className="text-[10px] text-stone-400">{update.dateBn}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm leading-snug">
                {update.titleBn}
              </h4>
              <p className="text-stone-600 leading-relaxed font-medium">
                {update.summaryBn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
