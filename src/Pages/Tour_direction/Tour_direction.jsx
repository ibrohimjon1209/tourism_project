import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import { routeService } from '../../Services/api';

const Tour_direction = () => {
  const [routes, setRoutes] = useState([]);
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

  const translations = {
    uz: {
      home: "Bosh sahifa",
      tourDirection: "Sayohat yo'nalishlari",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
      all: "Barchasi",
      distance: "km",
      duration: "Davomiyligi",
      start: "Boshlanish",
      noResults: "Bu yo'nalishda hozircha ma'lumot yo'q"
    },
    ru: {
      home: "Главная",
      tourDirection: "Направления путешествий",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок.",
      all: "Все",
      distance: "км",
      duration: "Продолжительность",
      start: "Начало",
      noResults: "В этом направлении пока нет информации"
    },
    en: {
      home: "Home page",
      tourDirection: "Travel directions",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales.",
      all: "All",
      distance: "km",
      duration: "Duration",
      start: "Start",
      noResults: "There is no information in this direction yet"
    }
  };

  const t = translations[lang] || translations.uz;

  const [activeFilter, setActiveFilter] = useState(t.all);
  const [categories, setCategories] = useState([t.all]);

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const data = await routeService.getRoutes();
        if (data && data.results) {
          setRoutes(data.results);
          
          // Dynamically extract categories (using transport_type_label as a proxy or if a category field existed)
          const allCats = new Set([t.all]);
          data.results.forEach(item => {
            const catLabel = getTranslated(item.transport_type_label);
            if (catLabel) {
              allCats.add(catLabel);
            }
          });
          setCategories(Array.from(allCats));
        }
      } catch (error) {
        console.error('Failed to fetch routes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [lang]);

  const filteredRoutes = activeFilter === t.all
    ? routes
    : routes.filter(r => getTranslated(r.transport_type_label) === activeFilter);

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px] font-inter'>
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>{t.tourDirection}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='max-w-[800px] mb-8'
      >
        <h1 className='text-[36px] md:text-[52px] font-bold text-gray-900 leading-tight mb-4 tracking-tight'>
          {t.tourDirection}
        </h1>
        <p className='font-inter text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-medium mb-8'>
          {t.desc}
        </p>

        <div className='flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar'>
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm cursor-pointer font-semibold transition-all whitespace-nowrap border
                ${activeFilter === filter 
                  ? 'bg-[#2552A1] text-white border-[#2552A1] shadow-lg shadow-[#2552A1]/20' 
                  : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className='flex justify-center py-40'>
          <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
          <AnimatePresence mode='popLayout'>
            {filteredRoutes.map((route) => (
              <motion.div
                layout
                key={route.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  to={`/tour_direction/${route.id}`} 
                  className='group relative block aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-xl'
                >
                  <img 
                    src={route.preview_image} 
                    alt={getTranslated(route.title)} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  
                  <div className='absolute top-6 right-6 flex gap-2'>
                    <div className='bg-white/90 backdrop-blur-md text-[#2552A1] px-4 py-1.5 rounded-full text-xs font-bold'>
                      {route.distance_km} {t.distance}
                    </div>
                  </div>

                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                  
                  <div className='absolute bottom-0 left-0 p-6 md:p-10 w-full'>
                    <h3 className='text-white text-xl md:text-2xl font-bold leading-tight max-w-[90%]'>
                      {getTranslated(route.title)}
                    </h3>
                    <p className='text-gray-300 text-sm mt-2'>
                      {t.start}: {getTranslated(route.starting_point)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Tour_direction;