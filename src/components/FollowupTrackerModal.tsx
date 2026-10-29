import React, { useState } from 'react';
import { Camera, Image as ImageIcon, CheckCircle2, AlertTriangle, ArrowRight, X, RefreshCw } from 'lucide-react';
import { Diagnosis } from '../types';

interface FollowupTrackerModalProps {
  diagnosis: Diagnosis;
  onClose: () => void;
  onFollowupSuccess: (updated: Diagnosis) => void;
}

export const FollowupTrackerModal: React.FC<FollowupTrackerModalProps> = ({
  diagnosis,
  onClose,
  onFollowupSuccess
}) => {
  const [followupImage, setFollowupImage] = useState<string | null>(null);
  const [outcomeType, setOutcomeType] = useState<'IMPROVED' | 'UNCHANGED' | 'WORSE'>('IMPROVED');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFollowupImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/diagnoses/${diagnosis.id}/followup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followupImageUrl: followupImage,
          outcomeType,
          notesBn: notes
        })
      });

      if (!res.ok) throw new Error('Failed to submit follow-up');
      const updated = await res.json();
      onFollowupSuccess(updated);
      onClose();
    } catch (err) {
      console.error(err);
      alert('ফলো-আপ তথ্য সংরক্ষণ করা যায়নি।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 text-stone-900 space-y-5">
        <div className="flex justify-between items-center pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-600" />
              <span>ফলো-আপ ফলাফল ও অগ্রগতি পর্যবেক্ষণ</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              চিকিৎসার পর গাছের অবস্থার পরিবর্তন পরীক্ষা করুন
            </p>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-side Before vs After Image Preview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-1.5">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
              পূর্বের ছবি (Before)
            </span>
            <img 
              src={diagnosis.imageUrl} 
              alt="Before Treatment" 
              className="w-full h-32 object-cover rounded-xl border border-stone-300 shadow-2xs" 
            />
            <div className="text-[10px] text-stone-400">{diagnosis.cropNameBn} • {diagnosis.primaryCandidate.problemNameBn}</div>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200 text-center space-y-1.5 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide">
              নতুন ছবি (After)
            </span>
            {followupImage ? (
              <img 
                src={followupImage} 
                alt="After Followup" 
                className="w-full h-32 object-cover rounded-xl border border-emerald-300 shadow-2xs" 
              />
            ) : (
              <label className="h-32 rounded-xl border-2 border-dashed border-emerald-400 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-100/50 transition-colors">
                <Camera className="w-6 h-6 text-emerald-700 mb-1" />
                <span className="text-xs font-semibold text-emerald-800">ছবি আপলোড করুন</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
            <div className="text-[10px] text-emerald-700 font-medium">বর্তমান অবস্থা</div>
          </div>
        </div>

        {/* Outcome Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-stone-700">
            গাছের পরিবর্তনের ধরন নির্বাচন করুন:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setOutcomeType('IMPROVED')}
              className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                outcomeType === 'IMPROVED'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="text-base mb-1">🌿</div>
              <div>উন্নতি লক্ষ্য করা গেছে</div>
            </button>

            <button
              type="button"
              onClick={() => setOutcomeType('UNCHANGED')}
              className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                outcomeType === 'UNCHANGED'
                  ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="text-base mb-1">⚖️</div>
              <div>অপরিবর্তিত</div>
            </button>

            <button
              type="button"
              onClick={() => setOutcomeType('WORSE')}
              className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                outcomeType === 'WORSE'
                  ? 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-500'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="text-base mb-1">⚠️</div>
              <div>অবস্থার অবনতি</div>
            </button>
          </div>
        </div>

        {/* Dynamic Safety Warning if Worse */}
        {outcomeType === 'WORSE' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>জরুরি সতর্কতা:</span>
            </div>
            <p className="leading-relaxed">
              রোগের বিস্তার বাড়লে নিজে নিজে কোনো কীটনাশক বা রাসায়নিকের মাত্রা বাড়াবেন না! সরাসরি উপজেলা কৃষি অফিসের কৃষি বিশেষজ্ঞ বা উপসহকারী কৃষি কর্মকর্তার কাছে আক্রান্ত ডাল বা পাতা প্রদর্শন করুন।
            </p>
          </div>
        )}

        {/* Farmer Observations */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            আপনার পর্যবেক্ষণ / মন্তব্য (ঐচ্ছিক):
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="উদাহরণ: ২ দিন আগে পানি নিষ্কাশন করেছি এবং পটাশ সার প্রয়োগ করেছি..."
            className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100"
          >
            বাতিল
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'ফলো-আপ জমা দিন'}
          </button>
        </div>
      </div>
    </div>
  );
};
