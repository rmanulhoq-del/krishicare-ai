import React, { useState, useEffect } from 'react';
import { Sprout, PlusCircle, MapPin, Layers, CheckCircle2, ArrowRight, Trash2, Calculator } from 'lucide-react';
import { User, Crop } from '../types';
import { FertilizerCalculatorModal } from './FertilizerCalculatorModal';

export interface FarmField {
  id: string;
  farmerId: string;
  farmNameBn: string;
  fieldNameBn: string;
  areaDecimel: number;
  cropId: string;
  cropNameBn: string;
  soilType: string;
  drainage: string;
  plantingDateBn: string;
}

interface MyFarmsViewProps {
  currentUser: User;
  onStartDiagnosisForField: (field: FarmField) => void;
  onBack: () => void;
}

export const MyFarmsView: React.FC<MyFarmsViewProps> = ({
  currentUser,
  onStartDiagnosisForField,
  onBack
}) => {
  const [fields, setFields] = useState<FarmField[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage && currentUser?.id) {
        const saved = localStorage.getItem(`agricare_fields_${currentUser.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) { /* ignore */ }
    return [
      {
        id: 'fld-1',
        farmerId: currentUser.id,
        farmNameBn: 'কাশেমের সবুজ খামার',
        fieldNameBn: 'উত্তরপাড়া ধানি জমি (প্লট ১)',
        areaDecimel: 33,
        cropId: 'crop-rice',
        cropNameBn: 'ধান (ব্রি ধান ২৮)',
        soilType: 'দোআঁশ',
        drainage: 'MODERATE',
        plantingDateBn: '১৫ জানুয়ারি, ২০২৬'
      },
      {
        id: 'fld-2',
        farmerId: currentUser.id,
        farmNameBn: 'কাশেমের সবুজ খামার',
        fieldNameBn: 'বাড়ির পাশের সবজি ক্ষেত (প্লট ২)',
        areaDecimel: 15,
        cropId: 'crop-tomato',
        cropNameBn: 'টমেটো',
        soilType: 'বেলে দোআঁশ',
        drainage: 'GOOD',
        plantingDateBn: '০১ ফেব্রুয়ারি, ২০২৬'
      }
    ];
  });

  const [crops, setCrops] = useState<Crop[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showFertilizerModal, setShowFertilizerModal] = useState<boolean>(false);
  const [selectedFieldForFertilizer, setSelectedFieldForFertilizer] = useState<FarmField | null>(null);

  // Form State
  const [farmName, setFarmName] = useState<string>('আমার পারিবারিক খামার');
  const [fieldName, setFieldName] = useState<string>('');
  const [area, setArea] = useState<number>(20);

  const [selectedCropId, setSelectedCropId] = useState<string>('crop-rice');
  const [soilType, setSoilType] = useState<string>('দোআঁশ');
  const [drainage, setDrainage] = useState<string>('GOOD');
  const [plantingDate, setPlantingDate] = useState<string>('চলতি মৌসুম');

  useEffect(() => {
    fetch('/api/crops').then(res => res.json()).then(data => {
      setCrops(data);
      if (data.length > 0) setSelectedCropId(data[0].id);
    }).catch(console.error);
  }, []);

  const saveFields = (newFields: FarmField[]) => {
    setFields(newFields);
    localStorage.setItem(`agricare_fields_${currentUser.id}`, JSON.stringify(newFields));
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName) return;

    const matchedCrop = crops.find(c => c.id === selectedCropId);

    const newField: FarmField = {
      id: `fld-${Date.now()}`,
      farmerId: currentUser.id,
      farmNameBn: farmName,
      fieldNameBn: fieldName,
      areaDecimel: Number(area),
      cropId: selectedCropId,
      cropNameBn: matchedCrop?.nameBn || 'ধান',
      soilType,
      drainage,
      plantingDateBn: plantingDate
    };

    saveFields([newField, ...fields]);
    setShowAddModal(false);
    setFieldName('');
  };

  const handleDeleteField = (id: string) => {
    if (confirm('আপনি কি এই জমিটির তথ্য মুছে ফেলতে চান?')) {
      saveFields(fields.filter(f => f.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-emerald-500/40 mb-2">
            <Sprout className="w-4 h-4" />
            <span>আমার খামার, জমি ও শস্য ব্যবস্থাপনা (Farms & Fields)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            আমার ফসলি জমির প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-xl">
            আপনার খামারের প্রতিটি প্লটের জমির পরিমাণ, মাটির ধরন ও বর্তমান ফসলের তথ্য সংরক্ষণ করুন। যেকোনো জমির জন্য সরাসরি রোগ নির্ণয় শুরু করতে পারেন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedFieldForFertilizer(null);
              setShowFertilizerModal(true);
            }}
            className="bg-emerald-700/80 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border border-emerald-500/50 shadow-md transition-all cursor-pointer"
          >
            <span>🧮 সার ক্যালকুলেটর</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন জমি / প্লট যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Fields List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>নিবন্ধিত জমির তালিকা ({fields.length}টি প্লট)</span>
          </h2>
        </div>

        {fields.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
            <div className="text-4xl">🌾</div>
            <h3 className="font-bold text-stone-800 text-base">কোনো জমির প্লট যুক্ত করা হয়নি</h3>
            <p className="text-xs max-w-sm mx-auto">
              উপরে "নতুন জমি যোগ করুন" বাটনে চাপ দিয়ে আপনার জমির তথ্য ও বর্তমান ফসল যোগ করুন।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-emerald-400 transition-all space-y-4 hover:shadow-md"
              >
                <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {field.farmNameBn}
                    </span>
                    <h3 className="font-bold text-stone-900 text-base mt-1">
                      {field.fieldNameBn}
                    </h3>
                    <div className="text-xs text-stone-500 mt-0.5">
                      রোপণ / বপন: {field.plantingDateBn}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="text-stone-300 hover:text-red-600 p-1 transition-colors"
                    title="জমি মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                  <div>
                    <span className="text-stone-400 block text-[10px]">বর্তমান ফসল:</span>
                    <span className="font-bold text-stone-900">{field.cropNameBn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">জমির পরিমাণ:</span>
                    <span className="font-bold text-stone-900">{field.areaDecimel} শতক (Decimal)</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">মাটির ধরন:</span>
                    <span className="font-semibold text-stone-800">{field.soilType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">নিষ্কাশন সুবিধা:</span>
                    <span className="font-semibold text-stone-800">
                      {field.drainage === 'GOOD' ? 'উত্তম' : field.drainage === 'POOR' ? 'দুর্বল' : 'মাঝারি'}
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedFieldForFertilizer(field);
                      setShowFertilizerModal(true);
                    }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>🧮 এই প্লটের সারের হিসাব</span>
                  </button>
                  <button
                    onClick={() => onStartDiagnosisForField(field)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Sprout className="w-3.5 h-3.5" />
                    <span>এই জমির গাছের রোগ নির্ণয় করুন</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Field Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-stone-900 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-700" />
                <span>নতুন জমির বিবরণ যোগ করুন</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700 text-sm">✕</button>
            </div>

            <form onSubmit={handleAddField} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">খামারের নাম:</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">জমির নাম / প্লট নম্বর:</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: দক্ষিণপাড়া ১ নম্বর ধানের জমি"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">বর্তমান ফসল:</label>
                  <select
                    value={selectedCropId}
                    onChange={(e) => setSelectedCropId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  >
                    {crops.map((c) => (
                      <option key={c.id} value={c.id}>{c.nameBn} ({c.nameEn})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">জমির পরিমাণ (শতক):</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">মাটির ধরন:</label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="দোআঁশ">দোআঁশ মাটি</option>
                    <option value="বেলে দোআঁশ">বেলে দোআঁশ</option>
                    <option value="এঁটেল মাটি">এঁটেল মাটি</option>
                    <option value="পলি মাটি">পলি মাটি</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">পানি নিষ্কাশন:</label>
                  <select
                    value={drainage}
                    onChange={(e) => setDrainage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                  >
                    <option value="GOOD">উত্তম (পানি জমে না)</option>
                    <option value="MODERATE">মাঝারি</option>
                    <option value="POOR">দুর্বল (পানি জমে থাকে)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">রোপণ বা বপনের তারিখ / সময়কাল:</label>
                <input
                  type="text"
                  placeholder="যেমন: ১৫ জানুয়ারি, ২০২৬"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-semibold text-stone-700 hover:bg-stone-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-xl shadow-sm"
                >
                  জমি সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scientific Fertilizer Calculator Modal */}
      <FertilizerCalculatorModal
        isOpen={showFertilizerModal}
        onClose={() => setShowFertilizerModal(false)}
        initialCropName={selectedFieldForFertilizer?.cropNameBn}
        initialAreaDecimel={selectedFieldForFertilizer?.areaDecimel || 20}
      />
    </div>
  );
};
