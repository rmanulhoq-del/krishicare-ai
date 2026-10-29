import React, { useState } from 'react';
import { 
  Sprout, ShieldCheck, HeartHandshake, PhoneCall, 
  Sparkles, Camera, CheckCircle2, ChevronRight, Share2, 
  Copy, CheckCheck, Store, Building2, HelpCircle, ArrowRight,
  TrendingUp, Award, Droplets, CloudSun, FileText, X
} from 'lucide-react';

interface AboutAgriCareProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStartDiagnosis?: () => void;
}

export const AboutAgriCareModal: React.FC<AboutAgriCareProps> = ({
  isOpen = true,
  onClose,
  onStartDiagnosis
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'farmers' | 'dealers' | 'officers' | 'how-to' | 'share'>('farmers');
  const [copiedShareText, setCopiedShareText] = useState(false);

  if (!isOpen) return null;

  const marketingShareMessage = `🌾 *কৃষি কেয়ার AI (AgriCare AI) — আপনার হাতের মুঠোয় ডিজিটাল কৃষি ডাক্তার!* 🌾

আপনি কি জানেন? ফসলের রোগ বা পোকা লাগলে ভুল কীটনাশক কিনে কৃষকের হাজার হাজার টাকা নষ্ট হয়। এখন আপনার স্মার্টফোনে মুহূর্তেই সঠিক সমাধান নিন!

✨ *কৃষি কেয়ার AI কেন ব্যবহার করবেন?*
১. 📸 *ছবি তুলেই রোগ নির্ণয়:* ফসলের পাতার ছবি তুললেই ৫ সেকেন্ডে রোগ ও পোকা শনাক্ত।
২. 💊 *সঠিক উপাদান ও মাত্রা:* কোনো কোম্পানির দালালি নয়; ব্রি (BRRI) ও বারি (BARI) অনুমোদিত নিরপেক্ষ প্রেসক্রিপশন।
৩. 🚜 *৭০% পর্যন্ত যন্ত্রপাতি ভর্তুকি:* পাওয়ার টিলার, কম্বাইন হারভেস্টার ও সরকারি প্রণোদনার তথ্য সবার আগে।
৪. 🌦️ *আবহাওয়া ও স্প্রে পরামর্শ:* বৃষ্টি বা কুয়াশায় ওষুধ স্প্রে করার সঠিক সময় জেনে টাকা বাঁচান।
৫. 📞 *উপজেলা কৃষি অফিসার ও ডিলার ডিরেক্টরি:* আপনার ইউনিয়নের SAAO এবং বিশ্বস্ত ডিলারের মোবাইল নম্বর।
৬. 🖨️ *প্রিন্টযোগ্য প্রেসক্রিপশন:* রিপোর্ট প্রিন্ট করে উপজেলা কৃষি অফিস বা দোকানে নিয়ে যান।

🌐 *এখনই বিনামূল্যে ব্যবহার করুন:*
${typeof window !== 'undefined' ? window.location.origin : ''}

📞 জরুরি সরকারি কৃষি হটলাইন: ১৬১২৩ (টোল ফ্রি)`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(marketingShareMessage);
    setCopiedShareText(true);
    setTimeout(() => setCopiedShareText(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(marketingShareMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-teal-950 text-white p-5 sm:p-6 relative shrink-0">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-950 p-2 rounded-full transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>জাতীয় কৃষি সিদ্ধান্ত সহায়তা প্ল্যাটফর্ম</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <span>🌾 কৃষি কেয়ার AI কী এবং কেন ব্যবহার করবেন?</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl leading-relaxed">
            বাংলাদেশের মাঠপর্যায়ের কৃষক, কৃষি কর্মকর্তা এবং সার-কীটনাশক ডিলারদের জন্য তৈরি আধুনিক, ব্র্যান্ড-নিরপেক্ষ ও বৈজ্ঞানিক ডিজিটাল প্ল্যাটফর্ম।
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-emerald-700/60 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('farmers')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'farmers'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🌾 কৃষকের ৬টি লাভ
            </button>
            <button
              onClick={() => setActiveSubTab('dealers')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'dealers'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🏪 ডিলারদের সুবিধা
            </button>
            <button
              onClick={() => setActiveSubTab('officers')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'officers'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              🏛️ কৃষি কর্মকর্তাদের ভূমিকা
            </button>
            <button
              onClick={() => setActiveSubTab('how-to')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'how-to'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              📱 ব্যবহারের সহজ নিয়ম
            </button>
            <button
              onClick={() => setActiveSubTab('share')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'share'
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-emerald-800/80 text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              📢 প্রচার ও শেয়ার
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-800">
          {/* TAB 1: FARMERS BENEFITS */}
          {activeSubTab === 'farmers' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 font-bold text-lg">
                  💡
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">কেন একজন সাধারণ কৃষক এই অ্যাপটি রাখবেন?</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    কৃষিকাজে সবচেয়ে বড় ক্ষতি হয় ভুল রোগ নির্ণয় এবং মাত্রাতিরিক্ত অপ্রয়োজনীয় রাসায়নিক বিষ প্রয়োগে। কৃষি কেয়ার AI আপনার পকেটের কৃষি বিশেষজ্ঞ হিসেবে সঠিক সময়ে সঠিক সিদ্ধান্ত নিতে সাহায্য করে।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ১
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">৫ সেকেন্ডে রোগ ও পোকা শনাক্ত</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    ধান, আলু, টমেটো, মরিচ, বেগুন বা যে কোনো ফসলের আক্রান্ত পাতার ছবি তুললেই কৃত্রিম বুদ্ধিমত্তা রোগের লক্ষণ বিশ্লেষণ করে তাৎক্ষণিক প্রেসক্রিপশন দেয়।
                  </p>
                </div>

                {/* 2 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ২
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">টাকা বাঁচানো ও ব্র্যান্ড-নিরপেক্ষতা</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    অ্যাপটি কোনো বাণিজ্যিক কোম্পানির স্বার্থ দেখে না। এটি বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) ও কৃষি গবেষণা ইনস্টিটিউট (BARI)-এর অনুমোদিত সক্রিয় উপাদান ও অনুমোদিত মাত্রা জানায়।
                  </p>
                </div>

                {/* 3 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ৩
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">সরকারি যন্ত্রপাতি ও সার-বীজ প্রণোদনা</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    উপকূলীয় ও পাহাড়ি এলাকায় (যেমন বাঁশখালী) কম্বাইন হারভেস্টার, পাওয়ার টিলারে সর্বোচ্চ ৭০% সরকারি ভর্তুকির নিয়ম ও আবেদনের ফরম্যাট সরাসরি অ্যাপেই পাওয়া যায়।
                  </p>
                </div>

                {/* 4 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ৪
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">আবহাওয়া ও স্প্রে সতর্কবার্তা</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    বাতাসের গতি, তাপমাত্রা ও বৃষ্টির পূর্বাভাস দেখে অ্যাপ জানিয়ে দেয় আজ জমিতে স্প্রে করা নিরাপদ কি না। ফলে বৃষ্টির পানিতে ওষুধ ধুয়ে যাওয়ার আর্থিক অপচয় বন্ধ হয়।
                  </p>
                </div>

                {/* 5 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ৫
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">ইউনিয়নভিত্তিক SAAO ও ডিলার তালিকা</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    নিজের ইউনিয়নের উপসহকারী কৃষি কর্মকর্তা (SAAO) এবং সরকারি লাইসেন্সধারী সার-কীটনাশক ডিলারের মোবাইল নম্বর ও দোকানের অবস্থান এক ক্লিকেই পেয়ে যাবেন।
                  </p>
                </div>

                {/* 6 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-emerald-500 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      ৬
                    </span>
                    <h5 className="font-bold text-sm text-stone-900">অফিসিয়াল প্রিন্টযোগ্য প্রেসক্রিপশন</h5>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    অ্যাপের রোগ নির্ণয়ের রিপোর্টটি প্রিন্ট করে বা মোবাইলে দেখিয়ে উপজেলা কৃষি অফিস বা বাজারের ডিলারের কাছে গিয়ে নির্ভুলভাবে ওষুধ সংগ্রহ করা যায়।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEALERS BENEFITS */}
          {activeSubTab === 'dealers' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-lg">
                  🏪
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">সার, বীজ ও বালাইনাশক ডিলারদের উপকারিতা</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    স্থানীয় বালাইনাশক বিক্রেতাদের জন্য এই অ্যাপটি একটি আস্থার মাধ্যম। কৃষক সঠিক রোগের প্রেসক্রিপশন নিয়ে এলে ডিলারদের বিক্রয় ও সুনাম বাড়ে।
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">নির্ভুল পণ্য বিক্রয়:</span>
                    কৃষক যখন সক্রিয় উপাদান (Generic Formula) দেখে ওষুধ কিনবে, তখন ভুল প্রয়োগের ঝুঁকি থাকবে না এবং ফসলের উন্নতি দেখে কৃষকের আস্থা বাড়বে।
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">অনুমোদিত ডিলার হিসেবে পরিচিতি:</span>
                    অ্যাপের ডিলার ডিরেক্টরিতে নাম, দোকানের ঠিকানা ও ফোন নম্বর থাকলে পুরো উপজেলার কৃষকরা সহজেই যোগাযোগ করে পণ্য সংগ্রহ করতে পারবে।
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">কৃষি হাটে তালিকাভুক্তি:</span>
                    আধুনিক কৃষি যন্ত্রপাতি ভাড়া দেওয়া বা স্প্রে সেবা প্রদানকারী উদ্যোক্তারা সরাসরি অ্যাপের মাধ্যমে অর্ডার পেতে পারেন।
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OFFICERS ROLE */}
          {activeSubTab === 'officers' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold text-lg">
                  🏛️
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও কর্মকর্তাদের ভূমিকা</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    উপসহকারী কৃষি কর্মকর্তা (SAAO) এবং উপজেলা কৃষি কর্মকর্তাদের (UAO) কাজকে সহজ ও দ্রুত করতেই এই ডিজিটাল সহায়তা ব্যবস্থা।
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">ব্লকভিত্তিক বালাই মনিটরিং:</span>
                    কোন ব্লকে কোন পোকা বা ছত্রাকের প্রাদুর্ভাব বাড়ছে, তা রিয়েল-টাইমে জানা যায়। ফলে আগাম সতর্কবার্তা জারি করা সহজ হয়।
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">ডিজিটাল কেস রিভিউ ও প্রেসক্রিপশন অনুমোদন:</span>
                    কর্মকর্তারা তাদের বিশেষ পোর্টালে ঢুকে কৃষকের রোগ নির্ণয় রিপোর্ট যাচাই বা সংশোধন করে দিতে পারেন।
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">জাতীয় ব্রি ও বারি প্রোটোকল অনুসরণ:</span>
                    আইপিএম (IPM) ও জৈব বালাই ব্যবস্থাপনাকে সর্বোচ্চ অগ্রাধিকার দিয়ে কৃষিকে পরিবেশবান্ধব ও নিরাপদ খাদ্যে রূপান্তর করা।
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOW TO USE */}
          {activeSubTab === 'how-to' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-stone-900">অ্যাপটি ব্যবহারের ৪টি সহজ ধাপ:</h4>

              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ১
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">আপনার এলাকা নিশ্চিত করুন:</span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      হোম পেজে নিজের উপজেলা ও ইউনিয়ন সিলেক্ট করুন। এতে আপনার এলাকার উপসহকারী কর্মকর্তা ও স্থানীয় আবহাওয়ার তথ্য যুক্ত হবে।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ২
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">আক্রান্ত ফসলের পরিষ্কার ছবি তুলুন:</span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      ক্যামেরা বাটনে ক্লিক করে আক্রান্ত পাতা বা পোকাটির কাছ থেকে স্পষ্ট ছবি তুলুন বা গ্যালারি থেকে সিলেক্ট করুন।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ৩
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">এআই প্রেসক্রিপশন ও প্রতিকার জানুন:</span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      কয়েক সেকেন্ডে রোগের বৈজ্ঞানিক নাম, লক্ষণ, জৈব প্রতিকার এবং অনুমোদিত মাত্রাসহ রাসায়নিক ওষুধের তথ্য ভেসে উঠবে।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ৪
                  </span>
                  <div>
                    <span className="font-bold text-stone-900 text-xs block">প্রেসক্রিপশন প্রিন্ট করুন বা ১৬১২৩-এ পরামর্শ নিন:</span>
                    <p className="text-xs text-stone-600 mt-0.5">
                      রিপোর্ট প্রিন্ট করে ডিলারের কাছে গিয়ে ওষুধ নিন অথবা ফলো-আপের মাধ্যমে ফসল সুস্থ হলো কি না ট্র্যাক করুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SHARE / MARKETING */}
          {activeSubTab === 'share' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h4 className="font-bold text-sm text-stone-900 mb-1 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <span>কৃষক ও শুভাকাঙ্ক্ষীদের সাথে মেসেজটি শেয়ার করুন</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  আগামী ১৫-২০ দিনের ট্রায়াল ও মার্কেটিংয়ের জন্য এই মেসেজটি কপি করে WhatsApp গ্রুপ, Facebook বা মেসেঞ্জারে এলাকার কৃষকদের পাঠাতে পারেন।
                </p>

                <div className="mt-3 bg-white p-3 rounded-xl border border-emerald-300 font-mono text-[11px] text-stone-700 max-h-40 overflow-y-auto whitespace-pre-wrap select-all">
                  {marketingShareMessage}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp-এ সরাসরি পাঠান</span>
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    {copiedShareText ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">কপি সম্পন্ন হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>পুরো লেখা কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-50 border-t border-stone-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>জরুরি সরকারি সহায়তা: <strong>১৬১২৩</strong></span>
            </div>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
              Developed & Powered by Ynanx Lab
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onStartDiagnosis && (
              <button
                onClick={() => {
                  if (onClose) onClose();
                  onStartDiagnosis();
                }}
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>এখনই ফসলের রোগ পরীক্ষা করুন</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Top Hero Banner Component specifically designed for FarmerHome
export const AboutAgriCareHeroBanner: React.FC<{
  onOpenDetails: () => void;
  onStartDiagnosis: () => void;
}> = ({ onOpenDetails, onStartDiagnosis }) => {
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return localStorage.getItem('agricare_intro_minimized') === 'true';
    } catch (e) {
      return false;
    }
  });

  const toggleMinimize = () => {
    const next = !isMinimized;
    setIsMinimized(next);
    try {
      localStorage.setItem('agricare_intro_minimized', String(next));
    } catch (e) {}
  };

  if (isMinimized) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-sm">
            🌾
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-stone-900">
              কৃষি কেয়ার AI — আপনার হাতের মুঠোয় ডিজিটাল কৃষি বিশেষজ্ঞ
            </h4>
            <p className="text-[11px] text-stone-500">
              রোগ নির্ণয় • ব্র্যান্ড-নিরপেক্ষ চিকিৎসা • ৭০% পর্যন্ত সরকারি ভর্তুকি
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDetails}
            className="text-xs text-emerald-800 font-bold bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            বিস্তারিত উপকারিতা
          </button>
          <button
            onClick={toggleMinimize}
            className="text-stone-400 hover:text-stone-700 text-xs px-2 py-1 rounded cursor-pointer"
            title="বড় করুন"
          >
            বড় করুন ▾
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-700/40 space-y-4">
      {/* Top Kicker & Close/Minimize */}
      <div className="flex items-center justify-between gap-2 border-b border-emerald-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="text-xs font-bold text-amber-300">
            ভূমিকা ও পরিচিতি • কেন কৃষি কেয়ার AI ব্যবহার করবেন?
          </span>
        </div>

        <button
          onClick={toggleMinimize}
          className="text-emerald-300 hover:text-white text-xs bg-emerald-950/70 hover:bg-emerald-950 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          সংক্ষেপ করুন ▴
        </button>
      </div>

      {/* Main Headline */}
      <div className="space-y-1.5">
        <h2 className="text-lg sm:text-2xl font-black text-white leading-snug">
          কৃষকের টাকা বাঁচাতে ও ফসলের সঠিক চিকিৎসায় এআই-চালিত সিদ্ধান্ত সহায়তা
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
          ভুল ওষুধে ক্ষতি ও অতিরিক্ত খরচ থেকে কৃষককে বাঁচাতে এই ডিজিটাল প্ল্যাটফর্ম। ছবি তুললেই পাবেন ব্রি (BRRI) ও বারি (BARI) অনুমোদিত নিরপেক্ষ প্রেসক্রিপশন এবং সরকারি ভর্তুকি সুবিধা।
        </p>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-3 space-y-1">
          <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
            <span>📸</span>
            <span>৫ সেকেন্ডে রোগ</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-normal">
            পাতার ছবি তুললেই রোগ শনাক্ত ও বিজ্ঞানসম্মত চিকিৎসা।
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-3 space-y-1">
          <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
            <span>🛡️</span>
            <span>টাকা বাঁচানো</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-normal">
            কোনো কোম্পানির দালালি নয়; সঠিক উপাদান ও সরকারি মাত্রা।
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-3 space-y-1">
          <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
            <span>🚜</span>
            <span>৭০% ভর্তুকি</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-normal">
            হারভেস্টার ও পাওয়ার টিলারে সরকারি সহায়তার আবেদন তথ্য।
          </p>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-2xl p-3 space-y-1">
          <div className="text-amber-400 font-black text-sm flex items-center gap-1.5">
            <span>🌦️</span>
            <span>স্প্রে পরামর্শ</span>
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-normal">
            বৃষ্টি ও তাপমাত্রার ঝুঁকি দেখে সঠিক সময়ে ওষুধ প্রয়োগ।
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenDetails}
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-emerald-950" />
            <span>অ্যাপের বিস্তারিত ভূমিকা ও উপকারিতা দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onStartDiagnosis}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-emerald-500 shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Camera className="w-4 h-4 text-amber-300" />
            <span>ছবি তুলে পরীক্ষা শুরু করুন</span>
          </button>
        </div>

        <div className="text-[11px] text-emerald-300/80 flex items-center gap-1.5 flex-wrap">
          <span>হটলাইন: <strong>১৬১২৩</strong></span>
          <span aria-hidden="true">·</span>
          <span>ব্র্যান্ড-নিরপেক্ষ</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
            Powered by Ynanx Lab
          </span>
        </div>
      </div>
    </div>
  );
};
