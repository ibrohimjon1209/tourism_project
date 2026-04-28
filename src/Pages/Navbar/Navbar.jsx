import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { searchService } from '../../Services/api'
import {
  Globe, MagnifyingGlass, List, CaretDown, Clock, X,
  InstagramLogo, FacebookLogo, YoutubeLogo,
  House, Info, MapPin, MapTrifold, NavigationArrow,
  Compass, Calculator, Phone, MapPinArea
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [homeData, setHomeData] = useState(null);

  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true);
      try {
        const data = await homeService.getHomeData();
        setHomeData(data);
      } catch (error) {
        console.error("Home data fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const changeLanguage = (newLang) => {
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    window.dispatchEvent(new Event('langChange'));
    setIsLangOpen(false);
  };

  const translations = {
    uz: {
      searchPlaceholder: "Yaqindagi joylarni qidirish...",
      searchHistory: "Qidiruv tarixi",
      searchResults: "Qidiruv natijalari",
      clear: "Tozalash",
      menu: "Menyu",
      close: "Yopish",
      home: "Bosh sahifa",
      about: "O'zbekiston haqida",
      touristPlaces: "Turistik joylar",
      interactiveMap: "Interaktiv xarita",
      tourDirection: "Sayohat yo'nalishlari",
      nearbyPlaces: "Yaqindagi turistik obyektlar",
      regional: "Viloyatlar turizmi",
      contact: "Bog'lanish",
      selectLang: "Tilni tanlang"
    },
    ru: {
      searchPlaceholder: "Поиск ближайших мест...",
      searchHistory: "История поиска",
      searchResults: "Результаты поиска",
      clear: "Очистить",
      menu: "Меню",
      close: "Закрыть",
      home: "Главная",
      about: "Об Узбекистане",
      touristPlaces: "Туристические места",
      interactiveMap: "Интерактивная карта",
      tourDirection: "Направления",
      nearbyPlaces: "Ближайшие туристические объекты",
      regional: "Региональный туризм",
      contact: "Контакты",
      selectLang: "Выберите язык"
    },
    en: {
      searchPlaceholder: "Search nearby places...",
      searchHistory: "Search history",
      searchResults: "Search results",
      clear: "Clear",
      menu: "Menu",
      close: "Close",
      home: "Home page",
      about: "About Uzbekistan",
      touristPlaces: "Tourist places",
      interactiveMap: "Interactive map",
      tourDirection: "Travel directions",
      nearbyPlaces: "Nearby tourist objects",
      regional: "Regional tourism",
      // contact: "Contact",
      selectLang: "Select language"
    }
  };

  const t = translations[lang] || translations.uz;
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const historyRef = useRef(null)

  const languages = [
    { code: 'uz', label: 'Uz' },
    { code: 'ru', label: 'Ru' },
    { code: 'en', label: 'En' }
  ]

  const menuItems = [
    { label: t.home, icon: House, path: "/" },
    { label: t.about, icon: Info, path: "/place_info" },
    { label: t.touristPlaces, icon: MapPin, path: "/tourist_places" },
    { label: t.tourDirection, icon: NavigationArrow, path: "/tour_direction" },
    { label: t.interactiveMap, icon: MapTrifold, path: "/map" },
    { label: t.nearbyPlaces, icon: MapPinArea, path: "/nearby_places" },
    { label: t.regional, icon: Compass, path: "/regional" },
    // { label: t.contact, icon: Phone, path: "#" }
  ]

  const [suggestions, setSuggestions] = useState([])
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([])
        return
      }
      try {
        const data = await searchService.search(searchTerm, 5)
        if (data && data.results) {
          setSuggestions(data.results)
          setIsSuggestionsOpen(true)
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error)
      }
    }

    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false)
        setIsSuggestionsOpen(false)
      }
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      const updatedHistory = [searchTerm, ...searchHistory.filter(h => h !== searchTerm)].slice(0, 5)
      setSearchHistory(updatedHistory)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))

      // Close all dropdowns
      setSuggestions([]);
      setIsHistoryOpen(false)
      setIsSuggestionsOpen(false)

      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      e.target.blur()
    }
  }

  const clearHistory = (e) => {
    e.stopPropagation()
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  const removeHistoryItem = (e, item) => {
    e.stopPropagation()
    const updated = searchHistory.filter(h => h !== item)
    setSearchHistory(updated)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
  }

  const navBgClass = () => {
    if (!isHomePage) return 'bg-black shadow-xl py-4 md:py-[24px]'
    return isScrolled ? 'bg-black/95 backdrop-blur-lg py-4 md:py-[24px] shadow-xl' : 'bg-transparent py-[30px] md:py-[40px]'
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-[20px] md:px-[60px] transition-all duration-500 z-[100] ${navBgClass()}`}>
        <Link to="/" className='font-inter font-bold text-[24px] text-white whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2'>
          GeoTour
        </Link>

        {/* Search Section */}
        <div className='relative hidden md:flex items-center' ref={historyRef}>
          <div className={`w-full md:w-[350px] lg:w-[480px] h-[48px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-start gap-[15px] px-[20px] transition-all duration-500 ${isScrolled || isHistoryOpen || !isHomePage ? 'border border-white/20' : 'border border-transparent'
            }`}>
            <MagnifyingGlass size={24} color='white' weight='bold' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsHistoryOpen(true)}
              onClick={() => setIsHistoryOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={t.searchPlaceholder}
              className='font-inter navbar-search-input text-[16px] text-white bg-transparent outline-none w-full placeholder:text-gray-400'
            />
          </div>

          {/* Search History & Suggestions Dropdown */}
          <AnimatePresence>
            {(isSuggestionsOpen && suggestions.length > 0) ? (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='absolute top-[55px] left-0 w-full bg-[#1A1A1A]/95 backdrop-blur-xl rounded-[25px] py-4 shadow-2xl border border-white/10 overflow-hidden z-50'
              >
                <div className='px-5 pb-2 border-b border-white/5'>
                  <span className='text-gray-400 text-sm font-medium'>{t.searchResults}</span>
                </div>
                <div className='flex flex-col mt-2'>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSuggestionsOpen(false)
                        setIsHistoryOpen(false)
                        setSearchTerm('')
                        navigate(`/tourist_place/${item.slug}`)
                      }}
                      className='flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-white/5 transition-colors group'
                    >
                      <div className='w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10'>
                        <img src={item.cover_image} alt="" className='w-full h-full object-cover group-hover:scale-110 transition-transform' />
                      </div>
                      <div className='flex flex-col overflow-hidden'>
                        <span className='text-white font-bold text-[15px] truncate'>{item.name[lang] || item.name.uz}</span>
                        <span className='text-gray-500 text-xs truncate'>{item.region_name[lang] || item.region_name.uz}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (isHistoryOpen && searchHistory.length > 0 && !searchTerm) && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className='absolute top-[55px] left-0 w-full bg-[#1A1A1A]/85 backdrop-blur-lg rounded-[25px] py-4 shadow-2xl border border-white/10 overflow-hidden'
              >
                <div className='flex items-center justify-between px-5 pb-2 border-b border-white/5'>
                  <span className='text-gray-400 text-sm font-medium'>{t.searchHistory}</span>
                  <button
                    onClick={clearHistory}
                    className='cursor-pointer text-red-400 text-xs hover:text-red-300 transition-colors capitalize font-bold'
                  >
                    {t.clear}
                  </button>
                </div>
                <div className='flex flex-col mt-2'>
                  {searchHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      onClick={() => {
                        setSearchTerm(item)
                        setIsHistoryOpen(false)
                        setIsSuggestionsOpen(false)
                        navigate(`/search?q=${encodeURIComponent(item)}`)
                      }}
                      className='flex items-center justify-between px-5 py-3 cursor-pointer transition-colors group'
                    >
                      <div className='flex items-center gap-3'>
                        <Clock size={18} className='text-gray-500 group-hover:text-white transition-colors' />
                        <span className='text-white font-inter text-[15px]'>{item}</span>
                      </div>
                      <X
                        size={16}
                        onClick={(e) => removeHistoryItem(e, item)}
                        className='text-gray-500 hover:text-red-400 transition-colors'
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='flex items-center gap-2 md:gap-[15px]'>
          <div className='relative hidden sm:block'>
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`h-[48px] px-[20px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-[10px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${isScrolled || !isHomePage ? 'border border-white/20' : 'border border-transparent'
                }`}
            >
              <Globe size={24} color='white' weight='bold' />
              <span className='font-inter font-medium text-[16px] text-white uppercase select-none'>
                {languages.find(l => l.code === lang)?.label || 'Uz'}
              </span>
              <CaretDown
                size={18}
                className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                color='white'
                weight='bold'
              />
            </motion.div>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className='absolute top-[55px] left-0 w-full bg-[#1A1A1A]/80 backdrop-blur-md rounded-[20px] py-[10px] flex flex-col gap-[5px] z-50 border border-white/10'
                >
                  {languages.map((item) => (
                    <div
                      key={item.code}
                      onClick={() => changeLanguage(item.code)}
                      className={`px-[20px] py-[8px] hover:bg-white/10 font-inter font-medium text-[16px] cursor-pointer transition-colors text-center uppercase ${lang === item.code ? 'text-[#2552A1]' : 'text-white'}`}
                    >
                      {item.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(true)}
            className={`h-[48px] md:h-[48px] px-[15px] lg:px-[20px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-2 md:gap-[10px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${isScrolled || !isHomePage ? 'border border-white/20' : 'border border-transparent'
              }`}
          >
            <List size={24} color='white' weight='bold' />
            <span className='font-inter uppercase text-[16px] font-medium text-white'>
              {t.menu}
            </span>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className='fixed inset-0 w-full h-full bg-white z-[200] px-[20px] md:px-[60px] py-[20px] md:pt-[30px] md:pb-[40px] flex flex-col'
          >
            <div className="absolute top-10 right-20 p-10 md:p-20 opacity-[0.03] pointer-events-none select-none overflow-hidden h-full">
              <Compass size={600} weight="thin" className="translate-x-1/4 -translate-y-1/4" />
            </div>

            <div className='flex items-center justify-between relative z-10 mb-4'>
              <div className="flex flex-col">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <h1 className='font-inter font-bold text-[24px] md:text-[28px] text-[#2552A1] tracking-tight'>UzTurism</h1>
                </Link>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className='flex items-center justify-center h-[44px] w-[44px] md:h-[48px] md:w-auto md:px-6 md:py-3 rounded-full border border-gray-100 bg-white hover:bg-gray-50 shadow-sm transition-all cursor-pointer group'
              >
                <X size={24} weight='bold' className='text-gray-600 group-hover:rotate-90 transition-transform duration-300' />
                <span className='text-xs font-inter text-[15px] font-bold text-gray-600 uppercase hidden md:block md:ml-2'>{t.close}</span>
              </motion.button>
            </div>

            <div className='flex-1 flex flex-col justify-start md:justify-center items-center my-2 md:my-10 relative z-10 overflow-y-auto custom-scrollbar'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1 md:gap-y-8 gap-x-12 w-full max-w-[1400px]'>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    className='group relative flex items-center gap-3 md:gap-6 cursor-pointer py-2 md:py-0 border-b border-gray-50 md:border-none'
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 md:gap-6 w-full"
                    >
                      <div className="p-2 md:p-3 rounded-[12px] md:rounded-2xl bg-gray-50 group-hover:bg-[#2552A1]/5 transition-all duration-300">
                        <item.icon size={22} className="md:size-6 text-gray-400 group-hover:text-[#2552A1] transition-colors" />
                      </div>
                      <span className='font-inter font-bold text-[18px] md:text-[24px] lg:text-[28px] text-gray-800 group-hover:text-[#2552A1] transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Language Switcher in Mobile Menu */}
            <div className='md:hidden flex flex-col gap-4 border-t border-gray-100 mt-auto pt-2 pb-5 relative z-10 bg-white'>
              <div className='flex items-center gap-3'>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => changeLanguage(item.code)}
                    className={`flex-1 py-3 rounded-2xl font-bold text-[14px] transition-all border ${lang === item.code
                      ? 'bg-[#2552A1] text-white border-[#2552A1] shadow-md shadow-[#2552A1]/20'
                      : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-t border-gray-50 relative z-10 bg-white md:mt-auto'>
              <div className='flex items-center gap-4 w-full md:w-auto justify-center md:justify-start'>
                {[
                  { icon: InstagramLogo, link: homeData?.social_media?.instagram || "#" },
                  { icon: FacebookLogo, link: homeData?.social_media?.facebook || "#" },
                  { icon: YoutubeLogo, link: homeData?.social_media?.youtube || "#" }
                ].map((social, idx) => (
                  <motion.a
                    href={social.link}
                    key={idx}
                    whileHover={{ y: -5 }}
                    className='w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#2552A1] transition-all'
                  >
                    <social.icon size={26} weight="bold" />
                  </motion.a>
                ))}
              </div>

              <div className="hidden md:block">
                <span className='font-inter text-[#2552A1] font-bold text-sm tracking-widest uppercase'>geotourandijan.uz</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar;
