import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin, Path, CurrencyCircleDollar } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'

const NearbyPlaceDetail = () => {
  const { id } = useParams()
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      nearbyPlaces: "Yaqin turistik joylar",
      distanceTitle: "Sizdan masofada",
      costTitle: "Taxminiy xarajat",
      directionBtn: "Yo'nalish olish"
    },
    ru: {
      home: "Главная",
      nearbyPlaces: "Ближайшие туристические объекты",
      distanceTitle: "От вас на расстоянии",
      costTitle: "Примерная стоимость",
      directionBtn: "Проложить маршрут"
    },
    en: {
      home: "Home page",
      nearbyPlaces: "Nearby tourist attractions",
      distanceTitle: "Distance from you",
      costTitle: "Estimated cost",
      directionBtn: "Get directions"
    }
  };

  const t = translations[lang] || translations.uz;

  const placeData = {
    name_uz: "HUMO MUZ SAROYI", name_ru: "ЛЕДОВЫЙ ДВОРЕЦ ХУМО", name_en: "HUMO ICE PALACE",
    city_uz: "Toshkent shahri", city_ru: "Город Ташкент", city_en: "Tashkent city",
    description_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz. O'zbekiston nafaqat o'zining noyob me'moriy obidalari, bakal butun dunyoga mashhur mehmondo'stligi, har bir hududning o'ziga xos ta'miga ega bo'lgan palovi va rang-barang milliy matolari bilan ham mashhurdir.",
    description_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда, а на древних улицах Бухары и в Ичан-Кале Хивы вам покажется, что время остановилось. Узбекистан славится не только своими уникальными архитектурными памятниками, но и всемирно известным гостеприимством.",
    description_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand, and time seems to stand still in the ancient streets of Bukhara and the \"open-air museum\" Ichan-Kala of Khiva. Uzbekistan is famous not only for its unique architectural monuments, but also for its world-famous hospitality.",
    distance: "724 m",
    cost: "25 500 UZS",
    mainImage: "https://placehold.co/1200x800/111111/444444?text=Humo+Muz+Saroyi+Main",
    sections: [
      {
        id: 1,
        image: "https://placehold.co/1200x900/1a1a1a/ffffff?text=Humo+Arena+View+1",
        text_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz...",
        text_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда...",
        text_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand..."
      },
      {
        id: 2,
        image: "https://placehold.co/1200x900/2a2a2a/ffffff?text=Humo+Arena+View+2",
        text_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz...",
        text_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда...",
        text_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand..."
      },
      {
        id: 3,
        image: "https://placehold.co/1200x900/1a1a1a/ffffff?text=Humo+Arena+View+3",
        text_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz...",
        text_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда...",
        text_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand..."
      },
      {
        id: 4,
        image: "https://placehold.co/1200x900/2a2a2a/ffffff?text=Humo+Arena+View+4",
        text_uz: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz...",
        text_ru: "Центр Великого Шелкового пути ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда...",
        text_en: "The center of the Great Silk Road leads every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand..."
      }
    ]
  }

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  return (
    <div className='min-h-screen bg-white font-inter overflow-x-hidden'>
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.home}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <Link to="/nearby_places" className='hover:text-[#2552A1] transition-colors shrink-0'>{t.nearbyPlaces}</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <span className='text-gray-300 break-words mt-1'>{getTranslated(placeData, 'name')}</span>
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
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-[1.1] uppercase mb-2 tracking-tight'>
                {getTranslated(placeData, 'name')}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{getTranslated(placeData, 'city')}</p>
              
              <p className='font-inter text-gray-400 text-sm md:text-base leading-[1.8] max-w-[550px] mb-12 font-medium'>
                {getTranslated(placeData, 'description')}
              </p>

              <div className='flex items-center gap-8 md:gap-14 mb-12 text-zinc-300'>
                <div className='flex items-center gap-5'>
                  <Path size={32} />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest'>{t.distanceTitle}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{placeData.distance}</span>
                  </div>
                </div>

                <div className='w-[1px] h-12 bg-white/20' />

                <div className='flex items-center gap-5'>
                  <CurrencyCircleDollar size={32} />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest'>{t.costTitle}</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{placeData.cost}</span>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-12 rounded-full w-fit shadow-xl shadow-[#2552A1]/30 uppercase text-xs tracking-widest'
              >
                <MapPin size={22} weight="bold" />
                <span>{t.directionBtn}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='w-full overflow-hidden'>
        <div className='flex flex-col'>
          {placeData.sections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='flex flex-col md:block relative w-full md:h-[420px]'
            >
              <div className='w-full h-[280px] md:h-full md:absolute md:inset-0 overflow-hidden'>
                <img 
                  src={section.image}
                  alt="" 
                  className='w-full h-full object-cover grayscale-[5%] hover:grayscale-0 transition-all duration-1000'
                />
              </div>

              <div 
                className={`w-full md:w-1/2 md:absolute md:inset-y-0 ${index % 2 === 0 ? 'md:left-0' : 'md:right-0'} 
                bg-white md:bg-white/70 flex items-center
                px-[20px] md:px-[60px] py-12 md:py-0 transition-all duration-700`}
              >
                <div className='flex flex-col gap-5'>
                  <p className='font-inter text-[#303030] text-[20px] md:text-[25px] font-[500] leading-tight tracking-tight'>
                    {getTranslated(section, 'text')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default NearbyPlaceDetail
