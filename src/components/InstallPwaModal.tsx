import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle2, Share2, PlusSquare, X, ShieldCheck, Sparkles, WifiOff } from 'lucide-react';

interface InstallPwaModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
  onInstallSuccess?: () => void;
}

export const InstallPwaModal: React.FC<InstallPwaModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallSuccess
}) => {
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Detect if already running in standalone PWA mode
    const isStandalone = (typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches) || (typeof window !== 'undefined' && Boolean((window.navigator as any)?.standalone));
    setIsInstalled(Boolean(isStandalone));
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          onInstallSuccess?.();
          setTimeout(() => onClose(), 1500);
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white bg-emerald-950/60 p-1.5 rounded-full transition-colors cursor-pointer"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold text-2xl shadow-inner">
              🌾
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                ফোনে অ্যাপ ইনস্টল করুন
              </h3>
              <p className="text-xs text-emerald-200">
                প্লে-স্টোর বা কোনো চার্জ ছাড়াই ১০০% ফ্রি!
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-stone-800 text-xs">
          {isInstalled ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-stone-900 text-sm">অ্যাপটি ইতিমধ্যে ইনস্টল করা আছে!</h4>
              <p className="text-stone-600 text-xs">
                আপনি সরাসরি আপনার মোবাইলের হোম স্ক্রিন থেকে কৃষি কেয়ার AI চালাতে পারেন।
              </p>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-2">
                <div className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>আইফোন / আইপ্যাডে ইনস্টল করার নিয়ম:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-700 text-[11px] leading-relaxed">
                  <li>সাফারি ব্রাউজারের নিচে <strong>শেয়ার (Share) <Share2 className="w-3.5 h-3.5 inline text-blue-600" /></strong> বাটনে চাপ দিন।</li>
                  <li>মেনু স্ক্রোল করে <strong>'Add to Home Screen' <PlusSquare className="w-3.5 h-3.5 inline text-stone-800" /></strong> অপশনটি বেছে নিন।</li>
                  <li>উপরে ডানে <strong>'Add'</strong> চাপুন। ব্যাস, আপনার হোম স্ক্রিনে অ্যাপ আইকন তৈরি হয়ে যাবে!</li>
                </ol>
              </div>
            </div>
          ) : (
            /* Android / Desktop Chrome / Edge */
            <div className="space-y-3">
              <p className="text-stone-600 text-xs leading-relaxed">
                মোবাইলের হোম স্ক্রিনে সরাসরি ইনস্টল করে নিন। সাধারণ অ্যাপের মতো ফুল-স্ক্রিনে চলবে এবং কোনো এমবি বা স্টোরেজ খরচ হবে না।
              </p>

              {deferredPrompt ? (
                <button
                  onClick={handleNativeInstall}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download className="w-5 h-5 text-amber-300 animate-bounce" />
                  <span>এখনই ফ্রি ইনস্টল করুন</span>
                </button>
              ) : (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-stone-700 space-y-1.5 text-[11px]">
                  <p className="font-bold text-stone-900">ব্রাউজার মেনু থেকে ইনস্টল করার নিয়ম:</p>
                  <p>১. ব্রাউজারের উপরে ডানদিকের তিনটি ডট (⋮) মেনুতে চাপ দিন।</p>
                  <p>২. <strong>"Install app"</strong> বা <strong>"Add to Home screen"</strong> চাপুন।</p>
                </div>
              )}
            </div>
          )}

          {/* Benefits Bullet points */}
          <div className="pt-2 border-t border-stone-100 space-y-2 text-[11px] text-stone-600">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ইন্টারনেট দুর্বল বা না থাকলেও খামারে বসে কাজ করবে</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>প্লে-স্টোর ফি বা সাবস্ক্রিপশন ছাড়াই আজীবন সম্পূর্ণ ফ্রি</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>এক ক্লিকে ক্যামেরায় ছবি তুলে রোগ নির্ণয় ও প্রেসক্রিপশন</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-stone-600 hover:text-stone-900 text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
