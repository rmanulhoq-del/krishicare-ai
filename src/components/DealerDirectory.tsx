import React, { useState, useEffect } from 'react';
import { 
  Building2, Phone, MapPin, CheckCircle2, Star, Search, 
  Store, Filter, PlusCircle, ArrowLeft, ShieldCheck, Tag, ExternalLink, Sparkles,
  MessageCircle
} from 'lucide-react';
import { AgriDealer, User } from '../types';
import { AdBanner } from './AdBanner';

interface DealerDirectoryProps {
  currentUser?: User | null;
  onBack?: () => void;
  defaultUpazila?: string;
}

export const DealerDirectory: React.FC<DealerDirectoryProps> = ({
  currentUser,
  onBack,
  defaultUpazila
}) => {
  const [dealers, setDealers] = useState<AgriDealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedUpazila, setSelectedUpazila] = useState<string>(defaultUpazila || 'ALL');
  const [showListingModal, setShowListingModal] = useState(false);

  const loadDealers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dealers');
      const data = await res.json();
      setDealers(data);
    } catch (err) {
      console.error('Failed to load dealers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDealers();
  }, []);

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = 
      dealer.shopNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.proprietorNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.marketAddressBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.authorizedBrands.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dealer.productsAvailableBn.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'ALL' || dealer.dealerType === selectedType;
    const matchesUpazila = selectedUpazila === 'ALL' || dealer.upazilaNameBn.includes(selectedUpazila);

    return matchesSearch && matchesType && matchesUpazila;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-6 py-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
              title="পূর্বের পৃষ্ঠায় ফিরুন"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold shadow-2xs">
            🏪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                অনুমোদিত কৃষি উপকরণ ও যন্ত্রপাতি সেবা ডিরেক্টরি
              </h1>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                ভেরিফাইড নেটওয়ার্ক
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              বাঁশখালী ও আশেপাশের সরকারি বিসিআইসি, বিএডিসি সার-বীজ ডিলার এবং কম্বাইন হারভেস্টার, পাওয়ার টিলার ও সেচ সেবা কেন্দ্র
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowListingModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>দোকান লিস্টিং ও বিজ্ঞাপন দিন</span>
        </button>
      </div>

      {/* Ad / Sponsored Placement Banner */}
      <AdBanner
        partnerName="মেসার্স চৌধুরী ট্রেডার্স (গোল্ড পার্টনার)"
        title="বাঁশখালীতে সরকারি মূল্যে আসল বিসিআইসি ইউরিয়া, ডিএপি ও সিনজেন্টার কীটনাশক"
        subtitle="সরাসরি পাইকারি ও খুচরা বিক্রয় কেন্দ্র | ফোন করে স্টক নিশ্চিত করুন"
        phone="০১৮১৯-৮৮৭৭৬৬"
        ctaText="সরাসরি ফোন দিন"
        ctaLink="tel:01819887766"
        variant="amber"
      />

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দোকানের নাম, সার, ওষুধ বা ব্র্যান্ড খুঁজুন..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
            />
          </div>

          {/* Upazila Filter */}
          <div>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option value="ALL">সকল উপজেলা (চট্টগ্রাম জেলা)</option>
              <option value="বাঁশখালী">বাঁশখালী উপজেলা (নাপোড়া, সদর, চাম্বল, গুণাগরী)</option>
              <option value="কোতোয়ালী">চট্টগ্রাম সদর / রিয়াজউদ্দিন বাজার</option>
            </select>
          </div>

          {/* Dealer Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              <option value="ALL">সকল প্রকার ডিলার ও যন্ত্রপাতি সেবা</option>
              <option value="BCIC_FERTILIZER">সরকারি বিসিআইসি সার ডিলার</option>
              <option value="BADC_SEEDS">বিএডিসি প্রত্যায়িত বীজ ডিলার</option>
              <option value="AUTHORIZED_PESTICIDE">অনুমোদিত বালাইনাশক ও স্প্রেয়ার</option>
              <option value="MACHINERY_RENTAL">🚜 কম্বাইন হারভেস্টার ও পাওয়ার টিলার</option>
              <option value="IRRIGATION_SERVICE">💧 সেচ পাম্প ও বোরিং সেবা</option>
              <option value="GENERAL_AGRI_INPUT">সাধারণ কৃষি উপকরণ বিতান</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
          <span>মোট {filteredDealers.length}টি অনুমোদিত দোকান প্রদর্শিত হচ্ছে</span>
          <span className="text-[11px] text-emerald-800 font-semibold">
            ✨ গোল্ড ও স্পনসরড ডিলারগণ সবার উপরে প্রদর্শিত
          </span>
        </div>
      </div>

      {/* Dealers Grid */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
          <div className="inline-block w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-stone-500 font-bold mt-2">ডিলার তালিকা লোড হচ্ছে...</p>
        </div>
      ) : filteredDealers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-2">
          <Store className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-800 text-sm">কোনো অনুমোদিত ডিলার পাওয়া যায়নি</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            আপনার অনুসন্ধানের সাথে মিলে এমন কোনো দোকান খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className={`rounded-3xl p-5 border transition-all shadow-xs flex flex-col justify-between ${
                dealer.isFeaturedSponsored
                  ? 'bg-gradient-to-b from-amber-500/5 to-white border-amber-300 hover:border-amber-500 ring-1 ring-amber-300/40'
                  : 'bg-white border-stone-200 hover:border-emerald-500'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {dealer.isFeaturedSponsored && (
                      <span className="bg-amber-400 text-stone-950 font-black text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <Star className="w-3 h-3 fill-stone-950" />
                        <span>স্পনসরড {dealer.monthlyTier || 'পিক'}</span>
                      </span>
                    )}
                    <span className="bg-emerald-100 text-emerald-900 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>{dealer.dealerTypeBn}</span>
                    </span>
                  </div>
                </div>

                {/* Shop Name & Proprietor */}
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 leading-tight">
                    {dealer.shopNameBn}
                  </h3>
                  <div className="text-xs font-semibold text-stone-600 mt-1 flex items-center gap-1">
                    <span>স্বত্বাধিকারী:</span>
                    <span className="text-stone-900 font-bold">{dealer.proprietorNameBn}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed">{dealer.marketAddressBn}</span>
                </div>

                {/* Brands Available */}
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>অনুমোদিত কোম্পানি ও ব্র্যান্ড:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dealer.authorizedBrands.map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-white text-stone-700 border border-stone-200 px-2 py-0.5 rounded-lg shadow-2xs"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Machinery & Rental Rates */}
                {dealer.rentalRateBn && (
                  <div className="bg-amber-50/80 border border-amber-300 p-2.5 rounded-xl text-xs space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1 text-[11px]">
                      🚜 ভাড়ার হার ও সেবার বিবরণ:
                    </span>
                    <p className="text-amber-900 font-extrabold text-xs">{dealer.rentalRateBn}</p>
                    {dealer.machineryTypeBn && (
                      <p className="text-[10px] text-stone-600 font-medium">মডেল/যন্ত্রপাতি: {dealer.machineryTypeBn}</p>
                    )}
                  </div>
                )}

                {/* Products Available */}
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                    {dealer.dealerType === 'MACHINERY_RENTAL' || dealer.dealerType === 'IRRIGATION_SERVICE' 
                      ? 'উপলব্ধ সেবা ও যন্ত্রপাতি:' 
                      : 'মজুদকৃত মূল কৃষি পণ্য:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {dealer.productsAvailableBn.map((p, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md"
                      >
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Direct Call Action */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${dealer.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {dealer.dealerType === 'MACHINERY_RENTAL' 
                      ? `🚜 ${dealer.phone} (হারভেস্টার/টিলার বুকিং)` 
                      : (dealer.dealerType === 'IRRIGATION_SERVICE'
                        ? `💧 ${dealer.phone} (সেচ চালককে কল)`
                        : `📞 ${dealer.phone} (কল করুন)`)}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monetization Promotion Modal / Banner for Shop Owners */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl">
                  📢
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">আপনার কৃষি দোকান লিস্টিং ও বিজ্ঞাপন দিন</h3>
                  <p className="text-[11px] text-stone-500">প্রতিদিন হাজার হাজার কৃষকের কাছে আপনার পণ্যের প্রচার করুন</p>
                </div>
              </div>
              <button
                onClick={() => setShowListingModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <p className="font-bold text-amber-950">
                কেন আপনি আপনার দোকান AgriCare AI-তে তালিকাভুক্ত করবেন?
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-stone-700">
                <li>কৃষকরা যখন বাঁশখালীতে ধানের ব্লাস্ট বা পোকার ওষুধের প্রেসক্রিপশন পায়, তখন সরাসরি আপনার দোকানের নাম ও ফোন নম্বর তাদের স্ক্রিনে ভেসে উঠবে।</li>
                <li>কৃষক ১-ক্লিকেই সরাসরি আপনাকে ফোন করে সার ও কীটনাশকের অর্ডার দিতে পারবেন।</li>
                <li>গোল্ড পার্টনার হিসেবে হোমপেজে আপনার দোকানের স্পেশাল ব্যানার প্রদর্শিত হবে।</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-950">যোগাযোগ ও লিস্টিংয়ের নিয়ম:</div>
              <p className="text-stone-600">
                দোকানের নাম, ঠিকানা ও ট্রেড লাইসেন্সসহ সরাসরি সুপার এডমিনের মোবাইল বা হোয়াটসঅ্যাপ নম্বরে যোগাযোগ করুন:
              </p>
              <div className="pt-2 border-t border-emerald-200/60 space-y-1.5 font-bold text-emerald-900">
                <div>👤 সুপার এডমিন: মোহাম্মদ আরমানুল হক</div>
                <div>📍 প্রধান কার্যালয়: নাপোড়া, বাঁশখালী, চট্টগ্রাম</div>
                <div className="bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-300 text-emerald-950 flex flex-wrap items-center justify-between gap-2">
                  <span>📱 মোবাইল ও হোয়াটসঅ্যাপ:</span>
                  <a href="tel:+8801850180708" className="text-sm font-black text-emerald-900 underline tracking-wide">
                    +8801850180708
                  </a>
                </div>
                <div>✉️ অফিসিয়াল ইমেইল: rmanulhoq@gmail.com</div>
                <div>📞 কৃষি কল সেন্টার হটলাইন: ১৬১২৩</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowListingModal(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold px-4 py-2.5 rounded-xl text-xs order-3 sm:order-1 cursor-pointer text-center"
              >
                বন্ধ করুন
              </button>
              <a
                href="tel:+8801850180708"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm order-1 sm:order-2 cursor-pointer transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল দিন (+8801850180708)</span>
              </a>
              <a
                href="https://wa.me/8801850180708?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%20%E0%A6%86%E0%A6%B0%E0%A6%AE%E0%A6%BE%E0%A6%A8%E0%A7%81%E0%A6%B2%20%E0%A6%AD%E0%A6%BE%E0%A6%87%E0%A7%8F,%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20AgriCare%20AI%20%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AA%E0%A7%87%20%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%B0%20%E0%A6%95%E0%A7%83%E0%A6%B7%E0%A6%BF%20%E0%A6%A6%E0%A7%8B%E0%A6%95%E0%A6%BE%E0%A6%A8%E0%A7%87%E0%A6%B0%20%E0%A6%B2%E0%A6%BF%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%BF%E0%A6%82%20%E0%A6%93%20%E0%A6%AC%E0%A6%BF%E0%A6%9C%E0%A7%8D%E0%A6%9E%E0%A6%BE%E0%A6%AA%E0%A6%A8%20%E0%A6%A6%E0%A6%BF%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A7%A4"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm order-2 sm:order-3 cursor-pointer transition-all active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপ মেসেজ দিন</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
