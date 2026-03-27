import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CaretRight, MapPin, Path, CurrencyCircleDollar, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';

const TouristPlaceDetail = () => {
  const { id } = useParams();
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const placeData = {
    name: "Imom al-Buxoriy maqbarasi",
    region: "Samarqand viloyati",
    description: "Sharq va G'arbni tutashtirgan Buyuk Ipak yo'lining markazi bo'lib, har bir sayyohni sehrli ertaklar olamiga yetaklaydi. Bu yerda siz Samarqandning moviy gumbazlari ostida tarixdagi ulug'vorlikni his qilsangiz, Buxoroning qadimiy ko'chalari va Xivaning \"ochiq osmon ostidagi muzey\" deb ataluvchi Ichan-qal'asida vaqt to'xtab qolgandek tasavvurga ega bo'lasiz.",
    distance: "724 m",
    cost: "25 500 UZS",
    mainImage: "https://placehold.co/1200x800/111111/444444?text=Imom+Buxoriy+Main",
    history: [
      "Imom al-Buxoriy majmuasi — buyuk muhaddis, \"Sahihi Buxoriy\" asari muallifi Abu Abdulloh Muhammad ibn Ismoil al-Buxoriy mangu qo'nim topgan muqaddas maskandir. Samarqand yaqinidagi Payariq tumanida joylashgan ushbu majmua asrlar davomida ilm va e'tiqod markazi bo'lib kelgan.",
      "Majmuaning shakllanish tarixi Imom al-Buxoriy vafotidan so'ng (milodiy 870-yil), u kishi dafn etilgan Xartang qishlog'idagi qabr atrofida ziyoratgoh barpo etilgan. XVI asrda majmua yanada shakllantirilib, yoniga kichik masjid qurilgan va atrofiga chinorlar ekilgan. Biroq, majmuaning hozirgi ulug'vor qiyofasi 1998-yilda, allomaning hijriy hisobda 1225 yillik tavalludi munosabati bilan qayta qurilganidan so'ng paydo bo'ldi.",
      "Majmua an'anaviy o'zbek milliy me'morchiligi uslubida barpo etilgan bo'lib, quyidagi qismlardan iborat: Maqbara, Masjid, Muzey."
    ],
    gallery: [
      "https://placehold.co/1200x900/1a1a1a/ffffff?text=Gallery+1",
      "https://placehold.co/1200x900/2a2a2a/ffffff?text=Gallery+2",
      "https://placehold.co/1200x900/3a3a3a/ffffff?text=Gallery+3",
      "https://placehold.co/1200x900/4a4a4a/ffffff?text=Gallery+4",
      "https://placehold.co/1200x900/5a5a5a/ffffff?text=Gallery+5"
    ]
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth + 24; // Width + gap
      let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      
      // Boundary check
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
            <Link to="/" className='hover:text-[#2552A1] transition-colors shrink-0'>Bosh sahifa</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <Link to="/tourist_places" className='hover:text-[#2552A1] transition-colors shrink-0'>Turistik joylar</Link>
            <CaretRight size={14} weight='bold' className='shrink-0' />
            <span className='text-gray-300 shrink-0 mt-1'>{placeData.name}</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mt-4'>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='relative aspect-[7/5] md:aspect-auto md:h-[400px] lg:h-[500px] rounded-[30px] md:rounded-[50px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl order-1 lg:order-2'
            >
              <img src={placeData.mainImage} alt={placeData.name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none' />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className='flex flex-col relative z-10 order-2 lg:order-1'
            >
              <h1 className='font-inter font-bold text-[36px] md:text-[64px] text-white leading-[1.1] mb-2 tracking-tight'>
                {placeData.name}
              </h1>
              <p className='text-[#2552A1] font-inter font-bold text-[20px] md:text-[24px] mb-8'>{placeData.region}</p>
              
              <p className='font-inter text-gray-400 text-sm md:text-base leading-[1.8] max-w-[550px] mb-12 font-medium'>
                {placeData.description}
              </p>

              <div className='flex flex-col md:flex-row md:items-center gap-8 md:gap-14 mb-12 text-zinc-300'>
                <div className='flex items-center gap-5'>
                  <Path size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest'>Sizdan masofada</span>
                    <span className='text-white text-[24px] md:text-[32px] font-extrabold leading-tight'>{placeData.distance}</span>
                  </div>
                </div>

                <div className='hidden md:block w-[1px] h-12 bg-white/20' />

                <div className='flex items-center gap-5'>
                  <CurrencyCircleDollar size={32} className='text-zinc-500' />
                  <div className='flex flex-col'>
                    <span className='text-gray-500 text-[10px] md:text-xs font-bold tracking-widest'>Taxminiy xarajat</span>
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
                <span>Yo'nalish olish</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className='py-20 px-5 md:px-[60px]'>
        <div className='max-w-full'>
          <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold mb-8'>Tarixi haqida</h2>
          <div className='flex flex-col gap-6'>
            {placeData.history.map((para, i) => (
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
          <h2 className='text-zinc-900 text-[32px] md:text-[40px] font-bold'>Fotogalereya</h2>
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
