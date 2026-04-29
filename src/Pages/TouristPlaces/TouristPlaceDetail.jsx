import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CaretRight, MapPin, Path, CurrencyCircleDollar, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';
import { placesService } from '../../Services/api';

const TouristPlaceDetail = () => {
  const { slug } = useParams();
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [place, setPlace] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const [detailData, routesData] = await Promise.all([
          placesService.getPlaceDetail(slug),
          placesService.getPlaceRoutes(slug)
        ]);
        setPlace(detailData);
        if (routesData && routesData.results) {
          setRoutes(routesData.results);
        }
      } catch (error) {
        console.error('Failed to load place details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug, lang]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth + 24 || 300;
      let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

      const galleryLength = place?.gallery_images?.length || 0;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= galleryLength) newIndex = galleryLength > 0 ? galleryLength - 1 : 0;

      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const translations = {
    uz: {
      home: "Bosh sahifa",
      touristPlaces: "Turistik joylar",
      bestTime: "Boring vaqt",
      rating: "Reyting",
      getDirection: "Yo'nalish olish",
      history: "Tarixi va tavsifi",
      routes: "Marshrutlar",
      gallery: "Fotogalereya",
      notFound: "Ma'lumot topilmadi",
      unknown: "Noma'lum"
    },
    ru: {
      home: "Главная",
      touristPlaces: "Туристические места",
      bestTime: "Лучшее время",
      rating: "Рейтинг",
      getDirection: "Получить маршрут",
      history: "История и описание",
      routes: "Маршруты",
      gallery: "Фотогалерея",
      notFound: "Информация не найдена",
      unknown: "Неизвестно"
    },
    en: {
      home: "Home page",
      touristPlaces: "Tourist places",
      bestTime: "Best time to visit",
      rating: "Rating",
      getDirection: "Get direction",
      history: "History and description",
      routes: "Routes",
      gallery: "Photogallery",
      notFound: "Information not found",
      unknown: "Unknown"
    }
  };

  const t = translations[lang] || translations.uz;

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  if (!place) return (
    <div className='min-h-screen flex items-center justify-center'>
      <p className='text-gray-500'>{t.notFound}</p>
    </div>
  );

  const getTranslated = (obj, currentLang) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj.uz || '';
  };

  const name = getTranslated(place.name, lang);
  const regionName = getTranslated(place.region?.name, lang);
  const shortDesc = getTranslated(place.short_description, lang) || getTranslated(place.overview, lang);
  const historyText = getTranslated(place.history, lang);
  const overviewText = getTranslated(place.overview, lang);

  return (
    <div className='min-h-screen bg-white font-inter overflow-x-hidden'>
      {/* Top Black Section */}
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.home}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <Link to="/tourist_places" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.touristPlaces}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <span className='text-gray-300 shrink-0 mt-1'>{name}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[7/5] md:aspect-auto md:h-[400px] lg:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl order-1 lg:order-2'
            >
              <img src={place.hero_image || place.cover_image} alt={name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none' />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-[1.1] mb-2 tracking-tight'>
                {name}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{regionName}</p>

              <p className='font-inter text-gray-400 text-sm md:text-base leading-[1.8] max-w-[550px] mb-12 font-medium'>
                {shortDesc}
              </p>

              <div className='flex flex-col md:flex-row md:items-center gap-8 md:gap-14 mb-12 text-zinc-300'>
                <div className='flex items-center gap-5'>
                  <Path size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase'>{t.bestTime}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{getTranslated(place.best_time_to_visit, lang) || t.unknown}</span>
                  </div>
                </div>

                <div className='hidden md:block w-[1px] h-12 bg-white/20' />

                <div className='flex items-center gap-5'>
                  <CurrencyCircleDollar size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase'>{t.rating}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{place.average_rating || '5.0'}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(place.google_maps_url, '_blank')}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-12 rounded-full w-fit shadow-xl shadow-[#2552A1]/30 text-sm cursor-pointer'
              >
                <MapPin size={22} weight="bold" />
                <span>{t.getDirection}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview/History Section */}
      <section className='py-20 px-5 md:px-[60px]'>
        <div className='max-w-full'>
          <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold mb-8'>{t.history}</h2>
          <div className='flex flex-col gap-6 text-zinc-600 text-[16px] md:text-[18px] leading-relaxed'>
            {overviewText && <p>{overviewText}</p>}
            {historyText && <p>{historyText}</p>}
          </div>
        </div>
      </section>

      {/* Routes Section if available */}
      {routes.length > 0 && (
        <section className='py-20 bg-zinc-900 px-5 md:px-[60px] text-white'>
          <h2 className='text-[32px] md:text-[40px] font-bold mb-12'>{t.routes}</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {routes.map((route) => (
              <Link
                to={`/tour_direction/${route.id}`}
                className='group relative block aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-xl'
              >
                <div key={route.id} className='bg-white/5 p-8 rounded-[32px] border border-white/10'>
                  <h3 className='text-2xl font-bold mb-4 text-[#2552A1]'>{getTranslated(route.title, lang)}</h3>
                  <p className='text-gray-400 mb-6'>{getTranslated(route.route_description, lang)}</p>
                  <div className='flex flex-wrap gap-3'>
                    {route.destinations.map(dest => (
                      <span key={dest.id} className='bg-white/10 px-4 py-2 rounded-full text-sm font-bold'>{getTranslated(dest.name, lang)}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {place.gallery_images?.length > 0 && (
        <section className='pt-8 pb-20 bg-gray-50 px-5 md:px-[60px]'>
          <div className='flex items-center justify-between mb-12'>
            <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold'>{t.gallery}</h2>
            <div className='flex gap-4'>
              <button
                onClick={() => scroll('left')}
                className='w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer active:scale-90 transition-all'
              >
                <ArrowLeft size={24} weight='bold' />
              </button>
              <button
                onClick={() => scroll('right')}
                className='w-12 h-12 rounded-full bg-[#2552A1] shadow-lg shadow-[#2552A1]/20 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all'
              >
                <ArrowRight size={24} weight='bold' />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className='flex gap-6 overflow-x-auto no-scrollbar pb-10 md:px-2 scroll-smooth'
          >
            {place.gallery_images.map((img, i) => (
              <div key={i} className='min-w-[300px] md:min-w-[600px] aspect-[16/10] rounded-[30px] overflow-hidden shadow-xl'>
                <img src={img.image} alt="" className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default TouristPlaceDetail;
