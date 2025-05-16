import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-center gap-3 mb-4'>
      <p className='text-blue-700 font-medium tracking-wide uppercase text-sm'>
        {text1} <span className='text-slate-900 font-semibold'>{text2}</span>
      </p>
      <span className='block w-10 sm:w-14 h-0.5 bg-blue-700 rounded-full'></span>
    </div>
  )
}

export default Title
