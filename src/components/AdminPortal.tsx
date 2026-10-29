import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, ShieldAlert, CheckCircle2, 
  FileText, Activity, Lock, Database, Search, 
  RefreshCw, Cpu, Layers, PlusCircle, FolderPlus,
  Gift, TrendingUp, Building2, Sprout, Bug, AlertCircle,
  Store, Star, Trash2, Loader2, Zap, Check, Share2, BellRing, Copy, CheckCheck, Send
} from 'lucide-react';
import { AuditLog, User, Role, AgriDealer } from '../types';

interface AdminPortalProps {
  currentUser: User;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ currentUser }) => {
  const [stats, setStats] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'kpi' | 'manage' | 'audit' | 'users'>('kpi');
  const [manageSection, setManageSection] = useState<'crop' | 'disease' | 'incentive' | 'market' | 'office' | 'block' | 'dealer'>('crop');
  const [logFilter, setLogFilter] = useState<string>('');
  const [cropsList, setCropsList] = useState<any[]>([]);

  // Form states
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSavedSection, setJustSavedSection] = useState<string | null>(null);
  const [isSyncingDae, setIsSyncingDae] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);
  const [broadcastCount, setBroadcastCount] = useState<number | null>(null);

  // Banshkhali Unions Master List
  const BANSHKHALI_UNIONS = [
    'নাপোড়া', 'পুকুরিয়া', 'সাধনপুর', 'খানখানাবাদ', 'বাহারছড়া',
    'কালীপুর', 'বৈলছড়ী', 'কাথরিয়া', 'সরল', 'গণ্ডামারা',
    'শীলকূপ', 'চাম্বল', 'শেখেরখীল', 'পুঁইছড়ি', 'ছনুয়া', 'বাঁশখালী পৌরসভা'
  ];

  // Form 7: Union & Block Management State
  const [blocksList, setBlocksList] = useState<any[]>([]);
  const [selectedUnionFilter, setSelectedUnionFilter] = useState<string>('ALL');
  const [blockSearchQuery, setBlockSearchQuery] = useState<string>('');
  const [blockForm, setBlockForm] = useState({
    id: '',
    upazilaId: 'upz-dist-chattogram-banshkhali',
    nameBn: 'নাপোড়া',
    blockNameBn: '',
    saaoNameBn: '',
    saaoMobile: '',
    centerAddressBn: '',
    mainCropsBn: ''
  });

  // Form 1: Add Crop
  const [cropForm, setCropForm] = useState({
    nameBn: '',
    nameEn: '',
    scientificName: '',
    category: 'Cash Crop',
    icon: '🌱',
    stages: 'চারা রোপণ, অঙ্গজ বৃদ্ধি, ফুল ও ফল ধারণ, ফসল সংগ্রহ'
  });

  // Form 2: Add Disease
  const [diseaseForm, setDiseaseForm] = useState({
    cropId: '',
    nameBn: '',
    nameEn: '',
    scientificName: '',
    type: 'Fungal',
    severityDefault: 'MEDIUM',
    symptomsBn: '',
    preventionBn: '',
    chemicalBn: ''
  });

  // Form 3: Add Incentive
  const [incentiveForm, setIncentiveForm] = useState({
    titleBn: '',
    seasonBn: 'চলতি মৌসুম ২০২৬',
    category: 'FREE_SEEDS_FERTILIZER',
    benefitsBn: 'বিনামূল্যে ৫ কেজি বীজ ও ১০ কেজি ডিএপি সার',
    eligibilityBn: 'স্থানীয় নিবন্ধিত প্রান্তিক কৃষক ও বাঁশখালী উপজেলাবাসী',
    deadlineBn: '১৫ নভেম্বর ২০২৬',
    venuesBn: 'উপজেলা কৃষি অফিস ও ইউনিয়ন ডিজিটাল কেন্দ্র',
    hotline: '১৬১২৩',
    officerBn: 'উপজেলা কৃষি কর্মকর্তা, বাঁশখালী'
  });

  // Form 4: Add Market Price
  const [marketForm, setMarketForm] = useState({
    cropNameBn: '',
    marketNameBn: 'বাঁশখালী জলদী পৌর বাজার',
    districtBn: 'চট্টগ্রাম',
    wholesalePriceBn: '',
    retailPriceBn: '',
    unitBn: 'কেজি',
    trend: 'STABLE'
  });

  // Form 5: Add / Update Agriculture Officer & SAAO
  const [officeForm, setOfficeForm] = useState({
    districtNameBn: 'চট্টগ্রাম',
    upazilaNameBn: 'বাঁশখালী',
    officeNameBn: 'উপজেলা কৃষি অফিস, বাঁশখালী, চট্টগ্রাম',
    officerNameBn: 'জনাব শ্যামল চন্দ্র সরকার',
    officerDesignationBn: 'উপজেলা কৃষি কর্মকর্তা (UAO)',
    phone: '০১৭১২-৩৪৫৬৭৮',
    email: 'uao.banskhali@dae.gov.bd',
    locationBn: 'উপজেলা পরিষদ চত্বর, বাঁশখালী, চট্টগ্রাম',
    officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০',
    hotline: '১৬১২৩',
    saaoUnionBn: 'নাপোড়া',
    saaoNameBn: 'জনাব রেজাউল করিম',
    saaoMobile: '০১৮৭৩-১৮২৯১৯'
  });

  const [officesList, setOfficesList] = useState<any[]>([]);

  // Form 6: Verified Dealer & Input Shop
  const [dealerForm, setDealerForm] = useState({
    id: '',
    shopNameBn: '',
    proprietorNameBn: '',
    phone: '',
    districtNameBn: 'চট্টগ্রাম',
    upazilaNameBn: 'বাঁশখালী',
    marketAddressBn: '',
    dealerType: 'AUTHORIZED_PESTICIDE',
    dealerTypeBn: 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার',
    authorizedBrands: 'Syngenta, ACI Crop Care, Auto Crop Care',
    productsAvailableBn: 'ইউরিয়া, টিএসপি, কীটনাশক, ছত্রাকনাশক, বীজ',
    isFeaturedSponsored: true,
    monthlyTier: 'GOLD'
  });
  const [dealersList, setDealersList] = useState<AgriDealer[]>([]);

  const loadData = () => {
    fetch('/api/admin/stats').then(res => res.json()).then(data => setStats(data)).catch(console.error);
    fetch('/api/admin/audit-logs').then(res => res.json()).then(data => setAuditLogs(data)).catch(console.error);
    fetch('/api/admin/users').then(res => res.json()).then(data => setUsers(data)).catch(console.error);
    fetch('/api/offices').then(res => res.json()).then(data => setOfficesList(data)).catch(console.error);
    fetch('/api/dealers').then(res => res.json()).then(data => setDealersList(data)).catch(console.error);
    fetch('/api/admin/blocks?upazilaId=upz-dist-chattogram-banshkhali').then(res => res.json()).then(data => setBlocksList(data)).catch(console.error);
    fetch('/api/crops').then(res => res.json()).then(data => {
      setCropsList(data);
      if (data.length > 0 && !diseaseForm.cropId) {
        setDiseaseForm(prev => ({ ...prev, cropId: data[0].id }));
      }
    }).catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    if (type === 'success') {
      setTimeout(() => {
        setFeedbackMsg(prev => (prev?.text === text ? null : prev));
      }, 4500);
    }
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropForm.nameBn.trim()) {
      showFeedback('error', 'ফসলের নাম প্রদান করুন');
      return;
    }
    const targetName = cropForm.nameBn;
    const optimisticCrop = {
      id: `crop-${Date.now()}`,
      nameBn: cropForm.nameBn,
      nameEn: cropForm.nameEn || cropForm.nameBn,
      scientificName: cropForm.scientificName,
      category: cropForm.category,
      icon: cropForm.icon || '🌱',
      stages: cropForm.stages.split(',').map(s => s.trim()).filter(Boolean)
    };

    // Instant optimistic update (0ms latency!)
    setCropsList(prev => [optimisticCrop, ...prev]);
    setCropForm({ nameBn: '', nameEn: '', scientificName: '', category: 'Cash Crop', icon: '🌱', stages: 'চারা রোপণ, অঙ্গজ বৃদ্ধি, ফুল ও ফল ধারণ, ফসল সংগ্রহ' });
    setJustSavedSection('crop');
    showFeedback('success', `⚡ নতুন ফসল "${targetName}" তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!`);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...optimisticCrop,
          stages: optimisticCrop.stages
        })
      });
      const data = await res.json();
      if (data.success && data.crop) {
        setCropsList(prev => {
          const filtered = prev.filter(c => c.id !== optimisticCrop.id);
          return [data.crop, ...filtered];
        });
        fetch('/api/admin/stats').then(res => res.json()).then(s => setStats(s)).catch(() => {});
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'সংযোজন ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleAddDisease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diseaseForm.nameBn.trim()) {
      showFeedback('error', 'রোগ বা বালাইয়ের নাম প্রদান করুন');
      return;
    }
    const diseaseName = diseaseForm.nameBn;
    setDiseaseForm(prev => ({ ...prev, nameBn: '', nameEn: '', scientificName: '', symptomsBn: '', preventionBn: '', chemicalBn: '' }));
    setJustSavedSection('disease');
    showFeedback('success', `⚡ রোগ/বালাই "${diseaseName}" তাত্ক্ষণিকভাবে ডেটাবেজে সংরক্ষিত হয়েছে!`);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/diseases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...diseaseForm,
          symptomsBn: diseaseForm.symptomsBn.split('\n').map(s => s.trim()).filter(Boolean),
          preventionBn: diseaseForm.preventionBn.split('\n').map(s => s.trim()).filter(Boolean)
        })
      });
      const data = await res.json();
      if (data.success) {
        fetch('/api/admin/stats').then(res => res.json()).then(s => setStats(s)).catch(() => {});
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'সংযোজন ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleAddIncentive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incentiveForm.titleBn.trim()) {
      showFeedback('error', 'নোটিশ শিরোনাম প্রদান করুন');
      return;
    }
    const noticeTitle = incentiveForm.titleBn;
    setIncentiveForm(prev => ({ ...prev, titleBn: '' }));
    setJustSavedSection('incentive');
    showFeedback('success', `⚡ সরকারি প্রণোদনা নোটিশ "${noticeTitle}" তাত্ক্ষণিকভাবে প্রকাশিত হয়েছে!`);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/incentives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...incentiveForm,
          benefitsBn: [incentiveForm.benefitsBn],
          eligibilityBn: [incentiveForm.eligibilityBn],
          venuesBn: [incentiveForm.venuesBn]
        })
      });
      await res.json();
    } catch (err: any) {
      showFeedback('error', err.message || 'সংযোজন ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleSyncDaeBulletins = async () => {
    setIsSyncingDae(true);
    try {
      const res = await fetch('/api/incentives/auto-sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showFeedback(
          'success', 
          `⚡ সরকারি কৃষি বুলেটিন অটো-সিঙ্ক সম্পন্ন! ${data.newCount > 0 ? `${data.newCount}টি নতুন সার্কুলার সিস্টেমে যুক্ত হয়েছে।` : 'সরকারি পোর্টাল ও প্রকল্প উইং সর্বশেষ তথ্যে হালনাগাদ আছে।'}`
        );
        loadData();
      }
    } catch (e) {
      showFeedback('error', 'অটো-সিঙ্ক সম্পন্ন হতে সমস্যা হয়েছে।');
    } finally {
      setIsSyncingDae(false);
    }
  };

  const handleBroadcastNotice = async (title?: string) => {
    const targetTitle = title || incentiveForm.titleBn || 'সরকারি সহায়তায় কৃষি যন্ত্রপাতি প্রাপ্তির গাইডলাইন ও ভর্তুকি বিবরণ';
    try {
      const res = await fetch('/api/incentives/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleBn: targetTitle,
          messageBn: `সরকারি কৃষি নোটিশ: ${targetTitle}। বিস্তারিত জেনে উপজেলা কৃষি অফিসে যোগাযোগ করুন (হটলাইন: ১৬১২৩)।`
        })
      });
      const data = await res.json();
      if (data.success) {
        setBroadcastCount(data.count);
        showFeedback('success', `📢 ${data.count} জন নিবন্ধিত কৃষক ও ডিলারকে সফলভাবে সরাসরি নোটিফিকেশন পাঠানো হয়েছে!`);
      }
    } catch (e) {
      showFeedback('error', 'ব্রডকাস্ট পাঠাতে সমস্যা হয়েছে।');
    }
  };

  const handleAddMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketForm.cropNameBn.trim()) {
      showFeedback('error', 'ফসলের নাম প্রদান করুন');
      return;
    }
    const cropName = marketForm.cropNameBn;
    setMarketForm(prev => ({ ...prev, cropNameBn: '', wholesalePriceBn: '', retailPriceBn: '' }));
    setJustSavedSection('market');
    showFeedback('success', `⚡ বাজার দর "${cropName}" তাত্ক্ষণিকভাবে আপডেট হয়েছে!`);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/market-prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marketForm)
      });
      await res.json();
    } catch (err: any) {
      showFeedback('error', err.message || 'সংযোজন ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleAddOffice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeForm.officerNameBn.trim()) {
      showFeedback('error', 'উপজেলা কৃষি কর্মকর্তার নাম আবশ্যক');
      return;
    }

    const optimisticOffice = {
      id: 'off-upz-dist-chattogram-banshkhali',
      upazilaId: 'upz-dist-chattogram-banshkhali',
      districtId: 'dist-chattogram',
      nameBn: officeForm.officeNameBn || 'উপজেলা কৃষি অফিস, বাঁশখালী, চট্টগ্রাম',
      nameEn: 'Upazila Agriculture Office, Banshkhali, Chattogram',
      type: 'UPAZILA_OFFICE',
      addressBn: officeForm.locationBn || 'উপজেলা পরিষদ চত্বর, বাঁশখালী, চট্টগ্রাম',
      phone: officeForm.phone || '০১৭১২-৩৪৫৬৭৮',
      email: officeForm.email || 'uao.banskhali@dae.gov.bd',
      officerNameBn: officeForm.officerNameBn,
      officerDesignationBn: officeForm.officerDesignationBn || 'উপজেলা কৃষি কর্মকর্তা (UAO)',
      officerMobile: officeForm.phone || '০১৭১২-৩৪৫৬৭৮',
      emergencyContact: officeForm.phone || '১৬১২৩',
      servicesBn: ['বালাই ব্যবস্থাপনা', 'ডিজিটাল কৃষক কার্ড', 'সার ও বীজ প্রণোদনা', 'মাঠ দিবস ও কৃষিশিক্ষা'],
      officeHoursBn: officeForm.officeHoursBn || 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০ (সরকারি কর্মদিবস)',
      hotline: officeForm.hotline || '১৬১২৩',
      districtNameBn: officeForm.districtNameBn || 'চট্টগ্রাম',
      upazilaNameBn: officeForm.upazilaNameBn || 'বাঁশখালী',
      unions: blocksList && blocksList.length > 0 ? blocksList : undefined
    };

    // Instant optimistic update (0ms latency!)
    setOfficesList(prev => {
      const idx = prev.findIndex(o => o.nameBn.includes('বাঁশখালী') || o.id.includes('banshkhali'));
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...optimisticOffice };
        return copy;
      }
      return [optimisticOffice as any, ...prev];
    });

    setJustSavedSection('office');
    showFeedback(
      'success', 
      `⚡ উপজেলা কৃষি কর্মকর্তা "${officeForm.officerNameBn}" (${officeForm.officerDesignationBn}) ও অফিসের তথ্য তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!`
    );

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/offices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(officeForm)
      });
      const data = await res.json();
      if (data.success && data.office) {
        setOfficesList(prev => {
          const idx = prev.findIndex(o => o.id === data.office.id || o.nameBn === data.office.nameBn);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = data.office;
            return copy;
          }
          return [data.office, ...prev];
        });
        if (data.office.unions && data.office.unions.length > 0) {
          setBlocksList(data.office.unions);
        }
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'সংযোজন ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleAddOrUpdateDealer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerForm.shopNameBn.trim()) {
      showFeedback('error', 'দোকানের নাম প্রদান করুন');
      return;
    }
    const tempDealerId = dealerForm.id || `dealer-${Date.now()}`;
    const optimisticDealer = {
      ...dealerForm,
      id: tempDealerId,
      authorizedBrands: dealerForm.authorizedBrands.split(',').map(s => s.trim()).filter(Boolean),
      productsAvailableBn: dealerForm.productsAvailableBn.split(',').map(s => s.trim()).filter(Boolean)
    };

    // Instant optimistic update (0ms latency!)
    setDealersList(prev => {
      const idx = prev.findIndex(d => d.id === tempDealerId);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = optimisticDealer as any;
        return copy;
      }
      return [optimisticDealer as any, ...prev];
    });

    const targetShop = dealerForm.shopNameBn;
    setDealerForm({
      id: '',
      shopNameBn: '',
      proprietorNameBn: '',
      phone: '',
      districtNameBn: 'চট্টগ্রাম',
      upazilaNameBn: 'বাঁশখালী',
      marketAddressBn: '',
      dealerType: 'AUTHORIZED_PESTICIDE',
      dealerTypeBn: 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার',
      authorizedBrands: 'Syngenta, ACI Crop Care, Auto Crop Care',
      productsAvailableBn: 'ইউরিয়া, টিএসপি, কীটনাশক, ছত্রাকনাশক, বীজ',
      isFeaturedSponsored: true,
      monthlyTier: 'GOLD'
    });

    setJustSavedSection('dealer');
    showFeedback('success', `⚡ ডিলার ও দোকান "${targetShop}" তাত্ক্ষণিকভাবে সংরক্ষিত ও আপডেট হয়েছে!`);

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/dealers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimisticDealer)
      });
      const data = await res.json();
      if (data.success && data.dealer) {
        setDealersList(prev => {
          const idx = prev.findIndex(d => d.id === data.dealer.id || d.id === tempDealerId);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = data.dealer;
            return copy;
          }
          return [data.dealer, ...prev];
        });
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'ডিলার সংরক্ষণ ব্যর্থ হয়েছে।');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleDeleteDealer = async (id: string, name: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${name}" ডিলার তালিকা থেকে মুছে ফেলতে চান?`)) return;
    setDealersList(prev => prev.filter(d => d.id !== id));
    showFeedback('success', `⚡ "${name}" তাত্ক্ষণিকভাবে মুছে ফেলা হয়েছে।`);
    try {
      await fetch(`/api/admin/dealers/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddOrUpdateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockForm.nameBn.trim()) {
      showFeedback('error', 'অনুগ্রহ করে ইউনিয়নের নাম নির্বাচন বা প্রদান করুন');
      return;
    }

    const tempId = blockForm.id || `uni-block-${Date.now()}`;
    const optimisticBlock = {
      id: tempId,
      upazilaId: 'upz-dist-chattogram-banshkhali',
      nameBn: blockForm.nameBn,
      blockNameBn: blockForm.blockNameBn || `${blockForm.nameBn} কৃষি ব্লক`,
      saaoNameBn: blockForm.saaoNameBn || 'দায়িত্বপ্রাপ্ত উপসহকারী কৃষি কর্মকর্তা',
      saaoMobile: blockForm.saaoMobile || '০১৭০০-০০০০০০',
      centerAddressBn: blockForm.centerAddressBn || `${blockForm.nameBn} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`,
      mainCropsBn: blockForm.mainCropsBn || 'উফশী ধান ও মৌসুমি শাকসবজি'
    };

    // 1. Instant optimistic update in React state (0ms latency!)
    setBlocksList(prev => {
      const idx = prev.findIndex(b => b.id === tempId || (b.nameBn === optimisticBlock.nameBn && b.blockNameBn === optimisticBlock.blockNameBn));
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = optimisticBlock;
        return copy;
      }
      return [optimisticBlock, ...prev];
    });

    const targetName = optimisticBlock.blockNameBn;
    const targetUnion = optimisticBlock.nameBn;

    // Reset form immediately so user can enter the next one right away
    setBlockForm({
      id: '',
      upazilaId: 'upz-dist-chattogram-banshkhali',
      nameBn: blockForm.nameBn,
      blockNameBn: '',
      saaoNameBn: '',
      saaoMobile: '',
      centerAddressBn: '',
      mainCropsBn: ''
    });

    // 2. Instant feedback to user
    setJustSavedSection('block');
    showFeedback(
      'success',
      `⚡ "${targetUnion}" ইউনিয়নের অধীনে ব্লক "${targetName}" তাত্ক্ষণিকভাবে সংরক্ষিত ও সক্রিয় হয়েছে!`
    );

    // 3. Fast non-blocking backend sync
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(optimisticBlock)
      });
      const data = await res.json();
      if (data.success) {
        if (data.blocks) {
          setBlocksList(data.blocks);
        }
        fetch('/api/offices').then(res => res.json()).then(o => setOfficesList(o)).catch(() => {});
      } else {
        throw new Error(data.error || 'সংযোজন ব্যর্থ হয়েছে');
      }
    } catch (err: any) {
      showFeedback('error', err.message || 'ব্লক সংরক্ষণ ব্যর্থ হয়েছে।');
      // Rollback on failure
      fetch('/api/admin/blocks?upazilaId=upz-dist-chattogram-banshkhali')
        .then(res => res.json())
        .then(data => setBlocksList(data))
        .catch(() => {});
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setJustSavedSection(null), 2500);
    }
  };

  const handleDeleteBlock = async (blockId: string, blockName: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${blockName}" ব্লকটি মুছে ফেলতে চান?`)) return;
    // Optimistic deletion
    setBlocksList(prev => prev.filter(b => b.id !== blockId));
    showFeedback('success', `⚡ "${blockName}" ব্লকটি তাৎক্ষণিকভাবে তালিকা থেকে মুছে ফেলা হয়েছে।`);

    try {
      const res = await fetch(`/api/admin/blocks/${blockId}?upazilaId=upz-dist-chattogram-banshkhali`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success && data.blocks) {
        setBlocksList(data.blocks);
      }
      fetch('/api/offices').then(res => res.json()).then(o => setOfficesList(o)).catch(() => {});
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLogs = auditLogs.filter(l => 
    l.action.toLowerCase().includes(logFilter.toLowerCase()) ||
    l.actorName.toLowerCase().includes(logFilter.toLowerCase()) ||
    l.details.toLowerCase().includes(logFilter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-stone-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-900/60 px-3 py-1 rounded-full text-xs font-semibold text-red-200 border border-red-500/40 mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-300" />
            <span>সুপার এডমিন কন্ট্রোল প্যানেল (Super Admin Control Panel)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AgriCare AI সিস্টেম প্রশাসন ও তথ্য ব্যবস্থাপনা
          </h1>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">এডমিন:</span>
              <span className="text-white font-semibold">মোহাম্মদ আরমানুল হক</span>
              <span className="text-stone-300 text-[11px]">(Mohammed Armanul Hoque)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">ঠিকানা:</span>
              <span className="text-white font-semibold">নাপোড়া, বাঁশখালী, চট্টগ্রাম</span>
              <span className="text-stone-300 text-[11px]">(Napora, Banskhali, Chattogram)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="text-sky-400 font-bold">ইমেইল:</span>
              <span className="text-white font-medium">rmanulhoq@gmail.com</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <span className="text-amber-400 font-bold">মোবাইল/হোয়াটসঅ্যাপ:</span>
              <a href="tel:+8801850180708" className="text-white font-bold hover:underline">+8801850180708</a>
            </div>
          </div>
          <p className="text-xs text-stone-300 mt-2 max-w-xl">
            ফসল, বালাই, প্রণোদনা ও বাজারদর তথ্য সরাসরি যুক্তকরণ, নিরাপত্তা অডিট ট্রেইল ও ভূমিকা নিয়ন্ত্রণ।
          </p>
        </div>

        <button
          onClick={loadData}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/20 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>রিফ্রেশ করুন</span>
        </button>
      </div>

      {/* Admin Sub Navigation */}
      <div className="flex border-b border-stone-200 gap-2 text-xs font-bold text-stone-600 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('kpi')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'kpi' ? 'border-emerald-700 text-emerald-800' : 'border-transparent hover:text-stone-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>কেস পরিসংখ্যান ও কেপিআই</span>
        </button>

        <button
          onClick={() => setActiveTab('manage')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'manage' ? 'border-emerald-700 text-emerald-800 font-black' : 'border-transparent hover:text-stone-900'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-amber-600" />
          <span>তথ্য সংযোজন ও ডেটা এন্ট্রি (Add Data)</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'audit' ? 'border-emerald-700 text-emerald-800' : 'border-transparent hover:text-stone-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>নিরাপত্তা অডিট লগ ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'users' ? 'border-emerald-700 text-emerald-800' : 'border-transparent hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>ইউজার ও রোল তালিকা ({users.length})</span>
        </button>
      </div>

      {/* Floating Toast Notification for Ultra-Fast Instant Feedback */}
      {feedbackMsg && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${
            feedbackMsg.type === 'success' 
              ? 'bg-emerald-900/95 text-white border-emerald-500 shadow-emerald-950/20' 
              : 'bg-red-900/95 text-white border-red-500 shadow-red-950/20'
          }`}>
            {feedbackMsg.type === 'success' ? (
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-400/30">
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              </div>
            ) : (
              <AlertCircle className="w-6 h-6 text-red-300 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs">
              <div className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                {feedbackMsg.type === 'success' ? '⚡ দ্রুত সেভ সম্পন্ন!' : '⚠️ ত্রুটি ঘটেছে'}
              </div>
              <p className="mt-0.5 opacity-90 text-[11px] sm:text-xs leading-relaxed">{feedbackMsg.text}</p>
            </div>
            <button 
              onClick={() => setFeedbackMsg(null)}
              className="text-white/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Static Feedback banner */}
      {feedbackMsg && (
        <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between gap-2 ${
          feedbackMsg.type === 'success' 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-red-50 border-red-300 text-red-900'
        }`}>
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button 
            onClick={() => setFeedbackMsg(null)}
            className="text-stone-400 hover:text-stone-700 text-xs font-bold cursor-pointer"
          >
            ✕ বন্ধ করুন
          </button>
        </div>
      )}

      {/* TAB 1: KPI STATS */}
      {activeTab === 'kpi' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">নিবন্ধিত কৃষক</div>
              <div className="text-2xl font-black text-emerald-800 mt-1">{stats.totalFarmers}</div>
              <div className="text-[11px] text-stone-400 mt-0.5">দেশব্যাপী ব্যবহারকারী</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">মোট রোগ নির্ণয় কেস</div>
              <div className="text-2xl font-black text-stone-900 mt-1">{stats.totalDiagnoses}</div>
              <div className="text-[11px] text-stone-400 mt-0.5">AI ও নিয়মভিত্তিক বিশ্লেষণ</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">কর্মকর্তা যাচাই অপেক্ষমাণ</div>
              <div className="text-2xl font-black text-amber-600 mt-1">{stats.pendingOfficerReviews}</div>
              <div className="text-[11px] text-amber-700 mt-0.5">মাঠপর্যায়ে পর্যালোচ্য</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="text-xs text-stone-500 font-medium">যাচাইকৃত প্রেসক্রিপশন</div>
              <div className="text-2xl font-black text-blue-700 mt-1">{stats.verifiedDiagnoses}</div>
              <div className="text-[11px] text-blue-800 mt-0.5">কৃষি কর্মকর্তা অনুমোদিত</div>
            </div>
          </div>

          {/* System Safety & AI Logic Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 space-y-3">
              <div className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-700" />
                <span>এআই মডেল ও বালাই নিরাপত্তা গেট স্ট্যাটাস</span>
              </div>
              <div className="text-xs text-stone-700 space-y-1.5">
                <div className="flex justify-between border-b border-emerald-200/60 pb-1">
                  <span>মডেল সংস্করণ:</span>
                  <span className="font-bold text-stone-900">Gemini 3.8 Flash (Multimodal Vision)</span>
                </div>
                <div className="flex justify-between border-b border-emerald-200/60 pb-1">
                  <span>ব্র্যান্ড নিরপেক্ষ নীতি:</span>
                  <span className="font-bold text-emerald-800">✅ সক্রিয় (সক্রিয় উপাদান ও ডিএই মাত্রা)</span>
                </div>
                <div className="flex justify-between border-b border-emerald-200/60 pb-1">
                  <span>আবহাওয়া নিরাপত্তা গেট:</span>
                  <span className="font-bold text-emerald-800">✅ সক্রিয় (বৃষ্টি/বাতাসে স্প্রে বন্ধ)</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>সার্ভার সাইড সিক্রেট প্রক্সি:</span>
                  <span className="font-bold text-emerald-800">✅ নিরাপদ</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-3">
              <div className="font-bold text-stone-100 text-sm flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>কৃষি জ্ঞান ডেটাবেজ সংযোগ</span>
              </div>
              <div className="text-xs text-stone-300 space-y-1.5">
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span>অনুমোদিত ফসল সংখ্যা:</span>
                  <span className="font-bold text-amber-300">{stats.totalCrops}টি</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span>অনুমোদিত রোগবালাই সূত্র:</span>
                  <span className="font-bold text-amber-300">{stats.totalDiseases}টি</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span>উৎস প্রতিষ্ঠানসমূহ:</span>
                  <span className="font-bold text-stone-200">DAE, BARI, BRRI, BARC</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span>জরুরি ওভাররাইড সুবিধা:</span>
                  <span className="font-bold text-emerald-400">সুপার এডমিন সুরক্ষিত</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA MANAGEMENT & ADD CENTER (NEW!) */}
      {activeTab === 'manage' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 shadow-sm">
          {/* Section Selector */}
          <div className="flex flex-wrap gap-2 border-b border-stone-100 pb-4">
            <button
              onClick={() => { setManageSection('crop'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'crop' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>১. নতুন ফসল যোগ</span>
            </button>
            <button
              onClick={() => { setManageSection('disease'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'disease' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Bug className="w-4 h-4" />
              <span>২. নতুন রোগ ও বালাই দমন</span>
            </button>
            <button
              onClick={() => { setManageSection('incentive'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'incentive' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>৩. সরকারি প্রণোদনা নোটিশ</span>
            </button>
            <button
              onClick={() => { setManageSection('market'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'market' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>৪. আজকের বাজার দর</span>
            </button>
            <button
              onClick={() => { setManageSection('office'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'office' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>৫. অফিস ও UAO ডিরেক্টরি</span>
            </button>
            <button
              onClick={() => { setManageSection('block'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'block' ? 'bg-blue-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>৬. বাঁশখালীর ইউনিয়ন ও ব্লক এড/ম্যানেজ</span>
            </button>
            <button
              onClick={() => { setManageSection('dealer'); setFeedbackMsg(null); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                manageSection === 'dealer' ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>৭. অনুমোদিত ডিলার ও দোকান (Monetization & Ads)</span>
            </button>
          </div>

          {/* SECTION 1: ADD CROP */}
          {manageSection === 'crop' && (
            <form onSubmit={handleAddCrop} className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <FolderPlus className="w-5 h-5 text-emerald-700" />
                <span>নতুন অনুমোদিত ফসল যোগ করুন</span>
              </div>
              <p className="text-xs text-stone-500">
                এখানে নতুন ফসল যুক্ত করলে তা সরাসরি কৃষকদের ড্রপডাউন, এআই ডায়াগনোসিস এবং লাইব্রেরিতে উন্মুক্ত হবে।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={cropForm.nameBn}
                    onChange={e => setCropForm({ ...cropForm, nameBn: e.target.value })}
                    placeholder="যেমন: ড্রাগন ফল, চিয়া সিড, বাঁশখালীর পান"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ইংরেজি নাম *</label>
                  <input
                    type="text"
                    required
                    value={cropForm.nameEn}
                    onChange={e => setCropForm({ ...cropForm, nameEn: e.target.value })}
                    placeholder="যেমন: Dragon Fruit, Betel Leaf"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">বৈজ্ঞানিক নাম</label>
                  <input
                    type="text"
                    value={cropForm.scientificName}
                    onChange={e => setCropForm({ ...cropForm, scientificName: e.target.value })}
                    placeholder="যেমন: Selenicereus undatus"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={cropForm.category}
                    onChange={e => setCropForm({ ...cropForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="Cereal">দানা শস্য (Cereal)</option>
                    <option value="Cash Crop">অর্থকরী ফসল (Cash Crop)</option>
                    <option value="Vegetable">শাকসবজি (Vegetable)</option>
                    <option value="Fruit">ফলমূল (Fruit)</option>
                    <option value="Oilseed">তৈলবীজ (Oilseed)</option>
                    <option value="Pulse">ডাল ফসল (Pulse)</option>
                    <option value="Other">অন্যান্য (Other)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের বৃদ্ধির ধাপসমূহ (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={cropForm.stages}
                    onChange={e => setCropForm({ ...cropForm, stages: e.target.value })}
                    placeholder="চারা রোপণ, বৃদ্ধি, ফুল ফোটা, ফল সংগ্রহ"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                  <span>দ্রুত সেভ সক্রিয়: সেভ হওয়ামাত্রই কৃষক পোর্টালে উন্মুক্ত হবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'crop' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>নতুন ফসল দ্রুত সংরক্ষণ করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SECTION 2: ADD DISEASE */}
          {manageSection === 'disease' && (
            <form onSubmit={handleAddDisease} className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Bug className="w-5 h-5 text-emerald-700" />
                <span>নতুন রোগবালাই ও অনুমোদিত দমন ব্যবস্থা যোগ করুন</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">সংশ্লিষ্ট ফসল নির্বাচন করুন *</label>
                  <select
                    value={diseaseForm.cropId}
                    onChange={e => setDiseaseForm({ ...diseaseForm, cropId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    {cropsList.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.nameBn} ({c.nameEn})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">রোগ বা পোকার নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={diseaseForm.nameBn}
                    onChange={e => setDiseaseForm({ ...diseaseForm, nameBn: e.target.value })}
                    placeholder="যেমন: পানের ডালপচা রোগ, ধানের মাজরা পোকা"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">রোগের ধরন / ফ্যাক্টর</label>
                  <select
                    value={diseaseForm.type}
                    onChange={e => setDiseaseForm({ ...diseaseForm, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="Fungal">ছত্রাকজনিত (Fungal)</option>
                    <option value="Bacterial">ব্যাকটেরিয়াজনিত (Bacterial)</option>
                    <option value="Viral">ভাইরাসজনিত (Viral)</option>
                    <option value="Pest">পোকা বা মাকড় (Pest)</option>
                    <option value="Nutrient Deficiency">পুষ্টির ঘাটতি (Nutrient Deficiency)</option>
                    <option value="Environmental Stress">প্রাকৃতিক প্রতিকূলতা (Environmental)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ডিফল্ট তীব্রতা (Severity)</label>
                  <select
                    value={diseaseForm.severityDefault}
                    onChange={e => setDiseaseForm({ ...diseaseForm, severityDefault: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="LOW">স্বাভাবিক / মৃদু (LOW)</option>
                    <option value="MEDIUM">মাঝারি সতর্কতা (MEDIUM)</option>
                    <option value="HIGH">উচ্চ ঝুঁকি (HIGH)</option>
                    <option value="CRITICAL">জরুরি বিপজ্জনক (CRITICAL)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">প্রধান লক্ষণসমূহ (প্রতি লাইনে একটি)</label>
                  <textarea
                    rows={2}
                    value={diseaseForm.symptomsBn}
                    onChange={e => setDiseaseForm({ ...diseaseForm, symptomsBn: e.target.value })}
                    placeholder="পাতার গোড়ায় কালচে দাগ পড়ে&#10;গাছ নেতিয়ে পড়ে ও শুকিয়ে যায়"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">অনুমোদিত সক্রিয় উপাদান ও মাত্রা (ব্র্যান্ড ছাড়া)</label>
                  <input
                    type="text"
                    value={diseaseForm.chemicalBn}
                    onChange={e => setDiseaseForm({ ...diseaseForm, chemicalBn: e.target.value })}
                    placeholder="যেমন: কার্বেনডাজিম ৫০ ডব্লিউপি (১ গ্রাম/লিটার পানি) অথবা ম্যানকোজেব (২ গ্রাম/লিটার)"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                  <span>দ্রুত সেভ সক্রিয়: রোগ লক্ষণ ও দমন নির্দেশিকা সাথে সাথে আপডেট হবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'disease' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>রোগ ও বালাই তথ্য দ্রুত সংরক্ষণ করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SECTION 3: ADD INCENTIVE */}
          {manageSection === 'incentive' && (
            <form onSubmit={handleAddIncentive} className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Gift className="w-5 h-5 text-emerald-700" />
                <span>নতুন সরকারি কৃষি প্রণোদনা বা ভর্তুকি নোটিশ জারি করুন</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">প্রণোদনার শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={incentiveForm.titleBn}
                    onChange={e => setIncentiveForm({ ...incentiveForm, titleBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালী উপজেলার উপকূলীয় কৃষকদের জন্য বিনামূল্যে লবণ সহনশীল ধান বীজ প্রণোদনা"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">মৌসুম</label>
                  <input
                    type="text"
                    value={incentiveForm.seasonBn}
                    onChange={e => setIncentiveForm({ ...incentiveForm, seasonBn: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">আবেদনের শেষ তারিখ</label>
                  <input
                    type="text"
                    value={incentiveForm.deadlineBn}
                    onChange={e => setIncentiveForm({ ...incentiveForm, deadlineBn: e.target.value })}
                    placeholder="যেমন: ১৫ নভেম্বর ২০২৬"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">সহায়তা প্যাকেজ ও সুবিধা</label>
                  <input
                    type="text"
                    value={incentiveForm.benefitsBn}
                    onChange={e => setIncentiveForm({ ...incentiveForm, benefitsBn: e.target.value })}
                    placeholder="যেমন: ৫ কেজি ব্রি ধান ৬৭ বীজ, ১০ কেজি ডিএপি এবং ১০ কেজি এমওপি সার"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">আবেদনের যোগ্যতা ও এলাকা</label>
                  <input
                    type="text"
                    value={incentiveForm.eligibilityBn}
                    onChange={e => setIncentiveForm({ ...incentiveForm, eligibilityBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালীর ১৪টি ইউনিয়ন ও পৌরসভার নিবন্ধিত ক্ষুদ্র ও প্রান্তিক কৃষক"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                  <span>দ্রুত প্রকাশ সক্রিয়: নোটিশটি সাথে সাথে কৃষকদের নোটিশ বোর্ডে চলে যাবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'incentive' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে প্রকাশিত হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>প্রকাশ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>প্রণোদনা নোটিশ দ্রুত প্রকাশ করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SECTION 4: ADD MARKET PRICE */}
          {manageSection === 'market' && (
            <form onSubmit={handleAddMarket} className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <TrendingUp className="w-5 h-5 text-emerald-700" />
                <span>আজকের বাজার দর এন্ট্রি বা আপডেট করুন</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ফসলের নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={marketForm.cropNameBn}
                    onChange={e => setMarketForm({ ...marketForm, cropNameBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালীর মিষ্টি পান, তরমুজ, ব্রি ধান ২৮"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">বাজার বা আড়তের নাম *</label>
                  <input
                    type="text"
                    required
                    value={marketForm.marketNameBn}
                    onChange={e => setMarketForm({ ...marketForm, marketNameBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালী জলদী পৌর বাজার, বৈলছড়ী হাট, গুনাগরি বাজার"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">পাইকারি দর</label>
                  <input
                    type="text"
                    value={marketForm.wholesalePriceBn}
                    onChange={e => setMarketForm({ ...marketForm, wholesalePriceBn: e.target.value })}
                    placeholder="যেমন: ৮০০ - ৯০০ টাকা / বিড়া বা মণ"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">খুচরা দর</label>
                  <input
                    type="text"
                    value={marketForm.retailPriceBn}
                    onChange={e => setMarketForm({ ...marketForm, retailPriceBn: e.target.value })}
                    placeholder="যেমন: ৩৫ - ৪০ টাকা / কেজি"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">দর ট্রেন্ড</label>
                  <select
                    value={marketForm.trend}
                    onChange={e => setMarketForm({ ...marketForm, trend: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="STABLE">স্থিতিশীল (➖)</option>
                    <option value="UP">মূল্য বৃদ্ধি (📈)</option>
                    <option value="DOWN">মূল্য হ্রাস (📉)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                  <span>দ্রুত আপডেট সক্রিয়: বাজারের দর সরাসরি কৃষি বাজারে পরিবর্তিত হবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'market' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে আপডেট হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>আপডেট হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>বাজার দর দ্রুত আপডেট করুন</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SECTION 5: ADD / UPDATE OFFICE & OFFICER */}
          {manageSection === 'office' && (
            <form onSubmit={handleAddOffice} className="space-y-5">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <span>উপজেলা কৃষি কর্মকর্তা (UAO) ও ইউনিয়ন SAAO তথ্য সংযোজন / আপডেট</span>
              </div>
              <p className="text-xs text-stone-500">
                এখানে উপজেলা কৃষি কর্মকর্তা ও মাঠপর্যায়ের উপসহকারী কৃষি কর্মকর্তাদের (SAAO) নাম, মোবাইল নম্বর, পদবী ও যোগাযোগের তথ্য অন্তর্ভুক্ত করুন। এটি সরাসরি কৃষক ডিরেক্টরি এবং হোমপেজে কার্যকর হবে।
              </p>

              {/* Subsection 1: UAO Officer Details */}
              <div className="bg-stone-50/80 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 border-b border-stone-200 pb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>১. উপজেলা কৃষি কর্মকর্তা (UAO / প্রধান কর্মকর্তা) বিবরণ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">কর্মকর্তার পুরো নাম *</label>
                    <input
                      type="text"
                      required
                      value={officeForm.officerNameBn}
                      onChange={e => setOfficeForm({ ...officeForm, officerNameBn: e.target.value })}
                      placeholder="যেমন: কৃষিবিদ মোহাম্মদ আশরাফুল আলম"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">অফিসিয়াল পদবী *</label>
                    <input
                      type="text"
                      required
                      value={officeForm.officerDesignationBn}
                      onChange={e => setOfficeForm({ ...officeForm, officerDesignationBn: e.target.value })}
                      placeholder="যেমন: উপজেলা কৃষি কর্মকর্তা (UAO)"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="text"
                      required
                      value={officeForm.phone}
                      onChange={e => setOfficeForm({ ...officeForm, phone: e.target.value })}
                      placeholder="যেমন: ০১৭০৪-৮৯২১০৩"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">সরকারি ইমেইল</label>
                    <input
                      type="email"
                      value={officeForm.email}
                      onChange={e => setOfficeForm({ ...officeForm, email: e.target.value })}
                      placeholder="যেমন: uao.banskhali@dae.gov.bd"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা</label>
                    <input
                      type="text"
                      value={officeForm.upazilaNameBn}
                      onChange={e => setOfficeForm({ ...officeForm, upazilaNameBn: e.target.value })}
                      placeholder="যেমন: বাঁশখালী"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">জেলা</label>
                    <input
                      type="text"
                      value={officeForm.districtNameBn}
                      onChange={e => setOfficeForm({ ...officeForm, districtNameBn: e.target.value })}
                      placeholder="যেমন: চট্টগ্রাম"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">দপ্তরের নাম ও ঠিকানা</label>
                    <input
                      type="text"
                      value={officeForm.locationBn}
                      onChange={e => setOfficeForm({ ...officeForm, locationBn: e.target.value })}
                      placeholder="যেমন: উপজেলা পরিষদ কমপ্লেক্স, বাঁশখালী, চট্টগ্রাম"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">জরুরি হটলাইন</label>
                    <input
                      type="text"
                      value={officeForm.hotline}
                      onChange={e => setOfficeForm({ ...officeForm, hotline: e.target.value })}
                      placeholder="১৬১২৩"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Subsection 2: Union SAAO Details (Optional) */}
              <div className="bg-stone-50/80 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-emerald-950 flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>২. মাঠপর্যায়ের উপসহকারী কৃষি কর্মকর্তা (SAAO / ব্লক অফিসার) সংযোজন</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal">ঐচ্ছিক (পরবর্তীতেও যুক্ত করা যাবে)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">ইউনিয়ন বা ব্লকের নাম</label>
                    <input
                      type="text"
                      value={officeForm.saaoUnionBn}
                      onChange={e => setOfficeForm({ ...officeForm, saaoUnionBn: e.target.value })}
                      placeholder="যেমন: নাপোড়া ইউনিয়ন কৃষি ব্লক"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">উপসহকারী কৃষি কর্মকর্তার (SAAO) নাম</label>
                    <input
                      type="text"
                      value={officeForm.saaoNameBn}
                      onChange={e => setOfficeForm({ ...officeForm, saaoNameBn: e.target.value })}
                      placeholder="যেমন: জনাব মোঃ নুরুল ইসলাম"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">SAAO মোবাইল নম্বর</label>
                    <input
                      type="text"
                      value={officeForm.saaoMobile}
                      onChange={e => setOfficeForm({ ...officeForm, saaoMobile: e.target.value })}
                      placeholder="যেমন: ০১৮১৯-৮৭৬৫৪৩"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                  <span>দ্রুত সেভ সক্রিয়: কর্মকর্তা ও ডিরেক্টরি তথ্য সাথে সাথে লাইভ পোর্টালে হালনাগাদ হবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'office' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                      <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                      <span>উপজেলা কৃষি কর্মকর্তা ও ডিরেক্টরি দ্রুত সংরক্ষণ করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Registered Offices List */}
              <div className="pt-5 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-700" />
                    <span>বর্তমানে সক্রিয় উপজেলা কৃষি কর্মকর্তা ও কার্যালয় তালিকা ({officesList.length}টি)</span>
                  </h4>
                  <span className="text-[11px] text-stone-500">যেকোনো একটি নির্বাচন করে ফর্মে তথ্য সম্পাদনা করুন</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {officesList.map((off) => (
                    <div 
                      key={off.id}
                      className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-emerald-500 transition-all text-xs space-y-2 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-stone-900">{off.nameBn}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{off.addressBn}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOfficeForm({
                              districtNameBn: off.districtNameBn || 'চট্টগ্রাম',
                              upazilaNameBn: off.upazilaNameBn || 'বাঁশখালী',
                              officeNameBn: off.nameBn,
                              officerNameBn: off.officerNameBn || 'উপজেলা কৃষি কর্মকর্তা',
                              officerDesignationBn: off.officerDesignationBn || 'উপজেলা কৃষি কর্মকর্তা (UAO)',
                              phone: off.officerMobile || off.phone || '',
                              email: off.email || '',
                              locationBn: off.addressBn || '',
                              officeHoursBn: off.officeHoursBn || 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০',
                              hotline: off.hotline || '১৬১২৩',
                              saaoUnionBn: off.unions?.[0]?.nameBn || 'নাপোড়া',
                              saaoNameBn: off.unions?.[0]?.saaoNameBn || '',
                              saaoMobile: off.unions?.[0]?.saaoMobile || ''
                            });
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg text-[11px] border border-emerald-300 shrink-0 cursor-pointer"
                        >
                          ✏️ সম্পাদনা
                        </button>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-600">
                        <span className="font-semibold text-emerald-800">
                          👤 {off.officerNameBn} ({off.officerDesignationBn || 'UAO'})
                        </span>
                        <span>📱 {off.officerMobile || off.phone}</span>
                        {off.email && <span>✉️ {off.email}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* SECTION 6: UNION & AGRICULTURAL BLOCK MANAGEMENT (Banshkhali & Nationwide) */}
          {manageSection === 'block' && (
            <div className="space-y-6">
              {/* Header & Overview */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-900/10 via-emerald-800/10 to-teal-800/10 p-4 sm:p-5 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                        মাঠপর্যায় কৃষি কর্মকর্তা ও ব্লক
                      </span>
                      <span className="text-xs text-stone-500">চট্টগ্রাম জেলা • বাঁশখালী উপজেলা</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-stone-900 mt-0.5">
                      বাঁশখালী উপজেলার সকল ইউনিয়ন ভিত্তিক কৃষি ব্লক ও এসএএও (SAAO) ব্যবস্থাপনা
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      fetch('/api/admin/blocks?upazilaId=upz-dist-chattogram-banshkhali')
                        .then(res => res.json())
                        .then(data => {
                          setBlocksList(data);
                          setFeedbackMsg({ type: 'success', text: 'বাঁশখালীর সকল ইউনিয়ন ও ব্লক তালিকা সফলভাবে রিফ্রেশ হয়েছে।' });
                        })
                        .catch(console.error);
                    }}
                    className="bg-white hover:bg-stone-50 text-stone-700 px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>রিফ্রেশ</span>
                  </button>
                </div>
              </div>

              {/* Statistics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-center">
                  <div className="text-[11px] text-stone-500 font-bold uppercase">বাঁশখালী মোট ইউনিয়ন</div>
                  <div className="text-lg font-black text-blue-900 mt-0.5">১৬টি</div>
                  <div className="text-[10px] text-stone-400">১৪ ইউনিয়ন + ১ পৌরসভা</div>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-center">
                  <div className="text-[11px] text-stone-500 font-bold uppercase">মোট সক্রিয় ব্লক</div>
                  <div className="text-lg font-black text-emerald-800 mt-0.5">{blocksList.length}টি</div>
                  <div className="text-[10px] text-stone-400">সরকারি ডিএই রেজিস্ট্রিকৃত</div>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-center">
                  <div className="text-[11px] text-stone-500 font-bold uppercase">উপসহকারী কর্মকর্তা (SAAO)</div>
                  <div className="text-lg font-black text-purple-900 mt-0.5">
                    {blocksList.filter(b => b.saaoNameBn && b.saaoNameBn.trim()).length} জন
                  </div>
                  <div className="text-[10px] text-stone-400">সরাসরি কৃষক সেবা প্রদানে</div>
                </div>
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl text-center">
                  <div className="text-[11px] text-stone-500 font-bold uppercase">উপজেলা কৃষি কর্মকর্তা</div>
                  <div className="text-xs font-black text-stone-900 mt-1 line-clamp-1">জনাব শ্যামল চন্দ্র সরকার</div>
                  <div className="text-[10px] text-emerald-700 font-bold">UAO ও সমন্বয়ক</div>
                </div>
              </div>

              {/* Add / Edit Block Form */}
              <form onSubmit={handleAddOrUpdateBlock} className="bg-stone-50/90 border border-blue-200 p-4 sm:p-5 rounded-2xl space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                      {blockForm.id ? '✏️ নির্বাচিত ব্লক ও এসএএও (SAAO) তথ্য সম্পাদনা' : '➕ নতুন ইউনিয়ন ভিত্তিক কৃষি ব্লক সংযোজন'}
                    </h4>
                  </div>
                  {blockForm.id && (
                    <button
                      type="button"
                      onClick={() => setBlockForm({
                        id: '',
                        upazilaId: 'upz-dist-chattogram-banshkhali',
                        nameBn: 'নাপোড়া',
                        blockNameBn: '',
                        saaoNameBn: '',
                        saaoMobile: '',
                        centerAddressBn: '',
                        mainCropsBn: ''
                      })}
                      className="text-stone-500 hover:text-stone-800 text-xs font-semibold underline"
                    >
                      বাতিল / নতুন এন্ট্রি
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Union Selector */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      ইউনিয়ন নির্বাচন করুন *
                    </label>
                    <select
                      value={blockForm.nameBn}
                      onChange={e => setBlockForm({ ...blockForm, nameBn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {BANSHKHALI_UNIONS.map(un => (
                        <option key={un} value={un}>{un}</option>
                      ))}
                    </select>
                  </div>

                  {/* Block Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      কৃষি ব্লকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={blockForm.blockNameBn}
                      onChange={e => setBlockForm({ ...blockForm, blockNameBn: e.target.value })}
                      placeholder="যেমন: নাপোড়া বাজার ও কৃষি ব্লক"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  {/* SAAO Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      উপসহকারী কৃষি কর্মকর্তা (SAAO)-র নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={blockForm.saaoNameBn}
                      onChange={e => setBlockForm({ ...blockForm, saaoNameBn: e.target.value })}
                      placeholder="যেমন: জনাব রেজাউল করিম"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  {/* SAAO Mobile */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      SAAO মোবাইল নম্বর *
                    </label>
                    <input
                      type="text"
                      required
                      value={blockForm.saaoMobile}
                      onChange={e => setBlockForm({ ...blockForm, saaoMobile: e.target.value })}
                      placeholder="যেমন: ০১৮৭৩-১৮২৯১৯"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  {/* Center Address */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      ব্লক সেবা কেন্দ্র / অফিস কার্যালয়
                    </label>
                    <input
                      type="text"
                      value={blockForm.centerAddressBn}
                      onChange={e => setBlockForm({ ...blockForm, centerAddressBn: e.target.value })}
                      placeholder="যেমন: নাপোড়া বাজার ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  {/* Main Crops */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      ব্লকের প্রধান আবাদি ফসল
                    </label>
                    <input
                      type="text"
                      value={blockForm.mainCropsBn}
                      onChange={e => setBlockForm({ ...blockForm, mainCropsBn: e.target.value })}
                      placeholder="যেমন: বাঁশখালীর মিষ্টি তরমুজ, আমন ধান, খিরা"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600 shrink-0" />
                    <span>দ্রুত সেভ সক্রিয়: তথ্য সংরক্ষণের সাথে সাথে তা বাঁশখালী উপজেলা কৃষি ডিরেক্টরি এবং কৃষকদের মোবাইল অ্যাপে কার্যকর হবে।</span>
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 hover:bg-blue-800 active:scale-98 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    {justSavedSection === 'block' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                        <span className="text-emerald-200">✅ তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>সংরক্ষণ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>{blockForm.id ? 'ব্লক তথ্য দ্রুত আপডেট করুন' : 'নতুন ব্লক দ্রুত সংরক্ষণ করুন'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Filter and Search Bar */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">ইউনিয়ন ফিল্টার:</span>
                    <select
                      value={selectedUnionFilter}
                      onChange={e => setSelectedUnionFilter(e.target.value)}
                      className="p-2 rounded-xl border border-stone-300 text-xs font-semibold bg-white focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="ALL">সকল ইউনিয়ন ({blocksList.length}টি ব্লক)</option>
                      {BANSHKHALI_UNIONS.map(un => (
                        <option key={un} value={un}>{un}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative flex-1 sm:max-w-xs">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={blockSearchQuery}
                      onChange={e => setBlockSearchQuery(e.target.value)}
                      placeholder="ব্লক, SAAO নাম বা মোবাইল দিয়ে খুঁজুন..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>
                </div>

                {/* Quick Union Pills */}
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedUnionFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      selectedUnionFilter === 'ALL' ? 'bg-blue-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    সকল ({blocksList.length})
                  </button>
                  {BANSHKHALI_UNIONS.map(un => {
                    const count = blocksList.filter(b => b.nameBn === un).length;
                    return (
                      <button
                        key={un}
                        type="button"
                        onClick={() => setSelectedUnionFilter(un)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-all ${
                          selectedUnionFilter === un ? 'bg-blue-700 text-white font-bold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        <span>{un}</span>
                        {count > 0 && <span className="ml-1 opacity-75">({count})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Block Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {blocksList
                  .filter(b => {
                    if (selectedUnionFilter !== 'ALL' && b.nameBn !== selectedUnionFilter) return false;
                    if (blockSearchQuery) {
                      const q = blockSearchQuery.toLowerCase();
                      const matchName = b.nameBn?.toLowerCase().includes(q);
                      const matchBlock = b.blockNameBn?.toLowerCase().includes(q);
                      const matchSaao = b.saaoNameBn?.toLowerCase().includes(q);
                      const matchPhone = b.saaoMobile?.includes(q);
                      const matchCrops = b.mainCropsBn?.toLowerCase().includes(q);
                      return matchName || matchBlock || matchSaao || matchPhone || matchCrops;
                    }
                    return true;
                  })
                  .map((b) => (
                    <div 
                      key={b.id}
                      className="bg-white border border-stone-200 hover:border-blue-400 p-4 rounded-2xl transition-all shadow-2xs hover:shadow-xs space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md">
                              {b.nameBn} ইউনিয়ন
                            </span>
                            {b.nameBn === 'নাপোড়া' && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-300">
                                ⭐ গুরুত্বপূর্ণ ব্লক
                              </span>
                            )}
                          </div>
                          <h5 className="font-extrabold text-stone-900 text-sm mt-1">
                            {b.blockNameBn || `${b.nameBn} কৃষি ব্লক`}
                          </h5>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setBlockForm({
                                id: b.id,
                                upazilaId: b.upazilaId || 'upz-dist-chattogram-banshkhali',
                                nameBn: b.nameBn,
                                blockNameBn: b.blockNameBn || '',
                                saaoNameBn: b.saaoNameBn || '',
                                saaoMobile: b.saaoMobile || '',
                                centerAddressBn: b.centerAddressBn || '',
                                mainCropsBn: b.mainCropsBn || ''
                              });
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-blue-50 text-stone-600 hover:text-blue-700 transition-colors text-xs font-bold cursor-pointer"
                            title="সম্পাদনা করুন"
                          >
                            ✏️ সম্পাদনা
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlock(b.id, b.blockNameBn || b.nameBn)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* SAAO Info Strip */}
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-emerald-900 flex items-center gap-1">
                            <span>👤 {b.saaoNameBn || 'দায়িত্বপ্রাপ্ত উপসহকারী কৃষি কর্মকর্তা'}</span>
                          </span>
                          {b.saaoMobile && (
                            <a
                              href={`tel:${b.saaoMobile}`}
                              className="text-blue-700 hover:text-blue-900 font-bold bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200 flex items-center gap-1"
                            >
                              <span>📞 {b.saaoMobile}</span>
                            </a>
                          )}
                        </div>
                        {b.centerAddressBn && (
                          <div className="text-[11px] text-stone-500 flex items-start gap-1">
                            <span>📍</span>
                            <span>{b.centerAddressBn}</span>
                          </div>
                        )}
                      </div>

                      {/* Main Crops */}
                      {b.mainCropsBn && (
                        <div className="text-[11px] text-stone-600 flex items-center gap-1">
                          <span className="font-semibold text-stone-500">🌾 প্রধান ফসল:</span>
                          <span className="text-stone-800 font-medium">{b.mainCropsBn}</span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SECTION 7: ADD & MANAGE VERIFIED AGRI DEALERS (MONETIZATION & ADS) */}
          {manageSection === 'dealer' && (
            <form onSubmit={handleAddOrUpdateDealer} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <Store className="w-5 h-5 text-amber-600" />
                  <span>অনুমোদিত সার, বীজ ও বালাইনাশক ডিলার লিস্টিং (Monetization & Ads)</span>
                </div>
                {dealerForm.id && (
                  <button
                    type="button"
                    onClick={() => setDealerForm({
                      id: '',
                      shopNameBn: '',
                      proprietorNameBn: '',
                      phone: '',
                      districtNameBn: 'চট্টগ্রাম',
                      upazilaNameBn: 'বাঁশখালী',
                      marketAddressBn: '',
                      dealerType: 'AUTHORIZED_PESTICIDE',
                      dealerTypeBn: 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার',
                      authorizedBrands: 'Syngenta, ACI Crop Care, Auto Crop Care',
                      productsAvailableBn: 'ইউরিয়া, টিএসপি, কীটনাশক, ছত্রাকনাশক, বীজ',
                      isFeaturedSponsored: true,
                      monthlyTier: 'GOLD'
                    })}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    নতুন ফর্মে ফিরে যান
                  </button>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-xs text-amber-950 font-medium">
                💰 <strong>আয় ও পার্টনারশিপ মডেল:</strong> এখানে স্থানীয় সার-কীটনাশকের দোকান বা বড় কোম্পানিদের তথ্য যুক্ত করলে কৃষকের প্রেসক্রিপশন ও ডিলার ডিরেক্টরিতে তাদের দোকান সবার উপরে স্পনসরড হিসেবে প্রদর্শিত হবে।
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">দোকান / প্রতিষ্ঠানের পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    value={dealerForm.shopNameBn}
                    onChange={e => setDealerForm({ ...dealerForm, shopNameBn: e.target.value })}
                    placeholder="যেমন: মেসার্স চৌধুরী ট্রেডার্স ও সার বিতান"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">স্বত্বাধিকারী / পরিচালকের নাম</label>
                  <input
                    type="text"
                    value={dealerForm.proprietorNameBn}
                    onChange={e => setDealerForm({ ...dealerForm, proprietorNameBn: e.target.value })}
                    placeholder="যেমন: হাজী মোহাম্মদ রফিকুল ইসলাম চৌধুরী"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">সরাসরি মোবাইল নম্বর (কল বাটন সক্রিয় হবে) *</label>
                  <input
                    type="text"
                    required
                    value={dealerForm.phone}
                    onChange={e => setDealerForm({ ...dealerForm, phone: e.target.value })}
                    placeholder="যেমন: ০১৮১৯-৮৮৭৭৬৬"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">উপজেলা</label>
                  <input
                    type="text"
                    value={dealerForm.upazilaNameBn}
                    onChange={e => setDealerForm({ ...dealerForm, upazilaNameBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালী"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">জেলা</label>
                  <input
                    type="text"
                    value={dealerForm.districtNameBn}
                    onChange={e => setDealerForm({ ...dealerForm, districtNameBn: e.target.value })}
                    placeholder="যেমন: চট্টগ্রাম"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div className="lg:col-span-3">
                  <label className="block text-xs font-bold text-stone-700 mb-1">বাজারের নাম ও দোকানের পূর্ণ ঠিকানা</label>
                  <input
                    type="text"
                    value={dealerForm.marketAddressBn}
                    onChange={e => setDealerForm({ ...dealerForm, marketAddressBn: e.target.value })}
                    placeholder="যেমন: বাঁশখালী পৌরসভা সদর বাজার, প্রধান সড়ক, বাঁশখালী, চট্টগ্রাম"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ডিলারের ধরন</label>
                  <select
                    value={dealerForm.dealerType}
                    onChange={e => {
                      const type = e.target.value;
                      let typeBn = 'অনুমোদিত বালাই ব্যবস্থাপনা ডিলার';
                      if (type === 'BCIC_FERTILIZER') typeBn = 'বিসিআইসি অনুমোদিত সরকারি সার ডিলার';
                      if (type === 'BADC_SEEDS') typeBn = 'বিএডিসি প্রত্যায়িত বীজ ও সার পরিবেশক';
                      if (type === 'MACHINERY_RENTAL') typeBn = '🚜 কম্বাইন হারভেস্টার ও পাওয়ার টিলার ভাড়া সেবা';
                      if (type === 'IRRIGATION_SERVICE') typeBn = '💧 লো-লিফট সেচ পাম্প ও বোরিং সেবা';
                      if (type === 'GENERAL_AGRI_INPUT') typeBn = 'সাধারণ কৃষি উপকরণ বিতান';
                      setDealerForm({ ...dealerForm, dealerType: type, dealerTypeBn: typeBn });
                    }}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="AUTHORIZED_PESTICIDE">অনুমোদিত বালাইনাশক ও স্প্রেয়ার</option>
                    <option value="BCIC_FERTILIZER">বিসিআইসি সরকারি সার ডিলার</option>
                    <option value="BADC_SEEDS">বিএডিসি প্রত্যয়িত বীজ ডিলার</option>
                    <option value="MACHINERY_RENTAL">🚜 কম্বাইন হারভেস্টার ও পাওয়ার টিলার সেবা</option>
                    <option value="IRRIGATION_SERVICE">💧 সেচ পাম্প ও বোরিং সেবা</option>
                    <option value="GENERAL_AGRI_INPUT">সাধারণ কৃষি উপকরণ বিতান</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">স্পনসরশিপ টিয়ার (Monetization Tier)</label>
                  <select
                    value={dealerForm.monthlyTier}
                    onChange={e => setDealerForm({ ...dealerForm, monthlyTier: e.target.value, isFeaturedSponsored: e.target.value !== 'FREE' })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option value="GOLD">🥇 গোল্ড পার্টনার (শীর্ষে ও ব্যানারসহ প্রদর্শন)</option>
                    <option value="SILVER">🥈 সিলভার পার্টনার (বিশেষ ব্যাজসহ প্রদর্শন)</option>
                    <option value="BRONZE">🥉 ব্রোঞ্জ পার্টনার</option>
                    <option value="FREE">ফ্রি সাধারণ লিস্টিং</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-800">
                    <input
                      type="checkbox"
                      checked={dealerForm.isFeaturedSponsored}
                      onChange={e => setDealerForm({ ...dealerForm, isFeaturedSponsored: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>⭐ স্পনসরড ব্যাজসহ সবার উপরে দেখান</span>
                  </label>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">অনুমোদিত ব্র্যান্ডসমূহ (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={dealerForm.authorizedBrands}
                    onChange={e => setDealerForm({ ...dealerForm, authorizedBrands: e.target.value })}
                    placeholder="যেমন: Syngenta, ACI Crop Care, Auto Crop Care, BADC, Square"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">মজুদকৃত পণ্যসমূহ</label>
                  <input
                    type="text"
                    value={dealerForm.productsAvailableBn}
                    onChange={e => setDealerForm({ ...dealerForm, productsAvailableBn: e.target.value })}
                    placeholder="যেমন: ইউরিয়া, ডিএপি, কীটনাশক, হাইব্রিড বীজ"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0" />
                  <span>দ্রুত সেভ সক্রিয়: ডিলার ও দোকানের তথ্য তাৎক্ষণিকভাবে উন্মুক্ত হবে।</span>
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-98 text-stone-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                >
                  {justSavedSection === 'dealer' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-stone-950 animate-bounce" />
                      <span>✅ তাত্ক্ষণিকভাবে সংরক্ষিত হয়েছে!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-stone-950 fill-stone-950" />
                      <span>{dealerForm.id ? 'ডিলার তথ্য দ্রুত আপডেট করুন' : 'নতুন অনুমোদিত ডিলার দ্রুত সংরক্ষণ করুন'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Existing Dealers Table / Grid */}
              <div className="pt-5 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>বর্তমানে তালিকাভুক্ত ডিলার ও বিজ্ঞাপনী শপ ({dealersList.length}টি)</span>
                  </h4>
                  <span className="text-[11px] text-stone-500">সম্পাদনা বা ডিলিট করতে পারেন</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                  {dealersList.map((dlr) => (
                    <div 
                      key={dlr.id}
                      className={`p-3.5 rounded-2xl border transition-all text-xs space-y-2 shadow-2xs ${
                        dlr.isFeaturedSponsored ? 'bg-amber-50/50 border-amber-300' : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-stone-900">{dlr.shopNameBn}</span>
                            {dlr.isFeaturedSponsored && (
                              <span className="bg-amber-400 text-stone-950 font-black text-[9px] px-1.5 py-0.2 rounded-full">
                                {dlr.monthlyTier || 'GOLD'}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{dlr.marketAddressBn}</div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setDealerForm({
                                id: dlr.id,
                                shopNameBn: dlr.shopNameBn,
                                proprietorNameBn: dlr.proprietorNameBn,
                                phone: dlr.phone,
                                districtNameBn: dlr.districtNameBn || 'চট্টগ্রাম',
                                upazilaNameBn: dlr.upazilaNameBn || 'বাঁশখালী',
                                marketAddressBn: dlr.marketAddressBn,
                                dealerType: dlr.dealerType,
                                dealerTypeBn: dlr.dealerTypeBn,
                                authorizedBrands: dlr.authorizedBrands.join(', '),
                                productsAvailableBn: dlr.productsAvailableBn.join(', '),
                                isFeaturedSponsored: dlr.isFeaturedSponsored,
                                monthlyTier: dlr.monthlyTier || 'GOLD'
                              });
                              window.scrollTo({ top: 400, behavior: 'smooth' });
                            }}
                            className="bg-white hover:bg-stone-100 text-stone-700 font-bold px-2.5 py-1 rounded-lg text-[11px] border border-stone-300 cursor-pointer"
                          >
                            ✏️ সম্পাদনা
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteDealer(dlr.id, dlr.shopNameBn)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded-lg border border-red-200 cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-600">
                        <span className="font-semibold text-emerald-800">
                          👤 {dlr.proprietorNameBn}
                        </span>
                        <span>📱 {dlr.phone}</span>
                        <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">{dlr.dealerTypeBn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 ml-1" />
              <input
                type="text"
                placeholder="লগ খুঁজুন (অ্যাকশন, কর্মকর্তা, বিবরণ)..."
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="w-full text-xs font-medium focus:outline-hidden"
              />
            </div>
            <span className="text-xs text-stone-500">{filteredLogs.length}টি রেকর্ড প্রদর্শিত</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <tr>
                    <th className="p-3">অ্যাকশন</th>
                    <th className="p-3">ব্যবহারকারী</th>
                    <th className="p-3">ভূমিকা (Role)</th>
                    <th className="p-3">বিবরণ</th>
                    <th className="p-3">আইপি ও সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredLogs.map((l) => (
                    <tr key={l.id} className="hover:bg-stone-50/60">
                      <td className="p-3 font-bold text-stone-900">{l.action}</td>
                      <td className="p-3 font-semibold text-emerald-800">{l.actorName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                          {l.actorRole}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600 max-w-xs truncate">{l.details}</td>
                      <td className="p-3 text-stone-400 text-[11px] whitespace-nowrap">
                        {l.timestamp} ({l.ip})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USERS & ROLES */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 flex justify-between items-center">
            <h3 className="font-bold text-stone-900 text-sm">সিস্টেম ব্যবহারকারী ও ভূমিকা ম্যাট্রিক্স</h3>
            <span className="text-xs text-stone-500">৭টি স্বীকৃত রোল সক্রিয়</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="p-3">নাম</th>
                  <th className="p-3">ভূমিকা (Role)</th>
                  <th className="p-3">পদবী / দপ্তর</th>
                  <th className="p-3">মোবাইল</th>
                  <th className="p-3">নিবন্ধনের তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50">
                    <td className="p-3 font-bold text-stone-900">{u.name}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-stone-600">{u.designation || 'কৃষক / ব্যবহারকারী'}</td>
                    <td className="p-3 text-stone-600">{u.phone}</td>
                    <td className="p-3 text-stone-400">{u.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
