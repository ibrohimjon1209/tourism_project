import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { IoChevronForwardOutline, IoPauseSharp, IoPlaySharp } from "react-icons/io5"
import { MapTrifold, Star } from '@phosphor-icons/react'
import { homeService } from '../../Services/api'

import image_1 from './Images/image_1.jpeg'

const Home = ({ userCoords }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
    const [homeData, setHomeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
        window.addEventListener('langChange', handleLangChange);
        return () => window.removeEventListener('langChange', handleLangChange);
    }, []);

    const [heroIndex, setHeroIndex] = useState(0);
    const [isHeroPlaying, setIsHeroPlaying] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    const [popIndex, setPopIndex] = useState(0);
    const [nearIndex, setNearIndex] = useState(0);
    const [recIndex, setRecIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // API orqali Home datani olish
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

    // Asosiy datalar
    const heroItems = homeData?.popular_tourist_places?.slice(0, 6) || [];
    const aboutImages = homeData?.about_uzbekistan?.images?.map(i => i.image) || [];
    const popularItems = homeData?.popular_tourist_places || [];
    const nearbyItems = homeData?.nearby_tourist_objects || homeData?.pilgrimage_places || [];
    const recommendedItems = homeData?.recommended_routes || [];
    const bannerData = homeData?.banner || null;

    // Info Carousel handlers
    const handleNext = () => setActiveIndex((prev) => (prev + 1) % (aboutImages.length || 1));
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + (aboutImages.length || 1)) % (aboutImages.length || 1));

    // Hero Carousel Handlers
    const handleHeroNext = () => setHeroIndex((prev) => (prev + 1) % (heroItems.length || 1));
    const handleHeroPrev = () => setHeroIndex((prev) => (prev - 1 + (heroItems.length || 1)) % (heroItems.length || 1));
    const toggleHeroPlay = () => setIsHeroPlaying(!isHeroPlaying);

    useEffect(() => {
        let heroTimer;
        if (isHeroPlaying && heroItems.length > 0) {
            heroTimer = setInterval(() => {
                setHeroIndex(prev => (prev + 1) % heroItems.length);
            }, 4000);
        }
        return () => clearInterval(heroTimer);
    }, [isHeroPlaying, heroItems.length]);

    // Auto-play effects for carousels
    useEffect(() => {
        const popMax = isMobile ? popularItems.length : Math.max(0, popularItems.length - 3);
        const nearMax = isMobile ? nearbyItems.length : Math.max(0, nearbyItems.length - 3);
        const recMax = isMobile ? recommendedItems.length : Math.max(0, recommendedItems.length - 3);

        const timer1 = setInterval(() => {
            if (popMax > 0) setPopIndex(prev => (prev + 1) % popMax);
        }, 3000);

        const timer2 = setInterval(() => {
            if (nearMax > 0) setNearIndex(prev => (prev + 1) % nearMax);
        }, 3500);

        const timer3 = setInterval(() => {
            if (recMax > 0) setRecIndex(prev => (prev + 1) % recMax);
        }, 4000);

        return () => {
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
        };
    }, [isMobile, popularItems.length, nearbyItems.length, recommendedItems.length]);

    const handlePopNext = () => setPopIndex(p => Math.min(isMobile ? popularItems.length - 1 : Math.max(0, popularItems.length - 4), p + 1));
    const handlePopPrev = () => setPopIndex(p => Math.max(0, p - 1));

    const handleNearNext = () => setNearIndex(p => Math.min(isMobile ? nearbyItems.length - 1 : Math.max(0, nearbyItems.length - 4), p + 1));
    const handleNearPrev = () => setNearIndex(p => Math.max(0, p - 1));

    const handleRecNext = () => setRecIndex(p => Math.min(isMobile ? recommendedItems.length - 1 : Math.max(0, recommendedItems.length - 4), p + 1));
    const handleRecPrev = () => setRecIndex(p => Math.max(0, p - 1));

    const translations = {
        uz: {
            heroSupTitle: "Sharqona",
            details: "Batafsil",
            popularTitle: "Mashhur turistik joylar",
            popularDesc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
            all: "Barchasi",
            nearbyTitle: "Yaqindagi turistik obyektlar",
            nearbyBtn: "Yaqin joylar",
            distance: "km uzoqlikda",
            recommendedTitle: "Tavsiya etilgan sayohat yo‘nalishlari",
        },
        ru: {
            heroSupTitle: "Восточные",
            details: "Подробнее",
            popularTitle: "Популярные туристические места",
            popularDesc: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок.",
            all: "Все",
            nearbyTitle: "Ближайшие туристические объекты",
            nearbyBtn: "Ближайшие места",
            distance: "км от вас",
            recommendedTitle: "Рекомендуемые маршруты",
        },
        en: {
            heroSupTitle: "Oriental",
            details: "See Details",
            popularTitle: "Popular tourist places",
            popularDesc: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales.",
            all: "View All",
            nearbyTitle: "Nearby tourist attractions",
            nearbyBtn: "Nearby places",
            distance: "km away",
            recommendedTitle: "Recommended travel routes",
        }
    };

    const t = translations[lang] || translations.uz;

    // API dan kelgan multilanguage maydonni o'qish funksiyasi
    const getTranslated = (item, field = null) => {
        if (!item) return '';
        if (field && item[field]) {
            if (typeof item[field] === 'string') return item[field];
            return item[field][lang] || item[field].uz || '';
        }
        if (typeof item === 'object') {
            return item[lang] || item.uz || '';
        }
        return item;
    };

    if (isLoading) {
        return (
            <div className='w-full h-screen flex items-center justify-center bg-white'>
                <div className='w-12 h-12 border-4 border-[#1b5093] border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    if (!homeData || heroItems.length === 0) {
        return (
            <div className='w-full h-screen flex flex-col items-center justify-center bg-white text-gray-800'>
                <h1 className='text-2xl font-bold'>API ma'lumotlar topilmadi</h1>
                <p>Iltimos, server ishlayotganligini tekshiring.</p>
            </div>
        )
    }

    const currentHero = heroItems[heroIndex];

    return (
        <div className='w-full font-sans select-none bg-white overflow-x-hidden'>

            {/* ----------------- HERO SECTION ----------------- */}
            <div className=' relative w-full h-[100svh] md:h-[800px] overflow-hidden'>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                        key={heroIndex}
                        src={currentHero?.hero_image || currentHero?.cover_image}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.2 } }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className='absolute inset-0 w-full h-full object-cover z-0'
                        alt="Hero Banner"
                    />
                </AnimatePresence>

                <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 lg:via-black/20 to-transparent z-10'></div>

                <div className='absolute z-20 left-[5%] md:left-[8%] top-[45%] -translate-y-1/2 flex flex-col items-start w-[90%] md:w-auto '>
                    <div className='flex items-center gap-3 md:gap-5 mb-5'>
                        <button
                            onClick={toggleHeroPlay}
                            className='w-[36px] md:w-[42px] h-[36px] md:h-[42px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/50 transition-all duration-300 shadow-lg cursor-pointer'
                        >
                            {isHeroPlaying ? (
                                <IoPauseSharp className='text-white text-[13px] md:text-[15px]' />
                            ) : (
                                <IoPlaySharp className='text-white text-[13px] md:text-[15px] translate-x-[1px]' />
                            )}
                        </button>

                        <div className='w-[100px] md:w-[160px] h-[3px] md:h-[4px] bg-white/30 rounded-full relative overflow-hidden flex items-center cursor-pointer'>
                            <motion.div
                                className='absolute left-0 h-full bg-white rounded-full'
                                animate={{ width: `${((heroIndex + 1) / heroItems.length) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                            <motion.div
                                className='absolute h-3 w-3 md:w-4 md:h-4 bg-white rounded-full shadow-md'
                                animate={{ left: `calc(${((heroIndex + 1) / heroItems.length) * 100}% - 6px)` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    <motion.div
                        key={`title-${heroIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className='flex flex-col'
                    >
                        <h2 className='text-white text-[32px] md:text-[52px] font-semibold mb-1 md:mb-[-5px] drop-shadow-xl tracking-wide line-clamp-1 max-w-[800px]'>
                            {getTranslated(currentHero?.region, 'name') || t.heroSupTitle}
                        </h2>
                        <div className='flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-10 mt-1 md:mt-2'>
                            <h1 className='text-white text-[50px] sm:text-[70px] md:text-[90px] h-[110px] font-bold drop-shadow-2xl tracking-tighter leading-[1.05] md:leading-[1.1] line-clamp-2 max-w-[800px]'>
                                {getTranslated(currentHero?.name)}
                            </h1>
                            <Link to={`/tourist_place/${currentHero?.slug}`} className='w-[50px] mb-2 md:mb-6 px-6 md:px-8 py-2.5 md:py-3.5 rounded-full bg-[#275b9f]/90 backdrop-blur-md w-max text-white font-medium text-[14px] md:text-[17px] flex items-center gap-2 md:gap-3 hover:bg-[#1f4a82] transform hover:scale-105 transition-all duration-300 shadow-xl border border-white/10'>
                                {t.details} <IoChevronForwardOutline className='text-[16px] md:text-lg' />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className='absolute z-50 bottom-8 md:bottom-14 left-[5%] md:left-[8%] flex items-center gap-4 md:gap-6'>
                    <button
                        onClick={handleHeroPrev}
                        className='w-[45px] md:w-[54px] h-[45px] md:h-[54px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer group'
                    >
                        <FiChevronLeft className='text-xl md:text-2xl group-hover:-translate-x-0.5 transition-transform' />
                    </button>
                    <AnimatePresence mode='wait'>
                        <motion.span
                            key={heroIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className='text-white text-[15px] md:text-[17px] font-medium tracking-[0.2em] drop-shadow-md select-none w-[3ch] text-center'
                        >
                            {heroIndex + 1}/{heroItems.length}
                        </motion.span>
                    </AnimatePresence>
                    <button
                        onClick={handleHeroNext}
                        className='w-[45px] md:w-[54px] h-[45px] md:h-[54px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer group'
                    >
                        <FiChevronRight className='text-xl md:text-2xl group-hover:translate-x-0.5 transition-transform' />
                    </button>
                </div>

                <div className=' absolute z-20 bottom-10 md:bottom-16 right-[5%] md:right-[8%]'>
                    <AnimatePresence mode='wait'>
                        <motion.p
                            key={heroIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className='sm:w-[100vw] w-[50vw]  text-white/90 text-[13px] sm:text-[15px] md:text-[18px] font-medium drop-shadow-lg tracking-wide text-right line-clamp-2 hover:text-white transition-colors cursor-default'
                        >
                            {getTranslated(currentHero?.short_description)}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className='absolute z-20 right-[4%] md:right-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-5'>
                    <a href={homeData?.social_media?.instagram || "#"} className='w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 hover:-translate-y-1 transition-all duration-300 shadow-lg'>
                        <FaInstagram className='text-[16px] md:text-[20px]' />
                    </a>
                    <a href={homeData?.social_media?.facebook || "#"} className='w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 hover:-translate-y-1 transition-all duration-300 shadow-lg'>
                        <FaFacebookF className='text-[15px] md:text-[18px]' />
                    </a>
                    <a href={homeData?.social_media?.youtube || "#"} className='w-[40px] md:w-[48px] h-[40px] md:h-[48px] rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/60 hover:-translate-y-1 transition-all duration-300 shadow-lg'>
                        <FaYoutube className='text-[16px] md:text-[20px]' />
                    </a>
                </div>
            </div>

            {/* ----------------- O'ZBEKISTON HAQIDA SECTION ----------------- */}
            <div className="w-full relative mt-16 md:mt-20 mb-12 lg:mb-16 h-auto lg:h-[500px] flex flex-col lg:flex-row items-center bg-white px-[5%] md:px-[8%]">
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block overflow-hidden">
                    {aboutImages.length > 0 && aboutImages.map((img, index) => {
                        const diff = (index - activeIndex + aboutImages.length) % aboutImages.length;
                        let className = "absolute top-[10%] object-cover pointer-events-none z-0 opacity-0 scale-95 left-[48%] w-[26%] h-[70%] rounded-[24px] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]";

                        if (diff === 0) {
                            className = "absolute left-[48%] top-[5%] w-[26%] h-[90%] object-cover rounded-[30px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-20 opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto transform hover:scale-[1.02] cursor-pointer bg-white";
                        } else if (diff === aboutImages.length - 1) {
                            className = "absolute left-[28%] top-[15%] w-[26%] h-[70%] object-cover rounded-[24px] z-10 opacity-40 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none";
                        } else if (diff === 1) {
                            className = "absolute left-[68%] top-[15%] w-[26%] h-[70%] object-cover rounded-[24px] z-10 opacity-40 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none";
                        }

                        return (
                            <img key={index} src={img} className={className} alt="Carousel card view" />
                        );
                    })}

                    {aboutImages.length > 0 && (
                        <div className="absolute right-[8%] bottom-[20%] z-30 flex gap-4 pointer-events-auto">
                            <button onClick={handlePrev} className=" w-[45px] h-[45px] rounded-full border border-gray-500 bg-transparent flex items-center justify-center text-gray-700 hover:bg-black/5 hover:border-gray-700 transition-all cursor-pointer shadow-sm">
                                <FiChevronLeft className="text-xl" />
                            </button>
                            <button onClick={handleNext} className=" w-[45px] h-[45px] rounded-full border border-gray-500 bg-transparent flex items-center justify-center text-gray-700 hover:bg-black/5 hover:border-gray-700 transition-all cursor-pointer shadow-sm">
                                <FiChevronRight className="text-xl" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative z-30 w-full lg:w-[45%] flex flex-col justify-center pointer-events-auto py-4 lg:py-0">
                    <h2 className="text-[#2c2c2c] text-[32px] md:text-[46px] font-bold mb-4 md:mb-7 tracking-tight leading-tight">
                        {getTranslated(homeData?.about_uzbekistan?.title)}
                    </h2>
                    <Link to="/place_info" className="mb-6 px-[24px] md:px-[30px] py-[10px] md:py-[12px] w-max rounded-full bg-[#1b5093] text-white font-medium text-[14px] md:text-[15px] flex items-center gap-2 hover:bg-[#143e75] transition-colors shadow-[0_4px_15px_rgba(27,80,147,0.4)] border-none">
                        {t.details} <IoChevronForwardOutline className="text-[16px] md:text-[17px]" />
                    </Link>
                    <p className="text-[#3b3b3b]  text-[14px] md:text-[15.5px] leading-[1.7] md:leading-[1.8] font-medium text-justify">
                        {getTranslated(homeData?.about_uzbekistan?.description)}
                    </p>
                </div>

                <div className="w-full lg:hidden mt-8 relative z-30 flex flex-col items-center">
                    {aboutImages.length > 0 && <img src={aboutImages[activeIndex]} className="w-full sm:w-[90%] h-[260px] sm:h-[350px] object- rounded-[24px] mb-6 shadow-xl transition-all duration-300" alt="mobile centered view" />}
                    <div className="flex justify-center gap-5">
                        <button onClick={handlePrev} className="w-[45px] h-[45px] rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-100 shadow-sm transition-colors">
                            <FiChevronLeft className='text-lg' />
                        </button>
                        <button onClick={handleNext} className="w-[45px] h-[45px] rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:bg-gray-100 shadow-sm transition-colors">
                            <FiChevronRight className='text-lg' />
                        </button>
                    </div>
                </div>
            </div>

            {/* ----------------- MASHHUR TURISTIK JOYLAR ----------------- */}
            <div className='w-full pt-10 md:pt-16 pb-10 md:pb-12 overflow-hidden bg-white'>
                <div className='flex flex-col lg:flex-row justify-between lg:items-end px-[5%] md:px-[8%] gap-4 md:gap-6 mb-6 md:mb-10'>
                    <div className='flex flex-col gap-2 md:gap-4'>
                        <h2 className='text-[#303030] text-[28px] md:text-[40px] font-bold tracking-tight'>
                            {t.popularTitle}
                        </h2>
                        <p className='text-[#9c9c9c] text-[14px] md:text-[15.5px] font-medium leading-[1.6] max-w-[650px]'>
                            {t.popularDesc}
                        </p>
                    </div>

                    <div className='hidden lg:flex flex-col lg:items-end gap-6'>
                        <Link to="/tourist_places" className="px-8 py-3 rounded-full bg-[#1b5093] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#143e75] transition-colors shadow-md">
                            {t.all} <IoChevronForwardOutline className="text-[16px]" />
                        </Link>
                        <div className='flex gap-2.5 items-center'>
                            {[...Array(Math.max(0, popularItems.length - 3))].map((_, idx) => (
                                <div key={idx} onClick={() => setPopIndex(idx)} className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${idx === popIndex ? 'bg-[#1b5093]' : 'bg-[#e0e0e0] hover:bg-[#ccc]'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative w-full ml-[5%] md:mx-[8%] md:w-auto pr-[5%] md:pr-0 mt-2 md:mt-4">
                    <button
                        onClick={handlePopPrev}
                        className={`absolute left-[5px] md:left-[2%] top-1/2 -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b5093] shadow-md transition-all hover:bg-white border border-gray-200 ${popIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronLeft className="text-[20px] md:text-xl" />
                    </button>
                    <button
                        onClick={handlePopNext}
                        className={`absolute right-[6%] md:right-[2%] top-1/2 -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-[#1b5093] flex items-center justify-center text-white shadow-lg transition-all hover:bg-[#143e75] ${(popIndex >= (isMobile ? popularItems.length - 1 : Math.max(0, popularItems.length - 4))) ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronRight className="text-[20px] md:text-xl" />
                    </button>

                    <div className="overflow-hidden w-full relative py-2 md:py-4 my-0 md:-my-4">
                        <div
                            className="flex gap-[16px] md:gap-[30px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(calc(-${popIndex} * ${isMobile ? 'calc(80vw + 16px)' : 'calc(25% + 7.5px)'}))` }}

                        >
                            {popularItems.map(place => (
                                <Link
                                    to={`/tourist_place/${place.slug}`}
                                    key={place.id}
                                    className="min-w-[85vw] w-[85vw] md:min-w-[calc((100%-90px)/4)] md:w-[calc((100%-90px)/4)] h-[360px] md:h-[400px] rounded-[24px] md:rounded-[30px] overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                                >
                                    <img
                                        src={place.cover_image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        alt={getTranslated(place.name)}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151b26]/95 via-[#151b26]/40 lg:via-[#151b26]/20 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-6 md:bottom-6 left-5 md:left-6 right-5 md:right-6 flex flex-col gap-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                                        <h3 className="text-white text-[18px] md:text-lg font-bold tracking-wide drop-shadow-md leading-tight line-clamp-2">{getTranslated(place.name)}</h3>
                                        <p className="text-white/85 text-[13px] md:text-[13px] leading-[1.4] line-clamp-2 drop-shadow-sm">{getTranslated(place.short_description)}</p>
                                    </div>
                                    {place.average_rating && (
                                        <div className='absolute top-4 left-4 z-20 flex flex-col gap-2'>
                                            <div className='bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1 border border-white/10'>
                                                <Star size={14} weight="fill" className='text-yellow-400' />
                                                {place.average_rating}
                                            </div>
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex lg:hidden flex-col items-center gap-6 mt-8 w-full px-[5%]'>
                    <div className='flex gap-2 items-center'>
                        {[...Array(popularItems.length)].map((_, idx) => (
                            <div key={idx} onClick={() => setPopIndex(idx)} className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${idx === popIndex ? 'bg-[#1b5093] w-3 h-3' : 'bg-[#e0e0e0] hover:bg-[#ccc]'}`}></div>
                        ))}
                    </div>
                    <Link to="/tourist_places" className="px-8 py-3 rounded-full bg-[#1b5093] w-max text-white font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-[#143e75] transition-colors shadow-md">
                        {t.all} <IoChevronForwardOutline className="text-[15px]" />
                    </Link>
                </div>
            </div>

            {/* ----------------- YAQINDAGI TURISTIK OBYEKTLAR ----------------- */}
            <div className='w-full pt-8 md:pt-10 pb-16 md:pb-24 overflow-hidden bg-white'>
                <div className='flex flex-col lg:flex-row justify-between lg:items-end px-[5%] md:px-[8%] gap-4 md:gap-6 mb-6 md:mb-10'>
                    <div className='flex flex-col gap-2 md:gap-4'>
                        <h2 className='text-[#303030] text-[28px] md:text-[40px] font-bold tracking-tight leading-tight'>
                            {t.nearbyTitle}
                        </h2>
                        <p className='text-[#9c9c9c] text-[14px] md:text-[15.5px] font-medium leading-[1.6] max-w-[650px]'>
                            {t.popularDesc}
                        </p>
                    </div>
                    <div className='hidden lg:flex'>
                        <Link to="/nearby_places" className="px-8 py-3 rounded-full bg-[#1b5093] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#143e75] transition-colors shadow-md">
                            {t.nearbyBtn} <IoChevronForwardOutline className="text-[16px]" />
                        </Link>
                    </div>
                </div>

                <div className="relative w-full ml-[5%] md:mx-[8%] md:w-auto pr-[5%] md:pr-0 mt-2 md:mt-4">
                    <button
                        onClick={handleNearPrev}
                        className={`absolute left-[5px] md:left-[2%] top-1/2 -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b5093] shadow-md transition-all hover:bg-white border border-gray-200 ${nearIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronLeft className="text-[20px] md:text-xl" />
                    </button>
                    <button
                        onClick={handleNearNext}
                        className={`absolute right-[6%] md:right-[2%] top-1/2 -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-[#1b5093] flex items-center justify-center text-white shadow-lg transition-all hover:bg-[#143e75] ${(nearIndex >= (isMobile ? nearbyItems.length - 1 : Math.max(0, nearbyItems.length - 4))) ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronRight className="text-[20px] md:text-xl" />
                    </button>

                    <div className="overflow-hidden w-full relative py-2 md:py-4 my-0 md:-my-4">
                        <div
                            className="flex gap-[16px] md:gap-[30px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(calc(-${nearIndex} * ${isMobile ? 'calc(80vw + 16px)' : 'calc(25% + 7.5px)'}))` }}
                        >
                            {nearbyItems.map(place => (
                                <Link
                                    to={`/nearby_place/${place.slug}`}
                                    key={place.id}
                                    className="min-w-[80vw] w-[80vw] md:min-w-[calc((100%-90px)/4)] md:w-[calc((100%-90px)/4)] h-[320px] md:h-[380px] rounded-[24px] md:rounded-[30px] overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0"
                                >
                                    <img
                                        src={place.cover_image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        alt={getTranslated(place.name)}
                                    />

                                    <div className='absolute top-4 left-4 z-20 flex flex-col gap-2'>
                                        {place.distance_km && (
                                            <div className='bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#1b5093] flex items-center gap-1 shadow-sm'>
                                                <MapTrifold size={14} weight="bold" />
                                                {place.distance_km} {t.distance}
                                            </div>
                                        )}
                                        {place.average_rating && (
                                            <div className='bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1 border border-white/10'>
                                                <Star size={14} weight="fill" className='text-yellow-400' />
                                                {place.average_rating}
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#151b26]/90 via-[#151b26]/30 lg:via-[#151b26]/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-5 md:bottom-6 left-5 md:left-6 right-5 md:right-6 flex flex-col gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-white text-[17px] md:text-lg font-bold tracking-wide drop-shadow-md line-clamp-2">{getTranslated(place.name)}</h3>
                                        <p className="text-white/80 text-[12px] md:text-[13px] leading-snug line-clamp-2 drop-shadow-sm">
                                            {getTranslated(place.short_description)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex lg:hidden justify-center mt-6'>
                    <Link to="/nearby_places" className="px-8 py-3 rounded-full bg-[#1b5093] text-white font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-[#143e75] transition-colors shadow-md">
                        {t.nearbyBtn} <IoChevronForwardOutline className="text-[16px]" />
                    </Link>
                </div>
            </div>

            {/* ----------------- BANNER: O'ZBEKISTONNI QAYTADAN KASHF ETING ----------------- */}
            {bannerData && (
                <div className='relative w-full min-h-[380px] md:min-h-[414px] h-auto py-12 md:py-0 mt-8 md:mt-[120px] overflow-hidden flex items-center justify-center'>
                    <img src={bannerData.featured_image || image_1} className='absolute inset-0 w-full h-full object-cover z-0' alt="banner" />
                    <div className='absolute inset-0 bg-black/40 md:bg-black/40 z-10'></div>

                    <div className='relative z-20 flex items-center justify-center flex-col px-[5%] mt-4 md:mt-0 w-full'>
                        <h1 className='w-full max-w-[762px] text-center font-inter font-[700] text-[32px] sm:text-[40px] md:text-[56px] leading-[1.2] md:leading-[100%] text-white drop-shadow-lg tracking-tight'>
                            {getTranslated(bannerData.title)}
                        </h1>
                        <p className='mt-3 md:mt-[10px] font-inter font-[500] text-[15px] md:text-[20px] leading-[1.4] md:leading-[140%] text-[#e2e2e2] md:text-[#d2d2d2] text-center max-w-[90%] md:max-w-none drop-shadow-md'>
                            {getTranslated(bannerData.subtitle)}
                        </p>

                        <div className='flex flex-wrap items-center justify-center gap-4'>
                            {bannerData.cta_primary && (
                                <Link to={'/tourist_places'} className='mt-6 md:mt-[24px] px-8 py-3.5 rounded-full bg-[#1b5093] backdrop-blur-md text-white font-medium text-[15px] md:text-[17px] flex items-center gap-2 md:gap-3 hover:bg-[#143e75] hover:scale-105 transition-all duration-300 shadow-xl border border-white/10'>
                                    {getTranslated(bannerData.cta_primary.label)} <IoChevronForwardOutline className='text-[16px] md:text-lg' />
                                </Link>
                            )}
                            {bannerData.cta_secondary && (
                                <Link to={bannerData.cta_secondary.url} className='mt-6 md:mt-[24px] px-8 py-3.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium text-[15px] md:text-[17px] flex items-center gap-2 md:gap-3 hover:bg-white/40 hover:scale-105 transition-all duration-300 shadow-xl border border-white/30'>
                                    {getTranslated(bannerData.cta_secondary.label)}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ----------------- TAVSIYA ETILGAN SAYOHAT YO'NALISHLARI ----------------- */}
            <div className='w-full pt-16 md:pt-[120px] pb-10 overflow-hidden bg-white'>
                <div className='flex flex-col lg:flex-row justify-between lg:items-end px-[5%] md:px-[8%] gap-4 md:gap-6 mb-6 md:mb-10'>
                    <div className='flex flex-col gap-2 md:gap-4'>
                        <h2 className='text-[#303030] text-[28px] md:text-[40px] font-bold tracking-tight'>
                            {t.recommendedTitle}
                        </h2>
                        <p className='text-[#9c9c9c] text-[14px] md:text-[15.5px] font-medium leading-[1.5] max-w-[650px]'>
                            {t.popularDesc}
                        </p>
                    </div>

                    <div className='hidden lg:flex flex-col lg:items-end gap-6'>
                        <div className='flex gap-2.5 items-center'>
                            {[...Array(Math.max(0, recommendedItems.length - 3))].map((_, idx) => (
                                <div key={idx} onClick={() => setRecIndex(idx)} className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${idx === recIndex ? 'bg-[#1b5093]' : 'bg-[#e0e0e0] hover:bg-[#ccc]'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative w-full ml-[5%] md:mx-[8%] md:w-auto pr-[5%] md:pr-0 mt-2 md:mt-4">
                    <button
                        onClick={handleRecPrev}
                        className={`absolute left-[5px] md:left-[2%] top-[100px] md:top-[120px] -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1b5093] shadow-md transition-all hover:bg-white border border-gray-200 ${recIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronLeft className="text-[20px] md:text-xl" />
                    </button>
                    <button
                        onClick={handleRecNext}
                        className={`absolute right-[6%] md:right-[2%] top-[100px] md:top-[120px] -translate-y-1/2 z-20 w-[42px] md:w-[45px] h-[42px] md:h-[45px] rounded-full bg-[#1b5093] flex items-center justify-center text-white shadow-lg transition-all hover:bg-[#143e75] ${(recIndex >= (isMobile ? recommendedItems.length - 1 : Math.max(0, recommendedItems.length - 4))) ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-105'}`}
                    >
                        <FiChevronRight className="text-[20px] md:text-xl" />
                    </button>

                    <div className="overflow-hidden w-full relative py-2 md:py-4 my-0 md:-my-4">
                        <div
                            className="flex gap-[16px] md:gap-[30px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(calc(-${recIndex} * ${isMobile ? 'calc(80vw + 16px)' : 'calc(25% + 7.5px)'}))` }}
                        >
                            {recommendedItems.map(route => {
                                const mainImg = route?.destinations?.[0]?.cover_image || "";
                                return (
                                    <div
                                        key={route.id}
                                        className="min-w-[80vw] w-[80vw] md:min-w-[calc((100%-90px)/4)] md:w-[calc((100%-90px)/4)] flex flex-col group cursor-pointer transition-shadow duration-300 flex-shrink-0"
                                    >
                                        <Link to={`/tour_direction`}>
                                            <div className="w-full h-[220px] md:h-[240px] rounded-[24px] md:rounded-[30px] overflow-hidden relative shadow-sm hover:shadow-lg transition-shadow bg-gray-100">
                                                {mainImg && (
                                                    <img
                                                        src={mainImg}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                                        alt={getTranslated(route.title)}
                                                    />
                                                )}
                                            </div>
                                            <div className='flex flex-col mt-[16px] md:mt-[20px] px-1'>
                                                <h1 className='font-inter font-[700] text-[18px] md:text-[20px] text-[#303030] leading-tight mb-1 md:mb-2 line-clamp-1 hover:text-[#235094] transition-colors'>
                                                    {getTranslated(route.title)}
                                                </h1>
                                                <h1 className='underline font-inter font-[600] text-[15px] md:text-[16px] text-[#235094] hover:text-[#183a6b] transition-colors'>
                                                    {t.details}
                                                </h1>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className='flex lg:hidden flex-col items-center gap-6 mt-6 w-full'>
                    <div className='flex gap-2 items-center'>
                        {[...Array(recommendedItems.length)].map((_, idx) => (
                            <div key={idx} onClick={() => setRecIndex(idx)} className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${idx === recIndex ? 'bg-[#1b5093] w-3 h-3' : 'bg-[#e0e0e0] hover:bg-[#ccc]'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;
