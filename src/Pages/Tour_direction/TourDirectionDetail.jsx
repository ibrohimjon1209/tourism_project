import React from 'react';
import { motion } from 'framer-motion';
import { CaretRight, MapPin, Path, Clock, ArrowRight } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';

const TourDirectionDetail = () => {
  const { id } = useParams();

  const tourData = {
    name: "Toshkent shahri bo'ylab",
    description: [
      "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz.",
      "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz."
    ],
    mainImage: "https://placehold.co/1200x800/111111/444444?text=Humo+Arena+Main",
    visitPlaces: [
      { id: 1, name: "Ko'kaldosh madrasasi", image: "https://placehold.co/600x800/1e3a8a/ffffff?text=Kokaldosh" },
      { id: 2, name: "Chorsu bozori", image: "https://placehold.co/600x800/065f46/ffffff?text=Chorsu" },
      { id: 3, name: "Amir Temur xiyoboni", image: "https://placehold.co/600x800/1e293b/ffffff?text=Amir+Temur" },
      { id: 4, name: "Toshkent metrosi", image: "https://placehold.co/600x800/333/ffffff?text=Metro" },
      { id: 5, name: "Eski shahar", image: "https://placehold.co/600x800/4c1d95/ffffff?text=Old+City" },
      { id: 6, name: "Hazrati Imom majmuasi", image: "https://placehold.co/600x800/7c2d12/ffffff?text=Hazrati+Imom" }
    ],
    others: [
      { id: 101, name: "Samarqand sirlari", image: "https://placehold.co/800x600/111/fff?text=Samarkand" },
      { id: 102, name: "Qadimiy Buxoro", image: "https://placehold.co/800x600/222/fff?text=Bukhara" },
      { id: 103, name: "Xiva ertaklari", image: "https://placehold.co/800x600/333/fff?text=Khiva" }
    ]
  };

  return (
    <div className='min-h-screen bg-black font-inter overflow-x-hidden'>
      {/* Header Section */}
      <section className='w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-5 md:px-[60px]'>
        <div className='w-full flex flex-col'>
          <nav className='flex flex-wrap items-center gap-2 text-gray-500 text-sm md:text-base mb-8'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors'>Bosh sahifa</Link>
            <CaretRight size={14} weight='bold' />
            <Link to="/tour_direction" className='hover:text-[#2552A1] transition-colors'>Sayohat yo'nalishlari</Link>
            <CaretRight size={14} weight='bold' />
            <span className='text-gray-300'>{tourData.name}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start'>
            {/* Main Image - Now on top in mobile */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='aspect-[16/10] md:aspect-auto md:h-[450px] rounded-[30px] overflow-hidden shadow-2xl border border-white/5 order-1 lg:order-2'
            >
              <img src={tourData.mainImage} alt={tourData.name} className='w-full h-full object-cover' />
            </motion.div>

            {/* Left Info - Now below image in mobile */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='flex flex-col order-2 lg:order-1'
            >
              <h1 className='text-white text-[32px] md:text-[56px] font-bold leading-tight mb-8'>
                {tourData.name}
              </h1>
              <div className='flex flex-col gap-6 max-w-[650px]'>
                {tourData.description.map((text, i) => (
                  <p key={i} className='text-gray-400 text-sm md:text-base leading-relaxed font-medium'>
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Places to Visit Section */}
      <section className='w-full py-10 md:py-20 px-5 md:px-[60px]'>
        <h2 className='text-white text-[24px] md:text-[36px] font-bold mb-10 md:mb-16'>
          Tashrif buyuriladigan joylar
        </h2>
        
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
          {tourData.visitPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group relative aspect-[3/4] rounded-[24px] overflow-hidden cursor-pointer shadow-lg'
            >
              <img src={place.image} alt={place.name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute bottom-0 left-0 p-4 md:p-6 w-full'>
                <p className='text-white text-xs md:text-lg font-bold leading-tight'>{place.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Others Section */}
      <section className='w-full py-20 px-5 md:px-[60px] bg-white'>
        <div className='flex items-center justify-between mb-12'>
          <h2 className='text-zinc-900 text-[24px] md:text-[36px] font-bold'>Boshqalar</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {tourData.others.map((tour) => (
            <motion.div
              key={tour.id}
              whileHover={{ y: -10 }}
              className='relative aspect-[16/10] rounded-[30px] overflow-hidden cursor-pointer border border-gray-100 shadow-lg'
            >
              <img src={tour.image} alt={tour.name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60' />
              <div className='absolute bottom-0 left-0 p-8 w-full'>
                <p className='text-white text-xl font-bold'>{tour.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourDirectionDetail;
