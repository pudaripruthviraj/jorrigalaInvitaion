import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, Calendar, MapPin, Share2, Volume2, VolumeX, 
  Camera, Gift, MessageCircle, Send, Check, Copy, ExternalLink,
  ChevronDown, ChevronUp, Navigation, Car, Users, QrCode, Phone,
  Clock, ShieldCheck, X, Upload, Crown, Utensils,
  ChevronLeft, ChevronRight, BookOpen, Scroll, RotateCcw
} from 'lucide-react';
import { Language, GuestRsvp, GuestbookEntry, GalleryPhoto, RegistryItem, BudgetItem, SeatingTable } from './types/wedding';
import { translations } from './data/translations';
import { 
  INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_GUESTBOOK, 
  INITIAL_RSVPS, INITIAL_REGISTRY, INITIAL_BUDGET, INITIAL_TABLES, WEDDING_DATE_ISO,
  HALDI_MAP_URL, HALDI_COORDS, PELLIKODUKU_MAP_URL, PELLIKODUKU_COORDS, WEDDING_MAP_URL, WEDDING_COORDS,
  COUPLE_PORTRAIT_URL, COUPLE_PORTRAIT_FALLBACK_URL, SIDE_CEREMONY, HALDI_VENUE
} from './data/weddingData';
import { weddingMusic } from './utils/audioPlayer';
import { triggerAkshinthaluShower } from './utils/confetti';
import { ScratchCardDate } from './components/ScratchCardDate';
import { RideNavigator } from './components/RideNavigator';
import { AmbientPetals } from './components/AmbientPetals';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { LordGaneshHeader } from './components/LordGaneshHeader';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const t = translations[currentLang];
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Stored state
  const [rsvps, setRsvps] = useState<GuestRsvp[]>(() => {
    const s = localStorage.getItem('wedding_rsvps');
    return s ? JSON.parse(s) : INITIAL_RSVPS;
  });
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(() => {
    const s = localStorage.getItem('wedding_guestbook');
    if (s) {
      try {
        const parsed = JSON.parse(s);
        // Filter out legacy mock entries so only real guest blessings show
        return parsed.filter((e: GuestbookEntry) => !['gb-1', 'gb-2', 'gb-3', 'gb-4'].includes(e.id));
      } catch {
        return [];
      }
    }
    return INITIAL_GUESTBOOK;
  });
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    const s = localStorage.getItem('wedding_gallery');
    if (s) {
      try {
        const parsed = JSON.parse(s) as GalleryPhoto[];
        return parsed.map((photo) =>
          photo.id === 'photo-2' && photo.url.includes('deepika_pruthvi_caricature')
            ? { ...photo, url: COUPLE_PORTRAIT_URL }
            : photo
        );
      } catch {
        return INITIAL_GALLERY;
      }
    }
    return INITIAL_GALLERY;
  });
  const [registry, setRegistry] = useState<RegistryItem[]>(() => {
    const s = localStorage.getItem('wedding_registry');
    return s ? JSON.parse(s) : INITIAL_REGISTRY;
  });
  const [budget, setBudget] = useState<BudgetItem[]>(() => {
    const s = localStorage.getItem('wedding_budget');
    return s ? JSON.parse(s) : INITIAL_BUDGET;
  });
  const [tables, setTables] = useState<SeatingTable[]>(() => {
    const s = localStorage.getItem('wedding_tables');
    return s ? JSON.parse(s) : INITIAL_TABLES;
  });

  // Modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHostToolsModal, setShowHostToolsModal] = useState(false);
  const [hostActiveSubTab, setHostActiveSubTab] = useState<'rsvps' | 'seating' | 'budget'>('rsvps');
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Ceremonial Unfolding & Chapter Presentation
  const [hasOpenedInvite, setHasOpenedInvite] = useState(false);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'storybook' | 'scroll'>('storybook');
  const [activeRideVenue, setActiveRideVenue] = useState<'haldi' | 'pellikoduku' | 'wedding'>('wedding');

  const CHAPTERS = [
    { id: 1, titleTe: 'శుభ ఆహ్వానం', titleEn: 'Invitation', subTe: `హల్దీ, ${SIDE_CEREMONY.shortTe} & వివాహం`, subEn: `Haldi, ${SIDE_CEREMONY.shortEn} & Wedding` },
    { id: 2, titleTe: 'వేడుకల వివరాలు', titleEn: 'Ceremonies', subTe: `హల్దీ, ${SIDE_CEREMONY.shortAndPandiriTe} & వివాహం`, subEn: `Haldi, ${SIDE_CEREMONY.shortAndPandiriEn} & Wedding` },
    { id: 3, titleTe: 'వేదిక & RSVP', titleEn: 'Venue & RSVP', subTe: 'సాయి బాబా దేవాలయం, నిజామాబాద్', subEn: 'Sai Baba Temple, Nizamabad' },
    { id: 4, titleTe: 'ఆశీస్సులు', titleEn: 'Blessings', subTe: 'చిత్రమాలిక & శుభాకాంక్షలు', subEn: 'Gallery & Guestbook' },
  ];

  const handleOpenEnvelope = () => {
    setHasOpenedInvite(true);
    try {
      weddingMusic.start();
      setIsPlayingMusic(true);
    } catch {
      // autoplay handling
    }
    triggerAkshinthaluShower();
  };

  const handleNextChapter = () => {
    if (activeChapter < CHAPTERS.length) {
      setActiveChapter(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (activeChapter > 1) {
      setActiveChapter(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // RSVP state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpCount, setRsvpCount] = useState(2);
  const [rsvpDiet, setRsvpDiet] = useState<GuestRsvp['dietaryPreference']>('pure-veg');
  const [rsvpStay, setRsvpStay] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<GuestRsvp | null>(null);

  // Guestbook wish state
  const [wishName, setWishName] = useState('');
  const [wishMsg, setWishMsg] = useState('');

  // Photo upload
  const [uploadGuestName, setUploadGuestName] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    localStorage.setItem('wedding_lang', currentLang);
    document.title = `Keerthi & Hariprasad Wedding & ${SIDE_CEREMONY.shortEn} | Nov 20 - 22, 2026`;
  }, [currentLang]);
  useEffect(() => {
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);
  useEffect(() => {
    localStorage.setItem('wedding_guestbook', JSON.stringify(guestbook));
  }, [guestbook]);
  useEffect(() => {
    localStorage.setItem('wedding_gallery', JSON.stringify(gallery));
  }, [gallery]);
  useEffect(() => {
    localStorage.setItem('wedding_registry', JSON.stringify(registry));
  }, [registry]);
  useEffect(() => {
    localStorage.setItem('wedding_budget', JSON.stringify(budget));
  }, [budget]);
  useEffect(() => {
    localStorage.setItem('wedding_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    const updateCountdown = () => {
      const diff = new Date(WEDDING_DATE_ISO).getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync music state with audio player
  useEffect(() => {
    const unsub = weddingMusic.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsub;
  }, []);

  const handleMusicToggle = () => {
    weddingMusic.toggle();
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpPhone.trim()) return;

    const newRsvp: GuestRsvp = {
      id: `KV-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: rsvpName.trim(),
      email: `${rsvpName.toLowerCase().replace(/\s+/g, '')}@weddinginvitee.com`,
      phone: rsvpPhone.trim(),
      guestCount: Number(rsvpCount),
      attendingEvents: ['haldi-mangala-snanam', SIDE_CEREMONY.id, 'subha-muhurtham'],
      dietaryPreference: rsvpDiet,
      accommodationNeeded: rsvpStay,
      transportAssistance: false,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRsvps([newRsvp, ...rsvps]);
    setConfirmedPass(newRsvp);
    triggerAkshinthaluShower();
  };

  const handleWhatsAppRsvp = () => {
    const msg =
      currentLang === 'te'
        ? `|| శ్రీరస్తు శుభమస్తు || కీర్తి & హరిప్రసాద్ వివాహ ఆహ్వానానికి నమస్కారములు. మేము (${rsvpName || 'మా కుటుంబం'}, ${rsvpCount} మంది) నవంబర్ 22, 2026 ఉదయం 9:46 గంటలకు సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్‌లో జరుగు శుభ ముహూర్తానికి విచ్చేసి వధూవరులను ఆశీర్వదిస్తాము. - ${rsvpPhone}`
        : `Namaskaram! Delighted to accept the wedding invitation of Keerthi & Hariprasad. We (${rsvpName || 'Our family'}, ${rsvpCount} guests) look forward to gracing the Subha Muhurtham on Nov 22, 2026 at 9:46 AM at Sai Baba Temple, Madhav Nagar, Nizamabad. Warmest blessings!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMsg.trim()) return;

    const newWish: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: wishName.trim(),
      relation: currentLang === 'te' ? 'ఆత్మీయులు / పెద్దలు' : 'Family Elder & Well-wisher',
      message: wishMsg.trim(),
      language: currentLang,
      likes: 1,
      timestamp: 'Just now',
    };

    setGuestbook([newWish, ...guestbook]);
    setWishName('');
    setWishMsg('');
    triggerAkshinthaluShower();
  };

  const handleUploadPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFilePreview || !uploadGuestName.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `guest-${Date.now()}`,
      url: uploadFilePreview,
      captionEn: uploadCaption || `Shared by ${uploadGuestName}`,
      captionTe: uploadCaption || `${uploadGuestName} పంచుకున్న మధుర క్షణం`,
      category: 'guest-uploads',
      uploaderName: uploadGuestName,
      timestamp: 'Just now',
    };

    setGallery([newPhoto, ...gallery]);
    setUploadGuestName('');
    setUploadCaption('');
    setUploadFilePreview(null);
    setShowPhotoUploadModal(false);
    triggerAkshinthaluShower();
  };

  const shareText = currentLang === 'te'
    ? `శుభ వివాహ ఆహ్వానం: కీర్తి & హరిప్రసాద్ | 🌼 హల్దీ (నవంబర్ 20, 2026): ${HALDI_VENUE.shortLabelTe} (${HALDI_MAP_URL}) | 🌸 ${SIDE_CEREMONY.shortAndPandiriTe} (${SIDE_CEREMONY.dateFullTe}): నిజామాబాద్ (${PELLIKODUKU_MAP_URL}) | 💍 శుభ వివాహం (నవంబర్ 22, 2026, ఉదయం 9:46): సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్ (${WEDDING_MAP_URL}). పూర్తి ఆహ్వాన పత్రిక: ${window.location.href}`
    : `Wedding Invitation: Keerthi & Hariprasad | 🌼 Haldi (Nov 20, 2026): ${HALDI_VENUE.shortLabelEn} (${HALDI_MAP_URL}) | 🌸 ${SIDE_CEREMONY.shortAndPandiriEn} (${SIDE_CEREMONY.dateMedEn}): Nizamabad (${PELLIKODUKU_MAP_URL}) | 💍 Wedding (Subha Muhurtham, Nov 22, 2026 at 9:46 AM): Sai Baba Temple, Madhav Nagar, Nizamabad (${WEDDING_MAP_URL}). View full invitation: ${window.location.href}`;

  const handleCalendar = () => {
    const title = encodeURIComponent(`Keerthi & Hariprasad Wedding & ${SIDE_CEREMONY.shortEn} (Nov 20 - 22, 2026)`);
    const details = encodeURIComponent(`Celebrations Schedule:\n1. Haldi: Friday, Nov 20, 2026 at ${HALDI_VENUE.shortLabelEn} (Map: ${HALDI_MAP_URL}).\n2. ${SIDE_CEREMONY.titleEn}: ${SIDE_CEREMONY.dateFullEn} at Nizamabad (Map: ${PELLIKODUKU_MAP_URL}).\n3. Wedding (Subha Muhurtham): Sunday, Nov 22, 2026 at 9:46 AM at Sai Baba Temple, Madhav Nagar, Nizamabad (Map: ${WEDDING_MAP_URL}).`);
    const location = encodeURIComponent('Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana 503001');
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261122T041600Z/20261122T073000Z&details=${details}&location=${location}`, '_blank');
  };

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#1F0A11] text-[#3A141A] flex justify-center selection:bg-rose-200 selection:text-rose-950 ${currentLang === 'te' ? 'font-telugu' : 'font-sans'}`}>
      
      {/* Auspicious Opening Ceremony Envelope */}
      {!hasOpenedInvite && (
        <OpeningEnvelope onOpen={handleOpenEnvelope} currentLang={currentLang} />
      )}

      {/* ROYAL PALACE BLUSH ROSE & ANTIQUE GOLD CANVAS */}
      <div className="w-full max-w-[430px] min-h-screen bg-[#FFF9F7] shadow-2xl relative flex flex-col border-x-2 border-[#C89B3C]/50 pb-20">
        
        {/* Ambient Floating Lotus Petals, Jasmine & Akshinthalu */}
        <AmbientPetals />

        {/* Royal Floating Top Navigation Bar */}
        <div className="sticky top-0 z-40 bg-[#FFF7F5]/95 backdrop-blur-md px-3 py-2 flex items-center justify-between border-b border-[#C89B3C]/40 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-sm tracking-widest text-[#54121E]">
              K & H
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Spinning Music Vinyl Disc with Live Audio Wave Equalizer (Sita Kalyanam - Ranarangam) */}
            <button
              onClick={handleMusicToggle}
              className={`p-1.5 px-2 rounded-full border cursor-pointer transition-all flex items-center gap-1 shadow-xs ${
                isPlayingMusic 
                  ? 'bg-rose-100 border-[#C89B3C] text-[#54121E] ring-1 ring-amber-400/50' 
                  : 'bg-white border-rose-200 text-rose-900/70 hover:bg-rose-50'
              }`}
              title={currentLang === 'te' ? 'సీతా కళ్యాణం - రణరంగం (ఆపడానికి/వినడానికి నొక్కండి)' : 'Sita Kalyanam - Ranarangam (Tap to Pause/Play)'}
            >
              {isPlayingMusic ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-spin text-[#54121E]" style={{ animationDuration: '4s' }} />
                  <span className="text-[9.5px] font-bold font-serif hidden sm:inline whitespace-nowrap text-[#54121E]">
                    {currentLang === 'te' ? 'సీతా కళ్యాణం' : 'Sita Kalyanam'}
                  </span>
                  <div className="flex items-end gap-0.5 h-2.5 pr-0.5">
                    <span className="w-0.5 bg-[#54121E] rounded-full animate-wave-1" />
                    <span className="w-0.5 bg-[#54121E] rounded-full animate-wave-2" />
                    <span className="w-0.5 bg-[#54121E] rounded-full animate-wave-3" />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[9.5px] text-rose-900/70 hidden sm:inline whitespace-nowrap">
                    {currentLang === 'te' ? 'సీతా కళ్యాణం' : 'Sita Kalyanam'}
                  </span>
                </>
              )}
            </button>

            {/* Language Selector: English by default, Telugu on selection */}
            <div className="flex items-center rounded-full bg-rose-50 border border-rose-300 p-0.5 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-[#54121E] text-white font-bold shadow-xs'
                    : 'text-rose-900/70 hover:text-rose-950'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setCurrentLang('te')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  currentLang === 'te'
                    ? 'bg-[#54121E] text-white font-bold shadow-xs'
                    : 'text-rose-900/70 hover:text-rose-950'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Shower Akshinthalu with Pulsing Glow */}
            <button
              onClick={triggerAkshinthaluShower}
              className="p-1.5 rounded-full bg-rose-100 border border-rose-300 text-[#54121E] cursor-pointer hover:bg-rose-200 animate-pulse-glow transition-transform active:scale-95"
              title="Shower Akshinthalu"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-700 animate-diya-flicker" />
            </button>

            {/* View Mode Toggle: Chapter vs Scroll */}
            <button
              onClick={() => setViewMode(viewMode === 'storybook' ? 'scroll' : 'storybook')}
              className={`p-1.5 rounded-full border cursor-pointer transition-all ${
                viewMode === 'storybook' 
                  ? 'bg-rose-100 border-[#C89B3C] text-[#54121E]' 
                  : 'bg-white border-rose-200 text-rose-900/70 hover:bg-rose-50'
              }`}
              title={viewMode === 'storybook' ? 'Switch to All-in-One Scroll View' : 'Switch to Chapter-by-Chapter Story Mode'}
            >
              {viewMode === 'storybook' ? <BookOpen className="w-3.5 h-3.5" /> : <Scroll className="w-3.5 h-3.5" />}
            </button>

            {/* Replay Opening Ceremony */}
            <button
              onClick={() => setHasOpenedInvite(false)}
              className="p-1.5 rounded-full bg-white border border-rose-200 text-rose-900/70 hover:bg-rose-50 cursor-pointer"
              title="Replay Opening Ceremony"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Share */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-1.5 rounded-full bg-white border border-rose-200 text-rose-900 cursor-pointer hover:bg-rose-50"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            
          </div>
        </div>

        {/* Chapter Stepper Navigation Header (Storybook Mode) */}
        {viewMode === 'storybook' ? (
          <div className="sticky top-[45px] z-30 bg-[#FFF7F5]/95 backdrop-blur-md px-4 py-2 border-b border-[#C89B3C]/30 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold font-serif text-[#54121E] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C89B3C] animate-pulse" />
                <span>
                  {currentLang === 'te' 
                    ? `అధ్యాయం ${activeChapter}/${CHAPTERS.length}: ${CHAPTERS[activeChapter - 1].titleTe}` 
                    : `Chapter ${activeChapter}/${CHAPTERS.length}: ${CHAPTERS[activeChapter - 1].titleEn}`}
                </span>
              </span>
              <span className="text-[10px] text-rose-900/80 font-serif">
                {currentLang === 'te' 
                  ? CHAPTERS[activeChapter - 1].subTe 
                  : CHAPTERS[activeChapter - 1].subEn}
              </span>
            </div>

            {/* Interactive Chapter Indicator Dots */}
            <div className="grid grid-cols-4 gap-1.5">
              {CHAPTERS.map((ch) => {
                const isActive = ch.id === activeChapter;
                const isPast = ch.id < activeChapter;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChapter(ch.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#54121E] ring-2 ring-[#C89B3C]/70 scale-y-125' 
                        : isPast 
                        ? 'bg-[#C89B3C]' 
                        : 'bg-rose-200/80 hover:bg-rose-300'
                    }`}
                    title={`${ch.titleEn} (${ch.id})`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-rose-50/70 px-4 py-1.5 border-b border-rose-200 text-center flex items-center justify-between text-[11px] text-rose-950">
            <span>📜 {currentLang === 'te' ? 'మొత్తం స్క్రోల్ మోడ్' : 'All-in-One Scroll Mode'}</span>
            <button
              onClick={() => setViewMode('storybook')}
              className="text-[#54121E] font-bold underline cursor-pointer"
            >
              {currentLang === 'te' ? 'చాప్టర్ మోడ్‌కి మారండి ➔' : 'Switch to Chapter Mode ➔'}
            </button>
          </div>
        )}

        {/* ========================================================
            CHAPTER 1: SUBHA MUHURTHAM & INVITATION COVER
           ======================================================== */}
        {(viewMode === 'scroll' || activeChapter === 1) && (
          <div className="animate-card-enter">
            <section id="slide-invite" className="relative p-3.5 pt-5 pb-8 text-center flex flex-col items-center border-b border-[#C89B3C]/40 bg-blush-palace">
          
          {/* Luxury Blush Rose & Gilded Palace Scalloped Card Frame */}
          <div className="w-full border-2 border-[#C89B3C] ring-4 ring-[#E6C594]/30 rounded-3xl p-4 sm:p-5 relative bg-white/95 shadow-2xl space-y-4 overflow-hidden">
            
            {/* Hanging Pearl & Gemstone Jhumka Ornaments in Top Corners */}
            <div className="absolute top-2 left-3 flex flex-col items-center pointer-events-none opacity-85">
              <span className="w-0.5 h-6 bg-gradient-to-b from-[#C89B3C] to-[#E6C594]" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-[#C89B3C] shadow-xs" />
              <span className="text-[10px] text-[#C89B3C] -mt-0.5">✦</span>
            </div>
            <div className="absolute top-2 right-3 flex flex-col items-center pointer-events-none opacity-85">
              <span className="w-0.5 h-6 bg-gradient-to-b from-[#C89B3C] to-[#E6C594]" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-[#C89B3C] shadow-xs" />
              <span className="text-[10px] text-[#C89B3C] -mt-0.5">✦</span>
            </div>

            {/* Symmetrical Corner Filigree */}
            <span className="absolute bottom-2 left-2 text-[#C89B3C] text-xs pointer-events-none">⚜</span>
            <span className="absolute bottom-2 right-2 text-[#C89B3C] text-xs pointer-events-none">⚜</span>

            {/* Auspicious Lord Ganesh Top Header */}
            <LordGaneshHeader 
              currentLang={currentLang} 
              subtitle={currentLang === 'te' ? '|| శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ||' : '|| AUSPICIOUS WEDDING CELEBRATION ||'} 
            />

            {/* Elegant Calligraphic Invitation Opening */}
            <div className="py-0.5 space-y-0.5">
              <p className="text-xs font-editorial italic text-amber-950/80">
                {currentLang === 'te' ? 'పెద్దల ఆశీస్సులతో జరుగబోవు శుభ వివాహ ఆహ్వానం' : 'Together with their families, request the pleasure of your presence'}
              </p>
            </div>

            {/* Couple Names Styled in Royal Script Typography with Accurate Parent Lineage */}
            <div className="py-1 space-y-2">
              {/* Bride Keerthi */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#54121E] tracking-tight drop-shadow-xs">
                  {currentLang === 'te' ? 'చి||ల||సౌ|| కీర్తి' : 'Keerthi'}
                </h1>
                <p className="text-xs text-amber-900 font-serif mt-0.5">
                  {currentLang === 'te' 
                    ? 'శ్రీమతి ఓ. భాగ్యలక్ష్మి & శ్రీ ఓ. కిషన్ గార్ల సుపుత్రిక' 
                    : 'D/o Smt. O. Bhagyalaxmi & Sri O. Kishan'}
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-3 py-0.5">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C89B3C]" />
                <span className="text-sm font-editorial italic text-[#C89B3C] font-bold px-1">
                  {currentLang === 'te' ? 'సమేత' : '&'}
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C89B3C]" />
              </div>

              {/* Groom Hariprasad */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#54121E] tracking-tight drop-shadow-xs">
                  {currentLang === 'te' ? 'చి|| హరిప్రసాద్' : 'Hariprasad'}
                </h1>
                <p className="text-xs text-amber-900 font-serif mt-0.5">
                  {currentLang === 'te' 
                    ? 'శ్రీమతి జె. లక్ష్మి & శ్రీ జె. నారాయణ గార్ల సుపుత్రుడు' 
                    : 'S/o Smt. J. Laxmi & Sri J. Narayana'}
                </p>
              </div>
            </div>

            {/* Royal Scalloped Arch Couple Portrait with Couple Cartoon Caricature */}
            <div className="relative mx-auto max-w-[280px] mt-2">
              <div className="w-56 h-72 mx-auto rounded-t-full rounded-b-3xl overflow-hidden border-4 border-[#C89B3C] ring-2 ring-rose-300/40 shadow-xl bg-gradient-to-b from-[#FFFDF9] to-[#FEF5E7] relative group p-1 flex items-center justify-center">
                <img
                  src={COUPLE_PORTRAIT_URL}
                  alt="Keerthi & Hariprasad Cartoon Caricature"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (!e.currentTarget.src.endsWith(COUPLE_PORTRAIT_FALLBACK_URL)) {
                      e.currentTarget.src = COUPLE_PORTRAIT_FALLBACK_URL;
                    }
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 rounded-t-full rounded-b-2xl shadow-inner"
                />
              </div>

              {/* Majestic Royal Peacock & Blooming Lotus Floating Badge */}
              <div className="absolute -bottom-3 -left-2 w-16 h-16 rounded-full border-2 border-[#C89B3C] overflow-hidden shadow-lg bg-white ring-2 ring-rose-200 pointer-events-none">
                <img
                  src="/images/peacock_lotus_crest_1791066368632.jpg"
                  alt="Royal Peacock & Lotus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Subha Muhurtham & Reception Details */}
            {/* Interactive Royal Gold Scratch Card to Reveal Muhurtham */}
            <div className="pt-1">
              <ScratchCardDate currentLang={currentLang} />
            </div>

            {/* Quick 1-Tap Action Pill with Rose-Wine & Gold Shimmer */}
            <div className="pt-1 flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  if (viewMode === 'storybook') {
                    setActiveChapter(3);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    scrollToId('slide-rsvp');
                  }
                }}
                className="w-full py-3 bg-gradient-to-r from-[#54121E] via-[#781B10] to-[#54121E] text-white text-xs font-bold rounded-2xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#C89B3C]/60 relative overflow-hidden group active:scale-98"
              >
                <div className="absolute inset-0 animate-gold-shimmer pointer-events-none opacity-40 group-hover:opacity-70" />
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300 group-hover:scale-125 transition-transform" />
                <span className="relative z-10 tracking-wide">{currentLang === 'te' ? 'హాజరును నమోదు చేయండి (RSVP)' : 'Confirm Your RSVP'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 2: COUNTDOWN TIMER & CALENDAR
           ======================================================== */}
        <section className="px-6 py-6 border-b border-[#C89B3C]/40 bg-blush-card text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#54121E] font-serif">
            {t.countdownTitle}
          </p>

          {/* Minimal Countdown Blocks in Blush Ivory & Antique Gold */}
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {[
              { val: timeLeft.days, label: t.countdownDays },
              { val: timeLeft.hours, label: t.countdownHours },
              { val: timeLeft.minutes, label: t.countdownMinutes },
              { val: timeLeft.seconds, label: t.countdownSeconds },
            ].map((box, idx) => (
              <div 
                key={idx} 
                className="bg-white/90 border border-[#C89B3C]/50 rounded-2xl p-2.5 flex flex-col items-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C89B3C] cursor-default group"
              >
                <span className="text-xl font-mono font-bold text-[#54121E] group-hover:scale-110 transition-transform">
                  {String(box.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-900 font-semibold mt-0.5">
                  {box.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 pt-1">
            <button
              onClick={handleCalendar}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-[#54121E] text-xs font-bold rounded-xl border border-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-700" />
              <span>{t.addToCalBtn}</span>
            </button>
          </div>
        </section>
      </div>
    )}

    {/* ========================================================
        CHAPTER 2: AUTHENTIC CEREMONIES (PELLI PANDIRI, HALDI, WEDDING & RECEPTIONS)
       ======================================================== */}
    {(viewMode === 'scroll' || activeChapter === 2) && (
      <div className="animate-card-enter">
        <section id="slide-schedule" className="px-6 py-8 border-b border-[#C89B3C]/40 bg-[#FFFDF8] space-y-4">
          
          {/* Top Auspicious Lord Ganesh Emblem */}
          <LordGaneshHeader 
            currentLang={currentLang} 
            subtitle={currentLang === 'te' ? `హల్దీ, ${SIDE_CEREMONY.shortAndPandiriTe} & వివాహం` : `Haldi, ${SIDE_CEREMONY.shortAndPandiriEn} & Wedding`} 
          />

          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A0E17] font-serif">
              {currentLang === 'te' ? 'శుభ కార్యాల వివరాలు' : 'SACRED CEREMONIES & SCHEDULE'}
            </span>
            <h2 className="text-xl font-display font-bold text-[#4A0E17]">
              {currentLang === 'te' ? 'హల్దీ నుండి శుభ వివాహం దాకా' : 'Wedding Ceremonies'}
            </h2>
          </div>

          {/* Authentic Wedding Events Styled as Luxury Floral Stationery */}
          <div className="space-y-3.5">
            {INITIAL_EVENTS.map((evt) => {
              const isMuhurtham = evt.id === 'subha-muhurtham';
              const isHaldi = evt.id === 'haldi-mangala-snanam';
              const isPellikoduku = evt.id === SIDE_CEREMONY.id;

              let cardBg = 'bg-white border-amber-200/90';
              let badgeColor = 'bg-amber-100 text-[#4A0E17] border-amber-300';
              let iconSymbol = '✨';

              if (isMuhurtham) {
                cardBg = 'bg-gradient-to-br from-rose-50/95 via-amber-50/80 to-white border-[#C89B3C] ring-2 ring-[#C89B3C]/50 shadow-md';
                badgeColor = 'bg-[#4A0E17] text-[#F3D27C] border-[#C89B3C]';
                iconSymbol = '👑';
              } else if (isHaldi) {
                cardBg = 'bg-gradient-to-br from-amber-50/90 via-yellow-50/60 to-white border-amber-300 shadow-xs';
                badgeColor = 'bg-amber-500/15 text-amber-950 border-amber-400';
                iconSymbol = '🌼';
              } else if (isPellikoduku) {
                cardBg = 'bg-gradient-to-br from-rose-50/85 via-amber-50/50 to-white border-rose-300 shadow-xs';
                badgeColor = 'bg-rose-600/15 text-rose-950 border-rose-400';
                iconSymbol = '🌸';
              }

              return (
                <div
                  key={evt.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden ${cardBg}`}
                >
                  {/* Subtle Top Gold Hairline Accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C89B3C]/60 to-transparent" />

                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-[#781B10] font-serif tracking-wide">
                      {currentLang === 'te' ? evt.dateStrTe : evt.dateStrEn}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badgeColor}`}>
                      <span>{iconSymbol}</span>
                      <span>
                        {isMuhurtham
                          ? (currentLang === 'te' ? 'శుభ వివాహం' : 'Wedding')
                          : isHaldi
                          ? (currentLang === 'te' ? 'హల్దీ' : 'Haldi')
                          : (currentLang === 'te' ? SIDE_CEREMONY.shortAndPandiriTe : SIDE_CEREMONY.shortAndPandiriEn)}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#4A0E17] font-display">
                    {currentLang === 'te' ? evt.titleTe : evt.titleEn}
                  </h3>

                  <p className="text-[11px] text-amber-950/85 mt-1.5 leading-relaxed font-sans">
                    {currentLang === 'te' ? evt.descriptionTe : evt.descriptionEn}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] text-[#781B10] font-medium">
                    <div className="flex items-center gap-1 min-w-0">
                      <MapPin className="w-3 h-3 text-[#C89B3C] shrink-0" />
                      <span className="truncate">{currentLang === 'te' ? evt.venueTe : evt.venueEn}</span>
                    </div>
                    {evt.mapUrl && (
                      <a
                        href={evt.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-2 py-0.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#54121E] font-bold flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>{currentLang === 'te' ? 'మ్యాప్' : 'Map'}</span>
                      </a>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2 text-[10px] text-amber-900">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{currentLang === 'te' ? evt.timeTe : evt.timeEn}</span>
                    </span>
                    <span className="text-amber-800 italic font-serif text-right">
                      👗 {currentLang === 'te' ? evt.attireTe : evt.attireEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    )}

    {/* ========================================================
        CHAPTER 3: VENUES, DIRECTIONS & ATTENDANCE RSVP
       ======================================================== */}
    {(viewMode === 'scroll' || activeChapter === 3) && (
      <div className="animate-card-enter">
        <section id="slide-venue" className="px-6 py-8 border-b border-[#C89B3C]/40 bg-[#FFFDF8] text-center space-y-5">
          
          {/* Top Auspicious Lord Ganesh Emblem */}
          <LordGaneshHeader 
            currentLang={currentLang} 
            subtitle={currentLang === 'te' ? 'సాయి బాబా దేవాలయం, నిజామాబాద్' : 'Sai Baba Temple, Nizamabad'} 
          />
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-widest font-serif">
              {currentLang === 'te' ? 'కళ్యాణ వేదికలు & మార్గదర్శిని' : 'CELEBRATION VENUES & DIRECTIONS'}
            </span>
            <h2 className="text-xl font-display font-bold text-[#4A0E17]">
              {currentLang === 'te' ? 'వేడుకల వేదికలు' : 'Celebration Venues'}
            </h2>
            <p className="text-xs text-amber-950/80">
              {currentLang === 'te' 
                ? `నవంబర్ 20 హల్దీ · ${SIDE_CEREMONY.dateShortTe} ${SIDE_CEREMONY.shortAndPandiriTe} · నవంబర్ 22 వివాహం (ఉదయం 9:46)` 
                : `Nov 20 Haldi · ${SIDE_CEREMONY.dateShortEn} ${SIDE_CEREMONY.shortAndPandiriEn} · Nov 22 Wedding (9:46 AM)`}
            </p>
          </div>

          {/* Venue 1: Haldi Venue (Seetharam Nagar Colony, Anand Nagar, Nizamabad) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/90 to-white border-2 border-amber-300 shadow-sm text-left space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#8C5D0D] text-[10px] font-bold uppercase border border-amber-300">
                {currentLang === 'te' ? '🌼 నవంబర్ 20: హల్దీ వేడుక' : '🌼 Nov 20: Haldi Ceremony'}
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#54121E]">
                {currentLang === 'te' ? HALDI_VENUE.nameTe : HALDI_VENUE.nameEn}
              </h3>
              <p className="text-xs text-amber-950/85 mt-0.5">
                {currentLang === 'te' ? HALDI_VENUE.addressTe : HALDI_VENUE.addressEn}
              </p>
              <div className="mt-2 text-[11px] font-serif text-[#781B10] bg-white/90 p-2.5 rounded-xl border border-amber-200/80 space-y-1">
                <p>• <strong>{currentLang === 'te' ? 'హల్దీ & మంగళస్నానం:' : 'Haldi & Mangala Snanam:'}</strong> {currentLang === 'te' ? 'శుక్రవారం, నవంబర్ 20, 2026 · ఉదయం 9:00 నుండి' : 'Friday, November 20, 2026 · 9:00 AM onwards'}</p>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <a
                href={HALDI_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#781B10] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#54121E] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{currentLang === 'te' ? 'గూగుల్ మ్యాప్స్ లో తెరవండి' : 'Open Google Maps'}</span>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(HALDI_MAP_URL);
                  triggerAkshinthaluShower();
                }}
                className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {currentLang === 'te' ? 'లింక్ కాపీ' : 'Copy Pin'}
              </button>
            </div>
          </div>

          {/* Venue 2: Side Ceremony (Pelli Koduku / Pelli Kuthuru & Pandiri Venue) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/80 to-white border-2 border-rose-300 shadow-sm text-left space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#6B1D2F] text-[10px] font-bold uppercase border border-rose-200">
                {currentLang === 'te' ? `🌸 ${SIDE_CEREMONY.dateShortTe}: ${SIDE_CEREMONY.shortAndPandiriTe}` : `🌸 ${SIDE_CEREMONY.dateShortEn}: ${SIDE_CEREMONY.shortAndPandiriEn}`}
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#54121E]">
                {currentLang === 'te' ? `${SIDE_CEREMONY.shortAndPandiriTe} వేదిక` : `${SIDE_CEREMONY.shortAndPandiriEn} Venue`}
              </h3>
              <p className="text-xs text-amber-950/85 mt-0.5">
                {currentLang === 'te' 
                  ? 'నిజామాబాద్, తెలంగాణ 503001' 
                  : 'Nizamabad, Telangana 503001'}
              </p>
              <div className="mt-2 text-[11px] font-serif text-[#781B10] bg-white/90 p-2.5 rounded-xl border border-rose-200/80 space-y-1">
                <p>• <strong>{currentLang === 'te' ? `${SIDE_CEREMONY.shortAndPandiriTe}:` : `${SIDE_CEREMONY.shortAndPandiriEn}:`}</strong> {currentLang === 'te' ? SIDE_CEREMONY.dateFullTe : SIDE_CEREMONY.dateFullEn}</p>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <a
                href={PELLIKODUKU_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#781B10] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#54121E] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{currentLang === 'te' ? 'గూగుల్ మ్యాప్స్ లో తెరవండి' : 'Open Google Maps'}</span>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PELLIKODUKU_MAP_URL);
                  triggerAkshinthaluShower();
                }}
                className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {currentLang === 'te' ? 'లింక్ కాపీ' : 'Copy Pin'}
              </button>
            </div>
          </div>

          {/* Venue 2: Main Wedding Venue — Sai Baba Temple, Madhav Nagar, Nizamabad */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#C89B3C] shadow-md text-left space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-[#54121E] text-[10px] font-bold uppercase border border-rose-300">
                {currentLang === 'te' ? '💍 నవంబర్ 22: శుభ వివాహం (9:46 AM)' : '💍 Nov 22: Wedding (9:46 AM)'}
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#54121E]">
                {currentLang === 'te' ? 'సాయి బాబా దేవాలయం (కళ్యాణ వేదిక)' : 'Sai Baba Temple (Wedding Venue)'}
              </h3>
              <p className="text-xs text-amber-950/85 mt-0.5">
                {currentLang === 'te' 
                  ? 'మాధవ్ నగర్, నిజామాబాద్, తెలంగాణ 503001' 
                  : 'Madhav Nagar, Nizamabad, Telangana 503001'}
              </p>
              <div className="mt-2 text-[11px] font-serif text-[#781B10] bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 space-y-1">
                <p>• <strong>{currentLang === 'te' ? 'శుభ ముహూర్తం (వివాహం):' : 'Wedding Muhurtham:'}</strong> {currentLang === 'te' ? 'ఆదివారం, నవంబర్ 22, 2026 · ఉదయం 09:46 గంటలకు' : 'Sunday, November 22, 2026 · 09:46 AM'}</p>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2">
              <a
                href={WEDDING_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 bg-[#54121E] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#781B10] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{currentLang === 'te' ? 'గూగుల్ మ్యాప్స్' : 'Google Maps'}</span>
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana 503001');
                  triggerAkshinthaluShower();
                }}
                className="py-2 px-3 bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {currentLang === 'te' ? 'చిరునామా కాపీ' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Interactive Navigate & Ride-Sharing Selector with Venue Toggle */}
          <div className="pt-1 space-y-2">
            <div className="grid grid-cols-3 gap-1 p-1 bg-amber-50 border border-amber-200 rounded-xl text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setActiveRideVenue('haldi')}
                className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRideVenue === 'haldi'
                    ? 'bg-[#781B10] text-white shadow-xs'
                    : 'text-amber-950 hover:bg-amber-100'
                }`}
              >
                {currentLang === 'te' ? '🌼 హల్దీ' : '🌼 Haldi'}
              </button>
              <button
                type="button"
                onClick={() => setActiveRideVenue('pellikoduku')}
                className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRideVenue === 'pellikoduku'
                    ? 'bg-[#781B10] text-white shadow-xs'
                    : 'text-amber-950 hover:bg-amber-100'
                }`}
              >
                {currentLang === 'te' ? `🌸 ${SIDE_CEREMONY.shortTe}` : `🌸 ${SIDE_CEREMONY.shortEn}`}
              </button>
              <button
                type="button"
                onClick={() => setActiveRideVenue('wedding')}
                className={`py-1.5 px-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRideVenue === 'wedding'
                    ? 'bg-[#54121E] text-white shadow-xs'
                    : 'text-amber-950 hover:bg-amber-100'
                }`}
              >
                {currentLang === 'te' ? '💍 వివాహం' : '💍 Wedding'}
              </button>
            </div>
            <RideNavigator 
              currentLang={currentLang} 
              venueName={
                activeRideVenue === 'haldi'
                  ? HALDI_VENUE.nameEn
                  : activeRideVenue === 'pellikoduku'
                  ? `${SIDE_CEREMONY.shortAndPandiriEn} Venue`
                  : 'Sai Baba Temple'
              }
              venueAddress={
                activeRideVenue === 'haldi'
                  ? HALDI_VENUE.addressEn
                  : activeRideVenue === 'pellikoduku'
                  ? 'Nizamabad, Telangana 503001 (18.654689, 78.106245)'
                  : 'Madhav Nagar, Nizamabad, Telangana 503001'
              }
              latitude={
                activeRideVenue === 'haldi'
                  ? HALDI_COORDS.lat
                  : activeRideVenue === 'pellikoduku'
                  ? PELLIKODUKU_COORDS.lat
                  : WEDDING_COORDS.lat
              }
              longitude={
                activeRideVenue === 'haldi'
                  ? HALDI_COORDS.lng
                  : activeRideVenue === 'pellikoduku'
                  ? PELLIKODUKU_COORDS.lng
                  : WEDDING_COORDS.lng
              }
            />
          </div>
        </section>

        {/* ========================================================
            CARD 6: FAST RSVP & WHATSAPP
           ======================================================== */}
        <section id="slide-rsvp" className="px-6 py-8 border-b border-[#C89B3C]/40 bg-white space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-widest font-serif">
              {currentLang === 'te' ? 'అతిథి దేవో భవ' : 'ATTENDANCE & RSVP'}
            </span>
            <h2 className="text-xl font-display font-bold text-[#4A0E17]">
              {t.rsvpTitle}
            </h2>
            <p className="text-xs text-amber-900/80">
              {currentLang === 'te' ? 'నవంబర్ 18లోగా మీ రాకను తెలియజేసి మమ్మల్ని ఆశీర్వదించండి' : 'Kindly confirm your attendance by Nov 18, 2026'}
            </p>
          </div>

          {/* 1-Tap WhatsApp RSVP Button with Animated Sheen */}
          <button
            onClick={handleWhatsAppRsvp}
            className="w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer relative overflow-hidden group active:scale-98 hover:shadow-md"
          >
            <div className="absolute inset-0 animate-gold-shimmer pointer-events-none opacity-25 group-hover:opacity-45" />
            <MessageCircle className="w-4 h-4 fill-white group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">{currentLang === 'te' ? 'వాట్సాప్‌లో నేరుగా RSVP చేయండి' : 'Confirm via WhatsApp'}</span>
          </button>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-amber-200" />
            <span className="text-[10px] text-amber-700 font-semibold uppercase font-serif">
              {currentLang === 'te' ? 'లేదా డిజిటల్ పాస్ పొందండి' : 'Or Generate Digital Pass'}
            </span>
            <div className="h-px flex-1 bg-amber-200" />
          </div>

          {confirmedPass ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 shadow-xs">
              <div className="inline-flex p-2 bg-emerald-100 rounded-full text-emerald-700">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-emerald-950">{t.rsvpSuccessTitle}</p>
              <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-left text-xs space-y-0.5">
                <p><strong>{currentLang === 'te' ? 'అతిథి:' : 'Guest:'}</strong> {confirmedPass.fullName}</p>
                <p><strong>{currentLang === 'te' ? 'డిజిటల్ పాస్ ID:' : 'Digital Pass ID:'}</strong> <span className="font-mono text-[#4A0E17]">{confirmedPass.id}</span></p>
                <p><strong>{currentLang === 'te' ? 'హాజరయ్యేవారు:' : 'Attendees:'}</strong> {confirmedPass.guestCount} {currentLang === 'te' ? 'మంది' : 'Member(s)'}</p>
              </div>
              <button
                onClick={() => setConfirmedPass(null)}
                className="text-[11px] text-emerald-800 underline font-semibold cursor-pointer block pt-1"
              >
                {currentLang === 'te' ? 'మరొక RSVP నమోదు చేయండి' : 'Submit another RSVP'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-3 text-xs bg-[#FFFDF8] p-4 rounded-2xl border border-[#C89B3C]/50 shadow-xs">
              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  {t.fullNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'te' ? 'ఉదా: రమేష్ వంగాల & కుటుంబం' : 'e.g. Ramesh Vangala & Family'}
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    {t.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98480 12345"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    {t.guestsCountLabel}
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={(e) => setRsvpCount(Number(e.target.value))}
                    className="w-full px-2 py-2 bg-white border border-amber-200 rounded-xl"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {currentLang === 'te' ? `${n} ${n === 1 ? 'అతిథి' : 'మంది అతిథులు'}` : `${n} ${n === 1 ? 'Guest' : 'Guests'}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-amber-950 mb-1">
                  {t.dietaryLabel}
                </label>
                <select
                  value={rsvpDiet}
                  onChange={(e) => setRsvpDiet(e.target.value as GuestRsvp['dietaryPreference'])}
                  className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
                >
                  <option value="pure-veg">{t.dietVeg}</option>
                  <option value="telangana-traditional">{t.dietTraditional}</option>
                  <option value="jain">{t.dietJain}</option>
                </select>
              </div>

              <label className="flex items-center gap-2 p-2 bg-amber-50/80 rounded-xl border border-amber-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rsvpStay}
                  onChange={(e) => setRsvpStay(e.target.checked)}
                  className="rounded text-[#4A0E17]"
                />
                <span className="text-[11px] font-medium text-amber-950">
                  {t.accommodationLabel}
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#4A0E17] hover:bg-[#781B10] text-white font-bold rounded-xl transition-all shadow-md cursor-pointer border border-[#C89B3C]/50"
              >
                {currentLang === 'te' ? 'వివరాలు నమోదు చేసి పాస్ పొందండి' : 'Confirm RSVP & Generate Pass'}
              </button>
            </form>
          )}
        </section>
      </div>
    )}

    {/* ========================================================
        CHAPTER 4: MEMORIES, BLESSINGS WALL & CORDIAL INVITATION
       ======================================================== */}
    {(viewMode === 'scroll' || activeChapter === 4) && (
      <div className="animate-card-enter">
        <section id="slide-photos" className="px-6 py-8 border-b border-[#C89B3C]/40 bg-white space-y-4">
          
          {/* Top Auspicious Lord Ganesh Emblem */}
          <LordGaneshHeader 
            currentLang={currentLang} 
            subtitle={currentLang === 'te' ? 'ఆశీస్సులు & చిత్రమాలిక' : 'Blessings & Sweet Memories'} 
          />

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-widest font-serif">
                {currentLang === 'te' ? 'చిత్రమాలిక' : 'GALLERY & MEMORIES'}
              </span>
              <h2 className="text-lg font-display font-bold text-[#4A0E17]">
                {t.galleryTitle}
              </h2>
            </div>
            <button
              onClick={() => setShowPhotoUploadModal(true)}
              className="px-3 py-1.5 bg-[#4A0E17] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer hover:bg-[#781B10] border border-[#C89B3C]/50 shadow-xs"
            >
              <Camera className="w-3 h-3 text-amber-300" />
              <span>{currentLang === 'te' ? 'ఫోటో షేర్' : 'Upload'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {gallery.map((p) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-square border-2 border-[#C89B3C]/40 shadow-xs bg-amber-50">
                <img
                  src={p.url}
                  alt={currentLang === 'te' ? p.captionTe : p.captionEn}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (p.id === 'photo-2' && !e.currentTarget.src.endsWith(COUPLE_PORTRAIT_FALLBACK_URL)) {
                      e.currentTarget.src = COUPLE_PORTRAIT_FALLBACK_URL;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <span className="text-[10px] text-white font-medium truncate">
                    {p.uploaderName
                      ? (currentLang === 'te' ? `${p.uploaderName} ద్వారా` : `By ${p.uploaderName}`)
                      : (currentLang === 'te' ? p.captionTe : p.captionEn)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            CARD 9: GUESTBOOK BLESSINGS WALL (ONLY GUEST CONTRIBUTIONS)
           ======================================================== */}
        <section className="px-6 py-8 border-b border-[#C89B3C]/40 bg-[#FFFDF8] space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#4A0E17] uppercase tracking-widest font-serif">
              {currentLang === 'te' ? 'శుభాకాంక్షలు' : 'BLESSINGS WALL'}
            </span>
            <h2 className="text-lg font-display font-bold text-[#4A0E17]">
              {t.guestbookTitle}
            </h2>
          </div>

          {/* Quick wishes */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {(currentLang === 'te' 
              ? ['నూరేళ్ళు చల్లగా ఉండండి!', 'సదా లక్ష్మీనారాయణుల వలె వర్ధిల్లాలి!', 'హృదయపూర్వక శుభాకాంక్షలు!'] 
              : ['Wishing you endless joy & love!', 'Heartiest congratulations to the couple!', 'May God shower you with blessings!']
            ).map((msg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setWishMsg(msg)}
                className="px-2.5 py-1 bg-amber-50/80 hover:bg-amber-100 border border-[#C89B3C]/60 rounded-full text-[10px] text-amber-950 cursor-pointer"
              >
                "{msg}"
              </button>
            ))}
          </div>

          <form onSubmit={handlePostWish} className="space-y-2 text-xs">
            <input
              type="text"
              required
              placeholder={t.yourName}
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
            />
            <input
              type="text"
              required
              placeholder={t.yourBlessing}
              value={wishMsg}
              onChange={(e) => setWishMsg(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#4A0E17] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#781B10] shadow-xs"
            >
              {t.postBlessingBtn}
            </button>
          </form>

          {/* Recent Wishes - Only shown when guests submit */}
          <div className="space-y-2 pt-1">
            {guestbook.length === 0 ? (
              <div className="p-4 bg-amber-50/60 rounded-xl border border-dashed border-[#C89B3C]/50 text-center text-xs text-amber-950 font-serif space-y-1">
                <Sparkles className="w-4 h-4 text-[#C89B3C] mx-auto animate-pulse" />
                <p className="font-bold text-[#54121E]">
                  {currentLang === 'te' ? 'ఇంకా ఆశీస్సులు నమోదు కాలేదు' : 'No Blessings Shared Yet'}
                </p>
                <p className="text-[11px] text-amber-900/80 italic">
                  {currentLang === 'te' 
                    ? 'కీర్తి & హరిప్రసాద్ లకు మీ అమూల్యమైన శుభాకాంక్షలు తెలియజేసే తొలి గౌరవ అతిథి అవ్వండి!' 
                    : 'Be the first honored guest to post your heartfelt blessing for Keerthi & Hariprasad!'}
                </p>
              </div>
            ) : (
              guestbook.map((g) => (
                <div key={g.id} className="p-3 bg-white rounded-xl border border-amber-200/70 text-xs shadow-xs text-left">
                  <div className="flex justify-between items-center text-[10px] text-amber-800 font-semibold">
                    <span className="text-[#54121E] font-bold">{g.name}</span>
                    <span>{g.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-amber-950 font-serif italic mt-1">"{g.message}"</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ========================================================
            CARD 10: ROYAL CORDIAL INVITATION FOOTER
           ======================================================== */}
        <footer className="p-6 text-center text-xs text-amber-900/90 space-y-2 bg-royal-ivory">
          <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-[#C89B3C]">
            <Crown className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-amber-800">
            {currentLang === 'te' ? 'నవంబర్ 20 – 22, 2026' : 'November 20 – 22, 2026'}
          </p>
        </footer>
      </div>
    )}

    {/* Chapter Navigation Controls (Storybook Mode) */}
    {viewMode === 'storybook' && (
      <div className="px-5 py-3.5 bg-[#FFF7F5] border-b border-[#C89B3C]/40 flex items-center justify-between gap-3 sticky bottom-14 z-30 shadow-md">
        <button
          onClick={handlePrevChapter}
          disabled={activeChapter === 1}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
            activeChapter === 1
              ? 'opacity-40 cursor-not-allowed bg-rose-50/60 text-rose-800/60 border-rose-200'
              : 'cursor-pointer bg-white hover:bg-rose-50 text-[#54121E] border-[#C89B3C]/50 shadow-xs active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{currentLang === 'te' ? 'మునుపటి' : 'Previous'}</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider text-rose-900/80 font-serif font-bold">
            {currentLang === 'te' ? 'అధ్యాయం' : 'Chapter'}
          </span>
          <span className="text-xs font-mono text-[#54121E] font-bold">
            {activeChapter} / {CHAPTERS.length}
          </span>
        </div>

        {activeChapter < CHAPTERS.length ? (
          <button
            onClick={handleNextChapter}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-[#54121E] via-[#781B10] to-[#54121E] text-white border border-[#C89B3C]/60 shadow-md hover:brightness-110 cursor-pointer relative overflow-hidden group active:scale-98"
          >
            <div className="absolute inset-0 animate-gold-shimmer pointer-events-none opacity-30 group-hover:opacity-60" />
            <span className="relative z-10">
              {currentLang === 'te' ? 'తరువాతి భాగం' : 'Next Chapter'}
            </span>
            <ChevronRight className="w-4 h-4 relative z-10" />
          </button>
        ) : (
          <button
            onClick={() => {
              setActiveChapter(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-rose-100 hover:bg-rose-200 text-[#54121E] border border-[#C89B3C] shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{currentLang === 'te' ? 'మొదటి పేజీ' : 'Restart'}</span>
          </button>
        )}
      </div>
    )}

    {/* ========================================================
        CANVA MOBILE BOTTOM THUMB BAR
       ======================================================== */}
    <div className="fixed bottom-0 max-w-[430px] w-full z-40 bg-[#FFF7F5]/95 backdrop-blur-md border-t border-[#C89B3C]/40 px-2 py-2 flex items-center justify-around text-[10px] font-bold text-amber-950 shadow-lg">
      <button
        onClick={() => {
          if (viewMode === 'storybook') {
            setActiveChapter(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToId('slide-invite');
          }
        }}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-1.5 transition-colors ${
          activeChapter === 1 && viewMode === 'storybook' ? 'text-[#54121E] font-bold' : 'hover:text-[#54121E]'
        }`}
      >
        <Sparkles className="w-4 h-4 text-[#C89B3C]" />
        <span>{currentLang === 'te' ? 'ఆహ్వానం' : 'Invite'}</span>
      </button>

      <button
        onClick={() => {
          if (viewMode === 'storybook') {
            setActiveChapter(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToId('slide-schedule');
          }
        }}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-1.5 transition-colors ${
          activeChapter === 2 && viewMode === 'storybook' ? 'text-[#54121E] font-bold' : 'hover:text-[#54121E]'
        }`}
      >
        <Calendar className="w-4 h-4 text-[#C89B3C]" />
        <span>{currentLang === 'te' ? 'వేడుకలు' : 'Rituals'}</span>
      </button>

      <button
        onClick={() => {
          if (viewMode === 'storybook') {
            setActiveChapter(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToId('slide-venue');
          }
        }}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-1.5 transition-colors ${
          activeChapter === 3 && viewMode === 'storybook' ? 'text-[#54121E] font-bold' : 'hover:text-[#54121E]'
        }`}
      >
        <MapPin className="w-4 h-4 text-[#C89B3C]" />
        <span>{currentLang === 'te' ? 'వేదికలు' : 'Venues'}</span>
      </button>

      <button
        onClick={() => {
          if (viewMode === 'storybook') {
            setActiveChapter(4);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToId('slide-photos');
          }
        }}
        className={`flex flex-col items-center gap-0.5 cursor-pointer py-1 px-1.5 transition-colors ${
          activeChapter === 4 && viewMode === 'storybook' ? 'text-[#54121E] font-bold' : 'hover:text-[#54121E]'
        }`}
      >
        <Heart className="w-4 h-4 text-[#C89B3C]" />
        <span>{currentLang === 'te' ? 'ఆశీస్సులు' : 'Blessings'}</span>
      </button>

      <button
        onClick={handleWhatsAppRsvp}
        className="flex flex-col items-center gap-0.5 cursor-pointer py-1 px-1.5 text-[#25D366]"
      >
        <MessageCircle className="w-4 h-4 fill-[#25D366]" />
        <span>WhatsApp</span>
      </button>
    </div>

      </div>



      {/* ========================================================
          MODAL: LIVE PHOTO UPLOAD
         ======================================================== */}
      {showPhotoUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] border-2 border-[#C89B3C] rounded-3xl max-w-xs w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-amber-200 pb-2">
              <h3 className="font-display font-bold text-sm text-[#4A0E17]">{t.uploadTitle}</h3>
              <button onClick={() => setShowPhotoUploadModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleUploadPhotoSubmit} className="space-y-3 text-xs">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setUploadFilePreview(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full text-xs text-amber-900 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-100 file:text-amber-900 cursor-pointer"
              />
              {uploadFilePreview && (
                <div className="w-full h-32 rounded-xl overflow-hidden border border-amber-200">
                  <img src={uploadFilePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="text"
                required
                placeholder={t.guestNamePlaceholder}
                value={uploadGuestName}
                onChange={(e) => setUploadGuestName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
              />
              <input
                type="text"
                placeholder={t.captionPlaceholder}
                value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
              />
              <button
                type="submit"
                disabled={!uploadFilePreview || !uploadGuestName}
                className="w-full py-2.5 bg-[#4A0E17] text-white font-bold rounded-xl cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {currentLang === 'te' ? 'లైవ్ వాల్‌కు పోస్ట్ చేయండి' : 'Post to Live Wall'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: SOCIAL SHARE
         ======================================================== */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] border-2 border-[#C89B3C] rounded-3xl max-w-xs w-full p-5 space-y-4 shadow-2xl text-center">
            <div className="flex justify-between items-center border-b border-amber-200 pb-2">
              <h3 className="font-display font-bold text-sm text-[#4A0E17]">{t.shareTitle}</h3>
              <button onClick={() => setShowShareModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-3 bg-white border border-[#C89B3C]/50 rounded-2xl">
              <QrCode className="w-24 h-24 mx-auto text-[#4A0E17]" />
            </div>
            <p className="text-xs text-amber-900">{t.qrInviteTitle}</p>
            <button
              onClick={() => {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
              }}
              className="w-full py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsappShare}</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="w-full py-2 bg-amber-100 text-[#4A0E17] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer border border-[#C89B3C]/40"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? t.copiedText : t.copyLink}</span>
            </button>
          </div>
        </div>
      )}

     

    </div>
  );
}
