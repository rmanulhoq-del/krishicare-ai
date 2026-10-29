import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Phone, MapPin, Tag, PlusCircle, Search, 
  ArrowLeft, CheckCircle2, Calendar, Sparkles, AlertCircle,
  TrendingUp, TrendingDown, RefreshCw, BarChart2, Filter,
  Building, Check, ArrowRight
} from 'lucide-react';
import { MarketplaceCropListing, MarketPrice, User } from '../types';
import { AdBanner } from './AdBanner';

interface KrishiHaatProps {
  currentUser?: User | null;
  onBack?: () => void;
  initialTab?: 'haat' | 'prices';
  onNavigateToDealers?: () => void;
}

export const KrishiHaat: React.FC<KrishiHaatProps> = ({
  currentUser,
  onBack,
  initialTab = 'haat',
  onNavigateToDealers
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'haat' | 'prices'>(initialTab);
  const [listings, setListings] = useState<MarketplaceCropListing[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  
  // Market Prices state
  const [priceCropFilter, setPriceCropFilter] = useState('ALL');
  const [refreshingPrices, setRefreshingPrices] = useState(false);
  const [priceMarketFilter, setPriceMarketFilter] = useState('ALL');

  // New Listing Form State
  const [form, setForm] = useState({
    farmerNameBn: currentUser?.name || '',
    farmerPhone: currentUser?.phone || '',
    cropNameBn: '',
    cropCategoryBn: 'শাকসবজি',
    quantityBn: '',
    expectedPriceBn: '',
    districtNameBn: 'চট্টগ্রাম',
    upazilaNameBn: 'বাঁশখালী',
    unionNameBn: 'নাপোড়া',
    harvestDateBn: 'অবিলম্বে সংগ্রহযোগ্য',
    descriptionBn: '',
    qualityGradeBn: 'PREMIUM' as const
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [resListings, resPrices] = await Promise.all([
        fetch('/api/marketplace'),
        fetch('/api/market-prices')
      ]);
      const dataListings = await resListings.json();
      const dataPrices = await resPrices.json();
      setListings(Array.isArray(dataListings) ? dataListings : []);
      setMarketPrices(Array.isArray(dataPrices) ? dataPrices : []);
    } catch (err) {
      console.error('Failed to load marketplace data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefreshPrices = async () => {
    setRefreshingPrices(true);
    try {
      const res = await fetch('/api/market-prices/refresh', { method: 'POST' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMarketPrices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setRefreshingPrices(false), 500);
    }
  };

  const handleOpenAddModalWithCrop = (cropName: string) => {
    setForm(prev => ({
      ...prev,
      cropNameBn: cropName
    }));
    setShowAddModal(true);
  };

  const handlePostListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.cropNameBn || !form.farmerPhone || !form.quantityBn) {
      setFeedbackMsg('অনুগ্রহ করে ফসলের নাম, পরিমাণ এবং মোবাইল নম্বর প্রদান করুন');
      return;
    }

    setIsSubmitting(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setForm({
          farmerNameBn: currentUser?.name || '',
          farmerPhone: currentUser?.phone || '',
          cropNameBn: '',
          cropCategoryBn: 'শাকসবজি',
          quantityBn: '',
          expectedPriceBn: '',
          districtNameBn: 'চট্টগ্রাম',
          upazilaNameBn: 'বাঁশখালী',
          unionNameBn: 'নাপোড়া',
          harvestDateBn: 'অবিলম্বে সংগ্রহযোগ্য',
          descriptionBn: '',
          qualityGradeBn: 'PREMIUM'
        });
        loadData();
      } else {
        setFeedbackMsg(data.error || 'পোস্ট করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      setFeedbackMsg('সার্ভারে যোগাযোগ করতে সমস্যা হয়েছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredListings = listings.filter(item => {
    const matchesSearch = 
      item.cropNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.upazilaNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionBn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || item.cropCategoryBn.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const filteredPrices = marketPrices.filter(mp => {
    const matchesCrop = priceCropFilter === 'ALL' || 
      mp.cropNameBn.toLowerCase().includes(priceCropFilter.toLowerCase()) ||
      ((mp as any).cropCategoryBn && (mp as any).cropCategoryBn.toLowerCase().includes(priceCropFilter.toLowerCase()));
    
    const matchesMarket = priceMarketFilter === 'ALL' ||
      (priceMarketFilter === 'BANSKHALI' && (mp.districtBn.includes('বাঁশখালী') || mp.marketNameBn.includes('বাঁশখালী'))) ||
      (priceMarketFilter === 'CHATTOGRAM' && mp.districtBn.includes('চট্টগ্রাম')) ||
      (priceMarketFilter === 'NATIONAL' && !mp.districtBn.includes('চট্টগ্রাম'));

    return matchesCrop && matchesMarket;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer shrink-0"
              title="পূর্বের পৃষ্ঠায় ফিরুন"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl font-bold shadow-2xs shrink-0">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                কৃষকের ফসল হাট ও লাইভ বাজারদর
              </h1>
              <span className="text-[10px] font-bold bg-teal-100 text-teal-900 px-2.5 py-0.5 rounded-full border border-teal-300">
                বাণিজ্যিক হাব
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              লাইভ পাইকারি বাজারদর জেনে সঠিক মূল্যে ফসল বিক্রি করুন এবং পাইকার/আড়তদার সরাসরি মাঠ থেকে সতেজ ফসল কিনুন
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-amber-300" />
          <span>+ আমার ফসল বিক্রির পোস্ট দিন</span>
        </button>
      </div>

      {/* Main Sub-Tabs: 1. Krishi Haat vs 2. Daily Market Prices */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200 w-full sm:w-fit">
        <button
          onClick={() => setActiveSubTab('haat')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'haat'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-700 hover:bg-stone-200/80'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>🌾 ফসল কেনাবেচার হাট ({listings.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('prices')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'prices'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-stone-700 hover:bg-stone-200/80'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-300" />
          <span>📊 দৈনিক লাইভ বাজারদর ({marketPrices.length})</span>
        </button>
      </div>

      {/* TAB 1: KRISHI HAAT (CROP LISTINGS & BENCHMARK RIBBON) */}
      {activeSubTab === 'haat' && (
        <div className="space-y-6">
          {/* Quick Price Benchmark Ticker Ribbon */}
          <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl border border-amber-300 p-4 space-y-3 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="font-extrabold text-stone-900 text-xs sm:text-sm">
                  আজকের স্থানীয় ও পাইকারি বাজারদর সংক্ষেপ (DAM রেট)
                </span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-md">
                  লাইভ
                </span>
              </div>
              <button
                onClick={() => setActiveSubTab('prices')}
                className="text-xs font-bold text-emerald-900 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>সম্পূর্ণ বাজারদর তালিকা দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Top 4 Quick Price Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-600">🌾 ব্রি ধান-২৮ / আমন</div>
                <div className="text-stone-900 font-black text-sm mt-0.5">৳ ১,২০০ - ১,৩৫০</div>
                <div className="text-[10px] text-stone-400">প্রতি মণ (পাইকারি)</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-600">🍉 বাঁশখালী মিষ্টি তরমুজ</div>
                <div className="text-emerald-800 font-black text-sm mt-0.5">৳ ১৮,০০০ - ২৫,০০০</div>
                <div className="text-[10px] text-stone-400">প্রতি ১০০ পিস (ক্ষেত রেট)</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-600">🍃 বাঁশখালী মিষ্টি পান</div>
                <div className="text-amber-800 font-black text-sm mt-0.5">৳ ২০০ - ২৪০</div>
                <div className="text-[10px] text-stone-400">প্রতি বিড়া (পাইকারি)</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                <div className="text-[11px] font-bold text-stone-600">🍆 গোল বেগুন / সবজি</div>
                <div className="text-teal-800 font-black text-sm mt-0.5">৳ ৪৫ - ৫০</div>
                <div className="text-[10px] text-stone-400">প্রতি কেজি (খুচরা)</div>
              </div>
            </div>
          </div>

          {/* Ad / Sponsored Placement Banner */}
          <AdBanner
            partnerName="চট্টগ্রাম পাইকারি কৃষি আড়ত ফেডারেশন"
            title="বাঁশখালীর তরমুজ ও ধান সরাসরি পাইকারি চালানে ক্রয়ের বিশেষ সুবিধা"
            subtitle="আড়তদার ও পাইকারদের জন্য দ্রুত ট্রাক ও পরিবহন ব্যবস্থা সহজলভ্য"
            phone="০১৯১১-৫৫৬৬৭৭"
            ctaText="আড়তের সাথে যোগাযোগ"
            ctaLink="tel:01911556677"
            variant="blue"
          />

          {/* Quick Machinery & Irrigation Services Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl border border-amber-300/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🚜</span>
              <div>
                <span className="text-xs font-black text-amber-950 block">
                  ফসল কাটা বা জমি চাষের জন্য কম্বাইন হারভেস্টার ও পাওয়ার টিলার দরকার?
                </span>
                <span className="text-[11px] text-stone-600">
                  বাঁশখালী ও চট্টগ্রামের অনুমোদিত হারভেস্টার মালিক ও সেচ চালকদের ভাড়ার রেট ও সরাসরি মোবাইল নম্বর দেখুন।
                </span>
              </div>
            </div>
            {onNavigateToDealers && (
              <button
                onClick={onNavigateToDealers}
                className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs shrink-0 cursor-pointer transition-all"
              >
                <span>যন্ত্রপাতি সেবা ডিরেক্টরি ➔</span>
              </button>
            )}
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search Input */}
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ফসলের নাম (যেমন: তরমুজ, ব্রি ধান-২৮, বেগুন), এলাকা বা কৃষকের নাম লিখুন..."
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="ALL">সকল প্রকার ফসল ও শস্য</option>
                  <option value="ফল ও তরমুজ">ফল ও তরমুজ</option>
                  <option value="ধান ও খাদ্যশস্য">ধান ও খাদ্যশস্য</option>
                  <option value="শাকসবজি">শাকসবজি</option>
                  <option value="ডাল ও তৈলবীজ">ডাল ও তৈলবীজ</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
              <span>মোট {filteredListings.length}টি বিক্রয়যোগ্য ফসলের তালিকা পাওয়া গেছে</span>
              <span className="text-[11px] text-teal-800 font-semibold">
                🛡️ সরাসরি কৃষকের সাথে যোগাযোগ ও দরদাম করুন
              </span>
            </div>
          </div>

          {/* Listings Grid */}
          {loading ? (
            <div className="p-12 text-center text-stone-500 font-medium bg-white rounded-3xl border border-stone-200">
              ফসল হাটের তথ্য লোড হচ্ছে...
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <div className="text-4xl">🌾</div>
              <h3 className="font-bold text-stone-800 text-base">কোনো ফসলের তালিকা পাওয়া যায়নি</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                আপনার কি বিক্রয়যোগ্য ফসল বা শাকসবজি আছে? এখনই উপরের বাটনে ক্লিক করে প্রথম লিস্টিংটি তৈরি করুন!
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-2 bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                + ফসল বিক্রির পোস্ট দিন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group relative"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-full">
                        {item.cropCategoryBn}
                      </span>
                      <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-md">
                        {item.qualityGradeBn === 'PREMIUM' ? '⭐ প্রিমিয়াম কোয়ালিটি' : 'স্ট্যান্ডার্ড গ্রেড'}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-stone-900 mt-2 group-hover:text-teal-800 transition-colors">
                      {item.cropNameBn}
                    </h3>

                    {/* Quantity & Expected Price */}
                    <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-stone-400 font-semibold uppercase">বিক্রয়যোগ্য পরিমাণ</div>
                        <div className="text-sm font-black text-stone-900">{item.quantityBn}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-stone-400 font-semibold uppercase">প্রত্যাশিত মূল্য</div>
                        <div className="text-sm font-black text-emerald-800">{item.expectedPriceBn}</div>
                      </div>
                    </div>

                    {/* Description */}
                    {item.descriptionBn && (
                      <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                        {item.descriptionBn}
                      </p>
                    )}

                    {/* Location & Harvest Timeline */}
                    <div className="mt-3 space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                      <div className="flex items-center gap-1.5 text-stone-700">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{item.unionNameBn}, {item.upazilaNameBn}, {item.districtNameBn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>সংগ্রহের সময়: {item.harvestDateBn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <span className="text-[11px] font-bold text-stone-700">চাষী: {item.farmerNameBn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Call to Farmer */}
                  <div className="pt-2 border-t border-stone-100">
                    <a
                      href={`tel:${item.farmerPhone.replace(/[^0-9+]/g, '')}`}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Phone className="w-4 h-4 text-amber-300" />
                      <span>📞 {item.farmerPhone} (কৃষককে সরাসরি কল দিন)</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE MARKET PRICES (DAM & BANSKHALI WHOLESALE/RETAIL) */}
      {activeSubTab === 'prices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  <span>দৈনিক পাইকারি ও খুচরা কৃষিপণ্য বাজারদর</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  কৃষি বিপণন অধিদপ্তর (DAM) ও বাঁশখালী স্থানীয় আড়তদার সমিতি কর্তৃক হালনাগাদকৃত
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefreshPrices}
                  disabled={refreshingPrices}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${refreshingPrices ? 'animate-spin' : ''}`} />
                  <span>{refreshingPrices ? 'আপডেট হচ্ছে...' : '🔄 আজকের দর রিফ্রেশ করুন'}</span>
                </button>
              </div>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-500 font-bold">এলাকা:</span>
              {[
                { id: 'ALL', label: 'সকল অঞ্চল' },
                { id: 'BANSKHALI', label: '📍 বাঁশখালী স্থানীয় বাজার' },
                { id: 'CHATTOGRAM', label: '🏙️ চট্টগ্রাম পাইকারি আড়ত' },
                { id: 'NATIONAL', label: '🇧🇩 জাতীয় পাইকারি বাজার' },
              ].map(rf => (
                <button
                  key={rf.id}
                  onClick={() => setPriceMarketFilter(rf.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    priceMarketFilter === rf.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Crop Type Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              {[
                { id: 'ALL', label: 'সব কৃষিপণ্য' },
                { id: 'পান', label: '🍃 বাঁশখালী মিষ্টি পান' },
                { id: 'তরমুজ', label: '🍉 চরের মিষ্টি তরমুজ' },
                { id: 'সুপারি', label: '🥥 সুপারি' },
                { id: 'চা', label: '🍵 চা পাতা' },
                { id: 'ধান', label: '🌾 ধান ও খাদ্যশস্য' },
                { id: 'বেগুন', label: '🍆 বেগুন ও সবজি' },
                { id: 'আলু', label: '🥔 আলু ও টমেটো' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setPriceCropFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    priceCropFilter === f.id
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Price Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredPrices.map((mp) => (
                <div 
                  key={mp.id} 
                  className={`p-4 rounded-2xl border space-y-3 transition-all flex flex-col justify-between ${
                    mp.districtBn.includes('বাঁশখালী')
                      ? 'bg-amber-50/40 border-amber-200 ring-1 ring-amber-300/40'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="font-extrabold text-stone-900 text-base block">{mp.cropNameBn}</span>
                        <span className="text-[11px] text-stone-500 font-medium">{mp.districtBn}</span>
                      </div>
                      <span className="text-[10px] text-stone-600 bg-white px-2 py-0.5 rounded-md border border-stone-200 text-right font-medium">
                        {mp.marketNameBn}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs bg-white p-3 rounded-xl border border-stone-100 mt-2.5">
                      <div className="flex justify-between items-center text-stone-600">
                        <span className="font-medium">পাইকারি আড়ত দর:</span>
                        <span className="font-extrabold text-stone-900 text-sm">৳ {mp.wholesalePriceBn}</span>
                      </div>
                      <div className="flex justify-between items-center text-stone-600 border-t border-stone-100 pt-1.5">
                        <span className="font-medium">খুচরা বাজার দর:</span>
                        <span className="font-extrabold text-emerald-800 text-sm">৳ {mp.retailPriceBn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-200/60">
                    <span className="text-[10px] text-stone-400 font-medium">
                      আপডেট: {mp.lastUpdatedBn}
                    </span>
                    <button
                      onClick={() => handleOpenAddModalWithCrop(mp.cropNameBn)}
                      className="text-[11px] font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200"
                    >
                      <span>হাটে বিক্রি করুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add New Crop Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-4 my-8 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌾</span>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">আমার উৎপাদিত ফসল বিক্রির পোস্ট দিন</h3>
                  <p className="text-[11px] text-stone-500">মধ্যস্বত্বভোগী ছাড়া সরাসরি পাইকার ও আড়তদারদের কাছে বিক্রি করুন</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {feedbackMsg && (
              <div className="p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-200 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Smart Pricing Helper Callout */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>আজকের বাজারদর সহায়িকা:</span>
              </div>
              <p className="text-[11px] text-stone-700 leading-relaxed font-normal">
                বাজারদরের সাথে সামঞ্জস্য রেখে ন্যায্য মূল্য প্রত্যাশা করলে পাইকাররা দ্রুত যোগাযোগ করবে। বাঁশখালী ও চট্টগ্রামে আজকের আমন ধান প্রতি মণ ৳ ১,২০০ - ১,৩৫০, মিষ্টি তরমুজ প্রতি ১০০ পিস ৳ ১৮,০০০ - ২৫,০০০।
              </p>
            </div>

            <form onSubmit={handlePostListing} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">কৃষকের নাম *</label>
                  <input
                    type="text"
                    required
                    value={form.farmerNameBn}
                    onChange={e => setForm({ ...form, farmerNameBn: e.target.value })}
                    placeholder="আপনার পূর্ণ নাম"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর (যোগাযোগের জন্য) *</label>
                  <input
                    type="tel"
                    required
                    value={form.farmerPhone}
                    onChange={e => setForm({ ...form, farmerPhone: e.target.value })}
                    placeholder="যেমন: ০১৭১১-XXXXXX"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের নাম ও জাত *</label>
                  <input
                    type="text"
                    required
                    value={form.cropNameBn}
                    onChange={e => setForm({ ...form, cropNameBn: e.target.value })}
                    placeholder="যেমন: মিষ্টি তরমুজ (সুপার হাইব্রিড)"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের ধরন</label>
                  <select
                    value={form.cropCategoryBn}
                    onChange={e => setForm({ ...form, cropCategoryBn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-teal-600 bg-white"
                  >
                    <option value="ফল ও তরমুজ">ফল ও তরমুজ</option>
                    <option value="ধান ও খাদ্যশস্য">ধান ও খাদ্যশস্য</option>
                    <option value="শাকসবজি">শাকসবজি</option>
                    <option value="ডাল ও তৈলবীজ">ডাল ও তৈলবীজ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">মোট বিক্রয়যোগ্য পরিমাণ *</label>
                  <input
                    type="text"
                    required
                    value={form.quantityBn}
                    onChange={e => setForm({ ...form, quantityBn: e.target.value })}
                    placeholder="যেমন: ৫০০ মণ / ২ একর ক্ষেতের ফলন"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">প্রত্যাশিত দাম *</label>
                  <input
                    type="text"
                    required
                    value={form.expectedPriceBn}
                    onChange={e => setForm({ ...form, expectedPriceBn: e.target.value })}
                    placeholder="যেমন: ১,৩০০ টাকা/মণ অথবা ২০,০০০ টাকা/১০০ পিস"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">জেলা</label>
                  <input
                    type="text"
                    value={form.districtNameBn}
                    onChange={e => setForm({ ...form, districtNameBn: e.target.value })}
                    className="w-full p-2 rounded-xl border border-stone-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">উপজেলা</label>
                  <input
                    type="text"
                    value={form.upazilaNameBn}
                    onChange={e => setForm({ ...form, upazilaNameBn: e.target.value })}
                    className="w-full p-2 rounded-xl border border-stone-300 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">ইউনিয়ন / গ্রাম</label>
                  <input
                    type="text"
                    value={form.unionNameBn}
                    onChange={e => setForm({ ...form, unionNameBn: e.target.value })}
                    placeholder="নাপোড়া"
                    className="w-full p-2 rounded-xl border border-stone-300 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">সংগ্রহের সময়সীমা</label>
                <input
                  type="text"
                  value={form.harvestDateBn}
                  onChange={e => setForm({ ...form, harvestDateBn: e.target.value })}
                  placeholder="যেমন: আগামী ৩ দিনের মধ্যে সরাসরি জমি থেকে"
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের বিস্তারিত বিবরণ</label>
                <textarea
                  rows={2}
                  value={form.descriptionBn}
                  onChange={e => setForm({ ...form, descriptionBn: e.target.value })}
                  placeholder="ফসলের গুণগত মান, প্যাকিং ও ডেলিভারি সংক্রান্ত যেকোনো তথ্য লিখুন..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-800 hover:bg-teal-900 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{isSubmitting ? 'পোস্ট হচ্ছে...' : 'মার্কেটপ্লেসে পোস্ট করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
