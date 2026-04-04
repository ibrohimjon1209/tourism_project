import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CaretRight, MagnifyingGlass, Warning } from '@phosphor-icons/react';
import { searchService } from '../../Services/api';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
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
      results: "Qidiruv natijalari",
      searchTitle: "Qidiruv:",
      placeholder: "Joylar yoki ziyoratgohlarni qidiring...",
      pilgrimage: "Ziyoratgoh",
      tourist: "Turistik joy",
      noResults: "Hech narsa topilmadi",
      noResultsDesc: "Boshqa so'z bilan qidirib ko'ring yoki bosh sahifaga qayting"
    },
    ru: {
      home: "Главная",
      results: "Результаты поиска",
      searchTitle: "Поиск:",
      placeholder: "Ищите места или святыни...",
      pilgrimage: "Святыня",
      tourist: "Туристическое место",
      noResults: "Ничего не найдено",
      noResultsDesc: "Попробуйте другое слово или вернитесь на главную страницу"
    },
    en: {
      home: "Home page",
      results: "Search results",
      searchTitle: "Search:",
      placeholder: "Search for places or shrines...",
      pilgrimage: "Shrine",
      tourist: "Tourist place",
      noResults: "Nothing found",
      noResultsDesc: "Try another word or return to the home page"
    }
  };

  const t = translations[lang] || translations.uz;

  const fetchResults = async (q) => {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchService.search(q, 20);
      if (data && data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(query);
  }, [query, lang]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px] font-inter'>
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>{t.results}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='mb-12'
      >
        <h1 className='text-[32px] md:text-[48px] font-bold text-gray-900 leading-tight mb-8'>
          {t.searchTitle} <span className='text-[#2552A1]'>"{query}"</span>
        </h1>

        <form onSubmit={handleSearch} className='relative max-w-[600px]'>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.placeholder}
            className='w-full bg-gray-50 border border-gray-200 outline-none focus:border-[#2552A1] px-6 py-4 rounded-3xl font-medium transition-all pr-16 shadow-sm'
          />
          <button 
            type="submit"
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#2552A1] text-white p-3 rounded-2xl hover:bg-[#1d428a] transition-all cursor-pointer'
          >
            <MagnifyingGlass size={24} weight="bold" />
          </button>
        </form>
      </motion.div>

      {loading ? (
        <div className='flex justify-center py-40'>
          <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : results.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
          <AnimatePresence mode='popLayout'>
            {results.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  to={`/tourist_place/${item.slug}`}
                  className='group relative block aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-xl'
                >
                  <img 
                    src={item.cover_image} 
                    alt={getTranslated(item.name)} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                  
                  <div className='absolute bottom-0 left-0 p-8 w-full'>
                    <div className='flex items-center gap-2 mb-2'>
                       <span className='bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-bold tracking-wider'>
                         {item.destination_type === 'pilgrimage' ? t.pilgrimage : t.tourist}
                       </span>
                    </div>
                    <h3 className='text-white text-2xl md:text-3xl font-bold leading-tight'>
                      {getTranslated(item.name)}
                    </h3>
                    <p className='text-gray-300 text-sm mt-1'>{getTranslated(item.region_name)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        query && (
          <div className='flex flex-col items-center justify-center py-40 text-center'>
            <div className='bg-gray-100 p-8 rounded-full mb-6'>
              <Warning size={48} className='text-gray-400' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t.noResults}</h2>
            <p className='text-gray-500'>{t.noResultsDesc}</p>
            <Link to="/" className='mt-8 bg-[#2552A1] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#2552A1]/20'>
              {t.home}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default SearchPage;
