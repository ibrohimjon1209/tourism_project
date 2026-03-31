import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
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
  
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const changeLanguage = (newLang) => {
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    window.dispatchEvent(new Event('langChange'));
  };

  const translations = {
    uz: {
      searchPlaceholder: "Yaqindagi joylarni qidirish...",
      searchHistory: "Qidiruv tarixi",
      clear: "Tozalash",
      menu: "Menyu",
      close: "Yopish",
      home: "Bosh sahifa",
      about: "O'zbekiston haqida",
      touristPlaces: "Turistik joylar",
      interactiveMap: "Interaktiv xarita",
      tourDirection: "Sayohat yo'nalishlari",
      nearbyPlaces: "Yaqindagi turistik obyektlar",
      calculator: "Sayohat kalkulyatori",
      regional: "Viloyatlar turizmi",
      contact: "Bog'lanish"
    },
    ru: {
      searchPlaceholder: "Поиск ближайших мест...",
      searchHistory: "История поиска",
      clear: "Очистить",
      menu: "Меню",
      close: "Закрыть",
      home: "Главная",
      about: "Об Узбекистане",
      touristPlaces: "Туристические места",
      interactiveMap: "Интерактивная карта",
      tourDirection: "Направления",
      nearbyPlaces: "Ближайшие туристические объекты",
      calculator: "Калькулятор путешествий",
      regional: "Региональный туризм",
      contact: "Контакты"
    },
    en: {
      searchPlaceholder: "Search nearby places...",
      searchHistory: "Search history",
      clear: "Clear",
      menu: "Menu",
      close: "Close",
      home: "Home page",
      about: "About Uzbekistan",
      touristPlaces: "Tourist places",
      interactiveMap: "Interactive map",
      tourDirection: "Travel directions",
      nearbyPlaces: "Nearby tourist objects",
      calculator: "Travel calculator",
      regional: "Regional tourism",
      contact: "Contact"
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
    { label: t.interactiveMap, icon: MapTrifold, path: "/map" },
    { label: t.tourDirection, icon: NavigationArrow, path: "/tour_direction" },
    { label: t.nearbyPlaces, icon: MapPinArea, path: "/nearby_places" },
    { label: t.calculator, icon: Calculator, path: "#" },
    { label: t.regional, icon: Compass, path: "/regional" },
    { label: t.contact, icon: Phone, path: "#" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false)
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
      setIsHistoryOpen(false)
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
          UzTurism
        </Link>

        {/* Search Section */}
        <div className='relative hidden md:flex items-center' ref={historyRef}>
          <div className={`w-full md:w-[350px] lg:w-[480px] h-[48px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-start gap-[15px] px-[20px] transition-all duration-500 ${
            isScrolled || isHistoryOpen || !isHomePage ? 'border border-white/20' : 'border border-transparent'
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

          {/* Search History Dropdown */}
          <AnimatePresence>
            {isHistoryOpen && searchHistory.length > 0 && (
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
              className={`h-[48px] px-[20px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-[10px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${
                isScrolled || !isHomePage ? 'border border-white/20' : 'border border-transparent'
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
                  {languages.map((lang) => (
                    <div 
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className='px-[20px] py-[8px] hover:bg-white/10 text-white font-inter font-medium text-[16px] cursor-pointer transition-colors text-center uppercase'
                    >
                      {lang.label}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(true)}
            className={`h-[48px] md:h-[48px] px-[15px] lg:px-[20px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-2 md:gap-[10px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${
              isScrolled || !isHomePage ? 'border border-white/20' : 'border border-transparent'
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
            className='fixed inset-0 w-full h-full bg-white z-[200] px-[20px] md:px-[60px] py-[20px] md:py-[40px] flex flex-col'
          >
            <div className="absolute top-10 right-20 p-10 md:p-20 opacity-[0.03] pointer-events-none select-none overflow-hidden h-full">
              <Compass size={600} weight="thin" className="translate-x-1/4 -translate-y-1/4" />
            </div>

            <div className='flex items-center justify-between relative z-10'>
              <div className="flex flex-col">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <h1 className='font-inter font-bold text-[24px] md:text-[28px] text-[#2552A1] tracking-tight'>UzTurism</h1>
                </Link>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className='flex items-center justify-center h-[48px] w-[48px] md:w-auto md:px-6 md:py-3 rounded-full border border-gray-100 bg-white hover:bg-gray-50 shadow-sm transition-all cursor-pointer group'
              >
                <X size={26} weight='bold' className='text-gray-600 group-hover:rotate-90 transition-transform duration-300 md:size-5' />
                <span className='text-xs font-inter text-[16px] font-bold text-gray-600 uppercase hidden md:block md:ml-2'>{t.close}</span>
              </motion.button>
            </div>

            <div className='flex-1 flex flex-col justify-start md:justify-center items-center my-6 md:my-20 relative z-10 overflow-y-auto custom-scrollbar'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 md:gap-y-10 gap-x-12 w-full max-w-[1400px]'>
                {menuItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                    className='group relative flex items-center gap-4 md:gap-6 cursor-pointer py-3 md:py-0'
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 md:gap-6 w-full"
                    >
                      <div className="p-3 md:p-3 rounded-[15px] md:rounded-2xl bg-gray-50 group-hover:bg-[#2552A1]/5 group-hover:scale-110 transition-all duration-300">
                        <item.icon size={26} className="md:size-6 text-gray-400 group-hover:text-[#2552A1] transition-colors" />
                      </div>
                      <span className='font-inter font-bold text-[22px] md:text-[24px] lg:text-[28px] text-gray-800 group-hover:text-[#2552A1] transition-all duration-300 relative whitespace-nowrap overflow-hidden text-ellipsis px-1'>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between -ml-4 gap-6 pb-6 pt-6 border-t border-gray-50 relative z-10 bg-white mt-auto'>
              <div className='flex items-center gap-4 order-1 md:order-2 px-2'>
                {[
                  { icon: InstagramLogo, link: '#' },
                  { icon: FacebookLogo, link: '#' },
                  { icon: YoutubeLogo, link: '#' }
                ].map((social, idx) => (
                  <motion.a 
                    href={social.link}
                    key={idx}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className='w-11 h-11 md:w-11 md:h-11 rounded-xl bg-gray-50 flex items-center justify-center cursor-pointer text-gray-400 group hover:text-[#2552A1] transition-all'
                  >
                    <social.icon size={32} weight="bold" className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
              
              <div className="order-3 hidden lg:block">
                <span className='font-inter text-[#2552A1] font-bold text-sm tracking-widest uppercase'>uztourism.uz</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar;
