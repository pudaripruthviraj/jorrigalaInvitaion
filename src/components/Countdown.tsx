import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, Check } from 'lucide-react';
import { Language } from '../types/wedding';
import { translations } from '../data/translations';
import { WEDDING_DATE_ISO, HALDI_MAP_URL, PELLIKODUKU_MAP_URL, WEDDING_MAP_URL } from '../data/weddingData';

interface CountdownProps {
  currentLang: Language;
}

export const Countdown: React.FC<CountdownProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [copiedCal, setCopiedCal] = useState(false);

  const calculateTimeLeft = () => {
    const target = new Date(WEDDING_DATE_ISO).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPassed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGoogleCalendar = () => {
    // Nov 22, 2026, 09:46 AM IST (04:16 UTC)
    const title = encodeURIComponent(
      currentLang === 'te'
        ? 'కీర్తి & హరిప్రసాద్ కళ్యాణ మహోత్సవం (వివాహం)'
        : 'Keerthi & Hariprasad Wedding Muhurtham'
    );
    const details = encodeURIComponent(
      currentLang === 'te'
        ? `హల్దీ: నవంబర్ 20, 2026 - సీతారాం నగర్ కాలనీ, ఆనంద్ నగర్, నిజామాబాద్ (మ్యాప్: ${HALDI_MAP_URL}) · పెళ్ళికొడుకు & పందిరి: నవంబర్ 21, 2026 (మ్యాప్: ${PELLIKODUKU_MAP_URL}) · శుభ ముహూర్తం: నవంబర్ 22, 2026 ఉదయం 9:46 గంటలకు, సాయి బాబా దేవాలయం, మాధవ్ నగర్, నిజామాబాద్ (మ్యాప్: ${WEDDING_MAP_URL}).`
        : `Haldi: Nov 20, 2026 at Seetharam Nagar Colony, Anand Nagar, Nizamabad (Map: ${HALDI_MAP_URL}) · Pelli Koduku & Pandiri: Nov 21, 2026 at Nizamabad (Map: ${PELLIKODUKU_MAP_URL}) · Subha Muhurtham: Nov 22, 2026 at 9:46 AM at Sai Baba Temple, Madhav Nagar, Nizamabad (Map: ${WEDDING_MAP_URL}).`
    );
    const location = encodeURIComponent('Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana 503001');
    const startIso = '20261122T041600Z';
    const endIso = '20261122T073000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const handleDownloadIcs = () => {
    const summaryText =
      currentLang === 'te'
        ? 'కీర్తి & హరిప్రసాద్ కళ్యాణ మహోత్సవం'
        : 'Keerthi & Hariprasad Wedding Ceremony';
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Keerthi & Hariprasad Wedding//EN',
      'BEGIN:VEVENT',
      'UID:Keerthi-Hariprasad-wedding-2026',
      'DTSTAMP:20261101T000000Z',
      'DTSTART:20261122T041600Z',
      'DTEND:20261122T073000Z',
      `SUMMARY:${summaryText}`,
      `DESCRIPTION:Haldi: Nov 20, 2026 at Seetharam Nagar Colony, Anand Nagar, Nizamabad (${HALDI_MAP_URL}). Pelli Koduku & Pandiri: Nov 21, 2026 (${PELLIKODUKU_MAP_URL}). Subha Muhurtham: Nov 22, 2026 at 9:46 AM at Sai Baba Temple, Madhav Nagar, Nizamabad (${WEDDING_MAP_URL}).`,
      'LOCATION:Sai Baba Temple, Madhav Nagar, Nizamabad, Telangana 503001',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Keerthi-Hariprasad-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedCal(true);
    setTimeout(() => setCopiedCal(false), 3000);
  };

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-y border-amber-200/80 bg-gradient-to-b from-[#FFFDF9] via-[#FEF9EE] to-[#FFFDF9]">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#781B10]">
            {t.countdownTitle}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-amber-900/80 max-w-xl mx-auto">
            {t.countdownSub}
          </p>
        </div>

        {/* Countdown Digits Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-3xl mx-auto">
          {[
            { value: timeLeft.days, label: t.countdownDays },
            { value: timeLeft.hours, label: t.countdownHours },
            { value: timeLeft.minutes, label: t.countdownMinutes },
            { value: timeLeft.seconds, label: t.countdownSeconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 border border-amber-200 rounded-xl p-3 sm:p-5 shadow-xs flex flex-col items-center justify-center transition-transform hover:-translate-y-0.5"
            >
              <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-[#781B10] font-mono tabular-nums">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="mt-1 text-xs sm:text-sm font-medium text-amber-800 tracking-wide uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Auspicious Muhurtham Note & Calendar Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#781B10] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-amber-300 hover:bg-amber-50 text-amber-950 text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedCal ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
            <span>{copiedCal ? 'Saved .ics File!' : 'Apple / Outlook (.ics)'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
