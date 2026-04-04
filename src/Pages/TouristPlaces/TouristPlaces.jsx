import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import { placesService } from '../../Services/api';

const TouristPlaces = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      touristPlaces: "Turistik joylar",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
      all: "Barchasi",
      noResults: "Bu turkumda hozircha joylar yo'q"
    },
    ru: {
      home: "Главная",
      touristPlaces: "Туристические места",
      desc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок.",
      all: "Все",
      noResults: "В этой категории пока нет мест"
    },
    en: {
      home: "Home page",
      touristPlaces: "Tourist places",
      desc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales.",
      all: "All",
      noResults: "There are no places in this category yet"
    }
  };

  const t = translations[lang] || translations.uz;

  const [activeFilter, setActiveFilter] = useState(t.all);
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([t.all]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveFilter(t.all);
  }, [lang, t.all]);

  const getTranslated = (obj, currentLang) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.uz || '';
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await placesService.getPlaces();
        if (data && data.results) {
          const mappedPlaces = data.results.map(item => ({
            id: item.id,
            slug: item.slug,
            name: getTranslated(item.name, lang),
            region: getTranslated(item.region?.name, lang),
            image: item.cover_image,
            itemCategories: item.categories?.map(c => ({
              slug: c.slug,
              name: getTranslated(c.name, lang)
            })) || []
          }));
          setPlaces(mappedPlaces);

          const allCats = new Set([t.all]);
          data.results.forEach(item => {
            item.categories?.forEach(cat => {
              allCats.add(getTranslated(cat.name, lang));
            });
          });
          setCategories(Array.from(allCats));
        }
      } catch (error) {
        console.error('Failed to load places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [lang]);

  const filteredPlaces = activeFilter === t.all 
    ? places 
    : places.filter(place => 
        place.itemCategories.some(c => c.name === activeFilter)
      );

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px] font-inter'>
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>{t.touristPlaces}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='mb-8 md:mb-12'
      >
        <h1 className='text-[32px] md:text-[48px] font-bold text-gray-900 leading-tight mb-4'>
          {t.touristPlaces}
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
        <div className='flex justify-center py-20'>
          <div className='w-10 h-10 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8'>
          <AnimatePresence mode='popLayout'>
            {filteredPlaces.map((place) => (
              <motion.div
                layout
                key={place.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  to={`/tourist_place/${place.slug}`}
                  className='group relative block aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-xl'
                >
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                  
                  <div className='absolute bottom-0 left-0 p-6 md:p-10 w-full'>
                    <h3 className='text-white text-xl md:text-2xl font-bold leading-tight max-w-[80%]'>
                      {place.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredPlaces.length === 0 && (
        <div className='text-center py-20'>
          <p className='text-gray-400 font-bold text-[20px]'>{t.noResults}</p>
        </div>
      )}
    </div>
  );
};

export default TouristPlaces;
