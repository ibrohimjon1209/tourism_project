import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InstagramLogo, FacebookLogo, YoutubeLogo } from '@phosphor-icons/react'

const Footer = () => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

    useEffect(() => {
        const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
        window.addEventListener('langChange', handleLangChange);
        return () => window.removeEventListener('langChange', handleLangChange);
    }, []);

    const translations = {
        uz: {
            about: "O'zbekiston haqida",
            touristPlaces: "Turistik joylar",
            regional: "Viloyatlar",
            map: "Xarita",
            copyright: "© 2026 UzTourism. Barcha huquqlar himoyalangan.",
            regionsRow1: ["Buxoro", "Samarqand", "Xiva", "Urganch", "Nukus", "Termiz", "Shahrisabz"],
            regionsRow2: ["Kitob", "Qarshi", "Jizzax", "Andijon", "Farg'ona", "Namangan", "Toshkent"]
        },
        ru: {
            about: "Об Узбекистане",
            touristPlaces: "Туристические места",
            regional: "Регионы",
            map: "Карта",
            copyright: "© 2026 UzTourism. Все права защищены.",
            regionsRow1: ["Бухара", "Самарканд", "Хива", "Ургенч", "Нукус", "Термез", "Шахрисабз"],
            regionsRow2: ["Китаб", "Карши", "Джизак", "Андижан", "Фергана", "Наманган", "Ташкент"]
        },
        en: {
            about: "About Uzbekistan",
            touristPlaces: "Tourist places",
            regional: "Regions",
            map: "Map",
            copyright: "© 2026 UzTourism. All rights reserved.",
            regionsRow1: ["Bukhara", "Samarkand", "Khiva", "Urgench", "Nukus", "Termez", "Shakhrisabz"],
            regionsRow2: ["Kitob", "Karshi", "Jizzakh", "Andijan", "Fergana", "Namangan", "Tashkent"]
        }
    };

    const t = translations[lang] || translations.uz;

    const mainLinks = [
        { name: t.about, path: "/place_info" },
        { name: t.touristPlaces, path: "/single_city" },
        { name: t.regional, path: "/regional" },
        { name: t.map, path: "/map" }
    ]

    return (
        <footer className='w-full font-inter overflow-hidden'>
            
            {/* =========================================
                DESKTOP VERSION (Hidden on Mobile)
                Original dizayn saqlab qolindi
               ========================================= */}
            <div className='hidden md:flex w-full bg-[#1B1B1B] py-[80px] px-5 flex-col items-center'>
                {/* Logo */}
                <Link to="/" className='mb-10 hover:opacity-80 transition-opacity'>
                    <h1 className='font-inter font-bold text-[28px] text-white tracking-tight uppercase'>UzTourism</h1>
                </Link>

                {/* Regions Grid */}
                <div className="w-full max-w-[900px] flex flex-col gap-8 mb-12">
                    <div className='flex flex-wrap justify-center gap-x-12 gap-y-4'>
                        {t.regionsRow1.map((region) => (
                            <span key={region} className='font-inter font-medium text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
                                {region}
                            </span>
                        ))}
                    </div>
                    <div className='flex flex-wrap justify-center gap-x-12 gap-y-4'>
                        {t.regionsRow2.map((region) => (
                            <span key={region} className='font-inter font-medium text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
                                {region}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className='w-full max-w-[400px] h-[1px] bg-white/10 mb-8'></div>

                {/* Main Links */}
                <div className='w-full max-w-[600px] flex flex-wrap justify-center gap-10 mb-12'>
                    {mainLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path} 
                            className='font-inter font-medium text-[16px] text-white hover:text-[#2552A1] transition-colors whitespace-nowrap'
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
                            className='w-12 h-12 flex justify-center items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-[#1B1B1B] transition-all duration-300'
                        >
                            <social.icon size={22} weight="bold" />
                        </a>
                    ))}
                </div>

                {/* Copyright Divider */}
                <div className='w-full max-w-[400px] h-[1px] bg-white/10 mb-10'></div>

                <p className='font-inter font-light text-[14px] text-gray-500 text-center px-4'>
                    {t.copyright}
                </p>
            </div>


            {/* =========================================
                MOBILE VERSION (Visible ONLY on Mobile)
                Yangi telefon dizayni rasmdagidek
               ========================================= */}
            <div className='flex md:hidden w-full bg-[#151515] pt-12 pb-8 px-[8%] flex-col'>
                {/* Top Section: Title & Cities */}
                <div className="flex flex-col w-full">
                    <Link to="/" className='mb-8'>
                        <h2 className="text-[18px] font-bold text-white tracking-wide">UzTourism</h2>
                    </Link>
                    
                    <div className="flex w-full mb-8">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-[14px] flex-1 text-[13px] text-[#e0e0e0]">
                            {t.regionsRow1.map((region) => (
                                <span key={region} className="hover:text-white transition-colors cursor-pointer block">{region}</span>
                            ))}
                        </div>
                        
                        {/* Column 2 */}
                        <div className="flex flex-col gap-[14px] flex-1 text-[13px] text-[#e0e0e0]">
                            {t.regionsRow2.map((region) => (
                                <span key={region} className="hover:text-white transition-colors cursor-pointer block">{region}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#333333] mb-8"></div>

                {/* Quick Navigation Links */}
                <div className="flex flex-col gap-[14px] w-full text-[13px] text-[#e0e0e0] mb-8">
                    {mainLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="hover:text-white transition-colors block">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="w-full h-[1px] bg-[#333333] mb-8"></div>

                {/* Social Icons */}
                <div className="flex justify-center gap-[18px] w-full">
                    {[
                        { icon: InstagramLogo, link: '#' },
                        { icon: FacebookLogo, link: '#' },
                        { icon: YoutubeLogo, link: '#' }
                    ].map((social, idx) => (
                        <a
                            key={idx}
                            href={social.link}
                            className='w-[42px] h-[42px] flex justify-center items-center rounded-full border border-[#444] text-[#e0e0e0] hover:border-white hover:text-white transition-all duration-300'
                        >
                            <social.icon size={18} weight="regular" />
                        </a>
                    ))}
                </div>

                {/* Footer Bottom / Copyright */}
                <div className="w-full h-[1px] bg-[#333333] mt-8 mb-6"></div>
                
                <div className="w-full flex justify-center text-center">
                    <p className="text-[#6c6c6c] text-[11px] tracking-wide">
                        {t.copyright}
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer