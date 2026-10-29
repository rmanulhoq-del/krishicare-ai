import React, { useState, useEffect } from 'react';
import { Layers, PlusCircle, Send, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { Crop } from '../types';

export const DataEntryPortal: React.FC = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [title, setTitle] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('crop-rice');
  const [category, setCategory] = useState<string>('DISEASE_CONTROL');
  const [sourceName, setSourceName] = useState<string>('কৃষি সম্প্রসারণ অধিদপ্তর (DAE)');
  const [sourceType, setSourceType] = useState<string>('GOVERNMENT');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>('');

  useEffect(() => {
    fetch('/api/crops').then(res => res.json()).then(data => setCrops(data)).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('শিরোনাম ও বিবরণ প্রদান করুন');
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/data-entry/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleBn: title,
          cropId: selectedCrop,
          category,
          sourceName,
          sourceType,
          contentBn: content
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setSuccessMsg('তথ্যটি ড্রাফট হিসেবে সফলভাবে সংরক্ষিত হয়েছে। বৈজ্ঞানিক রিভিউয়ারের অনুমোদনের পর এটি প্রকাশিত হবে।');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert('তথ্য জমা দেওয়া সম্ভব হয়নি।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-200 border border-amber-500/40 mb-2">
            <Layers className="w-4 h-4" />
            <span>ডাটা এন্ট্রি অপারেটর পোর্টাল (Data Entry Operator)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            নতুন বালাই ও কৃষি তথ্য ড্রাফট তৈরি
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            সরকারি ও গবেষণা নির্দেশিকা থেকে ফসল, লক্ষণ, সক্রিয় উপাদান ও মাত্রার বিবরণ যুক্ত করুন।
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Entry Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-700" />
            <span>নতুন বৈজ্ঞানিক রেকর্ডের তথ্য দিন</span>
          </h2>
          <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
            স্বয়ংক্রিয় স্ট্যাটাস: পেন্ডিং রিভিউ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">তথ্য শিরোনাম (বাংলায়):</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: আলু ফসলে মড়ক বা লেট ব্লাইটের আগাম সতর্কবার্তা"
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">সংশ্লিষ্ট ফসল:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
            >
              {crops.map((c) => (
                <option key={c.id} value={c.id}>{c.nameBn} ({c.nameEn})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাটাগরি:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold"
            >
              <option value="DISEASE_CONTROL">রোগবালাই দমন (Disease Control)</option>
              <option value="CROP_MANAGEMENT">ফসল ব্যবস্থাপনা ও পরিচর্যা</option>
              <option value="DOSE_GUIDELINE">অনুমোদিত মাত্রা ও প্রয়োগবিধি</option>
              <option value="SAFETY_RULE">নিরাপত্তা ও বিষক্রিয়া সতর্কতা</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">তথ্যসূত্র (Source Authority):</label>
            <input
              type="text"
              required
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="যেমন: বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)"
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            বিস্তারিত বৈজ্ঞানিক বিবরণ ও নির্দেশনা:
          </label>
          <textarea
            required
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="রোগের লক্ষণ, বিস্তার, জৈব প্রতিকার ও অনুমোদিত সক্রিয় উপাদানের সঠিক নিয়ম লিখুন..."
            className="w-full p-3 rounded-xl border border-stone-300 text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <div className="pt-2 flex justify-between items-center text-xs text-stone-500 border-t border-stone-100">
          <span>* এন্ট্রি করা মাত্র রিভিউয়ার প্যানেলে পর্যালোচনার জন্য জমা হবে</span>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'জমা হচ্ছে...' : 'ড্রাফট সাবমিট করুন'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
