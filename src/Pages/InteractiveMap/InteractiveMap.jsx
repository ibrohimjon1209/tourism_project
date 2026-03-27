import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretRight, NavigationArrow, Phone, Star, X, Clock, MapPin } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import yandexTaxi from "./yandex-taxi.png";

const InteractiveMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  const places = [
    {
      id: 1,
      name: "Ko'kaldosh madrasasi",
      coords: [41.323, 69.24],
      fallbackAddress: "Toshkent, Alisher Navoiy ko'chasi, 48",
      image: "https://placehold.co/600x400/1e3a8a/ffffff?text=Kokaldosh+Madrasasi",
    }
  ];

  const initMap = useCallback(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement || mapElement.innerHTML !== '') return;

      const map = new window.ymaps.Map('map', {
        center: [41.311081, 69.240562],
        zoom: 5,
        controls: ['zoomControl', 'fullscreenControl'],
      });

      places.forEach((place) => {
        const placemark = new window.ymaps.Placemark(
          place.coords,
          { hintContent: place.name },
          { 
            preset: 'islands#redIcon', // Larger, more visible pin icon
            iconColor: '#EE2524'
          }
        );

        placemark.events.add('click', async () => {
          setLoading(true);
          setSelectedPlace(null);

          try {
            const res = await window.ymaps.geocode(place.coords, {
              results: 1,
              kind: 'poi',
            });

            const obj = res.geoObjects.get(0);
            const properties = obj ? obj.properties : {};

            const dynamicPlace = {
              ...place,
              name: properties.get('name') || place.name,
              address: properties.get('text') || properties.get('description') || place.fallbackAddress,
              rating: 4.8,
              reviews: 1240,
              phone: properties.get('Phone') || properties.get('phone'),
            };

            setSelectedPlace(dynamicPlace);
          } catch (error) {
            console.warn('Geocode warning (using fallback):', error);
            setSelectedPlace({
              ...place,
              address: place.fallbackAddress,
              rating: 4.8,
              reviews: 1240
            });
          } finally {
            setLoading(false);
          }
        });

        map.geoObjects.add(placemark);
      });
    });
  }, [places]);

  useEffect(() => {
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=uz_UZ'; 
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, [initMap]);

  // === Button linklari ===
  const openRoute = (coords) => {
    if (!coords) return;
    const [lat, lon] = coords;
    window.open(`https://yandex.uz/maps/?rtext=~${lat},${lon}&rtt=auto`, '_blank');
  };

  const openYandexGo = (name, coords) => {
    if (!coords) return;
    const [lat, lon] = coords;
    const text = encodeURIComponent(name);
    window.open(`https://yandex.uz/maps/?ll=${lon},${lat}&z=17&text=${text}`, '_blank');
  };

  const searchGoogle = (name) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px]'>
      {/* Breadcrumb - Match other pages' style */}
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base font-inter mb-6 relative z-10'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors shrink-0'>Bosh sahifa</Link>
        <CaretRight size={14} weight='bold' className='shrink-0' />
        <span className='text-gray-300 shrink-0'>Interaktiv xarita</span>
      </nav>

      <motion.header 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='max-w-[900px] mb-12'
      >
        <h1 className='font-inter font-bold text-[36px] md:text-[52px] text-gray-900 leading-tight mb-4 tracking-tight'>
          Interaktiv xarita
        </h1>
        <p className='font-inter text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-medium'>
          Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.
        </p>
      </motion.header>

      <div className='relative w-full h-[560px] md:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50'>
        <div id="map" className='w-full h-full' />

        {loading && (
          <div className='absolute top-6 left-6 z-30 bg-white/95 backdrop-blur-lg px-5 py-3 rounded-2xl shadow flex items-center gap-3'>
            <div className='w-5 h-5 border-2 border-[#2552A1] border-t-transparent rounded-full animate-spin'></div>
            <span className='text-sm text-gray-700 font-medium'>Ma'lumot yuklanmoqda...</span>
          </div>
        )}

        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }}
              className='absolute top-4 left-4 md:top-6 md:left-6 z-20 w-[280px] md:w-[360px] bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-gray-100'
            >
              <div className='relative h-36 md:h-48 w-full'>
                <img 
                  src={selectedPlace.image} 
                  alt={selectedPlace.name}
                  className='w-full h-full object-cover'
                />
                <button 
                  onClick={() => setSelectedPlace(null)}
                  className='absolute top-3 right-3 cursor-pointer bg-white/30 backdrop-blur-md hover:bg-white/50 text-white p-1.5 rounded-full transition-all'
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              <div className='p-4 md:p-6 flex flex-col gap-3 md:gap-4'>
                <div className='flex flex-col gap-1'>
                  <h3 className='font-bold text-lg md:text-xl text-gray-900 leading-tight'>{selectedPlace.name}</h3>
                  <div className='flex items-center gap-2'>
                    <Star size={14} weight="fill" className='text-yellow-500' />
                    <span className='font-bold text-xs md:text-sm'>{selectedPlace.rating || 4.8}</span>
                    <span className='text-gray-400 text-[10px] md:text-xs'>({(selectedPlace.reviews || 1240).toLocaleString()} baho)</span>
                  </div>
                  <p className='text-gray-500 text-[11px] md:text-sm leading-relaxed mt-0.5'>{selectedPlace.address}</p>
                </div>

                <div className='flex flex-col gap-1.5 md:gap-2 mt-1 md:mt-2'>
                  <div className='grid grid-cols-2 gap-1.5 md:gap-2'>
                    <button 
                      onClick={() => openRoute(selectedPlace.coords)}
                      className='flex items-center justify-center bg-[#EE2524] hover:bg-[#d41f1e] text-white py-2.5 md:py-3 px-3 rounded-lg md:rounded-xl font-bold text-[11px] md:text-sm transition-all shadow-sm'
                    >
                      Yandex xarita
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedPlace.coords?.[0]},${selectedPlace.coords?.[1]}`, '_blank')}
                      className='flex items-center justify-center bg-[#4285F4] hover:bg-[#3367D6] text-white py-2.5 md:py-3 px-3 rounded-lg md:rounded-xl font-bold text-[11px] md:text-sm transition-all shadow-sm'
                    >
                      Google xarita
                    </button>
                  </div>

                  <div className='grid grid-cols-2 gap-1.5 md:gap-2'>
                    <button 
                      onClick={() => searchGoogle(selectedPlace.name)}
                      className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[11px] md:text-sm transition-all'
                    >
                      Internetdan qidirish
                    </button>

                    {selectedPlace.phone ? (
                      <a 
                        href={`tel:${selectedPlace.phone}`}
                        className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[11px] md:text-sm transition-all'
                      >
                        Qo'ng'iroq qilish
                      </a>
                    ) : (
                      <div className='flex items-center justify-center bg-gray-50 text-gray-300 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-[11px] md:text-sm cursor-not-allowed'>
                        Raqam yo'q
                      </div>
                    )}
                  </div>

                  {/* Yandex Go Taxi Order - Improved Mobile Adaptability */}
                  <button 
                    onClick={() => openYandexGo(selectedPlace.name, selectedPlace.coords)}
                    className='w-full flex items-center justify-between bg-[#FCF01C] hover:bg-[#FBE900] text-black py-3 md:py-4 px-4 md:px-5 rounded-xl md:rounded-2xl font-bold transition-all active:scale-[0.98] mt-1 md:mt-2 group'
                  >
                    <div className='flex items-center gap-2 md:gap-3'>
                      <img 
                        src={yandexTaxi} 
                        alt="Yandex Go" 
                        className='h-4 md:h-6 w-auto group-hover:scale-110 transition-transform' 
                      />
                      <span className='text-[11px] md:text-sm font-bold'>Taksi chaqirish</span>
                    </div>
                    <span className='text-[9px] md:text-xs font-bold opacity-70'>~25 000 so'm</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMap;