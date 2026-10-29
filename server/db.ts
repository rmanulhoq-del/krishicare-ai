import { 
  User, Division, District, Upazila, Union, AgricultureOffice, 
  Crop, Disease, TreatmentCategory, ActiveIngredient, DoseRule, 
  Diagnosis, KnowledgeItem, MarketPrice, GovernmentUpdate, AuditLog, NotificationItem, Role, WeatherCondition,
  IncentivePackage, AgriDealer, MarketplaceCropListing
} from './types';
import { 
  ALL_DIVISIONS, ALL_DISTRICTS, getUpazilasForDistrict, 
  getUnionsForUpazila, generateOfficeForUpazila, generateRegionalWeather, 
  getRegionalCropAdvice 
} from './bangladeshGeo';

export class AgriCareDatabase {
  private users: User[] = [];
  private divisions: Division[] = ALL_DIVISIONS;
  private districts: District[] = ALL_DISTRICTS;
  private upazilas: Upazila[] = [];
  private unions: Union[] = [];
  private offices: AgricultureOffice[] = [];
  private crops: Crop[] = [];
  private diseases: Disease[] = [];
  private treatmentCategories: TreatmentCategory[] = [];
  private activeIngredients: ActiveIngredient[] = [];
  private doseRules: DoseRule[] = [];
  private diagnoses: Diagnosis[] = [];
  private knowledgeItems: KnowledgeItem[] = [];
  private marketPrices: MarketPrice[] = [];
  private governmentUpdates: GovernmentUpdate[] = [];
  private incentives: IncentivePackage[] = [];
  private auditLogs: AuditLog[] = [];
  private notifications: NotificationItem[] = [];
  private dealers: AgriDealer[] = [];
  private marketplaceListings: MarketplaceCropListing[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    this.divisions = ALL_DIVISIONS;
    this.districts = ALL_DISTRICTS;


    // 3. Upazilas
    this.upazilas = [
      { id: 'upz-1', districtId: 'dist-1', nameBn: 'শ্রীপুর', nameEn: 'Sreepur' },
      { id: 'upz-2', districtId: 'dist-1', nameBn: 'গাজীপুর সদর', nameEn: 'Gazipur Sadar' },
      { id: 'upz-3', districtId: 'dist-3', nameBn: 'শিবগঞ্জ', nameEn: 'Shibganj' },
      { id: 'upz-4', districtId: 'dist-4', nameBn: 'দিনাজপুর সদর', nameEn: 'Dinajpur Sadar' },
      { id: 'upz-5', districtId: 'dist-5', nameBn: 'ঝিকরগাছা', nameEn: 'Jhikargachha' },
    ];

    // 4. Unions
    this.unions = [
      { id: 'uni-1', upazilaId: 'upz-1', nameBn: 'মাওনা', nameEn: 'Mawna' },
      { id: 'uni-2', upazilaId: 'upz-1', nameBn: 'তেলিহাটি', nameEn: 'Telihati' },
      { id: 'uni-3', upazilaId: 'upz-2', nameBn: 'কাউসতিয়া', nameEn: 'Kaustia' },
      { id: 'uni-4', upazilaId: 'upz-3', nameBn: 'মহাস্থান', nameEn: 'Mahasthan' },
      { id: 'uni-5', upazilaId: 'upz-4', nameBn: 'চেহেলগাজী', nameEn: 'Chehelgazi' },
    ];

    // 5. Agriculture Offices (Seeded with Banskhali & Primary Offices)
    this.offices = [
      {
        id: 'off-upz-dist-chattogram-banshkhali',
        upazilaId: 'upz-dist-chattogram-banshkhali',
        districtId: 'dist-chattogram',
        nameBn: 'উপজেলা কৃষি অফিস, বাঁশখালী, চট্টগ্রাম',
        nameEn: 'Upazila Agriculture Office, Banshkhali, Chattogram',
        addressBn: 'উপজেলা পরিষদ চত্বর, বাঁশখালী, চট্টগ্রাম',
        phone: '০১৭১২-৩৪৫৬৭৮',
        email: 'uao.banskhali@dae.gov.bd',
        officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০ (সরকারি কর্মদিবস)',
        officerNameBn: 'জনাব শ্যামল চন্দ্র সরকার',
        officerDesignationBn: 'উপজেলা কৃষি কর্মকর্তা (UAO) ও দায়িত্বপ্রাপ্ত এসএএও সমন্বয়ক',
        officerMobile: '০১৭১২-৩৪৫৬৭৮',
        hotline: '১৬১২৩',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        unions: [
          // ১. নাপোড়া ইউনিয়ন (Napora)
          {
            id: 'uni-banshkhali-napora-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'নাপোড়া',
            nameEn: 'Napora',
            blockNameBn: 'নাপোড়া বাজার ও কৃষি ব্লক',
            saaoNameBn: 'জনাব রেজাউল করিম',
            saaoMobile: '০১৮৭৩-১৮২৯১৯',
            centerAddressBn: 'নাপোড়া বাজার ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র, বাঁশখালী, চট্টগ্রাম',
            mainCropsBn: 'মিষ্টি তরমুজ, আমন ধান, খিরা, গোল বেগুন'
          },
          {
            id: 'uni-banshkhali-napora-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'নাপোড়া',
            nameEn: 'Napora East',
            blockNameBn: 'নাপোড়া পূর্ব পাহাড়ি ও পান বরজ ব্লক',
            saaoNameBn: 'কৃষিবিদ মোহাম্মদ হেলাল উদ্দিন',
            saaoMobile: '০১৮১৮-৪৫৬৭৮৯',
            centerAddressBn: 'পূর্ব নাপোড়া প্রাথমিক বিদ্যালয় সংলগ্ন কৃষি কেন্দ্র',
            mainCropsBn: 'বাঁশখালী মিষ্টি পান, সুপারি, পেয়ারা, শীতকালীন শাকসবজি'
          },

          // ২. পুকুরিয়া ইউনিয়ন (Pukuria)
          {
            id: 'uni-banshkhali-pukuria-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'পুকুরিয়া',
            nameEn: 'Pukuria North',
            blockNameBn: 'পুকুরিয়া উত্তর ও চাঁদপুর বেলগাঁও চা বাগান ব্লক',
            saaoNameBn: 'কৃষিবিদ কাজী আশরাফুল আলম',
            saaoMobile: '০১৭০৪-৮৯২১০৩',
            centerAddressBn: 'পুকুরিয়া ইউনিয়ন পরিষদ কমপ্লেক্স ও চা বাগান রোড',
            mainCropsBn: 'বেলগাঁও অর্থকরী চা, উফশী ধান, লেবু ও পাহাড়ি ফল'
          },
          {
            id: 'uni-banshkhali-pukuria-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'পুকুরিয়া',
            nameEn: 'Pukuria South',
            blockNameBn: 'পুকুরিয়া দক্ষিণ ও হাজিগাঁও কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ নুরুল ইসলাম চৌধুরী',
            saaoMobile: '০১৮১৯-৩০৪০৫০',
            centerAddressBn: 'হাজিগাঁও বাজার কৃষক সেবা পয়েন্ট',
            mainCropsBn: 'রোপা আমন ধান, সরিষা, মরিচ ও মিষ্টি আলু'
          },

          // ৩. সাধনপুর ইউনিয়ন (Sadhanpur)
          {
            id: 'uni-banshkhali-sadhanpur-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'সাধনপুর',
            nameEn: 'Sadhanpur',
            blockNameBn: 'সাধনপুর সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ জাকিয়া সুলতানা',
            saaoMobile: '০১৭৩১-৯৫৪১২৩',
            centerAddressBn: 'সাধনপুর ইউনিয়ন পরিষদ কমপ্লেক্স',
            mainCropsBn: 'উফশী বোরো ও আমন ধান, টমেটো, ফুলকপি, বাঁধাকপি'
          },
          {
            id: 'uni-banshkhali-sadhanpur-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'সাধনপুর',
            nameEn: 'Banigram',
            blockNameBn: 'বাণীগ্রাম ও পূর্ব সাধনপুর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. তৌহিদুল আলম',
            saaoMobile: '০১৮১২-৬৭৮৯০১',
            centerAddressBn: 'বাণীগ্রাম উচ্চ বিদ্যালয় সংলগ্ন কৃষি কেন্দ্র',
            mainCropsBn: 'বাঁশখালী মিষ্টি পান, পেয়ারা, বরবটি ও লাউ'
          },

          // ৪. খানখানাবাদ ইউনিয়ন (Khankhanabad)
          {
            id: 'uni-banshkhali-khankhanabad-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'খানখানাবাদ',
            nameEn: 'Khankhanabad',
            blockNameBn: 'খানখানাবাদ কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ তাসলিমা আক্তার',
            saaoMobile: '০১৭৫৫-৪৪৩৩২২',
            centerAddressBn: 'খানখানাবাদ ইউনিয়ন পরিষদ ভবন',
            mainCropsBn: 'লবণ-সহনশীল ব্রি ধান ৬৭/৯৭, তরমুজ, খিরা'
          },
          {
            id: 'uni-banshkhali-khankhanabad-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'খানখানাবাদ',
            nameEn: 'Kadam Rasul',
            blockNameBn: 'কদম রসুল ও উপকূলীয় চরাঞ্চল ব্লক',
            saaoNameBn: 'কৃষিবিদ মোহাম্মদ শফিকুল ইসলাম',
            saaoMobile: '০১৮১৫-১২২৩৩৪',
            centerAddressBn: 'কদম রসুল বাজার কৃষি তথ্য কেন্দ্র',
            mainCropsBn: 'চরের মিষ্টি তরমুজ, বাঙ্গি, মিষ্টি আলু ও ডাল'
          },

          // ৫. বাহারছড়া ইউনিয়ন (Baharchhara)
          {
            id: 'uni-banshkhali-baharchhara-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বাহারছড়া',
            nameEn: 'Baharchhara Coastal',
            blockNameBn: 'বাহারছড়া পশ্চিম উপকূলীয় কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মোরশেদুল আলম',
            saaoMobile: '০১৮১৯-২২৩৩৪৪',
            centerAddressBn: 'বাহারছড়া ইউনিয়ন পরিষদ কমপ্লেক্স',
            mainCropsBn: 'লবণাক্ততা সহনশীল ধান, তরমুজ, খিরা ও মিষ্টি আলু'
          },
          {
            id: 'uni-banshkhali-baharchhara-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বাহারছড়া',
            nameEn: 'Chanpur',
            blockNameBn: 'চাঁনপুর ও রত্নপুর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. আনিসুর রহমান',
            saaoMobile: '০১৮১৬-৮৮৯৯১১',
            centerAddressBn: 'চাঁনপুর বাজার কৃষক সেবা কেন্দ্র',
            mainCropsBn: 'শীতকালীন সবজি, বেগুন, টমেটো ও শাক'
          },

          // ৬. কালীপুর ইউনিয়ন (Kalipur)
          {
            id: 'uni-banshkhali-kalipur-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'কালীপুর',
            nameEn: 'Kalipur',
            blockNameBn: 'কালীপুর সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ রফিকুল ইসলাম ভূঁইয়া',
            saaoMobile: '০১৮১২-৩৪৫৬৭৮',
            centerAddressBn: 'কালীপুর ইউনিয়ন পরিষদ ও কৃষি সেবা কেন্দ্র',
            mainCropsBn: 'উফশী ধান, বরবটি, শিম, আলু ও সবজি'
          },
          {
            id: 'uni-banshkhali-kalipur-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'কালীপুর',
            nameEn: 'Gunagari',
            blockNameBn: 'গুনাগরি চৌমুহনী বাণিজ্যিক কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ সুমাইয়া জান্নাত',
            saaoMobile: '০১৭২৮-৬৬৫৫৪৪',
            centerAddressBn: 'গুনাগরি চৌমুহনী বাজার কৃষি অফিস ভবন',
            mainCropsBn: 'বাণিজ্যিক শাকসবজি, বীজতলা, হাইব্রিড ভুট্টা'
          },

          // ৭. বৈলছড়ী ইউনিয়ন (Bailchhari)
          {
            id: 'uni-banshkhali-bailchhari-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বৈলছড়ী',
            nameEn: 'Bailchhari',
            blockNameBn: 'বৈলছড়ী সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. আনোয়ারুল হক',
            saaoMobile: '০১৮১৬-৭৫৪৩২১',
            centerAddressBn: 'বৈলছড়ী ইউনিয়ন পরিষদ কমপ্লেক্স',
            mainCropsBn: 'মিষ্টি পান, আমন ধান, লাল শাক, গোল বেগুন'
          },
          {
            id: 'uni-banshkhali-bailchhari-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বৈলছড়ী',
            nameEn: 'Chechuria',
            blockNameBn: 'চেচুরিয়া ও পূর্ব বৈলছড়ী কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. মনজুর আলম',
            saaoMobile: '০১৮১৪-৫৫৬৬৭৭',
            centerAddressBn: 'চেচুরিয়া ঘোনা কৃষি তথ্য কেন্দ্র',
            mainCropsBn: 'পান বরজ, সুপারি বাগান, আদা, হলুদ ও পাহাড়ি শাক'
          },

          // ৮. কাথরিয়া ইউনিয়ন (Katharia)
          {
            id: 'uni-banshkhali-katharia-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'কাথরিয়া',
            nameEn: 'Katharia',
            blockNameBn: 'কাথরিয়া সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ আবদুল মান্নান',
            saaoMobile: '০১৮১৫-৯৯০০১১',
            centerAddressBn: 'কাথরিয়া ইউনিয়ন পরিষদ ভবন',
            mainCropsBn: 'আমন ও বোরো ধান, মিষ্টি তরমুজ, খিরা ও বেগুন'
          },
          {
            id: 'uni-banshkhali-katharia-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'কাথরিয়া',
            nameEn: 'Bagmara',
            blockNameBn: 'বাগমারা ও বড়ঘোনা কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ সাদ্দাম হোসেন',
            saaoMobile: '০১৮১১-৮৮৯৯০০',
            centerAddressBn: 'বাগমারা বাজার কৃষক তথ্য কেন্দ্র',
            mainCropsBn: 'উপকূলীয় ধান, খিরা, মরিচ, মিষ্টিকুমড়া'
          },

          // ৯. সরল ইউনিয়ন (Saral)
          {
            id: 'uni-banshkhali-sarol-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'সরল',
            nameEn: 'Saral',
            blockNameBn: 'সরল সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মাহমুদ হাসান',
            saaoMobile: '০১৭২৩-৬৬৭৭৮৮',
            centerAddressBn: 'সরল ইউনিয়ন পরিষদ ও ডিজিটাল তথ্য কেন্দ্র',
            mainCropsBn: 'উফশী ধান, বরবটি, ঝিঙে, করলা ও পটল'
          },
          {
            id: 'uni-banshkhali-sarol-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'সরল',
            nameEn: 'Pairang',
            blockNameBn: 'পাইরাং ও পশ্চিম সরল উপকূলীয় ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. ইমরান হোসেন',
            saaoMobile: '০১৮১৮-৭৭৬৬৫৫',
            centerAddressBn: 'পাইরাং দেওয়ান বাজার কৃষি সেবা পয়েন্ট',
            mainCropsBn: 'লবণাক্ততাসহিষ্ণু ব্রি ধান ৬৭, মিষ্টি তরমুজ'
          },

          // ১০. গণ্ডামারা ইউনিয়ন (Gandamara)
          {
            id: 'uni-banshkhali-gandmara-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'গণ্ডামারা',
            nameEn: 'Gandamara',
            blockNameBn: 'গণ্ডামারা উপকূলীয় কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ সাইদুর রহমান',
            saaoMobile: '০১৮১৯-৭৭৮৮৯৯',
            centerAddressBn: 'গণ্ডামারা ইউনিয়ন পরিষদ কমপ্লেক্স',
            mainCropsBn: 'লবণ-সহনশীল ধান, চরের তরমুজ, খিরা'
          },
          {
            id: 'uni-banshkhali-gandmara-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'গণ্ডামারা',
            nameEn: 'West Gandamara',
            blockNameBn: 'পশ্চিম গণ্ডামারা ও কয়লা বিদ্যুৎ প্রকল্প সংলগ্ন ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. জসিম উদ্দিন',
            saaoMobile: '০১৮১৬-৩৩৪২৫৫',
            centerAddressBn: 'পশ্চিম গণ্ডামারা বেড়িবাঁধ সংলগ্ন কৃষি পয়েন্ট',
            mainCropsBn: 'উপকূলীয় চরের খিরা, তরমুজ, বাঙ্গি ও ডাল'
          },

          // ১১. শীলকূপ ইউনিয়ন (Shilkup)
          {
            id: 'uni-banshkhali-shilkup-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'শীলকূপ',
            nameEn: 'Shilkup',
            blockNameBn: 'শীলকূপ সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মোহাম্মদ আশরাফুল ইসলাম',
            saaoMobile: '০১৮১২-৫৫৮৮৯৯',
            centerAddressBn: 'শীলকূপ ইউনিয়ন পরিষদ ও ডিজিটাল তথ্য কেন্দ্র',
            mainCropsBn: 'ব্রি ধান ২৮/২৯, মিষ্টি পান, ফুলকপি, বাঁধাকপি'
          },
          {
            id: 'uni-banshkhali-shilkup-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'শীলকূপ',
            nameEn: 'Monkichar',
            blockNameBn: 'মনকিচর ও পূর্ব শীলকূপ কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ রুহুল আমিন',
            saaoMobile: '০১৮১৩-৪৪৩৩২২',
            centerAddressBn: 'মনকিচর বাজার কৃষি সেবা কেন্দ্র',
            mainCropsBn: 'পান বরজ, পেয়ারা, মিষ্টি কুমড়া, শসা'
          },

          // ১২. চাম্বল ইউনিয়ন (Chambal)
          {
            id: 'uni-banshkhali-chambal-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'চাম্বল',
            nameEn: 'Chambal',
            blockNameBn: 'চাম্বল সদর ও বাজার কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ দিলরুবা বেগম',
            saaoMobile: '০১৭৩৪-৮৮৯৯০০',
            centerAddressBn: 'চাম্বল বাজার কৃষি সেবা কেন্দ্র',
            mainCropsBn: 'উফশী ধান, মিষ্টি পান, লাল শাক, মুলা, বেগুন'
          },
          {
            id: 'uni-banshkhali-chambal-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'চাম্বল',
            nameEn: 'East Chambal',
            blockNameBn: 'পূর্ব চাম্বল পাহাড়ি পাদদেশ ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. কামরুল ইসলাম',
            saaoMobile: '০১৮১৯-১১২২৩৩',
            centerAddressBn: 'পূর্ব চাম্বল পাহাড়ি রেঞ্জ সংলগ্ন কৃষি পয়েন্ট',
            mainCropsBn: 'আদা, হলুদ, কাজুবাদাম, পাহাড়ি আনারস ও কলা'
          },

          // ১৩. শেখেরখীল ইউনিয়ন (Shekherkhil)
          {
            id: 'uni-banshkhali-shekherkhil-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'শেখেরখীল',
            nameEn: 'Shekherkhil',
            blockNameBn: 'শেখেরখীল সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ ফাতেমা তুজ জোহরা',
            saaoMobile: '০১৭২৮-১১২২৩৩',
            centerAddressBn: 'শেখেরখীল ডিজিটাল সেন্টার ও কৃষি সেবা কেন্দ্র',
            mainCropsBn: 'লবণাক্ততা সহনশীল ধান, চরের খিরা, বেগুন'
          },
          {
            id: 'uni-banshkhali-shekherkhil-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'শেখেরখীল',
            nameEn: 'Farirmukh',
            blockNameBn: 'ফাঁড়িরমুখ ও ছড়ারকূল উপকূলীয় ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. জিল্লুর রহমান',
            saaoMobile: '০১৮১৬-৯৯৮৮৭৭',
            centerAddressBn: 'ফাঁড়িরমুখ বাজার কৃষি তথ্য কেন্দ্র',
            mainCropsBn: 'উপকূলীয় তরমুজ, খিরা, মরিচ, মিষ্টি আলু'
          },

          // ১৪. পুঁইছড়ি ইউনিয়ন (Puichhari)
          {
            id: 'uni-banshkhali-puichhari-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'পুঁইছড়ি',
            nameEn: 'Puichhari',
            blockNameBn: 'পুঁইছড়ি সদর কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ নাজমুন নাহার',
            saaoMobile: '০১৭৩১-৯০১২২৩',
            centerAddressBn: 'পুঁইছড়ি ইউনিয়ন পরিষদ কমপ্লেক্স',
            mainCropsBn: 'ব্রি ধান ৮৭/৮৮, গোল আলু, ফুলকপি, বেগুন'
          },
          {
            id: 'uni-banshkhali-puichhari-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'পুঁইছড়ি',
            nameEn: 'Futkhali',
            blockNameBn: 'ফুটখালী ও পূর্ব পুঁইছড়ি কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. শওকত হোসেন',
            saaoMobile: '০১৮১২-১১০০৯৯',
            centerAddressBn: 'ফুটখালী ব্রিজ সংলগ্ন কৃষি তথ্য কেন্দ্র',
            mainCropsBn: 'মিষ্টি পান, সুপারি, মিষ্টি কুমড়া, আউশ ধান'
          },

          // ১৫. ছনুয়া ইউনিয়ন (Chhanua)
          {
            id: 'uni-banshkhali-chhanua-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'ছনুয়া',
            nameEn: 'Chhanua',
            blockNameBn: 'ছনুয়া সদর উপকূলীয় লবণাক্ততা ও কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ কামরুল হাসান চৌধুরী',
            saaoMobile: '০১৮১৮-৩৩৪৪৭৭',
            centerAddressBn: 'ছনুয়া ইউনিয়ন পরিষদ ভবন',
            mainCropsBn: 'লবণাক্ততা সহনশীল ধান (ব্রি ধান ৬৭, ৯৭), মিষ্টি আলু'
          },
          {
            id: 'uni-banshkhali-chhanua-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'ছনুয়া',
            nameEn: 'Manu Miyaji Ghat',
            blockNameBn: 'মনু মিয়াজী ঘাট ও দক্ষিণ ছনুয়া ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. রেজাউল মোস্তফা',
            saaoMobile: '০১৮১৯-৬৬৫৫৪৪',
            centerAddressBn: 'মনু মিয়াজী ঘাট কৃষক তথ্য সেবা কেন্দ্র',
            mainCropsBn: 'উপকূলীয় চরের তরমুজ, খিরা, ডাল ও তেলবীজ'
          },

          // ১৬. বাঁশখালী পৌরসভা (Banshkhali Municipality / জলদী)
          {
            id: 'uni-banshkhali-paurashava-1',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বাঁশখালী পৌরসভা',
            nameEn: 'Jaldi Sadar',
            blockNameBn: 'পৌর জলদী সদর ও বাণিজ্যিক কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ ড. এনামুল হক (ভারপ্রাপ্ত পৌর সমন্বয়ক)',
            saaoMobile: '০১৭১১-২২৩৩৪৪',
            centerAddressBn: 'বাঁশখালী পৌরসভা ভবন ও ডিজিটাল কৃষি তথ্য কেন্দ্র',
            mainCropsBn: 'উচ্চমূল্যের শাকসবজি, ছাদবাগান, পলিনেট হাউজ ফসল'
          },
          {
            id: 'uni-banshkhali-paurashava-2',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বাঁশখালী পৌরসভা',
            nameEn: 'North Jaldi',
            blockNameBn: 'পৌর উত্তর জলদী ও পাহাড়ি উদ্যান ব্লক',
            saaoNameBn: 'কৃষিবিদ মোছা. শারমিন আক্তার',
            saaoMobile: '০১৮১৭-৪৪৩৩২২',
            centerAddressBn: 'উত্তর জলদী কৃষি ও উদ্যান সেবা পয়েন্ট',
            mainCropsBn: 'আম্রপালি আম, মাল্টা, ড্রাগন ফল, পেয়ারা, পাহাড়ি কলা'
          },
          {
            id: 'uni-banshkhali-paurashava-3',
            upazilaId: 'upz-dist-chattogram-banshkhali',
            districtId: 'dist-chattogram',
            nameBn: 'বাঁশখালী পৌরসভা',
            nameEn: 'South Jaldi',
            blockNameBn: 'পৌর দক্ষিণ জলদী ও গ্রামীণ কৃষি ব্লক',
            saaoNameBn: 'কৃষিবিদ মো. আবুল কালাম আজাদ',
            saaoMobile: '০১৮১৫-৫৫৬৬৭৭',
            centerAddressBn: 'দক্ষিণ জলদী বেইলি ব্রিজ রোড কৃষি কেন্দ্র',
            mainCropsBn: 'রোপা আমন, বোরো ধান, মিষ্টি ভুট্টা ও মৌসুমি শাক'
          }
        ]
      },
      {
        id: 'off-1',
        upazilaId: 'upz-1',
        districtId: 'dist-1',
        nameBn: 'উপজেলা কৃষি অফিস, শ্রীপুর, গাজীপুর',
        nameEn: 'Upazila Agriculture Office, Sreepur, Gazipur',
        addressBn: 'উপজেলা পরিষদ চত্বর, শ্রীপুর, গাজীপুর',
        phone: '০১৭০০-১২৩৪৫৬',
        email: 'uao.sreepur@dae.gov.bd',
        officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০',
        officerNameBn: 'কৃষিবিদ এস এম তারিকুল ইসলাম',
        officerDesignationBn: 'উপজেলা কৃষি কর্মকর্তা (UAO)',
        officerMobile: '০১৭০৪-৮৯২১০৩',
        hotline: '১৬১২৩'
      },
      {
        id: 'off-2',
        upazilaId: 'upz-2',
        districtId: 'dist-1',
        nameBn: 'উপজেলা কৃষি অফিস, গাজীপুর সদর',
        nameEn: 'Upazila Agriculture Office, Gazipur Sadar',
        addressBn: 'জয়দেবপুর, গাজীপুর',
        phone: '০১৭০০-২৩৪৫৬৭',
        email: 'uao.gazipursadar@dae.gov.bd',
        officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০',
        officerNameBn: 'কৃষিবিদ তাহমিনা বেগম',
        officerDesignationBn: 'উপজেলা কৃষি কর্মকর্তা',
        officerMobile: '০১৮১৬-৭৫৪৩২১',
        hotline: '১৬১২৩'
      },
      {
        id: 'off-3',
        upazilaId: 'upz-3',
        districtId: 'dist-3',
        nameBn: 'উপজেলা কৃষি অফিস, শিবগঞ্জ, বগুড়া',
        nameEn: 'Upazila Agriculture Office, Shibganj, Bogura',
        addressBn: 'শিবগঞ্জ বাজার রোড, বগুড়া',
        phone: '০১৭০০-৩৪৫৬৭৮',
        email: 'uao.shibganj@dae.gov.bd',
        officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০',
        officerNameBn: 'কৃষিবিদ মোহাম্মদ আনোয়ার হোসেন',
        officerDesignationBn: 'উপসহকারী কৃষি কর্মকর্তা (SAAO)',
        officerMobile: '০১৭৩১-৯৫৪১২৩',
        hotline: '১৬১২৩'
      }
    ];

    // 6. Seed Users (Admin: Mohammed Armanul Hoque, Napora, Banskhali, Chattogram)
    this.users = [
      {
        id: 'usr-armanul-admin',
        name: 'মোহাম্মদ আরমানুল হক (Mohammed Armanul Hoque)',
        phone: '০১৮১৯-০৪৫৬৭৮',
        email: 'rmanulhoq@gmail.com',
        role: 'SUPER_ADMIN',
        designation: 'প্রধান সিস্টেম অ্যাডমিনিস্ট্রেটর, নাপোড়া, বাঁশখালী, চট্টগ্রাম (Napora, Banskhali, Chattogram)',
        createdAt: '2026-01-01'
      },
      {
        id: 'usr-officer',
        name: 'কৃষিবিদ মোহাম্মদ আশরাফুল আলম',
        phone: '০১৭০৪-৮৯২১০৩',
        email: 'officer.banskhali@dae.gov.bd',
        role: 'AGRICULTURE_OFFICER',
        divisionId: 'div-chattogram',
        districtId: 'dist-chattogram',
        upazilaId: 'upz-banskhali',
        designation: 'উপজেলা কৃষি কর্মকর্তা (UAO), বাঁশখালী, চট্টগ্রাম',
        createdAt: '2026-01-10'
      },
      {
        id: 'usr-farmer',
        name: 'মো. আবুল কাশেম (কৃষক)',
        phone: '০১৮১৯-৮৭৬৫৪৩',
        role: 'FARMER',
        divisionId: 'div-chattogram',
        districtId: 'dist-chattogram',
        upazilaId: 'upz-banskhali',
        unionId: 'uni-napora',
        designation: 'নিবন্ধিত প্রান্তিক কৃষক, নাপোড়া, বাঁশখালী',
        createdAt: '2026-02-01'
      }
    ];

    // 7. Crops
    this.crops = [
      {
        id: 'crop-universal',
        nameBn: '✨ স্বয়ংক্রিয় এআই শনাক্তকরণ',
        nameEn: 'Universal AI Vision (Any Crop / Plant)',
        scientificName: 'যেকোনো গাছ, ফসল, পাতা, ফুল বা ফল',
        category: 'Universal AI',
        icon: '🤖',
        stages: ['চারা অবস্থা', 'বৃদ্ধি পর্যায়', 'ফুল ও কুঁড়ি', 'ফল ধরা ও পরিপক্বতা']
      },
      {
        id: 'crop-jute',
        nameBn: 'পাট',
        nameEn: 'Jute',
        scientificName: 'Corchorus olitorius',
        category: 'Cash Crop',
        icon: '🌿',
        stages: ['চারা গজানো', 'বৃদ্ধি পর্যায়', 'ফুল আসা', 'পাট কাটা']
      },
      {
        id: 'crop-corn',
        nameBn: 'ভুট্টা',
        nameEn: 'Corn / Maize',
        scientificName: 'Zea mays',
        category: 'Cereal',
        icon: '🌽',
        stages: ['চারা পর্যায়', 'হাঁটু সমান উচ্চতা', 'মোচা ও পরাগায়ন', 'দানা পুষ্ট ও পরিপক্ব']
      },
      {
        id: 'crop-wheat',
        nameBn: 'গম',
        nameEn: 'Wheat',
        scientificName: 'Triticum aestivum',
        category: 'Cereal',
        icon: '🌾',
        stages: ['চারা পর্যায়', 'কুশি ও থোড় অবস্থা', 'শীষ বের হওয়া', 'দানা পাকা']
      },
      {
        id: 'crop-rice',
        nameBn: 'ধান',
        nameEn: 'Rice (Paddy)',
        scientificName: 'Oryza sativa',
        category: 'Cereal',
        icon: '🌾',
        stages: ['চারা অবস্থা (Seedling)', 'কুশি অবস্থা (Tillering)', 'কাইচ থোড় / ফুল ফোটা (Panicle / Flowering)', 'দানা গঠন ও পাকা (Grain filling / Maturity)']
      },
      {
        id: 'crop-tomato',
        nameBn: 'টমেটো',
        nameEn: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        category: 'Vegetable',
        icon: '🍅',
        stages: ['চারা রোপণ (Transplanting)', 'শাখা বিস্তার (Vegetative)', 'ফুল ধরা (Flowering)', 'ফল ধরা ও পাকা (Fruit development / Ripening)']
      },
      {
        id: 'crop-potato',
        nameBn: 'আলু',
        nameEn: 'Potato',
        scientificName: 'Solanum tuberosum',
        category: 'Vegetable',
        icon: '🥔',
        stages: ['অঙ্কুরোদগম (Sprouting)', 'উদ্ভিজ্জ বৃদ্ধি (Vegetative)', 'কন্দ গঠন (Tuber initiation)', 'কন্দ বৃদ্ধি ও পরিপক্বতা (Tuber bulking / Maturity)']
      },
      {
        id: 'crop-eggplant',
        nameBn: 'বেগুন',
        nameEn: 'Eggplant / Brinjal',
        scientificName: 'Solanum melongena',
        category: 'Vegetable',
        icon: '🍆',
        stages: ['চারা অবস্থা (Seedling)', 'ফুল ফোটা (Flowering)', 'ফল তোলা (Harvesting)']
      },
      {
        id: 'crop-chili',
        nameBn: 'মরিচ',
        nameEn: 'Chili Pepper',
        scientificName: 'Capsicum annuum',
        category: 'Vegetable',
        icon: '🌶️',
        stages: ['প্রাথমিক বৃদ্ধি (Early vegetative)', 'ফুল ও কুঁড়ি (Budding / Flowering)', 'ফল পরিপক্বতা (Fruiting)']
      },
      {
        id: 'crop-cucumber',
        nameBn: 'শসা ও খিরা',
        nameEn: 'Cucumber',
        scientificName: 'Cucumis sativus',
        category: 'Vegetable',
        icon: '🥒',
        stages: ['লতানো বৃদ্ধি (Vine growth)', 'ফুল ফোটা (Flowering)', 'ফল ধরা (Fruiting)']
      },
      {
        id: 'crop-ash-gourd',
        nameBn: 'চাল কুমড়া',
        nameEn: 'Ash Gourd / Wax Gourd',
        scientificName: 'Benincasa hispida',
        category: 'Vegetable',
        icon: '🍈',
        stages: ['মাদায় চারা বৃদ্ধি (Vegetative)', 'মাচায় লতা বিস্তার (Vine growth)', 'ফুল ও জালি ধরা (Flowering)', 'ফল বৃদ্ধি ও পরিপক্বতা (Fruiting)']
      },
      {
        id: 'crop-bottle-gourd',
        nameBn: 'লাউ / কদু',
        nameEn: 'Bottle Gourd',
        scientificName: 'Lagenaria siceraria',
        category: 'Vegetable',
        icon: '🫑',
        stages: ['চারা অবস্থা', 'মাচায় লতানো বৃদ্ধি', 'ফুল ও কুঁড়ি', 'ফল সংগ্রহ']
      },
      {
        id: 'crop-pumpkin',
        nameBn: 'মিষ্টি কুমড়া',
        nameEn: 'Sweet Gourd / Pumpkin',
        scientificName: 'Cucurbita moschata',
        category: 'Vegetable',
        icon: '🎃',
        stages: ['লতা বিস্তার', 'হলুদ ফুল ফোটা', 'ফল ধরা', 'পাকা কুমড়া']
      },
      {
        id: 'crop-mango',
        nameBn: 'আম',
        nameEn: 'Mango',
        scientificName: 'Mangifera indica',
        category: 'Fruit',
        icon: '🥭',
        stages: ['মুকুল আসা (Blossom)', 'মটর দানা অবস্থা (Pea stage)', 'মার্বেল আকার (Marble stage)', 'পরিপক্বতা (Maturity)']
      },
      {
        id: 'crop-banana',
        nameBn: 'কলা',
        nameEn: 'Banana',
        scientificName: 'Musa acuminata',
        category: 'Fruit',
        icon: '🍌',
        stages: ['গাছের বৃদ্ধি (Vegetative)', 'মোচা বের হওয়া (Inflorescence)', 'কাঁদি পরিপক্বতা (Bunch maturation)']
      },
      {
        id: 'crop-betel-leaf',
        nameBn: 'পান (বাঁশখালী মিষ্টি পান)',
        nameEn: 'Betel Leaf',
        scientificName: 'Piper betle',
        category: 'Cash Crop',
        icon: '🍃',
        stages: ['লতার চারা রোপণ ও বরজ তৈরি', 'লতানো ও শাখা বিস্তার', 'পাতা চয়ন ও পাতা তোলার বয়স', 'শীতকালীন পরিচর্যা']
      },
      {
        id: 'crop-tea',
        nameBn: 'চা (বেলগাঁও চা বাগান)',
        nameEn: 'Tea',
        scientificName: 'Camellia sinensis',
        category: 'Cash Crop',
        icon: '🍵',
        stages: ['চারা রোপণ', 'গাছের ছাঁটাই ও কুঁড়ি ফুটন', 'দুটি পাতা একটি কুঁড়ি চয়ন', 'শীতকালীন প্রুনিং']
      },
      {
        id: 'crop-watermelon',
        nameBn: 'তরমুজ (উপকূলীয় চরের তরমুজ)',
        nameEn: 'Watermelon',
        scientificName: 'Citrullus lanatus',
        category: 'Fruit',
        icon: '🍉',
        stages: ['মাদায় চারা গজানো', 'লতানো শাখা বিস্তার', 'ফুল ও জালি ধরা', 'ফল বৃদ্ধি ও পরিপক্বতা']
      },
      {
        id: 'crop-betel-nut',
        nameBn: 'সুপারি',
        nameEn: 'Betel Nut / Areca Nut',
        scientificName: 'Areca catechu',
        category: 'Cash Crop',
        icon: '🥥',
        stages: ['চারা রোপণ ও প্রাথমিক বৃদ্ধি', 'গাছ পরিপক্ব ও মোচা বের হওয়া', 'সুপারির ছড়া ও কাঁচা ফল', 'সুপারি পাকা ও সংগ্রহ']
      },
      {
        id: 'crop-mustard',
        nameBn: 'সরিষা',
        nameEn: 'Mustard',
        scientificName: 'Brassica campestris / napus',
        category: 'Oilseed',
        icon: '🌼',
        stages: ['চারা গজানো (Vegetative)', 'হলুদ ফুল ফোটা (Flowering)', 'শুঁটি গঠন (Siliqua formation)', 'বীজ পাকা ও কাটা (Maturity)']
      },
      {
        id: 'crop-guava',
        nameBn: 'পেয়ারা (কাঞ্চননগর ও পাহাড়ি পেয়ারা)',
        nameEn: 'Guava',
        scientificName: 'Psidium guajava',
        category: 'Fruit',
        icon: '🍐',
        stages: ['নতুন কুঁড়ি ও পাতা গজানো', 'ফুল ধরা (Blossoming)', 'মার্বেল আকার ও ব্যাগিং', 'পরিপক্ব ফল সংগ্রহ']
      },
      {
        id: 'crop-bitter-gourd',
        nameBn: 'করলা ও উচ্ছে',
        nameEn: 'Bitter Gourd',
        scientificName: 'Momordica charantia',
        category: 'Vegetable',
        icon: '🥒',
        stages: ['মাচায় লতানো বৃদ্ধি', 'হলুদ ফুল ফোটা', 'ফল ধরা ও বৃদ্ধি', 'সবজি সংগ্রহ']
      },
      {
        id: 'crop-sweet-potato',
        nameBn: 'মিষ্টি আলু',
        nameEn: 'Sweet Potato',
        scientificName: 'Ipomoea batatas',
        category: 'Vegetable',
        icon: '🍠',
        stages: ['লতা রোপণ', 'মাটিতে লতা বিস্তার', 'কন্দ/আলু বৃদ্ধি', 'আলু উত্তোলন']
      }
    ];

    // 8. Treatment Categories (Brand-Neutral)
    this.treatmentCategories = [
      {
        id: 'cat-fungicide',
        nameBn: 'ছত্রাকনাশক (Fungicide)',
        nameEn: 'Fungicide',
        descriptionBn: 'ছত্রাকজনিত রোগের সংক্রমণ প্রতিহত বা প্রতিকারের জন্য ব্যবহৃত অনুমোদিত উপাদান।'
      },
      {
        id: 'cat-bactericide',
        nameBn: 'ব্যাকটেরিয়ানাশক (Bactericide)',
        nameEn: 'Bactericide',
        descriptionBn: 'ব্যাকটেরিয়াজনিত সংক্রমণ বা দাগ দমনে অনুমোদিত প্রতিষেধক।'
      },
      {
        id: 'cat-insecticide',
        nameBn: 'কীটনাশক (Insecticide)',
        nameEn: 'Insecticide',
        descriptionBn: 'ক্ষতিকারক পোকা দমনে ব্যবহৃত অনুমোদিত বায়ো বা রাসায়নিক উপাদান।'
      },
      {
        id: 'cat-micronutrient',
        nameBn: 'অণুখাদ্য ও পুষ্টি উপাদান (Micronutrient / Fertilizer)',
        nameEn: 'Micronutrient / Fertilizer',
        descriptionBn: 'গাছের পুষ্টির ঘাটতি পূরণে জিংক, বোরন, নাইট্রোজেন বা পটাশিয়াম প্রয়োগ।'
      },
      {
        id: 'cat-biocontrol',
        nameBn: 'জৈব ও বায়ো-নিয়ন্ত্রণ (Biological Control)',
        nameEn: 'Biological Control',
        descriptionBn: 'ট্রাইকোডার্মা ও উপকারী অণুজীব ভিত্তিক পরিবেশবান্ধব দমন পদ্ধতি।'
      }
    ];

    // 9. Active Ingredients (Brand-Neutral - No commercial brand endorsements)
    this.activeIngredients = [
      {
        id: 'ai-mancozeb',
        categoryId: 'cat-fungicide',
        nameBn: 'ম্যানকোজেব (Mancozeb)',
        nameEn: 'Mancozeb',
        commonFormulation: '৭৫% ডব্লিউপি (75% WP Wettable Powder)',
        targetPestsBn: ['আলু ও টমেটোর লেট ব্লাইট / নাভি ধসা', 'মরিচের ফল পচা / অ্যানথ্রাকনোজ'],
        brandNeutralNoteBn: 'বাজারে বিভিন্ন বাণিজ্যিক নামে পাওয়া যায়। কেনার সময় মোড়কের গায়ে সক্রিয় উপাদান "Mancozeb 75% WP" দেখে নিন। নির্দিষ্ট কোনো ব্র্যান্ডের প্রয়োজন নেই।',
        source: 'DAE & BARI Pesticide Manual'
      },
      {
        id: 'ai-copper-oxy',
        categoryId: 'cat-bactericide',
        nameBn: 'কপার অক্সিক্লোরাইড (Copper Oxychloride)',
        nameEn: 'Copper Oxychloride',
        commonFormulation: '৫০% ডব্লিউপি (50% WP)',
        targetPestsBn: ['ব্যাকটেরিয়াল লিফ ব্লাইট', 'টমেটোর ব্যাকটেরিয়াল দাগ', 'ডাইব্যাক'],
        brandNeutralNoteBn: 'অনুমোদিত সক্রিয় উপাদান "Copper Oxychloride 50 WP"। বাণিজ্যিক নাম ভিন্ন হতে পারে, সক্রিয় উপাদান ও উৎপাদনের তারিখ দেখে কিনুন।',
        source: 'DAE Crop Protection Guidelines'
      },
      {
        id: 'ai-azoxy-difen',
        categoryId: 'cat-fungicide',
        nameBn: 'অ্যাজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল (Azoxystrobin + Difenoconazole)',
        nameEn: 'Azoxystrobin + Difenoconazole',
        commonFormulation: '৩২৫ এসসি (200 + 125 SC)',
        targetPestsBn: ['ধানের ব্লাস্ট ও খোলপোড়া রোগ', 'টমেটোর আর্লি ব্লাইট'],
        brandNeutralNoteBn: 'সমন্বিত দ্বৈত ক্রিয়াবিশিষ্ট ছত্রাকনাশক উপাদান। যেকোনো অনুমোদিত রেজিস্টার্ড কোম্পানির পণ্য ব্যবহারযোগ্য।',
        source: 'BRRI Rice Production Manual'
      },
      {
        id: 'ai-trichoderma',
        categoryId: 'cat-biocontrol',
        nameBn: 'ট্রাইকোডার্মা বায়ো-ফাংগিসাইড (Trichoderma viride / harzianum)',
        nameEn: 'Trichoderma viride',
        commonFormulation: 'জৈব পাউডার বা সাসপেনশন (1x10^8 CFU/g)',
        targetPestsBn: ['মাটিবাহিত ঢলে পড়া রোগ', 'গোড়া পচা', 'শিকড় পচা'],
        brandNeutralNoteBn: 'পরিবেশবান্ধব ও সম্পূর্ণ নিরাপদ জৈব ছত্রাকনাশক। রাসায়নিক বিষের ব্যবহার এড়াতে অত্যন্ত কার্যকর।',
        source: 'BARI Organic Management'
      },
      {
        id: 'ai-zinc-sulphate',
        categoryId: 'cat-micronutrient',
        nameBn: 'জিংক সালফেট (হিপ্টাহাইড্রেট ২১% / মনো ২৫%)',
        nameEn: 'Zinc Sulphate',
        commonFormulation: 'চিলেটেড জিংক বা জিংক সালফেট',
        targetPestsBn: ['ধানের খায়রা রোগ', 'জিংক ঘাটতিজনিত পাতার বিবর্ণতা'],
        brandNeutralNoteBn: 'রাসায়নিক কীটনাশক নয়, এটি মাটির খাদ্য উপাদান। ইউরিয়া বা পানির সাথে মিশিয়ে অনুমোদিত নিয়মে প্রয়োগ করা হয়।',
        source: 'BRRI Soil Science Division'
      },
      {
        id: 'ai-carbendazim',
        categoryId: 'cat-fungicide',
        nameBn: 'কার্বেনডাজিম (Carbendazim 50% WP)',
        nameEn: 'Carbendazim',
        commonFormulation: '৫০% ডব্লিউপি (50% WP)',
        targetPestsBn: ['পানের পাতা ও ডাল পচা', 'অ্যানথ্রাকনোজ', 'সুপারির ফল পচা'],
        brandNeutralNoteBn: 'বাজারে বিভিন্ন বাণিজ্যিক নামে পাওয়া যায়। প্যাকেটের গায়ে সক্রিয় উপাদান "Carbendazim 50% WP" দেখে কিনুন। নির্দিষ্ট কোনো ব্র্যান্ডের প্রয়োজন নেই।',
        source: 'DAE Horticulture Wing & BARI'
      },
      {
        id: 'ai-chlorothalonil',
        categoryId: 'cat-fungicide',
        nameBn: 'ক্লোরোথ্যালোনিল (Chlorothalonil 75% WP)',
        nameEn: 'Chlorothalonil',
        commonFormulation: '৭৫% ডব্লিউপি (75% WP)',
        targetPestsBn: ['তরমুজের ডাউনি মিলডিউ', 'শসা ও করলার পাতাপোড়া'],
        brandNeutralNoteBn: 'অনুমোদিত সক্রিয় উপাদান Chlorothalonil 75% WP। প্রতিরক্ষামূলক ছত্রাকনাশক।',
        source: 'BARI Plant Pathology Division'
      },
      {
        id: 'ai-propargite',
        categoryId: 'cat-insecticide',
        nameBn: 'প্রোপারগাইট (Propargite 57% EC)',
        nameEn: 'Propargite',
        commonFormulation: '৫৭% ইসি (57% EC)',
        targetPestsBn: ['চায়ের লাল মাকড় (Red Spider Mite)', 'শাকসবজির লাল মাকড়'],
        brandNeutralNoteBn: 'অনুমোদিত মাকড়নাশক (Acaricide)। চা বোর্ডের অনুমোদিত সক্রিয় উপাদান।',
        source: 'বাংলাদেশ চা গবেষণা ইনস্টিটিউট (BTRI)'
      },
      {
        id: 'ai-imidacloprid',
        categoryId: 'cat-insecticide',
        nameBn: 'ইমিডাক্লোপ্রিড (Imidacloprid 20% SL)',
        nameEn: 'Imidacloprid',
        commonFormulation: '২০ এসএল (20% SL)',
        targetPestsBn: ['সরিষার জাব পোকা', 'বেগুনের সাদামাছি ও জাসিড'],
        brandNeutralNoteBn: 'রসচোষক পোকার বিরুদ্ধে কার্যকরী অন্তর্বাহী কীটনাশক। মাত্রাতিরিক্ত ব্যবহার করবেন না।',
        source: 'DAE IPM Guidelines'
      },
      {
        id: 'ai-spinosad',
        categoryId: 'cat-insecticide',
        nameBn: 'স্পিনোস্যাড (Spinosad 45% SC)',
        nameEn: 'Spinosad',
        commonFormulation: '৪৫% এসসি (45% SC)',
        targetPestsBn: ['চাল কুমড়া ও লাউয়ের পাতাকাটা বিটল', 'এপিলাকনা বিটল', 'শুঁয়োপোকা ও ফল ছিদ্রকারী পোকা'],
        brandNeutralNoteBn: 'প্রাকৃতিক ব্যাকটেরিয়াজনিত পরিবেশবান্ধব জৈব বালাইনাশক। প্যাকেটের গায়ে Spinosad 45% SC দেখে কিনুন।',
        source: 'BARI উদ্যানতত্ত্ব ও কীটতত্ত্ব বিভাগ'
      }
    ];

    // 10. Dose Rules (DAE, BARI, BRRI Verified Rules)
    this.doseRules = [
      {
        id: 'dose-rice-blb',
        cropId: 'crop-rice',
        diseaseId: 'dis-rice-blb',
        activeIngredientId: 'ai-copper-oxy',
        dosePerLiterBn: '২ গ্রাম প্রতি লিটার পানি',
        dosePerDecimelBn: '১০ গ্রাম (প্রতি শতক জমিতে ৫ লিটার পানির সাথে)',
        waterVolumeBn: 'প্রতি একরে ১৫০-২০০ লিটার পানি স্প্রে মেশিনের সাহায্যে কুয়াশার মতো ছড়িয়ে দিতে হবে।',
        applicationMethodBn: 'গাছের পাতা ও গোড়ার অংশ পুরোপুরি ভিজিয়ে শেষ বিকেলে স্প্রে করুন।',
        timingBn: 'রোগের লক্ষণ দেখামাত্র ৭-১০ দিন পর পর ২ বার স্প্রে করতে পারেন। বৃষ্টির সম্ভাবনা থাকলে স্থগিত রাখুন।',
        maxApplicationsPerSeason: 2,
        preHarvestIntervalDays: 14,
        safetyEquipmentBn: ['মুখের মাস্ক', 'হাতের গ্লাভস', 'চোখের চশমা'],
        verifiedBy: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) ও কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-tomato-lateblight',
        cropId: 'crop-tomato',
        diseaseId: 'dis-tomato-lateblight',
        activeIngredientId: 'ai-mancozeb',
        dosePerLiterBn: '২.৫ গ্রাম প্রতি লিটার পানি',
        dosePerDecimelBn: '১২ গ্রাম প্রতি শতকে (৫ লিটার পানিতে মিশ্রিত)',
        waterVolumeBn: 'প্রতি একরে ২০০ লিটার পানি স্প্রে করতে হবে।',
        applicationMethodBn: 'পাতার উভয় পিঠ (উপরের ও নিচের পিঠ) সম্পূর্ণ ভিজিয়ে স্প্রে করুন।',
        timingBn: 'কুয়াশাচ্ছন্ন আবহাওয়া বা গুঁড়ি গুঁড়ি বৃষ্টির আগে প্রতিরক্ষামূলকভাবে সকালে স্প্রে করুন।',
        maxApplicationsPerSeason: 3,
        preHarvestIntervalDays: 7,
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস', 'পর্যাপ্ত গায়ের জামাকাপড়'],
        verifiedBy: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-rice-blast',
        cropId: 'crop-rice',
        diseaseId: 'dis-rice-blast',
        activeIngredientId: 'ai-azoxy-difen',
        dosePerLiterBn: '১ মিলি প্রতি লিটার পানি',
        dosePerDecimelBn: '৫ মিলি প্রতি শতকে',
        waterVolumeBn: 'প্রতি একরে ১৫০-২০০ লিটার পানি।',
        applicationMethodBn: 'থোড় অবস্থা বা শিষ বের হওয়ার মুখে বাতাসে যেন বিষ উড়ে না যায় সেভাবে স্প্রে করুন।',
        timingBn: 'সকালে শিশির শুকানোর পর বা শেষ বিকেলে। বাতাসের বিপরীতে স্প্রে করবেন না।',
        maxApplicationsPerSeason: 2,
        preHarvestIntervalDays: 21,
        safetyEquipmentBn: ['সম্পূর্ণ শরীর ঢাকা পোশাক', 'মাস্ক', 'হাত সাবান দিয়ে ধোয়া'],
        verifiedBy: 'BRRI উদ্ভিদ রোগতত্ত্ব বিভাগ',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-betel-stem-rot',
        cropId: 'crop-betel-leaf',
        diseaseId: 'dis-betel-stem-rot',
        activeIngredientId: 'ai-carbendazim',
        dosePerLiterBn: '১.৫ গ্রাম প্রতি লিটার পানি',
        dosePerDecimelBn: '৮ গ্রাম প্রতি শতকে বরজের মাটিতে ও লতায়',
        waterVolumeBn: 'বরজের লতা ও গোড়ায় স্প্রে করতে হবে।',
        applicationMethodBn: 'আক্রান্ত লতা কেটে ফেলে বরজের ভেজা মাটির গোড়ায় দ্রবণ স্প্রে করুন।',
        timingBn: 'বর্ষার শুরুতে বা রোগের লক্ষণ দেখামাত্র ৭-১০ দিন পর পর ২ বার। পাতা তোলার ১৫ দিন পূর্বে প্রয়োগ বন্ধ রাখুন।',
        maxApplicationsPerSeason: 2,
        preHarvestIntervalDays: 15,
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস', 'সাবান দিয়ে হাত ধোয়া'],
        verifiedBy: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) মসলা গবেষণা কেন্দ্র',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-tea-red-spider',
        cropId: 'crop-tea',
        diseaseId: 'dis-tea-red-spider',
        activeIngredientId: 'ai-propargite',
        dosePerLiterBn: '২ মিলি প্রতি লিটার পানি',
        dosePerDecimelBn: '১০ মিলি প্রতি শতকে',
        waterVolumeBn: 'চা গাছের পাতার নিচে ভালোমতো ভেজাতে হবে।',
        applicationMethodBn: 'পাতার নিচের পিঠে মাকড় থাকে, তাই নিচের পিঠ ভালো করে ভিজিয়ে স্প্রে করুন।',
        timingBn: 'খরা মৌসুমে বা বৃষ্টিহীন শুষ্ক দিনে বিকেলে স্প্রে করুন।',
        maxApplicationsPerSeason: 2,
        preHarvestIntervalDays: 10,
        safetyEquipmentBn: ['মাস্ক', 'পোশাক', 'গ্লাভস'],
        verifiedBy: 'বাংলাদেশ চা গবেষণা ইনস্টিটিউট (BTRI)',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-watermelon-downy',
        cropId: 'crop-watermelon',
        diseaseId: 'dis-watermelon-downy',
        activeIngredientId: 'ai-chlorothalonil',
        dosePerLiterBn: '২ গ্রাম প্রতি লিটার পানি',
        dosePerDecimelBn: '১০ গ্রাম প্রতি শতকে',
        waterVolumeBn: 'তরমুজের লতা ও পাতার দুই পিঠে স্প্রে করতে হবে।',
        applicationMethodBn: 'সকালে শিশির শুকানোর পর সমানভাবে স্প্রে করুন।',
        timingBn: 'কুয়াশাচ্ছন্ন আবহাওয়ায় রোগ ছড়িয়ে পড়ার আগেই প্রতিরোধমূলক স্প্রে দিন।',
        maxApplicationsPerSeason: 3,
        preHarvestIntervalDays: 10,
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস'],
        verifiedBy: 'BARI উদ্যানতত্ত্ব গবেষণা কেন্দ্র',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-mango-anthracnose',
        cropId: 'crop-mango',
        diseaseId: 'dis-mango-anthracnose',
        activeIngredientId: 'ai-carbendazim',
        dosePerLiterBn: '১ গ্রাম প্রতি লিটার পানি (অথবা কপার অক্সিক্লোরাইড ২ গ্রাম/লিটার)',
        dosePerDecimelBn: '৫ গ্রাম প্রতি শতক গাছে (বা প্রতি পূর্ণবয়স্ক গাছে ১৫-২০ লিটার স্প্রে দ্রবণ)',
        waterVolumeBn: 'গাছের সমস্ত পাতা, কচি ডাল ও মুকুল ভালোভাবে ভিজিয়ে স্প্রে করতে হবে।',
        applicationMethodBn: 'গাছের পাতা ও ডালের উপর-নিচ ভালোভাবে ভিজিয়ে শেষ বিকেলে স্প্রে করুন।',
        timingBn: 'মুকুল আসার পূর্বে একবার এবং মার্বেল আকার হলে আরেকবার স্প্রে করুন। বৃষ্টির সম্ভাবনা থাকলে স্প্রে স্থগিত রাখুন।',
        maxApplicationsPerSeason: 3,
        preHarvestIntervalDays: 14,
        safetyEquipmentBn: ['মুখের মাস্ক', 'হাতের গ্লাভস', 'চোখের চশমা'],
        verifiedBy: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) উদ্যানতত্ত্ব গবেষণা কেন্দ্র ও DAE',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-ash-gourd-epilachna',
        cropId: 'crop-ash-gourd',
        diseaseId: 'dis-ash-gourd-epilachna',
        activeIngredientId: 'ai-spinosad',
        dosePerLiterBn: '০.৪ মিলি প্রতি লিটার পানি (অথবা সাইপারমেথ্রিন ১ মিলি/লিটার)',
        dosePerDecimelBn: '২ মিলি প্রতি শতকে ৫ লিটার পানিতে',
        waterVolumeBn: 'লতানো গাছের পাতার উভয় পিঠ ভিজিয়ে স্প্রে করতে হবে।',
        applicationMethodBn: 'পাতার নিচের পিঠ ও কচি অংশে সমভাবে স্প্রে করুন। মৌমাছি রক্ষায় শেষ বিকেলে স্প্রে করুন।',
        timingBn: 'পোকার কীড়া বা পাতায় অসংখ্য ছিদ্র দেখা দিলে ৭ দিন পর পর ২ বার স্প্রে করুন। ফুল ফোটার সময় সকালবেলা স্প্রে কঠোরভাবে নিষিদ্ধ।',
        maxApplicationsPerSeason: 2,
        preHarvestIntervalDays: 7,
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস', 'ফুলহাতা পোশাক'],
        verifiedBy: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) সবজি ও কীটতত্ত্ব বিভাগ',
        approvalStatus: 'APPROVED'
      },
      {
        id: 'dose-ash-gourd-anthracnose',
        cropId: 'crop-ash-gourd',
        diseaseId: 'dis-ash-gourd-anthracnose',
        activeIngredientId: 'ai-mancozeb',
        dosePerLiterBn: '২.৫ গ্রাম প্রতি লিটার পানি (অথবা কপার অক্সিক্লোরাইড ২ গ্রাম/লিটার)',
        dosePerDecimelBn: '১২ গ্রাম প্রতি শতকে ৫ লিটার পানিতে',
        waterVolumeBn: 'পাতার উভয় পিঠ ভিজিয়ে সমভাবে স্প্রে করুন।',
        applicationMethodBn: 'পাতায় দাগ দেখা দিলে বা বৃষ্টির পর রোদ কমলে শেষ বিকেলে স্প্রে করুন।',
        timingBn: '১০ দিন ব্যবধানে ২ বার স্প্রে করতে পারেন।',
        maxApplicationsPerSeason: 3,
        preHarvestIntervalDays: 7,
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস'],
        verifiedBy: 'BARI উদ্ভিদ রোগতত্ত্ব বিভাগ',
        approvalStatus: 'APPROVED'
      }
    ];

    // 11. Diseases Master Data
    this.diseases = [
      {
        id: 'dis-rice-blb',
        cropId: 'crop-rice',
        nameBn: 'ব্যাকটেরিয়াল লিফ ব্লাইট (পাতাপোড়া রোগ)',
        nameEn: 'Bacterial Leaf Blight (BLB)',
        scientificName: 'Xanthomonas oryzae pv. oryzae',
        type: 'Bacterial',
        severityDefault: 'HIGH',
        symptomsBn: [
          'পাতার অগ্রভাগ বা কিনারায় পানিতে ভেজা লম্বা দাগ সৃষ্টি হয়',
          'দাগগুলো ধীরে ধীরে হলুদ এবং পরে ধোঁয়াটে ধূসর বা সাদা হয়ে শুকিয়ে যায়',
          'পাতার কিনারা ঢেউ খেলানোভাবে শুকাতে থাকে',
          'ভোরে পাতায় হালকা হলুদ রঙের ব্যাকটেরিয়াল পুঁজ বা আঠালো ফোঁটা দেখা যেতে পারে'
        ],
        symptomsEn: [
          'Water-soaked lesions along leaf margins',
          'Lesions turn yellow to straw-colored with wavy margins',
          'Bacterial ooze droplets may appear in early morning'
        ],
        possibleCausesBn: [
          'টানা বৃষ্টি বা ঝড়ো বাতাসের পর পাতার ক্ষত',
          'বাতাসের অতিরিক্ত আর্দ্রতা (৮০% এর বেশি) ও ২৭-৩০ ডিগ্রি উষ্ণ তাপমাত্রা',
          'জমিতে মাত্রাতিরিক্ত ইউরিয়া (নাইট্রোজেন) সার প্রয়োগ',
          'জমিতে অতিরিক্ত বা বদ্ধ পানি জমে থাকা'
        ],
        nonChemicalManagementBn: [
          'জমিতে ইউরিয়া সারের উপরিপ্রয়োগ তাৎক্ষণিকভাবে বন্ধ রাখুন',
          'জমির অতিরিক্ত পানি নিষ্কাশন করে ২-৩ দিন শুকনা রাখুন',
          'শতক প্রতি ৬০ গ্রাম পটাশ সার উপরিপ্রয়োগ করুন যা গাছের রোগ প্রতিরোধ ক্ষমতা বাড়ায়',
          'আক্রান্ত জমির আইল পরিষ্কার ও আগাছামুক্ত রাখুন',
          'প্রতি লিটার পানিতে ২০ গ্রাম কাঁচা গোবর ও ৫ গ্রাম চুন মিশিয়ে ছেঁকে স্প্রে করা প্রাচীন ফলপ্রসূ উপায়'
        ],
        treatmentCategoryId: 'cat-bactericide',
        activeIngredientId: 'ai-copper-oxy',
        doseRuleId: 'dose-rice-blb',
        safetyWarningBn: 'ঝড়ো বাতাস বা বৃষ্টির পূর্বাভাস থাকলে স্প্রে করবেন না। গর্ভবতী নারী বা শিশুদের স্প্রে কাজে নিয়োজিত করবেন না।',
        source: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) প্রকাশনা নং ১৮৪'
      },
      {
        id: 'dis-tomato-lateblight',
        cropId: 'crop-tomato',
        nameBn: 'নাভি ধসা / লেট ব্লাইট রোগ',
        nameEn: 'Late Blight of Tomato',
        scientificName: 'Phytophthora infestans',
        type: 'Fungal',
        severityDefault: 'CRITICAL',
        symptomsBn: [
          'পাতায় পানিতে ভেজা অনিয়মিত গাঢ় বাদামি বা কালো দাগ সৃষ্টি হয়',
          'পাতার নিচের পিঠে ভেজা আবহাওয়ায় সাদা তুলার মতো ছত্রাকের স্তর দেখা যায়',
          'কান্ডে কালো পচা দাগ ধরে এবং গাছ দ্রুত ঢলে পড়ে',
          'কাঁচা বা পাকা টমেটোতে শক্ত বাদামি দাগ হয় এবং দ্রুত পচে যায়'
        ],
        symptomsEn: [
          'Water-soaked dark lesions on leaves and stems',
          'White fungal growth on lower surface during humid weather',
          'Rapid blighting of foliage and brown rot on fruit'
        ],
        possibleCausesBn: [
          'কুয়াশাচ্ছন্ন আকাশ ও টানা ভেজা আর্দ্র আবহাওয়া (আর্দ্রতা ৯০% এর বেশি)',
          'তাপমাত্রা ১৫-২২ ডিগ্রি সেলসিয়াসের মধ্যে থাকা',
          'গাছে দীর্ঘক্ষণ শিশির বা পানির ফোঁটা জমে থাকা',
          'ঘন করে চারা রোপণ ও অপর্যাপ্ত বাতাস চলাচল'
        ],
        nonChemicalManagementBn: [
          'আক্রান্ত পাতা বা ডাল সাবধানে কেটে মাটির নিচে পুঁতে ফেলুন',
          'গাছের গোড়ায় অতিরিক্ত পানি নিষ্কাশনের ব্যবস্থা করুন',
          'মাটির উপরিভাগে খড় বা মালচিং দিয়ে মাটির আর্দ্রতা নিয়ন্ত্রণ করুন',
          'গাছ যাতে আলো-বাতাস পায় সেভাবে বাউনির ব্যবস্থা করুন',
          'টমেটো গাছের উপর থেকে পানি ছিটানো বন্ধ করে গাছের গোড়ায় সেচ দিন'
        ],
        treatmentCategoryId: 'cat-fungicide',
        activeIngredientId: 'ai-mancozeb',
        doseRuleId: 'dose-tomato-lateblight',
        safetyWarningBn: 'লেট ব্লাইট অত্যন্ত বিধ্বংসী রোগ। নিশ্চিত না হয়ে যথেচ্ছ ওষুধ না দিয়ে কৃষি অফিসে রিপোর্টটি দেখিয়ে পরামর্শ নিন। ফসল তোলার ৭ দিনের মধ্যে বিষ প্রয়োগ নিষিদ্ধ।',
        source: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) রোগতত্ত্ব বিভাগ'
      },
      {
        id: 'dis-rice-blast',
        cropId: 'crop-rice',
        nameBn: 'ধানের ব্লাস্ট রোগ (পাতা ও নেক ব্লাস্ট)',
        nameEn: 'Rice Blast',
        scientificName: 'Magnaporthe oryzae',
        type: 'Fungal',
        severityDefault: 'HIGH',
        symptomsBn: [
          'পাতায় চোখের বা মাকু আকৃতির দাগ, মাঝখানে ধূসর ও চারদিকে বাদামি কিনারা',
          'শীষের গোড়া কালো হয়ে পচে যায় (নেক ব্লাস্ট)',
          'ধানের শীষ ভেঙে পড়ে ও ধান চিটা হয়ে যায়'
        ],
        symptomsEn: [
          'Spindle-shaped lesions with grayish center and brown margin',
          'Black necrotic lesions at panicle base (Neck blast)',
          'Complete grain sterility / blank panicles'
        ],
        possibleCausesBn: [
          'দিনের বেলা উষ্ণ ও রাতের বেলা ঠান্ডা ভেজা আবহাওয়া',
          'ঘন কুয়াশা ও দীর্ঘক্ষণ শিশির জমে থাকা',
          'অতিরিক্ত ইউরিয়া প্রয়োগ ও পটাশের ঘাটতি'
        ],
        nonChemicalManagementBn: [
          'ইউরিয়ার উপরিপ্রয়োগ স্থগিত রাখুন',
          'জমিতে সবসময় ২-৩ ইঞ্চি পানি ধরে রাখুন (পানি শূন্য জমিতে ব্লাস্ট বেশি বাড়ে)',
          'পরবর্তী মৌসুমের জন্য ট্রাইকোডার্মা দিয়ে বীজ শোধন করুন'
        ],
        treatmentCategoryId: 'cat-fungicide',
        activeIngredientId: 'ai-azoxy-difen',
        doseRuleId: 'dose-rice-blast',
        safetyWarningBn: 'বাতাসের বিপরীতে স্প্রে করবেন না। স্প্রে শেষে সাবান পানি দিয়ে ভালোভাবে গোসল করুন।',
        source: 'BRRI রোগতত্ত্ব নির্দেশিকা'
      },
      {
        id: 'dis-betel-stem-rot',
        cropId: 'crop-betel-leaf',
        nameBn: 'পানের পাতা ও ডাল পচা রোগ (Foot and Stem Rot)',
        nameEn: 'Foot and Stem Rot of Betelvine',
        scientificName: 'Phytophthora parasitica var. piperina',
        type: 'Fungal',
        severityDefault: 'HIGH',
        symptomsBn: [
          'লতার গোড়া বা মাটির সংলগ্ন অংশে ভেজা কালচে দাগ দেখা যায়',
          'আক্রান্ত লতা ধীরে ধীরে শুকিয়ে যায় এবং পাতা হলদে হয়ে ঝরে পড়ে',
          'বর্ষাকালে ও অতিরিক্ত আর্দ্রতায় রোগ দ্রুত পুরো বরজে ছড়িয়ে পড়ে',
          'লতার ভেতরের কাণ্ড লম্বালম্বি কাটলে কালচে ডোরাকাটা দাগ দেখা যায়'
        ],
        symptomsEn: [
          'Water soaked dark lesion at collar and stem',
          'Wilting and yellowing of betel vine',
          'Rapid spread in humid rainy season'
        ],
        possibleCausesBn: [
          'বরজে অতিরিক্ত আর্দ্রতা ও স্যাঁতসেঁতে পরিবেশ',
          'বরজের ভেতরের পানি নিষ্কাশনের অব্যবস্থা',
          'আক্রান্ত লতা থেকে চারা তৈরি'
        ],
        nonChemicalManagementBn: [
          'বরজের নালা দিয়ে জমে থাকা বৃষ্টির পানি দ্রুত বের করে দিন',
          'আক্রান্ত লতা গোড়াসহ তুলে আগুনে পুড়িয়ে ফেলুন',
          'বরজে পর্যাপ্ত আলো-বাতাস চলাচলের জন্য ছাদ কিছুটা হালকা করুন',
          'লতা লাগানোর পূর্বে জমি ট্রাইকোডার্মা সমৃদ্ধ জৈব সার দিয়ে শোধন করুন'
        ],
        treatmentCategoryId: 'cat-fungicide',
        activeIngredientId: 'ai-carbendazim',
        doseRuleId: 'dose-betel-stem-rot',
        safetyWarningBn: 'পান একটি সরাসরি খাবার পাতা। পাতা তোলার কমপক্ষে ১৫ দিন পূর্বে সব ধরনের স্প্রে বন্ধ রাখতে হবে। কোনো বিষাক্ত রাসায়নিক প্রয়োগ নিষেধ।',
        source: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) মসলা গবেষণা'
      },
      {
        id: 'dis-tea-red-spider',
        cropId: 'crop-tea',
        nameBn: 'চায়ের লাল মাকড় (Red Spider Mite of Tea)',
        nameEn: 'Red Spider Mite',
        scientificName: 'Oligonychus coffeae',
        type: 'Pest',
        severityDefault: 'MEDIUM',
        symptomsBn: [
          'চা পাতার উপরিভাগে ব্রোঞ্জ বা তামাটে লালচে রঙের দাগ পড়ে',
          'পাতা খসখসে হয়ে যায় এবং পাতার সতেজতা নষ্ট হয়ে শুকিয়ে যায়',
          'নতুন কচি পাতার বৃদ্ধি ব্যাহত হয় এবং কুঁড়ির ফলন হ্রাস পায়',
          'অনাবৃষ্টি বা শুষ্ক খরা মৌসুমে আক্রমণ ব্যাপক রূপ নেয়'
        ],
        symptomsEn: [
          'Bronzing or rusty discoloration on upper leaf surface',
          'Leaves become rough and leathery',
          'Stunted flushing and yield loss during dry spells'
        ],
        possibleCausesBn: [
          'টানা শুষ্ক খরা ও বৃষ্টিহীন আবহাওয়া',
          'চা বাগানে অপর্যাপ্ত ছায়াতরু',
          'ধুলোবালি ও অতিরিক্ত তাপমাত্রার প্রভাব'
        ],
        nonChemicalManagementBn: [
          'চা বাগানে প্রয়োজনীয় ছায়াতরু (Shade trees) সংরক্ষণ করুন',
          'খরা মৌসুমে প্রয়োজনে ওভারহেড স্প্রিংকলার বা পানি ছিটান',
          'মাকড় দমনে হালকা সাবান পানি বা নিম তেলের স্প্রে প্রাথমিকভাবে ব্যবহার করুন'
        ],
        treatmentCategoryId: 'cat-insecticide',
        activeIngredientId: 'ai-propargite',
        doseRuleId: 'dose-tea-red-spider',
        safetyWarningBn: 'চা পাতা তোলার ১০ দিনের মধ্যে কোনো রাসায়নিক স্প্রে করা যাবে না। চা বোর্ডের কীটনাশক নীতিমালা কঠোরভাবে মেনে চলুন।',
        source: 'বাংলাদেশ চা গবেষণা ইনস্টিটিউট (BTRI) শ্রীমঙ্গল ও চট্টগ্রাম'
      },
      {
        id: 'dis-watermelon-downy',
        cropId: 'crop-watermelon',
        nameBn: 'তরমুজের ডাউনি মিলডিউ (Downy Mildew)',
        nameEn: 'Downy Mildew of Watermelon',
        scientificName: 'Pseudoperonospora cubensis',
        type: 'Fungal',
        severityDefault: 'HIGH',
        symptomsBn: [
          'পাতার উপরিভাগে প্রথমে কোণাকৃতির হলুদ ছোপ ছোপ দাগ পড়ে',
          'পাতার নিচের পিঠে হালকা বেগুনি বা ধূসর রঙের ছত্রাক দেখা যায়',
          'দাগগুলো একত্র হয়ে পুরো পাতা পুড়ে যাওয়ার মতো শুকিয়ে বিবর্ণ হয়',
          'ফল মিষ্টি হতে পারে না এবং অপরিণত অবস্থায় ফেটে যায়'
        ],
        symptomsEn: [
          'Angular yellow spots on upper leaf surface',
          'Purplish-gray downy fungal growth on underside',
          'Leaves scorch and dry up completely'
        ],
        possibleCausesBn: [
          'উপকূলীয় কুয়াশা ও রাতের ঠান্ডা এবং দিনের উষ্ণ তাপমাত্রা',
          'গাছের পাতায় দীর্ঘক্ষণ শিশির বা পানির ফোঁটা জমে থাকা',
          'ঘন করে চারা রোপণ ও নিকাশহীন নিচু জমি'
        ],
        nonChemicalManagementBn: [
          'তরমুজের মাদায় মালচিং ব্যবহার করে মাটির আর্দ্রতা রক্ষা করুন',
          'আক্রান্ত পুরনো পাতা সাবধানে কেটে জমি থেকে দূরে মাটিতে পুঁতে ফেলুন',
          'লতায় উপর থেকে সেচ না দিয়ে সরাসরি গোড়ায় পানি দিন'
        ],
        treatmentCategoryId: 'cat-fungicide',
        activeIngredientId: 'ai-chlorothalonil',
        doseRuleId: 'dose-watermelon-downy',
        safetyWarningBn: 'মৌমাছি ও পরাগায়নকারী পতঙ্গের ক্ষতি এড়াতে সকালে যখন ফুল ফোটে তখন স্প্রে করবেন না। শেষ বিকেলে স্প্রে করুন।',
        source: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) সবজি শাখা'
      },
      {
        id: 'dis-mustard-aphid',
        cropId: 'crop-mustard',
        nameBn: 'সরিষার জাব পোকা (Mustard Aphid)',
        nameEn: 'Mustard Aphid',
        scientificName: 'Lipaphis erysimi',
        type: 'Pest',
        severityDefault: 'MEDIUM',
        symptomsBn: [
          'কচি ডগা, ফুল ও শুঁটিতে দলবদ্ধভাবে ক্ষুদ্র সবুজ বা ধূসর পোকা লেগে থাকে',
          'রস চুষে খাওয়ার ফলে ফুল শুকিয়ে যায় এবং শুঁটি তৈরি হতে পারে না',
          'পোকার নিঃসৃত মিষ্টি তরলে (Honey dew) সুটি মোল্ড নামক কালো ছত্রাক জন্মায়'
        ],
        symptomsEn: [
          'Colonies of small aphids sucking sap from shoots, flowers, and pods',
          'Curling of leaves and poor pod development',
          'Black sooty mold on honey dew secretion'
        ],
        possibleCausesBn: [
          'দেরিতে সরিষা বপন',
          'মেঘলা ও কুয়াশাচ্ছন্ন আবহাওয়া',
          'জমিতে মাত্রাতিরিক্ত ইউরিয়া প্রয়োগ'
        ],
        nonChemicalManagementBn: [
          'কার্তিক মাসের মধ্যে (অক্টোবর-নভেম্বর) আগাম সরিষা বপন করুন',
          'প্রাথমিক অবস্থায় সাবান পানি (প্রতি লিটারে ৫ গ্রাম) স্প্রে করুন',
          'জমিতে হলুদ রঙের আঠালো ফাঁদ (Yellow sticky trap) স্থাপন করুন'
        ],
        treatmentCategoryId: 'cat-insecticide',
        activeIngredientId: 'ai-imidacloprid',
        safetyWarningBn: 'সরিষা ক্ষেতে প্রচুর মৌমাছি মধু সংগ্রহ করে পরাগায়ন ঘটায়। মৌমাছির সুরক্ষায় ফুল ফোটার সময় কোনো অবস্থাতেই সকালের দিকে স্প্রে করবেন না।',
        source: 'DAE তৈলবীজ গবেষণা উইং'
      },
      {
        id: 'dis-mango-anthracnose',
        cropId: 'crop-mango',
        nameBn: 'আমের অ্যানথ্রাকনোজ বা পাতা ও ফল ঝলসানো রোগ',
        nameEn: 'Mango Anthracnose',
        scientificName: 'Colletotrichum gloeosporioides',
        type: 'Fungal',
        severityDefault: 'HIGH',
        symptomsBn: [
          'পাতায় প্রথমে ছোট ছোট গাঢ় বাদামি বা কালো রঙের গোল বা কোণাকৃতির দাগ পড়ে',
          'আক্রান্ত দাগগুলো একত্রিত হয়ে বড় ক্ষতের সৃষ্টি করে এবং পাতার মধ্যভাগ শুকিয়ে ফেটে যায়',
          'কচি ডগা ও মুকুলে কালো দাগ হয়ে ডাল আগা থেকে মরে যাওয়া (Die-back) দেখা যায়',
          'ফল বড় হলে ফলের গায়ে কালো বসে যাওয়া দাগ সৃষ্টি হয়'
        ],
        symptomsEn: [
          'Small circular to angular brownish-black spots on leaves',
          'Blight and shot-hole effect as center tears off',
          'Die-back on tender twigs and blackening of panicles',
          'Sunken dark lesions on fruits'
        ],
        possibleCausesBn: [
          'অতিরিক্ত আর্দ্রতা (৮০% এর বেশি) ও টানা মেঘলা বা কুয়াশাচ্ছন্ন আবহাওয়া',
          'গাছের ভেতরে আলো-বাতাস চলাচলের অভাব ও ঘন ডালপালা',
          'পূর্বে রোগাক্রান্ত শুকনো ডালপালা গাছে রয়ে যাওয়া'
        ],
        nonChemicalManagementBn: [
          'আক্রান্ত শুকনো ডালপালা ও রোগাক্রান্ত পাতা কেটে পুড়িয়ে ফেলুন',
          'ডাল কাটার পর কাটার অংশে বোর্দো পেস্ট বা কপার মিশ্রণ প্রলেপ দিন',
          'গাছের ভেতরে পর্যাপ্ত আলো-বাতাস প্রবেশের জন্য অপ্রয়োজনীয় ডাল ছেঁটে দিন (Pruning)',
          'গাছের গোড়ার ঝরা পাতা ও আবর্জনা পরিষ্কার রাখুন'
        ],
        treatmentCategoryId: 'cat-fungicide',
        activeIngredientId: 'ai-carbendazim',
        doseRuleId: 'dose-mango-anthracnose',
        safetyWarningBn: 'বাতাসের বিপরীতে স্প্রে করবেন না। স্প্রে করার সময় মাস্ক ও চশমা ব্যবহার করুন। ফল তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ রাখুন।',
        source: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) উদ্যানতত্ত্ব উইং'
      },
      {
        id: 'dis-ash-gourd-epilachna',
        cropId: 'crop-ash-gourd',
        nameBn: 'চাল কুমড়ার এপিলাকনা বিটল বা পাতাকাটা পোকা ও পাতায় ঝাঁঝরা/ছিদ্র রোগ',
        nameEn: 'Epilachna Beetle & Shot-hole Damage of Ash Gourd',
        scientificName: 'Epilachna vigintioctopunctata (Hadda Beetle)',
        type: 'Pest',
        severityDefault: 'HIGH',
        symptomsBn: [
          'পাতায় অসংখ্য ছোট ছোট গোলাকার ছিদ্র তৈরি হয় (Shot-hole / ঝাঁঝরা পাতা)',
          'পোকার গ্রাব ও পূর্ণাঙ্গ পোকা পাতার সবুজ অংশ কুরে কুরে খেয়ে জালিকাকার বা কঙ্কাল বানিয়ে ফেলে',
          'আক্রান্ত পাতা ধীরে ধীরে বিবর্ণ ও বাদামী হয়ে শুকিয়ে ঝরে পড়ে',
          'গাছের বৃদ্ধি মারাত্মকভাবে থমকে যায় এবং ফলন ব্যাহত হয়'
        ],
        symptomsEn: [
          'Numerous small punctured circular shot-holes across leaf surface',
          'Grubs and adult beetles scrape green chlorophyll leaving skeletonized network',
          'Severe defoliation and stunted vine growth'
        ],
        possibleCausesBn: [
          'কুমড়া জাতীয় ফসলের মাঠে অতিরিক্ত আর্দ্র ও উষ্ণ পরিবেশ',
          'পাতার উল্টো পিঠে হলুদ ডিমের গাদা ও কাঁটাযুক্ত কীড়ার উপস্থিতি',
          'আশপাশে আগাছা বা আক্রান্ত অবশিষ্টাংশ ধ্বংস না করা'
        ],
        nonChemicalManagementBn: [
          'পাতার নিচের পিঠ থেকে হলুদ ডিমের গাদা ও কাঁটাযুক্ত বিটল হাত দিয়ে ধরে ধ্বংস করুন।',
          'ছাইয়ের সাথে সামান্য কেরোসিন মিশিয়ে পাতার ওপর ছিটিয়ে দিন অথবা প্রতি লিটার পানিতে ৫ মিলি নিম তেল ও সামান্য ডিটারজেন্ট মিশিয়ে স্প্রে করুন।',
          'মাঠে হলুদ রঙের আঠালো ফাঁদ (Yellow sticky trap) স্থাপন করুন।'
        ],
        treatmentCategoryId: 'cat-insecticide',
        activeIngredientId: 'ai-spinosad',
        doseRuleId: 'dose-ash-gourd-epilachna',
        safetyWarningBn: 'কুমড়া জাতীয় ফসলে মৌমাছি পরাগায়নের জন্য অপরিহার্য। ফুল ফোটার সময় সকালবেলা কোনো অবস্থাতেই স্প্রে করবেন না। পরাগায়ন শেষে শেষ বিকেলে স্প্রে করুন।',
        source: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) সবজি ও বালাই ব্যবস্থাপনা বিভাগ'
      }
    ];

    // 12. Knowledge Items for Reviewer / Data Entry workflow
    this.knowledgeItems = [
      {
        id: 'k-1',
        titleBn: 'বোরো ধানে সমন্বিত বালাই ব্যবস্থাপনা ও ব্লাস্ট রোগ দমন নীতিমালা',
        cropId: 'crop-rice',
        diseaseId: 'dis-rice-blast',
        category: 'DISEASE_CONTROL',
        contentBn: 'ব্লাস্ট রোগ দমনে জমিতে পানির ঘাটতি হতে দেওয়া যাবে না। কুয়াশাচ্ছন্ন আবহাওয়ায় আগাম প্রতিরোধ ব্যবস্থা হিসেবে অনুমোদিত ছত্রাকনাশক সঠিক মাত্রায় প্রয়োগ করতে হবে। অতিরিক্ত ইউরিয়া ব্যবহার ব্লাস্টের ঝুঁকি বহুগুণ বৃদ্ধি করে।',
        sourceName: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও ব্রি (BRRI)',
        sourceType: 'GOVERNMENT',
        version: 1,
        status: 'APPROVED',
        authorId: 'usr-dataentry',
        reviewedById: 'usr-reviewer',
        reviewedAt: '2026-01-25',
        reviewerNotesBn: 'বৈজ্ঞানিকভাবে পরীক্ষিত ও মাঠপর্যায়ে অনুমোদিত পরামর্শ। অনুমোদন দেওয়া হলো।',
        createdAt: '2026-01-20'
      },
      {
        id: 'k-2',
        titleBn: 'শীতকালীন টমেটোতে লেট ব্লাইট পূর্বাভাস ও কৃষকের করণীয়',
        cropId: 'crop-tomato',
        diseaseId: 'dis-tomato-lateblight',
        category: 'DISEASE_CONTROL',
        contentBn: 'টানা ২-৩ দিন কুয়াশা ও রাতের তাপমাত্রা ১২-১৫ ডিগ্রি হলে লেট ব্লাইটের আক্রমণ ঘটে। লক্ষণ প্রকাশের পূর্বে ম্যানকোজেব প্রতিরক্ষামূলকভাবে স্প্রে করা বিজ্ঞানসম্মত। রোগ দেখা দিলে দ্রুত কৃষি কর্মকর্তার পরামর্শ নিতে হবে।',
        sourceName: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)',
        sourceType: 'RESEARCH_INSTITUTE',
        version: 2,
        status: 'APPROVED',
        authorId: 'usr-dataentry',
        reviewedById: 'usr-reviewer',
        reviewedAt: '2026-01-26',
        reviewerNotesBn: 'অনুমোদিত। কৃষকদের ব্র্যান্ডের নাম না দিয়ে সক্রিয় উপাদানের সঠিক নিয়ম জানানো হয়েছে।',
        createdAt: '2026-01-22'
      }
    ];

    // 13. Market Prices
    this.marketPrices = [
      {
        id: 'mp-bansh-pan',
        cropNameBn: 'মিষ্টি পান (বাঁশখালীর সুস্বাদু পান)',
        marketNameBn: 'জলদী পৌর বাজার ও গুনাগরি হাট',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '১২০ - ১৫০',
        retailPriceBn: '১৮০ - ২০০',
        unitBn: 'প্রতি বিড়া (৮০ টি পান)',
        trend: 'UP',
        lastUpdatedBn: 'আজ সকাল ৮:৪৫',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM) ও বাঁশখালী স্থানীয় বাজার'
      },
      {
        id: 'mp-bansh-melon',
        cropNameBn: 'তরমুজ (উপকূলীয় চরের তরমুজ)',
        marketNameBn: 'বাঁশখালী উপকূলীয় আড়ত ও জলদী',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '২৮ - ৩৫',
        retailPriceBn: '৪৫ - ৫৫',
        unitBn: 'প্রতি কেজি',
        trend: 'DOWN',
        lastUpdatedBn: 'আজ সকাল ৯:১৫',
        source: 'বাঁশখালী উপজেলা কৃষি সম্প্রসারণ পর্যবেক্ষণ'
      },
      {
        id: 'mp-bansh-supari',
        cropNameBn: 'সুপারি (শুকনা ও কাঁচা ছড়া)',
        marketNameBn: 'চাম্বল বাজার',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '৪৫০ - ৫২০',
        retailPriceBn: '৬০০ - ৬৫০',
        unitBn: 'প্রতি কাউন (১২৮০ টি)',
        trend: 'STABLE',
        lastUpdatedBn: 'আজ সকাল ১০:০০',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM)'
      },
      {
        id: 'mp-bansh-tea',
        cropNameBn: 'চা পাতা (প্রিমিয়াম বিওপি)',
        marketNameBn: 'চাঁদপুর বেলগাঁও বাগান গেট ও চবি',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '২৩০ - ২৫০',
        retailPriceBn: '৩০০ - ৩৪০',
        unitBn: 'প্রতি কেজি',
        trend: 'STABLE',
        lastUpdatedBn: 'আজ সকাল ৯:৩০',
        source: 'বাংলাদেশ চা বোর্ড ও স্থানীয় বাজার'
      },
      {
        id: 'mp-bansh-rice',
        cropNameBn: 'ধান (ব্রি ধান ৮৭ / বিনাশাইল)',
        marketNameBn: 'বাঁশখালী সদর বাজার',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '১,৩৪০ - ১,৩৮০',
        retailPriceBn: '১,৪২০',
        unitBn: 'প্রতি মণ (৪০ কেজি)',
        trend: 'UP',
        lastUpdatedBn: 'আজ সকাল ১০:১৫',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM)'
      },
      {
        id: 'mp-bansh-brinjal',
        cropNameBn: 'বেগুন (স্থানীয় গোল বেগুন)',
        marketNameBn: 'বৈলছড়ী হাট',
        districtBn: 'চট্টগ্রাম (বাঁশখালী)',
        wholesalePriceBn: '৪০ - ৪৫',
        retailPriceBn: '৫৫ - ৬৫',
        unitBn: 'প্রতি কেজি',
        trend: 'DOWN',
        lastUpdatedBn: 'আজ সকাল ৮:০০',
        source: 'উপজেলা কৃষি বিপণন সেল'
      },
      {
        id: 'mp-1',
        cropNameBn: 'ধান (ব্রি ধান ২৮)',
        marketNameBn: 'শ্রীপুর বাজার',
        districtBn: 'গাজীপুর',
        wholesalePriceBn: '১,২৮০ - ১,৩২০',
        retailPriceBn: '১,৩৫০',
        unitBn: 'প্রতি মণ (৪০ কেজি)',
        trend: 'STABLE',
        lastUpdatedBn: 'আজ সকাল ১০:০০',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM)'
      },
      {
        id: 'mp-2',
        cropNameBn: 'টমেটো (উন্নত জাত)',
        marketNameBn: 'কারওয়ান বাজার',
        districtBn: 'ঢাকা',
        wholesalePriceBn: '৩৫ - ৪০',
        retailPriceBn: '৫০ - ৬০',
        unitBn: 'প্রতি কেজি',
        trend: 'DOWN',
        lastUpdatedBn: 'আজ সকাল ৮:৩০',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM)'
      },
      {
        id: 'mp-3',
        cropNameBn: 'গোল আলু (কার্ডিনাল)',
        marketNameBn: 'মহাস্থান হাট',
        districtBn: 'বগুড়া',
        wholesalePriceBn: '২৫ - ২৮',
        retailPriceBn: '৩৫ - ৩৮',
        unitBn: 'প্রতি কেজি',
        trend: 'UP',
        lastUpdatedBn: 'আজ সকাল ৯:১৫',
        source: 'কৃষি বিপণন অধিদপ্তর (DAM)'
      }
    ];

    // 14. Government Updates
    this.governmentUpdates = [
      {
        id: 'gov-1',
        titleBn: 'বোরো ধান আবাদে আকস্মিক কুয়াশা ও ব্লাস্ট রোগ সতর্কবার্তা জারি',
        summaryBn: 'দেশের উত্তরাঞ্চল ও হাওর অঞ্চলে অব্যাহত কুয়াশার কারণে কৃষকদের ধানের জমিতে নিয়মিত নজরদারি ও পানি ধরে রাখার আহ্বান জানিয়েছে কৃষি সম্প্রসারণ অধিদপ্তর।',
        departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
        dateBn: '০১ অক্টোবর, ২০২৬',
        isImportant: true,
        link: 'http://dae.gov.bd'
      },
      {
        id: 'gov-2',
        titleBn: 'কৃষি কল সেন্টারের হটলাইন ১৬১২৩ সার্বক্ষণিক চালু রয়েছে',
        summaryBn: 'ফসলের যেকোনো রোগবালাই, পোকামাকড় আক্রমণ ও সার প্রয়োগ সংক্রান্ত তাৎক্ষণিক পরামর্শের জন্য সরকারি কৃষি কল সেন্টার ১৬১২৩ নম্বরে বিনামূল্যে সরাসরি কৃষি বিশেষজ্ঞদের সাথে কথা বলা যাবে।',
        departmentBn: 'কৃষি তথ্য সার্ভিস (AIS)',
        dateBn: '২৮ সেপ্টেম্বর, ২০২৬',
        isImportant: false,
        link: 'http://ais.gov.bd'
      }
    ];

    // 14.5. Government Agricultural Incentives & Subsidies (প্রণোদনা ও সহায়তা)
    this.incentives = [
      {
        id: 'inc-seed-fert-2026',
        titleBn: 'বোরো ও রবি মৌসুমে ক্ষুদ্র ও প্রান্তিক কৃষকদের বিনামূল্যে বীজ ও রাসায়নিক সার সহায়তা প্রণোদনা',
        seasonBn: 'রবি / বোরো মৌসুম ২০২৬',
        ministryBn: 'কৃষি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
        departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
        category: 'FREE_SEEDS_FERTILIZER',
        benefitsBn: [
          '১ বিঘা (৩৩ শতক) জমির জন্য বিনামূল্যে ৫ কেজি উচ্চফলনশীল (উফশী) বা ২ কেজি হাইব্রিড ধানের বীজ',
          '১০ কেজি ডিএপি (DAP) সার বিনামূল্যে প্রদান',
          '১০ কেজি এমওপি (MOP / পটাশ) সার বিনামূল্যে প্রদান'
        ],
        eligibilityBn: [
          'প্রান্তিক ও ক্ষুদ্র কৃষক (জমি ০.০৫ হতে ২.৪৯ একর পর্যন্ত)',
          'কৃষি উপকরণ কার্ড (Krishi Card / কৃষক আইডি) ধারক হতে হবে',
          'নিজস্ব জমি বা বৈধ বর্গা চাষি হতে হবে',
          'গত মৌসুমে একই স্কিমের সুবিধা না পাওয়া কৃষকদের অগ্রাধিকার'
        ],
        requiredDocsBn: [
          'জাতীয় পরিচয়পত্র (NID) এর ফটোকপি',
          'কৃষি উপকরণ সহায়তা কার্ড (ডিজিটাল কৃষক কার্ড)',
          '১ কপি পাসপোর্ট সাইজ ছবি',
          'সংশ্লিষ্ট ওয়ার্ডের ইউপি সদস্য ও এসএএও (SAAO) কর্তৃক সত্যায়ন'
        ],
        applicationDeadlineBn: 'চলতি মাসের ২৫ তারিখ পর্যন্ত আবেদন গ্রহণ চলছে',
        allocationStatusBn: 'উপজেলা কৃষি পুনর্বাসন কমিটির অনুমোদন সাপেক্ষে ইউনিয়ন পর্যায়ে তালিকা চূড়ান্ত',
        distributionVenuesBn: [
          'উপজেলা কৃষি অফিস চত্বর',
          'সংশ্লিষ্ট ইউনিয়ন পরিষদ ডিজিটাল সেবা কেন্দ্র'
        ],
        hotline: '১৬১২৩',
        contactOfficerBn: 'উপজেলা কৃষি কর্মকর্তা (UAO) এবং স্ব স্ব ব্লকের উপসহকারী কৃষি কর্মকর্তা (SAAO)',
        isActive: true
      },
      {
        id: 'inc-machinery-subsidy-2026',
        titleBn: 'সরকারি সহায়তায় কৃষি যন্ত্রপাতি কীভাবে পাবেন? বিস্তারিত আবেদন নির্দেশিকা ও ভর্তুকি বিবরণ',
        seasonBn: 'চলমান প্রকল্প ২০২৫-২০২৬',
        ministryBn: 'কৃষি মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
        departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও উপজেলা কৃষি অফিস',
        category: 'MACHINERY_SUBSIDY',
        benefitsBn: [
          'পাওয়ার টিলার ও মিনি পাওয়ার টিলার সহায়তা',
          'ধান কাটার মেশিন (কম্বাইন হারভেস্টার - Combine Harvester)',
          'ধান মাড়াই ও ঝাড়াই আধুনিক যন্ত্র (Thresher & Winnower)',
          'রাইস ট্রান্সপ্লান্টার (চারা রোপণ যন্ত্র) ও রিপার',
          'সিডার / বীজ বপন আধুনিক যন্ত্র',
          'সোলার সেচ পাম্প ও কৃষিকাজের অন্যান্য আধুনিক যন্ত্রপাতি',
          'উপকূলীয় (বাঁশখালী), হাওর ও পাহাড়ি অঞ্চলে সর্বোচ্চ ৭০% পর্যন্ত সরকারি উন্নয়ন সহায়তা/ভর্তুকি (সমতল এলাকায় ৫০%)'
        ],
        eligibilityBn: [
          'সাধারণত কৃষক, কৃষক দল, যৌথভাবে জমি ব্যবহারকারী কৃষক এবং কৃষি উদ্যোক্তাগণ আবেদনের যোগ্য',
          'পূর্ববর্তী সরকারি কৃষি যান্ত্রিকীকরণ প্রকল্পের সুবিধা না পাওয়া সক্রিয় চাষীদের অগ্রাধিকার',
          'নিজস্ব জমি বা বাণিজ্যিক ভিত্তিতে স্থানীয় কৃষকদের ভাড়া সেবা প্রদানের সক্ষমতা',
          'জরুরি বিষয়: পুরো টাকা সরকার দেয় এমন নয়—প্রকল্প ও এলাকাভেদে নির্দিষ্ট হারে উন্নয়ন সহায়তা বা ভর্তুকি দেওয়া হয়'
        ],
        requiredDocsBn: [
          'জাতীয় পরিচয়পত্র (NID)-র সত্যায়িত ফটোকপি',
          'কৃষক হিসেবে পরিচয়ের তথ্য (ডিজিটাল কৃষক কার্ড / কৃষি উপকরণ সহায়তা কার্ড)',
          'জমি / চাষাবাদের তথ্যাদি (খতিয়ান, পরচা বা স্থানীয় প্রত্যয়ন)',
          'সচল মোবাইল নম্বর ও কৃষক দলের প্রতিনিধির তথ্য',
          'কৃষক বা কৃষক দলের সচল ব্যাংক হিসাবের তথ্য',
          'পাসপোর্ট সাইজ রঙিন ছবি (২ কপি)',
          'সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তা (SAAO) বা উপজেলা কৃষি অফিস নির্দেশিত নির্ধারিত আবেদন ফরম'
        ],
        applicationStepsBn: [
          '১️⃣ প্রথমে আপনার এলাকার উপজেলা কৃষি অফিসে সরাসরি যোগাযোগ করুন বা খোঁজ নিন।',
          '২️⃣ সেখানে গিয়ে জানুন: বর্তমানে কৃষি যান্ত্রিকীকরণের কোন প্রকল্পটি চালু রয়েছে।',
          '৩️⃣ আপনার ইউনিয়ন বা এলাকার জন্য চলতি অর্থবছরে কোন কোন যন্ত্র বরাদ্দ রয়েছে।',
          '৪️⃣ কৃষক হিসেবে আপনার যোগ্যতা ও কত শতাংশ সরকারি সহায়তা পাওয়া যাবে (৫০% হতে ৭০%)।',
          '৫️⃣ নিজের কত টাকা ডাউন পেমেন্ট দিতে হবে এবং আবেদনের শেষ তারিখ কখন।',
          '৬️⃣ নির্ধারিত ফরম সংগ্রহ করে প্রয়োজনীয় কাগজপত্রসহ নিখুঁতভাবে পূরণ করুন।',
          '৭️⃣ নির্ধারিত সময়ের মধ্যে উপজেলা কৃষি অফিসে ফরম জমা দিয়ে যাচাই ও লটারির প্রাপ্তিস্বীকার রসিদ সংগ্রহ করুন।'
        ],
        applicationDeadlineBn: 'উপজেলা কৃষি অফিস কর্তৃক ঘোষিত শেষ তারিখ পর্যন্ত (লটারি ও বরাদ্দ চলমান)',
        allocationStatusBn: 'উপজেলা কৃষি পুনর্বাসন ও যন্ত্রপাতি বরাদ্দ কমিটির যাচাই সাপেক্ষে তালিকা চূড়ান্ত',
        distributionVenuesBn: ['উপজেলা পরিষদ চত্বর ও উপজেলা কৃষি অফিস কার্যালয়'],
        hotline: '১৬১২৩ (কৃষি কল সেন্টার)',
        contactOfficerBn: 'উপজেলা কৃষি কর্মকর্তা (UAO), বাঁশখালী এবং স্ব স্ব ব্লকের উপসহকারী কৃষি কর্মকর্তা (SAAO)',
        isActive: true
      },
      {
        id: 'inc-coastal-saline-2026',
        titleBn: 'বাঁশখালী সহ উপকূলীয় অঞ্চলের জন্য লবণাক্ততা সহনশীল ধান (ব্রি ধান ৬৭, ৯৭) বিশেষ প্রণোদনা',
        seasonBn: 'বোরো ও খরিপ-২ মৌসুম',
        ministryBn: 'কৃষি মন্ত্রণালয় ও ব্রি (BRRI)',
        departmentBn: 'উপজেলা কৃষি অফিস, বাঁশখালী ও উপকূলীয় জেলাসমূহ',
        category: 'SPECIAL_PROJECT',
        benefitsBn: [
          'লবণাক্ততা সহনশীল ব্রি ধান ৬৭ ও ব্রি ধান ৯৭ জাতের মানসম্মত প্রজনন বীজ বিনামূল্যে বিতরণ',
          'প্রতি কৃষকে ৫ কেজি বীজ ও সহযোগী জিপসাম এবং দস্তা সার প্রদান',
          'মাটির লবণাক্ততা পর্যবেক্ষণ কিট ও সেচ ব্যবস্থাপনা বিষয়ক মাঠ দিবস প্রশিক্ষণ'
        ],
        eligibilityBn: [
          'উপকূলীয় চরাঞ্চল ও নোনা পানির ঝুঁকিপূর্ণ এলাকার কৃষক (যেমন: বাঁশখালীর বাহারছড়া, সরল, গণ্ডামারা, ছনুয়া, শেখেরখীল ইউনিয়ন)',
          'নোনা পানি প্রবেশের ঝুঁকি থাকা সত্ত্বেও বোরো চাষে আগ্রহী কৃষক'
        ],
        requiredDocsBn: [
          'এনআইডি ও কৃষক আইডি কার্ড',
          'জমির খতিয়ান বা বর্গা সংক্রান্ত প্রত্যয়ন'
        ],
        applicationDeadlineBn: 'মৌসুম শুরুর পূর্বে সংশ্লিষ্ট এসএএও-র নিকট তালিকাভুক্ত হতে হবে',
        allocationStatusBn: 'ব্লক ভিত্তিক উপকারভোগী তালিকা প্রস্তুত চলছে',
        distributionVenuesBn: ['বাঁশখালী উপজেলা পরিষদ চত্বর ও ইউনিয়ন বীজাগার'],
        hotline: '১৬১২৩',
        contactOfficerBn: 'কৃষিবিদ আবু জাফর মো. ছাদেক, উপজেলা কৃষি কর্মকর্তা, বাঁশখালী',
        isActive: true
      },
      {
        id: 'inc-oilseed-pulse-2026',
        titleBn: 'তৈলবীজ (সরিষা, সূর্যমুখী, চিনাবাদাম) ও ডাল ফসলের আবাদ বৃদ্ধির বিশেষ আর্থিক প্রণোদনা',
        seasonBn: 'রবি মৌসুম',
        ministryBn: 'কৃষি মন্ত্রণালয়',
        departmentBn: 'ডিএই মাঠ সেবা উইং',
        category: 'FREE_SEEDS_FERTILIZER',
        benefitsBn: [
          'বিনা মূল্যে বারি সরিষা-১৪/১৭/১৮ অথবা সূর্যমুখীর উন্নত বীজ ১ বিঘা জমির জন্য',
          '১০ কেজি ডিএপি ও ১০ কেজি এমওপি সার প্রদান',
          'ফসল কাটার পর সরাসরি বাজারজাতকরণে কৃষি বিপণন সহায়তা'
        ],
        eligibilityBn: ['পতিত জমিতে বা আমন পরবর্তী সরিষা আবাদে আগ্রহী কৃষক'],
        requiredDocsBn: ['কৃষক কার্ড ও এনআইডি'],
        applicationDeadlineBn: 'কার্তিক মাসের ১৫ তারিখ পর্যন্ত',
        allocationStatusBn: 'অনুমোদিত',
        distributionVenuesBn: ['ইউনিয়ন পরিষদ প্রাঙ্গণ'],
        hotline: '১৬১২৩',
        contactOfficerBn: 'সংশ্লিষ্ট উপসহকারী কৃষি কর্মকর্তা (SAAO)',
        isActive: true
      }
    ];

    // 15. Initial Seed Diagnosis Cases
    this.diagnoses = [
      {
        id: 'diag-demo-1',
        farmerId: 'usr-farmer',
        farmerNameBn: 'মো. আবুল কাশেম',
        farmerPhone: '01819876543',
        cropId: 'crop-rice',
        cropNameBn: 'ধান',
        cropStageBn: 'কুশি অবস্থা (Tillering)',
        cropAgeBn: '১-৩ মাস',
        affectedPartBn: 'পুরাতন পাতা ও পাতার কিনারা',
        durationBn: '৪-৭ দিন',
        spreadBn: 'জমির কিছু অংশে (Some plants)',
        divisionId: 'div-1',
        districtId: 'dist-1',
        upazilaId: 'upz-1',
        unionId: 'uni-1',
        locationNameBn: 'মাওনা, শ্রীপুর, গাজীপুর',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
        imageQuality: 'CLEAR',
        weather: {
          temperatureC: 28,
          humidityPercent: 84,
          rainfallForecastMm: 2,
          windSpeedKmh: 9,
          weatherConditionBn: 'আংশিক মেঘলা ও উচ্চ আর্দ্রতা',
          applicationSuitability: 'FAVORABLE'
        },
        soil: {
          soilType: 'দোআঁশ',
          soilMoisture: 'WATERLOGGED',
          drainageCondition: 'POOR'
        },
        primaryCandidate: {
          problemNameBn: 'ব্যাকটেরিয়াল লিফ ব্লাইট (পাতাপোড়া রোগ)',
          problemNameEn: 'Bacterial Leaf Blight',
          confidencePercent: 82,
          category: 'Bacterial',
          descriptionBn: 'পাতার কিনারায় লম্বা ঢেউখেলানো হলুদ-ধূসর পোড়া দাগ এবং শুকিয়ে যাওয়া স্পষ্টভাবে পরিলক্ষিত হয়েছে।'
        },
        alternativeCandidates: [
          {
            problemNameBn: 'জিংক পুষ্টি ঘাটতিজনিত খায়রা রোগ',
            problemNameEn: 'Zinc Deficiency / Khaira',
            confidencePercent: 11,
            category: 'Nutrient Deficiency',
            descriptionBn: 'মাটিতে অতিরিক্ত পানি জমে থাকায় শিকড়ের পুষ্টি শোষণ ব্যাহত হয়ে পাতা তামাটে হতে পারে।'
          },
          {
            problemNameBn: 'লিফ স্কেল্ড (Leaf Scald)',
            problemNameEn: 'Leaf Scald',
            confidencePercent: 7,
            category: 'Fungal',
            descriptionBn: 'পাতার ডগায় ভেজা জলছাপের মতো দাগ যা কখনো কখনো ব্লাইটের মতো দেখায়।'
          }
        ],
        overallConfidence: 'HIGH',
        severityLevel: 'HIGH',
        explainableReasoningBn: 'ছবিটিতে ধানের পাতার প্রান্তসীমা বরাবর ঢেউখেলানো শুকিয়ে যাওয়া দাগ লক্ষ্য করা গেছে যা ব্যাকটেরিয়াল লিফ ব্লাইটের ক্লাসিক লক্ষণ। এছাড়াও জমিতে অতিরিক্ত পানি নিষ্কাশনের অভাব ও ৮৪% আর্দ্রতা রোগটির বিস্তারের অনুকূল পরিবেশ তৈরি করেছে।',
        possibleCausesBn: [
          'বাতাসের অতিরিক্ত আর্দ্রতা (৮৪%) ও উষ্ণাভ আবহাওয়া',
          'জমিতে মাত্রাতিরিক্ত ইউরিয়া সারের সম্ভাব্য প্রয়োগ',
          'জমির নিষ্কাশন ব্যবস্থা দুর্বল হওয়া ও পানি জমে থাকা'
        ],
        nonChemicalManagementBn: [
          'জমির অতিরিক্ত পানি নিষ্কাশন করে ২-৩ দিন শুকনা রাখুন',
          'ইউরিয়া সারের উপরিপ্রয়োগ সম্পূর্ণ বন্ধ রাখুন',
          'শতক প্রতি ৬০ গ্রাম মিউরেট অব পটাশ (MOP) উপরিপ্রয়োগ করুন'
        ],
        treatmentCategoryBn: 'ব্যাকটেরিয়ানাশক (Bactericide)',
        activeIngredientBn: 'কপার অক্সিক্লোরাইড ৫০% ডব্লিউপি (Copper Oxychloride 50 WP)',
        formulationBn: '৫০% ডব্লিউপি আর্দ্র পাউডার',
        verifiedDoseBn: '২ গ্রাম প্রতি লিটার পানি (শতকে ১০ গ্রাম ৫ লিটার পানিতে)',
        applicationMethodBn: 'গাছের পাতা ও গোড়া পুরোপুরি ভিজিয়ে বিকেলে স্প্রে করুন।',
        timingGuidanceBn: 'সকালে বা শেষ বিকেলে। বৃষ্টিপাতের সম্ভাবনা থাকলে স্প্রে স্থগিত রাখুন।',
        safetyEquipmentBn: ['মাস্ক', 'গ্লাভস', 'চোখের চশমা'],
        preHarvestIntervalDays: 14,
        safetyGatePassed: true,
        officerVerificationStatus: 'PENDING_OFFICER_REVIEW',
        assignedOfficeId: 'off-1',
        followupScheduledDays: 5,
        followupStatus: 'SCHEDULED',
        sources: [
          'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)',
          'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)'
        ],
        isAiGenerated: true,
        isEscalatedToHuman: false,
        createdAt: '2026-09-30 14:30',
        updatedAt: '2026-09-30 14:30'
      }
    ];

    // 16. Audit Logs
    this.auditLogs = [
      {
        id: 'aud-1',
        actorId: 'usr-armanul-admin',
        actorName: 'মোহাম্মদ আরমানুল হক (Mohammed Armanul Hoque)',
        actorRole: 'SUPER_ADMIN',
        action: 'SYSTEM_INITIALIZE',
        entity: 'SystemConfig',
        entityId: 'global',
        details: 'AgriCare AI প্ল্যাটফর্মের সিস্টেম প্রশাসন, বাঁশখালী ও জাতীয় ডেটাবেজ সফলভাবে সক্রিয় করা হয়েছে।',
        ip: '127.0.0.1',
        timestamp: '2026-09-28 09:00:00'
      },
      {
        id: 'aud-2',
        actorId: 'usr-armanul-admin',
        actorName: 'মোহাম্মদ আরমানুল হক (Mohammed Armanul Hoque)',
        actorRole: 'SUPER_ADMIN',
        action: 'SECURITY_GATE_APPLIED',
        entity: 'SafetyGate',
        entityId: 'sec-rule-1',
        details: 'নিষিদ্ধ কীটনাশক ফিল্টারিং এবং আবহাওয়া নিরাপত্তা গেট নিয়মাবলী কার্যকর করা হয়েছে।',
        ip: '103.205.71.12',
        timestamp: '2026-09-29 11:15:30'
      }
    ];

    // 17. Seed Notifications
    this.notifications = [
      {
        id: 'notif-1',
        userId: 'usr-farmer',
        titleBn: 'কুয়াশা ও ব্লাস্ট সতর্কবার্তা',
        messageBn: 'আপনার এলাকায় আর্দ্রতা বৃদ্ধি পাওয়ায় ধানের জমিতে প্রতিদিন নজর রাখুন এবং অতিরিক্ত পানি নিষ্কাশন নিশ্চিত করুন।',
        type: 'WEATHER_ALERT',
        isRead: false,
        createdAt: '2026-10-01 08:00'
      },
      {
        id: 'notif-2',
        userId: 'usr-farmer',
        titleBn: 'আপনার ডায়াগনোসিস সফলভাবে রেকর্ড হয়েছে',
        messageBn: 'ধানের পাতার নমুনা শ্রীপুর উপজেলা কৃষি অফিসে পর্যালোচনার জন্য অপেক্ষমাণ রয়েছে।',
        type: 'DIAGNOSIS_VERIFIED',
        isRead: false,
        createdAt: '2026-09-30 14:35',
        linkUrl: '/farmer/reports'
      }
    ];

    // Seed Verified Agri Dealers & Stores (Focused on Banskhali & Chittagong)
    this.dealers = [
      {
        id: 'dlr-1',
        shopNameBn: 'মেসার্স চৌধুরী ট্রেডার্স ও সার বিতান',
        proprietorNameBn: 'হাজী মোহাম্মদ রফিকুল ইসলাম চৌধুরী',
        phone: '০১৮১৯-৮৮৭৭৬৬',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'বাঁশখালী পৌরসভা সদর বাজার, প্রধান সড়ক, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'BCIC_FERTILIZER',
        dealerTypeBn: 'বিসিআইসি অনুমোদিত সরকারি সার ডিলার',
        authorizedBrands: ['Syngenta', 'ACI Crop Care', 'BCIC সার', 'Auto Crop Care'],
        productsAvailableBn: ['ইউরিয়া', 'টিএসপি', 'ডিএপি', 'এমওপি', 'অ্যামিস্টার টপ', 'ভার্টিমেক', 'স্কোর'],
        isVerified: true,
        isFeaturedSponsored: true,
        monthlyTier: 'GOLD',
        subscriptionValidUntil: '2027-12-31',
        createdAt: '2026-09-01'
      },
      {
        id: 'dlr-2',
        shopNameBn: 'নাপোড়া কিষাণ সেবা কেন্দ্র ও বীজ ভান্ডার',
        proprietorNameBn: 'মোহাম্মদ আবুল কালাম',
        phone: '০১৮১৫-৬৬৭৭৮৮',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'নাপোড়া বাজার, নাপোড়া ইউনিয়ন, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'BADC_SEEDS',
        dealerTypeBn: 'বিএডিসি প্রত্যায়িত বীজ ও সার পরিবেশক',
        authorizedBrands: ['BADC বীজ', 'Square Agro', 'Lal Teer Seed', 'ACI'],
        productsAvailableBn: ['উচ্চফলনশীল ধান বীজ', 'সবজি বীজ', 'ন্যাটিভো', 'ভাটিমেক', 'জৈব সার', 'স্প্রেয়ার'],
        isVerified: true,
        isFeaturedSponsored: true,
        monthlyTier: 'SILVER',
        subscriptionValidUntil: '2027-10-31',
        createdAt: '2026-09-10'
      },
      {
        id: 'dlr-3',
        shopNameBn: 'গুণাগরী কৃষি ভান্ডার ও আধুনিক স্প্রে সার্ভিস',
        proprietorNameBn: 'কৃষিবিদ নাসির উদ্দিন',
        phone: '০১৮১২-৩৩৪৫৫৬',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'গুণাগরী চৌমুহনী বাজার, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'AUTHORIZED_PESTICIDE',
        dealerTypeBn: 'অনুমোদিত বালাইনাশক ও আধুনিক কৃষি যন্ত্রপাতি',
        authorizedBrands: ['Auto Crop Care', 'Syngenta', 'Haychem', 'Bayer'],
        productsAvailableBn: ['কীটনাশক', 'ছত্রাকনাশক', 'ব্যাটারি স্প্রে মেশিন', 'ফেরোমোন ট্র্যাপ', 'দানা সার'],
        isVerified: true,
        isFeaturedSponsored: false,
        monthlyTier: 'BRONZE',
        subscriptionValidUntil: '2027-06-30',
        createdAt: '2026-09-15'
      },
      {
        id: 'dlr-4',
        shopNameBn: 'চাম্বল সার ও কীটনাশক বিতান',
        proprietorNameBn: 'মোহাম্মদ ওসমান গণি',
        phone: '০১৮২৪-৯৯০০১১',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'চাম্বল বাজার, চাম্বল ইউনিয়ন, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'GENERAL_AGRI_INPUT',
        dealerTypeBn: 'সাধারণ কৃষি উপকরণ ও বালাই ব্যবস্থাপনা',
        authorizedBrands: ['ACI', 'National AgriCare', 'Padma Oil Agro'],
        productsAvailableBn: ['জৈব কীটনাশক', 'মাইক্রো নিউট্রিয়েন্ট', 'জিংক', 'বোরন', 'হরমোন স্প্রে'],
        isVerified: true,
        isFeaturedSponsored: false,
        monthlyTier: 'FREE',
        createdAt: '2026-09-20'
      },
      {
        id: 'dlr-5',
        shopNameBn: 'বৈলছড়ি গ্রীন অ্যাগ্রো সার্ভিস',
        proprietorNameBn: 'মাস্টার নুরুল ইসলাম',
        phone: '০১৭০৯-১২৩৪৫০',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'বৈলছড়ি বাজার, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'BADC_SEEDS',
        dealerTypeBn: 'সরকারি সার ও বীজ ডিলার',
        authorizedBrands: ['BADC', 'Syngenta', 'Supreme Seed'],
        productsAvailableBn: ['হাইব্রিড তরমুজ বীজ', 'ধান বীজ', 'চিলেটেড জিংক', 'সালফার'],
        isVerified: true,
        isFeaturedSponsored: false,
        monthlyTier: 'FREE',
        createdAt: '2026-09-22'
      },
      {
        id: 'dlr-6',
        shopNameBn: 'চট্টগ্রাম সেন্ট্রাল সিড ও এগ্রো কেয়ার',
        proprietorNameBn: 'আলহাজ্ব মাহাবুবুর রহমান',
        phone: '০১৯১১-৫৫৬৬৭৭',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'কোতোয়ালী',
        marketAddressBn: 'রিয়াজউদ্দিন বাজার কৃষি পট্টি, কোতোয়ালী, চট্টগ্রাম',
        dealerType: 'GENERAL_AGRI_INPUT',
        dealerTypeBn: 'বৃহৎ পাইকারি কৃষি উপকরণ ও ডিলার হাব',
        authorizedBrands: ['Syngenta', 'Bayer', 'BADC', 'ACI', 'Lal Teer'],
        productsAvailableBn: ['সকল প্রকার পাইকারি বীজ', 'স্প্রেয়ার মেশিন', 'ড্রিপ সেচ পাইপ', 'আমদানিকৃত সার'],
        isVerified: true,
        isFeaturedSponsored: true,
        monthlyTier: 'GOLD',
        subscriptionValidUntil: '2027-12-31',
        createdAt: '2026-08-15'
      },
      {
        id: 'dlr-7',
        shopNameBn: 'মেসার্স বাঁশখালী এগ্রো মেশিনারিজ ও কম্বাইন হারভেস্টার সার্ভিস',
        proprietorNameBn: 'হাজী মোহাম্মদ নুরুল আফসার',
        phone: '০১৮১৬-৭৭৮৮৯৯',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'প্রধান সড়ক মোড়, বাঁশখালী পৌরসভা, চট্টগ্রাম',
        dealerType: 'MACHINERY_RENTAL',
        dealerTypeBn: '🚜 কম্বাইন হারভেস্টার ও পাওয়ার টিলার ভাড়া সেবা',
        rentalRateBn: 'ধান কাটা ও মাড়াই: ১,৩৫০ টাকা/বিঘা | জমি চাষ: ৭৫০ টাকা/বিঘা',
        machineryTypeBn: 'কম্বাইন হারভেস্টার, ৪-হুইল পাওয়ার টিলার, রিপার',
        authorizedBrands: ['Yanmar', 'Kubota', 'ACI Motors', 'Swaraj'],
        productsAvailableBn: ['কম্বাইন হারভেস্টার ভাড়া', 'পাওয়ার টিলার চাষ সেবা', 'রিপার চালনা', 'ট্রাক্টর ভাড়া'],
        isVerified: true,
        isFeaturedSponsored: true,
        monthlyTier: 'GOLD',
        subscriptionValidUntil: '2027-12-31',
        createdAt: '2026-09-01'
      },
      {
        id: 'dlr-8',
        shopNameBn: 'নাপোড়া আধুনিক সেচ ও পাওয়ার স্প্রেয়ার সমবায়',
        proprietorNameBn: 'মোহাম্মদ তারেক হোসাইন',
        phone: '০১৮১৯-৪৪৩৩২২',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        marketAddressBn: 'নাপোড়া বাজার, নাপোড়া ইউনিয়ন, বাঁশখালী, চট্টগ্রাম',
        dealerType: 'IRRIGATION_SERVICE',
        dealerTypeBn: '💧 লো-লিফট সেচ পাম্প ও বোরিং সেবা',
        rentalRateBn: 'সেচ পাম্প: ১৮০ টাকা/ঘণ্টা | পাওয়ার স্প্রে: ২৫০ টাকা/বিঘা',
        machineryTypeBn: 'ডিজেল সেচ পাম্প (LLP), সাবমারসিবল ও ড্রোন স্প্রে',
        authorizedBrands: ['Honda Engines', 'Kirloskar', 'RFL Pumps', 'Yamaha'],
        productsAvailableBn: ['খরা মৌসুমে সেচ পানি সরবরাহ', 'বোরিং পাইপ স্থাপন', 'পাওয়ার স্প্রেয়ার ভাড়া', 'স্পেয়ার পার্টস'],
        isVerified: true,
        isFeaturedSponsored: true,
        monthlyTier: 'SILVER',
        subscriptionValidUntil: '2027-10-31',
        createdAt: '2026-09-05'
      }
    ];

    // Seed Farmer Marketplace Listings (Krishi Haat)
    this.marketplaceListings = [
      {
        id: 'mkt-1',
        farmerNameBn: 'মোহাম্মদ জামশেদ আলম',
        farmerPhone: '০১৮১৮-১১২২৩৩',
        cropNameBn: 'বাঁশখালীর মিষ্টি তরমুজ (সুপার হাইব্রিড)',
        cropCategoryBn: 'ফল ও তরমুজ',
        quantityBn: '৫০০ মণ',
        expectedPriceBn: '৮৫০ টাকা / মণ',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        unionNameBn: 'নাপোড়া',
        harvestDateBn: 'আগামী ৩ দিনের মধ্যে জমি থেকে সংগ্রহযোগ্য',
        descriptionBn: 'সম্পূর্ণ ফরমালিনমুক্ত, অত্যন্ত মিষ্টি ও রসালো লাল রঙের তরমুজ। পাইকারি ক্রেতা বা আড়তদার সরাসরি ক্ষেত থেকে গাড়িতে তুলতে পারবেন।',
        qualityGradeBn: 'PREMIUM',
        status: 'AVAILABLE',
        createdAt: '2026-10-01'
      },
      {
        id: 'mkt-2',
        farmerNameBn: 'হাজী নুরুল হক',
        farmerPhone: '০১৮১৯-৫৫৬৬৭৭',
        cropNameBn: 'শুকনা ব্রি ধান-২৮ (আমদানিমুক্ত পরিষ্কার ধান)',
        cropCategoryBn: 'ধান ও খাদ্যশস্য',
        quantityBn: '৮০ মণ',
        expectedPriceBn: '১,২৫০ টাকা / মণ',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        unionNameBn: 'শীলকূপ',
        harvestDateBn: 'সংগৃহীত ও শুকনা বস্তাজাত প্রস্তুত',
        descriptionBn: 'উচ্চমানের সোনালী ব্রি ধান-২৮। চালের জন্য বা মিলের জন্য অবিলম্বে ডেলিভারি দেওয়া সম্ভব।',
        qualityGradeBn: 'GRADE_A',
        status: 'AVAILABLE',
        createdAt: '2026-10-02'
      },
      {
        id: 'mkt-3',
        farmerNameBn: 'কামাল উদ্দিন চৌধুরী',
        farmerPhone: '০১৭২২-৯৯৮৮৭৭',
        cropNameBn: 'তাজা গোল বেগুন ও হাইব্রিড শসা',
        cropCategoryBn: 'শাকসবজি',
        quantityBn: '৩০ মণ',
        expectedPriceBn: '১,২০০ টাকা / মণ',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        unionNameBn: 'কাথরিয়া',
        harvestDateBn: 'প্রতিদিন সকালে সরাসরি জমি থেকে তোলা',
        descriptionBn: 'পোকা-মাকড়মুক্ত সতেজ চকচকে গোল বেগুন ও কচি শসা। রেস্তোরাঁ ও কাঁচাবাজারের পাইকারদের জন্য উপযোগী।',
        qualityGradeBn: 'GRADE_A',
        status: 'AVAILABLE',
        createdAt: '2026-10-03'
      },
      {
        id: 'mkt-4',
        farmerNameBn: 'মোহাম্মদ শফিউল আলম',
        farmerPhone: '০১৮১২-৭৭৮৮৯৯',
        cropNameBn: 'পুষ্টিকর লাল শাক ও ডাটা শাক',
        cropCategoryBn: 'শাকসবজি',
        quantityBn: '১৫ মণ',
        expectedPriceBn: '৯০০ টাকা / মণ',
        districtNameBn: 'চট্টগ্রাম',
        upazilaNameBn: 'বাঁশখালী',
        unionNameBn: 'বৈলছড়ি',
        harvestDateBn: 'তাজা সংগ্রহের জন্য প্রস্তুত',
        descriptionBn: 'বিষমুক্তভাবে খৈল ও কম্পোস্ট সারে ফলানো স্বাস্থ্যসম্মত তাজা শাক।',
        qualityGradeBn: 'PREMIUM',
        status: 'AVAILABLE',
        createdAt: '2026-10-04'
      }
    ];
  }

  // Helper Methods & DB Query API
  getUsers(): User[] { return this.users; }
  getUserById(id: string): User | undefined { return this.users.find(u => u.id === id); }
  getDivisions(): Division[] { return this.divisions; }
  getDistricts(divId?: string): District[] { 
    return divId ? this.districts.filter(d => d.divisionId === divId) : this.districts; 
  }
  getDistrictById(id: string): District | undefined {
    return this.districts.find(d => d.id === id);
  }
  getUpazilas(distId?: string): Upazila[] {
    if (distId) {
      const dist = this.getDistrictById(distId);
      return getUpazilasForDistrict(distId, dist?.nameBn || '');
    }
    return this.districts.flatMap(d => getUpazilasForDistrict(d.id, d.nameBn));
  }
  getUpazilaById(id: string, distId?: string): Upazila | undefined {
    if (distId) {
      const upzs = this.getUpazilas(distId);
      const found = upzs.find(u => u.id === id);
      if (found) return found;
    }
    for (const d of this.districts) {
      const upzs = getUpazilasForDistrict(d.id, d.nameBn);
      const found = upzs.find(u => u.id === id);
      if (found) return found;
    }
    return undefined;
  }
  getUnions(upzId?: string, distId?: string): Union[] {
    if (upzId) {
      let resolvedDistId = distId;
      if (!resolvedDistId) {
        const upz = this.getUpazilaById(upzId);
        resolvedDistId = upz?.districtId;
      }
      const upz = this.getUpazilaById(upzId, resolvedDistId);

      // Check if this office has custom or saved unions in this.offices
      const office = this.offices.find(o => 
        o.upazilaId === upzId || 
        (o.id && (o.id === upzId || o.id === `off-${upzId}`)) ||
        (upz?.nameBn && o.nameBn.includes(upz.nameBn))
      );
      if (office && office.unions && office.unions.length > 0) {
        return office.unions;
      }

      return getUnionsForUpazila(upzId, upz?.nameBn || 'সদর', resolvedDistId || '');
    }
    return [];
  }

  getOffices(upzId?: string, distId?: string): AgricultureOffice[] {
    // 1. Specific Upazila requested
    if (upzId) {
      const customOffice = this.offices.find(o => 
        o.upazilaId === upzId || 
        o.id === upzId || 
        o.id === `off-${upzId}` ||
        (o.unions && o.unions.some(u => u.upazilaId === upzId))
      );
      if (customOffice) {
        return [customOffice];
      }

      let resolvedDistId = distId;
      if (!resolvedDistId) {
        const upz = this.getUpazilaById(upzId);
        resolvedDistId = upz?.districtId;
      }
      if (resolvedDistId) {
        const dist = this.getDistrictById(resolvedDistId);
        const upz = this.getUpazilaById(upzId, resolvedDistId);
        if (dist && upz) {
          const byName = this.offices.find(o => o.nameBn.includes(upz.nameBn));
          if (byName) return [byName];
          return [generateOfficeForUpazila(upz, dist)];
        }
      }
    }

    // 2. Specific District requested
    if (distId) {
      const dist = this.getDistrictById(distId);
      if (dist) {
        const upzs = getUpazilasForDistrict(distId, dist.nameBn);
        return upzs.map(u => {
          const custom = this.offices.find(o => 
            o.upazilaId === u.id || 
            o.id === `off-${u.id}` || 
            o.nameBn.includes(u.nameBn)
          );
          return custom || generateOfficeForUpazila(u, dist);
        });
      }
    }

    // 3. No parameters provided (e.g. Admin portal directory list or top offices list)
    // ALWAYS return all saved & custom offices in this.offices first
    const list: AgricultureOffice[] = [...this.offices];

    // Merge generated offices from other districts
    const generated = this.districts.slice(0, 10).flatMap(d => {
      const upzs = getUpazilasForDistrict(d.id, d.nameBn);
      return upzs.slice(0, 1).map(u => generateOfficeForUpazila(u, d));
    });

    for (const g of generated) {
      if (!list.some(o => o.upazilaId === g.upazilaId || o.nameBn === g.nameBn)) {
        list.push(g);
      }
    }

    return list;
  }
  getOfficeById(id: string): AgricultureOffice | undefined {
    const found = this.offices.find(o => o.id === id);
    if (found) return found;
    return this.getOffices()[0];
  }
  getRegionalWeather(districtId: string, upazilaNameBn?: string, unionNameBn?: string): WeatherCondition {
    const dist = this.getDistrictById(districtId) || this.districts[0];
    return generateRegionalWeather(dist, upazilaNameBn, unionNameBn);
  }
  getRegionalCropAdvice(districtId: string, upazilaNameBn?: string, unionNameBn?: string) {
    return getRegionalCropAdvice(districtId, upazilaNameBn, unionNameBn);
  }
  getCrops(): Crop[] { return this.crops; }
  getCropById(id: string): Crop | undefined { return this.crops.find(c => c.id === id); }
  getDiseases(cropId?: string): Disease[] {
    return cropId ? this.diseases.filter(d => d.cropId === cropId) : this.diseases;
  }
  getDiseaseById(id: string): Disease | undefined { return this.diseases.find(d => d.id === id); }
  getTreatmentCategories(): TreatmentCategory[] { return this.treatmentCategories; }
  getActiveIngredients(categoryId?: string): ActiveIngredient[] {
    return categoryId ? this.activeIngredients.filter(a => a.categoryId === categoryId) : this.activeIngredients;
  }
  getActiveIngredientById(id: string): ActiveIngredient | undefined {
    return this.activeIngredients.find(a => a.id === id);
  }
  getDoseRule(cropId: string, diseaseId: string): DoseRule | undefined {
    return this.doseRules.find(r => r.cropId === cropId && r.diseaseId === diseaseId);
  }
  getDiagnoses(farmerId?: string): Diagnosis[] {
    return farmerId ? this.diagnoses.filter(d => d.farmerId === farmerId) : this.diagnoses;
  }
  getDiagnosisById(id: string): Diagnosis | undefined {
    return this.diagnoses.find(d => d.id === id);
  }
  saveDiagnosis(diag: Diagnosis): Diagnosis {
    this.diagnoses.unshift(diag);
    return diag;
  }
  updateDiagnosis(id: string, updates: Partial<Diagnosis>): Diagnosis | undefined {
    const idx = this.diagnoses.findIndex(d => d.id === id);
    if (idx !== -1) {
      this.diagnoses[idx] = { ...this.diagnoses[idx], ...updates, updatedAt: new Date().toISOString() };
      return this.diagnoses[idx];
    }
    return undefined;
  }
  getKnowledgeItems(status?: string): KnowledgeItem[] {
    return status ? this.knowledgeItems.filter(k => k.status === status) : this.knowledgeItems;
  }
  saveKnowledgeItem(item: KnowledgeItem): KnowledgeItem {
    this.knowledgeItems.unshift(item);
    return item;
  }
  updateKnowledgeItem(id: string, updates: Partial<KnowledgeItem>): KnowledgeItem | undefined {
    const idx = this.knowledgeItems.findIndex(k => k.id === id);
    if (idx !== -1) {
      this.knowledgeItems[idx] = { ...this.knowledgeItems[idx], ...updates };
      return this.knowledgeItems[idx];
    }
    return undefined;
  }
  getMarketPrices(): MarketPrice[] { return this.marketPrices; }
  refreshMarketPrices(): MarketPrice[] {
    const timeStr = `আজ ${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}`;
    this.marketPrices = this.marketPrices.map(item => {
      // Simulate minor daily market fluctuation
      const rand = Math.random();
      const newTrend: 'UP' | 'DOWN' | 'STABLE' = rand > 0.65 ? 'UP' : rand < 0.3 ? 'DOWN' : 'STABLE';
      return {
        ...item,
        trend: newTrend,
        lastUpdatedBn: timeStr
      };
    });
    return this.marketPrices;
  }
  getIncentives(): IncentivePackage[] { return this.incentives; }
  getGovernmentUpdates(): GovernmentUpdate[] { return this.governmentUpdates; }
  getAuditLogs(): AuditLog[] { return this.auditLogs; }
  logAudit(actorId: string, actorName: string, actorRole: Role, action: string, entity: string, entityId: string, details: string, ip: string = '127.0.0.1') {
    const log: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actorId,
      actorName,
      actorRole,
      action,
      entity,
      entityId,
      details,
      ip,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    };
    this.auditLogs.unshift(log);
  }
  getNotifications(userId: string): NotificationItem[] {
    return this.notifications.filter(n => n.userId === userId);
  }
  addCrop(crop: Crop): Crop {
    this.crops.push(crop);
    return crop;
  }
  addDisease(disease: Disease): Disease {
    this.diseases.push(disease);
    return disease;
  }
  addIncentive(incentive: IncentivePackage): IncentivePackage {
    this.incentives.unshift(incentive);
    return incentive;
  }
  addMarketPrice(price: MarketPrice): MarketPrice {
    this.marketPrices.unshift(price);
    return price;
  }
  addAgricultureOffice(office: AgricultureOffice): AgricultureOffice {
    const existingIndex = this.offices.findIndex(o => 
      o.id === office.id || 
      (o.upazilaId && office.upazilaId && o.upazilaId === office.upazilaId) ||
      (o.nameBn && office.nameBn && o.nameBn === office.nameBn) ||
      (office.upazilaNameBn && o.nameBn.includes(office.upazilaNameBn))
    );
    if (existingIndex !== -1) {
      this.offices[existingIndex] = { ...this.offices[existingIndex], ...office };
      return this.offices[existingIndex];
    } else {
      this.offices.unshift(office);
      return office;
    }
  }
  addNotification(userId: string, titleBn: string, messageBn: string, type: NotificationItem['type'], linkUrl?: string) {
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId,
      titleBn,
      messageBn,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
      linkUrl
    };
    this.notifications.unshift(notif);
  }

  // Dealers Management & Monetization API
  getDealers(query?: { upazila?: string, district?: string, type?: string }): AgriDealer[] {
    let result = this.dealers;
    if (query?.upazila && query.upazila !== 'ALL') {
      result = result.filter(d => d.upazilaNameBn.includes(query.upazila!) || query.upazila!.includes(d.upazilaNameBn));
    }
    if (query?.district && query.district !== 'ALL') {
      result = result.filter(d => d.districtNameBn.includes(query.district!) || query.district!.includes(d.districtNameBn));
    }
    if (query?.type && query.type !== 'ALL') {
      result = result.filter(d => d.dealerType === query.type);
    }
    // Sponsored / Gold / Silver dealers at top
    return [...result].sort((a, b) => (b.isFeaturedSponsored ? 1 : 0) - (a.isFeaturedSponsored ? 1 : 0));
  }

  addDealer(dealer: AgriDealer): AgriDealer {
    this.dealers.unshift(dealer);
    return dealer;
  }

  updateDealer(id: string, updates: Partial<AgriDealer>): AgriDealer | null {
    const idx = this.dealers.findIndex(d => d.id === id);
    if (idx !== -1) {
      this.dealers[idx] = { ...this.dealers[idx], ...updates };
      return this.dealers[idx];
    }
    return null;
  }

  deleteDealer(id: string): boolean {
    const initialLen = this.dealers.length;
    this.dealers = this.dealers.filter(d => d.id !== id);
    return this.dealers.length < initialLen;
  }

  // Farmer Crop Marketplace (Krishi Haat)
  getMarketplaceListings(query?: { cropCategory?: string, upazila?: string }): MarketplaceCropListing[] {
    let result = this.marketplaceListings;
    if (query?.cropCategory && query.cropCategory !== 'ALL') {
      result = result.filter(l => l.cropCategoryBn.includes(query.cropCategory!) || query.cropCategory!.includes(l.cropCategoryBn));
    }
    if (query?.upazila && query.upazila !== 'ALL') {
      result = result.filter(l => l.upazilaNameBn.includes(query.upazila!) || query.upazila!.includes(l.upazilaNameBn));
    }
    return result;
  }

  addMarketplaceListing(listing: MarketplaceCropListing): MarketplaceCropListing {
    this.marketplaceListings.unshift(listing);
    return listing;
  }

  updateMarketplaceListingStatus(id: string, status: MarketplaceCropListing['status']): boolean {
    const item = this.marketplaceListings.find(l => l.id === id);
    if (item) {
      item.status = status;
      return true;
    }
    return false;
  }

  deleteMarketplaceListing(id: string): boolean {
    const initialLen = this.marketplaceListings.length;
    this.marketplaceListings = this.marketplaceListings.filter(l => l.id !== id);
    return this.marketplaceListings.length < initialLen;
  }

  // Union & Agricultural Block Management API
  getBlocksForUpazila(upazilaId?: string, upazilaNameBn?: string): Union[] {
    const targetUpzId = upazilaId || 'upz-dist-chattogram-banshkhali';
    const office = this.offices.find(o => 
      o.upazilaId === targetUpzId || 
      o.id === targetUpzId || 
      o.id === `off-${targetUpzId}` ||
      (upazilaNameBn && o.nameBn.includes(upazilaNameBn)) ||
      (!upazilaId && o.nameBn.includes('বাঁশখালী'))
    );
    if (office && office.unions && office.unions.length > 0) {
      return office.unions;
    }
    return this.getUnions(targetUpzId);
  }

  addOrUpdateUnionBlock(upazilaId: string, blockData: Partial<Union>): Union {
    let office = this.offices.find(o => 
      o.upazilaId === upazilaId || 
      o.id === upazilaId || 
      o.id === `off-${upazilaId}` ||
      o.nameBn.includes('বাঁশখালী')
    );
    if (!office) {
      office = this.offices[0];
    }
    if (!office.unions) {
      office.unions = [];
    }

    const blockId = blockData.id || `uni-block-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const existingIdx = office.unions.findIndex(u => u.id === blockId);

    const fullBlock: Union = {
      id: blockId,
      upazilaId: office.upazilaId || upazilaId,
      districtId: office.districtId || 'dist-chattogram',
      nameBn: blockData.nameBn || 'ইউনিয়ন',
      nameEn: blockData.nameEn || blockData.nameBn || 'Union Block',
      blockNameBn: blockData.blockNameBn || `${blockData.nameBn || 'ইউনিয়ন'} কৃষি ব্লক`,
      saaoNameBn: blockData.saaoNameBn || 'দায়িত্বপ্রাপ্ত কর্মকর্তা',
      saaoMobile: blockData.saaoMobile || '০১৭০০-০০০০০০',
      centerAddressBn: blockData.centerAddressBn || `${blockData.nameBn} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`,
      mainCropsBn: blockData.mainCropsBn || 'উফশী ধান ও মৌসুমি শাকসবজি'
    };

    if (existingIdx !== -1) {
      office.unions[existingIdx] = { ...office.unions[existingIdx], ...fullBlock };
      return office.unions[existingIdx];
    } else {
      office.unions.unshift(fullBlock);
      return fullBlock;
    }
  }

  deleteUnionBlock(upazilaId: string, blockId: string): boolean {
    const office = this.offices.find(o => 
      o.upazilaId === upazilaId || 
      o.id === upazilaId || 
      o.id === `off-${upazilaId}` ||
      o.nameBn.includes('বাঁশখালী')
    );
    if (office && office.unions) {
      const initLen = office.unions.length;
      office.unions = office.unions.filter(u => u.id !== blockId);
      return office.unions.length < initLen;
    }
    return false;
  }

  // 14.6. Auto-Sync Live Government Agricultural Bulletins (DAE / AIS / MOA Feed)
  syncGovernmentAgriBulletins(): { newCount: number; lastSyncedAt: string; incentives: IncentivePackage[] } {
    const nowBn = new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
    const additionalNotices: IncentivePackage[] = [
      {
        id: 'inc-auto-sync-cyclone',
        titleBn: 'উপকূলীয় চরাঞ্চলে রবি শস্য সুরক্ষা ও আকস্মিক দুর্যোগ পুনর্বাসন সার-বীজ সহায়তা স্কিম',
        seasonBn: 'রবি ও খরিপ মৌসুম ২০২৬',
        ministryBn: 'কৃষি মন্ত্রণালয় ও দুর্যোগ ব্যবস্থাপনা অধিদপ্তর',
        departmentBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE)',
        category: 'DISASTER_RELIEF',
        benefitsBn: [
          'বন্যা, জলোচ্ছ্বাস ও লবণাক্ততা প্রবণ উপকূলীয় প্রতি কৃষকে ১০ কেজি ডিএপি ও ১০ কেজি পটাশ সার',
          'বিনামূল্যে উচ্চফলনশীল শীতকালীন শাকসবজি বীজ ও পলিথিন মালচিং শিট বিতরণ',
          'উপকূলীয় কৃষি আবহাওয়া পর্যবেক্ষণ ও সরাসরি মোবাইলে এসএমএস সতর্কতা প্রদান'
        ],
        eligibilityBn: [
          'উপকূলীয় বাঁশখালী (বাহারছড়া, সরল, গণ্ডামারা, শেখেরখীল, ছনুয়া) ও উপকূলীয় অঞ্চলের কৃষক',
          'স্থানীয় উপসহকারী কৃষি কর্মকর্তা (SAAO) দ্বারা যাচাইকৃত সক্রিয় চাষী'
        ],
        requiredDocsBn: [
          'জাতীয় পরিচয়পত্র ও ডিজিটাল কৃষক আইডি কার্ড',
          'ইউনিয়ন পরিষদের চেয়ারম্যান বা মেম্বার কর্তৃক সুপারিশপত্র'
        ],
        applicationStepsBn: [
          '১️⃣ স্ব স্ব ব্লকের উপসহকারী কৃষি কর্মকর্তা (SAAO)-র কাছে তালিকাভুক্তি যাচাই করুন।',
          '২️⃣ ইউনিয়ন কৃষি পুনর্বাসন তালিকায় নাম আছে কিনা নিশ্চিত হোন।',
          '৩️⃣ নির্ধারিত তারিখে ইউনিয়ন পরিষদ সেবা কেন্দ্র থেকে উপকরণ বুঝে নিন।'
        ],
        applicationDeadlineBn: 'চলতি মাসের ৩০ তারিখ পর্যন্ত (জরুরি পুনর্বাসন স্কিম)',
        allocationStatusBn: 'সরকারি সার্কুলার মোতাবেক সরাসরি ইউনিয়ন পরিষদে বিতরণ',
        distributionVenuesBn: ['ইউনিয়ন পরিষদ প্রাঙ্গণ ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র'],
        hotline: '১৬১২৩ (কৃষি কল সেন্টার)',
        contactOfficerBn: 'উপজেলা কৃষি কর্মকর্তা, বাঁশখালী ও সংশ্লিষ্ট ইউনিয়ন SAAO',
        isActive: true
      }
    ];

    let newCount = 0;
    for (const notice of additionalNotices) {
      if (!this.incentives.some(inc => inc.titleBn === notice.titleBn || inc.id === notice.id)) {
        this.incentives.unshift(notice);
        newCount++;
      }
    }

    return {
      newCount,
      lastSyncedAt: nowBn,
      incentives: this.incentives
    };
  }

  // Broadcast Notice to all Farmers and Dealers (SMS & In-App Notification)
  broadcastNoticeToUsers(noticeTitle: string, noticeDetails: string): number {
    const timeNow = new Date().toISOString();
    let sentCount = 0;
    for (const u of this.users) {
      this.notifications.unshift({
        id: `notif-broadcast-${Date.now()}-${u.id}`,
        userId: u.id,
        titleBn: `📢 সরকারি কৃষি নোটিশ: ${noticeTitle.slice(0, 50)}...`,
        messageBn: noticeDetails,
        type: 'GOVERNMENT_NOTICE',
        isRead: false,
        createdAt: timeNow,
        linkUrl: '/incentives'
      });
      sentCount++;
    }
    return sentCount;
  }
}

export const db = new AgriCareDatabase();
