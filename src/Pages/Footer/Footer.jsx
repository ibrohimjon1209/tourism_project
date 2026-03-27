import React from 'react'
import logo from './Images/logo.svg'
import instagram from './Images/instagram.svg'
import facebook from './Images/facebook.svg'
import youtube from './Images/youtube.svg'


const Footer = () => {
  return (
    <div className='w-full h-[642px] bg-[#1B1B1B] flex flex-col items-center'>

      <img src={logo} className='w-[126px] h-[29px] mt-[60px]' />

      <div className="regions">
        <div className='w-[787px] bg-gray-300 flex justify-evenly'>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Buxoro</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Samarqand</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Xiva</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Urganch</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Nukus</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Termiz</h1>
          <h1 className='font-inter font-[500] text-[16px] text-white'>Shahrisabz</h1>
        </div>
      </div>

    </div>
  )
}

export default Footer