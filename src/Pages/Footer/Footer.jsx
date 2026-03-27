import React from 'react'
import logo from './Images/logo.svg'
import instagram from './Images/instagram.svg'
import facebook from './Images/facebook.svg'
import youtube from './Images/youtube.svg'


const Footer = () => {
  return (
    <div className='w-full h-[657px] bg-[#1B1B1B] flex flex-col items-center'>

      <img src={logo} className='w-[126px] h-[29px] mt-[60px]' />

      <div className="mt-[60px] regions flex flex-col gap-[60px]">
        <div className='w-[787px] flex justify-between'>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Buxoro</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Samarqand</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Xiva</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Urganch</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Nukus</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Termiz</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Shahrisabz</h1>
        </div>

        <div className='w-[787px]  flex justify-between'>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Kitop</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Qarshi</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Jizzax</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Andijon</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Farg'ona</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Namangan</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Toshkent</h1>
        </div>
      </div>

      <div className='w-[350px] h-[1px] bg-[#4A4A4A] mt-[30px]'></div>

      <div className='w-[546px]  flex justify-between mt-[30px]'>
        <h1 className='font-inter font-[500] text-[16px] text-white'>O'zbekiston haqida</h1>
        <h1 className='font-inter font-[500] text-[16px] text-white'>Turistik joylar</h1>
        <h1 className='font-inter font-[500] text-[16px] text-white'>Viloyatlar</h1>
        <h1 className='font-inter font-[500] text-[16px] text-white'>Xarita</h1>
      </div>

      <div className='w-[350px] h-[1px] bg-[#4A4A4A] mt-[60px]'></div>


      <div className='mt-[60px] flex gap-[20px]'>
        <div className='w-[50px] h-[50px] flex justify-center items-center rounded-[50%] border-[1px] border-white'>
          <img src={instagram} />
        </div>
        <div className='w-[50px] h-[50px] flex justify-center items-center rounded-[50%] border-[1px] border-white'>
          <img src={facebook} />
        </div>
        <div className='w-[50px] h-[50px] flex justify-center items-center rounded-[50%] border-[1px] border-white'>
          <img src={youtube} />
        </div>
      </div>


      <div className='w-[350px] h-[1px] bg-[#4A4A4A] mt-[40px]'></div>

      <h1 className='mt-[49px] font-inter font-[400] text-[14px] text-[#737373]'>© 2026 UzTourism. Barcha huquqlar himoyalangan.</h1>


    </div>
  )
}

export default Footer