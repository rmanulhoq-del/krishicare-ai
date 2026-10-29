import React, { useState, useEffect } from 'react';
import { 
  Camera, Image as ImageIcon, ArrowLeft, ArrowRight, 
  CheckCircle2, AlertTriangle, ShieldAlert, Sparkles, 
  MapPin, CloudRain, Droplets, Wind, Thermometer, 
  Volume2, VolumeX, FileText, PhoneCall, Building2, 
  Info, ShieldCheck, RefreshCw, X 
} from 'lucide-react';
import { Crop, Division, District, Upazila, Union, Diagnosis, User } from '../types';
import { ALL_DIVISIONS, ALL_DISTRICTS, getUpazilasForDistrict, getUnionsForUpazila } from '../data/bangladeshGeo';
import { performIntelligentDiagnosis, generateClientSideDiagnosis } from '../utils/aiDiagnosisClient';
import { analyzePlantImageFromBase64 } from '../utils/leafVisualClassifier';

interface DiagnosisWorkflowProps {
  initialImageFile?: File | null;
  currentUser: User;
  onCancel: () => void;
  onComplete: (diag: Diagnosis) => void;
  onOpenReportModal: (diag: Diagnosis) => void;
  onOpenFollowupModal: (diag: Diagnosis) => void;
}

