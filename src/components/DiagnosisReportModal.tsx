import React from 'react';
import { Printer, Download, X, ShieldAlert, CheckCircle2, Building2, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { Diagnosis } from '../types';

interface DiagnosisReportModalProps {
  diagnosis: Diagnosis;
  onClose: () => void;
}

export const DiagnosisReportModal: React.FC<DiagnosisReportModalProps> = ({
  diagnosis,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 text-stone-900 relative">
        {/* Action Bar (Hidden in Print) */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-stone-200 flex justify-between items-center z-10 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="font-bold text-stone-800 text-sm sm:text-base">
              কৃষি সিদ্ধান্ত সহায়তা রিপোর্ট (অফিসিয়াল প্রেসক্রিপশন প্রস্তুতি)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-4 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট / PDF সংরক্ষণ করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="p-6 sm:p-10 space-y-6 text-stone-800 text-sm leading-relaxed" id="printable-report">
          {/* Official Letterhead Header */}
          <div className="border-b-2 border-emerald-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-2xl">
                <span>🌾 AGRICARE AI</span>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-sm">
                  ডিএই ও ব্রি/বারি নির্দেশিকা সমর্থিত
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                কৃষি সিদ্ধান্ত সহায়তা ও বালাই ব্যবস্থাপনা সিস্টেম (গণপ্রজাতন্ত্রী বাংলাদেশ)
              </p>
              <div className="text-[11px] text-stone-500 flex items-center gap-3">
                <span>রিপোর্ট আইডি: <strong className="text-stone-700">{diagnosis.id}</strong></span>
                <span>•</span>
                <span>তারিখ: {new Date(diagnosis.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            <div className="sm:text-right text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <div className="font-bold text-stone-800">উপজেলা কৃষি অফিস, শ্রীপুর, গাজীপুর</div>
              <div>কৃষি সম্প্রসারণ অধিদপ্তর (DAE)</div>
              <div className="text-emerald-700 font-semibold mt-0.5">হটলাইন: ১৬১২৩</div>
            </div>
          </div>

          {/* Critical Disclaimer Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs text-amber-950 flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">গুরুত্বপূর্ণ সতর্কবার্তা (Disclaimer):</span>
              <p className="mt-0.5 leading-relaxed text-amber-900">
                এই রিপোর্টটি কৃত্রিম বুদ্ধিমত্তা (AI) ও স্থানীয় কৃষি নির্দেশিকার সমন্বয়ে তৈরি প্রাথমিক নিরীক্ষণ রিপোর্ট। এটি কোনো চূড়ান্ত আইনি ব্যবস্থাপত্র নয়। রাসায়নিক বিষ প্রয়োগের পূর্বে অবশ্যই স্থানীয় উপসহকারী কৃষি কর্মকর্তা (SAAO) বা উপজেলা কৃষি কর্মকর্তার মতামত গ্রহণ করুন।
              </p>
            </div>
          </div>

          {/* Farmer & Field Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
            <div>
              <div className="text-stone-500">কৃষকের নাম:</div>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{diagnosis.farmerNameBn}</div>
              <div className="text-stone-500 text-[11px]">{diagnosis.farmerPhone}</div>
            </div>

            <div>
              <div className="text-stone-500">ফসল ও জাত:</div>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{diagnosis.cropNameBn}</div>
              <div className="text-stone-500 text-[11px]">{diagnosis.cropAgeBn || 'বয়স উল্লেখ নেই'}</div>
            </div>

            <div>
              <div className="text-stone-500">জমির অবস্থান:</div>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{diagnosis.locationNameBn}</div>
              <div className="text-stone-500 text-[11px]">ইউনিয়ন: মাওনা</div>
            </div>

            <div>
              <div className="text-stone-500">লক্ষণ প্রকাশকাল:</div>
              <div className="font-bold text-stone-900 text-sm mt-0.5">{diagnosis.durationBn || '৪-৭ দিন'}</div>
              <div className="text-stone-500 text-[11px]">বিস্তার: {diagnosis.spreadBn || 'কিছু অংশে'}</div>
            </div>
          </div>

          {/* Image & Primary Diagnosis Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700">নমুনার ছবি (Plant Sample):</div>
              <img 
                src={diagnosis.imageUrl} 
                alt="Plant Pathology" 
                className="w-full h-48 object-cover rounded-xl border border-stone-300 shadow-2xs" 
              />
              <div className="text-[11px] text-stone-500 flex justify-between">
                <span>মানের অবস্থা: {diagnosis.imageQuality}</span>
                <span>আস্থা মাত্রা: {diagnosis.overallConfidence}</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div>
                <span className="text-xs font-semibold text-emerald-800">এআই প্রাথমিক রোগ নির্ণয়:</span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  {diagnosis.primaryCandidate.problemNameBn}
                </h3>
                <div className="text-xs text-stone-500 italic">
                  {diagnosis.primaryCandidate.problemNameEn} • আস্থা স্কোর: {diagnosis.primaryCandidate.confidencePercent}%
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-bold text-stone-800">পর্যবেক্ষিত লক্ষণসমূহ:</div>
                <p className="leading-relaxed">{diagnosis.explainableReasoningBn}</p>
              </div>

              {/* Alternative Possibilities */}
              {diagnosis.alternativeCandidates.length > 0 && (
                <div className="text-xs space-y-1">
                  <div className="font-bold text-stone-600">বিকল্প সম্ভাবনা (Differential Diagnosis):</div>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.alternativeCandidates.map((alt, i) => (
                      <span key={i} className="px-2.5 py-1 bg-stone-100 rounded-lg border border-stone-200 text-stone-700">
                        {alt.problemNameBn} ({alt.confidencePercent}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Environmental Context (Weather & Soil) */}
          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 text-xs space-y-2">
            <div className="font-bold text-blue-950 flex items-center gap-1.5">
              <span>🌦️ আবহাওয়া ও মাটির প্রভাব:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-700">
              <div>তাপমাত্রা: <strong>{diagnosis.weather.temperatureC}°C</strong></div>
              <div>আর্দ্রতা: <strong>{diagnosis.weather.humidityPercent}%</strong></div>
              <div>মাটির ধরণ: <strong>{diagnosis.soil.soilType || 'দোআঁশ'}</strong></div>
              <div>মাটির অবস্থা: <strong>{diagnosis.soil.drainageCondition === 'POOR' ? 'নিষ্কাশন দুর্বল' : 'স্বাভাবিক'}</strong></div>
            </div>
          </div>

          {/* Non-Chemical Management First */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs space-y-2">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>১. অগ্রাধিকারমূলক পরিচর্যা: রাসায়নিকমুক্ত জৈব ও মাঠ ব্যবস্থাপনা</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-emerald-900 ml-1">
              {diagnosis.nonChemicalManagementBn.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>

          {/* Brand-Neutral Active Ingredient & Verified Dose Rule */}
          {diagnosis.safetyGatePassed && diagnosis.activeIngredientBn ? (
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-stone-200 pb-1.5">
                <span className="font-bold text-stone-900 text-sm">
                  ২. অনুমোদিত বালাইনাশকের সক্রিয় উপাদান ও প্রয়োগ বিধি (Brand-Neutral Rule)
                </span>
                <span className="text-[11px] text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded">
                  কোনো ব্র্যান্ডের প্রচারণা নয়
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700">
                <div>
                  <div className="text-stone-500">সক্রিয় উপাদান:</div>
                  <div className="font-bold text-stone-900 text-sm">{diagnosis.activeIngredientBn}</div>
                  <div className="text-[11px] text-stone-500">অনুমোদিত ফর্মুলেশন: {diagnosis.formulationBn}</div>
                </div>

                <div>
                  <div className="text-stone-500">অনুমোদিত মাত্রা (Dose):</div>
                  <div className="font-bold text-emerald-800 text-sm">{diagnosis.verifiedDoseBn}</div>
                </div>

                <div>
                  <div className="text-stone-500">প্রয়োগের নিয়ম ও উপযুক্ত সময়:</div>
                  <div>{diagnosis.applicationMethodBn} ({diagnosis.timingGuidanceBn})</div>
                </div>

                <div>
                  <div className="text-stone-500">ফসল সংগ্রহের নিরাপদ সময় (PHI):</div>
                  <div>{diagnosis.preHarvestIntervalDays ? `${diagnosis.preHarvestIntervalDays} দিন পূর্বে প্রয়োগ বন্ধ করতে হবে` : '৭-১৪ দিন'}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-800">
              নিরাপত্তা নীতিমালার কারণে এই ক্ষেত্রে রাসায়নিকের সরাসরি পরামর্শ দেওয়া হয়নি। কৃষি কর্মকর্তার সুপারিশ বাধ্যতামূলক।
            </div>
          )}

          {/* Verified Local Dealer Referral Banner for Real Inputs */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 rounded-2xl border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏪</span>
              <div>
                <strong className="text-stone-900 font-extrabold block">আসল বালাইনাশক ও সার সংগ্রহের সতর্কতা:</strong>
                <span className="text-stone-600 text-[11px]">
                  ভেজাল ও নকল ওষুধ এড়াতে কেবল বাঁশখালী ও অনুমোদিত বিসিআইসি/বিএডিসি ডিলারদের থেকে সিলগালা পণ্য কিনুন।
                </span>
              </div>
            </div>
            <div className="text-[11px] text-amber-900 font-bold bg-white px-3 py-1.5 rounded-xl border border-amber-300 shrink-0">
              📞 ডিলার সহায়তা: ১৬১২৩
            </div>
          </div>

          {/* Official Verification Box (Signature Space for Krishi Officer) */}
          <div className="border-2 border-dashed border-stone-300 rounded-2xl p-5 space-y-3 bg-stone-50/50">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-900 text-xs uppercase tracking-wide">
                উপজেলা কৃষি কর্মকর্তার প্রত্যয়ন ও স্বাক্ষর (Official Verification Area)
              </span>
              <span className="text-xs text-stone-500">
                অবস্থা: {diagnosis.officerVerificationStatus === 'VERIFIED_BY_OFFICER' ? '✅ অনুমোদিত' : '⏳ যাচাইয়ের অপেক্ষায়'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="text-xs space-y-1">
                <div className="text-stone-500">কর্মকর্তার মন্তব্য বা সংশোধিত মাত্রা:</div>
                <div className="h-16 border-b border-stone-300">
                  {diagnosis.officerRemarksBn && (
                    <p className="font-semibold text-stone-800">{diagnosis.officerRemarksBn}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-end text-xs text-right space-y-1">
                <div className="h-12"></div>
                <div className="border-t border-stone-400 pt-1 font-bold text-stone-800">
                  উপসহকারী / উপজেলা কৃষি কর্মকর্তা
                </div>
                <div className="text-stone-500 text-[11px]">সিল ও তারিখ</div>
              </div>
            </div>
          </div>

          {/* Footer Attribution */}
          <div className="border-t border-stone-200 pt-3 text-[11px] text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-1.5">
            <span>উৎস: {diagnosis.sources.join(', ')}</span>
            <span className="font-bold text-emerald-800">
              Developed & Powered by Ynanx Lab • AgriCare AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
