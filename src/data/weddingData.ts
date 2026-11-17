import { EventItem, GuestRsvp, GuestbookEntry, GalleryPhoto, RegistryItem, BudgetItem, SeatingTable } from '../types/wedding';

// Wedding date: November 22, 2026 at 9:46 AM IST
export const WEDDING_DATE_ISO = '2026-11-22T09:46:00+05:30';

// Pelli Koduku & Pandiri date: November 21, 2026 IST
export const PELLIKODUKU_DATE_ISO = '2026-11-21T09:00:00+05:30';

// Haldi date: November 20, 2026 IST
export const HALDI_DATE_ISO = '2026-11-20T09:00:00+05:30';

// Venue Map Links & Coordinates
export const HALDI_PELLIKODUKU_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=18.654689,78.106245';
export const HALDI_PELLIKODUKU_COORDS = { lat: 18.654689, lng: 78.106245 };
export const WEDDING_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Sai+Baba+Temple+Madhav+Nagar+Nizamabad+Telangana';
export const WEDDING_COORDS = { lat: 18.6725, lng: 78.0941 };

const assetImages = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const COUPLE_PORTRAIT_URL =
  assetImages['../assets/images/hari.png'] || '/images/hari.png';

export const COUPLE_PORTRAIT_FALLBACK_URL =
  '/images/hari.png';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'haldi-mangala-snanam',
    titleEn: 'Haldi & Mangala Snanam',
    titleTe: 'హల్దీ వేడుక & మంగళస్నానం',
    dateStrEn: 'Friday, Nov 20, 2026',
    dateStrTe: 'శుక్రవారం, నవంబర్ 20, 2026',
    timeEn: '09:00 AM onwards',
    timeTe: 'ఉదయం 09:00 గంటల నుండి',
    venueEn: 'Nizamabad, Telangana 503001 (Google Maps Pin)',
    venueTe: 'నిజామాబాద్, తెలంగాణ 503001 (గూగుల్ మ్యాప్స్ పిన్)',
    mapUrl: HALDI_PELLIKODUKU_MAP_URL,
    descriptionEn: 'Joyous haldi ceremony with pure turmeric paste, fragrant rose petals, auspicious folk songs, and sacred herbal mangala snanam.',
    descriptionTe: 'ముత్తైదువలు కలిసి పచ్చి పసుపు, సుగంధ పరిమళాలు మరియు పూల వర్షంతో జరిపే ఆహ్లాదకరమైన హల్దీ & మంగళస్నానం.',
    significanceEn: 'Purifies the body and mind, symbolizes auspicious beginnings, prosperity, and family blessings.',
    significanceTe: 'శరీర, మనస్సుల పవిత్రత, సౌభాగ్యం మరియు మంగళకరమైన ఆరంభానికి ప్రతీక.',
    attireEn: 'Festive Yellow Traditional Wear',
    attireTe: 'పసుపు రంగు సాంప్రదాయ వస్త్రాలు',
    category: 'pre-wedding',
    icon: 'Sun',
  },
  {
    id: 'pellikoduku-pandiri',
    titleEn: 'Pelli Koduku & Pandiri Event',
    titleTe: 'పెళ్ళికొడుకు & పందిరి వేడుక',
    dateStrEn: 'Saturday, Nov 21, 2026',
    dateStrTe: 'శనివారం, నవంబర్ 21, 2026',
    timeEn: 'Morning Pandiri & Evening Pelli Koduku',
    timeTe: 'ఉదయం పందిరి రాట & సాయంత్రం పెళ్ళికొడుకు వేడుక',
    venueEn: 'Nizamabad, Telangana 503001 (Google Maps Pin)',
    venueTe: 'నిజామాబాద్, తెలంగాణ 503001 (గూగుల్ మ్యాప్స్ పిన్)',
    mapUrl: HALDI_PELLIKODUKU_MAP_URL,
    descriptionEn: 'Auspicious installation of the sacred wedding pandiri with fresh mango leaves, followed by elders anointing the groom with fragrant sandalwood, nalugu, and blessing him with traditional silks.',
    descriptionTe: 'పచ్చి మామిడాకుల తోరణాలతో పవిత్ర పందిరి రాట వేసి, పెద్దలందరూ పెళ్ళికొడుకుకు గంధం, నలుగు పెట్టి, పట్టు వస్త్రాలతో అలంకరించి ఆశీర్వదించే శుభ వేడుక.',
    significanceEn: 'Invokes divine blessings on the home and formally prepares the groom for the sacred Grihastha Ashrama.',
    significanceTe: 'గృహ శాంతి, విఘ్న నివారణ మరియు వరుడిని గృహస్థాశ్రమ స్వీకారానికి సిద్ధం చేసే మంగళకర వేడుక.',
    attireEn: 'Traditional Silk Sarees / Kurta with Angavastram',
    attireTe: 'సాంప్రదాయ పట్టు చీరలు / అంగవస్త్రంతో కూడిన కుర్తా',
    category: 'pre-wedding',
    icon: 'Sparkles',
  },
  {
    id: 'subha-muhurtham',
    titleEn: 'Wedding (Subha Muhurtham): Jeelakarra Bellam & Mangalasutra Dharana',
    titleTe: 'శుభ వివాహం (ముహూర్తం): జీలకర్ర-బెల్లం & మాంగళ్యధారణ',
    dateStrEn: 'Sunday, Nov 22, 2026',
    dateStrTe: 'ఆదివారం, నవంబర్ 22, 2026',
    timeEn: '09:46 AM (Subha Muhurtham)',
    timeTe: 'ఉదయం 09:46 గంటలకు (శుభ ముహూర్తం)',
    venueEn: 'Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana',
    venueTe: 'సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్, తెలంగాణ',
    mapUrl: WEDDING_MAP_URL,
    descriptionEn: 'The sacred Telugu wedding rituals of Keerthi & Hariprasad: holding cumin & jaggery paste over each other’s heads, tying the Mangalasutra with three sacred knots, and showering fragrant Talambralu.',
    descriptionTe: 'కీర్తి & హరిప్రసాద్‌ల శిరస్సులపై జీలకర్ర-బెల్లం ఉంచడం, ముల్లోకాల సాక్షిగా మూడు ముళ్ళు వేయడం, మరియు ఆనందోత్సాహాల నడుమ ముత్యాల తాళంబ్రాల మహోత్సవం.',
    significanceEn: 'Jeelakarra Bellam symbolizes eternal inseparability; Mangalasutra represents lifelong protection; Talambralu brings prosperity and joy.',
    significanceTe: 'జీలకర్ర-బెల్లం కలయిక విడదీయరాని బంధానికి, మాంగళ్యధారణ రక్షణకు, తాళంబ్రాలు సమృద్ధికి ప్రతీకలు.',
    attireEn: 'Traditional Kanchipuram Pattu Saree & Silk Dhoti',
    attireTe: 'సాంప్రదాయ కాంచీపురం పట్టు చీర & పట్టు పంచె',
    category: 'ceremony',
    icon: 'Crown',
  },
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'photo-1',
    url: '/images/hero_telangana_wedding_1791062758055.jpg',
    captionEn: 'The sacred Kalyana Mandapam decked with fresh marigolds, mango toranam, and glowing lamps',
    captionTe: 'బంతిపూలు, మామిడాకుల తోరణాలు మరియు దీపకాంతులతో శోభిల్లుతున్న కళ్యాణ వేదిక',
    category: 'rituals',
  },
  {
    id: 'photo-2',
    url: COUPLE_PORTRAIT_URL,
    captionEn: 'Keerthi & Hariprasad - Our Cartoon Caricature Portrait',
    captionTe: 'కీర్తి & హరిప్రసాద్ - ప్రత్యేక కార్టూన్ క్యారికేచర్ చిత్రం',
    category: 'couple',
  },
  {
    id: 'photo-3',
    url: '/images/telangana_wedding_rituals_1791062777431.jpg',
    captionEn: 'Sacred Talambralu moments with pearls, turmeric rice, and fragrant petals',
    captionTe: 'ముత్యాల తాళంబ్రాల వేడుక - పసుపు అక్షింతలు, గులాబీ పూల వర్షం',
    category: 'rituals',
  },
  {
    id: 'photo-4',
    url: '/images/telangana_haldi_celebration_1791062787214.jpg',
    captionEn: 'Haldi celebrations with brass urli and fresh blossoms',
    captionTe: 'హల్దీ సన్నాహాలు - ఇత్తడి గంగాళం, పసుపు పూలు మరియు అరటి తోరణాలు',
    category: 'haldi',
  },
];

// Empty by default: Only real guest blessings will be shown!
export const INITIAL_GUESTBOOK: GuestbookEntry[] = [];

export const INITIAL_RSVPS: GuestRsvp[] = [
  {
    id: 'KV-2026-1001',
    fullName: 'Venkatachalam Vangala & Family',
    email: 'venkat.vangala@example.com',
    phone: '+91 98480 22334',
    guestCount: 4,
    attendingEvents: ['haldi-mangala-snanam', 'pellikoduku-pandiri', 'subha-muhurtham'],
    dietaryPreference: 'pure-veg',
    accommodationNeeded: true,
    transportAssistance: true,
    travelDetails: 'Arriving from Warangal via Intercity Exp on Nov 20, 11 AM',
    personalNote: 'Looking forward to the divine kalyanam!',
    status: 'confirmed',
    tableId: 'table-1',
    createdAt: '2026-10-01',
  },
  {
    id: 'KV-2026-1002',
    fullName: 'Dr. Sudhakar Pandari',
    email: 'dr.sudhakar@example.com',
    phone: '+91 99890 55443',
    guestCount: 2,
    attendingEvents: ['subha-muhurtham'],
    dietaryPreference: 'pure-veg',
    accommodationNeeded: false,
    transportAssistance: false,
    personalNote: 'Warmest blessings to Keerthi & Hariprasad.',
    status: 'confirmed',
    tableId: 'table-1',
    createdAt: '2026-10-02',
  },
  {
    id: 'KV-2026-1003',
    fullName: 'Ananya Sharma & Rohit',
    email: 'ananya.s@example.com',
    phone: '+91 97000 11223',
    guestCount: 2,
    attendingEvents: ['haldi-mangala-snanam', 'subha-muhurtham'],
    dietaryPreference: 'telangana-traditional',
    accommodationNeeded: true,
    transportAssistance: true,
    travelDetails: 'Arriving from Hyderabad on Nov 20 evening',
    personalNote: 'So excited for the grand celebrations in Nizamabad!',
    status: 'confirmed',
    tableId: 'table-4',
    createdAt: '2026-10-02',
  },
  {
    id: 'KV-2026-1004',
    fullName: 'Bhavani Shankar Rao',
    email: 'bhavani.rao@example.com',
    phone: '+91 94401 77889',
    guestCount: 3,
    attendingEvents: ['subha-muhurtham', 'reception-vindu'],
    dietaryPreference: 'pure-veg',
    accommodationNeeded: false,
    transportAssistance: false,
    status: 'confirmed',
    tableId: 'table-2',
    createdAt: '2026-10-03',
  },
];

