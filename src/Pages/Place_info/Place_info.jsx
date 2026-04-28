import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    return match ? match[1] : url;
  };

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
    );
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

      {/* ================== VIDEO SECTION (Boshqa bo'limlar bilan bir xil padding) ================== */}
      <section className='w-full px-5 md:px-[6%] mb-16 md:mb-20'>
        <div className="relative w-full aspect-video md:aspect-[16/9] bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
          {videos.map((video, index) => {
            const diff = (index - currentVideo + videos.length) % videos.length;

            return (
              <div
                key={video.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  diff === 0 
                    ? 'opacity-100 scale-100 z-30' 
                    : 'opacity-0 scale-95 pointer-events-none z-10'
                }`}
              >
                {isVideoPlaying && diff === 0 ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className='w-full h-full border-none'
                    title={getTranslated(video, 'title')}
                  />
                ) : (
                  <>
                    <img 
                      src={video.thumbnail} 
                      alt={getTranslated(video, 'title')} 
                      className='w-full h-full object-cover'
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Play Button */}
                    {diff === 0 && (
                      <div
                        className='absolute inset-0 flex items-center justify-center cursor-pointer z-20'
                        onClick={handlePlayClick}
                      >
                        <div className='w-20 h-20 md:w-24 md:h-24 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl'>
                          <PlayCircle size={52} weight="fill" className='text-[#1e3a8a] ml-1' />
                        </div>
                      </div>
                    )}

                    {/* Video nomi */}
                    <div className='absolute bottom-6 left-6 right-6 z-20'>
                      <h3 className='text-white text-xl md:text-2xl font-bold tracking-tight drop-shadow-lg line-clamp-2'>
                        {getTranslated(video, 'title')}
                      </h3>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Navigation Arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={handlePrevVideo}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all backdrop-blur-md"
              >
                <CaretLeft size={28} weight="bold" />
              </button>

              <button
                onClick={handleNextVideo}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/80 text-white p-3 md:p-4 rounded-full transition-all backdrop-blur-md"
              >
                <CaretRight size={28} weight="bold" />
              </button>
            </>
          )}
        </div>
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