import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Image as ImageIcon, FileText, Building2, 
  CloudSun, BookOpen, Clock, AlertCircle, ChevronRight, 
  CheckCircle2, ArrowRight, Mic, Sparkles, ShieldCheck,
  MapPin, RefreshCw, ChevronDown, Check, Droplets, Wind, Thermometer,
  Store, ShoppingBag, Share2, Copy, CheckCheck, Gift, Zap, Bell, PhoneCall,
  Download, Rocket
} from 'lucide-react';
import { User, Diagnosis, Division, District, Upazila, Union } from '../types';
import { 
  ALL_DIVISIONS, 
  ALL_DISTRICTS, 
  getUpazilasForDistrict, 
  getUnionsForUpazila, 
  generateRegionalWeather 
} from '../data/bangladeshGeo';
import { AdBanner } from './AdBanner';
import { AboutAgriCareHeroBanner, AboutAgriCareModal } from './AboutAgriCare';

interface FarmerHomeProps {
  currentUser: User;
  onStartDiagnosisWithImage: (file: File) => void;
  onStartDiagnosisFlow: () => void;
  onViewReports: () => void;
  onViewOffices: () => void;
  onViewWeather: () => void;
  onViewCrops: () => void;
  onViewFarms: () => void;
  onAskAi?: () => void;
  onViewIncentives?: () => void;
  onViewDealers?: () => void;
  onViewMarketplace?: () => void;
  onSelectDiagnosis: (diag: Diagnosis) => void;
  diagnoses: Diagnosis[];
  onOpenInstallModal?: () => void;
  onOpenPublishModal?: () => void;
}

