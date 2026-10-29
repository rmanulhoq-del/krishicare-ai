import React from 'react';
import { ExternalLink, Sparkles, Megaphone } from 'lucide-react';

interface AdBannerProps {
  slotType?: 'LEADERBOARD' | 'RECTANGLE' | 'IN_FEED';
  title?: string;
  subtitle?: string;
  partnerName?: string;
  phone?: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
  variant?: 'emerald' | 'amber' | 'blue';
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotType = 'LEADERBOARD',
  title = 'অনুমোদিত সার ও আসল বালাইনাশক কিনুন',
  subtitle = 'নিকটস্থ বিসিআইসি ও বিএডিসি ডিলারের কাছে সরকারি মূল্যে সঠিক পণ্য সংগ্রহ করুন',
  partnerName = 'স্পনসরড পার্টনার হাব',
  phone = '০১৮১৯-৮৮৭৭৬৬',
  ctaText = 'দোকান ও ডিলার দেখুন',
  ctaLink,
  badgeText = 'বিজ্ঞাপন / স্পনসরড',
  variant = 'emerald'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'amber':
        return {
          wrapper: 'bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-600/10 border-amber-300',
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          btn: 'bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold'
        };
      case 'blue':
        return {
          wrapper: 'bg-gradient-to-r from-blue-500/10 via-sky-400/5 to-indigo-600/10 border-blue-300',
          badge: 'bg-blue-100 text-blue-900 border-blue-300',
          btn: 'bg-blue-700 hover:bg-blue-800 text-white font-bold'
        };
      default:
        return {
          wrapper: 'bg-gradient-to-r from-emerald-600/10 via-teal-500/5 to-emerald-700/10 border-emerald-300',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          btn: 'bg-emerald-800 hover:bg-emerald-900 text-white font-bold'
        };
    }
  };

  const v = getVariantStyles();

  return (
    <div className={`w-full rounded-2xl border p-3.5 sm:p-4 my-3 transition-all shadow-2xs ${v.wrapper} no-print`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-stone-200 flex items-center justify-center text-lg shrink-0">
            <Megaphone className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border tracking-wide ${v.badge}`}>
                {badgeText}
              </span>
              <span className="text-[10px] text-stone-500 font-semibold">{partnerName}</span>
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-stone-900">
              {title}
            </div>
            <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="text-[11px] text-stone-700 font-bold bg-white hover:bg-stone-50 border border-stone-300 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <span>📞 {phone}</span>
            </a>
          )}
          <a
            href={ctaLink || '#dealers'}
            className={`text-xs px-4 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 ${v.btn}`}
          >
            <span>{ctaText}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
