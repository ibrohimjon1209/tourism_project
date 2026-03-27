import React from 'react'
import { Link } from 'react-router-dom'
import { InstagramLogo, FacebookLogo, YoutubeLogo } from '@phosphor-icons/react'

const Footer = () => {
  const regionsRow1 = ["Buxoro", "Samarqand", "Xiva", "Urganch", "Nukus", "Termiz", "Shahrisabz"]
  const regionsRow2 = ["Kitop", "Qarshi", "Jizzax", "Andijon", "Farg'ona", "Namangan", "Toshkent"]
  const mainLinks = [
    { name: "O'zbekiston haqida", path: "/place_info" },
    { name: "Turistik joylar", path: "/single_city" },
    { name: "Viloyatlar", path: "/regional" },
    { name: "Xarita", path: "/map" }
  ]

  return (
    <footer className='w-full bg-[#1B1B1B] py-[60px] md:py-[80px] px-5 flex flex-col items-center overflow-hidden'>
      {/* Logo */}
      <Link to="/" className='mb-10 hover:opacity-80 transition-opacity'>
        <h1 className='font-inter font-bold text-[24px] md:text-[28px] text-white tracking-tight uppercase'>UzTurism</h1>
      </Link>

      {/* Regions Grid */}
      <div className="w-full max-w-[900px] flex flex-col gap-6 md:gap-8 mb-12">
        <div className='flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-12'>
          {regionsRow1.map((region) => (
            <span key={region} className='font-inter font-medium text-[14px] md:text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
              {region}
            </span>
          ))}
        </div>
        <div className='flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-12'>
          {regionsRow2.map((region) => (
            <span key={region} className='font-inter font-medium text-[14px] md:text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
              {region}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className='w-full max-w-[400px] h-[1px] bg-white/10 mb-8'></div>

      {/* Main Links */}
      <div className='w-full max-w-[600px] flex flex-wrap justify-center gap-6 md:gap-10 mb-12'>
        {mainLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className='font-inter font-medium text-[15px] md:text-[16px] text-white hover:text-[#2552A1] transition-colors whitespace-nowrap'
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Social Links */}
      <div className='flex gap-4 mb-12'>
        {[
          { icon: InstagramLogo, link: '#' },
          { icon: FacebookLogo, link: '#' },
          { icon: YoutubeLogo, link: '#' }
        ].map((social, idx) => (
          <a
            key={idx}
            href={social.link}
            className='w-11 h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-[#1B1B1B] transition-all duration-300'
          >
            <social.icon size={22} weight="bold" />
          </a>
        ))}
      </div>

      {/* Copyright Divider */}
      <div className='w-full max-w-[400px] h-[1px] bg-white/10 mb-10'></div>

      <p className='font-inter font-light text-[13px] md:text-[14px] text-gray-500 text-center px-4'>
        &copy; 2026 UzTurism. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  )
}

export default Footer