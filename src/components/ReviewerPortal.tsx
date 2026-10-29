import React, { useState, useEffect } from 'react';
import { BookCheck, CheckCircle2, XCircle, AlertCircle, FileText, Send, Sparkles, Building, Layers } from 'lucide-react';
import { KnowledgeItem } from '../types';

export const ReviewerPortal: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'APPROVED' | 'REJECTED' | 'PENDING_REVIEW'>('APPROVED');
  const [reviewerNotes, setReviewerNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchKnowledge = () => {
    fetch('/api/knowledge')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        if (data.length > 0 && !selectedItem) setSelectedItem(data[0]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleReviewSubmit = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/knowledge/${selectedItem.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewStatus,
          reviewerNotesBn: reviewerNotes
        })
      });

      if (!res.ok) throw new Error('Review failed');
      const updated = await res.json();
      setItems(prev => prev.map(item => item.id === updated.id ? updated : item));
      setSelectedItem(updated);
      alert(`তথ্যটি সফলভাবে ${reviewStatus === 'APPROVED' ? 'অনুমোদিত' : 'পর্যালোচনা সম্পন্ন'} হয়েছে।`);
    } catch (err) {
      console.error(err);
      alert('পর্যালোচনা সংরক্ষণ ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-800/80 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 border border-purple-500/40 mb-2">
            <BookCheck className="w-4 h-4 text-amber-300" />
            <span>কৃষি বৈজ্ঞানিক তথ্য ও বালাই নিয়ন্ত্রণ নীতিমালা রিভিউয়ার পোর্টাল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            বৈজ্ঞানিক তথ্যকোষ ও মাত্রা অনুমোদন
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            ডাটা এন্ট্রি অপারেটরের মাধ্যমে প্রস্তাবিত রোগবালাই তথ্য, সক্রিয় উপাদান, মাত্রা ও গবেষণা সূত্রের বিজ্ঞানসম্মত যাচাই।
          </p>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-center">
          <div className="text-2xl font-black text-amber-300">{items.length}</div>
          <div className="text-[11px] text-purple-200">মোট বৈজ্ঞানিক রেকর্ড</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Knowledge Items List */}
        <div className="space-y-3 lg:col-span-1">
          <h2 className="text-base font-bold text-stone-900">অনুমোদনের জন্য ড্রাফট ও প্রস্তাবিত তথ্যাবলি</h2>
          <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
            {items.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isApproved = item.status === 'APPROVED';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setReviewerNotes(item.reviewerNotesBn || '');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 shadow-md ring-1 ring-purple-500'
                      : 'border-stone-200 bg-white hover:border-purple-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-stone-100 text-stone-700">
                      ভার্সন {item.version}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isApproved ? 'অনুমোদিত' : 'পর্যালোচনা প্রয়োজন'}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug">{item.titleBn}</h3>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-stone-400" />
                    <span>উৎস: {item.sourceName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Item Review & Approval Form */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-md">
              <div className="flex justify-between items-start pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    বিভাগ: {selectedItem.category}
                  </span>
                  <h2 className="text-xl font-extrabold text-stone-900 mt-1.5">
                    {selectedItem.titleBn}
                  </h2>
                  <div className="text-xs text-stone-500 mt-1">
                    উৎস: <strong>{selectedItem.sourceName}</strong> ({selectedItem.sourceType}) • ভার্সন {selectedItem.version}
                  </div>
                </div>

                <div className="text-xs text-stone-400">
                  নিবন্ধন: {new Date(selectedItem.createdAt).toLocaleDateString('bn-BD')}
                </div>
              </div>

              {/* Main Content Body */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-800 space-y-2 leading-relaxed">
                <div className="font-bold text-stone-900 text-sm">প্রস্তাবিত বৈজ্ঞানিক নির্দেশিকা ও বিবরণ:</div>
                <p className="whitespace-pre-line">{selectedItem.contentBn}</p>
              </div>

              {/* Reviewer Action Area */}
              <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
                <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <BookCheck className="w-5 h-5 text-purple-700" />
                  <span>বৈজ্ঞানিক রিভিউয়ার মতামত ও অনুমোদন প্রক্রিয়া:</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setReviewStatus('APPROVED')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewStatus === 'APPROVED'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>অনুমোদন করুন (Approve)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatus('PENDING_REVIEW')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewStatus === 'PENDING_REVIEW'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>সংশোধন চান (Revise)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatus('REJECTED')}
                    className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                      reviewStatus === 'REJECTED'
                        ? 'bg-red-700 text-white border-red-700 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>বাতিল (Reject)</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    রিভিউয়ার নোট ও বৈজ্ঞানিক পর্যবেক্ষণ (Reviewer Notes):
                  </label>
                  <textarea
                    rows={2}
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    placeholder="উদাহরণ: ব্রি/বারি রোগতত্ত্ব নির্দেশিকার সাথে মিলিয়ে দেখা হয়েছে। তথ্যটি সঠিক আছে..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleReviewSubmit}
                    disabled={isSubmitting}
                    className="bg-purple-800 hover:bg-purple-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সিদ্ধান্ত রেকর্ড করুন'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500">
              <div className="text-4xl mb-2">📖</div>
              <p className="font-semibold text-stone-700">বাম পাশ থেকে বৈজ্ঞানিক তথ্য সিলেক্ট করুন</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
