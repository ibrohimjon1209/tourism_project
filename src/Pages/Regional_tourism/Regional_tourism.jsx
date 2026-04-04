import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { regionService } from '../../Services/api'

const Regional_tourism = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const getTranslated = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.uz || '';
  };

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      try {
        const data = await regionService.getRegions();
        if (data && data.results) {
          setRegions(data.results);
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [lang]);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      regionalTourism: "Viloyatlar turizmi",
      title: "Viloyatlar bo'yicha turizm",
      desc: "O'zbekistonning har bir go'shasi o'ziga xos tarix va madaniyatga ega.",
      places: "joylar"
    },
    ru: {
      home: "Главная",
      regionalTourism: "Региональный туризм",
      title: "Туризм по регионам",
      desc: "Каждый уголок Узбекистана имеет свою уникальную историю и культуру.",
      places: "места"
    },
    en: {
      home: "Home page",
      regionalTourism: "Regional tourism",
      title: "Tourism by regions",
      desc: "Each corner of Uzbekistan has its own unique history and culture.",
      places: "places"
    }
  };

  const t = translations[lang] || translations.uz;

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

      {loading ? (
        <div className='flex justify-center py-40'>
          <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] md:gap-x-[30px]'>
          {regions.map((region, index) => {
            const staggeredClass = (index % 2 !== 0) ? 'sm:mt-[30px]' : '';
            const name = getTranslated(region.name);
            
            return (
              <Link key={region.id} to={`/regional/${region.slug}`} className={staggeredClass}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className='relative aspect-[4/5] md:aspect-[3/4] rounded-[30px] overflow-hidden group cursor-pointer shadow-lg'
                >
                  <div className='absolute inset-0 bg-gray-100'>
                    <img 
                      src={region.featured_image} 
                      alt={name} 
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
                  </div>

                  <div className='absolute bottom-0 left-0 w-full p-8 z-10'>
                    <h2 className='font-inter font-bold text-[28px] text-white tracking-tight transform transition-transform group-hover:translate-x-2'>
                      {name}
                    </h2>
                    <p className='text-white/60 text-sm mt-1 capitalize font-bold'>{t.places}: {region.count}</p>
                  </div>

                  <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Regional_tourism;