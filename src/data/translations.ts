import { HALDI_VENUE, IS_KEERTHI_SIDE, KEERTHI_FORMALITIES, SIDE_CEREMONY } from './weddingData';

export const translations = {
  en: {
    // Navigation & Common
    appTitle: 'Keerthi & Hariprasad Kalyana Mahotsavam',
    subtitle: 'Keerthi & Hariprasad Wedding Celebration',
    navInvitation: 'Invitation',
    navEvents: 'Schedule',
    navGallery: 'Gallery',
    navRsvp: 'RSVP',
    navGuestbook: 'Guestbook',
    navRegistry: 'Registry',
    navVenue: 'Venue & Map',
    navBudget: 'Budget Planner',
    navSeating: 'Seating Chart',
    navAdmin: 'Host Dashboard',
    langToggle: 'తెలుగు',

    // Hero Section
    auspiciousGreeting: '|| Sri Ganeshayanamaha || Sri Sita Rama Chandra Parabrahmane Namaha ||',
    heroKicker: 'An Auspicious Union Blessed By The Elders',
    groomName: 'Hariprasad',
    groomParents: 'S/o Smt. J. Laxmi & Sri J. Narayana',
    brideName: 'Keerthi',
    brideParents: 'D/o Smt. O. Bhagyalaxmi & Sri O. Kishan',
    andSymbol: '&',
    weddingDateFull: 'Sunday, November 22, 2026',
    muhurthamTime: IS_KEERTHI_SIDE
      ? `Subha Muhurtham: 9:46 AM (Nov 22) | Pandiri (8 AM), Pelli Kuthuru & Haldi (6 PM): Nov 20 | Formalities (2 PM): Nov 21`
      : `Subha Muhurtham: 9:46 AM (Nov 22) | Haldi: Nov 20 | ${SIDE_CEREMONY.shortAndPandiriEn}: ${SIDE_CEREMONY.dateShortEn}`,
    venueLocationHero: 'Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana',
    blessTheCouple: 'Shower Akshinthalu',
    rsvpNowBtn: 'Confirm Your RSVP',
    addToCalBtn: 'Add to Calendar',

    // Countdown
    countdownDays: 'Days',
    countdownHours: 'Hours',
    countdownMinutes: 'Minutes',
    countdownSeconds: 'Seconds',
    countdownTitle: 'Countdown to the Sacred Muhurtham',
    countdownSub: 'Counting every blessed moment until we take the seven sacred steps (Saptapadi)',

    // Couple Story
    storyTitle: 'The Blessed Journey',
    storySub: 'Two souls united by destiny, with the warmth of family and traditions',
    groomTitle: 'The Groom',
    groomBio: 'Software Architect & Tech Lead, S/o Smt. J. Laxmi & Sri J. Narayana. Rooted in traditional values with a passion for soulful music and tech innovation.',
    brideTitle: 'The Bride',
    brideBio: 'Biomedical Scientist, D/o Smt. O. Bhagyalaxmi & Sri O. Kishan. Classical art enthusiast and researcher devoted to life sciences and cultural arts.',
    familyBlessing: 'With the divine blessings of our beloved grandparents, parents, and family elders, we cordially invite you and your family to grace our wedding celebration.',

    // Event Schedule
    eventsSectionTitle: 'Pelli Pandiri - Auspicious Events',
    eventsSectionSub: IS_KEERTHI_SIDE
      ? `Experience the grandeur of traditional Telangana marriage rituals: Pandiri 8:00 AM, Pelli Kuthuru Morning & Haldi 6:00 PM (Nov 20), Formalities 2:00 PM (Nov 21), and Wedding (Nov 22)`
      : `Experience the grandeur of traditional Telangana marriage rituals: Haldi (Nov 20), ${SIDE_CEREMONY.shortAndPandiriEn} (${SIDE_CEREMONY.dateShortEn}), and Wedding (Nov 22)`,
    filterAll: 'All Events',
    filterPre: 'Pre-Wedding',
    filterCeremony: 'Sacred Rituals',
    filterReception: 'Celebrations',
    significanceLabel: 'Cultural Significance:',
    attireLabel: 'Suggested Attire:',
    timeVenueLabel: 'Time & Venue:',
    calendarExport: 'Add Event',

    // Gallery
    galleryTitle: 'Kalyana Thoranam - Memories & Gallery',
    gallerySub: 'Cherished memories from our pre-wedding ceremonies, rituals, and guest-shared memories',
    tabAll: 'All Photos',
    tabCouple: 'Couple',
    tabHaldi: 'Pasupu & Haldi',
    tabRituals: 'Ceremony',
    tabGuestLive: 'Guest Live Wall',
    uploadPhotoBtn: 'Share Your Photos',
    uploadTitle: 'Upload Wedding Moments',
    uploadPrompt: 'Share candid photos taken during our ceremonies to be featured on our live wedding wall!',
    guestNamePlaceholder: 'Your Name (e.g. Ramesh Uncle)',
    captionPlaceholder: 'Add a warm memory or caption...',
    uploadSuccess: 'Photo uploaded successfully! It is now part of our live memory wall.',

    // RSVP Section
    rsvpTitle: 'Athidhi Devo Bhava - RSVP',
    rsvpSub: 'Your gracious presence is our biggest blessing. Kindly let us know your travel and attendance plans by November 18, 2026.',
    fullNameLabel: 'Full Name / Head of Family',
    emailLabel: 'Email Address (for Digital Invite Pass)',
    phoneLabel: 'Phone Number (WhatsApp)',
    guestsCountLabel: 'Total Number of Attendees',
    eventsAttendingLabel: 'Events You Will Be Gracing:',
    dietaryLabel: 'Food & Dining Preference:',
    dietVeg: 'Traditional Telangana Pure Veg Vindu Bhojanam (Banana Leaf)',
    dietTraditional: 'Authentic South Indian & Telangana Specialities',
    dietJain: 'Jain Meal (No Onion / No Garlic)',
    dietNoPref: 'No Specific Dietary Preference',
    accommodationLabel: 'Need Accommodation / Hotel Assistance in Nizamabad?',
    transportLabel: 'Need Railway Station / Bus Stand Pick-up Assistance?',
    travelDetailsLabel: 'Travel Details (Arrival Train/Bus, Date, Time)',
    personalNoteLabel: 'Personal Message / Blessings for Bride & Groom',
    submitRsvpBtn: 'Confirm Attendance & Generate Pass',
    submittingRsvp: 'Confirming RSVP...',
    rsvpSuccessTitle: 'RSVP Confirmed with Gratitude!',
    rsvpSuccessPassMsg: 'Your digital wedding pass and schedule confirmation has been generated.',
    copyPassBtn: 'Copy Digital Pass',
    emailSimNotice: 'Automated email confirmation notification sent to your email with wedding pass QR code.',

    // Registry & Shagun
    registryTitle: 'Aasheervadame Mukhyam - Gifts & Registry',
    registrySub: 'Your love and blessings are the greatest gifts we could ever receive. For guests who insist on blessing us with gifts or Chadivimpulu:',
    blessingFirstHeader: 'Blessings Are Our Greatest Wealth',
    blessingFirstBody: 'In South Indian tradition, the most cherished gift is your heartfelt presence and showering of sacred Akshinthalu on the bride and groom during Talambralu.',
    chadivimpuTitle: 'Traditional Chadivimpu & Shagun (UPI / Digital)',
    chadivimpuSub: 'Scan via any UPI App (GPay / PhonePe / Paytm) or direct bank transfer to bless the couple.',
    scanUpi: 'Scan for Shagun UPI Transfer',
    copyUpiId: 'Copy UPI ID: kalyanam.pandari@okaxis',
    copiedText: 'Copied to clipboard!',
    wishlistTab: 'Curated Gift Wishlist',
    markClaimedBtn: 'Bless with This Gift',
    claimedBadge: 'Already Gifted with Love',

    // Guestbook
    guestbookTitle: 'Subhakankshalu - Blessings Guestbook',
    guestbookSub: 'Shower the newlyweds with your heartfelt prayers, warm wishes, and memories',
    writeBlessing: 'Write a Blessing',
    yourName: 'Your Name',
    yourRelation: 'Your Relation (e.g. Groom\'s Friend, Bride\'s Cousin, Elder)',
    yourBlessing: 'Your Message or Blessing',
    quickTeluguBlessings: 'Quick Auspicious Telugu Blessings:',
    postBlessingBtn: 'Post Your Blessing',
    likeBlessing: 'Bless',

    // Venue & Map
    venueTitle: 'Shubha Vedika - Venue & Directions',
    venueSub: IS_KEERTHI_SIDE
      ? `Join Pandiri (8 AM), Pelli Kuthuru, Haldi (6 PM) & Formalities (2 PM) at ${HALDI_VENUE.shortLabelEn}, and the Sacred Wedding at Sai Baba Temple, Madhav Nagar, Nizamabad.`
      : `Join Haldi at ${HALDI_VENUE.shortLabelEn}, ${SIDE_CEREMONY.shortEn} in Nizamabad, and the Sacred Wedding at Sai Baba Temple, Madhav Nagar, Nizamabad.`,
    mainHall: 'Wedding Venue: Sai Baba Temple, Madhav Nagar, Nizamabad',
    addressLine: 'Madhav Nagar, Nizamabad, Telangana 503001',
    receptionHall: IS_KEERTHI_SIDE
      ? `Pandiri, Pelli Kuthuru, Haldi & ${KEERTHI_FORMALITIES.titleEn} Venue`
      : `Haldi & ${SIDE_CEREMONY.shortEn} Venues, Nizamabad`,
    receptionAddressLine: IS_KEERTHI_SIDE
      ? `${HALDI_VENUE.shortLabelEn} · Haldi: Nov 20 (6 PM) · Formalities: Nov 21 (2 PM)`
      : `Haldi: ${HALDI_VENUE.shortLabelEn} · ${SIDE_CEREMONY.shortEn}: Nizamabad 503001`,
    openGoogleMaps: 'Open in Google Maps',
    openAppleMaps: 'Open in Apple Maps',
    bookRapido: 'Book Rapido Ride to Venue',
    transportInfo: 'Travel & Proximity Information:',
    airportDist: 'Hyderabad RGIA Airport / NH-44 Express Highway connectivity',
    railwayDist: 'Nizamabad Junction Railway Station (NZB): ~10 mins',
    parkingInfo: 'Dedicated guest parking available near the temple premises.',

    // Seating Planner
    seatingTitle: 'Mandapam Seating & Layout Planner',
    seatingSub: 'Interactive hall seating layout for the auspicious ceremony and dining',
    unassignedGuests: 'Unassigned Attendees',
    assignTablePrompt: 'Click a guest or drag to assign to a table',
    tableCapacity: 'Capacity',
    seatsFilled: 'Filled',
    filterZone: 'Filter Zone',
    addTableBtn: 'Add New Table',

    // Budget Tracker
    budgetTitle: 'Kalyana Kharchulu - Wedding Budget Tracker',
    budgetSub: 'Manage and monitor traditional Telangana wedding expenditures transparently',
    totalBudget: 'Total Allocated Budget',
    totalSpent: 'Actual Committed / Spent',
    balanceRemaining: 'Remaining Balance',
    addExpenseBtn: 'Add Expense Item',
    categoryMandapam: 'Mandapam & Floral Decor',
    categoryCatering: 'Vindu Bhojanam (Catering)',
    categoryJewelry: 'Pattu Sarees & Gold Jewelry',
    categoryPhoto: 'Photography & 4K Cinema',
    categoryMusic: 'Mangala Vadyam & Sangeet',
    categoryPurohit: 'Purohit & Puja Samagri',
    categoryTravel: 'Guest Stay & Transport',

    // Admin Dashboard
    adminTitle: 'Host Management Dashboard',
    adminSub: 'Real-time overview of guest RSVPs, seating, dietary preferences, and event logistics',
    totalRsvps: 'Total RSVP Responses',
    totalAttending: 'Confirmed Guests',
    vegMeals: 'Traditional Veg Meals',
    hotelRooms: 'Accommodations Needed',
    exportCsv: 'Export Guest List (CSV)',
    searchGuests: 'Search by name, phone or email...',
    statusConfirmed: 'Confirmed',
    statusTentative: 'Tentative',
    statusDeclined: 'Declined',
    pinUnlockPrompt: 'Enter Host Passcode (Default: 2026)',
    unlockDashboard: 'Unlock Host View',
    exitAdmin: 'Exit Dashboard',

    // Social Sharing
    shareTitle: 'Share Wedding Invitation',
    shareSub: 'Invite your beloved relatives and friends through social platforms or instant messenger',
    whatsappShare: 'Share on WhatsApp',
    telegramShare: 'Share on Telegram',
    copyLink: 'Copy Invitation Link',
    qrInviteTitle: 'Scan to Open Wedding Portal on Mobile',
  },

  te: {
    // Navigation & Common
    appTitle: 'కీర్తి & హరిప్రసాద్ కళ్యాణ మహోత్సవం',
    subtitle: 'కీర్తి & హరిప్రసాద్ వివాహ మహోత్సవం',
    navInvitation: 'ఆహ్వాన పత్రిక',
    navEvents: 'శుభ కార్యాల వివరాలు',
    navGallery: 'ఛాయాచిత్రాలు',
    navRsvp: 'హాజరు నమోదు (RSVP)',
    navGuestbook: 'ఆశీస్సుల పుస్తకం',
    navRegistry: 'కానుకలు & చదివింపులు',
    navVenue: 'వేదిక & మార్గం',
    navBudget: 'వివాహ బడ్జెట్',
    navSeating: 'ఆసనాల అమరిక',
    navAdmin: 'నిర్వాహక విభాగం',
    langToggle: 'English',

    // Hero Section
    auspiciousGreeting: '|| శ్రీ గణేశాయ నమః || శ్రీ సీతారామచంద్ర పరబ్రహ్మణే నమః ||',
    heroKicker: 'పెద్దల ఆశీస్సులతో జరుగబోవు శుభ పరిణయం',
    groomName: 'హరిప్రసాద్',
    groomParents: 'శ్రీమతి జె. లక్ష్మి & శ్రీ జె. నారాయణ గార్ల సుపుత్రుడు',
    brideName: 'కీర్తి',
    brideParents: 'శ్రీమతి ఓ. భాగ్యలక్ష్మి & శ్రీ ఓ. కిషన్ గార్ల సుపుత్రిక',
    andSymbol: 'సమేత',
    weddingDateFull: 'ఆదివారం, నవంబర్ 22, 2026',
    muhurthamTime: IS_KEERTHI_SIDE
      ? `శుభ ముహూర్తం: ఉదయం 9:46 (నవంబర్ 22) | పందిరి (ఉ. 8:00), పెళ్ళికూతురు & హల్దీ (సా. 6:00): నవంబర్ 20 | ఫార్మాలిటీస్ (మ. 2:00): నవంబర్ 21`
      : `శుభ ముహూర్తం: ఉదయం 9:46 గంటలకు (నవంబర్ 22) | హల్దీ: నవంబర్ 20 | ${SIDE_CEREMONY.shortAndPandiriTe}: ${SIDE_CEREMONY.dateShortTe}`,
    venueLocationHero: 'సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్, తెలంగాణ',
    blessTheCouple: 'అక్షింతలు వేసి ఆశీర్వదించండి',
    rsvpNowBtn: 'హాజరును ధ్రువీకరించండి',
    addToCalBtn: 'క్యాలెండర్‌కు చేర్చండి',

    // Countdown
    countdownDays: 'రోజులు',
    countdownHours: 'గంటలు',
    countdownMinutes: 'నిమిషాలు',
    countdownSeconds: 'సెకన్లు',
    countdownTitle: 'శుభ ముహూర్తానికి సమయం',
    countdownSub: 'సప్తపది వేసి ఏడడుగుల బంధంతో ఒక్కటయ్యే మంగళ క్షణాల కోసం వేచిచూస్తున్న సమయం',

    // Couple Story
    storyTitle: 'పరిణయ ప్రయాణం',
    storySub: 'కుటుంబాల అంగీకారంతో పవిత్ర బంధంతో ఒక్కటవుతున్న రెండు మనసులు',
    groomTitle: 'వరుడు',
    groomBio: 'సాఫ్ట్‌వేర్ ఆర్కిటెక్ట్. శ్రీమతి జె. లక్ష్మి & శ్రీ జె. నారాయణ గార్ల సుపుత్రుడు. సాంప్రదాయాలపై గౌరవం, సంగీతంపై మక్కువ.',
    brideTitle: 'వధువు',
    brideBio: 'బయోమెడికల్ పరిశోధకురాలు. శ్రీమతి ఓ. భాగ్యలక్ష్మి & శ్రీ ఓ. కిషన్ గార్ల సుపుత్రిక. సాంప్రదాయ కళలు, విజ్ఞాన రంగాలపై ఆసక్తి.',
    familyBlessing: 'శ్రీమతే రామానుజాయ నమః. మా వంశాభివృద్ధికై పెద్దలు నిశ్చయించిన మా వివాహ మహోత్సవానికి మీరును మీ సకుటుంబ సపరివార సమేతముగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించ ప్రార్థన.',

    // Event Schedule
    eventsSectionTitle: 'పెళ్ళి పందిరి - శుభ కార్యాల పట్టిక',
    eventsSectionSub: IS_KEERTHI_SIDE
      ? `సాంప్రదాయ తెలంగాణ వివాహ క్రతువులు: పందిరి (ఉ. 8:00), పెళ్ళికూతురు (ఉదయం), హల్దీ (సా. 6:00) నవంబర్ 20న, ఫార్మాలిటీస్ (మ. 2:00) నవంబర్ 21న, మరియు శుభ వివాహం (నవంబర్ 22)`
      : `సాంప్రదాయ తెలంగాణ వివాహ క్రతువులు: హల్దీ (నవంబర్ 20), ${SIDE_CEREMONY.shortAndPandiriTe} (${SIDE_CEREMONY.dateShortTe}), మరియు శుభ వివాహం (నవంబర్ 22)`,
    filterAll: 'అన్ని కార్యక్రమాలు',
    filterPre: 'పెళ్ళికి ముందు పూజలు',
    filterCeremony: 'శుభ లగ్నం & తాళంబ్రాలు',
    filterReception: 'వేడుకలు',
    significanceLabel: 'సాంప్రదాయ విశిష్టత:',
    attireLabel: 'సాంప్రదాయ దుస్తులు:',
    timeVenueLabel: 'సమయం & వేదిక:',
    calendarExport: 'క్యాలెండర్ లో సేవ్ చేయండి',

    // Gallery
    galleryTitle: 'కళ్యాణ తోరణం - చిత్రమాలిక',
    gallerySub: 'నిశ్చితార్థం, పసుపు దంచుడు మరియు శుభకార్యాల మధుర క్షణాల సమాహారం',
    tabAll: 'అన్ని చిత్రాలు',
    tabCouple: 'వధూవరులు',
    tabHaldi: 'పసుపు & మంగళస్నానం',
    tabRituals: 'వివాహ క్రతువులు',
    tabGuestLive: 'అతిథుల చిత్రాలు',
    uploadPhotoBtn: 'మీ ఫోటోలను షేర్ చేయండి',
    uploadTitle: 'వివాహ జ్ఞాపకాలను అప్‌లోడ్ చేయండి',
    uploadPrompt: 'పెళ్ళి మండపంలో మీరు తీసిన అందమైన ఫోటోలను అప్‌లోడ్ చేసి లైవ్ గ్యాలరీలో పంచుకోండి!',
    guestNamePlaceholder: 'మీ పేరు (ఉదా: రమేష్ బాబాయ్)',
    captionPlaceholder: 'ఫోటో గురించి రెండు మంచి మాటలు...',
    uploadSuccess: 'ఫోటో విజయవంతంగా అప్‌లోడ్ చేయబడింది! ఇది ఇప్పుడు లైవ్ గ్యాలరీలో కనిపిస్తుంది.',

    // RSVP Section
    rsvpTitle: 'అతిథి దేవో భవ - మీ రాకను తెలియజేయండి',
    rsvpSub: 'మీ అమూల్యమైన రాకయే మాకు కొండంత బలం. నవంబర్ 18వ తేదీలోగా మీ వివరాలు నమోదు చేయవలసిందిగా మనవి.',
    fullNameLabel: 'పూర్తి పేరు / కుటుంబ యజమాని పేరు',
    emailLabel: 'ఈమెయిల్ (డిజిటల్ పాస్ కొరకు)',
    phoneLabel: 'మొబైల్ సంఖ్య (వాట్సాప్)',
    guestsCountLabel: 'హాజరయ్యే వ్యక్తుల సంఖ్య',
    eventsAttendingLabel: 'మీరు హాజరయ్యే కార్యక్రమాలు:',
    dietaryLabel: 'భోజన ప్రాధాన్యత:',
    dietVeg: 'సాంప్రదాయ తెలంగాణ అరటి ఆకు శాఖాహార విందు భోజనం',
    dietTraditional: 'విశిష్ట తెలంగాణ & ఆంధ్ర పిండివంటలు, తీపి వంటకాలు',
    dietJain: 'జైన్ భోజనం (ఉల్లి, వెల్లుల్లి లేనిది)',
    dietNoPref: 'ప్రత్యేక పరిమితులు ఏమీ లేవు',
    accommodationLabel: 'నిజామాబాద్‌లో బస / గదుల వసతి అవసరమా?',
    transportLabel: 'రైల్వే స్టేషన్ / బస్ స్టాండ్ నుండి వాహన సౌకర్యం అవసరమా?',
    travelDetailsLabel: 'ప్రయాణ వివరాలు (రైలు/బస్సు వివరాలు, చేరే సమయం)',
    personalNoteLabel: 'వధూవరులకు మీ ఆశీస్సులు లేదా సందేశం',
    submitRsvpBtn: 'వివరాలు నమోదు చేసి పాస్ పొందండి',
    submittingRsvp: 'వివరాలు నమోదు అవుతున్నాయి...',
    rsvpSuccessTitle: 'మీ హాజరు విజయవంతంగా నమోదయింది!',
    rsvpSuccessPassMsg: 'మీ డిజిటల్ ఆహ్వాన పాస్ సిద్ధంగా ఉంది. దీన్ని మీరు సేవ్ చేసుకోవచ్చు.',
    copyPassBtn: 'డిజిటల్ పాస్ కాపీ చేయండి',
    emailSimNotice: 'మీ డిజిటల్ పాస్ వివరాలు మీ ఈమెయిల్‌కు విజయవంతంగా పంపబడ్డాయి.',

    // Registry & Shagun
    registryTitle: 'ఆశీర్వాదమే ముఖ్యం - కానుకలు & చదివింపులు',
    registrySub: 'మీ నిండు మనసుతో కూడిన దీవెనలే మాకు అత్యంత అమూల్యమైన బహుమతి.',
    blessingFirstHeader: 'మీ రాకయే మాకు కొండంత నిధి',
    blessingFirstBody: 'వధూవరుల శిరస్సుపై పవిత్రమైన జీలకర్ర-బెల్లం మరియు పసుపు అక్షింతలు వేసి మీరు ఇచ్చే ఆశీస్సులకు మించిన కానుక ఏదీ లేదు.',
    chadivimpuTitle: 'సాంప్రదాయ చదివింపులు (యూపీఐ / డిజిటల్ శగున్)',
    chadivimpuSub: 'దూర ప్రాంతాల నుండి మరియు డిజిటల్ రూపంలో వధూవరులకు చదివింపులు అందించదలచిన వారు:',
    scanUpi: 'యూపీఐ ద్వారా చదివింపులు సమర్పించండి',
    copyUpiId: 'యూపీఐ ఐడీ: kalyanam.pandari@okaxis',
    copiedText: 'కాపీ చేయబడింది!',
    wishlistTab: 'గృహోపకరణాల జాబితా',
    markClaimedBtn: 'ఈ బహుమతిని ఎంచుకోండి',
    claimedBadge: 'ఇప్పటికే అందించబడింది',

    // Guestbook
    guestbookTitle: 'శుభాకాంక్షలు - ఆశీస్సుల పుస్తకం',
    guestbookSub: 'నూతన దంపతులను నిండు నూరేళ్ళు వర్ధిల్లాలని మీ ఆశీస్సులతో దీవించండి',
    writeBlessing: 'ఆశీర్వదించండి',
    yourName: 'మీ పేరు',
    yourRelation: 'సంబంధం (ఉదా: వరుడి మిత్రుడు, వధువు బంధువు, పెద్దలు)',
    yourBlessing: 'మీ ఆశీర్వచనం లేదా శుభాకాంక్షలు',
    quickTeluguBlessings: 'సాంప్రదాయ తెలుగు ఆశీర్వచనములు:',
    postBlessingBtn: 'ఆశీస్సులను నమోదు చేయండి',
    likeBlessing: 'దీవించండి',

    // Venue & Map
    venueTitle: 'శుభ వేదిక & మార్గదర్శిని',
    venueSub: IS_KEERTHI_SIDE
      ? `${HALDI_VENUE.shortLabelTe} లో పందిరి, పెళ్ళికూతురు, హల్దీ (సా. 6:00) & ఫార్మాలిటీస్ (మ. 2:00), మరియు సాయి బాబా దేవాలయం, మాధవ్ నగర్‌లో శుభ వివాహానికి విచ్చేయండి.`
      : `${HALDI_VENUE.shortLabelTe} లో హల్దీ, నిజామాబాద్‌లో ${SIDE_CEREMONY.shortTe}, మరియు సాయి బాబా దేవాలయం, మాధవ్ నగర్‌లో శుభ వివాహానికి విచ్చేయండి.`,
    mainHall: 'వివాహ వేదిక: సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్',
    addressLine: 'మాధవ్ నగర్, నిజామాబాద్, తెలంగాణ 503001',
    receptionHall: IS_KEERTHI_SIDE
      ? `పందిరి, పెళ్ళికూతురు, హల్దీ & ఫార్మాలిటీస్ వేదిక`
      : `హల్దీ & ${SIDE_CEREMONY.shortTe} వేదికలు, నిజామాబాద్`,
    receptionAddressLine: IS_KEERTHI_SIDE
      ? `${HALDI_VENUE.shortLabelTe} · హల్దీ: నవంబర్ 20 (సా. 6:00) · ఫార్మాలిటీస్: నవంబర్ 21 (మ. 2:00)`
      : `హల్దీ: ${HALDI_VENUE.shortLabelTe} · ${SIDE_CEREMONY.shortTe}: నిజామాబాద్ 503001`,
    openGoogleMaps: 'గూగుల్ మ్యాప్స్ లో తెరవండి',
    openAppleMaps: 'యాపిల్ మ్యాప్స్ లో తెరవండి',
    bookRapido: 'రాపిడో రైడ్ బుక్ చేయండి',
    transportInfo: 'ప్రయాణ సౌకర్యాలు:',
    airportDist: 'హైదరాబాద్ RGIA ఎయిర్‌పోర్ట్ / NH-44 హైవే కనెక్టివిటీ',
    railwayDist: 'నిజామాబాద్ జంక్షన్ రైల్వే స్టేషన్ (NZB): ~10 నిమిషాలు',
    parkingInfo: 'దేవాలయ ప్రాంగణం వద్ద వాహన పార్కింగ్ సదుపాయం కలదు.',

    // Seating Planner
    seatingTitle: 'కళ్యాణ మండపం ఆసనాల అమరిక',
    seatingSub: 'వివాహ వేదిక మరియు విందు శాలలో కుటుంబాలు, బంధుమిత్రుల కొరకు సీటింగ్ ప్రణాళిక',
    unassignedGuests: 'ఇంకా సీటు కేటాయించని అతిథులు',
    assignTablePrompt: 'అతిథిని క్లిక్ చేసి టేబుల్‌కు కేటాయించండి',
    tableCapacity: 'మొత్తం సీట్లు',
    seatsFilled: 'కేటాయించినవి',
    filterZone: 'ప్రాంతం వారీగా',
    addTableBtn: 'కొత్త టేబుల్ జోడించండి',

    // Budget Tracker
    budgetTitle: 'కళ్యాణ ఖర్చులు - వివాహ బడ్జెట్ గణన',
    budgetSub: 'తెలంగాణ సాంప్రదాయ వివాహ ఖర్చుల లెక్కల నిర్వహణ మరియు విశ్లేషణ',
    totalBudget: 'మొత్తం కేటాయించిన బడ్జెట్',
    totalSpent: 'ఇప్పటివరకు అయిన ఖర్చు',
    balanceRemaining: 'మిగిలిన నిల్వ',
    addExpenseBtn: 'కొత్త ఖర్చును జోడించండి',
    categoryMandapam: 'మండపం & పూల అలంకరణ',
    categoryCatering: 'సాంప్రదాయ విందు భోజనం',
    categoryJewelry: 'పట్టు చీరలు & బంగారు నగలు',
    categoryPhoto: 'ఫోటోగ్రఫీ & సినిమాటోగ్రఫీ',
    categoryMusic: 'మంగళ వాయిద్యాలు & సంగీతం',
    categoryPurohit: 'పురోహితులు & పూజా సామాగ్రి',
    categoryTravel: 'అతిథుల బస & రవాణా',

    // Admin Dashboard
    adminTitle: 'ఆహ్వానాల నిర్వాహక డ్యాష్‌బోర్డ్',
    adminSub: 'అతిథుల హాజరు, భోజనాల వివరాలు, సీటింగ్ మరియు రవాణా ఏర్పాట్ల ప్రత్యక్ష గణాంకాలు',
    totalRsvps: 'నమోదైన మొత్తం రెస్పాన్స్‌లు',
    totalAttending: 'హాజరయ్యే ఖాయమైన అతిథులు',
    vegMeals: 'శాఖాహార భోజనాలు',
    hotelRooms: 'కావాల్సిన గదుల సంఖ్య',
    exportCsv: 'అతిథుల జాబితా ఎక్స్‌పోర్ట్ (CSV)',
    searchGuests: 'పేరు లేదా నంబర్ తో వెతకండి...',
    statusConfirmed: 'ఖరారైనది',
    statusTentative: 'సందేహం',
    statusDeclined: 'రాలేకపోతున్నారు',
    pinUnlockPrompt: 'హోస్ట్ పాస్‌కోడ్ నమోదు చేయండి (డిఫాల్ట్: 2026)',
    unlockDashboard: 'డ్యాష్‌బోర్డ్ తెరవండి',
    exitAdmin: 'డ్యాష్‌బోర్డ్ నుండి నిష్క్రమించండి',

    // Social Sharing
    shareTitle: 'వివాహ ఆహ్వానాన్ని షేర్ చేయండి',
    shareSub: 'మీ ఆత్మీయులకు, బంధువులకు వాట్సాప్ లేదా సోషల్ మీడియా ద్వారా ఈ ఆహ్వానాన్ని సులభంగా పంపండి',
    whatsappShare: 'వాట్సాప్‌లో షేర్ చేయండి',
    telegramShare: 'టెలిగ్రామ్‌లో షేర్ చేయండి',
    copyLink: 'లింక్ కాపీ చేయండి',
    qrInviteTitle: 'మొబైల్‌లో తెరవడానికి ఈ క్యూఆర్ కోడ్ స్కాన్ చేయండి',
  },
};
