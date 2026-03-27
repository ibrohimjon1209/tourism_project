import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';

const TouristPlaces = () => {
  const [activeFilter, setActiveFilter] = useState('Barchasi');

  const filters = [
    'Barchasi',
    'Tarixiy joylar',
    'Diniy joylar',
    'Tabiat turizmi',
    'Dam olish maskanlari'
  ];

  const places = [
    {
      id: 1,
      name: "Imom al-Buxoriy maqbarasi",
      region: "Samarqand viloyati",
      category: "Diniy joylar",
      image: "https://placehold.co/800x600/2552A1/ffffff?text=Imom+Buxoriy+Maqbarasi"
    },
    {
      id: 2,
      name: "Bahouddin Naqshband majmuasi",
      region: "Buxoro viloyati",
      category: "Diniy joylar",
      image: "https://placehold.co/800x600/1a1a1a/ffffff?text=Bahouddin+Naqshband"
    },
    {
      id: 3,
      name: "Registon maydoni",
      region: "Samarqand viloyati",
      category: "Tarixiy joylar",
      image: "https://placehold.co/800x600/333/fff?text=Registon+Maydoni"
    },
    {
      id: 4,
      name: "Ichan qal'a",
      region: "Xorazm viloyati",
      category: "Tarixiy joylar",
      image: "https://placehold.co/800x600/222/fff?text=Ichan+Qala"
    },
    {
      id: 5,
      name: "Ark qal'asi",
      region: "Buxoro viloyati",
      category: "Tarixiy joylar",
      image: "https://placehold.co/800x600/444/fff?text=Ark+Qalasi"
    }
  ];

  const filteredPlaces = activeFilter === 'Barchasi' 
    ? places 
    : places.filter(place => place.category === activeFilter);

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-20 px-5 md:px-[60px] font-inter'>
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>Bosh sahifa</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>Turistik joylar</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='mb-8 md:mb-12'
      >
        <h1 className='text-[32px] md:text-[48px] font-bold text-gray-900 leading-tight mb-4'>
          Turistik joylar
        </h1>
        <p className='font-inter text-gray-500 text-[16px] md:text-[18px] leading-relaxed max-w-[700px] font-medium mb-8'>
          Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.
        </p>

        <div className='flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar'>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm cursor-pointer font-semibold transition-all whitespace-nowrap border
                ${activeFilter === filter 
                  ? 'bg-[#2552A1] text-white border-[#2552A1] shadow-lg shadow-[#2552A1]/20' 
                  : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8'>
        <AnimatePresence mode='popLayout'>
          {filteredPlaces.map((place) => (
            <motion.div
              layout
              key={place.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                to={`/tourist_place/${place.id}`}
                className='group relative block aspect-[4/3] md:aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-xl'
              >
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                
                <div className='absolute bottom-0 left-0 p-6 md:p-10 w-full'>
                  <h3 className='text-white text-xl md:text-2xl font-bold leading-tight max-w-[80%]'>
                    {place.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPlaces.length === 0 && (
        <div className='text-center py-20'>
          <p className='text-gray-400 font-bold text-[20px]'>Bu turkumda hozircha joylar yo'q</p>
        </div>
      )}
    </div>
  );
};

export default TouristPlaces;
