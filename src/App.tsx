import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FarmerHome } from './components/FarmerHome';
import { DiagnosisWorkflow } from './components/DiagnosisWorkflow';
import { FarmerReportsView } from './components/FarmerReportsView';
import { OfficerPortal } from './components/OfficerPortal';
import { ReviewerPortal } from './components/ReviewerPortal';
import { DataEntryPortal } from './components/DataEntryPortal';
import { AdminPortal } from './components/AdminPortal';
import { CropLibraryView } from './components/CropLibraryView';
import { OfficesDirectoryView } from './components/OfficesDirectoryView';
import { MarketWeatherView } from './components/MarketWeatherView';
import { AskAgriAiView } from './components/AskAgriAiView';
import { GovernmentIncentivesView } from './components/GovernmentIncentivesView';
import { DiagnosisReportModal } from './components/DiagnosisReportModal';
import { FollowupTrackerModal } from './components/FollowupTrackerModal';
import { MyFarmsView, FarmField } from './components/MyFarmsView';
import { DealerDirectory } from './components/DealerDirectory';
import { KrishiHaat } from './components/KrishiHaat';
import { InstallPwaModal } from './components/InstallPwaModal';
import { FreePublishingGuideModal } from './components/FreePublishingGuideModal';
import { User, Role, Diagnosis, NotificationItem } from './types';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Captured in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-stone-200 rounded-3xl text-center space-y-4 shadow-xl">
          <div className="text-5xl">🌾</div>
          <h2 className="text-xl font-bold text-stone-900">সাময়িক ত্রুটি হয়েছে</h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            পৃষ্ঠাটি লোড হতে সমস্যা হয়েছে। অনুগ্রহ করে নিচের বাটনে চাপ দিয়ে রিফ্রেশ করুন।
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            🔄 পৃষ্ঠাটি রিফ্রেশ করুন
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const fallbackUser: User = {
  id: 'usr-farmer',
  name: 'মো. আবুল কাশেম (কৃষক)',
  phone: '০১৮১৮-৭৬৫৪৩২',
  role: 'FARMER',
  divisionId: 'div-chattogram',
  districtId: 'dist-chattogram',
  upazilaId: 'upz-banshkhali',
  unionId: 'uni-napora',
  designation: 'নিবন্ধিত প্রান্তিক কৃষক, নাপোড়া, বাঁশখালী',
  createdAt: '2026-01-01'
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(fallbackUser);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('farmer');
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);
  const [initialImageFile, setInitialImageFile] = useState<File | null>(null);

  // Modals
  const [selectedReportForPrint, setSelectedReportForPrint] = useState<Diagnosis | null>(null);
  const [selectedDiagnosisForFollowup, setSelectedDiagnosisForFollowup] = useState<Diagnosis | null>(null);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Initial Load User & Cases
  const loadInitialData = async () => {
    try {
      const authRes = await fetch('/api/auth/me');
      if (authRes.ok) {
        const authData = await authRes.json();
        setCurrentUser(authData.user || fallbackUser);
        setAllUsers(authData.allUsers || []);
      } else {
        setCurrentUser(fallbackUser);
      }

      let loadedDiagnoses: Diagnosis[] = [];
      try {
        const diagRes = await fetch('/api/diagnoses');
        if (diagRes.ok) {
          const diagData = await diagRes.json();
          if (Array.isArray(diagData)) loadedDiagnoses = diagData;
        }
      } catch {}

      // Merge with localStorage for offline / Netlify persistence
      try {
        const localSaved = localStorage.getItem('agricare_diagnoses');
        if (localSaved) {
          const localList: Diagnosis[] = JSON.parse(localSaved);
          if (Array.isArray(localList)) {
            const mergedMap = new Map<string, Diagnosis>();
            localList.forEach(d => mergedMap.set(d.id, d));
            loadedDiagnoses.forEach(d => mergedMap.set(d.id, d));
            loadedDiagnoses = Array.from(mergedMap.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
        }
      } catch {}
      setDiagnoses(loadedDiagnoses);

      const notifRes = await fetch('/api/notifications');
      if (notifRes.ok) {
        const notifData = await notifRes.json();
        setNotifications(Array.isArray(notifData) ? notifData : []);
      }
    } catch (err) {
      console.error('Failed to load initial data, using offline fallback:', err);
      setCurrentUser(fallbackUser);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Switch Role Handler
  const handleSwitchRole = async (role?: Role, userId?: string) => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, userId })
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error('Role switch failed:', err);
    }
  };

  // Start diagnosis with image directly from camera or file picker
  const handleStartDiagnosisWithImage = (file: File) => {
    setInitialImageFile(file);
    setIsDiagnosing(true);
  };

  const handleStartDiagnosisForField = (_field: FarmField) => {
    setIsDiagnosing(true);
  };

  // Diagnosis completed
  const handleDiagnosisComplete = (diag: Diagnosis) => {
    setDiagnoses(prev => {
      const updated = [diag, ...prev.filter(d => d.id !== diag.id)];
      try {
        localStorage.setItem('agricare_diagnoses', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Follow-up success update
  const handleFollowupSuccess = (updated: Diagnosis) => {
    setDiagnoses(prev => prev.map(d => d.id === updated.id ? updated : d));
  };

  // Officer verification update
  const handleOfficerDiagnosisUpdate = (updated: Diagnosis) => {
    setDiagnoses(prev => prev.map(d => d.id === updated.id ? updated : d));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-stone-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          currentUser={currentUser}
          allUsers={allUsers}
          onSwitchRole={handleSwitchRole}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setIsDiagnosing(false);
            setActiveTab(tab);
          }}
          notifications={notifications}
          onOpenInstallModal={() => setShowInstallModal(true)}
          onOpenPublishModal={() => setShowPublishModal(true)}
        />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        <ErrorBoundary key={activeTab}>
          {/* If user is in Diagnosis Flow */}
        {isDiagnosing ? (
          <DiagnosisWorkflow
            initialImageFile={initialImageFile}
            currentUser={currentUser}
            onCancel={() => {
              setIsDiagnosing(false);
              setInitialImageFile(null);
            }}
            onComplete={handleDiagnosisComplete}
            onOpenReportModal={(diag) => setSelectedReportForPrint(diag)}
            onOpenFollowupModal={(diag) => setSelectedDiagnosisForFollowup(diag)}
          />
        ) : (
          <>
            {/* FARMER PORTAL */}
            {activeTab === 'farmer' && (
              <FarmerHome
                currentUser={currentUser}
                onStartDiagnosisWithImage={handleStartDiagnosisWithImage}
                onStartDiagnosisFlow={() => {
                  setInitialImageFile(null);
                  setIsDiagnosing(true);
                }}
                onViewReports={() => setActiveTab('reports')}
                onViewOffices={() => setActiveTab('offices')}
                onViewWeather={() => setActiveTab('weather-market')}
                onViewCrops={() => setActiveTab('crops')}
                onViewFarms={() => setActiveTab('farms')}
                onAskAi={() => setActiveTab('ask-ai')}
                onViewIncentives={() => setActiveTab('incentives')}
                onViewDealers={() => setActiveTab('dealers')}
                onViewMarketplace={() => setActiveTab('marketplace')}
                onSelectDiagnosis={(diag) => setSelectedReportForPrint(diag)}
                diagnoses={diagnoses}
                onOpenInstallModal={() => setShowInstallModal(true)}
                onOpenPublishModal={() => setShowPublishModal(true)}
              />
            )}

            {/* FARMER MY FARMS & FIELDS */}
            {activeTab === 'farms' && (
              <MyFarmsView
                currentUser={currentUser}
                onStartDiagnosisForField={handleStartDiagnosisForField}
                onBack={() => setActiveTab('farmer')}
              />
            )}


            {/* FARMER REPORTS HISTORY */}
            {activeTab === 'reports' && (
              <FarmerReportsView
                diagnoses={(Array.isArray(diagnoses) ? diagnoses : []).filter(d => d.farmerId === currentUser.id)}
                onSelectDiagnosis={(diag) => setSelectedReportForPrint(diag)}
                onOpenReportModal={(diag) => setSelectedReportForPrint(diag)}
                onOpenFollowupModal={(diag) => setSelectedDiagnosisForFollowup(diag)}
                onBack={() => setActiveTab('farmer')}
              />
            )}

            {/* AGRICULTURE OFFICER PORTAL */}
            {activeTab === 'officer' && (
              <OfficerPortal
                diagnoses={diagnoses}
                onUpdateDiagnosis={handleOfficerDiagnosisUpdate}
                onOpenReportModal={(diag) => setSelectedReportForPrint(diag)}
              />
            )}

            {/* REVIEWER PORTAL */}
            {activeTab === 'reviewer' && <ReviewerPortal />}

            {/* DATA ENTRY PORTAL */}
            {activeTab === 'data-entry' && <DataEntryPortal />}

            {/* ADMIN & SUPER ADMIN PORTAL */}
            {activeTab === 'admin' && <AdminPortal currentUser={currentUser} />}

            {/* CROPS & DISEASES ENCYCLOPEDIA */}
            {activeTab === 'crops' && <CropLibraryView />}

            {/* AGRICULTURE OFFICES DIRECTORY */}
            {activeTab === 'offices' && <OfficesDirectoryView />}

            {/* WEATHER & SPRAY ADVISORY */}
            {activeTab === 'weather-market' && (
              <MarketWeatherView onNavigateToMarketplace={() => setActiveTab('marketplace')} />
            )}

            {/* ASK AGRI AI SPECIALIST */}
            {activeTab === 'ask-ai' && (
              <AskAgriAiView
                currentUser={currentUser}
                onOpenOffices={() => setActiveTab('offices')}
                onBack={() => setActiveTab('farmer')}
              />
            )}

            {/* GOVERNMENT INCENTIVES & SUBSIDIES */}
            {activeTab === 'incentives' && (
              <GovernmentIncentivesView
                currentUser={currentUser}
                onOpenOffices={() => setActiveTab('offices')}
                onBack={() => setActiveTab('farmer')}
              />
            )}

            {/* VERIFIED AGRI DEALERS & INPUT SHOPS (MONETIZATION) */}
            {activeTab === 'dealers' && (
              <DealerDirectory
                currentUser={currentUser}
                onBack={() => setActiveTab('farmer')}
              />
            )}

            {/* KRISHI HAAT (FARMERS CROP MARKETPLACE & MARKET PRICES) */}
            {activeTab === 'marketplace' && (
              <KrishiHaat
                currentUser={currentUser}
                onBack={() => setActiveTab('farmer')}
                onNavigateToDealers={() => setActiveTab('dealers')}
              />
            )}
          </>
        )}
        </ErrorBoundary>
      </main>

      {/* Official Printable Report Modal (For Taking to Krishi Office) */}
      {selectedReportForPrint && (
        <DiagnosisReportModal
          diagnosis={selectedReportForPrint}
          onClose={() => setSelectedReportForPrint(null)}
        />
      )}

      {/* Follow-up Before vs After Outcome Modal */}
      {selectedDiagnosisForFollowup && (
        <FollowupTrackerModal
          diagnosis={selectedDiagnosisForFollowup}
          onClose={() => setSelectedDiagnosisForFollowup(null)}
          onFollowupSuccess={handleFollowupSuccess}
        />
      )}

      {/* Install PWA Modal */}
      <InstallPwaModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        deferredPrompt={deferredPrompt}
      />

      {/* Free Publishing Guide Modal (Netlify, Vercel & PWA) */}
      <FreePublishingGuideModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-6 border-t border-stone-800 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="space-y-1.5">
            <div className="font-bold text-white text-sm flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span>🌾 AGRICARE AI</span>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-normal">
                সিদ্ধান্ত সহায়তা সিস্টেম
              </span>
              <span className="text-[11px] bg-amber-400 text-emerald-950 font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                Developed by Ynanx Lab
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              কৃষি সম্প্রসারণ অধিদপ্তর (DAE), ব্রি (BRRI) ও বারি (BARI) বালাই দমন নীতিমালার আলোকে তৈরি
            </p>
            <p className="text-[10px] text-emerald-400 font-medium">
              💡 Powered by <strong className="text-amber-300 font-bold">Ynanx Lab</strong> • কৃষিবান্ধব প্রযুক্তি ও কৃত্রিম বুদ্ধিমত্তা গবেষণা
            </p>
          </div>

          <div className="text-[11px] text-stone-500">
            <div>জরুরি কৃষি হেল্পলাইন: <strong>১৬১২৩</strong> (টোল ফ্রি)</div>
            <div className="text-stone-600 mt-0.5">ব্র্যান্ড-নিরপেক্ষ • সক্রিয় উপাদান ও মাত্রা যাচাইকৃত</div>
          </div>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
