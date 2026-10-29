import React, { useState, useEffect } from 'react';
import { 
  Gift, Award, FileText, CheckCircle2, Calendar, PhoneCall, 
  MapPin, ShieldAlert, Sparkles, Filter, Search, ChevronRight, 
  Download, ExternalLink, Info, Users, Check, Share2, Copy, 
  Printer, RefreshCw, Zap, BellRing, CheckCheck, Loader2, Send
} from 'lucide-react';
import { IncentivePackage, User } from '../types';

interface GovernmentIncentivesViewProps {
  currentUser?: User | null;
  onOpenOffices?: () => void;
  onBack?: () => void;
}

export const GovernmentIncentivesView: React.FC<GovernmentIncentivesViewProps> = ({
  currentUser,
  onOpenOffices,
  onBack
}) => {
  const [incentives, setIncentives] = useState<IncentivePackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncentive, setSelectedIncentive] = useState<IncentivePackage | null>(null);
  
  // Outreach & Sync states
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('আজকের লাইভ বুলেটিন');
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastSuccessMsg, setBroadcastSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/incentives')
      .then(res => res.json())
      .then(data => {
        setIncentives(data);
        if (data.length > 0) {
          // Prefer machinery subsidy as featured default if present
          const machinery = data.find((d: any) => d.category === 'MACHINERY_SUBSIDY');
          setSelectedIncentive(machinery || data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAutoSync = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch('/api/incentives/auto-sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setIncentives(data.incentives);
        setLastSyncedTime(data.lastSyncedAt || 'আজ');
        setSyncFeedback(`⚡ সফলভাবে সিঙ্ক সম্পন্ন! ${data.newCount > 0 ? `${data.newCount}টি নতুন সরকারি সার্কুলার যুক্ত হয়েছে।` : 'সরকারি ডেটাবেজ ও প্রকল্প উইং সর্বশেষ তথ্যে হালনাগাদ আছে।'}`);
      }
    } catch (e) {
      setSyncFeedback('সার্ভার থেকে লাইভ সিঙ্ক করতে সমস্যা হয়েছে।');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 4500);
    }
  };

  const handleShareWhatsApp = (item: IncentivePackage) => {
    const stepsText = item.applicationStepsBn && item.applicationStepsBn.length > 0
      ? `\n📋 *কীভাবে আবেদন করবেন:*\n${item.applicationStepsBn.join('\n')}\n`
      : '';

    const text = `📢 *সরকারি কৃষি সহায়তা ও যন্ত্রপাতি নোটিশ*
━━━━━━━━━━━━━━━━━━━━
🌾 *${item.titleBn}*
🗓 মৌসুম: ${item.seasonBn}
🏛 কর্তৃপক্ষ: ${item.departmentBn}

🔧 *সুবিধাসমূহ:*
${item.benefitsBn.map(b => `• ${b}`).join('\n')}
${stepsText}
📄 *প্রয়োজনীয় কাগজপত্র:*
${item.requiredDocsBn.map(d => `• ${d}`).join('\n')}

📞 হেল্পলাইন: ${item.hotline}
🏢 স্থানীয় দপ্তর: ${item.contactOfficerBn}
🌐 সরাসরি মোবাইল অ্যাপে দেখুন: ${window.location.origin}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyNotice = (item: IncentivePackage) => {
    const stepsText = item.applicationStepsBn && item.applicationStepsBn.length > 0
      ? `\nকীভাবে আবেদন করবেন:\n${item.applicationStepsBn.join('\n')}\n`
      : '';

    const text = `📢 সরকারি কৃষি সহায়তা ও যন্ত্রপাতি নির্দেশিকা
-------------------------------------------
${item.titleBn}
মৌসুম: ${item.seasonBn} | দপ্তর: ${item.departmentBn}

সুবিধাসমূহ:
${item.benefitsBn.map(b => `• ${b}`).join('\n')}
${stepsText}
প্রয়োজনীয় কাগজপত্র:
${item.requiredDocsBn.map(d => `• ${d}`).join('\n')}

আবেদনের সময়সীমা: ${item.applicationDeadlineBn}
বিতরণ স্থান: ${item.distributionVenuesBn.join(', ')}
জরুরি হটলাইন: ${item.hotline}
যোগাযোগ: ${item.contactOfficerBn}`;

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBroadcast = async (item: IncentivePackage) => {
    setIsBroadcasting(true);
    try {
      const res = await fetch('/api/incentives/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleBn: item.titleBn,
          messageBn: `সরকারি কৃষি নোটিশ: ${item.titleBn}। বিস্তারিত জেনে উপজেলা কৃষি অফিসে যোগাযোগ করুন (হটলাইন: ১৬১২৩)।`
        })
      });
      const data = await res.json();
      if (data.success) {
        setBroadcastSuccessMsg(data.message || 'সকল কৃষক ও ডিলারের নোটিফিকেশন বারে পাঠানো হয়েছে!');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsBroadcasting(false);
      setTimeout(() => setBroadcastSuccessMsg(null), 3500);
    }
  };

  const categories = [
    { id: 'ALL', label: 'সব প্রণোদনা ও সার্কুলার' },
    { id: 'MACHINERY_SUBSIDY', label: '🚜 কৃষি যন্ত্রপাতিতে ভর্তুকি' },
    { id: 'FREE_SEEDS_FERTILIZER', label: '🌱 বিনামূল্যে বীজ ও সার' },
    { id: 'SPECIAL_PROJECT', label: '🌊 উপকূলীয় বিশেষ প্রকল্প' },
    { id: 'DISASTER_RELIEF', label: '🛡️ পুনর্বাসন স্কিম' },
  ];

  const filteredIncentives = incentives.filter(inc => {
    const matchesCategory = selectedCategory === 'ALL' || inc.category === selectedCategory;
    const matchesSearch = inc.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.seasonBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Gift className="w-3.5 h-3.5 text-amber-300" />
                <span>কৃষি মন্ত্রণালয় ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)</span>
              </span>
              <span className="bg-white/10 text-emerald-200 border border-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                {lastSyncedTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              সরকারি কৃষি প্রণোদনা, যন্ত্রপাতি ও সহায়তা তথ্যকোষ
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              কৃষি যন্ত্রপাতিতে ৭০% পর্যন্ত সরকারি ভর্তুকি ও পাওয়ার টিলার/হারভেস্টার প্রাপ্তির ৭-দফা নির্দেশিকা, বিনামূল্যে সার-বীজ প্রণোদনা এবং উপকূলীয় পুনর্বাসন প্যাকেজ।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
            {/* Auto-Sync Live Feed Button */}
            <button
              onClick={handleAutoSync}
              disabled={isSyncing}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-emerald-500/40 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>সিঙ্ক হচ্ছে...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>সরকারি খবর অটো-সিঙ্ক</span>
                </>
              )}
            </button>

            {onOpenOffices && (
              <button
                onClick={onOpenOffices}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>উপজেলা ও SAAO ডিরেক্টরি</span>
              </button>
            )}
          </div>
        </div>

        {/* Sync Feedback Toast */}
        {syncFeedback && (
          <div className="mt-4 p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <Zap className="w-4 h-4 text-amber-300 shrink-0 fill-amber-300" />
            <span>{syncFeedback}</span>
          </div>
        )}
      </div>

      {/* Real-World Outreach Notice Box */}
      <div className="bg-gradient-to-r from-blue-900/10 via-emerald-900/10 to-teal-900/10 border border-blue-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            📲
          </span>
          <div>
            <div className="font-extrabold text-stone-900">
              সব কৃষক ও ডিলার তো প্রতিদিন ওয়েবসাইটে আসবে না — খবর তাদের কাছে পৌঁছাবেন কীভাবে?
            </div>
            <div className="text-[11px] text-stone-600 mt-0.5">
              প্রতিটি সার্কুলারে থাকা <strong>"হোয়াটসঅ্যাপে পাঠান"</strong> বাটনে ক্লিক করে এক ক্লিকে স্থানীয় কৃষক বা ডিলার গ্রুপে ফরোয়ার্ড করুন অথবা প্রিন্ট করে নোটিশ বোর্ডে টাঙিয়ে দিন।
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="যন্ত্রপাতি, সার বা প্রণোদনা খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Two Column Layout: List & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Incentive List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-bold px-1">
            <span>উপলব্ধ প্যাকেজ ও সার্কুলার ({filteredIncentives.length} টি)</span>
            <span className="text-[11px] text-emerald-800 font-bold">● চলমান আবেদন</span>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              প্রণোদনা তথ্য লোড হচ্ছে...
            </div>
          ) : filteredIncentives.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 text-xs">
              কোনো প্রণোদনা প্যাকেজ পাওয়া যায়নি।
            </div>
          ) : (
            filteredIncentives.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedIncentive(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                  selectedIncentive?.id === item.id
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-500'
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    item.category === 'MACHINERY_SUBSIDY' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.category === 'MACHINERY_SUBSIDY' ? '🚜 যন্ত্রপাতি ভর্তুকি' : item.seasonBn}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    সক্রিয় বিজ্ঞপ্তি
                  </span>
                </div>

                <h3 className="font-extrabold text-stone-900 text-sm leading-snug">
                  {item.titleBn}
                </h3>

                <div className="text-xs text-stone-500 flex items-center justify-between pt-1 border-t border-stone-100">
                  <span className="line-clamp-1">{item.departmentBn}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-7">
          {selectedIncentive ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-5">
              
              {/* Top Action & Broadcast Bar (Social Outreach for farmers who don't visit the site) */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>কৃষক ও ডিলারদের কাছে পৌঁছে দেওয়ার সরাসরি মাধ্যম:</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* WhatsApp Share Button */}
                  <button
                    onClick={() => handleShareWhatsApp(selectedIncentive)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <span>📲 হোয়াটসঅ্যাপে কৃষকদের জানান</span>
                  </button>

                  {/* Copy Notice Button */}
                  <button
                    onClick={() => handleCopyNotice(selectedIncentive)}
                    className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    {copiedNotice ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>পুরো নোটিশ কপি</span>
                      </>
                    )}
                  </button>

                  {/* Print Notice for hanging at dealer shop or union parishad */}
                  <button
                    onClick={handlePrint}
                    className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-500" />
                    <span>🖨️ প্রিন্ট করুন</span>
                  </button>

                  {/* Broadcast In-App Alert to all registered users */}
                  <button
                    onClick={() => handleBroadcast(selectedIncentive)}
                    disabled={isBroadcasting}
                    className="bg-stone-900 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ml-auto"
                  >
                    {isBroadcasting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <BellRing className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>নোটিফিকেশন পাঠান</span>
                  </button>
                </div>

                {broadcastSuccessMsg && (
                  <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                    ✅ {broadcastSuccessMsg}
                  </div>
                )}
              </div>

              {/* Header Details */}
              <div className="border-b border-stone-200 pb-4 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-lg">
                    {selectedIncentive.seasonBn}
                  </span>
                  <span className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-3 py-1 rounded-lg">
                    {selectedIncentive.ministryBn}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
                  {selectedIncentive.titleBn}
                </h2>

                <p className="text-xs text-stone-500 font-medium">
                  তত্ত্বাবধানে: {selectedIncentive.departmentBn}
                </p>
              </div>

              {/* 1. Benefits Provided */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5 text-emerald-950">
                  <Gift className="w-4 h-4 text-emerald-700" />
                  <span>🔧 কী ধরনের সুযোগ-সুবিধা বা কৃষি যন্ত্রপাতি পাওয়া যেতে পারে:</span>
                </h3>
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                  {selectedIncentive.benefitsBn.map((ben, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-emerald-950 font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Step-by-Step Application Guide (User's 7 Steps) */}
              {selectedIncentive.applicationStepsBn && selectedIncentive.applicationStepsBn.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5 text-blue-950">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>📋 কীভাবে আবেদন করবেন? (ধাপে ধাপে সরকারি নির্দেশিকা):</span>
                  </h3>
                  <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2.5">
                    {selectedIncentive.applicationStepsBn.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-blue-950 font-semibold leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                          {i + 1}
                        </span>
                        <span>{step.replace(/^[০-৯1-9]+️⃣\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Eligibility Requirements */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5 text-stone-900">
                  <Users className="w-4 h-4 text-purple-700" />
                  <span>👨‍🌾 কারা আবেদন করতে পারেন ও শর্তাবলী:</span>
                </h3>
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                  {selectedIncentive.eligibilityBn.map((elg, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700 font-medium leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                      <span>{elg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Required Documents */}
              <div className="space-y-2">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5 text-stone-900">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>📄 কী কী কাগজপত্র লাগবে (চেকলিস্ট):</span>
                </h3>
                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 space-y-1.5">
                  {selectedIncentive.requiredDocsBn.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-800 font-medium">
                      <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[11px] shrink-0">
                        {i + 1}
                      </span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Deadlines & Venues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
                  <div className="text-stone-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>আবেদনের সময়সীমা:</span>
                  </div>
                  <div className="font-bold text-stone-900 text-xs">
                    {selectedIncentive.applicationDeadlineBn}
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
                  <div className="text-stone-400 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>যোগাযোগ ও প্রাপ্তিস্থান:</span>
                  </div>
                  <div className="font-bold text-stone-900 text-xs">
                    {selectedIncentive.distributionVenuesBn.join(' ও ')}
                  </div>
                </div>
              </div>

              {/* 6. Contact Local Officer for Application */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="font-extrabold text-sm">
                    আবেদনে উপজেলা কৃষি অফিস ও ব্লকের SAAO সহায়তা নিন
                  </div>
                  <div className="text-xs text-emerald-100 font-medium">
                    {selectedIncentive.contactOfficerBn}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:16123"
                    className="bg-white hover:bg-stone-100 text-emerald-950 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                    <span>কল করুন ১৬১২৩</span>
                  </a>
                  {onOpenOffices && (
                    <button
                      onClick={onOpenOffices}
                      className="bg-emerald-900/60 hover:bg-emerald-900 text-white px-3 py-2.5 rounded-xl font-bold text-xs border border-white/20 transition-all cursor-pointer"
                    >
                      অফিস ডিরেক্টরি
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-400 text-xs">
              বাম পাশ থেকে যেকোনো একটি সার্কুলার বা প্রণোদনা নির্বাচন করুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
