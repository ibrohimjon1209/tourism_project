import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretRight, MapPin, MapTrifold, X, MapPinArea, GlobeHemisphereWest, WarningCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { placesService } from '../../Services/api'

const regions = [
  { id: 11, name: { uz: "Toshkent shahri", ru: "Город Ташкент", en: "Tashkent city" }, lat: 41.2995, lng: 69.2401 },
  { id: 1, name: { uz: "Andijon viloyati", ru: "Андижанская область", en: "Andijan region" }, lat: 40.7831, lng: 72.3507 },
  { id: 2, name: { uz: "Buxoro viloyati", ru: "Бухарская область", en: "Bukhara region" }, lat: 39.7747, lng: 64.4286 },
  { id: 3, name: { uz: "Farg'ona viloyati", ru: "Ферганская область", en: "Fergana region" }, lat: 40.3842, lng: 71.7842 },
  { id: 4, name: { uz: "Jizzax viloyati", ru: "Джизакская область", en: "Jizzakh region" }, lat: 40.1158, lng: 67.8422 },
  { id: 5, name: { uz: "Namangan viloyati", ru: "Наманганская область", en: "Namangan region" }, lat: 40.9983, lng: 71.6726 },
  { id: 6, name: { uz: "Navoiy viloyati", ru: "Навоийская область", en: "Navoi region" }, lat: 40.1039, lng: 65.3739 },
  { id: 7, name: { uz: "Qashqadaryo viloyati", ru: "Кашкадарьинская область", en: "Qashqadarya region" }, lat: 38.8617, lng: 65.7892 },
  { id: 8, name: { uz: "Samarqand viloyati", ru: "Самаркандская область", en: "Samarkand region" }, lat: 39.6542, lng: 66.9597 },
  { id: 9, name: { uz: "Sirdaryo viloyati", ru: "Sirdaryo viloyati", en: "Sirdarya region" }, lat: 40.4897, lng: 68.7842 },
  { id: 10, name: { uz: "Surxondaryo viloyati", ru: "Сурхандарьинская область", en: "Surxondaryo region" }, lat: 37.2242, lng: 67.2783 },
  { id: 12, name: { uz: "Xorazm viloyati", ru: "Хорезмская область", en: "Khorezm region" }, lat: 41.3783, lng: 60.3639 },
  { id: 13, name: { uz: "Qoraqalpog'iston Respublikasi", ru: "Республика Каракалпакстан", en: "Republic of Karakalpakstan" }, lat: 42.4647, lng: 59.6022 },
];

