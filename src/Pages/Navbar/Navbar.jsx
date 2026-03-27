import React, { useState, useEffect, useRef } from 'react'
import { Globe, MagnifyingGlass, List, CaretDown, Clock, X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('Uz')
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Close history on click outside
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setIsHistoryOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      const updatedHistory = [searchTerm, ...searchHistory.filter(h => h !== searchTerm)].slice(0, 5)
      setSearchHistory(updatedHistory)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      setIsHistoryOpen(false)
      e.target.blur() // Fokusni olib tashlash
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

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-[20px] md:px-[60px] transition-all duration-500 z-[100] ${
        isScrolled ? 'bg-black/90 backdrop-blur-md py-4 md:py-[24px]' : 'bg-transparent py-[30px] md:py-[40px]'
      }`}
    >
      <h1 className='font-inter font-bold text-[24px] text-white whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity'>UzTurism</h1>

      {/* Search Section */}
      <div className='relative hidden md:flex items-center' ref={historyRef}>
        <div className={`w-full md:w-[350px] lg:w-[480px] h-[48px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-start gap-[15px] px-[20px] transition-all duration-500 ${
          isScrolled || isHistoryOpen ? 'border border-white/20' : 'border border-transparent'
        }`}>
          <MagnifyingGlass size={24} color='white' weight='bold' />
          <input 
            type='text' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsHistoryOpen(true)}
            onClick={() => setIsHistoryOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder='Yaqindagi joylarni qidirish...' 
            className='font-inter navbar-search-input text-[16px] text-white bg-transparent outline-none w-full placeholder:text-gray-400' 
          />
        </div>

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
                <span className='text-gray-400 text-sm font-medium'>Qidiruv tarixi</span>
                <button 
                  onClick={clearHistory}
                  className='cursor-pointer text-red-400 text-xs hover:text-red-300 transition-colors capitalize font-bold'
                >
                  Tozalash
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
              isScrolled ? 'border border-white/20' : 'border border-transparent'
            }`}
          >
            <Globe size={24} color='white' weight='bold' />
            <span className='font-inter font-medium text-[16px] text-white uppercase select-none'>
              {selectedLang}
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
                      setSelectedLang(lang.label)
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
          className={`h-[48px] md:h-[48px] px-5 md:px-[20px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-2 md:gap-[10px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${
            isScrolled ? 'border border-white/20' : 'border border-transparent'
          }`}
        >
          <List size={32} className="w-6 h-6 md:w-6 md:h-6" color='white' weight='bold' />
          <span className='font-inter font-semibold uppercase text-[16px] md:font-medium text-white'>
            Menu
          </span>
        </motion.button>
      </div>
    </motion.nav>





  )
}

export default Navbar