export const INITIAL_REGISTRY: RegistryItem[] = [
  {
    id: 'reg-1',
    titleEn: 'Traditional Brass Kuthuvilakku Pair (Kamadhenu Deepalu)',
    titleTe: 'సాంప్రదాయ ఇత్తడి కుతువిళక్కు / కామధేను దీపాలు',
    categoryEn: 'Pooja Mandir & Home',
    categoryTe: 'పూజా మందిరం & గృహోపకరణాలు',
    priceEstimate: 6500,
    claimed: false,
    descriptionEn: 'Hand-carved heavy brass temple oil lamps to illuminate the newlywed couple’s home altar with auspicious light.',
    descriptionTe: 'కొత్త కాపురంలో నిత్య దీపారాధన కొరకు సంప్రదాయబద్ధంగా తయారుచేసిన భారీ ఇత్తడి దీప స్తంభాలు.',
  },
  {
    id: 'reg-2',
    titleEn: 'Pure Silver Pooja Thali Set (Panchapatra & Bell)',
    titleTe: 'స్వచ్ఛమైన వెండి పూజా పళ్లెం, పంచపాత్ర & గంట',
    categoryEn: 'Heritage Silverware',
    categoryTe: 'వెండి ఆభరణాలు & పూజా వస్తువులు',
    priceEstimate: 22000,
    claimed: true,
    claimedBy: 'Pedananna & Doddamma',
    descriptionEn: 'Hallmarked pure 925 silver pooja set for daily nitya aradhana and festival pujas.',
    descriptionTe: 'నిత్య దైవారాధన మరియు పండుగల కొరకు స్వచ్ఛమైన వెండి పూజా సామాగ్రి.',
  },
  {
    id: 'reg-3',
    titleEn: 'Smart Wet Grinder for Traditional Dosa & Idli Batters',
    titleTe: 'సాంప్రదాయ పిండి వంటల కొరకు ప్రీమియం వెట్ గ్రైండర్',
    categoryEn: 'Kitchen & Culinary',
    categoryTe: 'వంటగది ఉపకరణాలు',
    priceEstimate: 9500,
    claimed: false,
    descriptionEn: 'Conical stone grinder for making authentic fluffy idlis, crispy dosas, and Telangana pindi vantalu.',
    descriptionTe: 'మంచి మెత్తటి ఇడ్లీలు, దోశల కొరకు ఉపయోగపడే ఆధునిక రాయి గ్రైండర్.',
  },
  {
    id: 'reg-4',
    titleEn: 'Honeymoon Retreat to God’s Own Country (Kerala Backwaters)',
    titleTe: 'హనీమూన్ విహార యాత్ర (కేరళ బ్యాక్‌వాటర్స్ & మున్నార్)',
    categoryEn: 'Couple Experience Fund',
    categoryTe: 'దంపతుల విహార యాత్ర నిధి',
    priceEstimate: 35000,
    claimed: false,
    upiOption: true,
    descriptionEn: 'Contribute to the couple’s relaxing post-wedding houseboat experience and Ayurvedic wellness retreat.',
    descriptionTe: 'పెళ్ళి వేడుకల అనంతరం నూతన దంపతుల ఆనందకర విహారయాత్ర మరియు సాంత్వన కొరకు కానుక.',
  },
  {
    id: 'reg-5',
    titleEn: 'Donation to Telangana Rural Girl Child Education (Beti Padhao)',
    titleTe: 'తెలంగాణ గ్రామీణ బాలికల విద్యా నిధికి విరాళం',
    categoryEn: 'Charitable Honor',
    categoryTe: 'సేవా కార్యక్రమం',
    priceEstimate: 5000,
    claimed: false,
    upiOption: true,
    descriptionEn: 'In honor of our wedding, sponsor education, books, and uniforms for underprivileged schoolgirls in Telangana.',
    descriptionTe: 'వధూవరుల వివాహ సంస్మరణార్థం పేద ఆడపిల్లల చదువు, పుస్తకాల కొరకు అందించే పవిత్ర సహాయం.',
  },
];

