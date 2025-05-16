import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='bg-white py-14 px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 text-center text-sm text-slate-700'>
      
      <div className='flex flex-col items-center space-y-3 bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition'>
        <img src={assets.exchange_icon} className='w-14' alt="" />
        <p className='font-bold text-slate-800'>Hassle-Free Exchanges</p>
        <p className='text-xs text-slate-500'>Quick and smooth exchange process for your ease.</p>
      </div>

      <div className='flex flex-col items-center space-y-3 bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition'>
        <img src={assets.quality_icon} className='w-14' alt="" />
        <p className='font-bold text-slate-800'>Flexible Return Window</p>
        <p className='text-xs text-slate-500'>Enjoy 7 days easy return with no questions asked.</p>
      </div>

      <div className='flex flex-col items-center space-y-3 bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition'>
        <img src={assets.support_img} className='w-14' alt="" />
        <p className='font-bold text-slate-800'>24/7 Assistance</p>
        <p className='text-xs text-slate-500'>We're here anytime you need help or have queries.</p>
      </div>

    </div>
  )
}

export default OurPolicy
