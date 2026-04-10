import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight, PlayCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { aboutService, placesService, cultureService } from '../../Services/api';

const Place_info = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');
  const [aboutData, setAboutData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [aboutRes, placesRes, cultureRes] = await Promise.all([
          aboutService.getAboutData(),
          placesService.getPlaces(),
          cultureService.getCultures()
        ]);
        setAboutData(aboutRes?.about_uzbekistan || null);
        const placesArr = Array.isArray(placesRes) ? placesRes : (placesRes?.results || []);
        setPlaces(placesArr);
        const cultureArr = Array.isArray(cultureRes) ? cultureRes : (cultureRes?.results || []);
        setCultures(cultureArr);
      } catch (error) {
        console.error("Place_info fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      about: "O'zbekiston turizm salohiyati",
      heritageTitle: "Tarixiy me'roslar",
      cultureTitle: "Madaniyat",
      details: "Batafsil"
    },
    ru: {
      home: "Главная",
      about: "Туристический потенциал Узбекистана",
      heritageTitle: "Историческое наследие",
      cultureTitle: "Культура",
      details: "Подробнее"
    },
    en: {
      home: "Home page",
      about: "Uzbekistan's tourism potential",
      heritageTitle: "Historical heritage",
      cultureTitle: "Culture",
      details: "See details"
    }
  };

  const t = translations[lang] || translations.uz;

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

  const getYoutubeId = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : url; // If match fails, fallback to url in case it IS the ID
  };

  const videoId = aboutData?.video_url ? getYoutubeId(aboutData.video_url) : 'aqz-KE-bpKQ';

  const defaultVideos = [
    {
      id: 1,
      youtubeId: "aqz-KE-bpKQ",
      title_uz: "O'zbekiston haqida",
      title_ru: "Об Узбекистане",
      title_en: "About Uzbekistan",
      thumbnail: "https://placehold.co/1200x800/2a4b6c/ffffff?text=Video+1"
    }
  ];

  const apiVideos = [];
  if (aboutData?.video_url) {
      apiVideos.push({
          id: 'main-video',
          youtubeId: getYoutubeId(aboutData.video_url),
          title_uz: aboutData?.title?.uz,
          title_ru: aboutData?.title?.ru,
          title_en: aboutData?.title?.en,
          thumbnail: aboutData?.images?.[0]?.image || "https://placehold.co/1200x800/2a4b6c/ffffff?text=Video+1"
      });
  }
  
  if (aboutData?.videos && Array.isArray(aboutData.videos)) {
      aboutData.videos.forEach((vid, idx) => {
          apiVideos.push({
              id: `api-vid-${idx}`,
              youtubeId: getYoutubeId(vid.video_url || vid.url),
              title_uz: vid.title?.uz || aboutData?.title?.uz,
              title_ru: vid.title?.ru || aboutData?.title?.ru,
              title_en: vid.title?.en || aboutData?.title?.en,
              thumbnail: vid.thumbnail || aboutData?.images?.[idx + 1]?.image || "https://placehold.co/1200x800/102030/ffffff?text=Video"
          });
      });
  }

  const videos = apiVideos.length > 0 ? apiVideos : defaultVideos;

  // Heritage & Culture API data formatting
  // Try to find if there belong to categories, else fallback to slicing
  const historicalPlaces = places.filter(p => p.categories?.some(c => c.slug === 'historical'));
  
  const heritagePlaces = historicalPlaces.length > 0 ? historicalPlaces.slice(0, 8) : places.slice(0, 8);

  const arMap = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/3]", "aspect-[2/3]", "aspect-[5/4]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[1/1]"];
  const dynamicCultureItems = cultures.map((item, index) => ({
    ...item,
    ar: arMap[index % arMap.length]
  }));

  const handleNextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setIsVideoPlaying(false);
  };

  const handlePrevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    setIsVideoPlaying(false);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    setIsVideoPlaying(true);
  };

  if (isLoading) {
      return (
          <div className='w-full min-h-screen flex items-center justify-center bg-white'>
              <div className='w-12 h-12 border-4 border-[#1b5093] border-t-transparent rounded-full animate-spin'></div>
          </div>
      )
  }

  return (
    <div className='min-h-screen bg-white font-inter pt-[110px] md:pt-[130px] pb-24 overflow-x-hidden'>

      {/* ---------------- INFO SECTION HEADINGS ---------------- */}
      <section className='w-full px-5 md:px-[6%] mb-8'>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-[#222] text-[28px] md:text-[36px] font-bold mb-3 tracking-tight leading-tight'
        >
          {getTranslated(aboutData?.title) || t.about}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-[#888] text-[13px] md:text-[14px] leading-relaxed max-w-[800px] text-justify md:text-left'
        >
          {getTranslated(aboutData?.description)}
        </motion.p>
      </section>

      {/* ---------------- VIDEO CAROUSEL SECTION ---------------- */}
      <section className='w-full flex justify-center items-center mb-16 md:mb-20 relative md:h-[400px] h-[250px] overflow-hidden'>
        {videos.map((video, index) => {
          const diff = (index - currentVideo + videos.length) % videos.length;

          // Default configuration for a hidden item
          let className = "absolute top-1/2 -translate-y-1/2 object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 scale-90 pointer-events-none";
          let overlayClass = "bg-white/50";
          let isCenter = false;
          let isLeft = false;
          let isRight = false;

          // Calculate positions and styles based on relation to the active video
          if (diff === 0) {
            className = "absolute left-[50%] top-1/2 -translate-x-[50%] -translate-y-1/2 w-[60%] md:w-[38%] h-full rounded-[16px] md:rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-30 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto bg-black overflow-hidden";
            overlayClass = "bg-black/20 hover:bg-black/40";
            isCenter = true;
          } else if (diff === videos.length - 1) {
            className = "absolute left-[-20%] md:left-[-5%] lg:left-[4%] top-1/2 -translate-y-1/2 w-[60%] md:w-[25%] lg:w-[25%] h-[75%] md:h-[80%] rounded-[16px] md:rounded-[24px] z-20 opacity-90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-black pointer-events-auto cursor-pointer overflow-hidden";
            overlayClass = "bg-white/20 hover:bg-white/10";
            isLeft = true;
          } else if (diff === 1) {
            className = "absolute right-[-20%] md:right-[-5%] lg:right-[4%] top-1/2 -translate-y-1/2 w-[60%] md:w-[25%] lg:w-[25%] h-[75%] md:h-[80%] rounded-[16px] md:rounded-[24px] z-20 opacity-90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-black pointer-events-auto cursor-pointer overflow-hidden";
            overlayClass = "bg-white/20 hover:bg-white/10";
            isRight = true;
          }

          return (
            <div
              key={video.id}
              className={className}
              onClick={() => {
                if (isLeft) handlePrevVideo();
                if (isRight) handleNextVideo();
              }}
            >
              {isCenter && isVideoPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className='w-full h-full border-none absolute inset-0'
                ></iframe>
              ) : (
                <>
                  <img src={video.thumbnail} alt={getTranslated(video, 'title')} className='w-full h-full object-cover transition-transform duration-700' />
                  <div className={`absolute inset-0 transition-colors duration-300 ${overlayClass}`}></div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-0'></div>

                  {isCenter && (
                    <div
                      className='absolute inset-0 flex items-center justify-center cursor-pointer group z-10'
                      onClick={handlePlayClick}
                    >
                      <div className='w-14 h-14 md:w-16 md:h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform duration-300'>
                        <PlayCircle size={40} weight="fill" className='text-black/80' />
                      </div>
                    </div>
                  )}

                  {isLeft && (
                    <div className='absolute inset-0 flex items-center justify-center z-10'>
                      <div className='w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-md'>
                        <CaretLeft size={20} weight="bold" className='text-white' />
                      </div>
                    </div>
                  )}

                  {isRight && (
                    <div className='absolute inset-0 flex items-center justify-center z-10'>
                      <div className='w-10 h-10 md:w-12 md:h-12 bg-[#2b59a6] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a3e7a] transition-colors'>
                        <CaretRight size={20} weight="bold" className='text-white/90' />
                      </div>
                    </div>
                  )}

                  <div className='absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 z-10'>
                    <h3 className={`font-bold tracking-wide drop-shadow-md text-white line-clamp-2 ${isCenter ? 'text-[16px] md:text-[20px] font-semibold' : 'text-[13px] md:text-[15px]'}`}>
                      {getTranslated(video, 'title')}
                    </h3>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </section>

      {/* ---------------- TARIXIY ME'ROSLAR ---------------- */}
      {heritagePlaces.length > 0 && (
      <section className='w-full px-5 md:px-[6%] mb-16 md:mb-20'>
        <h2 className='text-[#2c2c2c] text-[22px] md:text-[26px] font-bold mb-6 md:mb-8 tracking-tight'>
          {t.heritageTitle}
        </h2>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5'>
          {heritagePlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className='w-full aspect-[3/4] md:aspect-[4/5] rounded-[14px] md:rounded-[18px] overflow-hidden relative group cursor-pointer border border-gray-100'
            >
              <Link to={`/tourist_place/${place.slug}`}>
                <img src={place.cover_image || place.image} alt={getTranslated(place, 'name')} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-[#151b26]/90 via-[#151b26]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity'></div>
                <div className='absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5'>
                  <h3 className='text-white text-[12px] md:text-[14px] font-bold leading-snug drop-shadow-md pr-2 line-clamp-2'>
                    {getTranslated(place, 'name')}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      )}

      {/* ---------------- MADANIYAT ---------------- */}
      {dynamicCultureItems.length > 0 && (
      <section className='w-full px-5 md:px-[6%]'>
        <h2 className='text-[#2c2c2c] text-[22px] md:text-[26px] font-bold tracking-tight mb-6 md:mb-8'>
          {t.cultureTitle}
        </h2>

        {/* Masonry Layout Setup (Tepa-past staggered layout via columns) */}
        <div className='columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5 space-y-4 md:space-y-6'>
          {dynamicCultureItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className='break-inside-avoid flex flex-col group cursor-pointer'
            >
              <a href={item.detail_url} target="_blank" rel="noreferrer">
                <div className={`w-full ${item.ar} rounded-[14px] md:rounded-[18px] overflow-hidden mb-2.5 md:mb-3 shadow-sm border border-black/5`}>
                  <img
                    src={item.cover_image || item.image}
                    alt={getTranslated(item, 'title')}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                </div>
                <h4 className='text-[#111] font-inter text-[13px] md:text-[14px] font-[700] hover:text-[#2552a1] transition-colors leading-tight px-0.5 line-clamp-2'>
                  {getTranslated(item, 'title')}
                </h4>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      )}

    </div>
  );
};

export default Place_info;