export const INITIAL_BUDGET: BudgetItem[] = [
  {
    id: 'b-1',
    category: 'mandapam',
    itemEn: 'Traditional Temple Mandapam & Fresh Flower Toranam (3 Days)',
    itemTe: 'సాంప్రదాయ ఆలయ నమూనా మండపం & పూల అలంకరణ',
    estimatedCost: 350000,
    actualCost: 340000,
    paid: true,
    vendorNotes: 'Siri Floral Designers, Hyderabad. High quality fresh marigold & jasmine.',
  },
  {
    id: 'b-2',
    category: 'catering',
    itemEn: '32-Item Telangana Vindu Bhojanam (Muhurtham & Reception)',
    itemTe: '32 రకాల విశిష్ట విందు భోజనం (ముహూర్తం & రిసెప్షన్)',
    estimatedCost: 550000,
    actualCost: 520000,
    paid: true,
    vendorNotes: 'Sri Venkateshwara Traditional Caterers. Pure ghee preparations.',
  },
  {
    id: 'b-3',
    category: 'jewelry',
    itemEn: 'Kanchipuram Silk Sarees, Pelli Dhoti & Zari vastralu',
    itemTe: 'కాంచీపురం పట్టుచీరలు, జరీ పట్టు పంచెలు',
    estimatedCost: 280000,
    actualCost: 295000,
    paid: true,
    vendorNotes: 'Direct weavers from Kanchipuram & Gadwal handlooms.',
  },
  {
    id: 'b-4',
    category: 'photo',
    itemEn: '4K Cinematic Wedding Film, Drone & Traditional Albums',
    itemTe: '4K సినిమాటిక్ వీడియో, డ్రోన్ షూట్ & ప్రీమియం ఆల్బమ్‌లు',
    estimatedCost: 200000,
    actualCost: 190000,
    paid: false,
    vendorNotes: 'Kalyanam Studios. Advance paid 50%, remaining on album delivery.',
  },
  {
    id: 'b-5',
    category: 'music',
    itemEn: 'Mangala Vadyam (Nadaswaram Vidwans) & Sangeet Sound/DJ',
    itemTe: 'మంగళ వాయిద్యాలు (నాదస్వరం విద్వాంసులు) & సంగీత్ డీజే',
    estimatedCost: 85000,
    actualCost: 80000,
    paid: true,
    vendorNotes: 'Accomplished temple vidwans for 2 full days of auspicious raagas.',
  },
  {
    id: 'b-6',
    category: 'purohit',
    itemEn: 'Chief Purohits, Veda Pandits Dakshina & Sacred Samagri',
    itemTe: 'ముఖ్య పురోహితులు, వేద పండితుల సత్కారం & పూజా ద్రవ్యాలు',
    estimatedCost: 60000,
    actualCost: 60000,
    paid: true,
    vendorNotes: 'Samavedam & Yajurveda scholars conducting all shastric rituals.',
  },
  {
    id: 'b-7',
    category: 'travel',
    itemEn: 'Guest Suite Rooms & Airport Shuttles (20 Rooms for 3 Days)',
    itemTe: 'అతిథుల ఏసీ రూములు & విమానాశ్రయ వాహన సదుపాయం',
    estimatedCost: 220000,
    actualCost: 215000,
    paid: false,
    vendorNotes: 'Guest Suites & Hospitality, Nizamabad.',
  },
];