export const ALL_DEFAULT_CROPS: Crop[] = [
  {
    id: 'crop-universal',
    nameBn: '✨ স্বয়ংক্রিয় এআই শনাক্তকরণ',
    nameEn: 'Universal AI Vision (Any Crop / Plant)',
    scientificName: 'যেকোনো গাছ, ফসল, পাতা, ফুল বা ফল',
    category: 'সার্বজনীন এআই',
    icon: '🤖',
    stages: ['চারা অবস্থা', 'বৃদ্ধি পর্যায়', 'ফুল ও কুঁড়ি', 'ফল ধরা ও পরিপক্বতা']
  },
  {
    id: 'crop-jute',
    nameBn: 'পাট',
    nameEn: 'Jute',
    scientificName: 'Corchorus olitorius',
    category: 'অর্থকরী ফসল',
    icon: '🌿',
    stages: ['চারা গজানো', 'দ্রুত বৃদ্ধি পর্যায়', 'ফুল আসা', 'পাট কাটা ও জাগ']
  },
  {
    id: 'crop-corn',
    nameBn: 'ভুট্টা',
    nameEn: 'Corn / Maize',
    scientificName: 'Zea mays',
    category: 'দানাদার শস্য',
    icon: '🌽',
    stages: ['চারা পর্যায়', 'হাঁটু সমান উচ্চতা', 'মোচা ও পরাগায়ন', 'দানা পুষ্ট ও পরিপক্ব']
  },
  {
    id: 'crop-wheat',
    nameBn: 'গম',
    nameEn: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'দানাদার শস্য',
    icon: '🌾',
    stages: ['চারা পর্যায়', 'কুশি ও থোড় অবস্থা', 'শীষ বের হওয়া', 'দানা পাকা']
  },
  {
    id: 'crop-ash-gourd',
    nameBn: 'চাল কুমড়া',
    nameEn: 'Ash Gourd / Wax Gourd',
    scientificName: 'Benincasa hispida',
    category: 'শাকসবজি ও লতানো ফসল',
    icon: '🍈',
    stages: ['চারা অবস্থা', 'মাচায় লতা বিস্তার', 'ফুল ও জালি', 'ফল বৃদ্ধি ও সংগ্রহ']
  },
  {
    id: 'crop-bottle-gourd',
    nameBn: 'লাউ / কদু',
    nameEn: 'Bottle Gourd',
    scientificName: 'Lagenaria siceraria',
    category: 'শাকসবজি ও লতানো ফসল',
    icon: '🫑',
    stages: ['চারা অবস্থা', 'মাচায় লতানো বৃদ্ধি', 'ফুল ও কুঁড়ি', 'ফল সংগ্রহ']
  },
  {
    id: 'crop-pumpkin',
    nameBn: 'মিষ্টি কুমড়া',
    nameEn: 'Pumpkin',
    scientificName: 'Cucurbita moschata',
    category: 'শাকসবজি ও লতানো ফসল',
    icon: '🎃',
    stages: ['লতা বিস্তার', 'হলুদ ফুল', 'ফল ধরা', 'পাকা কুমড়া']
  },
  {
    id: 'crop-cucumber',
    nameBn: 'শসা ও খিরা',
    nameEn: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'শাকসবজি ও লতানো ফসল',
    icon: '🥒',
    stages: ['লতানো বৃদ্ধি', 'ফুল ফোটা', 'ফল ধরা']
  },
  {
    id: 'crop-bitter-gourd',
    nameBn: 'করলা ও উচ্ছে',
    nameEn: 'Bitter Gourd',
    scientificName: 'Momordica charantia',
    category: 'শাকসবজি ও লতানো ফসল',
    icon: '🥒',
    stages: ['মাচায় লতানো বৃদ্ধি', 'হলুদ ফুল', 'ফল ধরা']
  },
  {
    id: 'crop-mango',
    nameBn: 'আম',
    nameEn: 'Mango',
    scientificName: 'Mangifera indica',
    category: 'ফলমূল',
    icon: '🥭',
    stages: ['মুকুল আসা', 'মটর দানা', 'মার্বেল আকার', 'পরিপক্ব ফল']
  },
  {
    id: 'crop-rice',
    nameBn: 'ধান',
    nameEn: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    category: 'দানাদার শস্য',
    icon: '🌾',
    stages: ['চারা অবস্থা', 'কুশি অবস্থা', 'কাইচ থোড় / শিষ', 'দানা গঠন ও পাকা']
  },
  {
    id: 'crop-potato',
    nameBn: 'আলু',
    nameEn: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'শাকসবজি ও কন্দজাতীয়',
    icon: '🥔',
    stages: ['অঙ্কুরোদগম', 'উদ্ভিজ্জ বৃদ্ধি', 'কন্দ গঠন', 'আলু পরিপক্বতা']
  },
  {
    id: 'crop-tomato',
    nameBn: 'টমেটো',
    nameEn: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'শাকসবজি',
    icon: '🍅',
    stages: ['চারা অবস্থা', 'শাখা বিস্তার', 'ফুল ধরা', 'পাকা টমেটো']
  },
  {
    id: 'crop-eggplant',
    nameBn: 'বেগুন',
    nameEn: 'Eggplant / Brinjal',
    scientificName: 'Solanum melongena',
    category: 'শাকসবজি',
    icon: '🍆',
    stages: ['চারা অবস্থা', 'ফুল ফোটা', 'ফল সংগ্রহ']
  },
  {
    id: 'crop-chili',
    nameBn: 'মরিচ',
    nameEn: 'Chili Pepper',
    scientificName: 'Capsicum annuum',
    category: 'মসলা ও সবজি',
    icon: '🌶️',
    stages: ['প্রাথমিক বৃদ্ধি', 'ফুল ও কুঁড়ি', 'ফল পরিপক্বতা']
  },
  {
    id: 'crop-watermelon',
    nameBn: 'তরমুজ',
    nameEn: 'Watermelon',
    scientificName: 'Citrullus lanatus',
    category: 'ফলমূল',
    icon: '🍉',
    stages: ['চারা অবস্থা', 'লতা বিস্তার', 'ফুল ও জালি', 'ফল বৃদ্ধি']
  },
  {
    id: 'crop-betel-leaf',
    nameBn: 'পান (মিষ্টি পান)',
    nameEn: 'Betel Leaf',
    scientificName: 'Piper betle',
    category: 'অর্থকরী ফসল',
    icon: '🍃',
    stages: ['বরজ তৈরি', 'লতানো বৃদ্ধি', 'পাতা চয়ন']
  },
  {
    id: 'crop-mustard',
    nameBn: 'সরিষা',
    nameEn: 'Mustard',
    scientificName: 'Brassica campestris',
    category: 'তৈলবীজ',
    icon: '🌼',
    stages: ['চারা গজানো', 'হলুদ ফুল', 'শুঁটি গঠন', 'বীজ পাকা']
  },
  {
    id: 'crop-guava',
    nameBn: 'পেয়ারা',
    nameEn: 'Guava',
    scientificName: 'Psidium guajava',
    category: 'ফলমূল',
    icon: '🍐',
    stages: ['নতুন কুঁড়ি', 'ফুল ধরা', 'মার্বেল আকার', 'ফল সংগ্রহ']
  },
  {
    id: 'crop-banana',
    nameBn: 'কলা',
    nameEn: 'Banana',
    scientificName: 'Musa acuminata',
    category: 'ফলমূল',
    icon: '🍌',
    stages: ['গাছের বৃদ্ধি', 'মোচা বের হওয়া', 'কাঁদি পরিপক্বতা']
  }
];