export const FarmerHome: React.FC<FarmerHomeProps> = ({
  currentUser,
  onStartDiagnosisWithImage,
  onStartDiagnosisFlow,
  onViewReports,
  onViewOffices,
  onViewWeather,
  onViewCrops,
  onViewFarms,
  onAskAi,
  onViewIncentives,
  onViewDealers,
  onViewMarketplace,
  onSelectDiagnosis,
  diagnoses,
  onOpenInstallModal,
  onOpenPublishModal
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Geographic state for Step 1 - Pre-populated for instant display
  const [divisions, setDivisions] = useState<Division[]>(ALL_DIVISIONS);
  const [districts, setDistricts] = useState<District[]>(() => 
    ALL_DISTRICTS.filter(d => d.divisionId === 'div-chattogram')
  );
  const [upazilas, setUpazilas] = useState<Upazila[]>(() => 
    getUpazilasForDistrict('dist-chattogram', 'চট্টগ্রাম')
  );
  const [unions, setUnions] = useState<Union[]>(() => 
    getUnionsForUpazila('upz-banskhali', 'বাঁশখালী', 'dist-chattogram')
  );

  // Default initial location: Napora, Banskhali, Chattogram
  const getSavedLocation = () => {
    try {
      const saved = localStorage.getItem('agricare_farmer_location');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      divisionId: 'div-chattogram',
      districtId: 'dist-chattogram',
      upazilaId: 'upz-banskhali',
      unionId: 'uni-napora',
      divisionNameBn: 'চট্টগ্রাম',
      districtNameBn: 'চট্টগ্রাম',
      upazilaNameBn: 'বাঁশখালী',
      unionNameBn: 'নাপোড়া'
    };
  };

  const [location, setLocation] = useState(getSavedLocation());
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempDivision, setTempDivision] = useState(location.divisionId);
  const [tempDistrict, setTempDistrict] = useState(location.districtId);
  const [tempUpazila, setTempUpazila] = useState(location.upazilaId);
  const [tempUnion, setTempUnion] = useState(location.unionId);
  const [weatherInfo, setWeatherInfo] = useState<any>(() => 
    generateRegionalWeather(location.districtId, location.upazilaNameBn, location.unionNameBn)
  );

  // Load Divisions on mount
  useEffect(() => {
    fetch('/api/geo/divisions')
      .then(res => res.json())
      .then(data => setDivisions(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Cascade Districts when division changes
  useEffect(() => {
    if (tempDivision) {
      fetch(`/api/geo/districts?divisionId=${tempDivision}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setDistricts(data);
            if (data.length > 0 && !data.find((d: any) => d.id === tempDistrict)) {
              setTempDistrict(data[0].id);
            }
          }
        })
        .catch(console.error);
    }
  }, [tempDivision]);

  // Cascade Upazilas when district changes
  useEffect(() => {
    if (tempDistrict) {
      fetch(`/api/geo/upazilas?districtId=${tempDistrict}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUpazilas(data);
            if (data.length > 0 && !data.find((u: any) => u.id === tempUpazila)) {
              setTempUpazila(data[0].id);
            }
          }
        })
        .catch(console.error);
    }
  }, [tempDistrict]);

  // Cascade Unions when upazila changes
  useEffect(() => {
    if (tempUpazila) {
      fetch(`/api/geo/unions?upazilaId=${tempUpazila}&districtId=${tempDistrict}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUnions(data);
            if (data.length > 0 && !data.find((un: any) => un.id === tempUnion)) {
              setTempUnion(data[0].id);
            }
          }
        })
        .catch(console.error);
    }
  }, [tempUpazila, tempDistrict]);

  // Fetch regional weather whenever confirmed location changes
  useEffect(() => {
    fetch(`/api/weather/current?districtId=${location.districtId}&upazilaName=${encodeURIComponent(location.upazilaNameBn)}&unionName=${encodeURIComponent(location.unionNameBn)}`)
      .then(res => res.json())
      .then(data => setWeatherInfo(data))
      .catch(console.error);
  }, [location]);

  const handleSaveLocation = () => {
    const divObj = divisions.find(d => d.id === tempDivision);
    const distObj = districts.find(d => d.id === tempDistrict);
    const upzObj = upazilas.find(u => u.id === tempUpazila);
    const uniObj = unions.find(un => un.id === tempUnion);

    const newLoc = {
      divisionId: tempDivision,
      districtId: tempDistrict,
      upazilaId: tempUpazila,
      unionId: tempUnion,
      divisionNameBn: divObj?.nameBn || location.divisionNameBn,
      districtNameBn: distObj?.nameBn || location.districtNameBn,
      upazilaNameBn: upzObj?.nameBn || location.upazilaNameBn,
      unionNameBn: uniObj?.nameBn || location.unionNameBn
    };

    setLocation(newLoc);
    localStorage.setItem('agricare_farmer_location', JSON.stringify(newLoc));
    setIsEditingLocation(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onStartDiagnosisWithImage(file);
    }
  };

  const farmerDiagnoses = (Array.isArray(diagnoses) ? diagnoses : []).filter(d => d.farmerId === currentUser.id);

  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  const handleShareMachineryNoticeWhatsApp = () => {
    const text = `📢 সরকারি সহায়তায় কৃষি যন্ত্রপাতি কীভাবে পাবেন? বিস্তারিত জেনে নিন
কৃষিকাজে শ্রমিকের সংকট ও উৎপাদন খরচ কমাতে সরকার কৃষি যান্ত্রিকীকরণে বিভিন্ন প্রকল্প ও সহায়তা দিয়ে থাকে।

🔧 কী ধরনের কৃষি যন্ত্র পাওয়া যেতে পারে?
✅ পাওয়ার টিলার
✅ ধান কাটার মেশিন (কম্বাইন হারভেস্টার)
✅ ধান মাড়াই ও ঝাড়াই যন্ত্র
✅ রাইস ট্রান্সপ্লান্টার ও রিপার
✅ সিডার/বীজ বপন যন্ত্র
✅ সেচ ও কৃষিকাজের অন্যান্য আধুনিক যন্ত্রপাতি

💰 উপকূলীয় (বাঁশখালী), হাওর ও পাহাড়ি এলাকায় সর্বোচ্চ ৭০% পর্যন্ত সরকারি সহায়তা/ভর্তুকি!
📋 আবেদনের নিয়ম: উপজেলা কৃষি অফিস ও স্ব স্ব ব্লকের এসএএও (SAAO)-র নিকট যোগাযোগ করে নির্ধারিত ফরমে আবেদন করুন।
📞 পরামর্শ ও হটলাইন: ১৬১২৩
🌐 ডিজিটাল কৃষি পোর্টালে সরাসরি দেখুন: ${typeof window !== 'undefined' ? window.location.origin : ''}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyMachineryNotice = () => {
    const text = `📢 সরকারি সহায়তায় কৃষি যন্ত্রপাতি কীভাবে পাবেন?
কী ধরনের যন্ত্র: পাওয়ার টিলার, কম্বাইন হারভেস্টার, ধান মাড়াই যন্ত্র, রাইস ট্রান্সপ্লান্টার, রিপার, সিডার।
ভর্তুকি: উপকূলীয়/পাহাড়ে ৭০%, সমতলে ৫০%।
আবেদন: উপজেলা কৃষি অফিসে যোগাযোগ করে নির্ধারিত ফরমে আবেদন করুন।
হটলাইন: ১৬১২৩ (কৃষি কল সেন্টার)`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

      {/* ================= ABOUT & WHY USE AGRICARE AI HERO INTRODUCTION ================= */}
      <AboutAgriCareHeroBanner 
        onOpenDetails={() => setShowAboutModal(true)}
        onStartDiagnosis={() => cameraInputRef.current?.click()}
      />

      {/* Comprehensive About & Benefits Modal */}
      <AboutAgriCareModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        onStartDiagnosis={() => cameraInputRef.current?.click()}
      />

      {/* ================= PWA FREE INSTALL & NETLIFY PUBLISHING BANNER ================= */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-700/50">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center text-2xl font-bold shadow-xs shrink-0">
            📱
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm">মোবাইলে ফ্রি অ্যাপ ইনস্টল করুন</span>
              <span className="text-[10px] bg-emerald-950 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-emerald-700">১০০% ফ্রি</span>
            </div>
            <p className="text-xs text-emerald-200">
              প্লে-স্টোর অ্যাকাউন্ট বা ফি ছাড়া সরাসরি মোবাইলের হোম স্ক্রিন থেকে চালান। অফলাইনেও কাজ করে।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="flex-1 sm:flex-initial bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-950" />
              <span>ফোনে ইনস্টল</span>
            </button>
          )}
          {onOpenPublishModal && (
            <button
              onClick={onOpenPublishModal}
              className="flex-1 sm:flex-initial bg-emerald-950/80 hover:bg-emerald-950 text-teal-200 border border-emerald-600/60 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-amber-400" />
              <span>Netlify পাবলিশ গাইড</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= LIVE GOVERNMENT BULLETIN & MACHINERY SUBSIDY CIRCULAR ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-800 rounded-3xl p-1 shadow-md">
        <div className="bg-stone-950 text-white rounded-[22px] p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full border border-red-500/30">
                🚨 বিশেষ সরকারি নোটিশ ২০২৬
              </span>
              <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                ডিএই ও কৃষি মন্ত্রণালয় লাইভ বুলেটিন
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400 text-[11px]">হটলাইন:</span>
              <a href="tel:16123" className="text-amber-400 font-extrabold flex items-center gap-1 hover:underline">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>১৬১২৩</span>
              </a>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              সরকারি সহায়তায় কৃষি যন্ত্রপাতি কীভাবে পাবেন? (হারভেস্টার, পাওয়ার টিলার ও রিপার ভর্তুকি)
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              কৃষিকাজে শ্রমিকের সংকট ও উৎপাদন খরচ কমাতে সরকার কৃষি যান্ত্রিকীকরণে ৭০% পর্যন্ত উন্নয়ন সহায়তা দিচ্ছে। পাওয়ার টিলার, কম্বাইন হারভেস্টার, ধান মাড়াই যন্ত্র, রাইস ট্রান্সপ্লান্টার ও রিপার বরাদ্দে আবেদন চলছে।
            </p>
          </div>

          {/* Key tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <span className="bg-stone-800 text-stone-200 px-2.5 py-1 rounded-lg border border-stone-700">
              🌾 কম্বাইন হারভেস্টার
            </span>
            <span className="bg-stone-800 text-stone-200 px-2.5 py-1 rounded-lg border border-stone-700">
              🚜 পাওয়ার টিলার
            </span>
            <span className="bg-stone-800 text-stone-200 px-2.5 py-1 rounded-lg border border-stone-700">
              🌱 রাইস ট্রান্সপ্লান্টার ও সিডার
            </span>
            <span className="bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-400/40">
              💰 বাঁশখালীতে সর্বোচ্চ ৭০% ভর্তুকি
            </span>
          </div>

          {/* Action outreach buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {onViewIncentives && (
                <button
                  onClick={onViewIncentives}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>আবেদন নিয়ম ও বিস্তারিত দেখুন</span>
                </button>
              )}

              <button
                onClick={handleShareMachineryNoticeWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="হোয়াটসঅ্যাপে কৃষক ও ডিলার গ্রুপে নোটিশ পাঠান"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>📲 WhatsApp-এ শেয়ার</span>
              </button>

              <button
                onClick={handleCopyMachineryNotice}
                className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs px-3 py-2 rounded-xl transition-all border border-stone-700 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                {copiedNotice ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>কপি</span>
                  </>
                )}
              </button>
            </div>

            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>উপজেলা কৃষি অফিসে সরাসরি যোগাযোগ করুন</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* ================= STEP 1: LOCATION SELECTION (ALWAYS FIRST) ================= */}
      <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ১
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  প্রথম ধাপ
                </span>
                <span className="text-xs text-stone-500 font-medium">সঠিক সমাধানের জন্য আপনার এলাকা নির্বাচন</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 mt-0.5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>আপনার কৃষি অঞ্চল ও খামারের অবস্থান</span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsEditingLocation(!isEditingLocation)}
            className="self-start sm:self-auto bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-stone-200 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isEditingLocation ? 'বাতিল করুন' : 'এলাকা পরিবর্তন করুন'}</span>
          </button>
        </div>

        {/* Location Editing Form */}
        {isEditingLocation ? (
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-stone-600 font-medium">
              আপনার বিভাগ, জেলা, উপজেলা ও ইউনিয়ন নির্বাচন করুন। এটি আপনার এলাকার আবহাওয়া এবং সংশ্লিষ্ট কৃষি কর্মকর্তার সেবা নিশ্চিত করবে।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Division */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">বিভাগ (Division):</label>
                <select
                  value={tempDivision}
                  onChange={(e) => setTempDivision(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>{d.nameBn}</option>
                  ))}
                </select>
              </div>

              {/* 2. District */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">জেলা (District):</label>
                <select
                  value={tempDistrict}
                  onChange={(e) => setTempDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.nameBn}</option>
                  ))}
                </select>
              </div>

              {/* 3. Upazila */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা (Upazila):</label>
                <select
                  value={tempUpazila}
                  onChange={(e) => setTempUpazila(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.id}>{u.nameBn}</option>
                  ))}
                </select>
              </div>

              {/* 4. Union */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ইউনিয়ন / ব্লক (Union):</label>
                <select
                  value={tempUnion}
                  onChange={(e) => setTempUnion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  {unions.map((un) => (
                    <option key={un.id} value={un.id}>{un.nameBn}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingLocation(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSaveLocation}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>এলাকা নিশ্চিত ও সংরক্ষণ করুন</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Location Display Banner */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                📍
              </div>
              <div>
                <div className="text-[10px] text-emerald-800 font-bold uppercase">নির্বাচিত এলাকা</div>
                <div className="text-sm font-black text-stone-900 mt-0.5">
                  {location.unionNameBn}, {location.upazilaNameBn}
                </div>
                <div className="text-xs text-stone-600 font-medium">
                  {location.districtNameBn} জেলা, {location.divisionNameBn} বিভাগ
                </div>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                🌦️
              </div>
              <div className="space-y-0.5">
                <div className="text-[10px] text-blue-800 font-bold uppercase">আজকের আবহাওয়া ও স্প্রে গেট</div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                  <span>তাপমাত্রা: {weatherInfo ? `${weatherInfo.temperatureC}°C` : '২৮°C'}</span>
                  <span>•</span>
                  <span>আর্দ্রতা: {weatherInfo ? `${weatherInfo.humidityPercent}%` : '৮২%'}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{weatherInfo?.isSpraySafe ? 'আবহাওয়া অনুকূল (স্প্রে করা যাবে)' : 'বৃষ্টির সম্ভাবনা নেই, শেষ বিকেলে স্প্রে নিরাপদ'}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0">
                🏢
              </div>
              <div>
                <div className="text-[10px] text-amber-900 font-bold uppercase">সংশ্লিষ্ট কৃষি অফিস</div>
                <div className="text-xs font-bold text-stone-900 mt-0.5">
                  {location.upazilaNameBn} উপজেলা কৃষি অফিস
                </div>
                <div className="text-[11px] text-stone-600 mt-0.5 flex items-center gap-2">
                  <button onClick={onViewOffices} className="text-emerald-800 font-bold hover:underline">
                    SAAO নম্বর দেখুন
                  </button>
                  <span>•</span>
                  <a href="tel:16123" className="text-amber-800 font-bold hover:underline">
                    ১৬১২৩ (হটলাইন)
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= STEP 2: SOLVE CROP PROBLEM (IMAGE OR GUIDED FLOW) ================= */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <span className="text-9xl">🌾</span>
        </div>

        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-extrabold text-sm shadow-xs">
              ২
            </span>
            <div className="inline-flex items-center gap-2 bg-emerald-700/60 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-600/40">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>দ্বিতীয় ধাপ: ফসলের সমস্যা ও চিকিৎসা</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            আপনার আক্রান্ত ফসলের কী সমস্যা?
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            গাছের আক্রান্ত পাতা, ফল বা ডালের স্পষ্ট ছবি দিন। AI সাথে সাথে রোগ নির্ণয় করবে এবং আপনার নির্বাচিত এলাকা ({location.unionNameBn}, {location.upazilaNameBn})-র আবহাওয়া বিবেচনা করে সঠিক মাত্রা ও নিরাপদ পরামর্শ দেবে।
          </p>
        </div>

        {/* Primary Action Buttons (Camera & Gallery) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {/* Hidden File Inputs */}
          <input 
            type="file" 
            ref={cameraInputRef} 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={handleFileChange} 
          />
          <input 
            type="file" 
            ref={galleryInputRef} 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />

          {/* Big Button 1: Camera */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-98 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900/10 flex items-center justify-center">
              <Camera className="w-6 h-6 text-emerald-950" />
            </div>
            <span>📷 সরাসরি ছবি তুলুন</span>
          </button>

          {/* Big Button 2: Gallery */}
          <button
            onClick={() => galleryInputRef.current?.click()}
            className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-xs px-6 py-4 rounded-2xl font-bold text-lg shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <span>🖼️ গ্যালারি থেকে ছবি দিন</span>
          </button>
        </div>

        {/* Manual Guided Flow Fallback */}
        <div className="mt-4 pt-3 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>ছবি তুলতে পারছেন না? লক্ষণ লিখেও শুরু করতে পারেন</span>
          </div>
          <button
            onClick={onStartDiagnosisFlow}
            className="text-amber-300 hover:text-white font-semibold flex items-center gap-1 underline cursor-pointer"
          >
            <span>ধাপে ধাপে তথ্য দিন</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Krishi Call Centre 16123 & Local Office Quick Access Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-emerald-600/30 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
            📞
          </div>
          <div>
            <div className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">জরুরি সরকারি কৃষি কল সেন্টার (টোল-ফ্রি)</div>
            <div className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <span>হটলাইন: ১৬১২৩</span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                সকাল ৭টা - রাত ৯টা
              </span>
            </div>
            <div className="text-stone-600 text-[11px] mt-0.5">
              যেকোনো মোবাইল অপারেটর থেকে সরাসরি কৃষিবিদদের সাথে কথা বলে তাৎক্ষণিক পরামর্শ নিন।
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:16123"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>📞 ১৬১২৩ কল করুন</span>
          </a>
          <button
            onClick={onViewOffices}
            className="bg-white hover:bg-stone-100 text-stone-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 border border-stone-200 transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{location.upazilaNameBn} কৃষি অফিস</span>
          </button>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={onViewFarms}
          className="bg-white hover:bg-emerald-50/60 p-4 rounded-2xl border border-stone-200 text-left transition-all shadow-xs hover:border-emerald-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <span className="text-lg">🌱</span>
          </div>
          <div className="font-bold text-stone-900 text-sm">আমার খামার ও জমি</div>
          <div className="text-[11px] text-stone-500 mt-0.5">প্লট ও শস্য ব্যবস্থাপনা</div>
        </button>

        <button
          onClick={onViewReports}
          className="bg-white hover:bg-emerald-50/60 p-4 rounded-2xl border border-stone-200 text-left transition-all shadow-xs hover:border-emerald-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div className="font-bold text-stone-900 text-sm">আমার রিপোর্ট</div>
          <div className="text-[11px] text-stone-500 mt-0.5">ব্যবস্থাপত্র ও ফলোআপ</div>
        </button>

        <button
          onClick={onViewOffices}
          className="bg-white hover:bg-emerald-50/60 p-4 rounded-2xl border border-stone-200 text-left transition-all shadow-xs hover:border-emerald-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="font-bold text-stone-900 text-sm">কৃষি অফিস</div>
          <div className="text-[11px] text-stone-500 mt-0.5">উপজেলা ও SAAO</div>
        </button>

        <button
          onClick={onViewWeather}
          className="bg-white hover:bg-emerald-50/60 p-4 rounded-2xl border border-stone-200 text-left transition-all shadow-xs hover:border-emerald-300 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <CloudSun className="w-5 h-5" />
          </div>
          <div className="font-bold text-stone-900 text-sm">আবহাওয়া ও স্প্রে</div>
          <div className="text-[11px] text-stone-500 mt-0.5">বৃষ্টি ও বাতাসের ঝুঁকি</div>
        </button>

        <button
          onClick={onViewCrops}
          className="bg-white hover:bg-emerald-50/60 p-4 rounded-2xl border border-stone-200 text-left transition-all shadow-xs hover:border-emerald-300 group col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="font-bold text-stone-900 text-sm">কৃষি সহায়িকা</div>
          <div className="text-[11px] text-stone-500 mt-0.5">অনুমোদিত বালাই তথ্যকোষ</div>
        </button>
      </div>

      {/* Two New Feature Banner Cards: Ask AI & Government Incentives */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Ask AI */}
        <div 
          onClick={onAskAi}
          className="bg-gradient-to-br from-teal-900 to-emerald-950 text-white rounded-3xl p-5 border border-emerald-700/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                ✨ এআই কৃষি বিশেষজ্ঞ
              </span>
              <span className="text-xl">🤖</span>
            </div>
            <h3 className="font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
              এআই-কে সরাসরি প্রশ্ন জিজ্ঞাসা করুন
            </h3>
            <p className="text-xs text-emerald-200 leading-relaxed font-normal">
              যেকোনো ফসলের রোগ, বালাই বা সার প্রয়োগ নিয়ে বাংলায় প্রশ্ন লিখুন বা কথা বলুন। DAE নীতিমালায় তাৎক্ষণিক বৈজ্ঞানিক পরামর্শ নিন।
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-amber-300 font-bold">
            <span>প্রশ্ন করতে ক্লিক করুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Government Incentives */}
        <div 
          onClick={onViewIncentives}
          className="bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-5 border border-amber-700/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-bold">
                🎁 সরকারি সহায়তা
              </span>
              <span className="text-xl">🌾</span>
            </div>
            <h3 className="font-extrabold text-base text-white group-hover:text-emerald-300 transition-colors">
              চলতি সরকারি কৃষি প্রণোদনা ও ভর্তুকি
            </h3>
            <p className="text-xs text-amber-100/80 leading-relaxed font-normal">
              বিনামূল্যে বীজ ও সার সহায়তা, লবণাক্ততা সহনশীল জাত প্রকল্প এবং কৃষি যন্ত্রপাতিতে ৭০% সরকারি ভর্তুকির আবেদন তথ্য।
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-emerald-300 font-bold">
            <span>প্রণোদনা প্যাকেজসমূহ দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Monetization & Marketplace Feature Cards: Verified Dealers & Krishi Haat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 3: Verified Dealers & Machinery Rental */}
        <div 
          onClick={onViewDealers}
          className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-3xl p-5 border border-amber-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                🏪 ডিলার ও যন্ত্রপাতি সেবা
              </span>
              <span className="text-xl">🚜</span>
            </div>
            <h3 className="font-extrabold text-base text-stone-900 group-hover:text-amber-800 transition-colors">
              সার, বীজ ও কৃষি যন্ত্রপাতি সেবা (হারভেস্টার ও টিলার)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              বাঁশখালী ও আশেপাশের অনুমোদিত সার-বীজ ডিলার এবং কম্বাইন হারভেস্টার, পাওয়ার টিলার ও সেচ পাম্প ভাড়ার সরাসরি যোগাযোগ।
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-amber-900 font-bold border-t border-amber-200/60 mt-2">
            <span>ডিলার ও যন্ত্রপাতি সেবা দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Krishi Haat Marketplace & Market Prices */}
        <div 
          onClick={onViewMarketplace}
          className="bg-gradient-to-br from-teal-500/10 via-white to-teal-500/5 rounded-3xl p-5 border border-teal-300 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-teal-800 text-white font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                🌾 ফসল হাট ও বাজারদর
              </span>
              <span className="text-xl">🤝</span>
            </div>
            <h3 className="font-extrabold text-base text-stone-900 group-hover:text-teal-800 transition-colors">
              উৎপাদিত ফসল বিক্রয় ও আজকের বাজারদর
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              আজকের পাইকারি ও খুচরা বাজারদর যাচাই করুন এবং মধ্যস্বত্বভোগী ছাড়া সরাসরি আড়তদার বা পাইকারদের কাছে ফসল বিক্রির পোস্ট দিন।
            </p>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-teal-900 font-bold border-t border-teal-200/60 mt-2">
            <span>ফসল হাট ও বাজারদরে প্রবেশ করুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Ad / Sponsored Placement Banner */}
      <AdBanner
        partnerName="মেসার্স চৌধুরী ট্রেডার্স ও সার বিতান"
        title="বাঁশখালী পৌরসভা সদর বাজারে সরকারি মূল্যে আসল সার ও কীটনাশক সংগ্রহ করুন"
        subtitle="সরাসরি ফোন করে পণ্য ও স্টকের তথ্য নিশ্চিত করুন"
        phone="০১৮১৯-৮৮৭৭৬৬"
        ctaText="ডিলার তালিকা"
        ctaLink="#dealers"
        variant="emerald"
      />

      {/* Voice & Accessibility Helper Card */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-amber-200/60 text-amber-800 flex items-center justify-center shrink-0">
          <Mic className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-stone-700 leading-snug">
          <span className="font-bold text-amber-950 block sm:inline mr-1">সহজ অডিও সহায়তা:</span>
          যেকোনো ডায়াগনোসিস রিপোর্টের পাশে থাকা <span className="font-semibold text-emerald-800">"🔊 শুনুন"</span> বাটনে চাপ দিলে বাংলায় অডিও পড়ে শোনানো হবে।
        </div>
      </div>

      {/* Recent Diagnoses & Cases */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-700" />
            <span>আপনার সাম্প্রতিক ডায়াগনোসিস সমূহ</span>
          </h2>
          {farmerDiagnoses.length > 0 && (
            <button 
              onClick={onViewReports}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold"
            >
              সবগুলো দেখুন ({farmerDiagnoses.length})
            </button>
          )}
        </div>

        {farmerDiagnoses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 space-y-2">
            <div className="text-4xl">🌱</div>
            <p className="font-semibold text-stone-700">এখনও কোনো ফসলের রোগ নির্ণয় করা হয়নি</p>
            <p className="text-xs max-w-sm mx-auto">
              উপরে "ছবি তুলুন" বাটনে ক্লিক করে আক্রান্ত গাছের পাতার স্পষ্ট ছবি তুলুন।
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {farmerDiagnoses.slice(0, 3).map((diag) => {
              const isOfficerVerified = diag.officerVerificationStatus === 'VERIFIED_BY_OFFICER';
              return (
                <div
                  key={diag.id}
                  onClick={() => onSelectDiagnosis(diag)}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-400 p-4 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={diag.imageUrl} 
                      alt={diag.cropNameBn} 
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-base">{diag.primaryCandidate.problemNameBn}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                          {diag.cropNameBn}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        {diag.explainableReasoningBn}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-stone-400">
                        <span>আস্থা: {diag.primaryCandidate.confidencePercent}%</span>
                        <span>•</span>
                        <span>{diag.locationNameBn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {isOfficerVerified ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>কৃষি কর্মকর্তা যাচাইকৃত</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>পর্যালোচনার অপেক্ষায়</span>
                      </span>
                    )}

                    <ChevronRight className="w-5 h-5 text-stone-400" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
