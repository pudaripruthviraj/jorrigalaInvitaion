import { EventItem, GuestRsvp, GuestbookEntry, GalleryPhoto, RegistryItem, BudgetItem, SeatingTable } from '../types/wedding';

export type InviteSide = 'hari' | 'keerthi';

export function getInviteSide(): InviteSide {
  if (typeof window === 'undefined') return 'hari';
  const pathSearchHash = `${window.location.pathname}${window.location.search}${window.location.hash}`.toLowerCase();
  if (pathSearchHash.includes('hari')) return 'hari';
  if (pathSearchHash.includes('keerthi')) return 'keerthi';

  const fullUrl = window.location.href.toLowerCase();
  if (fullUrl.includes('hari')) return 'hari';
  if (fullUrl.includes('keerthi')) return 'keerthi';
  return 'hari';
}

export const INVITE_SIDE: InviteSide = getInviteSide();
export const IS_KEERTHI_SIDE = INVITE_SIDE === 'keerthi';

export const SIDE_CEREMONY = IS_KEERTHI_SIDE
  ? {
      id: 'pellikuthuru-pandiri',
      shortEn: 'Pelli Kuthuru',
      shortAndPandiriEn: 'Pandiri & Pelli Kuthuru',
      titleEn: 'Pelli Kuthuru Ceremony',
      shortTe: 'పెళ్ళికూతురు',
      shortAndPandiriTe: 'పందిరి & పెళ్ళికూతురు',
      titleTe: 'పెళ్ళికూతురు వేడుక',
      dateFullEn: 'Friday, November 20, 2026',
      dateMedEn: 'Friday, Nov 20, 2026',
      dateShortEn: 'Nov 20',
      timelineYearEn: '20 NOV 2026',
      dateFullTe: 'శుక్రవారం, నవంబర్ 20, 2026',
      dateShortTe: 'నవంబర్ 20',
      timelineYearTe: '20 నవంబర్ 2026',
      dateIso: '2026-11-20T08:00:00+05:30',
      calStartUtc: '20261120T023000Z',
      calEndUtc: '20261120T063000Z',
      timeEn: 'Pandiri: 8:00 AM · Pelli Kuthuru: Morning',
      timeTe: 'పందిరి: ఉదయం 8:00 · పెళ్ళికూతురు: ఉదయం',
      descriptionEn:
        'Auspicious Pandiri installation at 8:00 AM with fresh mango leaves, followed by morning Pelli Kuthuru rituals where elders anoint Keerthi with fragrant turmeric, sandalwood, nalugu, and bless her with traditional silks.',
      descriptionTe:
        'ఉదయం 8:00 గంటలకు పచ్చి మామిడాకుల తోరణాలతో పవిత్ర పందిరి రాట వేసి, అనంతరం ఉదయం పెద్దలందరూ పెళ్ళికూతురు కీర్తికి పసుపు, గంధం, నలుగు పెట్టి పట్టు వస్త్రాలతో ఆశీర్వదించే శుభ వేడుక.',
      significanceEn:
        'Invokes divine blessings on the home and formally prepares the bride for the sacred Grihastha Ashrama.',
      significanceTe:
        'గృహ శాంతి, విఘ్న నివారణ మరియు వధువును గృహస్థాశ్రమ స్వీకారానికి సిద్ధం చేసే మంగళకర వేడుక.',
      attireEn: 'Traditional Silk Sarees / Pattu Pavadai & Ethnic Wear',
      attireTe: 'సాంప్రదాయ పట్టు చీరలు & తెలుగు సాంప్రదాయ వస్త్రాలు',
      venueEn: 'Seetharam Nagar Colony, Anand Nagar, Nizamabad, Telangana 503001',
      venueTe: 'సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్, తెలంగాణ 503001',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=18.6628516,78.0911954',
      coords: '18.6628516,78.0911954',
      coordsDisplay: '18.6628516, 78.0911954',
      coordsObj: { lat: 18.6628516, lng: 78.0911954 },
    }
  : {
      id: 'pellikoduku-pandiri',
      shortEn: 'Pelli Koduku',
      shortAndPandiriEn: 'Pelli Koduku & Pandiri',
      titleEn: 'Pelli Koduku & Pandiri Event',
      shortTe: 'పెళ్ళికొడుకు',
      shortAndPandiriTe: 'పెళ్ళికొడుకు & పందిరి',
      titleTe: 'పెళ్ళికొడుకు & పందిరి వేడుక',
      dateFullEn: 'Friday, November 20, 2026',
      dateMedEn: 'Friday, Nov 20, 2026',
      dateShortEn: 'Nov 20',
      timelineYearEn: '20 NOV 2026',
      dateFullTe: 'శుక్రవారం, నవంబర్ 20, 2026',
      dateShortTe: 'నవంబర్ 20',
      timelineYearTe: '20 నవంబర్ 2026',
      dateIso: '2026-11-20T09:00:00+05:30',
      calStartUtc: '20261120T033000Z',
      calEndUtc: '20261120T133000Z',
      timeEn: 'Morning Pandiri & Evening Pelli Koduku',
      timeTe: 'ఉదయం పందిరి రాట & సాయంత్రం పెళ్ళికొడుకు వేడుక',
      descriptionEn:
        'Auspicious installation of the sacred wedding pandiri with fresh mango leaves, followed by elders anointing Hariprasad with fragrant sandalwood, nalugu, and blessing him with traditional silks.',
      descriptionTe:
        'పచ్చి మామిడాకుల తోరణాలతో పవిత్ర పందిరి రాట వేసి, పెద్దలందరూ పెళ్ళికొడుకు హరిప్రసాద్‌కు గంధం, నలుగు పెట్టి, పట్టు వస్త్రాలతో అలంకరించి ఆశీర్వదించే శుభ వేడుక.',
      significanceEn:
        'Invokes divine blessings on the home and formally prepares the groom for the sacred Grihastha Ashrama.',
      significanceTe:
        'గృహ శాంతి, విఘ్న నివారణ మరియు వరుడిని గృహస్థాశ్రమ స్వీకారానికి సిద్ధం చేసే మంగళకర వేడుక.',
      attireEn: 'Traditional Silk Sarees / Kurta with Angavastram',
      attireTe: 'సాంప్రదాయ పట్టు చీరలు / అంగవస్త్రంతో కూడిన కుర్తా',
      venueEn: 'Nizamabad, Telangana 503001 (Google Maps Pin)',
      venueTe: 'నిజామాబాద్, తెలంగాణ 503001 (గూగుల్ మ్యాప్స్ పిన్)',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=18.654689,78.106245',
      coords: '18.654689,78.106245',
      coordsDisplay: '18.654689, 78.106245',
      coordsObj: { lat: 18.654689, lng: 78.106245 },
    };