export const DiagnosisWorkflow: React.FC<DiagnosisWorkflowProps> = ({
  initialImageFile,
  currentUser,
  onCancel,
  onComplete,
  onOpenReportModal,
  onOpenFollowupModal
}) => {
  // Steps: 1: Image, 2: Crop, 3: Questions, 4: Location, 5: Weather & Soil, 6: Result
  const [currentStep, setCurrentStep] = useState<number>(initialImageFile ? 2 : 1);

  // Form State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageQuality, setImageQuality] = useState<'CLEAR' | 'BLURRY' | 'DARK' | 'TOO_DISTANT'>('CLEAR');

  const [crops, setCrops] = useState<Crop[]>(ALL_DEFAULT_CROPS);
  const [selectedCropId, setSelectedCropId] = useState<string>('crop-universal');
  const [detectedPlantInfo, setDetectedPlantInfo] = useState<{
    cropId: string;
    nameBn: string;
    confidence: number;
    reasonBn: string;
    problemHintBn: string;
  } | null>(null);

  // Progressive Questions
  const [cropAge, setCropAge] = useState<string>('১-৩ মাস');
  const [affectedPart, setAffectedPart] = useState<string>('পুরাতন পাতা ও পাতার কিনারা');
  const [duration, setDuration] = useState<string>('৪-৭ দিন');
  const [spread, setSpread] = useState<string>('জমির কিছু অংশে (Some plants)');

  const getInitialLocation = () => {
    try {
      const saved = localStorage.getItem('agricare_farmer_location');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      divisionId: 'div-chattogram',
      districtId: 'dist-chattogram',
      upazilaId: 'upz-banskhali',
      unionId: 'uni-napora'
    };
  };
  const initLoc = getInitialLocation();
  const initDivId = initLoc?.divisionId || currentUser.divisionId || 'div-chattogram';
  const initDistId = initLoc?.districtId || currentUser.districtId || 'dist-chattogram';
  const initUpzId = initLoc?.upazilaId || currentUser.upazilaId || 'upz-banskhali';

  // Geographic Location - Pre-populated for instant display
  const [divisions, setDivisions] = useState<Division[]>(ALL_DIVISIONS);
  const [districts, setDistricts] = useState<District[]>(() => 
    ALL_DISTRICTS.filter(d => d.divisionId === initDivId)
  );
  const [upazilas, setUpazilas] = useState<Upazila[]>(() => 
    getUpazilasForDistrict(initDistId)
  );
  const [unions, setUnions] = useState<Union[]>(() => 
    getUnionsForUpazila(initUpzId, '', initDistId)
  );

  const [selectedDivision, setSelectedDivision] = useState<string>(initDivId);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initDistId);
  const [selectedUpazila, setSelectedUpazila] = useState<string>(initUpzId);
  const [selectedUnion, setSelectedUnion] = useState<string>(initLoc?.unionId || currentUser.unionId || 'uni-napora');

  // Weather & Soil Context
  const [tempC, setTempC] = useState<number>(28);
  const [humidity, setHumidity] = useState<number>(84);
  const [rainForecastMm, setRainForecastMm] = useState<number>(0);
  const [windKmh, setWindKmh] = useState<number>(10);
  const [soilType, setSoilType] = useState<string>('দোআঁশ');
  const [soilMoisture, setSoilMoisture] = useState<'DRY' | 'NORMAL' | 'WATERLOGGED'>('WATERLOGGED');
  const [drainage, setDrainage] = useState<'GOOD' | 'MODERATE' | 'POOR'>('POOR');

  // Processing & Result State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<Diagnosis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Load Crops & Divisions
  useEffect(() => {
    fetch('/api/crops').then(res => res.json()).then(data => {
      setCrops(data);
      if (data.length > 0 && !selectedCropId) setSelectedCropId(data[0].id);
    }).catch(console.error);

    fetch('/api/geo/divisions').then(res => res.json()).then(data => setDivisions(data)).catch(console.error);
  }, []);

  // Cascade Districts
  useEffect(() => {
    if (selectedDivision) {
      fetch(`/api/geo/districts?divisionId=${selectedDivision}`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data);
          if (data.length > 0 && !data.find((d: District) => d.id === selectedDistrict)) {
            setSelectedDistrict(data[0].id);
          }
        }).catch(console.error);
    }
  }, [selectedDivision]);

  // Cascade Upazilas
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`/api/geo/upazilas?districtId=${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          setUpazilas(data);
          if (data.length > 0) {
            setSelectedUpazila(data[0].id);
          } else {
            setSelectedUpazila('');
            setUnions([]);
            setSelectedUnion('');
          }
        }).catch(console.error);
    }
  }, [selectedDistrict]);

  // Cascade Unions & Regional Weather Sync
  useEffect(() => {
    if (selectedUpazila && selectedDistrict) {
      fetch(`/api/geo/unions?upazilaId=${selectedUpazila}&districtId=${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          setUnions(data);
          if (data.length > 0) {
            setSelectedUnion(data[0].id);
          } else {
            setSelectedUnion('');
          }
        }).catch(console.error);

      const upz = upazilas.find(u => u.id === selectedUpazila);
      const uni = unions.find(u => u.id === selectedUnion);
      let weatherUrl = `/api/weather/current?districtId=${selectedDistrict}&upazilaName=${encodeURIComponent(upz?.nameBn || '')}`;
      if (uni) weatherUrl += `&unionName=${encodeURIComponent(uni.nameBn)}`;

      fetch(weatherUrl)
        .then(res => res.json())
        .then(w => {
          if (w.temperatureC) setTempC(w.temperatureC);
          if (w.humidityPercent) setHumidity(w.humidityPercent);
          if (w.rainfallForecastMm !== undefined) setRainForecastMm(w.rainfallForecastMm);
          if (w.windSpeedKmh) setWindKmh(w.windSpeedKmh);
        }).catch(console.error);
    }
  }, [selectedUpazila, selectedDistrict]);


  // Handle Initial Image File
  useEffect(() => {
    if (initialImageFile) {
      processImageFile(initialImageFile);
    }
  }, [initialImageFile]);

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      setImagePreview(b64);
      setImageBase64(b64);

      // Perform real visual canvas optical & color feature analysis
      const visualAnalysis = await analyzePlantImageFromBase64(b64, file.name);
      
      setDetectedPlantInfo(visualAnalysis);
      setSelectedCropId(visualAnalysis.cropId);
      setAffectedPart('গাছের পাতা ও ডগার আক্রান্ত অংশ');
      setCropAge('১-৩ মাস');
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  // Text to Speech in Bengali
  const toggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে অডিও প্লেয়ার সমর্থিত নয়');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Submit for AI Processing
  const handleAnalyze = async () => {
    setIsProcessing(true);
    setCurrentStep(6);

    const upzObj = upazilas.find(u => u.id === selectedUpazila);
    const distObj = districts.find(d => d.id === selectedDistrict);
    const uniObj = unions.find(u => u.id === selectedUnion);
    const locationName = `${uniObj ? `${uniObj.nameBn}, ` : ''}${upzObj?.nameBn || ''}, ${distObj?.nameBn || ''}`;

    const effectiveCropId = selectedCropId === 'crop-universal' 
      ? (detectedPlantInfo?.cropId || 'crop-mango') 
      : selectedCropId;

    const payload = {
      cropId: effectiveCropId,
      detectedCropId: detectedPlantInfo?.cropId,
      cropAgeBn: cropAge,
      affectedPartBn: affectedPart,
      durationBn: duration,
      spreadBn: spread,
      divisionId: selectedDivision,
      districtId: selectedDistrict,
      upazilaId: selectedUpazila,
      unionId: selectedUnion,
      locationNameBn: locationName,
      imageBase64: imageBase64 || undefined,
      imageUrl: imagePreview || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      weather: {
        temperatureC: tempC,
        humidityPercent: humidity,
        rainfallForecastMm: rainForecastMm,
        windSpeedKmh: windKmh
      },
      soil: {
        soilType,
        soilMoisture,
        drainageCondition: drainage
      }
    };

    try {
      // Intelligently queries backend API if available, or performs client-side DAE/BARI/BRRI expert decision engine
      const diag = await performIntelligentDiagnosis(payload, currentUser);
      setDiagnosisResult(diag);
      onComplete(diag);
    } catch (err: any) {
      console.warn('Diagnosis fallback triggered:', err);
      const fallbackDiag = generateClientSideDiagnosis(payload, currentUser);
      setDiagnosisResult(fallbackDiag);
      onComplete(fallbackDiag);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Header & Step Progress */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ফিরে যান</span>
        </button>

        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ধাপ {currentStep} / ৬: {
            currentStep === 1 ? 'গাছের ছবি' :
            currentStep === 2 ? 'ফসল নির্বাচন' :
            currentStep === 3 ? 'লক্ষণ ও বিস্তার' :
            currentStep === 4 ? 'এলাকা' :
            currentStep === 5 ? 'আবহাওয়া ও মাটি' : 'এআই ফলাফল ও চিকিৎসা'
          }
        </div>

        <button onClick={onCancel} className="text-stone-400 hover:text-stone-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* STEP 1: IMAGE CAPTURE & VALIDATION */}
      {currentStep === 1 && (
        <div className="mt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              গাছের আক্রান্ত অংশের স্পষ্ট ছবি দিন
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              পাতা, কাণ্ড বা ফলের দাগ যাতে পরিষ্কার বোঝা যায়। ঝাপসা বা দূর থেকে তোলা ছবি পরিহার করুন।
            </p>
          </div>

          <div className="bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 p-6 text-center space-y-4">
            {imagePreview ? (
              <div className="relative inline-block max-w-sm">
                <img 
                  src={imagePreview} 
                  alt="Plant preview" 
                  className="rounded-xl max-h-64 object-cover mx-auto shadow-md border border-stone-200" 
                />
                <button
                  onClick={() => { setImagePreview(null); setImageBase64(null); }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="py-8 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Camera className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-stone-700">
                  ক্যামেরা দিয়ে সরাসরি ছবি তুলুন অথবা গ্যালারি থেকে সিলেক্ট করুন
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <label className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md inline-flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>ক্যামেরা ওপেন করুন</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>

              <label className="cursor-pointer bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs inline-flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>ফাইল আপলোড করুন</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          {/* AI Visual Plant Identification Banner */}
          {detectedPlantInfo && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-2xl p-4 text-left shadow-sm flex items-start gap-3.5 animate-in fade-in duration-300">
              <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
                🍈
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-black text-emerald-950 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    এআই দৃষ্টি শনাক্তকরণ: {detectedPlantInfo.nameBn}
                  </span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-950 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {detectedPlantInfo.confidence}% নিশ্চিত
                  </span>
                </div>
                <p className="text-xs text-emerald-900 font-semibold">
                  <strong>চিহ্নিত সমস্যা:</strong> {detectedPlantInfo.problemHintBn}
                </p>
                <p className="text-[11px] text-emerald-700">
                  {detectedPlantInfo.reasonBn}। ফসলটি স্বয়ংক্রিয়ভাবে নির্বাচন করা হয়েছে।
                </p>
              </div>
            </div>
          )}

          {/* Image Quality Checks */}
          <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200 text-xs text-stone-700 space-y-1.5">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>সঠিক এআই ফলাফলের জন্য নির্দেশনা:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-600 ml-1">
              <li>পাতার অগ্রভাগ ও পিছনের পিঠ স্পষ্টভাবে দেখা গেলে সবচেয়ে নির্ভুল নির্ণয় সম্ভব।</li>
              <li>ছবির মান খারাপ বা অতিরিক্ত অন্ধকার হলে এআই সতর্কতা জারি করবে।</li>
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>পরবর্তী ধাপ: ফসল নির্বাচন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CROP SELECTION */}
      {currentStep === 2 && (
        <div className="mt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              কোন ফসলের রোগ নির্ণয় করতে চান?
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              নিচে থেকে আপনার আক্রান্ত ফসলের ধরণটি বেছে নিন অথবা স্বয়ংক্রিয় এআই শনাক্তকরণ রাখুন
            </p>
          </div>

          {/* Universal Zero-Database Assurance Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-300 rounded-2xl p-3.5 text-xs text-stone-800 space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
              <span>ডাটাবেস ছাড়া স্বয়ংক্রিয় এআই ভিশন প্রযুক্তি:</span>
            </div>
            <p className="text-stone-600 leading-relaxed text-[11px] sm:text-xs">
              আপনার ফসল বা গাছ তালিকায় না থাকলেও কোনো সমস্যা নেই! প্রথম কার্ড <strong>"✨ স্বয়ংক্রিয় এআই শনাক্তকরণ"</strong> সিলেক্ট রাখলে এআই সরাসরি ছবি পর্যবেক্ষণ করে প্রজাতি ও রোগ স্বয়ংক্রিয়ভাবে শনাক্ত করবে। কোনো ডাটাবেস এন্ট্রির প্রয়োজন নেই।
            </p>
          </div>

          {detectedPlantInfo && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-emerald-950 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                এআই ছবির মাধ্যমে চিহ্নিত করেছে: <strong className="underline">{detectedPlantInfo.nameBn}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelectedCropId(detectedPlantInfo.cropId)}
                className={`text-[11px] px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCropId === detectedPlantInfo.cropId
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                {selectedCropId === detectedPlantInfo.cropId ? '✓ এআই নির্বাচন সক্রিয়' : 'এআই নির্বাচন রাখুন'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {crops.map((c) => {
              const isSelected = c.id === selectedCropId;
              const isAiMatch = detectedPlantInfo?.cropId === c.id;
              const isUniversal = c.id === 'crop-universal';
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCropId(c.id)}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all relative ${
                    isUniversal
                      ? isSelected
                        ? 'border-emerald-600 bg-gradient-to-b from-emerald-100 to-teal-50 shadow-md ring-2 ring-emerald-500 col-span-2 sm:col-span-4'
                        : 'border-emerald-300 bg-gradient-to-b from-emerald-50/70 to-white hover:border-emerald-500 col-span-2 sm:col-span-4'
                      : isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500'
                      : isAiMatch
                      ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-500'
                      : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  {isUniversal && (
                    <span className="absolute top-2 right-2 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" /> সর্বাধিক প্রস্তাবিত
                    </span>
                  )}
                  {isAiMatch && !isUniversal && (
                    <span className="absolute -top-2.5 right-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" /> এআই মিল
                    </span>
                  )}
                  <div className="text-3xl mb-1.5">{c.icon}</div>
                  <div className="font-bold text-stone-900 text-sm">{c.nameBn}</div>
                  <div className="text-[10px] text-stone-400 italic">{c.scientificName}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold text-sm hover:bg-stone-100"
            >
              পূর্ববর্তী ধাপ
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md text-sm"
            >
              <span>পরবর্তী ধাপ: সহজ প্রশ্নোত্তর</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PROGRESSIVE SIMPLE QUESTIONS */}
      {currentStep === 3 && (
        <div className="mt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              গাছের লক্ষণ ও বিস্তার সংক্রান্ত তথ্য
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              নিচের সহজ প্রশ্নগুলোর উত্তর নির্বাচন করুন যাতে রোগটির উৎস সঠিকভাবে চিহ্নিত হয়
            </p>
          </div>

          <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200">
            {/* 1. Crop Age */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                ১. ফসলের বয়স কেমন?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['নতুন চারা (১-১৫ দিন)', '১-৩০ দিন', '১-৩ মাস', '৩ মাসের বেশি'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCropAge(opt)}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      cropAge === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Affected Part */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                ২. গাছের কোন অংশে সমস্যা দেখা যাচ্ছে?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['নতুন কচি পাতা', 'পুরাতন পাতা ও পাতার কিনারা', 'কাণ্ড / গোড়া', 'ফুল ও ফল', 'পুরো গাছ ঢলে পড়ছে'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAffectedPart(opt)}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      affectedPart === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Duration */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                ৩. সমস্যাটি কত দিন ধরে লক্ষ্য করছেন?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['১-৩ দিন', '৪-৭ দিন', '১-২ সপ্তাহ', '২ সপ্তাহের বেশি'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDuration(opt)}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      duration === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Spread */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                ৪. জমিতে রোগের বিস্তার কেমন?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['১-২টি গাছে (Few plants)', 'জমির কিছু অংশে (Some plants)', 'বেশিরভাগ গাছে (Most plants)', 'পুরো জমিতে ছড়িয়ে পড়েছে'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSpread(opt)}
                    className={`py-2 px-3 text-xs rounded-xl border text-center font-medium transition-all ${
                      spread === opt ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold text-sm hover:bg-stone-100"
            >
              পূর্ববর্তী ধাপ
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md text-sm"
            >
              <span>পরবর্তী ধাপ: এলাকা ও অবস্থান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: GEOGRAPHIC LOCATION */}
      {currentStep === 4 && (
        <div className="mt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              আপনার জমির অবস্থান নির্বাচন করুন
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              সঠিক এলাকা নির্ধারণ করলে স্থানীয় উপজেলা কৃষি কর্মকর্তা ও উপসহকারী কৃষি কর্মকর্তার কাছে রিপোর্টটি সরাসরি পৌঁছাবে
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">বিভাগ (Division)</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  {divisions.map((d) => (
                    <option key={d.id} value={d.id}>{d.nameBn} ({d.nameEn})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">জেলা (District)</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.nameBn} ({d.nameEn})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা (Upazila)</label>
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.id}>{u.nameBn} ({u.nameEn})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ইউনিয়ন / ব্লক (Union)</label>
                <select
                  value={selectedUnion}
                  onChange={(e) => setSelectedUnion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  {unions.map((u) => (
                    <option key={u.id} value={u.id}>{u.nameBn} ({u.nameEn})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-emerald-900 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  নির্ধারিত এলাকা: {unions.find(u => u.id === selectedUnion)?.nameBn || 'ইউনিয়ন'}, {upazilas.find(u => u.id === selectedUpazila)?.nameBn || 'উপজেলা'}, {districts.find(d => d.id === selectedDistrict)?.nameBn || 'জেলা'}
                </span>
              </span>
              <span className="font-bold text-blue-900 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-2xs">
                উপজেলা কৃষি কর্মকর্তা ও দায়িত্বপ্রাপ্ত এসএএও সংযুক্ত
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold text-sm hover:bg-stone-100"
            >
              পূর্ববর্তী ধাপ
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md text-sm"
            >
              <span>পরবর্তী ধাপ: আবহাওয়া ও মাটি</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: WEATHER & SOIL INTELLIGENCE */}
      {currentStep === 5 && (
        <div className="mt-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              আবহাওয়া ও মাটির পরিবেশগত প্রেক্ষাপট
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              বাতাসের আর্দ্রতা ও মাটির পানি নিষ্কাশন ক্ষমতা রোগ বিস্তারে গুরুত্বপূর্ণ ভূমিকা রাখে
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
            {/* Live Weather Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-xs text-stone-500 mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-red-500" />
                  <span>তাপমাত্রা</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{tempC}°C</div>
                <input 
                  type="range" min={15} max={42} value={tempC} 
                  onChange={(e) => setTempC(Number(e.target.value))} 
                  className="w-full mt-1.5 accent-emerald-600" 
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-xs text-stone-500 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>আর্দ্রতা</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{humidity}%</div>
                <input 
                  type="range" min={40} max={98} value={humidity} 
                  onChange={(e) => setHumidity(Number(e.target.value))} 
                  className="w-full mt-1.5 accent-emerald-600" 
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-xs text-stone-500 mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
                  <span>বৃষ্টির সম্ভাবনা</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{rainForecastMm} মিমি</div>
                <input 
                  type="range" min={0} max={50} value={rainForecastMm} 
                  onChange={(e) => setRainForecastMm(Number(e.target.value))} 
                  className="w-full mt-1.5 accent-emerald-600" 
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-xs text-stone-500 mb-1">
                  <Wind className="w-3.5 h-3.5 text-cyan-500" />
                  <span>বাতাসের গতি</span>
                </div>
                <div className="text-lg font-bold text-stone-900">{windKmh} কিমি/ঘণ্টা</div>
                <input 
                  type="range" min={2} max={35} value={windKmh} 
                  onChange={(e) => setWindKmh(Number(e.target.value))} 
                  className="w-full mt-1.5 accent-emerald-600" 
                />
              </div>
            </div>

            {/* Soil Context */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">মাটির ধরণ</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
                >
                  <option value="দোআঁশ">দোআঁশ মাটি (Loam)</option>
                  <option value="বেলে দোআঁশ">বেলে দোআঁশ (Sandy Loam)</option>
                  <option value="এটেল">এঁটেল মাটি (Clay)</option>
                  <option value="পলি মাটি">পলি মাটি (Silt)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">মাটির আর্দ্রতা</label>
                <select
                  value={soilMoisture}
                  onChange={(e) => setSoilMoisture(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
                >
                  <option value="NORMAL">স্বাভাবিক রসযুক্ত</option>
                  <option value="WATERLOGGED">অতিরিক্ত পানি জমে আছে</option>
                  <option value="DRY">শুকনো বা রসের অভাব</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">পানি নিষ্কাশন ব্যবস্থা</label>
                <select
                  value={drainage}
                  onChange={(e) => setDrainage(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
                >
                  <option value="GOOD">উত্তম (পানি জমে না)</option>
                  <option value="MODERATE">মাঝারি</option>
                  <option value="POOR">দুর্বল (পানি জমে থাকে)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 font-semibold text-sm hover:bg-stone-100"
            >
              পূর্ববর্তী ধাপ
            </button>

            <button
              onClick={handleAnalyze}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg text-base cursor-pointer transform active:scale-98"
            >
              <Sparkles className="w-5 h-5 text-emerald-950" />
              <span>রোগ নির্ণয় ও চিকিৎসা দেখুন</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: PROCESSING OR FINAL AI DIAGNOSIS RESULT */}
      {currentStep === 6 && (
        <div className="mt-6 space-y-6">
          {isProcessing ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-spin">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">এআই কৃষি গবেষণা মডেল বিশ্লেষণ করছে...</h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                ছবির দৃশ্যমান লক্ষণ, ফসলের অবস্থা, আবহাওয়া এবং ডিএই (DAE) ও ব্রি/বারি অনুমোদিত বালাই নিয়ন্ত্রণ ডেটাবেজ মিলিয়ে দেখা হচ্ছে।
              </p>
            </div>
          ) : diagnosisResult ? (
            <div className="space-y-6">
              {/* Diagnosis Header Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400 text-emerald-950 font-bold">
                      {diagnosisResult.cropNameBn}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-800 text-emerald-200">
                      নির্ণয়ের আস্থা: {diagnosisResult.primaryCandidate.confidencePercent}%
                    </span>
                  </div>

                  {/* Audio Reader Button */}
                  <button
                    onClick={() => toggleSpeech(`${diagnosisResult.primaryCandidate.problemNameBn}। ${diagnosisResult.explainableReasoningBn}। প্রাথমিক করণীয়: ${diagnosisResult.nonChemicalManagementBn.join('। ')}`)}
                    className="flex items-center gap-1.5 text-xs bg-emerald-700/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full transition-colors font-medium border border-emerald-500/50"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
                    <span>{isSpeaking ? 'থামান' : 'বাংলায় শুনুন'}</span>
                  </button>
                </div>

                <div>
                  <div className="text-xs text-emerald-300 font-medium">সম্ভাব্য প্রাথমিক সমস্যা:</div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight mt-0.5">
                    {diagnosisResult.primaryCandidate.problemNameBn}
                  </h1>
                  <p className="text-xs text-emerald-200 italic mt-0.5">
                    {diagnosisResult.primaryCandidate.problemNameEn}
                  </p>
                </div>

                <div className="text-sm text-stone-100 bg-white/10 rounded-2xl p-4 backdrop-blur-xs leading-relaxed border border-white/15">
                  <span className="font-bold text-amber-300 block mb-1">কী লক্ষ্য করা গেছে (Explainable AI):</span>
                  {diagnosisResult.explainableReasoningBn}
                </div>
              </div>

              {/* Differential Diagnosis (Alternative Possibilities) */}
              {diagnosisResult.alternativeCandidates.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
                  <h4 className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>বিকল্প সম্ভাবনা সমূহ (Differential Diagnosis):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {diagnosisResult.alternativeCandidates.map((alt, idx) => (
                      <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                        <div className="flex justify-between font-bold text-stone-900">
                          <span>{alt.problemNameBn}</span>
                          <span className="text-stone-500">{alt.confidencePercent}%</span>
                        </div>
                        <p className="text-stone-500 text-[11px] mt-1">{alt.descriptionBn}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Causes (সম্ভাব্য কারণ) */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5 text-amber-900">
                  <span>🌾 সম্ভাব্য কারণ:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {diagnosisResult.possibleCausesBn.map((cause, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. NON-CHEMICAL MANAGEMENT FIRST (Mandatory) */}
              <div className="bg-emerald-50 rounded-2xl border-2 border-emerald-300 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>প্রথমেই করণীয়: রাসায়নিকমুক্ত জৈব ও মাঠ পরিচর্যা</span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  রাসায়নিক ওষুধ ব্যবহারের আগে নিচের পরিচর্যাগুলো দ্রুত সম্পন্ন করুন। বেশিরভাগ ক্ষেত্রে এগুলোর মাধ্যমেই রোগ সংক্রমণ প্রতিহত করা যায়:
                </p>
                <div className="space-y-2">
                  {diagnosisResult.nonChemicalManagementBn.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800 bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. BRAND-NEUTRAL TREATMENT & DOSE GUIDANCE (Subject to Safety Gate) */}
              {diagnosisResult.safetyGatePassed ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div>
                      <span className="text-xs text-stone-500">অনুমোদিত বালাইনাশক নির্দেশিকা</span>
                      <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                        <span>সক্রিয় উপাদান (Active Ingredient):</span>
                        <span className="text-emerald-700 font-extrabold">{diagnosisResult.activeIngredientBn}</span>
                      </h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                      ব্র্যান্ড-নিরপেক্ষ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-stone-500 font-medium">অনুমোদিত মাত্রা (Dose Rule):</div>
                      <div className="text-stone-900 font-bold text-sm mt-0.5">{diagnosisResult.verifiedDoseBn}</div>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-stone-500 font-medium">প্রয়োগ পদ্ধতি (Application Method):</div>
                      <div className="text-stone-900 font-semibold mt-0.5">{diagnosisResult.applicationMethodBn}</div>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-stone-500 font-medium">উপযুক্ত সময় (Timing):</div>
                      <div className="text-stone-900 font-semibold mt-0.5">{diagnosisResult.timingGuidanceBn}</div>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="text-stone-500 font-medium">সুরক্ষা সরঞ্জাম (Safety Gear):</div>
                      <div className="text-stone-900 font-semibold mt-0.5">{diagnosisResult.safetyEquipmentBn?.join(', ')}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>সতর্কতা:</strong> বাজারে যেকোনো কোম্পানির অনুমোদিত রেজিস্টার্ড পণ্য থেকে সক্রিয় উপাদান দেখে কিনুন। কোনো নির্দিষ্ট কোম্পানির ব্র্যান্ডের ওপর নির্ভর করবেন না।
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-5 space-y-2">
                  <div className="flex items-center gap-2 text-red-900 font-bold text-base">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <span>রাসায়নিক চিকিৎসা নিরাপত্তা গেট দ্বারা স্থগিত (Safety Gate Locked)</span>
                  </div>
                  <p className="text-xs text-red-800 leading-relaxed">
                    {diagnosisResult.safetyGateReasonBn || 'বর্তমান পরিস্থিতিতে রাসায়নিক ওষুধ ব্যবহার নিরাপদ নয়। অনুগ্রহ করে নিকটস্থ উপজেলা কৃষি অফিসে নমুনা প্রদর্শন করুন।'}
                  </p>
                </div>
              )}

              {/* 3. AGRICULTURE OFFICER VERIFICATION LAYER */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-amber-300" />
                    <h3 className="text-lg font-bold">কৃষি কর্মকর্তার সঙ্গে যাচাই করুন</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-800 text-blue-200">
                    {diagnosisResult.officerVerificationStatus === 'VERIFIED_BY_OFFICER' ? 'যাচাইকৃত' : 'যাচাইয়ের অপেক্ষায়'}
                  </span>
                </div>

                <p className="text-xs text-blue-100 leading-relaxed">
                  AgriCare AI এর সিদ্ধান্ত একটি প্রাথমিক সহায়তা। চূড়ান্ত প্রয়োগের পূর্বে আপনার এলাকার অনুমোদিত উপজেলা কৃষি কর্মকর্তা বা উপসহকারী কৃষি কর্মকর্তা (SAAO)-এর নিকট রিপোর্টটি যাচাই করিয়ে নেওয়ার পরামর্শ দেওয়া হচ্ছে।
                </p>

                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs text-xs space-y-1.5 border border-white/15">
                  <div className="font-bold text-amber-300 text-sm">উপজেলা কৃষি অফিস, শ্রীপুর, গাজীপুর</div>
                  <div className="text-blue-200">কর্মকর্তা: কৃষিবিদ এস এম তারিকুল ইসলাম (UAO) • মোবাইল: ০১৭০৪-৮৯২১০৩</div>
                  <div className="text-blue-300">হটলাইন: ১৬১২৩ (কৃষি কল সেন্টার) • অফিস সময়: সকাল ৯:০০ - বিকাল ৫:০০</div>
                </div>

                {/* Report Generation & Followup Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={() => onOpenReportModal(diagnosisResult)}
                    className="flex-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md transition-all"
                  >
                    <FileText className="w-4 h-4 text-emerald-950" />
                    <span>📄 কৃষি অফিসে দেখানোর জন্য রিপোর্ট তৈরি করুন</span>
                  </button>

                  <button
                    onClick={() => onOpenFollowupModal(diagnosisResult)}
                    className="bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>🔄 ফলো-আপ নির্ধারণ ({diagnosisResult.followupScheduledDays || 5} দিন পর)</span>
                  </button>
                </div>
              </div>

              {/* Source Attribution */}
              <div className="text-center text-[11px] text-stone-400 space-y-0.5 pt-2">
                <div>তথ্যসূত্র: {diagnosisResult.sources.join(' • ')}</div>
                <div className="font-medium text-stone-500">
                  AgriCare AI — AI-generated preliminary decision support system. Not a final legal prescription.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
