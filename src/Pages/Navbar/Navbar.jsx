import React, { useState, useEffect } from 'react'
import { Globe, MagnifyingGlass, List, CaretDown } from '@phosphor-icons/react'

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('Uz')
  const [isScrolled, setIsScrolled] = useState(false)

  const languages = [
    { code: 'uz', label: 'Uz' },
    { code: 'ru', label: 'Ru' },
    { code: 'en', label: 'En' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-[60px] transition-all duration-500 z-[100] ${
      isScrolled ? 'bg-black/90 backdrop-blur-md py-[24px]' : 'bg-transparent py-[40px]'
    }`}>
      <h1 className='font-inter font-bold text-[24px] text-white'>UzTurism</h1>

      <div className={`w-[480px] h-[48px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-start gap-[15px] px-[20px] transition-all duration-500 ${
        isScrolled ? 'border border-white/20' : 'border border-transparent'
      }`}>
        <MagnifyingGlass size={24} color='white' weight='bold' />
        <input 
          type='text' 
          placeholder='Yaqindagi joylarni qidirish...' 
          className='font-inter font-medium text-[16px] text-white bg-transparent outline-none w-full placeholder:text-gray-400' 
        />
      </div>

      <div className='flex items-center gap-[15px]'>
        {/* Language Custom Dropdown */}
        <div className='relative'>
          <div 
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
              color='white' 
              weight='bold' 
              className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} 
            />
          </div>

          {isLangOpen && (
            <div className='absolute top-[55px] left-0 w-full bg-[#1A1A1A]/80 backdrop-blur-md rounded-[20px] py-[10px] flex flex-col gap-[5px] z-50 border border-white/10'>
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
            </div>
          )}
        </div>

        <button className={`w-[130px] h-[48px] rounded-[50px] bg-[#1A1A1A]/50 backdrop-blur-sm flex items-center justify-center gap-[10px] px-[20px] hover:bg-[#1A1A1A]/70 transition-all duration-500 cursor-pointer ${
          isScrolled ? 'border border-white/20' : 'border border-transparent'
        }`}>
          <List size={24} color='white' weight='bold' />
          <span className='font-inter font-medium text-[16px] text-white capitalize'>Menu</span>
        </button>
      </div>
    </nav>

  )
}

export default Navbar





