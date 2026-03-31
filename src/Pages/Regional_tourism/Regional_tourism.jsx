import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Regional_tourism = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      regionalTourism: "Viloyatlar turizmi",
      title: "Viloyatlar bo'yicha turizm",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi."
    },
    ru: {
      home: "Главная",
      regionalTourism: "Региональный туризм",
      title: "Туризм по регионам",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок."
    },
    en: {
      home: "Home page",
      regionalTourism: "Regional tourism",
      title: "Tourism by regions",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales."
    }
  };

  const t = translations[lang] || translations.uz;

  const regions = [
    { id: 4, name_uz: "Xiva", name_ru: "Хива", name_en: "Khiva", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, name_uz: "Farg'ona", name_ru: "Фергана", name_en: "Fergana", image: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, name_uz: "Andijon", name_ru: "Андижан", name_en: "Andijan", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop" },
    { id: 7, name_uz: "Namangan", name_ru: "Наманган", name_en: "Namangan", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, name_uz: "Navoiy", name_ru: "Навои", name_en: "Navoi", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop" },
    { id: 9, name_uz: "Qashqadaryo", name_ru: "Кашкадарья", name_en: "Kashkadarya", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop" },
    { id: 10, name_uz: "Surxondaryo", name_ru: "Сурхандарья", name_en: "Surkhandarya", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop" },
    { id: 11, name_uz: "Jizzax", name_ru: "Джизак", name_en: "Jizzakh", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop" },
    { id: 12, name_uz: "Sirdaryo", name_ru: "Сырдарья", name_en: "Syrdarya", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" },
    { id: 13, name_uz: "Qoraqalpog'iston", name_ru: "Каракалпакстан", name_en: "Karakalpakstan", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop" }
  ];

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-40 px-[20px] md:px-[60px]'>
      <nav className='flex items-center gap-2 text-gray-500 text-sm md:text-base font-inter mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-400'>{t.regionalTourism}</span>
      </nav>

      <motion.header 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='max-w-[800px] mb-12'
      >
        <h1 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
          {t.title}
        </h1>
        <p className='font-inter text-gray-500 text-[16px] md:text-[20px] leading-relaxed'>
          {t.desc}
        </p>
      </motion.header>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] md:gap-x-[30px]'>
        {regions.map((region, index) => {
          const staggeredClass = (index % 2 !== 0) ? 'sm:mt-[30px]' : ''
          
          return (
            <Link key={region.id} to="/single_city" className={staggeredClass}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative aspect-[4/5] md:aspect-[3/4] rounded-[30px] overflow-hidden group cursor-pointer shadow-lg`}
              >
                <div className='absolute inset-0 bg-gray-100'>
                  <img 
                    src={region.image} 
                    alt={getTranslated(region, 'name')} 
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
                </div>

                <div className='absolute bottom-0 left-0 w-full p-8 z-10'>
                  <h2 className='font-inter font-bold text-[28px] text-white tracking-tight transform transition-transform group-hover:translate-x-2'>
                    {getTranslated(region, 'name')}
                  </h2>
                </div>

                <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Regional_tourism