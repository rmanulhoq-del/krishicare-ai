import React from 'react';
import { FileText, CheckCircle2, AlertCircle, RefreshCw, Printer, ArrowLeft } from 'lucide-react';
import { Diagnosis } from '../types';

interface FarmerReportsViewProps {
  diagnoses: Diagnosis[];
  onSelectDiagnosis: (diag: Diagnosis) => void;
  onOpenReportModal: (diag: Diagnosis) => void;
  onOpenFollowupModal: (diag: Diagnosis) => void;
  onBack: () => void;
}

export const FarmerReportsView: React.FC<FarmerReportsViewProps> = ({
  diagnoses,
  onSelectDiagnosis,
  onOpenReportModal,
  onOpenFollowupModal,
  onBack
}) => {
  const safeDiagnoses = Array.isArray(diagnoses) ? diagnoses : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 text-sm font-semibold p-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        <h1 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          <span>আমার সকল ডায়াগনোসিস ও প্রেসক্রিপশন রিপোর্ট</span>
        </h1>
      </div>

      {safeDiagnoses.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-2">
          <div className="text-4xl">🌱</div>
          <h3 className="font-bold text-stone-800 text-base">কোনো রিপোর্ট পাওয়া যায়নি</h3>
          <p className="text-xs max-w-sm mx-auto">
            প্রধান পাতা থেকে "ছবি তুলুন" বাটনে ক্লিক করে ফসলের প্রথম রোগ নির্ণয় রিপোর্ট তৈরি করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {safeDiagnoses.map((diag) => {
            const isVerified = diag.officerVerificationStatus === 'VERIFIED_BY_OFFICER';
            return (
              <div
                key={diag.id}
                className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={diag.imageUrl}
                      alt={diag.cropNameBn}
                      className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          {diag.cropNameBn}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(diag.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 mt-1">
                        {diag.primaryCandidate.problemNameBn}
                      </h3>
                      <div className="text-xs text-stone-500 italic">
                        {diag.primaryCandidate.problemNameEn} • আস্থা: {diag.primaryCandidate.confidencePercent}%
                      </div>
                    </div>
                  </div>

                  <div>
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>কৃষি কর্মকর্তা যাচাইকৃত</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        <AlertCircle className="w-4 h-4 text-amber-700" />
                        <span>অফিস পর্যালোচনার অপেক্ষায়</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                  <span className="font-bold text-stone-900 block mb-0.5">প্রাথমিক ব্যবস্থাপনা:</span>
                  {diag.explainableReasoningBn}
                </div>

                {/* Followup Outcome if completed */}
                {diag.followupStatus === 'COMPLETED' && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span className="font-semibold">
                      ফলো-আপ ফলাফল: {diag.followupOutcomeType === 'IMPROVED' ? '🌿 উন্নতি লক্ষ্য করা গেছে' : diag.followupOutcomeType === 'UNCHANGED' ? '⚖️ অপরিবর্তিত' : '⚠️ অবনতি'}
                    </span>
                    <span className="text-[11px] text-emerald-700">যাচাই সম্পন্ন</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => onOpenFollowupModal(diag)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-stone-300 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                    <span>ফলো-আপ পরীক্ষা</span>
                  </button>

                  <button
                    onClick={() => onOpenReportModal(diag)}
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>রিপোর্ট প্রিন্ট / দেখুন</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
