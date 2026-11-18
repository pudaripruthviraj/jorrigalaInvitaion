import React, { useState } from 'react';
import { Heart, Sparkles, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Language } from '../types/wedding';
import { LordGaneshHeader } from './LordGaneshHeader';
import { COUPLE_PORTRAIT_URL, COUPLE_PORTRAIT_FALLBACK_URL, HALDI_MAP_URL, WEDDING_MAP_URL, SIDE_CEREMONY, HALDI_VENUE, IS_KEERTHI_SIDE, KEERTHI_FORMALITIES } from '../data/weddingData';

interface Milestone {
  id: string;
  yearEn: string;
  yearTe: string;
  dateEn: string;
  dateTe: string;
  titleEn: string;
  titleTe: string;
  locationEn: string;
  locationTe: string;
  mapUrl?: string;
  descriptionEn: string;
  descriptionTe: string;
  imageUrl: string;
  icon: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'friendship-2020',
    yearEn: '2020',
    yearTe: '2020',
    dateEn: 'The Year 2020',
    dateTe: '2020 సంవత్సరం',
    titleEn: 'Where It All Began: A Beautiful Friendship',
    titleTe: 'మిత్రత్వంతో మొదలైన మధుర ప్రయాణం',
    locationEn: 'College & Life Paths Crossed',
    locationTe: 'పరిచయం - అనుబంధం',
    descriptionEn: 'Back in 2020, our paths crossed. What began with simple conversations, genuine smiles, and heartfelt conversations gradually laid the foundation for an unbreakable companionship.',
    descriptionTe: '2020 లో మొదలైన పరిచయం. ఒకరి ఆలోచనలు మరొకరు పంచుకుంటూ, కష్టసుఖాలలో తోడుగా నిలుస్తూ ఒక గాఢమైన స్నేహ బంధం ఏర్పడింది.',
    imageUrl: COUPLE_PORTRAIT_URL,
    icon: '🌸',
  },
  {
    id: 'friendship-to-love',
    yearEn: '2020 - PRESENT',
    yearTe: '2020 నుండి నేటి వరకు',
    dateEn: 'Friendship Blossoming into Love',
    dateTe: 'స్నేహం నుండి అమర ప్రేమగా',
    titleEn: 'From Best Friends to Soulmates',
    titleTe: 'మిత్రులుగా మొదలై.. ప్రేమికులుగా మారి',
    locationEn: 'Shared Dreams & Timeless Moments',
    locationTe: 'అనురాగ ప్రయాణం',
    descriptionEn: 'Over years of shared laughter, mutual trust, and unwavering understanding, our friendship organically blossomed into deep, enduring love. We knew we had found our forever partner in each other.',
    descriptionTe: 'ఏళ్ల తరబడి సాగిన స్నేహం కాలక్రమేణా పవిత్రమైన ప్రేమగా రూపాంతరం చెందింది. ఒకరికొకరం జీవితాంతం తోడునీడగా ఉండాలని నిర్ణయించుకున్న సుందర తరుణం.',
    imageUrl: '/images/telangana_wedding_rituals_1791062777431.jpg',
    icon: '💖',
  },
  {
    id: 'engagement-march-2026',
    yearEn: 'MARCH 2026',
    yearTe: 'మార్చి 2026',
    dateEn: 'March 2026',
    dateTe: 'మార్చి 2026',
    titleEn: 'Nishchithartham: The Grand Engagement',
    titleTe: 'నిశ్చితార్థ మహోత్సవం (ప్రధానం)',
    locationEn: 'Surrounded by Elders & Loved Ones',
    locationTe: 'పెద్దల ఆశీస్సులతో నిశ్చితార్థం',
    descriptionEn: 'This year in March, blessed with the heartfelt love and approval of both our beloved parents and elders, we exchanged rings and made our union official in traditional festive splendour.',
    descriptionTe: 'ఈ ఏడాది మార్చి నెలలో రెండు కుటుంబాల పెద్దలు, బంధుమిత్రుల సమక్షంలో సాంప్రదాయబద్ధంగా ఉంగరాలు మార్చుకుని నిశ్చితార్థం చేసుకున్న ఆనంద క్షణాలు.',
    imageUrl: '/images/peacock_lotus_crest_1791066368632.jpg',
    icon: '💍',
  },
  {
    id: 'haldi-nov-2026',
    yearEn: '20 NOV 2026',
    yearTe: '20 నవంబర్ 2026',
    dateEn: `Friday, November 20, 2026 · ${HALDI_VENUE.timeShortEn}`,
    dateTe: `శుక్రవారం, నవంబర్ 20, 2026 · ${HALDI_VENUE.timeShortTe}`,
    titleEn: 'Haldi & Mangala Snanam',
    titleTe: 'హల్దీ వేడుక & మంగళస్నానం',
    locationEn: HALDI_VENUE.shortLabelEn,
    locationTe: HALDI_VENUE.shortLabelTe,
    mapUrl: HALDI_MAP_URL,
    descriptionEn: IS_KEERTHI_SIDE
      ? 'Joyful evening haldi celebration at 6:00 PM filled with auspicious turmeric blessings, fragrant rose petals, and folk songs.'
      : 'Joyful pre-wedding morning filled with auspicious turmeric blessings, fragrant rose petals, and herbal mangala snanam.',
    descriptionTe: IS_KEERTHI_SIDE
      ? 'సాయంత్రం 6:00 గంటలకు పచ్చి పసుపు, సుగంధ పరిమళాలు మరియు పూల వర్షంతో జరిగే మంగళకరమైన హల్దీ వేడుక.'
      : 'పచ్చి పసుపు, సుగంధ పరిమళాలు మరియు పూల వర్షంతో జరిగే మంగళకరమైన హల్దీ & మంగళస్నానం వేడుక.',
    imageUrl: '/images/telangana_haldi_celebration_1791062787214.jpg',
    icon: '🌼',
  },
  {
    id: SIDE_CEREMONY.id,
    yearEn: SIDE_CEREMONY.timelineYearEn,
    yearTe: SIDE_CEREMONY.timelineYearTe,
    dateEn: `${SIDE_CEREMONY.dateFullEn} · ${SIDE_CEREMONY.timeEn}`,
    dateTe: `${SIDE_CEREMONY.dateFullTe} · ${SIDE_CEREMONY.timeTe}`,
    titleEn: SIDE_CEREMONY.shortAndPandiriEn,
    titleTe: SIDE_CEREMONY.shortAndPandiriTe,
    locationEn: SIDE_CEREMONY.venueEn,
    locationTe: SIDE_CEREMONY.venueTe,
    mapUrl: SIDE_CEREMONY.mapUrl,
    descriptionEn: SIDE_CEREMONY.descriptionEn,
    descriptionTe: SIDE_CEREMONY.descriptionTe,
    imageUrl: '/images/luxury_floral_toran_1791066104986.jpg',
    icon: '🌸',
  },
  ...(IS_KEERTHI_SIDE
    ? [
        {
          id: KEERTHI_FORMALITIES.id,
          yearEn: KEERTHI_FORMALITIES.timelineYearEn,
          yearTe: KEERTHI_FORMALITIES.timelineYearTe,
          dateEn: `${KEERTHI_FORMALITIES.dateFullEn} · ${KEERTHI_FORMALITIES.timeShortEn}`,
          dateTe: `${KEERTHI_FORMALITIES.dateFullTe} · ${KEERTHI_FORMALITIES.timeShortTe}`,
          titleEn: KEERTHI_FORMALITIES.titleEn,
          titleTe: KEERTHI_FORMALITIES.titleTe,
          locationEn: KEERTHI_FORMALITIES.shortLabelEn,
          locationTe: KEERTHI_FORMALITIES.shortLabelTe,
          mapUrl: KEERTHI_FORMALITIES.mapUrl,
          descriptionEn:
            'Traditional afternoon wedding formalities at 2:00 PM bringing families and elders together at Seetharam Nagar Colony ahead of the Subha Muhurtham.',
          descriptionTe:
            'శనివారం మధ్యాహ్నం 2:00 గంటలకు సీతారాం నగర్ కాలనీలో బంధుమిత్రులు, పెద్దల సమక్షంలో జరిగే సాంప్రదాయ వివాహ ఫార్మాలిటీస్ వేడుక.',
          imageUrl: '/images/luxury_floral_toran_1791066104986.jpg',
          icon: '✨',
        },
      ]
    : []),
  {
    id: 'wedding-nov-2026',
    yearEn: '22 NOV 2026',
    yearTe: '22 నవంబర్ 2026',
    dateEn: 'Sunday, November 22, 2026 · 9:46 AM',
    dateTe: 'ఆదివారం, నవంబర్ 22, 2026 · ఉదయం 9:46',
    titleEn: 'Subha Muhurtham: Sacred Wedding Ceremony',
    titleTe: 'శుభ ముహూర్తం - కళ్యాణ వైభవం',
    locationEn: 'Sai Baba Temple, Madhav Nagar, Nizamabad',
    locationTe: 'సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్',
    mapUrl: WEDDING_MAP_URL,
    descriptionEn: 'The sacred morning when we tie the Mangalasutra, shower fragrant Talambralu, and take seven holy vows at Sai Baba Temple, Madhav Nagar, Nizamabad.',
    descriptionTe: 'జీలకర్ర-బెల్లం, మాంగళ్యధారణ, ముత్యాల తాళంబ్రాలు మరియు సప్తపది ఏడడుగులతో ఒక్కటయ్యే పవిత్ర శుభ ముహూర్తం.',
    imageUrl: '/images/hero_telangana_wedding_1791062758055.jpg',
    icon: '👑',
  },
];

