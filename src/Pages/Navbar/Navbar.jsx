import React from 'react'
import { AirplaneIcon } from '@phosphor-icons/react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <AirplaneIcon size={32} weight="fill" className="text-blue-600" />
        <span className="text-xl font-bold">Tourism</span>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Destinations</a>
        <a href="#" className="hover:text-blue-600 transition-colors">About</a>
        <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
