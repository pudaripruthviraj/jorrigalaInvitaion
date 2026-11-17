import React, { useState } from 'react';
import { MapPin, Navigation, Car, Plane, Train, Compass, ExternalLink, Check, Copy, Calendar, Clock, Bike } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';
import { SIDE_CEREMONY, HALDI_VENUE } from '../data/weddingData';

interface InteractiveMapProps {
  currentLang: Language;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isTelugu = currentLang === 'te';
  const [activeVenueTab, setActiveVenueTab] = useState<'haldi' | 'pellikoduku' | 'wedding'>('wedding');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const venues = {
    haldi: {
      key: 'haldi',
      nameEn: HALDI_VENUE.nameEn,
      nameTe: HALDI_VENUE.nameTe,
      tagEn: '🌼 Haldi & Mangala Snanam',
      tagTe: '🌼 హల్దీ వేడుక & మంగళస్నానం',
      dateEn: 'Friday, November 20, 2026',
      dateTe: 'శుక్రవారం, నవంబర్ 20, 2026',
      timeEn: 'Morning 09:00 AM onwards',
      timeTe: 'ఉదయం 09:00 గంటల నుండి',
      addressEn: HALDI_VENUE.addressEn,
      addressTe: HALDI_VENUE.addressTe,
      coords: HALDI_VENUE.coordsStr,
      mapsQuery: HALDI_VENUE.coordsStr,
      mapUrl: HALDI_VENUE.mapUrl,
      transitInfoEn: [
        { icon: Train, text: 'Nizamabad Junction Railway Station (NZB): ~10 mins' },
        { icon: Car, text: 'Nizamabad Central Bus Station (TSRTC): ~8 mins' },
        { icon: Plane, text: 'Hyderabad RGIA Airport / NH-44 Express Corridor' },
        { icon: Car, text: 'Convenient parking available near venue' },
      ],
      transitInfoTe: [
        { icon: Train, text: 'నిజామాబాద్ జంక్షన్ రైల్వే స్టేషన్ (NZB): ~10 నిమిషాలు' },
        { icon: Car, text: 'నిజామాబాద్ సెంట్రల్ బస్ స్టేషన్ (TSRTC): ~8 నిమిషాలు' },
        { icon: Plane, text: 'హైదరాబాద్ RGIA ఎయిర్‌పోర్ట్ / NH-44 హైవే కనెక్టివిటీ' },
        { icon: Car, text: 'వేదిక వద్ద పార్కింగ్ సదుపాయం కలదు' },
      ],
    },
    pellikoduku: {
      key: 'pellikoduku',
      nameEn: `${SIDE_CEREMONY.titleEn} Venue (Nizamabad)`,
      nameTe: `${SIDE_CEREMONY.shortAndPandiriTe} వేదిక (నిజామాబాద్)`,
      tagEn: `🌸 ${SIDE_CEREMONY.titleEn}`,
      tagTe: `🌸 ${SIDE_CEREMONY.titleTe}`,
      dateEn: SIDE_CEREMONY.dateFullEn,
      dateTe: SIDE_CEREMONY.dateFullTe,
      timeEn: SIDE_CEREMONY.timeEn,
      timeTe: SIDE_CEREMONY.timeTe,
      addressEn: SIDE_CEREMONY.venueEn,
      addressTe: SIDE_CEREMONY.venueTe,
      coords: SIDE_CEREMONY.coords,
      mapsQuery: SIDE_CEREMONY.coords,
      mapUrl: SIDE_CEREMONY.mapUrl,
      transitInfoEn: [
        { icon: Train, text: 'Nizamabad Junction Railway Station (NZB): ~10 mins' },
        { icon: Car, text: 'Nizamabad Central Bus Station (TSRTC): ~8 mins' },
        { icon: Plane, text: 'Hyderabad RGIA Airport / NH-44 Express Corridor' },
        { icon: Car, text: 'Convenient parking available near venue' },
      ],
      transitInfoTe: [
        { icon: Train, text: 'నిజామాబాద్ జంక్షన్ రైల్వే స్టేషన్ (NZB): ~10 నిమిషాలు' },
        { icon: Car, text: 'నిజామాబాద్ సెంట్రల్ బస్ స్టేషన్ (TSRTC): ~8 నిమిషాలు' },
        { icon: Plane, text: 'హైదరాబాద్ RGIA ఎయిర్‌పోర్ట్ / NH-44 హైవే కనెక్టివిటీ' },
        { icon: Car, text: 'వేదిక వద్ద పార్కింగ్ సదుపాయం కలదు' },
      ],
    },
    wedding: {
      key: 'wedding',
      nameEn: 'Sai Baba Temple',
      nameTe: 'సాయి బాబా దేవాలయం',
      tagEn: '💍 Sacred Wedding Ceremony (Subha Muhurtham)',
      tagTe: '💍 పవిత్ర వివాహ మహోత్సవం (శుభ ముహూర్తం)',
      dateEn: 'Sunday, November 22, 2026',
      dateTe: 'ఆదివారం, నవంబర్ 22, 2026',
      timeEn: 'Morning 09:46 AM (Subha Muhurtham)',
      timeTe: 'ఉదయం 09:46 గంటలకు (శుభ ముహూర్తం)',
      addressEn: 'Madhav Nagar, Nizamabad, Telangana 503001',
      addressTe: 'మాధవ్ నగర్, నిజామాబాద్, తెలంగాణ 503001',
      coords: '18.6725,78.0941',
      mapsQuery: 'Sai Baba Temple Madhav Nagar Nizamabad Telangana',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sai+Baba+Temple+Madhav+Nagar+Nizamabad+Telangana',
      transitInfoEn: [
        { icon: Train, text: 'Nizamabad Junction Railway Station (NZB): ~10 mins' },
        { icon: Car, text: 'Nizamabad Central Bus Station (TSRTC): ~8 mins' },
        { icon: Plane, text: 'Hyderabad RGIA Airport / NH-44 Express Corridor' },
        { icon: Car, text: 'Dedicated temple parking available for guests' },
      ],
      transitInfoTe: [
        { icon: Train, text: 'నిజామాబాద్ జంక్షన్ రైల్వే స్టేషన్ (NZB): ~10 నిమిషాలు' },
        { icon: Car, text: 'నిజామాబాద్ సెంట్రల్ బస్ స్టేషన్ (TSRTC): ~8 నిమిషాలు' },
        { icon: Plane, text: 'హైదరాబాద్ RGIA ఎయిర్‌పోర్ట్ / NH-44 హైవే కనెక్టివిటీ' },
        { icon: Car, text: 'దేవాలయ ప్రాంగణం వద్ద వాహన పార్కింగ్ సదుపాయం కలదు' },
      ],
    },
  };

