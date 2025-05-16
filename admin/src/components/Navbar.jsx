import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-3 px-[5%] bg-white/80 backdrop-blur-md shadow-md rounded-b-2xl'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <button 
          onClick={()=>setToken('')} 
          className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 sm:px-8 sm:py-2 rounded-full text-xs sm:text-sm shadow-lg transition-all duration-300'
        >
          Logout
        </button>
    </div>
  )
}

export default Navbar
