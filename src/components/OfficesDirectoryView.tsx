import React, { useState, useEffect } from 'react';
import { 
  Building2, Phone, Mail, Clock, MapPin, PhoneCall, 
  Search, Filter, ShieldCheck, CheckCircle2, UserCheck, 
  HelpCircle, Sprout, ChevronRight 
} from 'lucide-react';
import { AgricultureOffice, Division, District, Upazila, Union } from '../types';
import { ALL_DIVISIONS, ALL_DISTRICTS, getUpazilasForDistrict, getUnionsForUpazila } from '../data/bangladeshGeo';

export const OfficesDirectoryView: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>(ALL_DIVISIONS);
  const [districts, setDistricts] = useState<District[]>(ALL_DISTRICTS);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);
  const [offices, setOffices] = useState<AgricultureOffice[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [selectedUnion, setSelectedUnion] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Load Divisions on mount
  useEffect(() => {
    fetch('/api/geo/divisions')
      .then(res => res.json())
      .then(data => setDivisions(data))
      .catch(console.error);

    loadOffices();
  }, []);

  // Cascade Districts when Division changes
  useEffect(() => {
    if (selectedDivision) {
      fetch(`/api/geo/districts?divisionId=${selectedDivision}`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data);
          setSelectedDistrict('');
          setUpazilas([]);
          setSelectedUpazila('');
          setUnions([]);
          setSelectedUnion('');
        })
        .catch(console.error);
    } else {
      fetch('/api/geo/districts')
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(console.error);
    }
  }, [selectedDivision]);

  // Cascade Upazilas when District changes
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`/api/geo/upazilas?districtId=${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          setUpazilas(data);
          setSelectedUpazila('');
          setUnions([]);
          setSelectedUnion('');
        })
        .catch(console.error);
      loadOffices('', selectedDistrict);
    } else {
      setUpazilas([]);
      setSelectedUpazila('');
      setUnions([]);
      setSelectedUnion('');
      loadOffices();
    }
  }, [selectedDistrict]);

  // Cascade Unions when Upazila changes
  useEffect(() => {
    if (selectedUpazila && selectedDistrict) {
      fetch(`/api/geo/unions?upazilaId=${selectedUpazila}&districtId=${selectedDistrict}`)
        .then(res => res.json())
        .then(data => {
          setUnions(data);
          setSelectedUnion('');
        })
        .catch(console.error);
      loadOffices(selectedUpazila, selectedDistrict);
    } else if (selectedDistrict) {
      setUnions([]);
      setSelectedUnion('');
      loadOffices('', selectedDistrict);
    }
  }, [selectedUpazila]);

  const loadOffices = (upzId = '', distId = '') => {
    setLoading(true);
    let url = '/api/offices';
    const params = new URLSearchParams();
    if (upzId) params.append('upazilaId', upzId);
    if (distId) params.append('districtId', distId);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setOffices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Filter offices & unions based on search query and union selection
  const filteredOffices = offices.filter(o => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    const matchesOffice = 
      o.nameBn.toLowerCase().includes(q) ||
      o.officerNameBn.toLowerCase().includes(q) ||
      o.addressBn.toLowerCase().includes(q) ||
      o.phone.includes(q);

    const matchesUnion = o.unions?.some(u => 
      u.nameBn.toLowerCase().includes(q) ||
      (u.saaoNameBn && u.saaoNameBn.toLowerCase().includes(q)) ||
      (u.saaoMobile && u.saaoMobile.includes(q))
    );

    return matchesOffice || matchesUnion;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-1.5 bg-blue-800/80 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-500/40 mb-2">
          <Building2 className="w-4 h-4 text-amber-300" />
          <span>সারাদেশের ৬৪ জেলা, প্রায় ৫০০ উপজেলা ও ইউনিয়ন ভিত্তিক কৃষি কর্মকর্তা নেটওয়ার্ক</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          উপজেলা ও ইউনিয়ন কৃষি কর্মকর্তা (UAO ও SAAO) ডিরেক্টরি
        </h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-3xl">
          আপনার বিভাগ, জেলা, উপজেলা এবং ইউনিয়ন নির্বাচন করে সরাসরি দায়িত্বপ্রাপ্ত উপজেলা কৃষি কর্মকর্তা (UAO) এবং আপনার নিজ ইউনিয়ন ব্লকের উপসহকারী কৃষি কর্মকর্তার (SAAO) নাম ও মোবাইল নম্বর জানুন।
        </p>

        {/* Quick Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10 text-center">
            <div className="text-xl font-extrabold text-amber-300">৮টি</div>
            <div className="text-[11px] text-blue-100">প্রশাসনিক বিভাগ</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10 text-center">
            <div className="text-xl font-extrabold text-emerald-300">৬৪টি</div>
            <div className="text-[11px] text-blue-100">কৃষি জেলা</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10 text-center">
            <div className="text-xl font-extrabold text-sky-300">~৫০০টি</div>
            <div className="text-[11px] text-blue-100">উপজেলা কৃষি অফিস</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 border border-white/10 text-center">
            <div className="text-xl font-extrabold text-rose-300">৪,৫০০+</div>
            <div className="text-[11px] text-blue-100">ইউনিয়ন SAAO ব্লক</div>
          </div>
        </div>
      </div>

      {/* Emergency Hotline Alert */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-amber-950 text-sm">জরুরি বালাই তথ্য ও সরাসরি কৃষি বিশেষজ্ঞ পরামর্শে: ১৬১২৩</div>
            <div className="text-stone-600">সরকারি কৃষি কল সেন্টার (সকাল ৭:০০টা হতে রাত ৯:০০টা পর্যন্ত) কোনো চার্জ ছাড়া সম্পূর্ণ টোল ফ্রি</div>
          </div>
        </div>

        <a
          href="tel:16123"
          className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>সরাসরি ১৬১২৩ এ কল দিন</span>
        </a>
      </div>

      {/* 4-Tier Geographic Cascading Filter */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Filter className="w-4 h-4 text-emerald-700" />
            <span>এলাকা ভিত্তিক কর্মকর্তা খুঁজুন (বিভাগ ➔ জেলা ➔ উপজেলা ➔ ইউনিয়ন):</span>
          </div>
          {(selectedDivision || selectedDistrict || selectedUpazila || selectedUnion) && (
            <button
              onClick={() => {
                setSelectedDivision('');
                setSelectedDistrict('');
                setSelectedUpazila('');
                setSelectedUnion('');
                setUpazilas([]);
                setUnions([]);
                loadOffices();
              }}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              ফিল্টার রিসেট করুন
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* 1. Division */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">১. বিভাগ নির্বাচন:</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            >
              <option value="">সব বিভাগ (৮টি বিভাগ)</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>{d.nameBn} ({d.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 2. District (64 Districts) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">২. জেলা নির্বাচন (৬৪ জেলা):</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            >
              <option value="">সব জেলা (৬৪টি জেলা)</option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>{dist.nameBn} ({dist.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 3. Upazila (~500 Upazilas) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">৩. উপজেলা নির্বাচন (~৫০০ উপজেলা):</label>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={upazilas.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 disabled:text-stone-400 bg-stone-50"
            >
              <option value="">{upazilas.length > 0 ? 'সব উপজেলা' : 'আগে জেলা বেছে নিন'}</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.id}>{u.nameBn} ({u.nameEn})</option>
              ))}
            </select>
          </div>

          {/* 4. Union (Unions under Upazila) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">৪. ইউনিয়ন নির্বাচন (Union Block):</label>
            <select
              value={selectedUnion}
              onChange={(e) => setSelectedUnion(e.target.value)}
              disabled={unions.length === 0}
              className="w-full p-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 disabled:bg-stone-100 disabled:text-stone-400 bg-stone-50"
            >
              <option value="">{unions.length > 0 ? 'সব ইউনিয়ন / ব্লক' : 'আগে উপজেলা বেছে নিন'}</option>
              {unions.map((uni) => (
                <option key={uni.id} value={uni.nameBn}>{uni.nameBn}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Free Text Search Bar */}
        <div className="pt-2 flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-200">
          <Search className="w-4 h-4 text-stone-400 ml-2 shrink-0" />
          <input
            type="text"
            placeholder="ইউনিয়ন, উপসহকারী কৃষি কর্মকর্তা (SAAO), উপজেলা বা মোবাইল নম্বর দিয়ে সার্চ করুন..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full text-xs text-stone-900 font-medium bg-transparent focus:outline-hidden"
          />
          {filterQuery && (
            <button onClick={() => setFilterQuery('')} className="text-xs text-stone-400 hover:text-stone-700 mr-2">
              মুছুন
            </button>
          )}
        </div>
      </div>

      {/* Offices & Unions Display Grid */}
      {loading ? (
        <div className="p-16 text-center text-stone-400 text-sm animate-pulse space-y-2">
          <div className="text-3xl">🏛️</div>
          <div>সরকারি কৃষি কার্যালয় ও ইউনিয়ন ডিরেক্টরি লোড হচ্ছে...</div>
        </div>
      ) : filteredOffices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center text-stone-500 space-y-3">
          <div className="text-4xl">🌾</div>
          <h3 className="font-bold text-stone-800 text-base">কোনো কৃষি কার্যালয় বা কর্মকর্তা খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            অন্য কোনো বিভাগ বা জেলা নির্বাচন করে পুনরায় অনুসন্ধান করুন। অথবা ১৬১২৩ নম্বরে কল দিয়ে সরাসরি সাহায্য নিন।
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOffices.map((office) => {
            // Filter office unions if selectedUnion or filterQuery is specified
            const officeUnions = office.unions || [];
            const visibleUnions = officeUnions.filter(u => {
              if (selectedUnion && u.nameBn !== selectedUnion) return false;
              if (filterQuery) {
                const q = filterQuery.toLowerCase();
                return (
                  u.nameBn.toLowerCase().includes(q) ||
                  (u.saaoNameBn && u.saaoNameBn.toLowerCase().includes(q)) ||
                  (u.saaoMobile && u.saaoMobile.includes(q))
                );
              }
              return true;
            });

            return (
              <div 
                key={office.id} 
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5 hover:border-blue-400 transition-all hover:shadow-md"
              >
                {/* 1. Upazila Agriculture Office Header Card */}
                <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-5 rounded-2xl border border-blue-200/70 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/50 pb-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full mb-1">
                        <Building2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>সরকারি উপজেলা কৃষি অফিস (DAE)</span>
                      </div>
                      <h3 className="font-extrabold text-stone-900 text-lg leading-snug">
                        {office.nameBn}
                      </h3>
                      <div className="text-xs text-stone-600 mt-0.5 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>{office.addressBn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ডিএই স্বীকৃত অফিস</span>
                      </span>
                    </div>
                  </div>

                  {/* Upazila Agriculture Officer (UAO) Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-blue-200 shadow-2xs">
                      <div>
                        <div className="text-stone-400 text-[10px]">উপজেলা কৃষি কর্মকর্তা (UAO):</div>
                        <div className="font-bold text-stone-900 text-sm flex items-center gap-1">
                          <UserCheck className="w-4 h-4 text-blue-700" />
                          <span>{office.officerNameBn}</span>
                        </div>
                        <div className="text-stone-500 text-[11px]">{office.officerDesignationBn}</div>
                      </div>
                      <a
                        href={`tel:${office.officerMobile}`}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm text-xs transition-all shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>সরাসরি কল</span>
                      </a>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-2xs space-y-1.5 text-stone-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{office.officeHoursBn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>ইমেইল: <span className="font-medium text-blue-800">{office.email}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>ল্যান্ডলাইন: {office.phone} | হটলাইন: <strong className="text-amber-800 font-extrabold">{office.hotline}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Union-Level SAAO & Agriculture Block Directory */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-700" />
                      <h4 className="font-bold text-stone-900 text-sm">
                        উপজেলাধীন ইউনিয়ন ভিত্তিক উপসহকারী কৃষি কর্মকর্তা (SAAO) ও কৃষি ব্লক নেটওয়ার্ক
                      </h4>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {officeUnions.length}টি ইউনিয়ন ব্লক
                      </span>
                    </div>
                    {selectedUnion && (
                      <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                        নির্বাচিত: {selectedUnion}
                      </span>
                    )}
                  </div>

                  {visibleUnions.length === 0 ? (
                    <div className="bg-stone-50 p-4 rounded-xl text-center text-xs text-stone-500">
                      এই উপজেলায় নির্বাচিত ইউনিয়ন অথবা সার্চের সাথে মিল পাওয়া যায়নি।
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {visibleUnions.map((uni) => {
                        const isHighlighted = selectedUnion === uni.nameBn;
                        return (
                          <div
                            key={uni.id}
                            className={`p-3.5 rounded-2xl border transition-all text-xs space-y-2.5 ${
                              isHighlighted 
                                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/50 shadow-sm'
                                : 'bg-stone-50 border-stone-200 hover:border-emerald-300 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1 border-b border-stone-200/70 pb-2">
                              <div>
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                  ইউনিয়ন ব্লক
                                </span>
                                <h5 className="font-extrabold text-stone-900 text-sm mt-1">
                                  {uni.nameBn}
                                </h5>
                                <div className="text-[11px] text-stone-500">
                                  {uni.blockNameBn}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="text-[10px] text-stone-400 font-semibold">
                                উপসহকারী কৃষি কর্মকর্তা (SAAO):
                              </div>
                              <div className="font-bold text-stone-900 text-xs">
                                {uni.saaoNameBn || 'কৃষিবিদ (দায়িত্বপ্রাপ্ত এসএএও)'}
                              </div>
                              <div className="text-[10px] text-stone-500 flex items-start gap-1">
                                <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{uni.centerAddressBn}</span>
                              </div>
                              {uni.mainCropsBn && (
                                <div className="text-[10px] text-stone-600 flex items-center gap-1 pt-0.5">
                                  <span className="font-bold text-emerald-800">🌾 প্রধান ফসল:</span>
                                  <span className="text-stone-700 line-clamp-1">{uni.mainCropsBn}</span>
                                </div>
                              )}
                            </div>

                            <div className="pt-1 flex items-center justify-between border-t border-stone-200/60">
                              <span className="text-[11px] font-mono text-stone-700 font-bold">
                                {uni.saaoMobile || '০১৭০০-১২৩৪৫৬'}
                              </span>
                              <a
                                href={`tel:${uni.saaoMobile || '01700123456'}`}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs text-[11px] transition-all"
                              >
                                <Phone className="w-3 h-3" />
                                <span>সরাসরি কল</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