  const currentVenue = venues[activeVenueTab];

  const handleCopyAddress = () => {
    const text = isTelugu ? currentVenue.addressTe : currentVenue.addressEn;
    navigator.clipboard.writeText(`${isTelugu ? currentVenue.nameTe : currentVenue.nameEn}, ${text}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const [lat, lng] = currentVenue.coords.split(',');
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(currentVenue.mapsQuery)}&ll=${currentVenue.coords}`;
  const rapidoUrl = `https://m.rapido.bike/?dest_lat=${lat}&dest_lng=${lng}&dest_title=${encodeURIComponent(
    isTelugu ? currentVenue.nameTe : currentVenue.nameEn
  )}`;

  return (
    <section id="venue" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-amber-200/80">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#781B10]">
            {t.venueTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-900/80">
            {t.venueSub}
          </p>
        </div>

        {/* Event Venue Switcher Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-amber-50 rounded-2xl border border-amber-300 shadow-sm max-w-2xl w-full">
            <button
              onClick={() => setActiveVenueTab('haldi')}
              className={`flex-1 py-2.5 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeVenueTab === 'haldi'
                  ? 'bg-[#54121E] text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <span>🌼</span>
              <div className="text-left">
                <span className="block leading-tight text-[11px] sm:text-xs">{isTelugu ? 'హల్దీ' : 'Nov 20 Haldi'}</span>
                <span className="text-[9px] opacity-80 block">{isTelugu ? HALDI_VENUE.tabSubTe : HALDI_VENUE.tabSubEn}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveVenueTab('pellikoduku')}
              className={`flex-1 py-2.5 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeVenueTab === 'pellikoduku'
                  ? 'bg-[#54121E] text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <span>🌸</span>
              <div className="text-left">
                <span className="block leading-tight text-[11px] sm:text-xs">{isTelugu ? SIDE_CEREMONY.shortAndPandiriTe : `${SIDE_CEREMONY.dateShortEn} ${SIDE_CEREMONY.shortEn}`}</span>
                <span className="text-[9px] opacity-80 block">{isTelugu ? `${SIDE_CEREMONY.dateShortTe} · నిజామాబాద్` : 'Pandiri & Nalugu'}</span>
              </div>
            </button>

            <button
              onClick={() => setActiveVenueTab('wedding')}
              className={`flex-1 py-2.5 px-2 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeVenueTab === 'wedding'
                  ? 'bg-[#54121E] text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-100/60'
              }`}
            >
              <span>💍</span>
              <div className="text-left">
                <span className="block leading-tight text-[11px] sm:text-xs">{isTelugu ? 'శుభ వివాహం' : 'Nov 22 Wedding'}</span>
                <span className="text-[9px] opacity-80 block">{isTelugu ? 'నవంబర్ 22 · ఉదయం 9:46' : 'Nizamabad · 9:46 AM'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Venue Information Card & Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Venue Details & Quick Ride Booking */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-amber-200 shadow-xs space-y-4">
              
              <div className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#54121E]">
                {isTelugu ? currentVenue.tagTe : currentVenue.tagEn}
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-amber-100 text-[#781B10] rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#781B10]">
                    {isTelugu ? currentVenue.nameTe : currentVenue.nameEn}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-amber-950/85 leading-relaxed">
                    {isTelugu ? currentVenue.addressTe : currentVenue.addressEn}
                  </p>
                </div>
              </div>

              {/* Date & Time Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-100 text-xs text-amber-950">
                <div className="flex items-center gap-2 p-2 bg-amber-50/60 rounded-lg">
                  <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-semibold">{isTelugu ? currentVenue.dateTe : currentVenue.dateEn}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-amber-50/60 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="font-semibold">{isTelugu ? currentVenue.timeTe : currentVenue.timeEn}</span>
                </div>
              </div>

              {/* Copy Address Button */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100/70 hover:bg-amber-200/70 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAddress ? (isTelugu ? 'చిరునామా కాపీ అయింది!' : 'Address Copied!') : (isTelugu ? 'పూర్తి చిరునామా కాపీ చేయండి' : 'Copy Full Address')}</span>
                </button>
              </div>

              {/* Map App Navigators */}
              <div className="pt-3 border-t border-amber-100 grid grid-cols-2 gap-2">
                <a
                  href={currentVenue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-xs font-semibold text-white bg-[#54121E] hover:bg-[#781B10] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-xs font-semibold text-amber-950 bg-white border border-amber-300 hover:bg-amber-50 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-700" />
                  <span>Apple Maps</span>
                </a>
              </div>

              {/* Rapido Ride Deeplink */}
              <div className="pt-1">
                <a
                  href={rapidoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-3 py-2.5 text-xs font-bold text-neutral-950 bg-[#FFDD00] hover:bg-[#F0D000] border border-amber-500/40 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Bike className="w-4 h-4 text-neutral-950" />
                  <span>{t.bookRapido}</span>
                </a>
              </div>
            </div>

            {/* Proximity / Connectivity Highlights */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-2.5">
              <span className="font-semibold text-amber-900 block text-sm">
                {isTelugu ? 'ప్రయాణ సౌకర్యాలు & దూరాలు:' : 'Travel Connectivity & Proximity:'}
              </span>

              {(isTelugu ? currentVenue.transitInfoTe : currentVenue.transitInfoEn).map((info, idx) => {
                const IconComponent = info.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <IconComponent className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{info.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Map Blueprint Card */}
          <div className="lg:col-span-6 bg-[#FFFDF9] border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold tracking-wide uppercase">
                {isTelugu ? 'ప్రత్యక్ష మ్యాప్ నావిగేషన్' : 'Live Navigation Map'}
              </span>
              <span className="px-2 py-0.5 bg-rose-100 text-[#54121E] font-bold rounded-full text-[11px]">
                Nizamabad
              </span>
            </div>

            {/* Visual Route Blueprint SVG Card */}
            <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-amber-200 bg-[#FAF7EE] flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
                <path d="M 60,80 L 540,320" stroke="#E2D9C5" strokeWidth="26" fill="none" />
                <path d="M 60,80 L 540,320" stroke="#F59E0B" strokeWidth="3" strokeDasharray="8 6" fill="none" />
                <text x="200" y="180" fill="#B45309" fontSize="11" fontWeight="bold">
                  Madhav Nagar Road / NH-44 Link
                </text>

                {/* Nizamabad Junction Station */}
                <g transform="translate(120, 110)">
                  <circle cx="0" cy="0" r="14" fill="#3B82F6" opacity="0.2" />
                  <circle cx="0" cy="0" r="6" fill="#1D4ED8" />
                  <text x="12" y="4" fill="#1E3A8A" fontSize="10" fontWeight="bold">
                    Nizamabad Junction (~10 mins)
                  </text>
                </g>

                {/* TSRTC Bus Station */}
                <g transform="translate(460, 290)">
                  <circle cx="0" cy="0" r="14" fill="#6B7280" opacity="0.2" />
                  <circle cx="0" cy="0" r="6" fill="#374151" />
                  <text x="-150" y="4" fill="#374151" fontSize="10" fontWeight="bold">
                    Central Bus Station (~8 mins)
                  </text>
                </g>

                {/* Sai Baba Temple Destination Marker */}
                <g transform="translate(310, 200)" className="animate-bounce">
                  <circle cx="0" cy="0" r="26" fill="#DC2626" opacity="0.25" />
                  <circle cx="0" cy="0" r="11" fill="#991B1B" />
                  <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                  <path d="M 0,-26 L 7,-10 L -7,-10 Z" fill="#991B1B" />
                  <rect x="-140" y="-60" width="280" height="28" rx="8" fill="#54121E" />
                  <text x="0" y="-42" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {currentVenue.nameEn}
                  </text>
                </g>
              </svg>

              {/* Floating Action Overlay */}
              <div className="absolute bottom-3 right-3 bg-white/95 border border-amber-300 rounded-xl p-3 shadow-md text-xs space-y-1">
                <span className="font-bold text-[#54121E] block">
                  {isTelugu ? currentVenue.nameTe : currentVenue.nameEn}
                </span>
                <span className="font-mono text-amber-900 block text-[11px]">
                  {currentVenue.coords} · Nizamabad
                </span>
                <a
                  href={currentVenue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B45309] hover:underline flex items-center gap-1 cursor-pointer font-bold pt-0.5"
                >
                  <span>{isTelugu ? 'గూగుల్ మ్యాప్స్ లో నావిగేట్ చేయండి' : 'Launch Google Maps Navigation'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
