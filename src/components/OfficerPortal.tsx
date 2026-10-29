import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, XCircle, 
  HelpCircle, Eye, Calendar, User, Phone, MapPin, 
  Droplets, Thermometer, Wind, FileText, Send 
} from 'lucide-react';
import { Diagnosis } from '../types';

interface OfficerPortalProps {
  diagnoses: Diagnosis[];
  onUpdateDiagnosis: (diag: Diagnosis) => void;
  onOpenReportModal: (diag: Diagnosis) => void;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  diagnoses,
  onUpdateDiagnosis,
  onOpenReportModal
}) => {
  const [selectedCase, setSelectedCase] = useState<Diagnosis | null>(null);
  const [reviewAction, setReviewAction] = useState<'VERIFIED_BY_OFFICER' | 'MODIFIED_BY_OFFICER' | 'REJECTED_BY_OFFICER' | 'MORE_INFO_REQUESTED'>('VERIFIED_BY_OFFICER');
  const [remarks, setRemarks] = useState<string>('');
  const [verifiedDose, setVerifiedDose] = useState<string>('');
  const [followupDays, setFollowupDays] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const safeDiagnoses = Array.isArray(diagnoses) ? diagnoses : [];
  const pendingCases = safeDiagnoses.filter(d => d.officerVerificationStatus === 'PENDING_OFFICER_REVIEW');
  const reviewedCases = safeDiagnoses.filter(d => d.officerVerificationStatus !== 'PENDING_OFFICER_REVIEW');

  const handleSelectCase = (diag: Diagnosis) => {
    setSelectedCase(diag);
    setRemarks(diag.officerRemarksBn || '');
    setVerifiedDose(diag.officerVerifiedDoseBn || diag.verifiedDoseBn || '');
    setFollowupDays(diag.followupScheduledDays || 5);
  };

  const handleSaveReview = async () => {
    if (!selectedCase) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/diagnoses/${selectedCase.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewAction,
          officerRemarksBn: remarks,
          officerVerifiedDoseBn: verifiedDose,
          followupDays
        })
      });

      if (!res.ok) throw new Error('Failed to verify case');
      const updated = await res.json();
      onUpdateDiagnosis(updated);
      setSelectedCase(null);
      alert('কৃষি কর্মকর্তা হিসেবে আপনার পর্যালোচনা সফলভাবে সম্পন্ন ও কৃষকের কাছে প্রেরিত হয়েছে।');
    } catch (err) {
      console.error(err);
      alert('পর্যালোচনা সংরক্ষণ ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-emerald-500/40 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>উপজেলা কৃষি কর্মকর্তা ড্যাশবোর্ড (Human-in-the-Loop)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            মাঠপর্যায়ের কেস পর্যালোচনা ও প্রত্যয়ন
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-xl">
            কৃষকদের এআই ডায়াগনোসিস বিশ্লেষণ করুন, সঠিক মাত্রা ও ব্যবস্থাপনা নিশ্চিত করুন অথবা সরাসরি সংশোধন করুন।
          </p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <div className="text-2xl font-black text-amber-300">{pendingCases.length}</div>
            <div className="text-[11px] text-stone-200">অপেক্ষমাণ কেস</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <div className="text-2xl font-black text-emerald-400">{reviewedCases.length}</div>
            <div className="text-[11px] text-stone-200">যাচাইকৃত কেস</div>
          </div>
        </div>
      </div>

      {/* Main Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Cases List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center justify-between">
            <span>পর্যালোচনার জন্য কেস তালিকা</span>
            <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
              {pendingCases.length} নতুন
            </span>
          </h2>

          <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
            {diagnoses.map((diag) => {
              const isSelected = selectedCase?.id === diag.id;
              const isPending = diag.officerVerificationStatus === 'PENDING_OFFICER_REVIEW';

              return (
                <div
                  key={diag.id}
                  onClick={() => handleSelectCase(diag)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-1 ring-emerald-500'
                      : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={diag.imageUrl}
                      alt={diag.cropNameBn}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-stone-900 text-sm truncate">
                          {diag.primaryCandidate.problemNameBn}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 font-semibold text-stone-700 shrink-0">
                          {diag.cropNameBn}
                        </span>
                      </div>

                      <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-stone-400" />
                        <span>{diag.farmerNameBn} ({diag.farmerPhone})</span>
                      </div>

                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="text-stone-400">{diag.locationNameBn}</span>
                        {isPending ? (
                          <span className="text-amber-700 font-semibold">অপেক্ষমাণ</span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">যাচাইকৃত</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Details & Verification Actions */}
        <div className="lg:col-span-2">
          {selectedCase ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-md">
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      ফসল: {selectedCase.cropNameBn}
                    </span>
                    <span className="text-xs text-stone-500">
                      তারিখ: {new Date(selectedCase.createdAt).toLocaleDateString('bn-BD')}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-stone-900 mt-1">
                    {selectedCase.primaryCandidate.problemNameBn}
                  </h2>
                  <div className="text-xs text-stone-500 italic">
                    {selectedCase.primaryCandidate.problemNameEn} • এআই আস্থা: {selectedCase.primaryCandidate.confidencePercent}%
                  </div>
                </div>

                <button
                  onClick={() => onOpenReportModal(selectedCase)}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-300"
                >
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>রিপোর্ট প্রিভিউ</span>
                </button>
              </div>

              {/* Sample Photo & Farmer Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-stone-700">নমুনার ছবি:</div>
                  <img
                    src={selectedCase.imageUrl}
                    alt="Crop Leaf"
                    className="w-full h-44 object-cover rounded-2xl border border-stone-200 shadow-2xs"
                  />
                  <div className="text-[11px] text-stone-500 flex justify-between px-1">
                    <span>ছবির মান: {selectedCase.imageQuality}</span>
                    <span>তীব্রতা: {selectedCase.severityLevel}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                  <div className="font-bold text-stone-800 border-b border-stone-200 pb-1">
                    কৃষক ও মাঠের বিবরণ:
                  </div>
                  <div>নাম: <strong>{selectedCase.farmerNameBn}</strong></div>
                  <div>মোবাইল: <strong>{selectedCase.farmerPhone}</strong></div>
                  <div>অবস্থান: <strong>{selectedCase.locationNameBn}</strong></div>
                  <div>লক্ষণ দেখা গেছে: <strong>{selectedCase.affectedPartBn}</strong> ({selectedCase.durationBn})</div>
                  <div>আবহাওয়া: {selectedCase.weather.temperatureC}°C, আর্দ্রতা {selectedCase.weather.humidityPercent}%, বৃষ্টি {selectedCase.weather.rainfallForecastMm}মিমি</div>
                  <div>মাটি ও নিষ্কাশন: {selectedCase.soil.soilType}, নিষ্কাশন: {selectedCase.soil.drainageCondition === 'POOR' ? 'দুর্বল' : 'স্বাভাবিক'}</div>
                </div>
              </div>

              {/* AI Explanation & Recommendation */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 text-xs space-y-2">
                <div className="font-bold text-emerald-950">এআই পর্যবেক্ষণ ও প্রস্তাবিত সক্রিয় উপাদান:</div>
                <p className="text-emerald-900 leading-relaxed">{selectedCase.explainableReasoningBn}</p>
                <div className="pt-1 flex flex-wrap gap-3 font-semibold text-emerald-950">
                  <span>উপাদান: {selectedCase.activeIngredientBn || 'অনুমোদিত ছত্রাকনাশক/ব্যাকটেরিয়ানাশক'}</span>
                  <span>প্রস্তাবিত মাত্রা: {selectedCase.verifiedDoseBn}</span>
                </div>
              </div>

              {/* Officer Verification Form */}
              <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-4">
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>কর্মকর্তার সিদ্ধান্ত ও প্রেসক্রিপশন প্রদান:</span>
                </div>

                {/* Verification Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setReviewAction('VERIFIED_BY_OFFICER')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewAction === 'VERIFIED_BY_OFFICER'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>যাচাই ও অনুমোদন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewAction('MODIFIED_BY_OFFICER')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewAction === 'MODIFIED_BY_OFFICER'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>সংশোধিত পরামর্শ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewAction('MORE_INFO_REQUESTED')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewAction === 'MORE_INFO_REQUESTED'
                        ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>আরও তথ্য চান</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewAction('REJECTED_BY_OFFICER')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewAction === 'REJECTED_BY_OFFICER'
                        ? 'bg-red-700 text-white border-red-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>বাতিল করুন</span>
                  </button>
                </div>

                {/* Officer Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      অনুমোদিত বা সংশোধিত মাত্রা (Dose Adjustment):
                    </label>
                    <input
                      type="text"
                      value={verifiedDose}
                      onChange={(e) => setVerifiedDose(e.target.value)}
                      placeholder="যেমন: ২ গ্রাম প্রতি লিটার পানিতে মিশিয়ে শেষ বিকেলে স্প্রে করুন"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      ফলো-আপের দিন নির্ধারণ:
                    </label>
                    <select
                      value={followupDays}
                      onChange={(e) => setFollowupDays(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
                    >
                      <option value={3}>৩ দিন পর</option>
                      <option value={5}>৫ দিন পর</option>
                      <option value={7}>৭ দিন পর</option>
                      <option value={10}>১০ দিন পর</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    কৃষকের জন্য বিশেষ মাঠপর্যায়ের পরামর্শ (Remarks):
                  </label>
                  <textarea
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="উদাহরণ: ইউরিয়া সার এখনই বন্ধ করুন এবং অতিরিক্ত পানি জমি থেকে নামিয়ে দিন..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    onClick={handleSaveReview}
                    disabled={isSubmitting}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'পর্যালোচনা সম্পন্ন করুন'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
              <div className="text-4xl">📋</div>
              <h3 className="font-bold text-stone-800 text-base">কোনো কেস নির্বাচিত নেই</h3>
              <p className="text-xs max-w-sm mx-auto">
                বাম পাশের তালিকা থেকে যেকোনো কৃষকের রোগ নির্ণয় কেস ক্লিক করে বিস্তারিত দেখুন ও যাচাই করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
