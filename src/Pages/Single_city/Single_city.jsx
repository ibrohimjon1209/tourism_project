import React from 'react'
import { motion } from 'framer-motion'
import { CaretRight, MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Single_city = () => {
  const recommendedPlaces = [
    { id: 1, name: "Toshkent teleminorasi" },
    { id: 2, name: "Chorsu bozori" },
    { id: 3, name: "Navro'z bog'i" },
    { id: 4, name: "Sivilizatsiya markazi" },
    { id: 5, name: "Mustaqillik maydoni" },
    { id: 6, name: "Magic City" },
    { id: 7, name: "Amir Temur maydoni" },
    { id: 8, name: "Minor masjidi" }
  ]

  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      <section className='bg-black w-full pt-[110px] md:pt-[140px] pb-16 md:pb-24 px-[20px] md:px-[60px] overflow-hidden'>
        <div className='w-full flex flex-col'>
          <nav className='flex items-center gap-2 text-gray-500 text-sm md:text-base font-inter mb-6 relative z-10'>
            <Link to="/" className='hover:text-[#2552A1] transition-colors'>Bosh sahifa</Link>
            <CaretRight size={14} weight='bold' />
            <Link to="/regional" className='hover:text-[#2552A1] transition-colors'>Viloyatlar turizmi</Link>
            <CaretRight size={14} weight='bold' />
            <span className='text-gray-400'>Toshkent shahri</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            {/* Right side Image (Becomes UP on mobile) */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[600px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center order-1 lg:order-2'
            >
              <div className='text-white/20 font-inter font-bold text-2xl uppercase tracking-widest'>Tashkent City</div>
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
                Toshkent shahri
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>O'zbekiston</p>
              
              <p className='font-inter text-gray-400 text-[14px] md:text-[16px] leading-[1.8] max-w-[550px] mb-8'>
                Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. 
                Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning 
                "ochiq osmon ostidagi muzej" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz. 
                O'zbekiston nafaqat o'zining noyob me'moriy obidalari, balki butun dunyoga mashhur mehmondo'stligi.
              </p>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center justify-center gap-3 bg-[#2552A1] text-white font-inter font-bold py-4 px-8 rounded-full w-fit shadow-lg shadow-[#2552A1]/20'
              >
                <MapPin size={22} weight="bold" />
                <span>Xaritada ko'rish</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-20 md:py-40 px-[20px] md:px-[60px]'>
        <header className='max-w-[800px] mb-12'>
          <h2 className='font-inter font-bold text-[32px] md:text-[48px] text-gray-900 leading-tight mb-4'>
            Borish tavsiya etiladi
          </h2>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[25px] md:gap-x-[30px]'>
          {recommendedPlaces.map((place, index) => {
            const staggeredClass = (index % 2 !== 0) ? 'sm:mt-[30px]' : ''
            
            return (
              <Link key={index} to="#" className={staggeredClass}>
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
                      {place.name}
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