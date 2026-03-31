import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaretRight, MapPin, Path, CurrencyCircleDollar, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';

const TouristPlaceDetail = () => {
  const { id } = useParams();
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      touristPlaces: "Turistik joylar",
      distanceTitle: "Sizdan masofada",
      costTitle: "Taxminiy xarajat",
      directionBtn: "Yo'nalish olish",
      historyTitle: "Tarixi haqida",
      galleryTitle: "Fotogalereya"
    },
    ru: {
      home: "Главная",
      touristPlaces: "Туристические места",
      distanceTitle: "От вас на расстоянии",
      costTitle: "Примерная стоимость",
      directionBtn: "Проложить маршрут",
      historyTitle: "Об истории",
      galleryTitle: "Фотогалерея"
    },
    en: {
      home: "Home page",
      touristPlaces: "Tourist places",
      distanceTitle: "Distance from you",
      costTitle: "Estimated cost",
      directionBtn: "Get directions",
      historyTitle: "About history",
      galleryTitle: "Photo gallery"
    }
  };

  const t = translations[lang] || translations.uz;

  const placeData = {
    name_uz: "Imom al-Buxoriy maqbarasi", name_ru: "Мавзолей Имама Аль-Бухари", name_en: "Imam Al-Bukhari Mausoleum",
    region_uz: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region",
    description_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz.",
    description_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда, а на древних улицах Бухары и в Ичан-Кале Хивы вам покажется, что время остановилось.",
    description_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand, and time seems to stand still in the ancient streets of Bukhara and the \"open-air museum\" Ichan-Kala of Khiva.",
    distance: "724 m",
    cost: "25 500 UZS",
    mainImage: "https://placehold.co/1200x800/111111/444444?text=Imom+Buxoriy+Main",
    history_uz: [
      "Imom al-Buxoriy majmuasi — buyuk muhaddis, \"Sahihi Buxoriy\" asari muallifi Abu Abdulloh Muhammad ibn Ismoil al-Buxoriy mangu qo'nim topgan muqaddas maskandir. Samarqand yaqinidagi Payariq tumanida joylashgan ushbu majmua asrlar davomida ilm va e'tiqod markazi bo'lib kelgan.",
      "Majmuaning shakllanish tarixi Imom al-Buxoriy vafotidan so'ng (milodiy 870-yil), u kishi dafn etilgan Xartang qishlog'idagi qabr atrofida ziyoratgoh barpo etilgan. XVI asrda majmua yanada shakllantirilib, yoniga kichik masjid qurilgan va atrofiga chinorlar ekilgan.",
      "Majmua an'anaviy o'zbek milliy me'morchiligi uslubida barpo etilgan bo'lib, quyidagi qismlardan iborat: Maqbara, Masjid, Muzey."
    ],
    history_ru: [
      "Комплекс Имам аль-Бухари является священным местом упокоения великого мухаддиса, автора труда «Сахих аль-Бухари» Абу Абдуллаха Мухаммада ибн Исмаила аль-Бухари. Этот комплекс, расположенный в Пайарыкском районе недалеко от Самарканда, на протяжении веков был центром науки и религии.",
      "В XVI веке комплекс получил дальнейшее развитие, рядом была построена небольшая мечеть и посажены платаны.",
      "Комплекс построен в традиционном узбекском национальном архитектурном стиле и состоит из следующих частей: Мавзолей, Мечеть, Музей."
    ],
    history_en: [
      "The Imam al-Bukhari complex is the sacred resting place of the great muhaddith, the author of the work \"Sahih al-Bukhari\" Abu Abdullah Muhammad ibn Ismail al-Bukhari. This complex, located in the Payarik district near Samarkand, has been a center of science and religion for centuries.",
      "In the 16th century, the complex was further developed, a small mosque was built nearby and plane trees were planted.",
      "The complex is built in the traditional Uzbek national architectural style and consists of the following parts: Mausoleum, Mosque, Museum."
    ],
    gallery: [
      "https://placehold.co/1200x900/1a1a1a/ffffff?text=Gallery+1",
      "https://placehold.co/1200x900/2a2a2a/ffffff?text=Gallery+2",
      "https://placehold.co/1200x900/3a3a3a/ffffff?text=Gallery+3",
      "https://placehold.co/1200x900/4a4a4a/ffffff?text=Gallery+4",
      "https://placehold.co/1200x900/5a5a5a/ffffff?text=Gallery+5"
    ]
  };

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth + 24; 
      let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= placeData.gallery.length) newIndex = placeData.gallery.length - 1;

      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

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
            <span className='text-gray-300 shrink-0 mt-1'>{getTranslated(placeData, 'name')}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[7/5] md:aspect-auto md:h-[400px] lg:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl order-1 lg:order-2'
            >
              <img src={placeData.mainImage} alt={getTranslated(placeData, 'name')} className='w-full h-full object-cover' />
              <div className='absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none' />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-[1.1] mb-2 tracking-tight'>
                {getTranslated(placeData, 'name')}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{getTranslated(placeData, 'region')}</p>
              
              <p className='font-inter text-gray-400 text-sm md:text-base leading-[1.8] max-w-[550px] mb-12 font-medium'>
                {getTranslated(placeData, 'description')}
              </p>

              <div className='flex flex-col md:flex-row md:items-center gap-8 md:gap-14 mb-12 text-zinc-300'>
                <div className='flex items-center gap-5'>
                  <Path size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest'>{t.distanceTitle}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{placeData.distance}</span>
                  </div>
                </div>

                <div className='hidden md:block w-[1px] h-12 bg-white/20' />

                <div className='flex items-center gap-5'>
                  <CurrencyCircleDollar size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest'>{t.costTitle}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{placeData.cost}</span>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-12 rounded-full w-fit shadow-xl shadow-[#2552A1]/30 text-sm'
              >
                <MapPin size={22} weight="bold" />
                <span>{t.directionBtn}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className='py-20 px-5 md:px-[60px]'>
        <div className='max-w-full'>
          <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold mb-8'>{t.historyTitle}</h2>
          <div className='flex flex-col gap-6'>
            {getTranslated(placeData, 'history').map((para, i) => (
              <p key={i} className='text-zinc-600 text-[16px] md:text-[18px] leading-relaxed'>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className='pt-8 pb-20 bg-gray-50 px-5 md:px-[60px]'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold'>{t.galleryTitle}</h2>
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
          {placeData.gallery.map((img, i) => (
            <div key={i} className='min-w-[300px] md:min-w-[600px] aspect-[16/10] rounded-[30px] overflow-hidden shadow-xl'>
              <img src={img} alt="" className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TouristPlaceDetail;
