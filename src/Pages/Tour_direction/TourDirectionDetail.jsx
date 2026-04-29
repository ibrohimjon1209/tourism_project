import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaretRight, MapPin, Path, Clock, ArrowRight, CurrencyCircleDollar, Warning } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';
import { routeService } from '../../Services/api';

const TourDirectionDetail = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const getTranslated = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.uz || '';
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await routeService.getRouteDetail(id);
        setRoute(data);
      } catch (error) {
        console.error('Failed to fetch route detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, lang]);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      tourDirection: "Sayohat yo'nalishlari",
      visitPlaces: "Tashrif buyuriladigan joylar",
      distance: "Masofa",
      transport: "Transport",
      startPoint: "Boshlanish nuqtasi",
      step: "Bosqich",
      ctaTitle: "Bu marshrut sizga yoqdimi?",
      ctaDesc: "Bizning gidlarimiz sizga ushbu sayohatni eng yaxshi tarzda tashkil etib berishadi.",
      ctaOrder: "Buyurtma berish",
      ctaAll: "Barchasi",
      notFound: "Ma'lumot topilmadi",
      backToRoutes: "Yo'nalishlarga qaytish",
      viewOnMap: "Xaritada ko'rish"
    },
    ru: {
      home: "Главная",
      tourDirection: "Направления путешествий",
      visitPlaces: "Места для посещения",
      distance: "Расстояние",
      transport: "Транспорт",
      startPoint: "Точка старта",
      step: "Этап",
      ctaTitle: "Вам понравился этот маршрут?",
      ctaDesc: "Наши гиды помогут вам организовать это путешествие наилучшим образом.",
      ctaOrder: "Забронировать",
      ctaAll: "Все направления",
      notFound: "Информация не найдена",
      backToRoutes: "Назад к направлениям",
      viewOnMap: "Посмотреть на карте"
    },
    en: {
      home: "Home page",
      tourDirection: "Travel directions",
      visitPlaces: "Places to visit",
      distance: "Distance",
      transport: "Transport",
      startPoint: "Starting point",
      step: "Stage",
      ctaTitle: "Did you like this route?",
      ctaDesc: "Our guides will help you organize this trip in the best possible way.",
      ctaOrder: "Book now",
      ctaAll: "All directions",
      notFound: "Information not found",
      backToRoutes: "Back to directions",
      viewOnMap: "View on map"
    }
  };

  const t = translations[lang] || translations.uz;

  if (loading) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
      </div>
    );
  }

  if (!route) {
    return (
      <div className='min-h-screen bg-black flex flex-col items-center justify-center text-center px-5'>
        <Warning size={48} className='text-gray-500 mb-6' />
        <h2 className='text-white text-2xl font-bold'>{t.notFound}</h2>
        <Link to="/tour_direction" className='mt-8 text-[#2552A1] font-bold'>{t.backToRoutes}</Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black font-inter overflow-x-hidden'>
      {/* Header Section */}
      <section className='w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-5 md:px-[60px]'>
        <div className='w-full flex flex-col'>
          <nav className='flex flex-wrap items-center gap-2 text-gray-500 text-sm md:text-base mb-8'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
            <CaretRight size={14} weight='bold' />
            <Link to="/tour_direction" className='hover:text-[#2552A1] transition-colors'>{t.tourDirection}</Link>
            <CaretRight size={14} weight='bold' />
            <span className='text-gray-300'>{getTranslated(route.title)}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start'>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='aspect-[16/10] md:aspect-auto md:h-[500px] rounded-[30px] overflow-hidden shadow-2xl border border-white/5 order-1 lg:order-2'
            >
              <img
                src={route.destination?.hero_image || route.destination?.cover_image}
                alt={getTranslated(route.title)}
                className='w-full h-full object-cover'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='flex flex-col order-2 lg:order-1'
            >
              <h1 className='text-white text-[32px] md:text-[56px] font-bold leading-tight mb-8'>
                {getTranslated(route.title)}
              </h1>

              <div className='flex flex-col gap-6 max-w-[650px] mb-12'>
                <p className='text-gray-400 text-sm md:text-base leading-relaxed font-medium'>
                  {getTranslated(route.route_description)}
                </p>
                {route.notes && (
                  <div className='bg-white/5 border-l-4 border-[#2552A1] p-6 rounded-r-2xl'>
                    <p className='text-gray-300 italic text-sm md:text-base'>
                      {getTranslated(route.notes)}
                    </p>
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                <div className='flex items-center gap-4 text-white'>
                  <div className='p-3 bg-white/5 rounded-2xl'>
                    <Path size={24} className='text-[#2552A1]' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider'>{t.distance}</span>
                    <span className='text-xl font-bold'>{route.distance_km} km</span>
                  </div>
                </div>
                <div className='flex items-center gap-4 text-white'>
                  <div className='p-3 bg-white/5 rounded-2xl'>
                    <Clock size={24} className='text-[#2552A1]' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider'>{t.transport}</span>
                    <span className='text-xl font-bold'>{route.transport_type_label}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Places to Visit Section */}
      <section className='w-full py-10 md:py-20 px-5 md:px-[60px] bg-zinc-950'>
        <h2 className='text-white text-[28px] md:text-[40px] font-bold mb-10 md:mb-16 text-center'>
          {t.visitPlaces}
        </h2>

        <div className='max-w-[1200px] mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10'>
            {route.destinations?.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/tourist_place/${place.slug}`}
                  className='group relative flex flex-col rounded-[32px] overflow-hidden bg-white/5 border border-white/10 hover:border-[#2552A1]/50 transition-all duration-500 h-full'
                >
                  <div className='aspect-[4/3] overflow-hidden'>
                    <img src={place.cover_image} alt={getTranslated(place.name)} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
                  </div>
                  <div className='p-8 flex flex-col flex-1'>
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-[#2552A1] font-bold text-sm'>{t.step} {index + 1}</span>
                      <ArrowRight size={20} className='text-gray-600 group-hover:translate-x-2 transition-transform' />
                    </div>
                    <h3 className='text-white text-xl font-bold mb-4'>{getTranslated(place.name)}</h3>
                    <div className='mt-auto flex items-center gap-2 text-gray-500 text-sm'>
                      <MapPin size={18} />
                      <span>{getTranslated(route.destination?.region?.name)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 px-5 md:px-[60px] bg-white text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-[800px] mx-auto'
        >
          <h2 className='text-zinc-900 text-3xl md:text-5xl font-bold mb-8'>
            {t.ctaTitle}
          </h2>
          <p className='text-gray-500 text-lg mb-12'>
            {t.ctaDesc}
          </p>
          <div className='flex flex-wrap justify-center gap-6'>
            <Link to='https://taxi.yandex.com/en_am/'>
              <button className='bg-[#2552A1] text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#2552A1]/30 cursor-pointer'>
                {t.ctaOrder}
              </button>
            </Link>
            <Link to="/tour_direction" className='bg-gray-100 text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors'>
              {t.ctaAll}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TourDirectionDetail;
