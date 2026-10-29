import React, { useState } from 'react';
import { Globe, Rocket, CheckCircle2, Copy, Check, Share2, Smartphone, ExternalLink, X, ShieldCheck, FolderUp, GitBranch, Download } from 'lucide-react';

interface FreePublishingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreePublishingGuideModal: React.FC<FreePublishingGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'netlify' | 'pwa' | 'vercel'>('netlify');

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://agricare.netlify.app';

  const shareText = `🌾 *কৃষি কেয়ার AI (AgriCare AI) — ফসলের রোগ নির্ণয় ও বালাই ব্যবস্থাপনায় ডিজিটাল ডাক্তার!* 🌾

বাংলাদেশের কৃষকদের জন্য সম্পূর্ণ বিনামূল্যে উন্মুক্ত করা হয়েছে:
📸 ১. আক্রান্ত ফসলের পাতার ছবি তুলেই রোগ ও পোকা শনাক্ত।
💊 ২. ব্রি (BRRI) ও বারি (BARI) বালাই দমন নীতিমালার আলোকে সঠিক ওষুধের মাত্রা।
🚜 ৩. ৭০% পর্যন্ত সরকারি কৃষি যন্ত্রপাতি ভর্তুকির তথ্য।
🌦️ ৪. স্থানীয় কৃষি আবহাওয়া ও স্প্রে সতর্কতা।
📞 ৫. ইউনিয়ন SAAO ও উপজেলা কৃষি অফিসের ডিরেক্টরি।

🌐 এখনই সম্পূর্ণ ফ্রিতে ব্যবহার ও ফোনে ইনস্টল করুন:
${currentOrigin}

💡 Developed & Powered by Ynanx Lab
📞 জরুরি সরকারি কৃষি কল সেন্টার: ১৬১২৩ (টোল ফ্রি)`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-800 to-emerald-950 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white bg-emerald-950/60 p-2 rounded-full transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold mb-1">
            <Rocket className="w-4 h-4 text-amber-400" />
            <span>১০০% আজীবন ফ্রি পাবলিশিং গাইড (Netlify & PWA)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            Netlify (app.netlify.com) এ ফ্রিতে পাবলিশ করবেন কীভাবে?
          </h2>
          <p className="text-xs text-emerald-200 mt-1">
            হ্যাঁ! আপনি সম্পূর্ণ ফ্রিতে Netlify-তে এই অ্যাপটি আজীবন হোস্ট ও পাবলিশ করতে পারবেন।
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-4 pt-2 text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('netlify')}
            className={`py-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'netlify'
                ? 'border-teal-700 text-teal-800 bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-4 h-4 text-teal-600" />
            <span>Netlify পাবলিশিং (০ টাকা)</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pwa'
                ? 'border-emerald-700 text-emerald-800 bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>মোবাইল PWA ইনস্টল ও শেয়ার</span>
          </button>

          <button
            onClick={() => setActiveTab('vercel')}
            className={`py-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'vercel'
                ? 'border-stone-800 text-stone-900 bg-white rounded-t-xl'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Rocket className="w-4 h-4 text-stone-700" />
            <span>Vercel / অন্যান্য অপশন</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto text-stone-800 text-xs">
          
          {activeTab === 'netlify' && (
            <div className="space-y-4">
              {/* Method 1: Netlify Drop */}
              <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold text-sm">১</span>
                    <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                      <FolderUp className="w-4 h-4 text-teal-700" />
                      <span>সবচেয়ে সহজ: Netlify Drop (ড্র্যাগ অ্যান্ড ড্রপ — ৩০ সেকেন্ডে লাইভ)</span>
                    </h3>
                  </div>
                  <span className="text-[10px] bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                    সবচেয়ে দ্রুত
                  </span>
                </div>
                
                <p className="text-stone-600 text-xs leading-relaxed">
                  কোনো গিটহাব অ্যাকাউন্ট বা জটিল সেটিংস ছাড়া মাত্র ১ মিনিটে আপনার সম্পূর্ণ ওয়েবসাইট লাইভ হয়ে যাবে:
                </p>

                <div className="space-y-2 text-[11px] text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-teal-200">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">ধাপ ১:</span>
                    <span>নিচের সবুজ বাটন থেকে সর্বশেষ ফিক্স করা <strong>dist.zip</strong> সরাসরি আপনার ডিভাইসে ডাউনলোড করুন। জিপটি আনজিপ করলে <strong><code>dist</code></strong> ফোল্ডার পাবেন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">ধাপ ২:</span>
                    <span><a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-bold underline inline-flex items-center gap-1">app.netlify.com/drop <ExternalLink className="w-3 h-3" /></a> পেজে যান (বা Netlify সাইটের "Deploys" ট্যাবে যান)।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-teal-800">ধাপ ৩:</span>
                    <span>আনজিপ করা <strong><code>dist</code></strong> ফোল্ডারটি বা dist.zip টেনে এনে ড্রপবক্সে ছেড়ে দিন। সাথে সাথেই আপনার অ্যাপের রোগ নির্ণয় ১০০% নির্ভুলভাবে কাজ করবে!</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="text-left">
                    <p className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>সর্বশেষ আপডেট করা প্রস্তুত ফাইল (dist.zip)</span>
                    </p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">আমের অ্যানথ্রাকনোজ, ব্লাইটসহ সব ফসলের অফলাইন ও ক্লায়েন্ট-সাইড এআই ইঞ্জিন অন্তর্ভুক্ত।</p>
                  </div>
                  <a
                    href="/dist.zip"
                    download="krishicare-ai-dist.zip"
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm text-center shrink-0 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>dist.zip ডাউনলোড</span>
                  </a>
                </div>

                <div className="text-[11px] text-teal-900 bg-teal-100/60 p-2.5 rounded-lg border border-teal-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>আমরা ইতিমধ্যে <code>public/_redirects</code> ও <code>netlify.toml</code> ফাইল তৈরি করে রেখেছি, ফলে পেজ রিফ্রেশ বা রাউটে কোনো 404 এরর হবে না।</span>
                </div>
              </div>

              {/* Method 2: Git Continuous Deployment */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-sm">২</span>
                    <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                      <GitBranch className="w-4 h-4 text-stone-700" />
                      <span>অটোমেটিক আপডেট: Netlify + GitHub (প্রস্তাবিত)</span>
                    </h3>
                  </div>
                  <span className="text-[10px] bg-stone-200 text-stone-800 font-bold px-2 py-0.5 rounded-full">
                    স্বয়ংক্রিয়
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200">
                  <p>১. <a href="https://app.netlify.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-0.5">app.netlify.com <ExternalLink className="w-3 h-3" /></a> এ ফ্রি লগইন করে <strong>"Add new site" ➔ "Import an existing project"</strong> সিলেক্ট করুন।</p>
                  <p>২. আপনার GitHub একাউন্ট যুক্ত করে রিপোজিটরি বেছে নিন।</p>
                  <p>৩. বিল্ড কমান্ডে <code>npm run build</code> এবং পাবলিশ ডিরেক্টরিতে <code>dist</code> স্বয়ংক্রিয়ভাবে সেট হয়ে যাবে।</p>
                  <p>৪. <strong>"Deploy Site"</strong> চাপুন। ব্যাস, আপনার সাইট সম্পূর্ণ বিনামূল্যে আজীবন অনলাইনে সচল থাকবে!</p>
                </div>
              </div>

              {/* Custom Domain & SSL */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <span>বিনামূল্যে কাস্টম ডোমেইন ও ফ্রি SSL (HTTPS):</span>
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Netlify আপনাকে সম্পূর্ণ ফ্রিতে যেকোনো কাস্টম ডোমেইন (যেমন: <code>agricare.com</code> বা আপনার নিজস্ব ডোমেইন) যুক্ত করার সুবিধা দেয় এবং স্বয়ংক্রিয়ভাবে ফ্রি Let's Encrypt SSL সার্টিফিকেট সক্রিয় করে দেয়।
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-stone-900 text-sm">
                    প্লে-স্টোর ($২৫) ছাড়াই কৃষকদের ফোনে অ্যাপ হিসেবে বিতরণ
                  </h3>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                    সরাসরি ইনস্টল
                  </span>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed">
                  এই অ্যাপে আমরা সম্পূর্ণ <strong>PWA (Progressive Web App)</strong> ও অফলাইন সার্ভিস ওয়ার্কার যুক্ত করেছি। কৃষকরা যেকোনো স্মার্টফোনে লিঙ্ক ওপেন করলেই <strong>"ফোনে ইনস্টল করুন"</strong> নোটিফিকেশন পাবেন এবং কোনো অ্যাপ-স্টোর ফি ছাড়াই সরাসরি ফোনে অ্যাপ আইকন তৈরি হয়ে যাবে!
                </p>

                <div className="bg-white border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-stone-800 font-mono text-[11px] truncate w-full sm:w-auto">
                    {currentOrigin}
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyShare}
                      className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                    >
                      {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedShare ? 'কপি হয়েছে' : 'বার্তা কপি করুন'}</span>
                    </button>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer"
                      title="WhatsApp-এ শেয়ার করুন"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <h3 className="font-extrabold text-stone-900 text-sm">
                  ভার্সেল (Vercel) বা রেন্ডার (Render)-এ ফ্রি হোস্টিং
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  আমরা প্রোজেক্টে <code>vercel.json</code> কনফিগারেশন যোগ করে রেখেছি। আপনি চাইলে <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-0.5">Vercel.com <ExternalLink className="w-3 h-3" /></a>-এ ফ্রিতে সাইন-আপ করেও একই রিপোজিটরি সরাসরি ডিপ্লয় করতে পারেন।
                </p>
              </div>
            </div>
          )}

          {/* Checklist */}
          <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-4 space-y-2">
            <h4 className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Netlify ফ্রি হোস্টিংয়ের জন্য যা যা রেডি করা হয়েছে:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-emerald-900">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span><code>public/_redirects</code> (SPA 200 Routing)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span><code>netlify.toml</code> (অটোমেটেড বিল্ড কনফিগ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>PWA Manifest, Icons & Service Worker</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>অফলাইন ফিল্ড রেসিলিয়েন্স ও ক্যাশিং</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-5 sm:px-6 py-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] text-stone-500">
            <div>জরুরি কৃষি হেল্পলাইন: <strong>১৬১২৩</strong></div>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-200">
              Developed & Powered by Ynanx Lab
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            ধন্যবাদ, বুঝতে পেরেছি
          </button>
        </div>
      </div>
    </div>
  );
};