export const INITIAL_TABLES: SeatingTable[] = [
  {
    id: 'table-1',
    nameEn: 'Mandapam Front - Pandari & Vangala Elders',
    nameTe: 'మండపం ముందు వరుస - పెద్దలు',
    capacity: 8,
    zone: 'vip-mandapam',
    assignedGuestIds: ['KV-2026-1001', 'KV-2026-1002'],
  },
  {
    id: 'table-2',
    nameEn: "Groom's Extended Family & Relatives",
    nameTe: 'వరుడి బంధుమిత్రులు',
    capacity: 10,
    zone: 'groom-family',
    assignedGuestIds: ['KV-2026-1004'],
  },
  {
    id: 'table-3',
    nameEn: "Bride's Extended Family & Relatives",
    nameTe: 'వధువు బంధుమిత్రులు',
    capacity: 10,
    zone: 'bride-family',
    assignedGuestIds: [],
  },
  {
    id: 'table-4',
    nameEn: "Tech & Science Colleagues, School Friends",
    nameTe: 'స్నేహితులు & సహోద్యోగులు',
    capacity: 8,
    zone: 'friends',
    assignedGuestIds: ['KV-2026-1003'],
  },
  {
    id: 'table-5',
    nameEn: 'Dining Hall - VIP Plantain Leaf Row 1',
    nameTe: 'విందు శాల - ప్రత్యేక అరటి ఆకు వరుస 1',
    capacity: 12,
    zone: 'dining-hall',
    assignedGuestIds: [],
  },
];
