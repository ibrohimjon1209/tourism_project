import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretRight, MapPin, Warning } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';
import { regionService } from '../../Services/api';

const Single_city = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
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
    const fetchRegionDetail = async () => {
      setLoading(true);
      try {
        const res = await regionService.getRegionDetail(slug);
        setData(res);
      } catch (error) {
        console.error('Failed to fetch region detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionDetail();
  }, [slug, lang]);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      regional: "Viloyatlar turizmi",
      recommended: "Tashrif buyurish tavsiya etiladi",
      country: "O'zbekiston",
      notFound: "Ma'lumot topilmadi",
      backToRegional: "Viloyatlarga qaytish",
      viewOnMap: "Xaritada ko'rish"
    },
    ru: {
      home: "Главная",
      regional: "Региональный туризм",
      recommended: "Рекомендуется к посещению",
      country: "Узбекистан",
      notFound: "Информация не найдена",
      backToRegional: "Вернуться к регионам",
      viewOnMap: "Посмотреть на карте"
    },
    en: {
      home: "Home page",
      regional: "Regional tourism",
      recommended: "Recommended to visit",
      country: "Uzbekistan",
      notFound: "Information not found",
      backToRegional: "Back to regions",
      viewOnMap: "View on map"
    }
  };

  const t = translations[lang] || translations.uz;

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  if (!data || !data.region) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-black text-center px-5'>
        <Warning size={48} className='text-gray-500 mb-6' />
        <h2 className='text-white text-2xl font-bold'>{t.notFound}</h2>
        <Link to="/regional" className='mt-8 text-[#2552A1] font-bold'>{t.backToRegional}</Link>
      </div>
    );
  }

  const regionName = getTranslated(data.region.name);
  const regionInfo = getTranslated(data.region.info);

  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex items-center gap-2 text-gray-500 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
            <CaretRight size={14} weight='bold' />
            <Link to="/regional" className='hover:text-[#2552A1] transition-colors'>{t.regional}</Link>
            <CaretRight size={14} weight='bold' />
            <span className='text-gray-400'>{regionName}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[600px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 order-1 lg:order-2'
            >
              {data.results && data.results[0] && (
                <img src={data.results[0].cover_image} alt={regionName} className='w-full h-full object-cover' />
              )}
              <div className='absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none' />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-tight mb-2'>
                {regionName}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{t.country}</p>
              
              <p className='font-inter text-gray-400 text-[14px] md:text-[16px] leading-[1.8] max-w-[550px] mb-8'>
                {regionInfo}
              </p>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/map')}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-8 rounded-full w-fit shadow-lg shadow-[#2552A1]/20 cursor-pointer'
              >
                <MapPin size={22} weight="bold" />
                <span>{t.viewOnMap}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-20 md:py-40 px-[20px] md:px-[60px]'>
        <header className='max-w-[800px] mb-12'>
          <h2 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
            {t.recommended}
          </h2>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] md:gap-x-[30px]'>
          <AnimatePresence mode='popLayout'>
            {data.results?.map((place, index) => {
              const staggeredClass = (index % 2 !== 0) ? 'sm:mt-[30px]' : '';
              const name = getTranslated(place.name);
              
              return (
                <Link key={place.id} to={`/tourist_place/${place.slug}`} className={staggeredClass}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                    whileHover={{ y: -5 }}
                    className='relative aspect-[4/5] md:aspect-[3/4] rounded-[30px] overflow-hidden group cursor-pointer shadow-lg bg-gray-50'
                  >
                    <div className='absolute inset-0'>
                      <img src={place.cover_image} alt={name} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
                    </div>

                    <div className='absolute bottom-0 left-0 w-full p-8 z-10'>
                      <h3 className='font-inter font-bold text-[24px] text-white tracking-tight transform transition-transform group-hover:translate-x-2 leading-tight'>
                        {name}
                      </h3>
                    </div>

                    <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </motion.div>
                </Link>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Single_city;