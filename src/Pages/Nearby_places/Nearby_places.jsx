import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Nearby_places = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      nearbyPlaces: "Yaqin turistik joylar",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
      city: "Toshkent shahri"
    },
    ru: {
      home: "Главная",
      nearbyPlaces: "Ближайшие туристические объекты",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок.",
      city: "Город Ташкент"
    },
    en: {
      home: "Home page",
      nearbyPlaces: "Nearby tourist attractions",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales.",
      city: "Tashkent city"
    }
  };

  const t = translations[lang] || translations.uz;

  const nearbyPlaces = [
    { id: 1, name_uz: "Magic City", name_ru: "Magic City", name_en: "Magic City" },
    { id: 2, name_uz: "Humo muz saroyi", name_ru: "Ледовый дворец Хумо", name_en: "Humo Ice Palace" },
    { id: 3, name_uz: "Tashkent city", name_ru: "Tashkent city", name_en: "Tashkent city" },
    { id: 4, name_uz: "Muqimiy teatri", name_ru: "Театр Мукими", name_en: "Muqimi Theater" },
    { id: 5, name_uz: "Bunyodkor stadioni", name_ru: "Стадион Бунёдкор", name_en: "Bunyodkor Stadium" },
    { id: 6, name_uz: "Botanika bog'i", name_ru: "Ботанический сад", name_en: "Botanical Garden" }
  ];

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-40 px-[20px] md:px-[60px] overflow-x-hidden'>
      {/* Breadcrumb */}
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base font-inter mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>{t.nearbyPlaces}</span>
      </nav>

      {/* Header with Badge */}
      <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12'>
        <motion.header 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-[800px]'
        >
          <h1 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
            {t.nearbyPlaces}
          </h1>
          <p className='font-inter text-gray-500 text-[16px] md:text-[20px] leading-relaxed'>
            {t.desc}
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex items-center gap-2 px-6 py-3 rounded-full border border-gray-100 bg-gray-50 text-gray-600 font-inter font-medium text-sm md:text-base w-fit h-fit shadow-sm'
        >
          <MapPin size={20} weight="fill" className='text-[#2552A1]' />
          <span>{t.city}</span>
        </motion.div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-8'>
        {nearbyPlaces.map((place, index) => (
          <Link to={`/nearby_place/${place.id}`} key={place.id} className='block'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className='relative aspect-[8/5] md:aspect-[16/9] rounded-[30px] overflow-hidden group cursor-pointer shadow-xl bg-gray-950 flex items-center justify-center border border-gray-100'
            >
              <div className='text-gray-800 font-inter font-bold text-xl uppercase tracking-widest p-4 text-center z-0 opacity-20'>Image Placeholder</div>
              
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
              
              <div className='absolute bottom-0 left-0 w-full p-6.5 md:p-8 z-10'>
                <h3 className='font-inter font-bold text-[24px] md:text-[32px] text-white tracking-tight uppercase leading-tight'>
                  {getTranslated(place, 'name')}
                </h3>
                <div className='w-0 group-hover:w-[100px] h-[3px] bg-[#2552A1] mt-3 transition-all duration-500' />
              </div>

              <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Nearby_places