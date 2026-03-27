import React from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Nearby_places = () => {
  const nearbyPlaces = [
    { id: 1, name: "Magic City" },
    { id: 2, name: "Humo muz saroyi" },
    { id: 3, name: "Tashkent city" },
    { id: 4, name: "Muqimiy teatri" },
    { id: 5, name: "Bunyodkor stadioni" },
    { id: 6, name: "Botanika bog'i" }
  ]

  return (
    <div className='min-h-screen bg-white pt-[110px] md:pt-[140px] pb-40 px-[20px] md:px-[60px] overflow-x-hidden'>
      {/* Breadcrumb */}
      <nav className='flex items-center gap-2 text-gray-400 text-sm md:text-base font-inter mb-6'>
        <Link to="/" className='hover:text-[#2552A1] transition-colors'>Bosh sahifa</Link>
        <CaretRight size={14} weight='bold' />
        <span className='text-gray-300'>Yaqin turistik joylar</span>
      </nav>

      {/* Header with Badge */}
      <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12'>
        <motion.header 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='max-w-[800px]'
        >
          <h1 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
            Yaqin turistik joylar
          </h1>
          <p className='font-inter text-gray-500 text-[16px] md:text-[20px] leading-relaxed'>
            Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi.
          </p>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex items-center gap-2 px-6 py-3 rounded-full border border-gray-100 bg-gray-50 text-gray-600 font-inter font-medium text-sm md:text-base w-fit h-fit shadow-sm'
        >
          <MapPin size={20} weight="fill" className='text-[#2552A1]' />
          <span>Toshkent shahri</span>
        </motion.div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-8'>
        {nearbyPlaces.map((place, index) => (
          <Link to={`/nearby_place/${place.id}`} key={place.id} className='block'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className='relative aspect-[8/5] md:aspect-[16/9] rounded-[30px] overflow-hidden group cursor-pointer shadow-xl bg-gray-950 flex items-center justify-center border border-gray-100'
            >
              <div className='text-gray-800 font-inter font-bold text-xl uppercase tracking-widest p-4 text-center z-0 opacity-20'>Image Placeholder</div>
              
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent' />
              
              <div className='absolute bottom-0 left-0 w-full p-6.5 md:p-8 z-10'>
                <h3 className='font-inter font-bold text-[24px] md:text-[32px] text-white tracking-tight uppercase leading-tight'>
                  {place.name}
                </h3>
                <div className='w-0 group-hover:w-[100px] h-[3px] bg-[#2552A1] mt-3 transition-all duration-500' />
              </div>

              <div className='absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity' />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Nearby_places