const Nearby_places = ({ userCoords, setCoords }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regionName, setRegionName] = useState('');
  const [manualLabel, setManualLabel] = useState(null); 
  const [isDefault, setIsDefault] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      nearbyPlaces: "Yaqin turistik joylar",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
      defaultCity: "Toshkent shahri",
      distance: "km",
      loading: "... ",
      noResultsInRegion: "Bu joy yaqinida turistik joylar afsuski topilmadi. Sizga Toshkentdagi joylarni taklif qilamiz.",
      manualSet: "O'zgartirish",
      selectRegion: "Hududni tanlang",
      yourLocation: "Siz turgan joy"
    },
    ru: {
      home: "Главная",
      nearbyPlaces: "Ближайшие турместа",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок.",
      defaultCity: "Город Ташкент",
      distance: "км",
      loading: "... ",
      noResultsInRegion: "К сожалению, рядом с этим местом туристические объекты не найдены. Предлагаем места в Ташкенте.",
      manualSet: "Изменить",
      selectRegion: "Выберите регион",
      yourLocation: "Ваше местоположение"
    },
    en: {
      home: "Home page",
      nearbyPlaces: "Nearby tourist places",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales.",
      defaultCity: "Tashkent city",
      distance: "km",
      loading: "... ",
      noResultsInRegion: "Unfortunately, no tourist attractions were found near this location. Showing places in Tashkent as default.",
      manualSet: "Change",
      selectRegion: "Select a region",
      yourLocation: "Your location"
    }
  };

  const t = translations[lang] || translations.uz;

  const getTranslated = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.uz || '';
  };

  const handleManualRegion = (region) => {
    const label = getTranslated(region.name);
    setManualLabel(label); 
    setRegionName(label);
    const manualCoords = { lat: region.lat, lng: region.lng };
    if (setCoords) setCoords(manualCoords);
    localStorage.setItem('userCoords', JSON.stringify(manualCoords));
    setIsModalOpen(false);
    setIsDefault(false);
  };

  const fetchNearby = async (lat, lng, forcedDefault = false) => {
    setLoading(true);
    try {
      const data = await placesService.getNearbyPlaces(lat, lng);
      if (data && data.results && data.results.length > 0) {
        setPlaces(data.results);
        setIsDefault(forcedDefault);
        if (manualLabel) setRegionName(manualLabel);
        else if (forcedDefault) setRegionName(t.defaultCity);
        else setRegionName(t.yourLocation);
      } else {
        const tashkentData = await placesService.getNearbyPlaces(41.2995, 69.2401);
        setPlaces(tashkentData.results || []);
        setIsDefault(true);
        setRegionName(manualLabel || t.yourLocation);
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setRegionName(manualLabel || t.yourLocation);
      setIsDefault(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userCoords) fetchNearby(userCoords.lat, userCoords.lng);
    else fetchNearby(41.2995, 69.2401, true);
  }, [userCoords, lang, manualLabel]);

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[130px] pb-40 px-[20px] md:px-[60px] font-inter overflow-x-hidden'>
      {/* Breadcrumb Section */}
      <div className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-5 md:mb-4'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors font-medium'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300 font-medium'>{t.nearbyPlaces}</span>
      </div>

      {/* Header with Title and Description */}
      <div className='mb-8 md:mb-12'>
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-[800px]'
        >
          <h1 className='text-[36px] md:text-[52px] font-bold text-gray-900 leading-tight mb-4 tracking-tight'>
            {t.nearbyPlaces}
          </h1>
          <p className='text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-medium'>
            {t.desc}
          </p>
        </motion.div>
      </div>

      {/* Control Bar: Location Name and Change Button in one row for mobile */}
      <div className='flex items-center justify-between gap-3 mb-10'>
        <motion.div 
          key={regionName}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-100 font-bold text-[13px] md:text-base shadow-sm shrink-0 min-w-0
          ${isDefault ? 'bg-orange-50 text-orange-700' : 'bg-blue-50 text-[#2552A1]'}`}
        >
          <MapPin size={22} weight="fill" className={isDefault ? 'text-orange-600' : 'text-[#2552A1]'} />
          <span className='uppercase tracking-wide truncate'>{loading ? t.loading : regionName}</span>
        </motion.div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-[#2552A1] font-bold text-[13px] md:text-sm hover:bg-[#2552A1]/5 transition-all shadow-sm active:scale-95 whitespace-nowrap'
        >
          <MapPinArea size={18} weight='bold' />
          <span>{t.manualSet}</span>
        </button>
      </div>

      {isDefault && !loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='mb-12 p-6 bg-orange-50/70 border border-orange-100 rounded-[32px] flex flex-col md:flex-row items-center gap-6'
        >
          <div className='flex items-start gap-4 flex-1'>
            <div className='p-2 bg-orange-100 rounded-full text-orange-600 shrink-0'>
              <WarningCircle size={28} weight="bold" />
            </div>
            <div>
              <h4 className='font-bold text-orange-900 text-[18px] mb-1'>{regionName}</h4>
              <p className='text-orange-700/80 text-[15px] leading-relaxed font-medium'>{t.noResultsInRegion}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Modal - Unchanged */}
      <AnimatePresence>
        {isModalOpen && (
          <div className='fixed inset-0 z-[2000] flex items-center justify-center p-5'>
            <div className='absolute inset-0 bg-black/70 backdrop-blur-md' onClick={() => setIsModalOpen(false)}/>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className='relative w-full max-w-[420px] bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]'>
              <div className='p-6 border-b border-gray-100 flex items-center justify-between bg-white'>
                <div className='flex items-center gap-3'> <GlobeHemisphereWest size={24} className='text-[#2552A1]' weight="bold" /> <h3 className='font-bold text-gray-900 text-lg'>{t.selectRegion}</h3> </div>
                <button onClick={() => setIsModalOpen(false)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'> <X size={20} weight="bold" /> </button>
              </div>
              <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'>
                {regions.map((region) => (
                    <button key={region.id} onClick={() => handleManualRegion(region)} className={`w-full text-left p-4 rounded-[20px] transition-all flex items-center justify-between border ${manualLabel === getTranslated(region.name) ? 'bg-[#2552A1] text-white' : 'bg-white text-gray-700 hover:border-[#2552A1]/20'}`}>
                        <span className='font-bold text-[15px]'> {getTranslated(region.name)} </span> <CaretRight size={16} weight="bold" />
                    </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className='flex justify-center py-40'> <div className='w-14 h-14 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin' /> </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
          <AnimatePresence mode='popLayout'>
            {places.map((place, index) => (
              <Link to={`/nearby_place/${place.slug}`} key={place.slug} className='block'>
                <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className='relative aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden group shadow-lg'>
                  <img src={place.cover_image} alt={getTranslated(place.name)} className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000'/>
                  <div className='absolute top-6 left-6 flex flex-wrap gap-2 z-20'>
                    <div className='bg-white/95 backdrop-blur-md text-[#2552A1] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm'>
                      <MapTrifold size={16} weight="bold" /> {place.distance_km} {t.distance}
                    </div>
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60' />
                  <div className='absolute bottom-0 left-0 w-full p-6 md:p-10 z-10'>
                    <h3 className='font-bold text-white text-xl md:text-2xl leading-tight group-hover:text-[#64B5F6] transition-colors'> {getTranslated(place.name)} </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Nearby_places