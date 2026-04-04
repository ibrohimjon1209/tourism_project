import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin, Path, CurrencyCircleDollar, Star } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { placesService } from '../../Services/api'

const NearbyPlaceDetail = () => {
  const { slug } = useParams()
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      nearbyPlaces: "Yaqin turistik joylar",
      distanceTitle: "Sizdan masofada",
      bestTime: "Sayohat uchun qulay vaqt",
      directionBtn: "Yo'nalish olish",
      loading: "Yuklanmoqda...",
      error: "Ma'lumot topilmadi",
      visit: "Ziyorat qilish"
    },
    ru: {
      home: "Главная",
      nearbyPlaces: "Ближайшие туристические объекты",
      distanceTitle: "От вас на расстоянии",
      bestTime: "Лучшее время для посещения",
      directionBtn: "Проложить маршрут",
      loading: "Загрузка...",
      error: "Информация не найдена",
      visit: "Посетить"
    },
    en: {
      home: "Home page",
      nearbyPlaces: "Nearby tourist attractions",
      distanceTitle: "Distance from you",
      bestTime: "Best time to visit",
      directionBtn: "Get directions",
      loading: "Loading...",
      error: "Information not found",
      visit: "Visit"
    }
  };

  const t = translations[lang] || translations.uz;

  const getTranslated = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.uz || '';
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await placesService.getPlaceDetail(slug);
        setPlace(data);
      } catch (error) {
        console.error('Error fetching place detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug, lang]);

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
      </div>
    )
  }

  if (!place) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4 font-inter'>
        <h2 className='text-3xl font-bold'>{t.error}</h2>
        <Link to="/nearby_places" className='text-[#2552A1] hover:underline'>{t.nearbyPlaces}</Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white font-inter overflow-x-hidden'>
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.home}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <Link to="/nearby_places" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.nearbyPlaces}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <span className='text-gray-300 break-words mt-1'>{getTranslated(place.name)}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[7/5] md:aspect-auto md:h-[400px] lg:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl order-1 lg:order-2'
            >
              <img src={place.hero_image || place.cover_image} alt={getTranslated(place.name)} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              
              {place.average_rating && (
                <div className='absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2'>
                  <Star size={20} weight="fill" className='text-yellow-400' />
                  <span className='text-white font-bold'>{place.average_rating}</span>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <div className='flex items-center gap-2 mb-4'>
                {place.categories?.map(cat => (
                  <span key={cat.id} className='px-3 py-1 bg-[#2552A1]/20 text-[#2552A1] rounded-full text-xs font-bold uppercase tracking-wider border border-[#2552A1]/30'>
                    {getTranslated(cat.name)}
                  </span>
                ))}
              </div>
              
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-[1.1] mb-2 tracking-tight'>
                {getTranslated(place.name)}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>
                {getTranslated(place.region?.name)}
              </p>
              
              <p className='font-inter text-gray-400 text-sm md:text-base leading-[1.8] max-w-[550px] mb-12 font-medium'>
                {getTranslated(place.short_description)}
              </p>

              <div className='flex items-center gap-8 md:gap-14 mb-12 text-zinc-300'>
                <div className='flex items-center gap-5'>
                  <Path size={32} className='text-[#2552A1]' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase'>{t.distanceTitle}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>
                      {place.distance_km || 0} km
                    </span>
                  </div>
                </div>

                <div className='w-[1px] h-12 bg-white/20' />

                <div className='flex items-center gap-5'>
                  <CurrencyCircleDollar size={32} className='text-[#2552A1]' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase'>{t.bestTime}</span>
                    <span className='text-white text-[20px] md:text-[24px] font-extrabold leading-tight'>
                      {getTranslated(place.best_time_to_visit) || '---'}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-wrap gap-4'>
                <motion.a 
                  href={place.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-12 rounded-full w-full sm:w-fit shadow-xl shadow-[#2552A1]/30 uppercase text-xs tracking-widest transition-transform'
                >
                  <MapPin size={22} weight="bold" />
                  <span>{t.directionBtn}</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional content could go here, e.g. detailed description if available */}
      {place.info && (
        <section className='w-full py-20 px-[20px] md:px-[60px] bg-white'>
          <div className='max-w-[900px] mx-auto'>
            <h2 className='text-[32px] font-bold text-gray-900 mb-8 border-b pb-4'>{t.visit}</h2>
            <div 
              className='prose prose-lg text-gray-600 font-medium leading-relaxed'
              dangerouslySetInnerHTML={{ __html: getTranslated(place.info) }}
            />
          </div>
        </section>
      )}
    </div>
  )
}

export default NearbyPlaceDetail