// Wedding date: November 22, 2026 at 9:46 AM IST
export const WEDDING_DATE_ISO = '2026-11-22T09:46:00+05:30';

// Side ceremony date (Hari: Nov 20 Pelli Koduku | Keerthi: Nov 20 Pandiri 8 AM & Pelli Kuthuru Morning)
export const PELLIKODUKU_DATE_ISO = SIDE_CEREMONY.dateIso;

// Haldi date: November 20, 2026 IST (Hari: 9:00 AM | Keerthi: 6:00 PM)
export const HALDI_DATE_ISO = IS_KEERTHI_SIDE
  ? '2026-11-20T18:00:00+05:30'
  : '2026-11-20T09:00:00+05:30';

export const HALDI_VENUE = IS_KEERTHI_SIDE
  ? {
      nameEn: 'Haldi Venue · Seetharam Nagar Colony',
      nameTe: 'హల్దీ వేదిక · సీతారాం నగర్ కాలనీ',
      shortLabelEn: 'Seetharam Nagar Colony, Anand Nagar, Nizamabad',
      shortLabelTe: 'సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్',
      addressEn: 'Seetharam Nagar Colony, Anand Nagar, Nizamabad, Telangana 503001',
      addressTe: 'సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్, తెలంగాణ 503001',
      envelopeLabelEn: 'Seetharam Nagar Colony, Nizamabad · Maps ↗',
      envelopeLabelTe: 'సీతారాం నగర్ కాలనీ, నిజామాబాద్ · గూగుల్ మ్యాప్స్ ↗',
      tabSubEn: 'Seetharam Nagar · 6:00 PM',
      tabSubTe: 'సీతారాం నగర్ · సా. 6:00',
      timeEn: '06:00 PM onwards (Evening)',
      timeTe: 'సాయంత్రం 06:00 గంటల నుండి',
      timeShortEn: '6:00 PM',
      timeShortTe: 'సాయంత్రం 6:00',
      calStartUtc: '20261120T123000Z',
      calEndUtc: '20261120T153000Z',
      coordsStr: '18.6628516,78.0911954',
      coordsDisplay: '18.6628516, 78.0911954',
      coords: { lat: 18.6628516, lng: 78.0911954 },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=18.6628516,78.0911954',
    }
  : {
      nameEn: 'Haldi Venue (Nizamabad)',
      nameTe: 'హల్దీ వేదిక (నిజామాబాద్)',
      shortLabelEn: 'Nizamabad, Telangana',
      shortLabelTe: 'నిజామాబాద్, తెలంగాణ',
      addressEn: 'Nizamabad, Telangana 503001 (Google Maps Pin)',
      addressTe: 'నిజామాబాద్, తెలంగాణ 503001 (గూగుల్ మ్యాప్స్ పిన్)',
      envelopeLabelEn: 'Nizamabad, Telangana · Maps ↗',
      envelopeLabelTe: 'నిజామాబాద్, తెలంగాణ · గూగుల్ మ్యాప్స్ ↗',
      tabSubEn: 'Nizamabad · 9:00 AM',
      tabSubTe: 'నవంబర్ 20 · నిజామాబాద్',
      timeEn: '09:00 AM onwards',
      timeTe: 'ఉదయం 09:00 గంటల నుండి',
      timeShortEn: '9:00 AM',
      timeShortTe: 'ఉదయం 9:00',
      calStartUtc: '20261120T033000Z',
      calEndUtc: '20261120T063000Z',
      coordsStr: '18.654689,78.106245',
      coordsDisplay: '18.654689, 78.106245',
      coords: { lat: 18.654689, lng: 78.106245 },
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=18.654689,78.106245',
    };