interface OurStoryTimelineProps {
  currentLang: Language;
}

export const OurStoryTimeline: React.FC<OurStoryTimelineProps> = ({ currentLang }) => {
  const isTelugu = currentLang === 'te';
  const [selectedId, setSelectedId] = useState<string>('friendship-2020');

  const activeMilestone = MILESTONES.find(m => m.id === selectedId) || MILESTONES[0];

  return (
    <section id="our-story" className="py-8 px-4 sm:px-6 bg-[#FFFDF9] border-b border-[#C89B3C]/40 text-center space-y-6">
      
      {/* Top Auspicious Lord Ganesh Emblem */}
      <LordGaneshHeader currentLang={currentLang} subtitle={isTelugu ? 'పరిచయం నుండి పరిణయం దాకా' : 'From Friendship to Forever'} />

      {/* Chapter Title */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#54121E] uppercase tracking-widest font-serif">
          {isTelugu ? 'మా ప్రేమ కథ' : 'OUR SACRED JOURNEY'}
        </span>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-[#54121E]">
          {isTelugu ? 'స్నేహం నుండి సాగిన ఏడడుగుల ప్రయాణం' : 'How Friendship Turned Into Love'}
        </h2>
        <p className="text-xs text-amber-950/80 max-w-md mx-auto">
          {isTelugu 
            ? '2020 లో మిత్రులుగా కలిసి, అమర ప్రేమికులుగా మారి, నవంబర్ 22, 2026 న పెళ్ళితో ఒక్కటవుతున్న కీర్తి (శ్రావంతి) & హరిప్రసాద్ కథ' 
            : "From best friends in 2020 to forever soulmates, uniting in marriage on November 22, 2026"}
        </p>
      </div>

      {/* Interactive Horizontal Milestone Navigator */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-1 max-w-lg mx-auto">
        {MILESTONES.map((m) => {
          const isSelected = m.id === selectedId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                isSelected
                  ? 'bg-[#54121E] text-white border-[#54121E] shadow-sm scale-102'
                  : 'bg-rose-50/70 border-rose-200 text-[#54121E] hover:bg-rose-100'
              }`}
            >
              <span>{m.icon}</span>
              <span className="text-[10px] sm:text-xs">{isTelugu ? m.yearTe : m.yearEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Card Presentation */}
      <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-[#C89B3C] shadow-md overflow-hidden text-left transition-all">
        {/* Visual Header */}
        <div className="relative h-44 w-full bg-amber-50 overflow-hidden">
          <img
            src={activeMilestone.imageUrl}
            alt={isTelugu ? activeMilestone.titleTe : activeMilestone.titleEn}
            onError={(e) => {
              if (!e.currentTarget.src.endsWith(COUPLE_PORTRAIT_FALLBACK_URL)) {
                e.currentTarget.src = COUPLE_PORTRAIT_FALLBACK_URL;
              }
            }}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isTelugu ? activeMilestone.dateTe : activeMilestone.dateEn}</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold leading-tight">
              {isTelugu ? activeMilestone.titleTe : activeMilestone.titleEn}
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2 text-xs text-[#781B10] font-semibold">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{isTelugu ? activeMilestone.locationTe : activeMilestone.locationEn}</span>
            </div>
            {activeMilestone.mapUrl && (
              <a
                href={activeMilestone.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-[#54121E] shrink-0"
              >
                {isTelugu ? 'మ్యాప్ ↗' : 'Map ↗'}
              </a>
            )}
          </div>

          <p className="text-xs text-amber-950/90 leading-relaxed font-serif">
            {isTelugu ? activeMilestone.descriptionTe : activeMilestone.descriptionEn}
          </p>
        </div>
      </div>

    </section>
  );
};
