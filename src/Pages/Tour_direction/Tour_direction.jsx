import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';

const Tour_direction = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      tourDirection: "Sayohat yo'nalishlari",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi."
    },
    ru: {
      home: "Главная",
      tourDirection: "Направления путешествий",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок."
    },
    en: {
      home: "Home page",
      tourDirection: "Travel directions",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales."
    }
  };

  const t = translations[lang] || translations.uz;

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  const directions = [
    {
      id: 1,
      name_uz: "Toshkent shahri", name_ru: "Город Ташкент", name_en: "Tashkent city",
      badge_uz: "1 kun", badge_ru: "1 день", badge_en: "1 day",
      image: "https://placehold.co/800x600/1e3a8a/ffffff?text=Toshkent+City"
    },
    {
      id: 2,
      name_uz: "Toshkent -> Samarqand -> Buxoro", name_ru: "Ташкент -> Самарканд -> Бухара", name_en: "Tashkent -> Samarkand -> Bukhara",
      badge_uz: "5 kun", badge_ru: "5 дней", badge_en: "5 days",
      image: "https://placehold.co/800x600/333/fff?text=Toshkent+Samarqand+Buxoro"
    },
    {
      id: 3,
      name_uz: "Buxoro -> Samarqand -> Qashqadaryo", name_ru: "Бухара -> Самарканд -> Кашкадарья", name_en: "Bukhara -> Samarkand -> Kashkadarya",
      badge_uz: "Tarixiy", badge_ru: "Исторический", badge_en: "Historical",
      image: "https://placehold.co/800x600/222/fff?text=Historical+Route"
    },
    {
      id: 4,
      name_uz: "Qashqadaryo -> Surxondaryo", name_ru: "Кашкадарья -> Сурхандарья", name_en: "Kashkadarya -> Surkhandarya",
      badge_uz: "Tarixiy", badge_ru: "Исторический", badge_en: "Historical",
      image: "https://placehold.co/800x600/444/fff?text=Qashqadaryo+Surxondaryo"
    },
    {
      id: 5,
      name_uz: "Surxondaryo", name_ru: "Сурхандарья", name_en: "Surkhandarya",
      badge_uz: "Tabiat", badge_ru: "Природный", badge_en: "Nature",
      image: "https://placehold.co/800x600/111/fff?text=Surxondaryo+Nature"
    },
    {
      id: 6,
      name_uz: "Jizzax", name_ru: "Джизак", name_en: "Jizzakh",
      badge_uz: "Tabiat", badge_ru: "Природный", badge_en: "Nature",
      image: "https://placehold.co/800x600/555/fff?text=Jizzax+Nature"
    }
  ];

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px] font-inter'>
      {/* Breadcrumb */}
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>{t.tourDirection}</span>
      </nav>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='max-w-[800px] mb-12'
      >
        <h1 className='text-[36px] md:text-[52px] font-bold text-gray-900 leading-tight mb-4 tracking-tight'>
          {t.tourDirection}
        </h1>
        <p className='font-inter text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-medium'>
          {t.desc}
        </p>
      </motion.div>

      {/* Grid of Direction Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
        {directions.map((direction) => (
          <motion.div
            key={direction.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to={`/tour_direction/${direction.id}`} 
              className='group relative block aspect-[4/3] md:aspect-[16/10] rounded-[30px] overflow-hidden cursor-pointer shadow-xl'
            >
              <img 
                src={direction.image} 
                alt={getTranslated(direction, 'name')} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
              />
              
              {/* Badge Overlay */}
              <div className='absolute top-6 right-6'>
                <div className='bg-black/40 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-bold border border-white/10'>
                  {getTranslated(direction, 'badge')}
                </div>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
              
              {/* Direction Name/Route */}
              <div className='absolute bottom-0 left-0 p-6 md:p-10 w-full'>
                <h3 className='text-white text-xl md:text-2xl font-bold leading-tight max-w-[90%]'>
                  {getTranslated(direction, 'name')}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tour_direction;