export const KEERTHI_FORMALITIES = {
  id: 'formalities-event',
  titleEn: 'Wedding Formalities',
  titleTe: 'వివాహ ఫార్మాలిటీస్ వేడుక',
  dateFullEn: 'Saturday, November 21, 2026',
  dateMedEn: 'Saturday, Nov 21, 2026',
  dateShortEn: 'Nov 21',
  timelineYearEn: '21 NOV 2026',
  dateFullTe: 'శనివారం, నవంబర్ 21, 2026',
  dateShortTe: 'నవంబర్ 21',
  timelineYearTe: '21 నవంబర్ 2026',
  timeEn: '02:00 PM onwards (Afternoon)',
  timeTe: 'మధ్యాహ్నం 02:00 గంటల నుండి',
  timeShortEn: '2:00 PM',
  timeShortTe: 'మధ్యాహ్నం 2:00',
  calStartUtc: '20261121T083000Z',
  calEndUtc: '20261121T123000Z',
  nameEn: 'Formalities Venue · Seetharam Nagar Colony',
  nameTe: 'ఫార్మాలిటీస్ వేదిక · సీతారాం నగర్ కాలనీ',
  shortLabelEn: 'Seetharam Nagar Colony, Anand Nagar, Nizamabad',
  shortLabelTe: 'సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్',
  venueEn: 'Seetharam Nagar Colony, Anand Nagar, Nizamabad, Telangana 503001',
  venueTe: 'సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్, తెలంగాణ 503001',
  coordsStr: '18.6628516,78.0911954',
  coordsDisplay: '18.6628516, 78.0911954',
  coords: { lat: 18.6628516, lng: 78.0911954 },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=18.6628516,78.0911954',
};

