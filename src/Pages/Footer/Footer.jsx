import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InstagramLogo, FacebookLogo, YoutubeLogo, TelegramLogo } from '@phosphor-icons/react'
import nsd_logo from './nsd_logo.png'
import { regionService, socialMediaService } from '../../Services/api'

const Footer = () => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
    const [regions, setRegions] = useState([]);
    const [socials, setSocials] = useState(null);

    useEffect(() => {
        const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
        window.addEventListener('langChange', handleLangChange);
        return () => window.removeEventListener('langChange', handleLangChange);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [regionsData, socialData] = await Promise.all([
                    regionService.getRegions(),
                    socialMediaService.getSocialMedia()
                ]);
                setRegions(Array.isArray(regionsData) ? regionsData : (regionsData?.results || []));
                setSocials(socialData);
            } catch (error) {
                console.error("Footer fetch error:", error);
            }
        };
        fetchData();
    }, []);

    const translations = {
        uz: {
            about: "O'zbekiston haqida",
            touristPlaces: "Turistik joylar",
            regional: "Viloyatlar",
            map: "Xarita",
            copyright: "© 2026 UzTourism. Barcha huquqlar himoyalangan."
        },
        ru: {
            about: "Об Узбекистане",
            touristPlaces: "Туристические места",
            regional: "Регионы",
            map: "Карта",
            copyright: "© 2026 UzTourism. Все права защищены."
        },
        en: {
            about: "About Uzbekistan",
            touristPlaces: "Tourist places",
            regional: "Regions",
            map: "Map",
            copyright: "© 2026 UzTourism. All rights reserved."
        }
    };

    const t = translations[lang] || translations.uz;

    const mainLinks = [
        { name: t.about, path: "/place_info" },
        { name: t.touristPlaces, path: "/tourist_places" },
        { name: t.regional, path: "/regional" },
        { name: t.map, path: "/map" }
    ]

    const getTranslated = (item) => {
        if (!item) return '';
        if (typeof item === 'object') {
            return item[lang] || item.uz || '';
        }
        return item;
    };

    // Divide regions into two columns
    const half = Math.ceil(regions.length / 2);
    const regionsCol1 = regions.slice(0, half);
    const regionsCol2 = regions.slice(half);

    const socialLinks = [
        { id: 'instagram', icon: InstagramLogo, url: socials?.instagram },
        { id: 'facebook', icon: FacebookLogo, url: socials?.facebook },
        { id: 'youtube', icon: YoutubeLogo, url: socials?.youtube },
        { id: 'telegram', icon: TelegramLogo, url: socials?.telegram }
    ].filter(item => item.url);

    return (
        <footer className='w-full font-inter overflow-hidden'>

            <div className='hidden md:flex w-full bg-[#1B1B1B] py-[80px] px-5 flex-col items-center'>
                <Link to="/" className='mb-10 hover:opacity-80 transition-opacity'>
                    <h1 className='font-inter font-bold text-[28px] text-white tracking-tight uppercase'>GeoTour</h1>
                </Link>

                <div className="w-full max-w-[900px] flex flex-col gap-8 mb-12">
                    <div className='flex flex-wrap justify-center gap-x-12 gap-y-4'>
                        {regionsCol1.map((region) => (
                            <Link to={`/regional/${region.slug || ''}`} key={region.id || region.slug} className='font-inter font-medium text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
                                {getTranslated(region.name)}
                            </Link>
                        ))}
                    </div>
                    <div className='flex flex-wrap justify-center gap-x-12 gap-y-4'>
                        {regionsCol2.map((region) => (
                            <Link to={`/regional/${region.slug || ''}`} key={region.id || region.slug} className='font-inter font-medium text-[16px] text-gray-400 hover:text-white cursor-pointer transition-colors'>
                                {getTranslated(region.name)}
                            </Link>
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
                <div className='flex flex-col justify-center items-center my-[20px]'>
                    <div className='flex gap-4 mb-12'>
                        {socialLinks.map((social, idx) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className='w-12 h-12 flex justify-center items-center rounded-full border border-white/20 text-white hover:bg-white hover:text-[#1B1B1B] transition-all duration-300'
                            >
                                <social.icon size={22} weight="bold" />
                            </a>
                        ))}
                    </div>
                    <a
                        href="https://t.me/nsd_corporation"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center text-white font-[600] text-[13px] cursor-pointer"
                    >
                        <p className="pl-[12px] md:pr-[13px] font-oregano text-[12px] font-[400]">
                            Powered by
                        </p>
                        <img
                            src={nsd_logo}
                            className="w-[250px] h-auto"
                            alt="NSD Corporation"
                        />
                    </a>
                </div>

                {/* Copyright Divider */}
                <div className='w-full max-w-[400px] h-[1px] bg-white/10 mb-10'></div>

                <p className='font-inter font-light text-[14px] text-gray-500 text-center px-4'>
                    {t.copyright}
                </p>
            </div>

            {/* =========================================
                MOBILE VERSION (Visible ONLY on Mobile)
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
                            {regionsCol1.map((region) => (
                                <Link to={`/regional/${region.slug || ''}`} key={region.id || region.slug} className="hover:text-white transition-colors cursor-pointer block">
                                    {getTranslated(region.name)}
                                </Link>
                            ))}
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-[14px] flex-1 text-[13px] text-[#e0e0e0]">
                            {regionsCol2.map((region) => (
                                <Link to={`/regional/${region.slug || ''}`} key={region.id || region.slug} className="hover:text-white transition-colors cursor-pointer block">
                                    {getTranslated(region.name)}
                                </Link>
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
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className='w-[42px] h-[42px] flex justify-center items-center rounded-full border border-[#444] text-[#e0e0e0] hover:border-white hover:text-white transition-all duration-300'
                        >
                            <social.icon size={18} weight="regular" />
                        </a>
                    ))}
                </div>

                <div className='flex w-full justify-center mt-8'>
                    <a
                        href="https://t.me/nsd_corporation"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-col items-center text-white font-[600] text-[13px] cursor-pointer"
                    >
                        <p className="pl-[12px] md:pr-[13px] font-oregano text-[12px] font-[400]">
                            Powered by
                        </p>
                        <img
                            src={nsd_logo}
                            className="w-[200px] h-auto"
                            alt="NSD Corporation"
                        />
                    </a>
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