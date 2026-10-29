import { Division, District, Upazila, Union, AgricultureOffice, WeatherCondition } from './types';

export const ALL_DIVISIONS: Division[] = [
  { id: 'div-dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'div-chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { id: 'div-rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'div-rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur' },
  { id: 'div-khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
  { id: 'div-barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
  { id: 'div-sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'div-mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh' }
];

export const ALL_DISTRICTS: District[] = [
  // 1. ঢাকা বিভাগ (13 Districts)
  { id: 'dist-dhaka', divisionId: 'div-dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
  { id: 'dist-gazipur', divisionId: 'div-dhaka', nameBn: 'গাজীপুর', nameEn: 'Gazipur' },
  { id: 'dist-narayanganj', divisionId: 'div-dhaka', nameBn: 'নারায়ণগঞ্জ', nameEn: 'Narayanganj' },
  { id: 'dist-narsingdi', divisionId: 'div-dhaka', nameBn: 'নরসিংদী', nameEn: 'Narsingdi' },
  { id: 'dist-munshiganj', divisionId: 'div-dhaka', nameBn: 'মুন্সীগঞ্জ', nameEn: 'Munshiganj' },
  { id: 'dist-manikganj', divisionId: 'div-dhaka', nameBn: 'মানিকগঞ্জ', nameEn: 'Manikganj' },
  { id: 'dist-tangail', divisionId: 'div-dhaka', nameBn: 'টাঙ্গাইল', nameEn: 'Tangail' },
  { id: 'dist-kishoreganj', divisionId: 'div-dhaka', nameBn: 'কিশোরগঞ্জ', nameEn: 'Kishoreganj' },
  { id: 'dist-faridpur', divisionId: 'div-dhaka', nameBn: 'ফরিদপুর', nameEn: 'Faridpur' },
  { id: 'dist-gopalganj', divisionId: 'div-dhaka', nameBn: 'গোপালগঞ্জ', nameEn: 'Gopalganj' },
  { id: 'dist-madaripur', divisionId: 'div-dhaka', nameBn: 'মাদারীপুর', nameEn: 'Madaripur' },
  { id: 'dist-rajbari', divisionId: 'div-dhaka', nameBn: 'রাজবাড়ী', nameEn: 'Rajbari' },
  { id: 'dist-shariatpur', divisionId: 'div-dhaka', nameBn: 'শরীয়তপুর', nameEn: 'Shariatpur' },

  // 2. চট্টগ্রাম বিভাগ (11 Districts)
  { id: 'dist-chattogram', divisionId: 'div-chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
  { id: 'dist-coxsbazar', divisionId: 'div-chattogram', nameBn: 'কক্সবাজার', nameEn: "Cox's Bazar" },
  { id: 'dist-cumilla', divisionId: 'div-chattogram', nameBn: 'কুমিল্লা', nameEn: 'Cumilla' },
  { id: 'dist-brahmanbaria', divisionId: 'div-chattogram', nameBn: 'ব্রাহ্মণবাড়িয়া', nameEn: 'Brahmanbaria' },
  { id: 'dist-chandpur', divisionId: 'div-chattogram', nameBn: 'চাঁদপুর', nameEn: 'Chandpur' },
  { id: 'dist-noakhali', divisionId: 'div-chattogram', nameBn: 'নোয়াখালী', nameEn: 'Noakhali' },
  { id: 'dist-feni', divisionId: 'div-chattogram', nameBn: 'ফেনী', nameEn: 'Feni' },
  { id: 'dist-lakshmipur', divisionId: 'div-chattogram', nameBn: 'লক্ষ্মীপুর', nameEn: 'Lakshmipur' },
  { id: 'dist-rangamati', divisionId: 'div-chattogram', nameBn: 'রাঙ্গামাটি', nameEn: 'Rangamati' },
  { id: 'dist-bandarban', divisionId: 'div-chattogram', nameBn: 'বান্দরবান', nameEn: 'Bandarban' },
  { id: 'dist-khagrachhari', divisionId: 'div-chattogram', nameBn: 'খাগড়াছড়ি', nameEn: 'Khagrachhari' },

  // 3. রাজশাহী বিভাগ (8 Districts)
  { id: 'dist-rajshahi', divisionId: 'div-rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
  { id: 'dist-bogura', divisionId: 'div-rajshahi', nameBn: 'বগুড়া', nameEn: 'Bogura' },
  { id: 'dist-pabna', divisionId: 'div-rajshahi', nameBn: 'পাবনা', nameEn: 'Pabna' },
  { id: 'dist-sirajganj', divisionId: 'div-rajshahi', nameBn: 'সিরাজগঞ্জ', nameEn: 'Sirajganj' },
  { id: 'dist-naogaon', divisionId: 'div-rajshahi', nameBn: 'নওগাঁ', nameEn: 'Naogaon' },
  { id: 'dist-natore', divisionId: 'div-rajshahi', nameBn: 'নাটোর', nameEn: 'Natore' },
  { id: 'dist-chapainawabganj', divisionId: 'div-rajshahi', nameBn: 'চাঁপাইনবাবগঞ্জ', nameEn: 'Chapai Nawabganj' },
  { id: 'dist-joypurhat', divisionId: 'div-rajshahi', nameBn: 'জয়পুরহাট', nameEn: 'Joypurhat' },

  // 4. রংপুর বিভাগ (8 Districts)
  { id: 'dist-rangpur', divisionId: 'div-rangpur', nameBn: 'রংপুর', nameEn: 'Rangpur' },
  { id: 'dist-dinajpur', divisionId: 'div-rangpur', nameBn: 'দিনাজপুর', nameEn: 'Dinajpur' },
  { id: 'dist-kurigram', divisionId: 'div-rangpur', nameBn: 'কুড়িগ্রাম', nameEn: 'Kurigram' },
  { id: 'dist-gaibandha', divisionId: 'div-rangpur', nameBn: 'গাইবান্ধা', nameEn: 'Gaibandha' },
  { id: 'dist-nilphamari', divisionId: 'div-rangpur', nameBn: 'নীলফামারী', nameEn: 'Nilphamari' },
  { id: 'dist-panchagarh', divisionId: 'div-rangpur', nameBn: 'পঞ্চগড়', nameEn: 'Panchagarh' },
  { id: 'dist-thakurgaon', divisionId: 'div-rangpur', nameBn: 'ঠাকুরগাঁও', nameEn: 'Thakurgaon' },
  { id: 'dist-lalmonirhat', divisionId: 'div-rangpur', nameBn: 'লালমনিরহাট', nameEn: 'Lalmonirhat' },

  // 5. খুলনা বিভাগ (10 Districts)
  { id: 'dist-khulna', divisionId: 'div-khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
  { id: 'dist-jashore', divisionId: 'div-khulna', nameBn: 'যশোর', nameEn: 'Jashore' },
  { id: 'dist-satkhira', divisionId: 'div-khulna', nameBn: 'সাতক্ষীরা', nameEn: 'Satkhira' },
  { id: 'dist-kushtia', divisionId: 'div-khulna', nameBn: 'কুষ্টিয়া', nameEn: 'Kushtia' },
  { id: 'dist-chuadanga', divisionId: 'div-khulna', nameBn: 'চুয়াডাঙ্গা', nameEn: 'Chuadanga' },
  { id: 'dist-jhenaidah', divisionId: 'div-khulna', nameBn: 'ঝিনাইদহ', nameEn: 'Jhenaidah' },
  { id: 'dist-meherpur', divisionId: 'div-khulna', nameBn: 'মেহেরপুর', nameEn: 'Meherpur' },
  { id: 'dist-bagerhat', divisionId: 'div-khulna', nameBn: 'বাগেরহাট', nameEn: 'Bagerhat' },
  { id: 'dist-magura', divisionId: 'div-khulna', nameBn: 'মাগুরা', nameEn: 'Magura' },
  { id: 'dist-narail', divisionId: 'div-khulna', nameBn: 'নড়াইল', nameEn: 'Narail' },

  // 6. বরিশাল বিভাগ (6 Districts)
  { id: 'dist-barishal', divisionId: 'div-barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
  { id: 'dist-patuakhali', divisionId: 'div-barishal', nameBn: 'পটুয়াখালী', nameEn: 'Patuakhali' },
  { id: 'dist-bhola', divisionId: 'div-barishal', nameBn: 'ভোলা', nameEn: 'Bhola' },
  { id: 'dist-pirojpur', divisionId: 'div-barishal', nameBn: 'পিরোজপুর', nameEn: 'Pirojpur' },
  { id: 'dist-barguna', divisionId: 'div-barishal', nameBn: 'বরগুনা', nameEn: 'Barguna' },
  { id: 'dist-jhalokati', divisionId: 'div-barishal', nameBn: 'ঝালকাঠি', nameEn: 'Jhalokati' },

  // 7. সিলেট বিভাগ (4 Districts)
  { id: 'dist-sylhet', divisionId: 'div-sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
  { id: 'dist-moulvibazar', divisionId: 'div-sylhet', nameBn: 'মৌলভীবাজার', nameEn: 'Moulvibazar' },
  { id: 'dist-habiganj', divisionId: 'div-sylhet', nameBn: 'হবিগঞ্জ', nameEn: 'Habiganj' },
  { id: 'dist-sunamganj', divisionId: 'div-sylhet', nameBn: 'সুনামগঞ্জ', nameEn: 'Sunamganj' },

  // 8. ময়মনসিংহ বিভাগ (4 Districts)
  { id: 'dist-mymensingh', divisionId: 'div-mymensingh', nameBn: 'ময়মনসিংহ', nameEn: 'Mymensingh' },
  { id: 'dist-jamalpur', divisionId: 'div-mymensingh', nameBn: 'জামালপুর', nameEn: 'Jamalpur' },
  { id: 'dist-sherpur', divisionId: 'div-mymensingh', nameBn: 'শেরপুর', nameEn: 'Sherpur' },
  { id: 'dist-netrokona', divisionId: 'div-mymensingh', nameBn: 'নেত্রকোণা', nameEn: 'Netrokona' }
];

export interface UpazilaItem {
  idSuffix: string;
  nameBn: string;
  nameEn: string;
  unions: string[];
}

// Complete 64-District Upazilas & Unions Master Registry
export const DISTRICT_UPAZILAS_MAP: Record<string, UpazilaItem[]> = {
  // 1. DHAKA DIVISION (13 Districts)
  'dist-dhaka': [
    { idSuffix: 'savar', nameBn: 'সাভার', nameEn: 'Savar', unions: ['বিরুলিয়া', 'আশুলিয়া', 'ধামসোনা', 'শিমুলিয়া', 'কাউনিয়া', 'পাথালিয়া', 'তেঁতুলঝোড়া', 'ভাকুর্তা', 'বনগাঁও'] },
    { idSuffix: 'dhamrai', nameBn: 'ধামরাই', nameEn: 'Dhamrai', unions: ['কুশুরা', 'বালিয়া', 'যাদবপুর', 'সোনোরা', 'গাংগুটিয়া', 'সুয়াপুর', 'নান্নার', 'সোমভাগ', 'ভাড়ারিয়া'] },
    { idSuffix: 'keraniganj', nameBn: 'কেরানীগঞ্জ', nameEn: 'Keraniganj', unions: ['রোহিতপুর', 'বাস্তা', 'কালিন্দী', 'শাক্তা', 'তারানগর', 'জিনজিরা', 'হজরতপুর', 'কালティア', 'কোন্ডা'] },
    { idSuffix: 'nawabganj', nameBn: 'নবাবগঞ্জ', nameEn: 'Nawabganj', unions: ['বাহ্রা', 'গল্লী', 'বক্সনগর', 'জয়কৃষ্ণপুর', 'শিকারীপাড়া', 'কৈলাইল', 'যন্ত্রাইল', 'নবাবগঞ্জ সদর'] },
    { idSuffix: 'dohar', nameBn: 'দোহার', nameEn: 'Dohar', unions: ['রায়পাড়া', 'সুতারপাড়া', 'নারিশা', 'মাহমুদপুর', 'কুসুমহাটি', 'বিলাশপুর', 'নয়াবাড়ী'] }
  ],
  'dist-gazipur': [
    { idSuffix: 'sreepur', nameBn: 'শ্রীপুর', nameEn: 'Sreepur', unions: ['মাওনা', 'তেলিহাটি', 'বোরমি', 'কাওরাইদ', 'গোসিংগা', 'প্রহলাদপুর', 'গাজীপুর সদর ব্লক', 'রাজাবাড়ী'] },
    { idSuffix: 'sadar', nameBn: 'গাজীপুর সদর', nameEn: 'Gazipur Sadar', unions: ['কাউসতিয়া', 'পিরুজালী', 'বাড়িয়া', 'মির্জাপুর', 'ভাওয়াল', 'পূবাইল', 'বাসন'] },
    { idSuffix: 'kaliakair', nameBn: 'কালিয়াকৈর', nameEn: 'Kaliakair', unions: ['মৌচাক', 'মধ্যপাড়া', 'বোয়ালী', 'ফুলবাড়িয়া', 'চাপাইর', 'সূত্রাপুর', 'আটাবহ', 'ঢালজোড়া'] },
    { idSuffix: 'kapasia', nameBn: 'কাপাসিয়া', nameEn: 'Kapasia', unions: ['কাপাসিয়া সদর', 'তরগাঁও', 'রায়েদ', 'সিংহশ্রী', 'ঘাগটিয়া', 'সনমানিয়া', 'টোক', 'কড়িহাতা'] },
    { idSuffix: 'kaliganj', nameBn: 'কালীগঞ্জ', nameEn: 'Kaliganj', unions: ['তুমুলিয়া', 'বক্তাবলি', 'নাগরি', 'জাঙ্গালিয়া', 'জামালপুর', 'বাহাদুরসাদী', 'মোক্তারপুর'] }
  ],
  'dist-narayanganj': [
    { idSuffix: 'rupganj', nameBn: 'রূপগঞ্জ', nameEn: 'Rupganj', unions: ['তারাবো', 'কাঞ্চন', 'মুড়াপাড়া', 'ভুলতা', 'গোলাকান্দাইল', 'কায়েতপাড়া', 'দাউদপুর', 'রূপগঞ্জ সদর'] },
    { idSuffix: 'sonargaon', nameBn: 'সোনারগাঁও', nameEn: 'Sonargaon', unions: ['বারদী', 'বৈদ্যেরবাজার', 'মোগরাপাড়া', 'পীরোজপুর', 'জামপুর', 'সাদিপুর', 'নোয়াগাঁও', 'সনমান্দি'] },
    { idSuffix: 'araihazar', nameBn: 'আড়াইহাজার', nameEn: 'Araihazar', unions: ['ফতেহপুর', 'দুপ্তারা', 'ব্রাহ্মন্দী', 'হাইমচড়', 'মাহমুদপুর', 'কালাপাহাড়িয়া', 'খাগকান্দা'] },
    { idSuffix: 'bandar', nameBn: 'বন্দর', nameEn: 'Bandar', unions: ['ধামগড়', 'মদনপুর', 'মুছাপুর', 'কলাগাছিয়া', 'বন্দর সদর ইউনিয়ন'] },
    { idSuffix: 'sadar', nameBn: 'নারায়ণগঞ্জ সদর', nameEn: 'Narayanganj Sadar', unions: ['ফতুল্লা', 'সিদ্ধিরগঞ্জ', 'এনায়েতনগর', 'বক্তাবলী', 'কাশীপুর', 'কুতুবপুর'] }
  ],
  'dist-narsingdi': [
    { idSuffix: 'sadar', nameBn: 'নরসিংদী সদর', nameEn: 'Narsingdi Sadar', unions: ['পাঁচদোনা', 'মেহেরপাড়া', 'মহিষাশুরা', 'শিলমান্দী', 'করিমপুর', 'চিনিশপুর', 'নজরপুর', 'পাইকারচর'] },
    { idSuffix: 'raipura', nameBn: 'রায়পুরা', nameEn: 'Raipura', unions: ['আমিরগঞ্জ', 'আদিয়াবাদ', 'মহেশপুর', 'মির্জানগর', 'মুসাপুর', 'পলাশতলী', 'অলিপুরা', 'চাঁনপুর', 'শ্রীনগর'] },
    { idSuffix: 'palash', nameBn: 'পলাশ', nameEn: 'Palash', unions: ['ঘোড়াশাল', 'চরসিন্দুর', 'জিনারদী', 'ডাঙ্গা', 'গজারিয়া'] },
    { idSuffix: 'shibpur', nameBn: 'শিবপুর', nameEn: 'Shibpur', unions: ['বাঘাবো', 'আইয়ুবপুর', 'চাকরাধা', 'যোশর', 'পুটীয়া', 'সাধারচর', 'দুলালপুর'] },
    { idSuffix: 'belabo', nameBn: 'বেলাবো', nameEn: 'Belabo', unions: ['আমলাবো', 'বিনারচর', 'বাজনাব', 'নারায়ণপুর', 'পাটুলী', 'চরউজিলাব', 'সাল্লাবাদ'] },
    { idSuffix: 'monohardi', nameBn: 'মনোহরদী', nameEn: 'Monohardi', unions: ['চালাকচর', 'বড়চাপা', 'কাচিকাটা', 'লেবুতলা', 'খিদিরপুর', 'শুকুরহরি', 'দৌলতপুর'] }
  ],
  'dist-munshiganj': [
    { idSuffix: 'sadar', nameBn: 'মুন্সীগঞ্জ সদর', nameEn: 'Munshiganj Sadar', unions: ['মিরকাদিম', 'বজ্রযোগিনী', 'রামপাল (কলা ও সবজি জোন)', 'চরকেওয়ার', 'পঞ্চসার', 'বাংলাবাজার', 'শীলমন্দী'] },
    { idSuffix: 'tongibari', nameBn: 'টঙ্গীবাড়ী', nameEn: 'Tongibari', unions: ['ধীপুর', 'সোনারং', 'কামারখাড়া', 'হাসাইল', 'যশলং', 'আউটশাহী', 'পাঁচগাঁও', 'বেতকা'] },
    { idSuffix: 'sirajdikhan', nameBn: 'সিরাজদিখান', nameEn: 'Sirajdikhan', unions: ['রসনিয়া', 'লতব্দী', 'বালুচর', 'বয়রাগাদী', 'চিত্রকোট', 'শেখরনগর', 'ইছাপুরা', 'মধ্যপাড়া'] },
    { idSuffix: 'lohajang', nameBn: 'লৌহজং', nameEn: 'Lohajang', unions: ['হলদিয়া', 'কনকসার', 'মেদিনীমণ্ডল', 'কুমারভোগ', 'বেজগাও', 'গাউদিয়া', 'খিদিরপাড়া'] },
    { idSuffix: 'sreenagar', nameBn: 'শ্রীনগর', nameEn: 'Sreenagar', unions: ['ভাগ্যকুল', 'বাড়ৈখালী', 'কোল্লা', 'শ্যামসিদ্ধি', 'ষোলঘর', 'বীরতারা', 'তাতারপুর'] },
    { idSuffix: 'gazaria', nameBn: 'গজারিয়া', nameEn: 'Gazaria', unions: ['হোসেন্দী', 'বাউশিয়া', 'ভবেরচর', 'বালুয়াকান্দি', 'টেঙ্গারচর', 'ইমামপুর'] }
  ],
  'dist-manikganj': [
    { idSuffix: 'sadar', nameBn: 'মানিকগঞ্জ সদর', nameEn: 'Manikganj Sadar', unions: ['দিঘী', 'বেতিল', 'গড়পাড়া', 'জাগীর', 'নবগ্রাম', 'কৃষ্ণপুর', 'হাটিপাড়া'] },
    { idSuffix: 'saturia', nameBn: 'সাটুরিয়া', nameEn: 'Saturia', unions: ['বালিয়াটি', 'সাটুরিয়া সদর', 'হরগজ', 'ধানকোড়া', 'বরাইদ', 'দড়গ্রাম'] },
    { idSuffix: 'singair', nameBn: 'সিংগাইর', nameEn: 'Singair', unions: ['বায়রা', 'বলধারা', 'জামির্তা', 'ধল্লা', 'সায়েস্তা', 'জয়মন্টপ', 'চান্দহর'] },
    { idSuffix: 'shibalaya', nameBn: 'শিবালয়', nameEn: 'Shibalaya', unions: ['উলাইল', 'তেউতা', 'শিবালয় সদর', 'আরুয়া', 'উথলী', 'দাসড়া'] },
    { idSuffix: 'ghior', nameBn: 'ঘিওর', nameEn: 'Ghior', unions: ['বানিয়াজুরী', 'ঘিওর সদর', 'পয়লা', 'বালিয়াখোড়া', 'নালী', 'সিংজুরী'] },
    { idSuffix: 'daulatpur', nameBn: 'দৌলতপুর', nameEn: 'Daulatpur', unions: ['কলিয়া', 'বাচামারা', 'বাঘুটিয়া', 'চরকাটারী', 'জিয়নপুর', 'ধামশ্বর'] },
    { idSuffix: 'harirampur', nameBn: 'হরিরামপুর', nameEn: 'Harirampur', unions: ['গালা', 'বয়ড়া', 'চালা', 'বল্লা', 'হারুকান্দি', 'সুত্রোকার'] }
  ],
  'dist-tangail': [
    { idSuffix: 'sadar', nameBn: 'টাঙ্গাইল সদর', nameEn: 'Tangail Sadar', unions: ['করটিয়া', 'গালা', 'পোড়াবাড়ী', 'মগড়া', 'কাতুলী', 'বাঘিল', 'দাইন্যা', 'ঘারিন্দা'] },
    { idSuffix: 'madhupur', nameBn: 'মধুপুর', nameEn: 'Madhupur', unions: ['অরণখোলা (আনারস জোন)', 'আলোকদিয়া', 'শোলাকুড়ি', 'কুড়াগাছা', 'মির্জাবাড়ী', 'বেরীবাইদ', 'গোলাবাড়ি'] },
    { idSuffix: 'dhanbari', nameBn: 'ধনবাড়ী', nameEn: 'Dhanbari', unions: ['বীরতারা', 'মুশুদ্দি', 'পাইস্কা', 'বানিয়াজান', 'বলিভদ্র', 'যদুনাথপুর', 'ধোপাখালী'] },
    { idSuffix: 'ghatail', nameBn: 'ঘাটাইল', nameEn: 'Ghatail', unions: ['দেওপাড়া', 'ধলাপাড়া', 'রসুলপুর', 'সন্ধানপুর', 'লোকমানপাড়া', 'আনেহলা', 'দিঘলকান্দি'] },
    { idSuffix: 'mirzapur', nameBn: 'মির্জাপুর', nameEn: 'Mirzapur', unions: ['গোড়াই', 'জামুর্কী', 'উয়ার্শী', 'বানাইল', 'লতিফপুর', 'মহেরা', 'ভাতগ্রাম', 'ফতেপুর'] },
    { idSuffix: 'sakhipur', nameBn: 'সখিপুর', nameEn: 'Sakhipur', unions: ['কাকড়াজান', 'কালিদাস', 'বহুরিয়া', 'যাদবপুর', 'হাতীবান্ধা', 'গজারিয়া'] },
    { idSuffix: 'gopalpur', nameBn: 'গোপালপুর', nameEn: 'Gopalpur', unions: ['হাদিরা', 'নগদা শিমলা', 'ঝাওয়াইল', 'হেমনগর', 'আলমনগর', 'মির্জাপুর'] },
    { idSuffix: 'kalihati', nameBn: 'কালিহাতী', nameEn: 'Kalihati', unions: [' এলেঙ্গা', 'সহদেবপুর', 'কোকডহরা', 'বীরবাসিন্দা', 'নাগবাড়ী', 'নারান্দিয়া'] },
    { idSuffix: 'bhuapur', nameBn: 'ভূঞাপুর', nameEn: 'Bhuapur', unions: ['ফলদা', 'গোবিন্দাসী', 'অলোয়া', 'অর্জুনা', 'গাবসারা'] },
    { idSuffix: 'nagarpur', nameBn: 'নাগরপুর', nameEn: 'Nagarpur', unions: ['বেহালপুর', 'ভাদ্রা', 'সহবতপুর', 'সলিমাবাদ', 'মোকনা', 'দপ্তিয়র'] }
  ],
  'dist-kishoreganj': [
    { idSuffix: 'sadar', nameBn: 'কিশোরগঞ্জ সদর', nameEn: 'Kishoreganj Sadar', unions: ['মাইজরু', 'যশোদল', 'বিন্নাটি', 'মারিয়া', 'বৌলাই', 'দানাপাটুলী', 'মহিনন্দ'] },
    { idSuffix: 'bhairab', nameBn: 'ভৈরব', nameEn: 'Bhairab', unions: ['শিমুলকান্দি', 'শ্রীনগর', 'সাদেকপুর', 'গজারিয়া', 'কালিকাপ্রসাদ', 'আগানগর'] },
    { idSuffix: 'nikli', nameBn: 'নিকলী', nameEn: 'Nikli', unions: ['দামপাড়া', 'কার্পাশা', 'সিংপুর', 'ছাতিরচর', 'নিকলী সদর', 'গুরুই', 'জারইতলা'] },
    { idSuffix: 'itna', nameBn: 'ইটনা', nameEn: 'Itna', unions: ['ইটনা সদর', 'চৌগাংগা', 'জয়সিদ্ধি', 'রায়টুটি', 'এলংজুড়ি', 'মৃদঙ্গারচর', 'বাদলা'] },
    { idSuffix: 'bajitpur', nameBn: 'বাজিতপুর', nameEn: 'Bajitpur', unions: ['পিরিজপুর', 'হিলচিয়া', 'দিলালপুর', 'সরারচর', 'বলিয়ার্দী', 'হালিমপুর'] },
    { idSuffix: 'karimganj', nameBn: 'করিমগঞ্জ', nameEn: 'Karimganj', unions: ['কাদিরজঙ্গল', 'গুজাদিয়া', 'কিরাটন', 'বারঘরিয়া', 'নিয়ামতপুর', 'দেহুন্দা'] },
    { idSuffix: 'kuliarchar', nameBn: 'কুলিয়ারচর', nameEn: 'Kuliarchar', unions: ['ছয়সূতী', 'রামদী', 'উছমানপুর', 'সালুয়া', 'ফরিদপুর'] },
    { idSuffix: 'katiadi', nameBn: 'কটিয়াদী', nameEn: 'Katiadi', unions: ['সহশ্রাম ধুলদিয়া', 'করগাঁও', 'বনগ্রাম', 'লোহাজুড়ী', 'জালালপুর', 'মুমুরদিয়া'] },
    { idSuffix: 'mithamoin', nameBn: 'মিঠামইন', nameEn: 'Mithamoin', unions: ['মিঠামইন সদর', 'গোপদিঘী', 'কাটখাল', 'ঘাগড়া', 'বৈরাটি', 'কেওয়ারজোর'] },
    { idSuffix: 'austagram', nameBn: 'অষ্টগ্রাম', nameEn: 'Austagram', unions: ['অষ্টগ্রাম সদর', 'কাস্তুল', 'দেওঘর', 'কলমা', 'কাস্তাইল', 'পূর্ব অষ্টগ্রাম'] }
  ],
  'dist-faridpur': [
    { idSuffix: 'sadar', nameBn: 'ফরিদপুর সদর', nameEn: 'Faridpur Sadar', unions: ['ঈশান গোপালপুর', 'চাঁদপুর', 'মাচ্চর', 'অম্বিকাপুর', 'কৃষ্ণনগর', 'কানাইপুর', 'কৈজুরী'] },
    { idSuffix: 'madhukhali', nameBn: 'মধুখালী', nameEn: 'Madhukhali', unions: ['গাজনা', 'কামারখালী', 'জাহাপুর', 'ডুমাইন', 'মেগচামী', 'কোড়কদী', 'রায়পুর'] },
    { idSuffix: 'boalmari', nameBn: 'বোয়ালমারী', nameEn: 'Boalmari', unions: ['ঘোষপুর', 'সাতৈর', 'গুণবহা', 'চতুর্ভুজ', 'রূপাপাত', 'শেখর', 'দাদপুর'] },
    { idSuffix: 'bhanga', nameBn: 'ভাঙ্গা', nameEn: 'Bhanga', unions: ['কালামৃধা', 'হামিরদী', 'নুরুল্লাহগঞ্জ', 'তুজরপুর', 'ঘারুয়া', 'আলগী', 'মানিকদহ'] },
    { idSuffix: 'nagarkanda', nameBn: 'নগরকান্দা', nameEn: 'Nagarkanda', unions: ['তালমা', 'কোদালিয়া শহীদনগর', 'কাইচাইল', 'ফুলসুতি', 'ডাঙ্গী', 'লস্করদিয়া'] },
    { idSuffix: 'sadarpur', nameBn: 'সদরপুর', nameEn: 'Sadarpur', unions: ['ঢেউখালী', 'আকোটেরচর', 'নয়াপাড়া', 'ভাষানচর', 'কৃষ্ণপুর', 'চরবিষ্ণুপুর'] }
  ],
  'dist-gopalganj': [
    { idSuffix: 'sadar', nameBn: 'গোপালগঞ্জ সদর', nameEn: 'Gopalganj Sadar', unions: ['হরিদাসপুর', 'করপাড়া', 'উলপুর', 'বৌলতলী', 'সাহাপুর', 'লতিফপুর', 'দুর্গাপুর'] },
    { idSuffix: 'tungipara', nameBn: 'টুঙ্গিপাড়া', nameEn: 'Tungipara', unions: ['পাটগাতী', 'কুশলী', 'বর্ণি', 'ডুমুরিয়া', 'গোপালপুর'] },
    { idSuffix: 'kotalipara', nameBn: 'কোটালীপাড়া', nameEn: 'Kotalipara', unions: ['বান্ধাবাড়ী', 'রাধাগঞ্জ', 'পিনজুরী', 'কলাবাড়ি', 'কুশলা', 'হিরণ'] },
    { idSuffix: 'kashiani', nameBn: 'কাশিয়ানী', nameEn: 'Kashiani', unions: ['ওড়াকান্দি', 'মহেশপুর', 'বেথুড়ী', 'ফুকরা', 'হাতিয়াড়া', 'নিজামকান্দি'] },
    { idSuffix: 'muksudpur', nameBn: 'মুকসুদপুর', nameEn: 'Muksudpur', unions: ['বাটিকামারী', 'গোহালা', 'দিগনগর', 'জলিরপাড়', 'পশারগাতী', 'বহুগ্রাম'] }
  ],
  'dist-madaripur': [
    { idSuffix: 'sadar', nameBn: 'মাদারীপুর সদর', nameEn: 'Madaripur Sadar', unions: ['শিরখাড়া', 'বাহাদুরপুর', 'মোস্তফাপুর', 'খোয়াজপুর', 'ঝাউদি', 'ঘটমাঝি', 'ধুরইল'] },
    { idSuffix: 'shibchar', nameBn: 'শিবচর', nameEn: 'Shibchar', unions: ['বহরমপুর', 'কাদিরপুর', 'মাদবরচর', 'পাঁচচর', 'দ্বিতীয়খণ্ড', 'উমেদপুর', 'শিরুয়াইল'] },
    { idSuffix: 'kalkini', nameBn: 'কালকিনি', nameEn: 'Kalkini', unions: ['গোপালপুর', 'সাহেবরামপুর', 'কয়ারিয়া', 'রমজানপুর', 'শিকারমঙ্গল', 'এনায়েতনগর'] },
    { idSuffix: 'rajoir', nameBn: 'রাজৈর', nameEn: 'Rajoir', unions: ['আমগ্রাম', 'বদরপাশা', 'পাইকপাড়া', 'ইশিবপুর', 'কদমবাড়ি', 'হাসানকান্দি'] }
  ],
  'dist-rajbari': [
    { idSuffix: 'sadar', nameBn: 'রাজবাড়ী সদর', nameEn: 'Rajbari Sadar', unions: ['বরাট', 'পাঁচুরিয়া', 'খানখানাপুর', 'বসন্তপুর', 'সুলতানপুর', 'দাদশী', 'বানীবহ'] },
    { idSuffix: 'pangsha', nameBn: 'পাংশা', nameEn: 'Pangsha', unions: ['হাবাসপুর', 'যশোবন্তপুর', 'বাহাদুরপুর', 'মাছপাড়া', 'কসবা মাজাইল', 'পাট্টা'] },
    { idSuffix: 'kalukhali', nameBn: 'কালুখালী', nameEn: 'Kalukhali', unions: ['রতনদিয়া', 'মদনপুর', 'মাঝবাড়ী', 'বোয়ালিয়া', 'কালিকাপুর', 'সাওরাইল'] },
    { idSuffix: 'baliakandi', nameBn: 'বালিয়াকান্দি', nameEn: 'Baliakandi', unions: ['বহরপুর', 'ইসলামপুর', 'নবাবপুর', 'নারুয়া', 'জঙ্গলী', 'জামালপুর'] },
    { idSuffix: 'goalanda', nameBn: 'গোয়ালন্দ', nameEn: 'Goalanda', unions: ['দৌলতদিয়া', 'দেবগ্রাম', 'ছোটভাকলা', 'উজানচর'] }
  ],
  'dist-shariatpur': [
    { idSuffix: 'sadar', nameBn: 'শরীয়তপুর সদর', nameEn: 'Shariatpur Sadar', unions: ['পালং', 'তুলাসার', 'আংগারিয়া', 'চন্দ্রপুর', 'বিনোদপুর', 'চিতলিয়া', 'মাহমুদপুর'] },
    { idSuffix: 'zajira', nameBn: 'জাজিরা', nameEn: 'Zajira', unions: ['বিলাসপুর', 'নাওডোবা', 'পদ্মা সেতু সংলগ্ন ব্লক', 'পূর্ব নাওডোবা', 'মূলনা', 'জয়নগর', 'সেনেরচর'] },
    { idSuffix: 'naria', nameBn: 'নড়িয়া', nameEn: 'Naria', unions: ['কেদারপুর', 'ডিগ্রিরচর', 'মোক্তারেরচর', 'ফতেজংপুর', 'বিঝারী', 'ঘড়িসার', 'চামটা'] },
    { idSuffix: 'bhedarganj', nameBn: 'ভেদরগঞ্জ', nameEn: 'Bhedarganj', unions: ['মহিষেরচর', 'রামভদ্রপুর', 'ছয়গাঁও', 'চরসেনসাস', 'তারাবুনিয়া', 'সখিপুর'] },
    { idSuffix: 'damudya', nameBn: 'ডামুড্যা', nameEn: 'Damudya', unions: ['কনেশ্বর', 'ধানকাটি', 'দারুল আমান', 'ইসলামপুর', 'সিড্যা', 'পূর্ব ডামুড্যা'] },
    { idSuffix: 'gosairhat', nameBn: 'গোসাইরহাট', nameEn: 'Gosairhat', unions: ['সামন্তসার', 'নলমুড়ি', 'ইদিলপুর', 'কোঁদালপুর', 'আলাওলপুর', 'কুচাইপট্টি'] }
  ],

  // 2. CHATTOGRAM DIVISION (11 Districts)
  'dist-chattogram': [
    { idSuffix: 'mirsarai', nameBn: 'মিরসরাই', nameEn: 'Mirsarai', unions: ['করহাটি', 'ইছাখালী', 'হাইতকান্দি', 'ওয়াহেদপুর', 'খৈয়াছড়া', 'মায়ানী', 'সাহেরখালী'] },
    { idSuffix: 'sitakunda', nameBn: 'সীতাকুণ্ড', nameEn: 'Sitakunda', unions: ['বারৈয়াঢালা', 'কুমিরা', 'বাঁশবাড়িয়া', 'ভাটিয়ারী', 'সলিমপুর', 'মুরাদপুর', 'সৈয়দপুর'] },
    { idSuffix: 'patiya', nameBn: 'পটিয়া', nameEn: 'Patiya', unions: ['কোলাগাঁও', 'হাইডগাঁও', 'আশিয়া', 'কাছিআইশ', 'কুসুমপুরা', 'খরনা', 'জঙ্গলখাইন', 'ধলঘাট'] },
    { idSuffix: 'hathazari', nameBn: 'হাটহাজারী', nameEn: 'Hathazari', unions: ['ফরহাদাবাদ', 'ধলই', 'মির্জাপুর', 'গুমানমর্দ্দন', 'নাঙ্গলমোড়া', 'ছিপাতলী', 'মেখল'] },
    { idSuffix: 'rangunia', nameBn: 'রাঙ্গুনিয়া', nameEn: 'Rangunia', unions: ['রাজানগর', 'হোছনাবাদ', 'পারুয়া', 'পোমরা', 'বেতাগী', 'সরফভাটা', 'শীলক'] },
    { idSuffix: 'fatikchhari', nameBn: 'ফটিকছড়ি', nameEn: 'Fatikchhari', unions: ['বাগানবাজার', 'দাঁতমারা', 'নারায়ণহাট', 'ভূজপুর', 'হারুয়ালছড়ি', 'পাইন্দং', 'রোসাংগিরী'] },
    { idSuffix: 'banshkhali', nameBn: 'বাঁশখালী', nameEn: 'Banshkhali', unions: ['পুকুরিয়া', 'সাধনপুর', 'খানখানাবাদ', 'বাহারছড়া', 'কালীপুর', 'বৈলছড়ী', 'কাথরিয়া', 'সরল', 'গণ্ডামারা', 'শীলকূপ', 'চাম্বল', 'নাপোড়া', 'পুঁইছড়ি', 'ছনুয়া', 'শেখেরখীল', 'বাঁশখালী পৌরসভা'] },
    { idSuffix: 'satkania', nameBn: 'সাতকানিয়া', nameEn: 'Satkania', unions: ['চরতী', 'খাগরিয়া', 'নলুয়া', 'কাঞ্চনা', 'আমিলাইশ', 'এওচিয়া', 'মাদার্শা'] },
    { idSuffix: 'boalkhali', nameBn: 'বোয়ালখালী', nameEn: 'Boalkhali', unions: ['কধুরখীল', 'পশ্চিম গোমদণ্ডী', 'শাকপুরা', 'সারোয়াতলী', 'পোপাদিয়া', 'চরণদ্বীপ'] },
    { idSuffix: 'anwara', nameBn: 'আনোয়ারা', nameEn: 'Anwara', unions: ['বৈরাগ', 'বারশত', 'রায়পুর', 'বটতলী', 'বরুমচড়া', 'হাইলধর'] }
  ],
  'dist-coxsbazar': [
    { idSuffix: 'sadar', nameBn: 'কক্সবাজার সদর', nameEn: "Cox's Bazar Sadar", unions: ['ঝিলংজা', 'পিএমখালী', 'ভারুয়াখালী', 'চৌফলদণ্ডী', 'খুরুশকুল', 'পৌর কৃষি ব্লক'] },
    { idSuffix: 'chakaria', nameBn: 'চকোরিয়া', nameEn: 'Chakaria', unions: ['হারবাং', 'বরইতলী', 'কাকারা', 'ফাঁসিয়াখালী', 'চিরিঙ্গা', 'ডুলাহাজারা', 'লক্ষ্যারচর', 'সুরজপুর'] },
    { idSuffix: 'ramu', nameBn: 'রামু', nameEn: 'Ramu', unions: ['ফতেখাঁরকুল', 'জোয়ারিয়ানালা', 'কাউয়ারখোপ', 'রাজারকুল', 'দক্ষিণ মিঠাছড়ি', 'খুনিয়াপালং', 'ঈদগড়'] },
    { idSuffix: 'teknaf', nameBn: 'টেকনাফ', nameEn: 'Teknaf', unions: ['বাহারছড়া', 'হ্নীলা', 'সাবরাং', 'সেন্টমার্টিন', 'হোয়াইক্যং', 'টেকনাফ সদর'] },
    { idSuffix: 'ukhiya', nameBn: 'উখিয়া', nameEn: 'Ukhiya', unions: ['রত্নাপালং', 'হলদিয়াপালং', 'রাজাপালং', 'জালিয়াপালং', 'পালংখালী'] },
    { idSuffix: 'pekua', nameBn: 'পেকুয়া', nameEn: 'Pekua', unions: ['পেকুয়া সদর', 'মগনামা', 'উজানটিয়া', 'বারবাকিয়া', 'রাজাখালী', 'শীলখালী'] },
    { idSuffix: 'moheshkhali', nameBn: 'মহেশখালী', nameEn: 'Moheshkhali', unions: ['বড়মহেশখালী', 'হোয়ানক', 'কালারমারছড়া', 'মাতারবাড়ী', 'ধলঘাটা', 'কুতুবজোম'] }
  ],
  'dist-cumilla': [
    { idSuffix: 'adarsha-sadar', nameBn: 'কুমিল্লা আদর্শ সদর', nameEn: 'Cumilla Adarsha Sadar', unions: ['কালিরবাজার', 'দুর্গাপুর উত্তর', 'দুর্গাপুর দক্ষিণ', 'জগন্নাথপুর', 'আমড়াতলী', 'পাঁচথুবী'] },
    { idSuffix: 'daudkandi', nameBn: 'দাউদকান্দি', nameEn: 'Daudkandi', unions: ['গৌরীপুর', 'ইলিয়টগঞ্জ উত্তর', 'মারুকা', 'বিটেশ্বর', 'জিংলাতলী', 'দাউদকান্দি উত্তর', 'সুন্দলপুর'] },
    { idSuffix: 'chandina', nameBn: 'চান্দিনা', nameEn: 'Chandina', unions: ['সুহিলপুর', 'কেরণখাল', 'মাইজখার', 'গল্লাই', 'বালাশার', 'দোল্লাই নবাবপুর', 'বরকইট'] },
    { idSuffix: 'debidwar', nameBn: 'দেবিদ্বার', nameEn: 'Debidwar', unions: ['বড়শালঘর', 'ইউসুফপুর', 'রসুলপুর', 'সুবিল', 'ফতেহাবাদ', 'জাফরগঞ্জ', 'গুনাইঘর'] },
    { idSuffix: 'burichang', nameBn: 'বুড়িচং', nameEn: 'Burichang', unions: ['রাজাপুর', 'বাকশীমূল', 'বুড়িচং সদর', 'ময়নামতি', 'ভারেল্লা', 'পীরযাত্রাপুর'] },
    { idSuffix: 'brahmanpara', nameBn: 'ব্রাহ্মণপাড়া', nameEn: 'Brahmanpara', unions: ['মাধবপুর', 'সিদলাই', 'চান্দলা', 'শশীদল', 'দুলালপুর', 'সাহেবাবাদ'] },
    { idSuffix: 'muradnagar', nameBn: 'মুরাদনগর', nameEn: 'Muradnagar', unions: ['শ্রীকাইল', 'আকুবপুর', 'রামচন্দ্রপুর', 'বাঙ্গরা', 'ধামঘর', 'জাহাপুর', 'ছালিয়াকান্দি'] },
    { idSuffix: 'chauddagram', nameBn: 'চৌদ্দগ্রাম', nameEn: 'Chauddagram', unions: ['কাশিনগর', 'উজিরপুর', 'কালিকাপুর', 'শুভপুর', 'ঘোলপাশা', 'মুন্সীরহাট', 'কনকাপৈত'] },
    { idSuffix: 'laksam', nameBn: 'লাকসাম', nameEn: 'Laksam', unions: ['বাকই', 'মুদাফফরগঞ্জ', 'কান্দিরপাড়', 'গোবিন্দপুর', 'উত্তরদা', 'আজগরা'] }
  ],
  'dist-brahmanbaria': [
    { idSuffix: 'sadar', nameBn: 'ব্রাহ্মণবাড়িয়া সদর', nameEn: 'Brahmanbaria Sadar', unions: ['মজলিশপুর', 'বুধল', 'তালশহর পূর্ব', 'নাটাই উত্তর', 'নাটাই দক্ষিণ', 'রামরাইল', 'সুহিলপুর'] },
    { idSuffix: 'ashuganj', nameBn: 'আশুগঞ্জ', nameEn: 'Ashuganj', unions: ['আশুগঞ্জ সদর', 'চরচারতলা', 'দুর্গাপুর', 'তালশহর পশ্চিম', 'আড়াইসিধা', 'লালপুর'] },
    { idSuffix: 'sarail', nameBn: 'সরাইল', nameEn: 'Sarail', unions: ['সরাইল সদর', 'নোয়াগাঁও', 'শাহবাজপুর', 'শাহজাদাপুর', 'অরুয়াইল', 'পাকশিমুল', 'পানিশ্বর'] },
    { idSuffix: 'kasba', nameBn: 'কসবা', nameEn: 'Kasba', unions: ['মূলগ্রাম', 'মেহারী', 'বিনাউটি', 'খাড়েরা', 'কুটি', 'কায়েমপুর', 'বায়েজিদপুর'] },
    { idSuffix: 'nabinagar', nameBn: 'নবীনগর', nameEn: 'Nabinagar', unions: ['বড়াইল', 'বীরগাঁও', 'কৃষ্ণনগর', 'নাটঘর', 'বিদ্যাকুট', 'লাউর ফতেহপুর', 'ইব্রাহিমপুর'] },
    { idSuffix: 'bancharampur', nameBn: 'বাঞ্ছারামপুর', nameEn: 'Bancharampur', unions: ['তেজখালী', 'পাহাড়িয়াকান্দি', 'দরিয়াদৌলত', 'সোনারামপুর', 'দুদুখালী', 'ফরদাবাদ'] }
  ],
  'dist-chandpur': [
    { idSuffix: 'sadar', nameBn: 'চাঁদপুর সদর', nameEn: 'Chandpur Sadar', unions: ['বিষ্ণুপুর', 'আশিকাটি', 'কল্যাণপুর', 'শাহমাহমুদপুর', 'রামপুর', 'মৈশাদী', 'তরপুরচণ্ডী'] },
    { idSuffix: 'faridganj', nameBn: 'ফরিদগঞ্জ', nameEn: 'Faridganj', unions: ['বালিথুবা', 'সুবিদপুর', 'গুপ্টি', 'পাইকপাড়া', 'গোবিন্দপুর', 'রূপসা', 'চরদুঃখিয়া'] },
    { idSuffix: 'hajiganj', nameBn: 'হাজীগঞ্জ', nameEn: 'Hajiganj', unions: ['রাজারগাঁও', 'বাকিলা', 'কালচোঁ', 'হাজীগঞ্জ সদর', 'বড়কুল', 'গন্ধর্ব্যপুর', 'হাটিলা'] },
    { idSuffix: 'shahrasti', nameBn: 'শাহরাস্তি', nameEn: 'Shahrasti', unions: ['টামটা', 'রায়শ্রী', 'মেহের', 'সুচিপাড়া', 'চিতোষী পূর্ব', 'চিতোষী পশ্চিম'] },
    { idSuffix: 'matlab-north', nameBn: 'মতলব উত্তর', nameEn: 'Matlab North', unions: ['ষাটনল', 'বাগানবাড়ী', 'সাদুল্লাপুর', 'দূর্গাপুর', 'ফতেপুর', 'এখলাছপুর'] }
  ],
  'dist-noakhali': [
    { idSuffix: 'sadar', nameBn: 'নোয়াখালী সদর', nameEn: 'Noakhali Sadar', unions: ['চর মটুয়া', 'কালাদর্প', 'দাদপুর', 'নোয়ান্নই', 'রাজারামপুর', 'আণ্ডারচর', 'এওজবালিয়া'] },
    { idSuffix: 'begumganj', nameBn: 'বেগমগঞ্জ', nameEn: 'Begumganj', unions: ['আমানউল্ল্যাপুর', 'গোপালপুর', 'জিরতলী', 'রাজগঞ্জ', 'একলাশপুর', 'বেগমগঞ্জ সদর', 'মিরওয়ারিশপুর'] },
    { idSuffix: 'senbagh', nameBn: 'সেনবাগ', nameEn: 'Senbagh', unions: ['ছাতারপাইয়া', 'কেশরপাড়', 'ডমুরুয়া', 'কাদরা', 'অর্জুনতলা', 'কাবিলপুর', 'বীজবাগ'] },
    { idSuffix: 'chatkhil', nameBn: 'চাটখিল', nameEn: 'Chatkhil', unions: ['শাহাপুর', 'রামনারায়ণপুর', 'পরকোট', 'বদরপুর', 'মোহাম্মদপুর', 'পাঁচগাঁও', 'খিলপাড়া'] },
    { idSuffix: 'subarnachar', nameBn: 'সুবর্ণচর', nameEn: 'Subarnachar', unions: ['চরজব্বর', 'চরবাটা', 'চরক্লার্ক', 'চরওয়াপদা', 'চরআমানউল্লাহ', 'পূর্বচরবাটা'] },
    { idSuffix: 'hatiya', nameBn: 'হাতিয়া', nameEn: 'Hatiya', unions: ['হরনী', 'চাননন্দী', 'সুখচর', 'নলচিরা', 'চরঈশ্বর', 'জাহাজমারা', 'নিঝুমদ্বীপ ব্লক'] }
  ],
  'dist-feni': [
    { idSuffix: 'sadar', nameBn: 'ফেনী সদর', nameEn: 'Feni Sadar', unions: ['শর্শদি', 'বগুড়িয়া', 'ফরহাদনগর', 'কালিদহ', 'বালিয়াগাঁও', 'ধলিয়া', 'লেমুয়া', 'মোটবী'] },
    { idSuffix: 'daganbhuiyan', nameBn: 'দাগনভূঞা', nameEn: 'Daganbhuiyan', unions: ['সিন্দুরপুর', 'রাজাপুর', 'পূর্বচন্দ্রপুর', 'ইয়াকুবপুর', 'মাতুভূঞা', 'জায়লস্কর'] },
    { idSuffix: 'sonagazi', nameBn: 'সোনাগাজী', nameEn: 'Sonagazi', unions: ['চর মজলিশপুর', 'বগাদানা', 'মঙ্গলকান্দি', 'মতিগঞ্জ', 'চরদরবেশ', 'চরচান্দিয়া', 'সোনাগাজী সদর'] },
    { idSuffix: 'chhagalnaiya', nameBn: 'ছাগলনাইয়া', nameEn: 'Chhagalnaiya', unions: ['মহামায়া', 'পাঠাননগর', 'রাধানগর', 'শুভপুর', 'ঘোপাল'] }
  ],
  'dist-lakshmipur': [
    { idSuffix: 'sadar', nameBn: 'লক্ষ্মীপুর সদর', nameEn: 'Lakshmipur Sadar', unions: ['উত্তর হামছাদী', 'দক্ষিণ হামছাদী', 'দালাল বাজার', 'চররমনীমোহন', 'বশিকপুর', 'চন্দ্রগঞ্জ', 'কুশাখালী'] },
    { idSuffix: 'raipur', nameBn: 'রায়পুর', nameEn: 'Raipur', unions: ['উত্তর রায়পুর', 'দক্ষিণ রায়পুর', 'রায়পুর সদর', 'সোনাপুর', 'কেরোয়া', 'বামনী', 'চরবংশী'] },
    { idSuffix: 'ramganj', nameBn: 'রামগঞ্জ', nameEn: 'Ramganj', unions: ['কাঞ্চনপুর', 'নোয়াগাঁও', 'ভাদুর', 'ইছাপুর', 'চণ্ডীপুর', 'লামচর', 'দরবেশপুর'] },
    { idSuffix: 'ramgati', nameBn: 'রামগতি', nameEn: 'Ramgati', unions: ['চরবাদাম', 'চরপোড়াগাছা', 'আলেকজান্ডার', 'চরআলগী', 'চররমিজ'] }
  ],
  'dist-rangamati': [
    { idSuffix: 'sadar', nameBn: 'রাঙ্গামাটি সদর', nameEn: 'Rangamati Sadar', unions: ['জীবতলী', 'মগবান', 'সাপছড়ি', 'কুতুকছড়ি', 'বালুখালী', 'বন্দুকভাঙা'] },
    { idSuffix: 'kaptai', nameBn: 'কাপ্তাই', nameEn: 'Kaptai', unions: ['চন্দ্রঘোনা', 'রাইখালী (কৃষি গবেষণা জোন)', 'চিৎমরম', 'কাপ্তাই সদর', 'ওয়াজ্ঞা'] },
    { idSuffix: 'baghaichhari', nameBn: 'বাঘাইছড়ি', nameEn: 'Baghaichhari', unions: ['মারিশ্যা', 'বাঘাইছড়ি সদর', 'সারোয়াতলী', 'রূপকারী', 'আমতলী', 'বঙ্গলতলী'] }
  ],
  'dist-bandarban': [
    { idSuffix: 'sadar', nameBn: 'বান্দরবান সদর', nameEn: 'Bandarban Sadar', unions: ['রাজবিলা', 'কুহালং', 'বান্দরবান সদর', 'সুয়ালক (ফল জোন)', 'টংকাবতী'] },
    { idSuffix: 'lama', nameBn: 'লামা', nameEn: 'Lama', unions: ['গজালিয়া', 'লামা সদর', 'ফাঁসিয়াখালী', 'আজিজনগর', 'সরই', 'রূপসীপাড়া'] },
    { idSuffix: 'alikadam', nameBn: 'আলীকদম', nameEn: 'Alikadam', unions: ['আলীকদম সদর', 'চয়ম্প্রুপাড়া', 'নয়া সড়ক', 'কুরুকপাতা'] }
  ],
  'dist-khagrachhari': [
    { idSuffix: 'sadar', nameBn: 'খাগড়াছড়ি সদর', nameEn: 'Khagrachhari Sadar', unions: ['খাগড়াছড়ি সদর', 'পৌর কৃষি ব্লক', 'পেরাছড়া', 'গোলাবাড়ি', 'কমলছড়ি'] },
    { idSuffix: 'dighinala', nameBn: 'দীঘিনালা', nameEn: 'Dighinala', unions: ['মেরুং', 'বোয়ালখালী', 'কবাখালী', 'দীঘিনালা সদর', 'বাবুছড়া'] },
    { idSuffix: 'ramgarh', nameBn: 'রামগড়', nameEn: 'Ramgarh', unions: ['রামগড় সদর', 'পাতাছড়া', 'হাতিমুড়া'] }
  ],

  // 3. RAJSHAHI DIVISION (8 Districts)
  'dist-rajshahi': [
    { idSuffix: 'paba', nameBn: 'পবা', nameEn: 'Paba', unions: ['দর্শনপাড়া', 'হড়গ্রাম', 'দামকুড়া', 'হরিপুর', 'বড়গাছি', 'পারপবা'] },
    { idSuffix: 'godagari', nameBn: 'গোদাগাড়ী', nameEn: 'Godagari', unions: ['গোগ্রাম', 'রিশিকুল', 'পাকড়ী', 'মোহনপুর', 'চর আষাড়িয়াদহ', 'মাটিকাটা', 'দেওপাড়া'] },
    { idSuffix: 'tanor', nameBn: 'তানোর', nameEn: 'Tanor', unions: ['কলমা', 'বাধাইড়', 'পাঁচন্দর', 'সরনজাই', 'তালন্দ', 'কামারগাঁ', 'চান্দুড়িয়া'] },
    { idSuffix: 'bagha', nameBn: 'বাঘা', nameEn: 'Bagha', unions: ['বাজুবাঘা', 'গাড়োদহ', 'মনিগ্রাম', 'পাকুড়িয়া', 'আড়ানী', 'বাউসা'] },
    { idSuffix: 'charghat', nameBn: 'চারঘাট', nameEn: 'Charghat', unions: ['ইউসুফপুর', 'শলুয়া', 'সরদহ', 'নিমপাড়া', 'ভায়ালক্ষ্মীপুর'] },
    { idSuffix: 'durgapur', nameBn: 'দুর্গাপুর', nameEn: 'Durgapur', unions: ['নওপাড়া', 'গজনবীপুর', 'পানানগর', 'দেলুয়াবাড়ী', 'ঝালুকা', 'কিসমত মারিয়া'] },
    { idSuffix: 'puthia', nameBn: 'পুঠিয়া', nameEn: 'Puthia', unions: ['পুঠিয়া সদর', 'বেলপুকুরিয়া', 'বানেশ্বর (আমের হাট জোন)', 'ভালুকগাছি', 'শিলমাড়িয়া', 'জিয়াড়িয়া'] },
    { idSuffix: 'bagmara', nameBn: 'বাগমারা', nameEn: 'Bagmara', unions: ['ভবানীগঞ্জ', 'গোবিন্দপাড়া', 'নর্দাশ', 'বড়বিহানালী', 'আউচপাড়া', 'শ্রীপুর', 'মাড়িয়া'] }
  ],
  'dist-bogura': [
    { idSuffix: 'shibganj', nameBn: 'শিবগঞ্জ', nameEn: 'Shibganj', unions: ['মহাস্থান (সবজি ও আলু হাব)', 'কিবলিয়া', 'দেউলী', 'বুড়িগঞ্জ', 'আটমূল', 'ময়দানহাট্টা', 'পীরব', 'রায়নগর'] },
    { idSuffix: 'sadar', nameBn: 'বগুড়া সদর', nameEn: 'Bogura Sadar', unions: ['ফাপোড়', 'শাখাহার', 'লাহিড়ীপাড়া', 'নুনগোলা', 'গোকুল', 'নিশিন্দারা', 'সাবগ্রাম', 'এরুলিয়া'] },
    { idSuffix: 'sherpur', nameBn: 'শেরপুর', nameEn: 'Sherpur', unions: ['কুসুম্বী', 'গাড়ীদহ', 'মির্জাপুর', 'ভবানীপুর', 'খানপুর', 'সীমাবাড়ী', 'সুঘাট', 'বিশালপুর'] },
    { idSuffix: 'gabtali', nameBn: 'গাবতলী', nameEn: 'Gabtali', unions: ['নেপালতলী', 'সুখানপুকুর', 'সোনারায়', 'বালিয়াদীঘি', 'কাগইল', 'রামেশ্বরপুর', 'মহিষাবান'] },
    { idSuffix: 'dupchanchia', nameBn: 'দুপচাঁচিয়া', nameEn: 'Dupchanchia', unions: ['গোবিন্দপুর', 'চামরুল', 'জিয়ানগর', 'গুনাহার', 'দুপচাঁচিয়া সদর'] },
    { idSuffix: 'adamdighi', nameBn: 'আদমদীঘি', nameEn: 'Adamdighi', unions: ['সান্তাহার', 'ছাতিয়ানগ্রাম', 'নশরৎপুর', 'আদমদীঘি সদর', 'কুন্দগ্রাম'] },
    { idSuffix: 'sonatola', nameBn: 'সোনাতলা', nameEn: 'Sonatola', unions: ['সোনাতলা সদর', 'বালুয়া', 'দিগদাইড়', 'জোড়গাছা', 'পাকুল্লা', 'মধুপুর'] },
    { idSuffix: 'dhunat', nameBn: 'ধুনট', nameEn: 'Dhunat', unions: ['কালেরপাড়া', 'চৌকিবাড়ি', 'চিকাশী', 'গোসাইবাড়ি', 'ভাণ্ডারবাড়ি', 'মথুরাপুর'] }
  ],
  'dist-pabna': [
    { idSuffix: 'sadar', nameBn: 'পাবনা সদর', nameEn: 'Pabna Sadar', unions: ['দোগাছী', 'মালঞ্চী', 'হেমায়েতপুর', 'গয়েশপুর', 'দাপুনিয়া', 'আতাইকুলা', 'সাদুল্লাপুর', 'চরতারাপুর'] },
    { idSuffix: 'ishwardi', nameBn: 'ঈশ্বরদী', nameEn: 'Ishwardi', unions: ['মুলাডুলি', 'দাশুড়িয়া', 'সাহাপুর', 'পাকশী', 'লক্ষীকুণ্ডা', 'সাড়া'] },
    { idSuffix: 'chatmohar', nameBn: 'চাটমোহর', nameEn: 'Chatmohar', unions: ['হরিপুর', 'বিলচলন', 'মথুরাপুর', 'ডিগ্রিরচর', 'নিমাইচড়া', 'গুনাইগাছা', 'হাণ্ডিয়াল'] },
    { idSuffix: 'sujanagar', nameBn: 'সুজানগর', nameEn: 'Sujanagar', unions: ['ভায়না', 'সাতবাড়িয়া', 'মানিকহাট', 'নাজিরগঞ্জ', 'সাগরকান্দি', 'রানীনগর'] },
    { idSuffix: 'santhia', nameBn: 'সাঁথিয়া', nameEn: 'Santhia', unions: ['ধোপাদহ', 'করমজা', 'কাশীনাথপুর', 'আরতৈল', 'গৌরীগ্রাম', 'ক্ষেতুপাড়া'] },
    { idSuffix: 'bera', nameBn: 'বেড়া', nameEn: 'Bera', unions: ['হুরসাগর', 'রূপপুর', 'চাকলা', 'জাতসাকিনী', 'মাসুমদিয়া', 'নতুন ভারেঙ্গা'] }
  ],
  'dist-sirajganj': [
    { idSuffix: 'sadar', nameBn: 'সিরাজগঞ্জ সদর', nameEn: 'Sirajganj Sadar', unions: ['রতনকান্দি', 'বাগবাটি', 'বহুলী', 'শিয়ালকোল', 'খোকশাবাড়ী', 'ছোনগাছা', 'মেছড়া', 'কালিয়া হরিপুর'] },
    { idSuffix: 'shahjadpur', nameBn: 'শাহজাদপুর', nameEn: 'Shahjadpur', unions: ['পোতাজিয়া (দুগ্ধ জোন)', 'কায়েতপাড়া', 'গাড়াদহ', 'রূপবাটি', 'বেলতৈল', 'জালালপুর', 'হাবিবুল্লাহ নগর'] },
    { idSuffix: 'ullapara', nameBn: 'উল্লাপাড়া', nameEn: 'Ullapara', unions: ['সলঙ্গা', 'পূর্ণিমাগাঁতি', 'উধুনিয়া', 'বাঙ্গারপাড়া', 'রামকৃষ্ণপুর', 'হাটিকুমরুল', 'বড় পাঙ্গাসী'] },
    { idSuffix: 'belkuchi', nameBn: 'বেলকুচি', nameEn: 'Belkuchi', unions: ['বেলকুচি সদর', 'রাজাপুর', 'ভাঙ্গাবাড়ী', 'দৌলতপুর', 'ধুকুরিয়াবেড়া', 'বড়ধুল'] },
    { idSuffix: 'rayganj', nameBn: 'রায়গঞ্জ', nameEn: 'Rayganj', unions: ['ধানগড়া', 'ব্রহ্মগাছা', 'চান্দাইকোনা', 'ধামাইনগর', 'পাঙ্গাসী', 'সোনাখাড়া'] },
    { idSuffix: 'tarash', nameBn: 'তাড়াশ', nameEn: 'Tarash', unions: ['তাড়াশ সদর', 'বারুহাস', 'তালম', 'মাগুড়াবিনোদ', 'সগুনা', 'দেশীগ্রাম'] }
  ],
  'dist-naogaon': [
    { idSuffix: 'sadar', nameBn: 'নওগাঁ সদর', nameEn: 'Naogaon Sadar', unions: ['বর্ষাইল', 'কীর্ত্তীপুর', 'বখতারপুর', 'তিলকপুর', 'হাপানিয়া', 'দুবলহাটি', 'বোয়ালিয়া'] },
    { idSuffix: 'mohadebpur', nameBn: 'মহাদেবপুর', nameEn: 'Mohadebpur', unions: ['মহাদেবপুর সদর', 'রাইগাঁ', 'এনায়েতপুর', 'চেরাগপুর', 'খাজুর', 'চান্দাশ', 'হাতুড়'] },
    { idSuffix: 'patnitala', nameBn: 'পত্নীতলা', nameEn: 'Patnitala', unions: ['পত্নীতলা সদর', 'নজিপুর', 'দিবর (দিঘী জোন)', 'শিহাড়া', 'কৃষ্ণপুর', 'মাতিন্দর'] },
    { idSuffix: 'dhamoirhat', nameBn: 'ধামইরহাট', nameEn: 'Dhamoirhat', unions: ['ধামইরহাট সদর', 'আলতাদীঘি ব্লক', 'আগ্রাদ্বিগুন', 'উমার', 'আড়ানগর', 'ইসবপুর'] },
    { idSuffix: 'manda', nameBn: 'মান্দা', nameEn: 'Manda', unions: ['প্রসাদপুর', 'ভারশোঁ', 'কুশুম্বা', 'মৈনম', 'তেঁতুলিয়া', 'কাঁশোপাড়া', 'নুরুল্লাবাদ'] },
    { idSuffix: 'sapahar', nameBn: 'সাপাহার', nameEn: 'Sapahar', unions: ['সাপাহার সদর (আম জোন)', 'গোয়ালা', 'তিলনা', 'আইহাই', 'পাতাড়ী', 'শিরন্টি'] }
  ],
  'dist-natore': [
    { idSuffix: 'sadar', nameBn: 'নাটোর সদর', nameEn: 'Natore Sadar', unions: ['ছাতনী', 'তেবাড়িয়া', 'দিঘাপতিয়া (উত্তরা গণভবন)', 'লক্ষ্মীপুর খোলাবাড়িয়া (ঔষধি গ্রাম)', 'কাফুরিয়া', 'হালসা'] },
    { idSuffix: 'singra', nameBn: 'সিংড়া', nameEn: 'Singra', unions: ['সিংড়া সদর', 'চলনবিল ব্লক ১', 'সুকাশ', 'ডাহিয়া', 'ইটালী', 'চৌগ্রাম', 'কলম', 'শেরকোল'] },
    { idSuffix: 'gurudaspur', nameBn: 'গুরুদাসপুর', nameEn: 'Gurudaspur', unions: ['নাজিরপুর (রসুন জোন)', 'বিয়াঘাট', 'খুবজীপুর', 'ধারাবারিষা', 'মশিন্দা', 'চাপিলা'] },
    { idSuffix: 'baraigram', nameBn: 'বড়াইগ্রাম', nameEn: 'Baraigram', unions: ['বড়াইগ্রাম সদর', 'জোয়াড়ী', 'নগর', 'মাঝগাঁও', 'গোপালপুর', 'চান্দাই'] },
    { idSuffix: 'lalpur', nameBn: 'লালপুর', nameEn: 'Lalpur', unions: ['লালপুর সদর', 'ঈশ্বরদী', 'চংধুপইল', 'বিলমাড়িয়া', 'দুয়ারিয়া', 'ওয়ালিয়া'] }
  ],
  'dist-chapainawabganj': [
    { idSuffix: 'sadar', nameBn: 'চাঁপাইনবাবগঞ্জ সদর', nameEn: 'Chapai Nawabganj Sadar', unions: ['বালিয়াডাঙ্গা', 'বারঘরিয়া', 'মহারাজপুর', 'রানীহাটি', 'সুজনগর', 'দেবীনগর', 'চরঅনুপনগর'] },
    { idSuffix: 'shibganj', nameBn: 'শিবগঞ্জ', nameEn: 'Shibganj', unions: ['কানসাট (আমের রাজধানী)', 'শাহবাজপুর', 'মনাকষা', 'বিনোদপুর', 'মোবারকপুর', 'উমরপুর', 'চৌকা', 'ধাইনগর'] },
    { idSuffix: 'nachol', nameBn: 'নাচোল', nameEn: 'Nachol', unions: ['কসবা', 'ফতেপুর', 'নেজামপুর', 'নাচোল সদর'] },
    { idSuffix: 'gomostapur', nameBn: 'গোমস্তাপুর', nameEn: 'Gomostapur', unions: ['রহনপুর', 'গোমস্তাপুর সদর', 'বোয়ালিয়া', 'চৌডালা', 'পার্বতীপুর', 'রাধানগর'] },
    { idSuffix: 'bholahat', nameBn: 'ভোলাহাট', nameEn: 'Bholahat', unions: ['ভোলাহাট সদর', 'গোহালবাড়ি', 'দলদলী', 'জামবাড়িয়া'] }
  ],
  'dist-joypurhat': [
    { idSuffix: 'sadar', nameBn: 'জয়পুরহাট সদর', nameEn: 'Joypurhat Sadar', unions: ['মোহাম্মদাবাদ', 'দোগাছী', 'ভাদসা', 'জামালগঞ্জ', 'চকবরকত', 'আমদই'] },
    { idSuffix: 'panchbibi', nameBn: 'পাঁচবিবি', nameEn: 'Panchbibi', unions: ['বাগজানা', 'ধরঞ্জী', 'আয়মারসুলপুর', 'কুসুম্বা', 'আটাপাড়া', 'মোহম্মদপুর'] },
    { idSuffix: 'kalai', nameBn: 'কালাই', nameEn: 'Kalai', unions: ['কালাই সদর (আলুর বলয়)', 'উদয়পুর', 'পুনট', 'জিন্দারপুর', 'মাত্রাই'] },
    { idSuffix: 'khetlal', nameBn: 'ক্ষেতলাল', nameEn: 'Khetlal', unions: ['ক্ষেতলাল সদর', 'আলমপুর', 'মামুদপুর', 'বড়তারা', 'তিলকপুর'] }
  ],

  // 4. RANGPUR DIVISION (8 Districts)
  'dist-rangpur': [
    { idSuffix: 'sadar', nameBn: 'রংপুর সদর', nameEn: 'Rangpur Sadar', unions: ['পাগলাপীর', 'হরিদেবপুর', 'চন্দনপাট', 'সদ্যপুষ্করিণী', 'মমিনপুর', 'উত্তম', 'তাজহাট'] },
    { idSuffix: 'mithapukur', nameBn: 'মিঠাপুকুর', nameEn: 'Mithapukur', unions: ['পায়রাবন্দ (রোকেয়া স্মৃতি)', 'লতিফপুর', 'বালারহাট', 'কাফ্রিকাল', 'রানীপুকুর', 'দুর্গাপুর', 'মির্জাপুর'] },
    { idSuffix: 'pirganj', nameBn: 'পীরগঞ্জ', nameEn: 'Pirganj', unions: ['চৈত্রীপাড়া', 'ভেন্ডাবাড়ী', 'রায়পুর', 'কুমেদপুর', 'খালাশপীর', 'বড়দরগাহ্', 'শানেরহাট'] },
    { idSuffix: 'badarganj', nameBn: 'বদরগঞ্জ', nameEn: 'Badarganj', unions: ['গোপীনাথপুর', 'রাধাকৃষ্ণপুর', 'দামোদরপুর', 'কালুপাড়া', 'বিষ্ণুপুর', 'লোপনপুর'] },
    { idSuffix: 'gangachhara', nameBn: 'গংগাচড়া', nameEn: 'Gangachhara', unions: ['বেতগাড়ী', 'নোহালী', 'কোলকোন্দ', 'লক্ষ্মীটারী', 'গংগাচড়া সদর', 'মর্নেয়া'] }
  ],
  'dist-dinajpur': [
    { idSuffix: 'sadar', nameBn: 'দিনাজপুর সদর', nameEn: 'Dinajpur Sadar', unions: ['চেহেলগাজী', 'সুন্দরবন', 'ফাসিলা', 'শেখপুরা', 'শশরা', 'আউলিয়াপুর', 'উথরাইল'] },
    { idSuffix: 'birganj', nameBn: 'বীরগঞ্জ', nameEn: 'Birganj', unions: ['শিবরামপুর', 'পলাশবাড়ী', 'শতগ্রাম', 'পাল্টাপুর', 'সুজালপুর', 'মোহনপুর', 'নিজপাড়া'] },
    { idSuffix: 'kaharole', nameBn: 'কাহারোল', nameEn: 'Kaharole', unions: ['ডাবর', 'রসুলপুর', 'তারগাঁও', 'মুকুন্দপুর', 'রামচন্দ্রপুর', 'কান্তজীউ ব্লক'] },
    { idSuffix: 'phulbari', nameBn: 'ফুলবাড়ী', nameEn: 'Phulbari', unions: ['এলুয়ারী', 'আলাদিপুর', 'কাজিখাল', 'বেতদিঘী', 'দৌলতপুর', 'শিবনগর'] },
    { idSuffix: 'birampur', nameBn: 'বিরামপুর', nameEn: 'Birampur', unions: ['দিওড়', 'খানপুর', 'কাটলা', 'বিনোদপুর', 'জোতবানী', 'পলিপ্রয়াগপুর'] },
    { idSuffix: 'parbatipur', nameBn: 'পার্বতীপুর', nameEn: 'Parbatipur', unions: ['বেলাইচণ্ডী', 'মন্মথপুর', 'রামপুর', 'পলাশবাড়ী', 'চণ্ডীপুর', 'মোমিনপুর'] },
    { idSuffix: 'chirirbandar', nameBn: 'চিরিরবন্দর', nameEn: 'Chirirbandar', unions: ['নশরতপুর', 'সাতনালা', 'ফতেজংপুর', 'ইসবপুর', 'আব্দুলপুর', 'সাইতাড়া'] }
  ],
  'dist-kurigram': [
    { idSuffix: 'sadar', nameBn: 'কুড়িগ্রাম সদর', nameEn: 'Kurigram Sadar', unions: ['পাঁচগাছী', 'যাত্রাপুর', 'ভোগডাঙ্গা', 'ঘোগাদহ', 'বেলগাছা', 'মোগলবাসা', 'হোলখানা'] },
    { idSuffix: 'nageshwari', nameBn: 'নাগেশ্বরী', nameEn: 'Nageshwari', unions: ['ভিতরবন্দ', 'হাসনাবাদ', 'বামনডাঙ্গা', 'রায়গঞ্জ', 'নুনখাওয়া', 'কালীগঞ্জ', 'বেরুবাড়ী'] },
    { idSuffix: 'chilmari', nameBn: 'চিলমারী', nameEn: 'Chilmari', unions: ['অষ্টমীরচর', 'নয়াহাট', 'রাণীগঞ্জ', 'রমনা', 'থানাহাট'] },
    { idSuffix: 'ulipur', nameBn: 'উলিপুর', nameEn: 'Ulipur', unions: ['বুড়াবুড়ী', 'দলদলিয়া', 'ধামশ্রেণী', 'গুনাইগাছ', 'হাতিয়া', 'সাহেবের আলগা'] },
    { idSuffix: 'bhurungamari', nameBn: 'ভূরুঙ্গামারী', nameEn: 'Bhurungamari', unions: ['ভূরুঙ্গামারী সদর', 'পাইকেরছড়া', 'তিলাই', 'শিলখুড়ী', 'চর ভূরুঙ্গামারী'] }
  ],
  'dist-gaibandha': [
    { idSuffix: 'sadar', nameBn: 'গাইবান্ধা সদর', nameEn: 'Gaibandha Sadar', unions: ['বোয়ালী', 'ঘাগোয়া', 'গিদারি', 'কুপতলা', 'মালিবাড়ি', 'মোল্লারচর', 'সাহাপাড়া'] },
    { idSuffix: 'gobindaganj', nameBn: 'গোবিন্দগঞ্জ', nameEn: 'Gobindaganj', unions: ['কামারদহ', 'মহিমাগঞ্জ', 'কোচাশহর', 'শালমারা', 'নাকাই', 'হরিরামপুর', 'ফুলবাড়ি'] },
    { idSuffix: 'palashbari', nameBn: 'পলাশবাড়ী', nameEn: 'Palashbari', unions: ['কিশোরগাড়ী', 'হোসেনপুর', 'পলাশবাড়ী সদর', 'বরিশাল', 'মহদীপুর', 'বেতকাপা'] },
    { idSuffix: 'sadullapur', nameBn: 'সাদুল্লাপুর', nameEn: 'Sadullapur', unions: ['রসুলপুর', 'নলডাঙ্গা', 'দামোদরপুর', 'ধাপেরহাট (কাঁচামরিচ হাব)', 'ইদিলপুর'] }
  ],
  'dist-nilphamari': [
    { idSuffix: 'sadar', nameBn: 'নীলফামারী সদর', nameEn: 'Nilphamari Sadar', unions: ['চওড়া বড়গাছা', 'গোড়গ্রাম', 'খোকশাবাড়ী', 'পলাশবাড়ী', 'রামনগর', 'টুপামারী', 'ইটাখোলা'] },
    { idSuffix: 'saidpur', nameBn: 'সৈয়দপুর', nameEn: 'Saidpur', unions: ['কামারপুকুর', 'বোতলাগাড়ী', 'বাঙালিলেপুর', 'খাতামধুপুর', 'সৈয়দপুর ব্লক'] },
    { idSuffix: 'domar', nameBn: 'ডোমার', nameEn: 'Domar', unions: ['ডোমার সদর', 'বোড়াগাড়ী', 'জোড়াবাড়ী', 'বামুনিয়া', 'পাঙ্গা মটুকপুর', 'গোমনাতি'] },
    { idSuffix: 'dimla', nameBn: 'ডিমলা', nameEn: 'Dimla', unions: ['পশ্চিম ছাতনাই', 'বালাপাড়া', 'ডিমলা সদর', 'খালিশা চাপানী', 'টেপাখড়িবাড়ী'] }
  ],
  'dist-panchagarh': [
    { idSuffix: 'sadar', nameBn: 'পঞ্চগড় সদর', nameEn: 'Panchagarh Sadar', unions: ['অমরখানা', 'হাফিজাবাদ', 'মাগুরা', 'চাকলাহাট', 'গড়েয়া', 'কামাত কাজলদিঘী'] },
    { idSuffix: 'tetulia', nameBn: 'তেঁতুলিয়া', nameEn: 'Tetulia', unions: ['বাংলাবান্ধা', 'তিরনইহাট', 'তেঁতুলিয়া সদর (চা জোন)', 'শালবাহান', 'বুড়াবুড়ি', 'দেবনগড়'] },
    { idSuffix: 'boda', nameBn: 'বোদা', nameEn: 'Boda', unions: ['ঝলইশালশিরি', 'ময়দানদীঘি', 'বেংহারী', 'কালিয়াগঞ্জ', 'চন্দনবাড়ী', 'সাকোয়া'] },
    { idSuffix: 'debiganj', nameBn: 'দেবীগঞ্জ', nameEn: 'Debiganj', unions: ['দেবীগঞ্জ সদর', 'পামুলী', 'সুন্দরদিঘী', 'শালডাঙ্গা', 'টেপ্রীগঞ্জ', 'দণ্ডপাল'] }
  ],
  'dist-thakurgaon': [
    { idSuffix: 'sadar', nameBn: 'ঠাকুরগাঁও সদর', nameEn: 'Thakurgaon Sadar', unions: ['রুহিয়া', 'আখানগর', 'আকচা', 'বড়গাঁও', 'বালিয়া', 'আউলিয়াপুর', 'চিলারং', 'রায়পুর'] },
    { idSuffix: 'pirganj', nameBn: 'পীরগঞ্জ', nameEn: 'Pirganj', unions: ['ভোমরাদহ', 'কোষারাণীগঞ্জ', 'খনগাঁও', 'সৈয়দপুর', 'পীরগঞ্জ সদর', 'হাজীপুর', 'দৌলতপুর'] },
    { idSuffix: 'baliadangi', nameBn: 'বালিয়াডাঙ্গী', nameEn: 'Baliadangi', unions: ['পাড়িয়া', 'চাড়োল', 'ধনতলা', 'বড়পলাশবাড়ী', 'আমজানখোর', 'ভানোর'] },
    { idSuffix: 'ranisankail', nameBn: 'রাণীশংকৈল', nameEn: 'Ranisankail', unions: ['ধর্মগড়', 'নেকমরদ', 'হোসেনগাঁও', 'লেহেম্বা', 'বাচোর', 'কাশিপুর'] }
  ],
  'dist-lalmonirhat': [
    { idSuffix: 'sadar', nameBn: 'লালমনিরহাট সদর', nameEn: 'Lalmonirhat Sadar', unions: ['মোগলহাট', 'কুলাঘাট', 'মহেন্দ্রনগর', 'হারাটী', 'গোকুণ্ডা', 'পঞ্চগ্রাম', 'রাজপুর'] },
    { idSuffix: 'patgram', nameBn: 'পাটগ্রাম', nameEn: 'Patgram', unions: ['বুড়িমারী (স্থলবন্দর জোন)', 'পাটগ্রাম সদর', 'বাউরা', 'জগতবেড়', 'কুচলিবাড়ী', 'জোংড়া'] },
    { idSuffix: 'hatibandha', nameBn: 'হাতীবান্ধা', nameEn: 'Hatibandha', unions: ['তিস্তা ব্যারেজ ব্লক', 'বড়খাতা', 'গড্ডিমারী', 'সিংগীমারী', 'টংভাঙ্গা', 'ভেলাগুড়ি'] }
  ],

  // 5. KHULNA DIVISION (10 Districts)
  'dist-khulna': [
    { idSuffix: 'dumuria', nameBn: 'ডুমুরিয়া', nameEn: 'Dumuria', unions: ['ধামালিয়া', 'রংপুর', 'রুদাঘরা', 'খর্ণিয়া', 'আটপাড়া', 'মাগুরঘোনা', 'শোভনা', 'ডুমুরিয়া সদর'] },
    { idSuffix: 'batiaghata', nameBn: 'বটিয়াঘাটা', nameEn: 'Batiaghata', unions: ['জলমা', 'সুরখালী', 'ভাণ্ডারকোট', 'গঙ্গারামপুর', 'আমিরপুর', 'বালিয়াডাঙ্গা'] },
    { idSuffix: 'koyra', nameBn: 'কয়রা', nameEn: 'Koyra', unions: ['আমাদী', 'বাগালী', 'মহেশ্বরীপুর', 'মহারাজপুর', 'কয়রা সদর', 'উত্তর বেদকাশী', 'দক্ষিণ বেদকাশী'] },
    { idSuffix: 'paikgachha', nameBn: 'পাইকগাছা', nameEn: 'Paikgachha', unions: ['হরিঢালী', 'গড়ইখালী', 'কপিলমুনি', 'লতা', 'দেলুটি', 'সোলাদানা', 'রাড়ুলী'] },
    { idSuffix: 'rupsha', nameBn: 'রূপসা', nameEn: 'Rupsha', unions: ['আইচগাতী', 'শ্রীফলতলা', 'নৈহাটী', 'টিএসবি', 'ঘাটভোগ'] }
  ],
  'dist-jashore': [
    { idSuffix: 'sadar', nameBn: 'যশোর সদর', nameEn: 'Jashore Sadar', unions: ['হৈবতপুর (সবজির রাজ্য)', 'নূরপুর', 'লেবুতলা', 'ইছালী', 'কচুয়া', 'নরেন্দ্রপুর', 'ফতেপুর', 'উপশহর'] },
    { idSuffix: 'jhikargachha', nameBn: 'ঝিকরগাছা', nameEn: 'Jhikargachha', unions: ['গদখালী (ফুলের রাজধানী)', 'পানিসারা', 'নাভারণ', 'শংকরপুর', 'মাগুরা', 'হাজিরবাগ', 'গঙ্গানন্দপুর'] },
    { idSuffix: 'sharsha', nameBn: 'শার্শা', nameEn: 'Sharsha', unions: ['বেনাপোল', 'বাগআঁচড়া', 'ডিহি', 'লক্ষণপুর', 'উলশী', 'পুখুরিয়া', 'বাহাদুরপুর', 'কায়বা'] },
    { idSuffix: 'manirampur', nameBn: 'মণিরামপুর', nameEn: 'Manirampur', unions: ['রোহিতা', 'কাশীমনগর', 'ভোজগাতী', 'শ্যামকুড়', 'ঢালজোড়া', 'হরিদাসকাঠি', 'নেহালপুর'] },
    { idSuffix: 'keshabpur', nameBn: 'কেশবপুর', nameEn: 'Keshabpur', unions: ['ত্রিমোহিনী', 'সাগরদাঁড়ী (মধুসূদন স্মৃতি)', 'মজিদপুর', 'বিদ্যানন্দকাটি', 'মঙ্গলকোট', 'সুফলাকাটি'] }
  ],
  'dist-satkhira': [
    { idSuffix: 'sadar', nameBn: 'সাতক্ষীরা সদর', nameEn: 'Satkhira Sadar', unions: ['বাঁশদহ', 'কুশখালী', 'বৈকারী', 'ঘোনা', 'শিবপুর', 'ভোমরা', 'আলিপুর', 'লাবসা', 'ঝাউডাঙ্গা'] },
    { idSuffix: 'shyamnagar', nameBn: 'শ্যামনগর', nameEn: 'Shyamnagar', unions: ['বুড়িগোয়ালিনী', 'গাবুরা', 'পদ্মপুকুর', 'মুন্সীগঞ্জ', 'কৈখালী', 'রমজাননগর', 'ঈশ্বরীপুর', 'ভুরুলিয়া'] },
    { idSuffix: 'tala', nameBn: 'তালা', nameEn: 'Tala', unions: ['ধানদিয়া', 'নগরঘাটা', 'সরুলিয়া', 'তালা সদর', 'ইসলামকাটি', 'খলিলনগর', 'তেঁতুলিয়া', 'জালালপুর'] },
    { idSuffix: 'kaliganj', nameBn: 'কালিগঞ্জ', nameEn: 'Kaliganj', unions: ['কৃষ্ণনগর', 'বিষ্ণুপুর', 'চাম্পাফুল', 'দক্ষিণ শ্রীপুর', 'রতনপুর', 'কুশুলিয়া', 'মথুরেশপুর'] }
  ],
  'dist-kushtia': [
    { idSuffix: 'sadar', nameBn: 'কুষ্টিয়া সদর', nameEn: 'Kushtia Sadar', unions: ['হাটিকুমরুল', 'জিয়ারখী', 'আইলচারা', 'পাটিকাবাড়ী', 'ঝাউদিয়া', 'উজানগ্রাম', 'গোস্বামী দুর্গাপুর'] },
    { idSuffix: 'bheramara', nameBn: 'ভেড়ামারা', nameEn: 'Bheramara', unions: ['চাঁদগ্রাম', 'জুনিয়াদহ', 'বাহিরচর', 'মোকারিমপুর', 'ধারমপুর', 'বাহাদুরপুর'] },
    { idSuffix: 'kumarkhali', nameBn: 'কুমারখালী', nameEn: 'Kumarkhali', unions: ['শিলাইদহ (রবীন্দ্র কুঠি)', 'কয়া', 'জগন্নাথপুর', 'সাদিপুর', 'নন্দলালপুর', 'পান্টি', 'চাঁদপুর'] },
    { idSuffix: 'mirpur', nameBn: 'মিরপুর', nameEn: 'Mirpur', unions: ['চিথলিয়া', 'তালবাড়িয়া', 'বারুইপাড়া', 'ফুলবাড়িয়া', 'আমলা', 'সদরপুর', 'পোড়াদহ'] }
  ],
  'dist-chuadanga': [
    { idSuffix: 'sadar', nameBn: 'চুয়াডাঙ্গা সদর', nameEn: 'Chuadanga Sadar', unions: ['আলুকদিয়া', 'মোমিনপুর', 'তিতুদহ', 'শংকরচন্দ্র', 'পদ্মবিলা', 'বেগমপুর'] },
    { idSuffix: 'alamdanga', nameBn: 'আলমডাঙ্গা', nameEn: 'Alamdanga', unions: ['ভাংবাড়ীয়া', 'হারদী', 'কুমারী', 'বাড়াদী', 'গাংনী', 'ডাউকী', 'বেলগাছি'] },
    { idSuffix: 'damurhuda', nameBn: 'দামুড়হুদা', nameEn: 'Damurhuda', unions: ['জুড়ানপুর', 'কার্পাসডাঙ্গা', 'কুড়ালগাছি', 'দামুড়হুদা সদর', 'নতিপোতা', 'হাওলী'] }
  ],
  'dist-jhenaidah': [
    { idSuffix: 'sadar', nameBn: 'ঝিনাইদহ সদর', nameEn: 'Jhenaidah Sadar', unions: ['সাধুহাটি', 'মধুহাটি', 'সাগন্না', 'হলিধানী', 'কুমড়াবাড়ীয়া', 'গান্না', 'মহারাজপুর'] },
    { idSuffix: 'shailkupa', nameBn: 'শৈলকুপা', nameEn: 'Shailkupa', unions: ['ত্রিবেনী', 'মির্জাপুর', 'দিগনগর', 'কাঁচেরকোল', 'সারুটিয়া', 'হাকিমপুর', 'ধলহরাচন্দ্র'] },
    { idSuffix: 'kaliganj', nameBn: 'কালীগঞ্জ', nameEn: 'Kaliganj', unions: ['সুন্দরপুর দুর্গাপুর', 'জামাল', 'কাস্টভাঙ্গা', 'ত্রিলোচনপুর', 'শিমলা রোকনপুর', 'নিয়ামাতপুর'] },
    { idSuffix: 'maheshpur', nameBn: 'মহেশপুর', nameEn: 'Maheshpur', unions: ['এসবিকে', 'ফতেপুর', 'পান্তাপাড়া', 'স্বরূপপুর', 'শ্যামকুড়', 'নেপা', 'কাজীরবেড়'] }
  ],
  'dist-meherpur': [
    { idSuffix: 'sadar', nameBn: 'মেহেরপুর সদর', nameEn: 'Meherpur Sadar', unions: ['কুতুবপুর', 'বুড়িপোতা', 'আমদহ', 'পিরোজপুর', 'শ্যামপুর'] },
    { idSuffix: 'gangni', nameBn: 'গাংনী', nameEn: 'Gangni', unions: ['কাথুলী', 'তেঁতুলবাড়িয়া', 'কাজীপুর', 'বামন্দী', 'মটমুড়া', 'ষোলটাকা', 'ধানখোলা'] },
    { idSuffix: 'mujibnagar', nameBn: 'মুজিবনগর', nameEn: 'Mujibnagar', unions: ['বাগোয়ান (স্মৃতিসৌধ জোন)', 'দারিয়াপুর', 'মোbezierপুর', 'মহাজনপুর'] }
  ],
  'dist-bagerhat': [
    { idSuffix: 'sadar', nameBn: 'বাগেরহাট সদর', nameEn: 'Bagerhat Sadar', unions: ['কাড়াপাড়া', 'বেমরতা', 'গোটাপাড়া', 'বিষ্ণুপুর', 'বারুইপাড়া', 'যাত্রাপুর', 'ডেপাড়া'] },
    { idSuffix: 'mongla', nameBn: 'মোংলা', nameEn: 'Mongla', unions: ['বুড়িরডাঙ্গা', 'মিঠাখালী', 'সোনাইলতলা', 'চাঁদপাই', 'চিলা', 'সুন্দরবন ব্লক'] },
    { idSuffix: 'fakirhat', nameBn: 'ফকিরহাট', nameEn: 'Fakirhat', unions: ['বেতাগা', 'লখপুর', 'পিলজংগ', 'ফকিরহাট সদর', 'বাহিরদিয়া মানসা', 'নলধা মৌভোগ'] },
    { idSuffix: 'kachua', nameBn: 'কচুয়া', nameEn: 'Kachua', unions: ['বাধাল', 'গজালীয়া', 'ধোপাখালী', 'মঘিয়া', 'কচুয়া সদর', 'গোপালপুর'] }
  ],
  'dist-magura': [
    { idSuffix: 'sadar', nameBn: 'মাগুরা সদর', nameEn: 'Magura Sadar', unions: ['কুচিয়ামোড়া', 'আঠারখাদা', 'কঘোপাড়া', 'বগুড়া', 'হাজীপুর', 'জগদল', 'চাউলিয়া'] },
    { idSuffix: 'sreepur', nameBn: 'শ্রীপুর', nameEn: 'Sreepur', unions: ['গয়েশপুর', 'আমলসার', 'শ্রীকোল', 'শ্রীপুর সদর', 'দ্বারিয়াপুর', 'কাদিরপাড়া'] },
    { idSuffix: 'mohammadpur', nameBn: 'মহম্মদপুর', nameEn: 'Mohammadpur', unions: ['বাবুখালী', 'বিনোদপুর', 'দীঘা', 'রাজাপুর', 'বালিদিয়া', 'মহম্মদপুর সদর'] }
  ],
  'dist-narail': [
    { idSuffix: 'sadar', nameBn: 'নড়াইল সদর', nameEn: 'Narail Sadar', unions: ['মাইজপাড়া', 'হবখালী', 'চণ্ডিবরপুর', 'আউড়িয়া', 'শাহাবাদ', 'তুলারামপুর', 'কালোড়া'] },
    { idSuffix: 'lohagara', nameBn: 'লোহাগড়া', nameEn: 'Lohagara', unions: ['নলদী', 'লাহুড়িয়া', 'শালনগর', 'নোয়াগ্রাম', 'লক্ষ্মীপাশা', 'দিঘলিয়া', 'মল্লিকপুর'] },
    { idSuffix: 'kalia', nameBn: 'কালিয়া', nameEn: 'Kalia', unions: ['বাবরা হাছিলা', 'পুরুলিয়া', 'হামিদপুর', 'সালামাবাদ', 'ইলিয়াছাবাদ', 'পহরডাঙ্গা'] }
  ],

  // 6. BARISHAL DIVISION (6 Districts)
  'dist-barishal': [
    { idSuffix: 'sadar', nameBn: 'বরিশাল সদর', nameEn: 'Barishal Sadar', unions: ['রায়পাশা কড়াপুর', 'কাশীপুর', 'চরবাড়িয়া', 'চরকাউয়া', 'চাঁদপুরা', 'টুঙ্গীবাড়িয়া', 'জাগুয়া'] },
    { idSuffix: 'babuganj', nameBn: 'বাবুগঞ্জ', nameEn: 'Babuganj', unions: ['বীরশ্রেষ্ঠ জাহাঙ্গীরনগর', 'কেদারপুর', 'দেহেরগতি', 'চাঁদপাশা', 'মাধবপাশা', 'রহমতপুর'] },
    { idSuffix: 'gournadi', nameBn: 'গৌরনদী', nameEn: 'Gournadi', unions: ['খাঞ্জাপুর', 'বার্থী', 'চাঁদশী', 'মাহিলাড়া', 'নলচিড়া', 'বাটাজোর', 'সরিকল'] },
    { idSuffix: 'banaripara', nameBn: 'বানারীপাড়া', nameEn: 'Banaripara', unions: ['বিশারকান্দি (ভাসমান পেয়ারা বাজার)', 'ইলুহার', 'সৈয়দকাঠি', 'চাখার', 'উদয়কাঠি', 'বাইশারী'] },
    { idSuffix: 'bakerganj', nameBn: 'বাকেরগঞ্জ', nameEn: 'Bakerganj', unions: ['দুধাল', 'রঙ্গশ্রী', 'পাদ্রীশিবপুর', 'চরাদি', 'নিয়ামতী', 'কলসকাঠি', 'গারুড়িয়া'] }
  ],
  'dist-patuakhali': [
    { idSuffix: 'sadar', nameBn: 'পটুয়াখালী সদর', nameEn: 'Patuakhali Sadar', unions: ['বদরপুর', 'মাদারবুনিয়া', 'ছোটবিঘাই', 'বড়বিঘাই', 'ইটবাড়িয়া', 'লাউকাঠি', 'আউলিয়াপুর'] },
    { idSuffix: 'bauphal', nameBn: 'বাউফল', nameEn: 'Bauphal', unions: ['কালাইয়া', 'কালিশুরী', 'সূর্যমণি', 'ধুলিয়া', 'কেশবপুর', 'বগা', 'কনকদিয়া'] },
    { idSuffix: 'kalapara', nameBn: 'কলাপাড়া', nameEn: 'Kalapara', unions: ['কুয়াকাটা', 'লতাচাপলী', 'ধুলাসার', 'নীলগঞ্জ (তরমুজ হাব)', 'টিয়াখালী', 'ধানখালী', 'চাকামইয়া'] },
    { idSuffix: 'galachipa', nameBn: 'গলাচিপা', nameEn: 'Galachipa', unions: ['আমখোলা', 'গোলখালী', 'গলাচিপা সদর', 'পানপট্টি', 'রতনদী তালতলী', 'ডাকুয়া'] }
  ],
  'dist-bhola': [
    { idSuffix: 'sadar', nameBn: 'ভোলা সদর', nameEn: 'Bhola Sadar', unions: ['ইলিশা', 'রাজাপুর', 'শিবপুর', 'আলীনগর', 'ভেলুমিয়া', 'ভেদুরিয়া', 'বাপ্তা', 'কাচিয়া'] },
    { idSuffix: 'charfasson', nameBn: 'চরফ্যাশন', nameEn: 'Char Fasson', unions: ['চরমানিকা', 'দিলদারপুর', 'আছলামপুর', 'রসুলপুর', 'চরকলমী', 'কুকরী মুকরী', 'ওমরপুর'] },
    { idSuffix: 'borhanuddin', nameBn: 'বোরহানউদ্দিন', nameEn: 'Borhanuddin', unions: ['গংগাপুর', 'সাচরা', 'বড়মানিকা', 'হাসাননগর', 'পক্ষিয়া', 'টবগী', 'কাচিয়া'] },
    { idSuffix: 'lalmohan', nameBn: 'লালমোহন', nameEn: 'Lalmohan', unions: ['কালমা', 'রমাগঞ্জ', 'লর্ডহার্ডিঞ্জ', 'ধলীগৌরনগর', 'ফরাজগঞ্জ', 'বদরপুর'] }
  ],
  'dist-pirojpur': [
    { idSuffix: 'sadar', nameBn: 'পিরোজপুর সদর', nameEn: 'Pirojpur Sadar', unions: ['শিকদারমল্লিক', 'কদমতলা', 'দূর্গাপুর', 'কলাখালী', 'টোনা', 'শংকরপাশা'] },
    { idSuffix: 'nesarabad', nameBn: 'নেছারাবাদ (স্বরূপকাঠি)', nameEn: 'Nesarabad (Swarupkathi)', unions: ['আটঘর কুড়িয়ানা (পেয়ারা জোন)', 'বলদিয়া', 'গুয়ারেখা', 'সমুদয়কাঠি', 'সোহাগদল', 'দৈহারী'] },
    { idSuffix: 'bhandaria', nameBn: 'ভাণ্ডারিয়া', nameEn: 'Bhandaria', unions: ['ভিটাবাড়িয়া', 'নদিমাবাদ', 'তেলিখালী', 'ইকড়ি', 'ধাওয়া', 'গৌরীপুর'] },
    { idSuffix: 'mathbaria', nameBn: 'মঠবাড়িয়া', nameEn: 'Mathbaria', unions: ['তুষখালী', 'মিরুখালী', 'দাউদমাল', 'টিকিকাটা', 'বেতমোর রাজপাড়া', 'আমড়াগাছিয়া'] }
  ],
  'dist-barguna': [
    { idSuffix: 'sadar', nameBn: 'বরগুনা সদর', nameEn: 'Barguna Sadar', unions: ['বদরখালী', 'গৌরীচন্না', 'ফুলঝুড়ি', 'কেওড়াবুনিয়া', 'আয়লা পাতাকাটা', 'বুড়িরচর', 'ঢলুয়া'] },
    { idSuffix: 'amtali', nameBn: 'আমতলী', nameEn: 'Amtali', unions: ['গুলিশাখালী', 'কুকয়া', 'আঠারগাছিয়া', 'হলদিয়া', 'চাওড়া', 'আমতলী সদর', 'আড়পাঙ্গাশিয়া'] },
    { idSuffix: 'patharghata', nameBn: 'পাথরঘাটা', nameEn: 'Patharghata', unions: ['রায়হানপুর', 'নাচনাপাড়া', 'কালমেঘা', 'কাকচিড়া', 'চরদুয়ানী', 'পাথরঘাটা সদর'] },
    { idSuffix: 'taltali', nameBn: 'তালতলী', nameEn: 'Taltali', unions: ['পঁচাকোড়ালিয়া', 'ছোটবগী', 'শারিকখালী', 'নিশানবাড়িয়া', 'সোনাকাটা'] }
  ],
  'dist-jhalokati': [
    { idSuffix: 'sadar', nameBn: 'ঝালকাঠি সদর', nameEn: 'Jhalokati Sadar', unions: ['গাভা রামচন্দ্রপুর', 'বিনয়কাঠি', 'নবগ্রাম', 'কীর্ত্তিপাশা (আমড়া হাব)', 'বাসণ্ডা', 'শেখেরহাট'] },
    { idSuffix: 'nalchity', nameBn: 'নলছিটি', nameEn: 'Nalchity', unions: ['ভৈরবপাশা', 'মগড়', 'কুলকাঠি', 'কুশঙ্গল', 'সিদ্ধকাঠি', 'দপদপিয়া', 'রানাপাশা'] },
    { idSuffix: 'rajapur', nameBn: 'রাজাপুর', nameEn: 'Rajapur', unions: ['সাতুরিয়া', 'শুকতহরী', 'গালুয়া', 'বড়ইয়া', 'মঠবাড়ী'] }
  ],

  // 7. SYLHET DIVISION (4 Districts)
  'dist-sylhet': [
    { idSuffix: 'sadar', nameBn: 'সিলেট সদর', nameEn: 'Sylhet Sadar', unions: ['জালালাবাদ', 'হাটখোলা', 'মোগলগাঁও', 'কান্দীগাঁও', 'টুকারবাজার', 'খাদিমনগর', 'খাদিমপাড়া'] },
    { idSuffix: 'golapganj', nameBn: 'গোলাপগঞ্জ', nameEn: 'Golapganj', unions: ['বাঘা', 'গোলাপগঞ্জ সদর', 'ফুলবাড়ী', 'লক্ষ্মীপাশা', 'বুধবারীবাজার', 'ঢাকা দক্ষিণ', 'আমূড়া'] },
    { idSuffix: 'beanibazar', nameBn: 'বিয়ানীবাজার', nameEn: 'Beanibazar', unions: ['আলীনগর', 'চারখাই', 'দুবাক', 'মুড়িয়া', 'কুড়ারবাজার', 'তিলপাড়া', 'শেওলা'] },
    { idSuffix: 'jaintiapur', nameBn: 'জৈন্তাপুর', nameEn: 'Jaintiapur', unions: ['নিজপাট', 'জৈন্তাপুর সদর', 'চারিকাটা', 'দরবস্ত', 'ফতেপুর', 'চিকনাগুল'] },
    { idSuffix: 'gowainghat', nameBn: 'গোয়াইনঘাট', nameEn: 'Gowainghat', unions: ['জাফলং ব্লক', 'রুস্তমপুর', 'লেংগুড়া', 'ফতেহপুর', 'নন্দীরগাঁও', 'তোয়াকুল'] },
    { idSuffix: 'biswanath', nameBn: 'বিশ্বনাথ', nameEn: 'Biswanath', unions: ['লামাকাজী', 'খাজাঞ্চী', 'দেওকলস', 'বিশ্বনাথ সদর', 'দৌলতপুর', 'অলংকারী'] }
  ],
  'dist-moulvibazar': [
    { idSuffix: 'sadar', nameBn: 'মৌলভীবাজার সদর', nameEn: 'Moulvibazar Sadar', unions: ['আমতৈল', 'খলিলপুর', 'মনুমুখ', 'গিয়াসনগর', 'কামালপুর', 'নাজিরাবাদ', 'চাঁদনীঘাট'] },
    { idSuffix: 'sreemangal', nameBn: 'শ্রীমঙ্গল', nameEn: 'Sreemangal', unions: ['কালাপুর (লেবু ও চা জোন)', 'আশাদ্রোন', 'সিন্দুরখান', 'মির্জাপুর', 'রাজঘাট', 'সাতগাঁও', 'ভনুগাছ'] },
    { idSuffix: 'kamalganj', nameBn: 'কমলগঞ্জ', nameEn: 'Kamalganj', unions: ['শমশেরনগর', 'পতনঊষার', 'মাধবপুর', 'আলীনগর', 'আদমপুর', 'কমলগঞ্জ সদর', 'মুন্সীবাজার'] },
    { idSuffix: 'kulaura', nameBn: 'কুলাউড়া', nameEn: 'Kulaura', unions: ['বড়লেখা সংলগ্ন', 'ভাটেরা', 'কাদিপুর', 'কুলাউড়া সদর', 'রাউৎগাঁও', 'টিলাগাঁও', 'হাজীপুর'] }
  ],
  'dist-sunamganj': [
    { idSuffix: 'sadar', nameBn: 'সুনামগঞ্জ সদর', nameEn: 'Sunamganj Sadar', unions: ['রঙ্গারচর', 'সুরমা', 'জাহাঙ্গীরনগর', 'গৌরাংগ', 'কাঠইর', 'মোল্লাপাড়া', 'লক্ষণশ্রী'] },
    { idSuffix: 'tahirpur', nameBn: 'তাহিরপুর', nameEn: 'Tahirpur', unions: ['টাঙ্গুয়ার হাওর ব্লক', 'উত্তর বড়দল', 'দক্ষিণ বড়দল', 'বালিজুরী', 'শ্রীপুর উত্তর', 'শ্রীপুর দক্ষিণ'] },
    { idSuffix: 'chhatak', nameBn: 'ছাতক', nameEn: 'Chhatak', unions: ['ইসলামপুর', 'নোয়ারাই', 'কালারুকা', 'ভাতগাঁও', 'সিংচাপইড়', 'জাউয়াবাজার', 'দোলারবাজার'] },
    { idSuffix: 'jagannathpur', nameBn: 'জগন্নাথপুর', nameEn: 'Jagannathpur', unions: ['কলকলিয়া', 'পাটলী', 'মীরপুর', 'চিলাউড়া হলদিপুর', 'সৈয়দপুর শাহারপাড়া', 'আশারকান্দি'] },
    { idSuffix: 'derai', nameBn: 'দিরাই', nameEn: 'Derai', unions: ['করিমপুর', 'জগদল', 'কুলঞ্জ', 'দিরাই সরমঙ্গল', 'রাজানগর', 'ভাটিপাড়া'] }
  ],
  'dist-habiganj': [
    { idSuffix: 'sadar', nameBn: 'হবিগঞ্জ সদর', nameEn: 'Habiganj Sadar', unions: ['লুকড়া', 'রিচি', 'তেঘোরিয়া', 'পইল', 'গোপায়া', 'রাজীউড়া', 'নিজামপুর'] },
    { idSuffix: 'madhabpur', nameBn: 'মাধবপুর', nameEn: 'Madhabpur', unions: ['ধর্মঘর', 'চৌমুহনী', 'বহরা', 'শাহজাহানপুর', 'আন্দিউড়া', 'জগদীশপুর', 'বাঘাসুরা'] },
    { idSuffix: 'chunarughat', nameBn: 'চুনারুঘাট', nameEn: 'Chunarughat', unions: ['গাজীপুর', 'আহমদাবাদ', 'দেওরগাছ', 'পাইকপাড়া', 'রানীগাঁও', 'মিরাশী', 'উবাহাটা'] },
    { idSuffix: 'bahubal', nameBn: 'বাহুবল', nameEn: 'Bahubal', unions: ['স্নানঘাট', 'পুটিজুরী', 'সাতকাপন', 'বাহুবল সদর', 'ভাদেশ্বর', 'মিরপুর'] }
  ],

  // 8. MYMENSINGH DIVISION (4 Districts)
  'dist-mymensingh': [
    { idSuffix: 'sadar', nameBn: 'ময়মনসিংহ সদর', nameEn: 'Mymensingh Sadar', unions: ['বোররচর', 'পরানগঞ্জ', 'সিরতা', 'চরঈশ্বরদিয়া', 'দাপুনিয়া', 'ভাবখালী', 'কুষ্টিয়া', 'খাগডহর'] },
    { idSuffix: 'trishal', nameBn: 'ত্রিশাল', nameEn: 'Trishal', unions: ['ধানীখোলা', 'বৈলর', 'কাঁঠাল', 'কানিহারী', 'রামপুর', 'আমিরাবাদ', 'সাখুয়া', 'বালিপাড়া'] },
    { idSuffix: 'muktagachha', nameBn: 'মুক্তাগাছা', nameEn: 'Muktagachha', unions: ['দাওয়াগাঁও', 'তারাটি', 'তারাগন্ড', 'কাশিমপুর', 'বাসাটি', 'ঘোগা', 'কুমারগাতা', 'মানকোন'] },
    { idSuffix: 'bhaluka', nameBn: 'ভালুকা', nameEn: 'Bhaluka', unions: ['উথুরা', 'মেদুয়ারী', 'ভরাডোবা', 'ধীতপুর', 'মল্লিকবাড়ী', 'বিরুনিয়া', 'হবিরবাড়ী'] },
    { idSuffix: 'fulbaria', nameBn: 'ফুলবাড়িয়া', nameEn: 'Fulbaria', unions: ['বাকতা', 'কুশমাইল', 'রাধাকানাই', 'আছিম পাটুলী', 'ভবানীপুর', 'এনায়েতপুর', 'কালিদহ'] },
    { idSuffix: 'gafargaon', nameBn: 'গফরগাঁও', nameEn: 'Gafargaon', unions: ['রসুলপুর', 'বারবাড়িয়া', 'সালটিয়া', 'পাঁচবাগ', 'মশাখালী', 'উস্থি', 'পাইথল'] },
    { idSuffix: 'iswarganj', nameBn: 'ঈশ্বরগঞ্জ', nameEn: 'Iswarganj', unions: ['ঈশ্বরগঞ্জ সদর', 'জাটিয়া', 'উচাখিলা', 'তারুন্দিয়া', 'বড়হিত', 'মাইজবাগ', 'মগটুলা'] }
  ],
  'dist-jamalpur': [
    { idSuffix: 'sadar', nameBn: 'জামালপুর সদর', nameEn: 'Jamalpur Sadar', unions: ['কেন্দুয়া', 'শরীফপুর', 'লক্ষ্মীরচর', 'তুলশীরচর', 'মেষ্টা', 'ঘোড়াধাপ', 'বাঁশচড়া', 'রানাগাছা'] },
    { idSuffix: 'melandaha', nameBn: 'মেলান্দহ', nameEn: 'Melandaha', unions: ['কুলিয়া', 'নাংলা', 'মাহমুদপুর', 'ঝাউগড়া', 'ঘোষেরপাড়া', 'দুরমুঠ', 'আদিরপাড়া'] },
    { idSuffix: 'sarishabari', nameBn: 'সরিষাবাড়ী', nameEn: 'Sarishabari', unions: ['ভাটারা', 'মাদারগঞ্জ সংলগ্ন', 'ডোনাপাড়া', 'সাতপোয়া', 'পোগলদিঘা', 'মহাদান', 'পিংনা'] },
    { idSuffix: 'islampur', nameBn: 'ইসলামপুর', nameEn: 'Islampur', unions: ['পলবান্ধা', 'কুঠিরচর', 'ইসলামপুর সদর', 'গাইবান্ধা ইউনিয়ন', 'চরগোয়ালিনী', 'চরপুটিমারী'] }
  ],
  'dist-sherpur': [
    { idSuffix: 'sadar', nameBn: 'শেরপুর সদর', nameEn: 'Sherpur Sadar', unions: ['কামারেরচর', 'চরশেরপুর', 'বাজিতখিলা', 'গাজীরখামার', 'লছমনপুর', 'বলাইরচর', 'পাকুড়িয়া', 'রৌহা'] },
    { idSuffix: 'nalitabari', nameBn: 'নালিতাবাড়ী', nameEn: 'Nalitabari', unions: ['কাকরকান্দি', 'নন্নী', 'পোগলদিঘা', 'নয়ানগর', 'রূপনারায়নকুড়া', 'বাঘবেড়', 'কলসপাড়'] },
    { idSuffix: 'nakla', nameBn: 'নকলা', nameEn: 'Nakla', unions: ['গণপদ্দী', 'বানেশ্বরদী', 'উরফা', 'পাঠাকাটা', 'টাকাউড়া', 'নকলা সদর', 'চন্দ্রকোনা'] },
    { idSuffix: 'jhenaigati', nameBn: 'ঝিনাইগাতী', nameEn: 'Jhenaigati', unions: ['কাংশা', 'ধানশাইল', 'নলকুড়া', 'গৌরীপুর', 'ঝিনাইগাতী সদর', 'মালিঝিকান্দা'] }
  ],
  'dist-netrokona': [
    { idSuffix: 'sadar', nameBn: 'নেত্রকোণা সদর', nameEn: 'Netrokona Sadar', unions: ['মৌগাতী', 'মেদনী', 'ঠাকুরাকোণা', 'রৌহা', 'কালিয়াঝুড়ি', 'অমৃতপুর', 'চল্লিশা'] },
    { idSuffix: 'durgapur', nameBn: 'দুর্গাপুর', nameEn: 'Durgapur', unions: ['সুসং দুর্গাপুর', 'কুল্লাগড়া', 'গাঁওকান্দিয়া', 'বিরিশিরি (সাদা মাটির জোন)', 'বাকলজোড়া', 'চণ্ডিগড়'] },
    { idSuffix: 'kendua', nameBn: 'কেন্দুয়া', nameEn: 'Kendua', unions: ['আশুজিয়া', 'চিথলিয়া', 'সান্দিকোনা', 'মাসকা', 'বলাইশিমুল', 'পাইকুড়া', 'গণ্ডা'] },
    { idSuffix: 'purbadhala', nameBn: 'পূর্বধলা', nameEn: 'Purbadhala', unions: ['হোগলা', 'ঘাগড়া', 'জারিয়া', 'পূর্বধলা সদর', 'আগিয়া', 'বিশকাকুনী'] }
  ]
};

// SAAO pool names for realistic assignment
const SAAO_NAMES = [
  'কৃষিবিদ মো. আনোয়ারুল হক',
  'কৃষিবিদ নাজমুন নাহার',
  'কৃষিবিদ রফিকুল ইসলাম ভূঁইয়া',
  'কৃষিবিদ দিলরুবা বেগম',
  'কৃষিবিদ মোহাম্মদ আশরাফুল ইসলাম',
  'কৃষিবিদ মাহমুদ হাসান',
  'কৃষিবিদ সাইদুর রহমান',
  'কৃষিবিদ ফাতেমা তুজ জোহরা',
  'কৃষিবিদ আবদুল মান্নান',
  'কৃষিবিদ জাকিয়া সুলতানা'
];

// Returns real upazilas for any of the 64 districts
export function getUpazilasForDistrict(districtId: string, districtNameBn?: string): Upazila[] {
  const upazilaItems = DISTRICT_UPAZILAS_MAP[districtId];
  if (upazilaItems && upazilaItems.length > 0) {
    return upazilaItems.map(item => ({
      id: `upz-${districtId}-${item.idSuffix}`,
      districtId,
      nameBn: item.nameBn,
      nameEn: item.nameEn
    }));
  }

  // Graceful fallback if unknown district
  const baseName = (districtNameBn || districtId).replace(/^(dist-|div-)/, '').replace(' জেলা', '');
  return [
    { id: `upz-${districtId}-sadar`, districtId, nameBn: `${baseName} সদর`, nameEn: `${baseName} Sadar` },
    { id: `upz-${districtId}-model`, districtId, nameBn: `${baseName} মডেল কৃষি উপজেলা`, nameEn: `${baseName} Model Upazila` }
  ];
}

// Returns real unions for an upazila with assigned SAAO and block names
export function getUnionsForUpazila(upazilaId: string, upazilaNameBn: string, districtId: string): Union[] {
  // Try locating in master map
  const upazilaItems = DISTRICT_UPAZILAS_MAP[districtId];
  let unionNames: string[] = [];

  if (upazilaItems) {
    const matched = upazilaItems.find(
      u => u.nameBn === upazilaNameBn || 
           upazilaId.endsWith(`-${u.idSuffix}`) || 
           upazilaId.includes(u.idSuffix)
    );
    if (matched && matched.unions.length > 0) {
      unionNames = matched.unions;
    }
  }

  if (unionNames.length === 0) {
    unionNames = [
      `${upazilaNameBn} সদর ইউনিয়ন / কৃষি ব্লক ১`,
      `${upazilaNameBn} উত্তর কৃষি ব্লক`,
      `${upazilaNameBn} দক্ষিণ কৃষি ব্লক`,
      'নদী তীরবর্তী / চর কৃষি ব্লক'
    ];
  }

  return unionNames.map((uName, idx) => {
    const charCodeSum = (districtId + upazilaId + uName).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const saaoName = SAAO_NAMES[charCodeSum % SAAO_NAMES.length];
    const mobileDigits = String(10000 + (charCodeSum % 89999));

    return {
      id: `uni-${upazilaId}-${idx + 1}`,
      upazilaId,
      districtId,
      nameBn: uName,
      nameEn: `Union Block ${idx + 1}`,
      blockNameBn: `${uName} কৃষি ব্লক ও এসএএও সেবা কেন্দ্র`,
      saaoNameBn: saaoName,
      saaoMobile: `০১৭${mobileDigits.slice(0, 2)}-${mobileDigits.slice(2)}`,
      centerAddressBn: `${uName} ইউনিয়ন পরিষদ কমপ্লেক্স ও ডিজিটাল কৃষি তথ্য সেবা কেন্দ্র`
    };
  });
}

// Generate Realistic Upazila Agriculture Office (DAE) for any selected Upazila
export function generateOfficeForUpazila(upazila: Upazila, district: District): AgricultureOffice {
  const officerFirstNames = [
    'কৃষিবিদ ড. এনামুল হক', 
    'কৃষিবিদ শাহনাজ বেগম', 
    'কৃষিবিদ এস এম তারিকুল ইসলাম', 
    'কৃষিবিদ মোহাম্মদ আনোয়ার হোসেন', 
    'কৃষিবিদ তানিয়া সুলতানা', 
    'কৃষিবিদ মো. মোস্তাফিজুর রহমান',
    'কৃষিবিদ কাজী আশরাফুল আলম',
    'কৃষিবিদ নাজমুল হাসান সরকার'
  ];
  const charCodeSum = (district.id + upazila.id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const officerName = officerFirstNames[charCodeSum % officerFirstNames.length];
  const mobileSuffix = String(10000 + (charCodeSum % 89999));

  // Attached unions with SAAO info
  const unions = getUnionsForUpazila(upazila.id, upazila.nameBn, district.id);

  return {
    id: `off-${upazila.id}`,
    upazilaId: upazila.id,
    districtId: district.id,
    nameBn: `উপজেলা কৃষি অফিস, ${upazila.nameBn}, ${district.nameBn}`,
    nameEn: `Upazila Agriculture Office, ${upazila.nameEn}, ${district.nameEn}`,
    addressBn: `উপজেলা পরিষদ কমপ্লেক্স, ${upazila.nameBn}, ${district.nameBn}`,
    phone: `০১৭০০-${mobileSuffix.slice(0, 5)}`,
    email: `uao.${upazila.nameEn.toLowerCase().replace(/[^a-z]/g, '')}@dae.gov.bd`,
    officeHoursBn: 'রবি-বৃহস্পতি: সকাল ৯:০০ - বিকাল ৫:০০ (সরকারি কর্মদিবস)',
    officerNameBn: officerName,
    officerDesignationBn: 'উপজেলা কৃষি কর্মকর্তা (UAO) ও দায়িত্বপ্রাপ্ত এসএএও সমন্বয়ক',
    officerMobile: `০১৭১১-${mobileSuffix}`,
    hotline: '১৬১২৩',
    unions
  };
}

// Area-tailored Weather Intelligence per Division, District & Union
export function generateRegionalWeather(
  district: District, 
  upazilaNameBn?: string,
  unionNameBn?: string
): WeatherCondition {
  const div = district.divisionId;
  let temp = 28;
  let humidity = 78;
  let rainForecast = 0;
  let windSpeed = 10;
  let conditionBn = 'স্বাভাবিক রৌদ্রোজ্জ্বল ও মৃদু বাতাস';
  let suitability: WeatherCondition['applicationSuitability'] = 'FAVORABLE';
  let warning: string | undefined = undefined;

  const areaLabel = unionNameBn 
    ? `${unionNameBn}, ${upazilaNameBn || ''}` 
    : upazilaNameBn 
      ? `${upazilaNameBn}, ${district.nameBn}` 
      : district.nameBn;

  // Regional Agro-Climate Logic
  if (div === 'div-rangpur') {
    temp = 24;
    humidity = 88;
    windSpeed = 8;
    conditionBn = `${areaLabel} এলাকায় কুয়াশাচ্ছন্ন সকাল ও আর্দ্র আবহাওয়া`;
    suitability = 'MODERATE';
    warning = 'ঘন কুয়াশার কারণে আলু ও টমেটোতে লেট ব্লাইটের তীব্র আক্রমণ হতে পারে। শিশির ভেজা অবস্থায় স্প্রে করবেন না; পাতা শুকানোর পর স্প্রে করুন।';
  } else if (div === 'div-rajshahi') {
    temp = 33;
    humidity = 62;
    windSpeed = 12;
    conditionBn = `${areaLabel} এলাকায় উষ্ণ ও প্রখর রৌদ্রোজ্জ্বল আবহাওয়া`;
    suitability = 'FAVORABLE';
    warning = 'তীব্র রোদে দুপুর ১২টা-৩টার মধ্যে স্প্রে করলে পাতায় রাসায়নিক দহন ক্ষতি হতে পারে। সকাল ১০টার পূর্বে অথবা শেষ বিকেলে স্প্রে সম্পন্ন করুন।';
  } else if (div === 'div-khulna' || div === 'div-barishal') {
    temp = 29;
    humidity = 90;
    rainForecast = 8;
    windSpeed = 16;
    conditionBn = `${areaLabel} এলাকায় উপকূলীয় আর্দ্র বাতাস ও মেঘলা আকাশ`;
    suitability = 'MODERATE';
    warning = 'উপকূলীয় আর্দ্র বাতাস বিদ্যমান। আগামী ১২ ঘণ্টায় বিচ্ছিন্ন বৃষ্টির সম্ভাবনা বিবেচনায় নিয়ে স্প্রে করার সময় নির্ধারণ করুন।';
  } else if (div === 'div-sylhet') {
    temp = 26;
    humidity = 86;
    rainForecast = 14;
    windSpeed = 11;
    conditionBn = `${areaLabel} এলাকায় হালকা থেকে মাঝারি বৃষ্টির পূর্বাভাস`;
    suitability = 'PROHIBITED';
    warning = 'বৃষ্টির পূর্বাভাস রয়েছে। রাসায়নিক কীটনাশক বা ছত্রাকনাশক স্প্রে করা কঠোরভাবে স্থগিত রাখুন, অন্যথায় বৃষ্টিতে ওষুধ ধুয়ে অপচয় ও জলাশয় দূষিত হবে।';
  } else {
    temp = 29;
    humidity = 80;
    rainForecast = 2;
    windSpeed = 9;
    conditionBn = `${areaLabel} এলাকায় আংশিক মেঘলা ও সহনীয় আবহাওয়া`;
    suitability = 'FAVORABLE';
    warning = 'আবহাওয়া অনুকূল রয়েছে। সকালে রোদ ওঠার পর অথবা শেষ বিকেলে অনুমোদিত মাত্রায় স্প্রে করা যাবে।';
  }

  return {
    temperatureC: temp,
    humidityPercent: humidity,
    rainfallForecastMm: rainForecast,
    windSpeedKmh: windSpeed,
    weatherConditionBn: conditionBn,
    applicationSuitability: suitability,
    weatherWarningBn: warning
  };
}

// Region specific crop advisories
export function getRegionalCropAdvice(
  districtId: string, 
  upazilaNameBn?: string, 
  unionNameBn?: string
): { 
  topCropsBn: string[]; 
  specialNoteBn: string; 
  aezNameBn: string; 
  seasonalAlertBn: string; 
} {
  if (['dist-munshiganj', 'dist-bogura', 'dist-dinajpur', 'dist-rangpur', 'dist-joypurhat'].includes(districtId)) {
    return {
      topCropsBn: ['গোল আলু (উফশী ও ডায়মন্ট)', 'বোরো ধান (ব্রি ধান ২৮, ২৯, ৮৯)', 'শীতকালীন টমেটো', 'ভুট্টা'],
      aezNameBn: 'তিস্তা পললভূমি ও বরেন্দ্র এলাকা (AEZ-3 / AEZ-25)',
      specialNoteBn: 'এই অঞ্চল দেশের আলু ও শীতকালীন সবজির প্রধান শস্য বলয়। কুয়াশার কারণে আগাম লেট ব্লাইট সতর্কতা মেনে চলুন।',
      seasonalAlertBn: 'আলুর গাছে পানি জমতে দেবেন না এবং নিয়মিত পাতার নিচে কালো ছোপ বা দাগ আছে কিনা পরীক্ষা করুন।'
    };
  }
  if (['dist-rajshahi', 'dist-chapainawabganj', 'dist-naogaon', 'dist-natore'].includes(districtId)) {
    return {
      topCropsBn: ['আম (আম্রপালি, ফজলি, খিরসাপাত)', 'ধান (আউশ ও রোপা আমন)', 'গম ও বার্লি', 'সরিষা ও মসুর ডাল'],
      aezNameBn: 'উচ্চ বরেন্দ্র ভূমি (AEZ-26)',
      specialNoteBn: 'বরেন্দ্র অঞ্চলের আবহাওয়ায় আমের মুকুল ও মটর দানার বালাই ব্যবস্থাপনায় বিশেষ সতর্কতা প্রয়োজন।',
      seasonalAlertBn: 'আমের হপার পোকা ও অ্যানথ্রাকনোজ দমনে মুকুল আসার পূর্বে অনুমোদিত পরামর্শ নিন।'
    };
  }
  if (['dist-satkhira', 'dist-bagerhat', 'dist-khulna', 'dist-patuakhali', 'dist-barguna'].includes(districtId)) {
    return {
      topCropsBn: ['লবণাক্ততা সহনশীল ধান (ব্রি ধান ৬৭, ৯৭, ৯৯)', 'তরমুজ ও বাঙ্গি', 'ঘেরের মাচায় সবজি (করলা, লাউ)'],
      aezNameBn: 'গাঙ্গেয় জোয়ার-ভাটা পললভূমি ও লবণাক্ত উপকূলীয় অঞ্চল (AEZ-13)',
      specialNoteBn: 'মাটির লবণাক্ততা পরিমাপ করে সেচ দিন এবং লবণাক্ততাসহিষ্ণু অনুমোদিত জাত চাষ করুন।',
      seasonalAlertBn: 'ঘেরের বাঁধে সবজি আবাদে জৈব সারের ব্যবহার বাড়ান এবং খরা মৌসুমে মিষ্টি পানির সেচ নিশ্চিত করুন।'
    };
  }
  if (['dist-sylhet', 'dist-moulvibazar', 'dist-habiganj', 'dist-sunamganj', 'dist-kishoreganj', 'dist-netrokona'].includes(districtId)) {
    return {
      topCropsBn: ['হাওরের বোরো ধান (ব্রি ধান ৮৮, ৯২)', 'চা', 'লেবু, কমলা ও সাতকড়া', 'আনারস'],
      aezNameBn: 'সুরমা-কুশিয়ারা পললভূমি ও সিলেট অববাহিকা (AEZ-20 / AEZ-21)',
      specialNoteBn: 'হাওর এলাকায় আকস্মিক পাহাড়ি ঢল ও আগাম বৃষ্টির ঝুঁকি মাথায় রেখে দ্রুত পরিপক্ব ধান কর্তন করুন।',
      seasonalAlertBn: 'ধানের শতকরা ৮০ ভাগ পেকে গেলেই কালক্ষেপণ না করে দ্রুত কেটে শুকিয়ে সংরক্ষণ করুন।'
    };
  }
  if (['dist-chattogram', 'dist-coxsbazar', 'dist-feni'].includes(districtId)) {
    const isBanshkhali = upazilaNameBn?.includes('বাঁশখালী') || false;
    return {
      topCropsBn: isBanshkhali
        ? ['ঐতিহ্যবাহী বাঁশখালী মিষ্টি পান', 'লবণ-সহনশীল আমন ও বোরো ধান (ব্রি ধান ৬৭, ৮৭, ৯৭)', 'উপকূলীয় চরের তরমুজ', 'সুপারি ও নারিকেল', 'চা (চাঁদপুর বেলগাঁও বাগান)', 'সরিষা, মরিচ ও মিষ্টি আলু', 'পেয়ারা, করলা ও শাকসবজি']
        : ['আমন ও বোরো ধান (ব্রি ধান ৪৯, ৮৭, বিনাশাইল)', 'মিষ্টি পান ও সুপারি', 'উপকূলীয় চরের তরমুজ ও খিরা', 'গোল বেগুন ও শীতকালীন সবজি', 'চা ও পাহাড়ি ফল'],
      aezNameBn: 'চট্টগ্রাম উপকূলীয় সমভূমি ও পাহাড়ি পাদদেশীয় অঞ্চল (AEZ-23 ও AEZ-29)',
      specialNoteBn: isBanshkhali
        ? 'বাঁশখালীর সুমিষ্ট পান, চরের তরমুজ, বেলগাঁওয়ের চা এবং উপকূলীয় লবণাক্ততা সহনশীল ধান অত্যন্ত গুরুত্বপূর্ণ। পানের বরজে ডাল পচা ও পাতা দাগ রোগ দমনে নিষ্কাশন নিশ্চিত করুন।'
        : 'উপকূলীয় জোয়ার-ভাটা এবং পাহাড়ি ঢালের জলবায়ুর ভারসাম্য বজায় রেখে সময়োপযোগী সার ও বালাই ব্যবস্থাপনা নিন।',
      seasonalAlertBn: 'উপকূলীয় চরাঞ্চলে জোয়ারের নোনা পানি প্রবেশের সম্ভাবনা থাকলে মিষ্টি পানির ড্রেনেজ পরিষ্কার রাখুন এবং ব্রি ধান ৬৭/৯৭ রোপণ করুন।'
    };
  }
  if (['dist-tangail', 'dist-narsingdi', 'dist-gazipur', 'dist-mymensingh'].includes(districtId)) {
    return {
      topCropsBn: ['উফশী বোরো ধান', 'মধুপুরের আনারস ও কলা', 'সবজি (বেগুন, শিম, পটল, ঢেঁড়শ)', 'পেঁপে ও লটকন'],
      aezNameBn: 'মধুপুর গড় এলাকা (AEZ-28)',
      specialNoteBn: 'লাল মাটির অম্লীয় ভাব কমাতে ডলোমাইট চুন ব্যবহার করুন এবং মাটিতে জৈব পদার্থের সরবরাহ বজায় রাখুন।',
      seasonalAlertBn: 'বেগুনের ডগা ও ফল ছিদ্রকারী পোকা দমনে সেক্স ফেরোমোন ফাঁদ ব্যবহার করুন।'
    };
  }
  return {
    topCropsBn: ['উফশী বোরো ও আমন ধান', 'টমেটো', 'বেগুন', 'মরিচ', 'শসা ও করলা'],
    aezNameBn: 'সক্রিয় ব্রহ্মপুত্র ও যমুনা পললভূমি (AEZ-8)',
    specialNoteBn: 'সমন্বিত বালাই ব্যবস্থাপনা (IPM) নীতি অনুসরণ করে বন্ধু পোকা সংরক্ষণ করুন।',
    seasonalAlertBn: 'জমিতে আলোর ফাঁদ ও পার্চিং (ডাল পোতা) পদ্ধতি প্রয়োগ করে পোকার আক্রমণ দমন করুন।'
  };
}