// Venue Map Links & Coordinates
export const HALDI_MAP_URL = HALDI_VENUE.mapUrl;
export const HALDI_COORDS = HALDI_VENUE.coords;
export const PELLIKODUKU_MAP_URL = SIDE_CEREMONY.mapUrl;
export const PELLIKODUKU_COORDS = SIDE_CEREMONY.coordsObj;
export const HALDI_PELLIKODUKU_MAP_URL = PELLIKODUKU_MAP_URL;
export const HALDI_PELLIKODUKU_COORDS = PELLIKODUKU_COORDS;
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

export const INITIAL_EVENTS: EventItem[] = IS_KEERTHI_SIDE
  ? [
      {
        id: 'pandiri-event',
        titleEn: 'Pandiri Event (Pelli Pandiri)',
        titleTe: 'పందిరి వేడుక (పెళ్ళి పందిరి రాట)',
        dateStrEn: 'Friday, Nov 20, 2026',
        dateStrTe: 'శుక్రవారం, నవంబర్ 20, 2026',
        timeEn: '08:00 AM (Morning)',
        timeTe: 'ఉదయం 08:00 గంటలకు',
        venueEn: SIDE_CEREMONY.venueEn,
        venueTe: SIDE_CEREMONY.venueTe,
        mapUrl: SIDE_CEREMONY.mapUrl,
        descriptionEn:
          'Auspicious morning installation of the sacred wedding pandiri with fresh mango leaf toranam, turmeric, and traditional prayers to bless the bride’s home.',
        descriptionTe:
          'ఉదయం 8:00 గంటలకు పచ్చి మామిడాకుల తోరణాలు, పసుపు కుంకుమలతో పవిత్ర పెళ్ళి పందిరి రాట వేసి వేడుకలకు శుభారంభం చేసే మంగళకర ఘట్టం.',
        significanceEn:
          'Invokes divine blessings and protection on the home before all wedding rituals begin.',
        significanceTe:
          'గృహ శాంతి, విఘ్న నివారణ మరియు శుభకార్యాలకు ఆహ్వానంగా పందిరి రాట వేయు సాంప్రదాయం.',
        attireEn: 'Traditional Silk Sarees & Ethnic Wear',
        attireTe: 'సాంప్రదాయ పట్టు చీరలు & తెలుగు సాంప్రదాయ వస్త్రాలు',
        category: 'pre-wedding',
        icon: 'Sparkles',
      },
      {
        id: SIDE_CEREMONY.id,
        titleEn: 'Pelli Kuthuru Ceremony',
        titleTe: 'పెళ్ళికూతురు వేడుక',
        dateStrEn: 'Friday, Nov 20, 2026',
        dateStrTe: 'శుక్రవారం, నవంబర్ 20, 2026',
        timeEn: 'Morning (following Pandiri)',
        timeTe: 'ఉదయం (పందిరి వేడుక అనంతరం)',
        venueEn: SIDE_CEREMONY.venueEn,
        venueTe: SIDE_CEREMONY.venueTe,
        mapUrl: SIDE_CEREMONY.mapUrl,
        descriptionEn:
          'Elders and family members anoint Keerthi with fragrant turmeric, sandalwood, and nalugu, blessing her with new traditional silks and jewelry as the bride-to-be.',
        descriptionTe:
          'పెద్దలందరూ కీర్తికి పసుపు, గంధం, నలుగు పెట్టి, నూతన పట్టు వస్త్రాలతో పెళ్ళికూతురుగా అలంకరించి ఆశీర్వదించే శుభ వేడుక.',
        significanceEn:
          'Formally honors and prepares the bride for the sacred Grihastha Ashrama.',
        significanceTe:
          'వధువును గృహస్థాశ్రమ స్వీకారానికి ఆశీర్వదించి సిద్ధం చేసే మంగళకర వేడుక.',
        attireEn: 'Traditional Silk Sarees / Pattu Pavadai & Ethnic Wear',
        attireTe: 'సాంప్రదాయ పట్టు చీరలు & తెలుగు సాంప్రదాయ వస్త్రాలు',
        category: 'pre-wedding',
        icon: 'Sparkles',
      },
      {
        id: 'haldi-mangala-snanam',
        titleEn: 'Haldi & Mangala Snanam',
        titleTe: 'హల్దీ వేడుక & మంగళస్నానం',
        dateStrEn: 'Friday, Nov 20, 2026',
        dateStrTe: 'శుక్రవారం, నవంబర్ 20, 2026',
        timeEn: HALDI_VENUE.timeEn,
        timeTe: HALDI_VENUE.timeTe,
        venueEn: HALDI_VENUE.addressEn,
        venueTe: HALDI_VENUE.addressTe,
        mapUrl: HALDI_MAP_URL,
        descriptionEn:
          'Joyous evening haldi celebration at 6:00 PM with pure turmeric paste, fragrant rose petals, auspicious folk songs, and blessings.',
        descriptionTe:
          'సాయంత్రం 6:00 గంటలకు ముత్తైదువలు కలిసి పచ్చి పసుపు, సుగంధ పరిమళాలు మరియు పూల వర్షంతో జరిపే ఆహ్లాదకరమైన హల్దీ వేడుక.',
        significanceEn:
          'Purifies the body and mind, symbolizes auspicious beginnings, prosperity, and family blessings.',
        significanceTe:
          'శరీర, మనస్సుల పవిత్రత, సౌభాగ్యం మరియు మంగళకరమైన ఆరంభానికి ప్రతీక.',
        attireEn: 'Festive Yellow Traditional Wear',
        attireTe: 'పసుపు రంగు సాంప్రదాయ వస్త్రాలు',
        category: 'pre-wedding',
        icon: 'Sun',
      },
      {
        id: KEERTHI_FORMALITIES.id,
        titleEn: KEERTHI_FORMALITIES.titleEn,
        titleTe: KEERTHI_FORMALITIES.titleTe,
        dateStrEn: KEERTHI_FORMALITIES.dateMedEn,
        dateStrTe: KEERTHI_FORMALITIES.dateFullTe,
        timeEn: KEERTHI_FORMALITIES.timeEn,
        timeTe: KEERTHI_FORMALITIES.timeTe,
        venueEn: KEERTHI_FORMALITIES.venueEn,
        venueTe: KEERTHI_FORMALITIES.venueTe,
        mapUrl: KEERTHI_FORMALITIES.mapUrl,
        descriptionEn:
          'Traditional pre-wedding afternoon formalities at 2:00 PM bringing both families, elders, and relatives together for auspicious rituals, blessings, and hospitality.',
        descriptionTe:
          'శనివారం మధ్యాహ్నం 2:00 గంటలకు బంధుమిత్రులు, పెద్దల సమక్షంలో సాంప్రదాయ వివాహ పూర్వ ఫార్మాలిటీస్, మర్యాదలు మరియు ఆశీర్వచన వేడుక.',
        significanceEn:
          'Strengthens family bonds and completes sacred traditional customs ahead of the Subha Muhurtham.',
        significanceTe:
          'శుభ ముహూర్తానికి ముందు రెండు కుటుంబాల ఆత్మీయ కలయిక మరియు సాంప్రదాయ వివాహ క్రతువుల నిర్వహణ.',
        attireEn: 'Traditional Silk Sarees & Festive Ethnic Wear',
        attireTe: 'సాంప్రదాయ పట్టు చీరలు & పండుగ వస్త్రాలు',
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
        descriptionEn:
          'The sacred Telugu wedding rituals of Keerthi & Hariprasad: holding cumin & jaggery paste over each other’s heads, tying the Mangalasutra with three sacred knots, and showering fragrant Talambralu.',
        descriptionTe:
          'కీర్తి & హరిప్రసాద్‌ల శిరస్సులపై జీలకర్ర-బెల్లం ఉంచడం, ముల్లోకాల సాక్షిగా మూడు ముళ్ళు వేయడం, మరియు ఆనందోత్సాహాల నడుమ ముత్యాల తాళంబ్రాల మహోత్సవం.',
        significanceEn:
          'Jeelakarra Bellam symbolizes eternal inseparability; Mangalasutra represents lifelong protection; Talambralu brings prosperity and joy.',
        significanceTe:
          'జీలకర్ర-బెల్లం కలయిక విడదీయరాని బంధానికి, మాంగళ్యధారణ రక్షణకు, తాళంబ్రాలు సమృద్ధికి ప్రతీకలు.',
        attireEn: 'Traditional Kanchipuram Pattu Saree & Silk Dhoti',
        attireTe: 'సాంప్రదాయ కాంచీపురం పట్టు చీర & పట్టు పంచె',
        category: 'ceremony',
        icon: 'Crown',
      },
    ]
  : [
      {
        id: 'haldi-mangala-snanam',
        titleEn: 'Haldi & Mangala Snanam',
        titleTe: 'హల్దీ వేడుక & మంగళస్నానం',
        dateStrEn: 'Friday, Nov 20, 2026',
        dateStrTe: 'శుక్రవారం, నవంబర్ 20, 2026',
        timeEn: HALDI_VENUE.timeEn,
        timeTe: HALDI_VENUE.timeTe,
        venueEn: HALDI_VENUE.addressEn,
        venueTe: HALDI_VENUE.addressTe,
        mapUrl: HALDI_MAP_URL,
        descriptionEn:
          'Joyous haldi ceremony with pure turmeric paste, fragrant rose petals, auspicious folk songs, and sacred herbal mangala snanam.',
        descriptionTe:
          'ముత్తైదువలు కలిసి పచ్చి పసుపు, సుగంధ పరిమళాలు మరియు పూల వర్షంతో జరిపే ఆహ్లాదకరమైన హల్దీ & మంగళస్నానం.',
        significanceEn:
          'Purifies the body and mind, symbolizes auspicious beginnings, prosperity, and family blessings.',
        significanceTe:
          'శరీర, మనస్సుల పవిత్రత, సౌభాగ్యం మరియు మంగళకరమైన ఆరంభానికి ప్రతీక.',
        attireEn: 'Festive Yellow Traditional Wear',
        attireTe: 'పసుపు రంగు సాంప్రదాయ వస్త్రాలు',
        category: 'pre-wedding',
        icon: 'Sun',
      },
      {
        id: SIDE_CEREMONY.id,
        titleEn: SIDE_CEREMONY.titleEn,
        titleTe: SIDE_CEREMONY.titleTe,
        dateStrEn: SIDE_CEREMONY.dateMedEn,
        dateStrTe: SIDE_CEREMONY.dateFullTe,
        timeEn: SIDE_CEREMONY.timeEn,
        timeTe: SIDE_CEREMONY.timeTe,
        venueEn: SIDE_CEREMONY.venueEn,
        venueTe: SIDE_CEREMONY.venueTe,
        mapUrl: SIDE_CEREMONY.mapUrl,
        descriptionEn: SIDE_CEREMONY.descriptionEn,
        descriptionTe: SIDE_CEREMONY.descriptionTe,
        significanceEn: SIDE_CEREMONY.significanceEn,
        significanceTe: SIDE_CEREMONY.significanceTe,
        attireEn: SIDE_CEREMONY.attireEn,
        attireTe: SIDE_CEREMONY.attireTe,
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
        descriptionEn:
          'The sacred Telugu wedding rituals of Keerthi & Hariprasad: holding cumin & jaggery paste over each other’s heads, tying the Mangalasutra with three sacred knots, and showering fragrant Talambralu.',
        descriptionTe:
          'కీర్తి & హరిప్రసాద్‌ల శిరస్సులపై జీలకర్ర-బెల్లం ఉంచడం, ముల్లోకాల సాక్షిగా మూడు ముళ్ళు వేయడం, మరియు ఆనందోత్సాహాల నడుమ ముత్యాల తాళంబ్రాల మహోత్సవం.',
        significanceEn:
          'Jeelakarra Bellam symbolizes eternal inseparability; Mangalasutra represents lifelong protection; Talambralu brings prosperity and joy.',
        significanceTe:
          'జీలకర్ర-బెల్లం కలయిక విడదీయరాని బంధానికి, మాంగళ్యధారణ రక్షణకు, తాళంబ్రాలు సమృద్ధికి ప్రతీకలు.',
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
    attendingEvents: ['haldi-mangala-snanam', SIDE_CEREMONY.id, 'subha-muhurtham'],
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
