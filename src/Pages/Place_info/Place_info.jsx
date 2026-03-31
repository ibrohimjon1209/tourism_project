import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight, PlayCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const Place_info = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      about: "O'zbekiston haqida",
      pageTitle: "O'zbekiston turizm salohiyati",
      desc1: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.",
      desc2: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz. Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz.",
      heritageTitle: "Tarixiy me'roslar",
      cultureTitle: "Madaniyat"
    },
    ru: {
      home: "Главная",
      about: "Об Узбекистане",
      pageTitle: "Туристический потенциал Узбекистана",
      desc1: "Сердце Великого Шелкового пути, соединяющее Восток и Запад, ведет каждого туриста в мир волшебных сказок.",
      desc2: "Здесь вы почувствуете величие истории под голубыми куполами Самарканда, а на древних улицах Бухары и в Ичан-Кале Хивы вам покажется, что время остановилось. Сердце Великого Шелкового пути, соединяющее Восток и Запад, ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда, а на древних улицах Бухары и в Ичан-Кале Хивы вам покажется, что время остановилось.",
      heritageTitle: "Историческое наследие",
      cultureTitle: "Культура"
    },
    en: {
      home: "Home page",
      about: "About Uzbekistan",
      pageTitle: "Uzbekistan's tourism potential",
      desc1: "The center of the Great Silk Road connecting East and West, leading every tourist into a world of magical fairy tales.",
      desc2: "Here you will feel the grandeur of history under the blue domes of Samarkand, and time seems to stand still in the ancient streets of Bukhara and the \"open-air museum\" Ichan-Kala of Khiva. The center of the Great Silk Road connecting East and West, leading every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand, and time seems to stand still in the ancient streets of Bukhara and the \"open-air museum\" Ichan-Kala of Khiva.",
      heritageTitle: "Historical heritage",
      cultureTitle: "Culture"
    }
  };

  const t = translations[lang] || translations.uz;

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  const videos = [
    {
      id: 1,
      youtubeId: "LXb3EKWsInQ",
      title_uz: "Tarixiy turistik joylar",
      title_ru: "Исторические туристические места",
      title_en: "Historical tourist places",
      thumbnail: "https://placehold.co/1200x800/2a4b6c/ffffff?text=Video+1"
    },
    {
      id: 2,
      youtubeId: "P_nZ7O503l0",
      title_uz: "O'zbekiston tarixiga nazar",
      title_ru: "Взгляд на историю Узбекистана",
      title_en: "A look into the history of Uzbekistan",
      thumbnail: "https://placehold.co/1200x800/102030/ffffff?text=Video+2"
    },
    {
      id: 3,
      youtubeId: "dQw4w9WgXcQ",
      title_uz: "Madaniy tadbirlar",
      title_ru: "Культурные события",
      title_en: "Cultural events",
      thumbnail: "https://placehold.co/1200x800/1e3a29/ffffff?text=Video+3"
    }
  ];

  const heritagePlaces = [
    { id: 1, name_uz: "Ko'kaldosh madrasasi", name_ru: "Медресе Кукельдаш", name_en: "Kukeldash Madrasah", image: "https://placehold.co/600x800/b08968/ffffff?text=Kokaldosh+Madrasasi" },
    { id: 2, name_uz: "Chorsu bozori", name_ru: "Рынок Чорсу", name_en: "Chorsu Bazaar", image: "https://placehold.co/600x800/2a9d8f/ffffff?text=Chorsu+Bozori" },
    { id: 3, name_uz: "Amir Temur xiyoboni", name_ru: "Сквер Амира Темура", name_en: "Amir Temur Square", image: "https://placehold.co/600x800/5a7d9a/ffffff?text=Amir+Temur+Xiyoboni" },
    { id: 4, name_uz: "Toshkent metrosi", name_ru: "Ташкентское метро", name_en: "Tashkent Metro", image: "https://placehold.co/600x800/9e9e9e/ffffff?text=Toshkent+Metrosi" },
    { id: 5, name_uz: "Eski shahar", name_ru: "Старый город", name_en: "Old City", image: "https://placehold.co/600x800/5c4d3c/ffffff?text=Eski+Shahar" },
    { id: 6, name_uz: "Hazrati Imom majmuasi", name_ru: "Комплекс Хазрат Имам", name_en: "Hazrat Imam Complex", image: "https://placehold.co/600x800/3c5b84/ffffff?text=Hazrati+Imom" },
    { id: 7, name_uz: "Amir Temur muzeyi", name_ru: "Музей Амира Темура", name_en: "Amir Temur Museum", image: "https://placehold.co/600x800/e9c46a/ffffff?text=Amir+Temur+Muzeyi" },
    { id: 8, name_uz: "Chorsu bozori", name_ru: "Рынок Чорсу", name_en: "Chorsu Bazaar", image: "https://placehold.co/600x800/264653/ffffff?text=Chorsu+Bozori+2" }
  ];

  // Using different aspect ratios to create the masonry staggered layout in columns
  const cultureItems = [
    { id: 1, name_uz: "Kulolchilik", name_ru: "Гончарное дело", name_en: "Pottery", image: "https://placehold.co/500x700/ddb892/333333?text=Kulolchilik", ar: "aspect-[3/4]" },
    { id: 2, name_uz: "Gilamdo'zlik", name_ru: "Ковроткачество", name_en: "Carpet weaving", image: "https://placehold.co/500x550/9a031e/ffffff?text=Gilamdo'zlik", ar: "aspect-[1/1]" },
    { id: 3, name_uz: "Hunarmandchilik", name_ru: "Ремесленничество", name_en: "Craftsmanship", image: "https://placehold.co/500x500/5f0f40/ffffff?text=Hunarmandchilik", ar: "aspect-[4/3]" },
    { id: 4, name_uz: "O'zbek adrasi", name_ru: "Узбекский адрас", name_en: "Uzbek adras", image: "https://placehold.co/500x750/0f4c5c/ffffff?text=O'zbek+adrasi", ar: "aspect-[2/3]" },
    { id: 5, name_uz: "O'zbek palovi", name_ru: "Узбекский плов", name_en: "Uzbek pilaf", image: "https://placehold.co/500x550/e36414/ffffff?text=O'zbek+palovi", ar: "aspect-[5/4]" },
    { id: 6, name_uz: "O'zbek to'yi", name_ru: "Узбекская свадьба", name_en: "Uzbek wedding", image: "https://placehold.co/500x750/023047/ffffff?text=O'zbek+to'yi", ar: "aspect-[3/4]" },
    { id: 7, name_uz: "Qog'oz ishlab chiqarish", name_ru: "Производство бумаги", name_en: "Paper production", image: "https://placehold.co/500x500/fb8500/ffffff?text=Qog'oz+ishlab+chiqarish", ar: "aspect-[4/3]" },
    { id: 8, name_uz: "Amir Temur muzeyi", name_ru: "Музей Амира Темура", name_en: "Amir Temur Museum", image: "https://placehold.co/500x650/ffb703/ffffff?text=Amir+Temur+muzeyi", ar: "aspect-[1/1]" }
  ];

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
          {t.pageTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='text-[#888] text-[13px] md:text-[14px] leading-relaxed max-w-[800px]'
        >
          {t.desc1}
        </motion.p>
      </section>

      {/* ---------------- VIDEO CAROUSEL SECTION ---------------- */}
      <section className='w-full flex justify-center items-center mb-8 relative md:h-[400px] h-[250px] overflow-hidden'>
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
            // Center Active Video
            className = "absolute left-[50%] top-1/2 -translate-x-[50%] -translate-y-1/2 w-[60%] md:w-[38%] h-full rounded-[16px] md:rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.2)] z-30 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto bg-black overflow-hidden";
            overlayClass = "bg-black/20 hover:bg-black/40";
            isCenter = true;
          } else if (diff === videos.length - 1) {
            // Left Faded Video
            className = "absolute left-[-20%] md:left-[-5%] lg:left-[4%] top-1/2 -translate-y-1/2 w-[60%] md:w-[25%] lg:w-[25%] h-[75%] md:h-[80%] rounded-[16px] md:rounded-[24px] z-20 opacity-90 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-black pointer-events-auto cursor-pointer overflow-hidden";
            overlayClass = "bg-white/20 hover:bg-white/10";
            isLeft = true;
          } else if (diff === 1) {
            // Right Faded Video
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

                  {/* Play Button Overlay (For center video) */}
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

                  {/* Left Arrow Button (For left video) */}
                  {isLeft && (
                    <div className='absolute inset-0 flex items-center justify-center z-10'>
                      <div className='w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-md'>
                        <CaretLeft size={20} weight="bold" className='text-white' />
                      </div>
                    </div>
                  )}

                  {/* Right Arrow Button (For right video) */}
                  {isRight && (
                    <div className='absolute inset-0 flex items-center justify-center z-10'>
                      <div className='w-10 h-10 md:w-12 md:h-12 bg-[#2b59a6] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a3e7a] transition-colors'>
                        <CaretRight size={20} weight="bold" className='text-white/90' />
                      </div>
                    </div>
                  )}

                  {/* Title Overlay text */}
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

      {/* ---------------- SECOND PARAGRAPH BLOK ---------------- */}
      <section className='w-full px-5 md:px-[6%] mb-16'>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-[#333] font-[500] text-[13px] md:text-[14px] leading-[1.8] text-justify md:text-left w-full'
        >
          {t.desc2}
        </motion.p>
      </section>

      {/* ---------------- TARIXIY ME'ROSLAR ---------------- */}
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
              <img src={place.image} alt={getTranslated(place, 'name')} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
              <div className='absolute inset-0 bg-gradient-to-t from-[#151b26]/90 via-[#151b26]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity'></div>
              <div className='absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5'>
                <h3 className='text-white text-[12px] md:text-[14px] font-bold leading-snug drop-shadow-md pr-2'>
                  {getTranslated(place, 'name')}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- MADANIYAT ---------------- */}
      <section className='w-full px-5 md:px-[6%]'>
        <h2 className='text-[#2c2c2c] text-[22px] md:text-[26px] font-bold tracking-tight mb-6 md:mb-8'>
          {t.cultureTitle}
        </h2>

        {/* Masonry Layout Setup (Tepa-past staggered layout via columns) */}
        <div className='columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-5 space-y-4 md:space-y-6'>
          {cultureItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className='break-inside-avoid flex flex-col group cursor-pointer'
            >
              <div className={`w-full ${item.ar} rounded-[14px] md:rounded-[18px] overflow-hidden mb-2.5 md:mb-3 shadow-sm border border-black/5`}>
                <img
                  src={item.image}
                  alt={getTranslated(item, 'name')}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
              </div>
              <h4 className='text-[#111] font-inter text-[13px] md:text-[14px] font-[700] hover:text-[#2552a1] transition-colors leading-tight px-0.5 leading-snug'>
                {getTranslated(item, 'name')}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Place_info;