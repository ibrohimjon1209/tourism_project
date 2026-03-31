import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Single_city = () => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  useEffect(() => {
    const handleLangChange = () => setLang(localStorage.getItem('lang') || 'uz');
    window.addEventListener('langChange', handleLangChange);
    return () => window.removeEventListener('langChange', handleLangChange);
  }, []);

  const translations = {
    uz: {
      home: "Bosh sahifa",
      regional: "Viloyatlar turizmi",
      city: "Toshkent shahri",
      country: "O'zbekiston",
      desc: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzej\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz. O'zbekiston nafaqat o'zining noyob me'moriy obidalari, balki butun dunyoga mashhur mehmondo'stligi.",
      viewMap: "Xaritada ko'rish",
      recommended: "Borish tavsiya etiladi"
    },
    ru: {
      home: "Главная",
      regional: "Региональный туризм",
      city: "Город Ташкент",
      country: "Узбекистан",
      desc: "Сердце Великого Шелкового пути, соединяющее Восток и Запад, ведет каждого туриста в мир волшебных сказок. Здесь вы почувствуете величие истории под голубыми куполами Самарканда, а на древних улицах Бухары и в Ичан-Кале Хивы, называемой «музеем под открытым небом», вам покажется, что время остановилось.",
      viewMap: "Посмотреть на карте",
      recommended: "Рекомендуется к посещению"
    },
    en: {
      home: "Home page",
      regional: "Regional tourism",
      city: "Tashkent city",
      country: "Uzbekistan",
      desc: "The center of the Great Silk Road connecting East and West, leading every tourist into a world of magical fairy tales. Here you will feel the grandeur of history under the blue domes of Samarkand, and time seems to stand still in the ancient streets of Bukhara and the \"open-air museum\" Ichan-Kala of Khiva.",
      viewMap: "View on map",
      recommended: "Recommended to visit"
    }
  };

  const t = translations[lang] || translations.uz;

  const recommendedPlaces = [
    { id: 1, name_uz: "Toshkent teleminorasi", name_ru: "Ташкентская телебашня", name_en: "Tashkent TV Tower" },
    { id: 2, name_uz: "Chorsu bozori", name_ru: "Рынок Чорсу", name_en: "Chorsu Bazaar" },
    { id: 3, name_uz: "Navro'z bog'i", name_ru: "Парк Навруз", name_en: "Navruz Park" },
    { id: 4, name_uz: "Sivilizatsiya markazi", name_ru: "Центр цивилизации", name_en: "Center of Civilization" },
    { id: 5, name_uz: "Mustaqillik maydoni", name_ru: "Площадь Независимости", name_en: "Independence Square" },
    { id: 6, name_uz: "Magic City", name_ru: "Magic City", name_en: "Magic City" },
    { id: 7, name_uz: "Amir Temur maydoni", name_ru: "Сквер Амира Темура", name_en: "Amir Temur Square" },
    { id: 8, name_uz: "Minor masjidi", name_ru: "Мечеть Минор", name_en: "Minor Mosque" }
  ];

  const getTranslated = (item, field) => {
    return item[`${field}_${lang}`] || item[`${field}_uz`] || '';
  };

  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex items-center gap-2 text-gray-500 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors'>{t.home}</Link>
            <CaretRight size={14} weight='bold' />
            <Link to="/regional" className='hover:text-[#2552A1] transition-colors'>{t.regional}</Link>
            <CaretRight size={14} weight='bold' />
            <span className='text-gray-400'>{t.city}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            {/* Right side Image (Becomes UP on mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[600px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center order-1 lg:order-2'
            >
              <div className='text-white/20 font-inter font-bold text-2xl uppercase tracking-widest'>{t.city}</div>
              <div className='absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none' />
            </motion.div>

            {/* Left side Content (Becomes DOWN on mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-tight uppercase mb-2'>
                {t.city}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{t.country}</p>
              
              <p className='font-inter text-gray-400 text-[14px] md:text-[16px] leading-[1.8] max-w-[550px] mb-8'>
                {t.desc}
              </p>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-8 rounded-full w-fit shadow-lg shadow-[#2552A1]/20'
              >
                <MapPin size={22} weight="bold" />
                <span>{t.viewMap}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-20 md:py-40 px-[20px] md:px-[60px]'>
        <header className='max-w-[800px] mb-12'>
          <h2 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
            {t.recommended}
          </h2>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] md:gap-x-[30px]'>
          {recommendedPlaces.map((place, index) => {
            const staggeredClass = (index % 2 !== 0) ? 'sm:mt-[30px]' : ''
            
            return (
              <Link key={index} to={`/tourist_place/${place.id}`} className={staggeredClass}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative aspect-[4/5] md:aspect-[3/4] rounded-[30px] overflow-hidden group cursor-pointer shadow-lg bg-gray-50 flex items-center justify-center border border-gray-100`}
                >
                  <div className='absolute inset-0 bg-gray-950'>
                    <div className='absolute inset-0 flex items-center justify-center text-gray-300 font-inter font-bold text-lg uppercase tracking-widest p-4 text-center'>Placeholder</div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
                  </div>

                  <div className='absolute bottom-0 left-0 w-full p-8 z-10'>
                    <h3 className='font-inter font-bold text-[28px] text-white tracking-tight transform transition-transform group-hover:translate-x-2 leading-tight uppercase'>
                      {getTranslated(place, 'name')}
                    </h3>
                  </div>

                  <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
                </motion.div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Single_city