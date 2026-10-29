import React, { useState } from 'react';
import { 
  Sprout, PhoneCall, Bell, Shield, User as UserIcon, 
  ChevronDown, CheckCircle2, AlertTriangle, Layers, BookOpen, 
  Building2, CloudSun, BarChart3, FileText, RefreshCw,
  Bot, Gift, Sparkles, Store, ShoppingBag, HelpCircle,
  Download, Rocket
} from 'lucide-react';
import { User, Role, NotificationItem } from '../types';
import { AboutAgriCareModal } from './AboutAgriCare';

interface NavbarProps {
  currentUser: User;
  allUsers: { id: string; name: string; role: Role; designation?: string }[];
  onSwitchRole: (role?: Role, userId?: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  onOpenInstallModal?: () => void;
  onOpenPublishModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  allUsers,
  onSwitchRole,
  activeTab,
  setActiveTab,
  notifications,
  onOpenInstallModal,
  onOpenPublishModal
}) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'SUPER_ADMIN': return { bn: 'সুপার এডমিন', color: 'bg-red-100 text-red-800 border-red-200' };
      case 'ADMIN': return { bn: 'এডমিন', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'AGRICULTURE_OFFICER': return { bn: 'কৃষি কর্মকর্তা', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'REVIEWER': return { bn: 'বৈজ্ঞানিক রিভিউয়ার', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'DATA_ENTRY_OPERATOR': return { bn: 'ডাটা এন্ট্রি', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'FARMER': return { bn: 'কৃষক', color: 'bg-green-100 text-green-800 border-green-200' };
      default: return { bn: 'অতিথি', color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const currentRoleInfo = getRoleLabel(currentUser.role);
  const unreadNotifs = Array.isArray(notifications) ? notifications.filter(n => !n.isRead).length : 0;

  return (
    <>
      <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-40 no-print">
        {/* Top Emergency / Hotline bar */}
        <div className="bg-emerald-950 px-4 py-1 text-xs flex justify-between items-center text-emerald-200 border-b border-emerald-900">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের কৃষি সিদ্ধান্ত সহায়তা প্ল্যাটফর্ম</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:16123" 
              className="flex items-center gap-1 font-semibold hover:text-white transition-colors text-amber-300"
              title="কৃষি কল সেন্টার হটলাইন"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>কৃষি কল সেন্টার: ১৬১২৩ (টোল ফ্রি)</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('farmer')} 
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-inner">
              <Sprout className="w-6 h-6 text-emerald-900" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>কৃষি কেয়ার AI</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-700 text-emerald-100 font-normal">v1.0</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[11px] text-emerald-200 hidden sm:block">AI-সহায়তায় ফসলের সঠিক চিকিৎসা</p>
                <span className="hidden md:inline-block text-[10px] bg-emerald-950/80 text-amber-300 px-2 py-0.5 rounded font-semibold border border-emerald-700/60">
                  Powered by Ynanx Lab
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setShowAboutModal(true)}
              className="px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 bg-amber-400 text-emerald-950 font-bold shadow-xs hover:bg-amber-300 cursor-pointer"
              title="কৃষি কেয়ার AI কেন ব্যবহার করবেন ও উপকারিতা"
            >
              <HelpCircle className="w-4 h-4 text-emerald-950" />
              <span>কেন কৃষি কেয়ার? (উপকারিতা)</span>
            </button>

            <button
              onClick={() => setActiveTab('farmer')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'farmer' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <Sprout className="w-4 h-4 text-amber-300" />
              <span>গাছের সমস্যা নির্ণয়</span>
            </button>

            <button
              onClick={() => setActiveTab('farms')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'farms' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <Layers className="w-4 h-4 text-teal-300" />
              <span>আমার খামার ও জমি</span>
            </button>

            <button
              onClick={() => setActiveTab('crops')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'crops' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>ফসল ও বালাই তথ্যকোষ</span>
            </button>


            <button
              onClick={() => setActiveTab('offices')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'offices' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>কৃষি অফিস খুঁজুন</span>
            </button>

            <button
              onClick={() => setActiveTab('weather-market')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'weather-market' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <CloudSun className="w-4 h-4" />
              <span>কৃষি আবহাওয়া</span>
            </button>

            <button
              onClick={() => setActiveTab('ask-ai')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-semibold ${
                activeTab === 'ask-ai' ? 'bg-amber-400 text-emerald-950 shadow-sm' : 'text-amber-300 hover:bg-emerald-700/60'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>এআই পরামর্শক</span>
            </button>

            <button
              onClick={() => setActiveTab('dealers')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'dealers' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <Store className="w-4 h-4 text-amber-300" />
              <span>ডিলার ও যন্ত্রপাতি</span>
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'marketplace' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-teal-300" />
              <span>ফসল হাট ও বাজারদর</span>
            </button>

            <button
              onClick={() => setActiveTab('incentives')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'incentives' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-100 hover:bg-emerald-700/60'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>সরকারি প্রণোদনা</span>
            </button>

            {/* Role specific portals */}
            {currentUser.role === 'AGRICULTURE_OFFICER' && (
              <button
                onClick={() => setActiveTab('officer')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'officer' ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-amber-300 hover:bg-emerald-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>অফিসার পোর্টাল</span>
              </button>
            )}

            {currentUser.role === 'REVIEWER' && (
              <button
                onClick={() => setActiveTab('reviewer')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'reviewer' ? 'bg-amber-400 text-emerald-950' : 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>রিভিউয়ার পোর্টাল</span>
              </button>
            )}

            {currentUser.role === 'DATA_ENTRY_OPERATOR' && (
              <button
                onClick={() => setActiveTab('data-entry')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'data-entry' ? 'bg-amber-400 text-emerald-950' : 'bg-amber-800 text-amber-100 hover:bg-amber-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>ডাটা এন্ট্রি পোর্টাল</span>
              </button>
            )}

            {(currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5 ${
                  activeTab === 'admin' ? 'bg-amber-400 text-emerald-950' : 'bg-red-900 text-red-200 hover:bg-red-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>এডমিন ড্যাশবোর্ড</span>
              </button>
            )}
          </nav>

          {/* Right Action: Notifications & Role Switcher */}
          <div className="flex items-center gap-2">
            {/* PWA Install Button */}
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="hidden md:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-400/40 shadow-xs transition-all cursor-pointer"
                title="প্লে-স্টোর ছাড়া সরাসরি ফোনে ইনস্টল করুন (ফ্রি)"
              >
                <Download className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>অ্যাপ ইনস্টল</span>
              </button>
            )}

            {/* Free Publishing Guide Button */}
            {onOpenPublishModal && (
              <button
                onClick={onOpenPublishModal}
                className="hidden sm:flex items-center gap-1.5 bg-teal-950/80 hover:bg-teal-900 text-teal-200 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-teal-700/60 shadow-xs transition-all cursor-pointer"
                title="অ্যাপটি ফ্রিতে অনলাইনে পাবলিশ ও শেয়ার করার নিয়ম"
              >
                <Rocket className="w-3.5 h-3.5 text-amber-400" />
                <span>ফ্রি পাবলিশ</span>
              </button>
            )}

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifModal(!showNotifModal)}
              className="relative p-2 rounded-lg bg-emerald-700/60 hover:bg-emerald-700 text-emerald-100 transition-colors"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-emerald-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Current User & Role Selector Button */}
            <button
              onClick={() => setShowRoleModal(true)}
              className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-950 border border-emerald-700/50 py-1.5 px-2.5 rounded-lg text-left transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-amber-300">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-white truncate max-w-[120px]">{currentUser.name}</div>
                <div className="text-[10px] text-amber-300 font-medium">{currentRoleInfo.bn}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 border-t border-emerald-700/60 bg-emerald-900 px-3 py-2 text-xs">
          {onOpenInstallModal && (
            <button 
              onClick={onOpenInstallModal} 
              className="shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs border border-emerald-400 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>ইনস্টল (ফ্রি)</span>
            </button>
          )}
          {onOpenPublishModal && (
            <button 
              onClick={onOpenPublishModal} 
              className="shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap bg-teal-950 text-teal-200 font-semibold border border-teal-700 cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 text-amber-400" />
              <span>পাবলিশ গাইড</span>
            </button>
          )}
          <button 
            onClick={() => setShowAboutModal(true)} 
            className="shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors bg-amber-400 text-emerald-950 font-bold shadow-xs cursor-pointer active:scale-95"
            title="কৃষি কেয়ার AI কেন ব্যবহার করবেন ও উপকারিতা"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-950" />
            <span>পরিচিতি ও সুবিধা</span>
          </button>
          <button 
            onClick={() => setActiveTab('farmer')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'farmer' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>চিকিৎসা</span>
          </button>
          <button 
            onClick={() => setActiveTab('farms')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'farms' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>আমার জমি</span>
          </button>
          <button 
            onClick={() => setActiveTab('crops')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'crops' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>ফসল তথ্য</span>
          </button>
          <button 
            onClick={() => setActiveTab('offices')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'offices' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>কৃষি অফিস</span>
          </button>
          <button 
            onClick={() => setActiveTab('weather-market')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'weather-market' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <CloudSun className="w-3.5 h-3.5" />
            <span>আবহাওয়া</span>
          </button>
          <button 
            onClick={() => setActiveTab('ask-ai')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'ask-ai' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-amber-300 hover:bg-emerald-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>এআই পরামর্শক</span>
          </button>
          <button 
            onClick={() => setActiveTab('dealers')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'dealers' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-amber-300 hover:bg-emerald-700'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>ডিলার ও সেবা</span>
          </button>
          <button 
            onClick={() => setActiveTab('marketplace')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'marketplace' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-teal-300 hover:bg-emerald-700'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ফসল হাট ও দর</span>
          </button>
          <button 
            onClick={() => setActiveTab('incentives')} 
            className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3.5 rounded-full whitespace-nowrap transition-colors ${
              activeTab === 'incentives' ? 'bg-amber-400 text-emerald-950 font-bold shadow-xs' : 'bg-emerald-800/90 text-emerald-100 hover:bg-emerald-700'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-bold">প্রণোদনা</span>
          </button>
          {currentUser.role !== 'FARMER' && (
            <button 
              onClick={() => {
                if (currentUser.role === 'AGRICULTURE_OFFICER') setActiveTab('officer');
                else if (currentUser.role === 'REVIEWER') setActiveTab('reviewer');
                else if (currentUser.role === 'DATA_ENTRY_OPERATOR') setActiveTab('data-entry');
                else setActiveTab('admin');
              }}
              className="shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full whitespace-nowrap bg-emerald-950 text-amber-300 font-bold border border-emerald-700"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>
                {currentUser.role === 'AGRICULTURE_OFFICER' ? 'অফিসার' : 
                 currentUser.role === 'REVIEWER' ? 'রিভিউয়ার' : 
                 currentUser.role === 'DATA_ENTRY_OPERATOR' ? 'ডাটা এন্ট্রি' : 'এডমিন'}
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Role Switcher Modal (Allows testing all 7 roles seamlessly) */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl text-stone-900 border border-stone-200">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-emerald-600" />
                  <span>ব্যবহারকারী ও রোল নির্বাচন করুন</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  AgriCare AI এর সকল পোর্টাল ও ভূমিকা পরীক্ষা করার জন্য রোল পরিবর্তন করুন
                </p>
              </div>
              <button 
                onClick={() => setShowRoleModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {allUsers.map((u) => {
                const rInfo = getRoleLabel(u.role);
                const isSelected = u.id === currentUser.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      onSwitchRole(u.role, u.id);
                      setShowRoleModal(false);
                      if (u.role === 'AGRICULTURE_OFFICER') setActiveTab('officer');
                      else if (u.role === 'REVIEWER') setActiveTab('reviewer');
                      else if (u.role === 'DATA_ENTRY_OPERATOR') setActiveTab('data-entry');
                      else if (u.role === 'ADMIN' || u.role === 'SUPER_ADMIN') setActiveTab('admin');
                      else setActiveTab('farmer');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500' 
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-stone-900 flex items-center gap-2">
                        <span>{u.name}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${rInfo.color}`}>
                          {rInfo.bn}
                        </span>
                      </div>
                      {u.designation && (
                        <div className="text-xs text-stone-500 mt-0.5">{u.designation}</div>
                      )}
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-lg"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-end p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-stone-200 mt-12 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-stone-100">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5 text-sm">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>সাম্প্রতিক নোটিফিকেশন</span>
              </h4>
              <button 
                onClick={() => setShowNotifModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-xs text-stone-500 text-center py-4">কোনো নতুন বিজ্ঞপ্তি নেই</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="font-semibold text-stone-900 flex items-center gap-1 text-emerald-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{n.titleBn}</span>
                    </div>
                    <p className="text-stone-600 mt-1 leading-relaxed">{n.messageBn}</p>
                    <span className="text-[10px] text-stone-400 mt-1.5 block">{n.createdAt}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* About & Benefits Interactive Modal */}
      <AboutAgriCareModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        onStartDiagnosis={() => {
          setShowAboutModal(false);
          setActiveTab('farmer');
        }}
      />
    </>
  );
};
